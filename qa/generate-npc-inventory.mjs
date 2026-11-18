import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = path.join(root, 'VaporCity_HD2D_Hybrid_Test.html');
const inventoryPath = path.join(root, 'qa', 'npc-inventory.json');
const source = fs.readFileSync(htmlPath, 'utf8');

function objectEnd(text, start) {
  let depth = 0, quote = null, escaped = false;
  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (quote) {
      if (escaped) escaped = false;
      else if (ch === '\\') escaped = true;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === "'" || ch === '"' || ch.charCodeAt(0) === 96) { quote = ch; continue; }
    if (ch === '{') depth++;
    else if (ch === '}' && --depth === 0) return i + 1;
  }
  throw new Error('Unclosed NPC object at source offset ' + start);
}

function objectMap(label) {
  const match = source.match(new RegExp('const ' + label + '=Object\\.freeze\\(\\{([\\s\\S]*?)\\}\\);'));
  if (!match) throw new Error('Missing ' + label + ' table');
  return Object.fromEntries([...match[1].matchAll(/([A-Za-z0-9_]+)\s*:\s*'([^']+)'/g)].map(m => [m[1], m[2]]));
}

const records = [];
for (const match of source.matchAll(/\{\s*id\s*:\s*(['"])([^'"]+)\1/g)) {
  const end = objectEnd(source, match.index);
  const object = source.slice(match.index, end);
  // Live NPC records have coordinates and a direction. This excludes map,
  // crew, play, and roster metadata objects that also happen to use "id".
  if (!/\bx\s*:/.test(object) || !/\by\s*:/.test(object) || !/\bd\s*:/.test(object)) continue;
  const civ = (object.match(/\bciv\s*:\s*(['"])([^'"]+)\1/) || [])[2] || null;
  const sprite = (object.match(/\bsprite\s*:\s*(['"])([^'"]+)\1/) || [])[2] || null;
  records.push({ id: match[2], civ, sprite });
}

const byId = new Map();
for (const npc of records) {
  const prior = byId.get(npc.id);
  if (prior && (prior.civ !== npc.civ || prior.sprite !== npc.sprite)) {
    throw new Error('Conflicting live NPC definitions for id ' + npc.id);
  }
  byId.set(npc.id, npc);
}
const npcs = [...byId.values()].sort((a, b) => a.id.localeCompare(b.id));
const civToArchetype = objectMap('CIV_TO_ARCHETYPE');
const archetypeMatch = source.match(/const ARCHETYPES=Object\.freeze\(\{([\s\S]*?)\}\);/);
const civMatch = source.match(/const CIV=\{([\s\S]*?)\n\};/);
if (!archetypeMatch || !civMatch) throw new Error('Missing ARCHETYPES or CIV palette table');
const archetypeKeys = [...archetypeMatch[1].matchAll(/^\s{2}([A-Za-z0-9_]+):\{/gm)].map(m => m[1]);
const civPaletteKeys = [...civMatch[1].matchAll(/([A-Za-z0-9_]+)\s*:\s*\{/g)].map(m => m[1]);
const liveCivs = [...new Set(npcs.map(n => n.civ).filter(Boolean))].sort();
const unmappedCivs = liveCivs.filter(civ => !civToArchetype[civ]);
const missingPalettes = liveCivs.filter(civ => !civPaletteKeys.includes(civ));
const missingArchetypes = Object.values(civToArchetype).filter(key => !archetypeKeys.includes(key));
if (unmappedCivs.length) throw new Error('NPC civs missing CIV_TO_ARCHETYPE: ' + unmappedCivs.join(', '));
if (missingPalettes.length) throw new Error('NPC civs missing explicit CIV palette: ' + missingPalettes.join(', '));
if (missingArchetypes.length) throw new Error('CIV_TO_ARCHETYPE references missing archetypes: ' + [...new Set(missingArchetypes)].join(', '));
if ((archetypeMatch[1].match(/palette:\{/g) || []).length !== archetypeKeys.length ||
    (archetypeMatch[1].match(/prop:\{/g) || []).length !== archetypeKeys.length) {
  throw new Error('Every archetype must define its own palette and prop');
}
if (liveCivs.length !== 24 || Object.keys(civToArchetype).length !== 24) {
  throw new Error('Expected 24 live civ mappings; found ' + liveCivs.length + ' live civs and ' + Object.keys(civToArchetype).length + ' mapping entries');
}
if (/CIV\[kind\]\s*\|\|\s*CIV\.fan/.test(source)) throw new Error('Forbidden CIV.fan palette fallback remains');

const pxnMatch = source.match(/var PXN=\{([^}]+)\}/);
if (!pxnMatch) throw new Error('Could not read PXN pixel-pack dispatch table');
const pxPersonAtlas = Object.fromEntries([...pxnMatch[1].matchAll(/([A-Za-z0-9_]+)\s*:\s*'([^']+)'/g)].map(m => [m[1], m[2]]));
if (!source.includes("if(n.id==='granny'){drawGrannyVoltSprite") ||
    !source.includes("if(n.sprite==='cat'){if(!pxCat(n,tm))owCat") ||
    !source.includes('if(n.civ){if(!pxPerson(n,tm))owCiv') ||
    !source.includes('else owFig(') ||
    !source.includes('function renderPerson(')) {
  throw new Error('NPC render dispatch no longer matches the inventory parser assumptions');
}

const inventoryNpcs = npcs.map(npc => {
  let rendererPath, inScope;
  if (npc.civ === 'granny') {
    rendererPath = 'drawGrannyVoltSprite (owCiv special case)';
    inScope = true;
  } else if (npc.civ) {
    rendererPath = pxPersonAtlas[npc.id] ? 'pxPerson atlas override -> owCiv fallback' : 'owCiv';
    inScope = true;
  } else if (npc.sprite === 'cat') {
    rendererPath = 'pxCat atlas override -> owCat fallback';
    inScope = true;
  } else {
    // These 18 legacy owFig records are explicitly excluded from the standard-NPC art pass.
    // They are neither town civilians nor football NPCs for this inventory's scope.
    const outOfScopeOwFigIds = new Set(['cat1','cat2','drift1','drift2','hb_bram','hb_deke','hb_marla','hb_rita','king1','king2','lou','mack','mate1','mo','pete','r2_mud','rat2','rusty']);
    if (!outOfScopeOwFigIds.has(npc.id)) throw new Error('Unclassified owFig/renderPerson NPC: ' + npc.id + ' (owner scope decision required)');
    rendererPath = 'owFig -> renderPerson (non-standard, out of scope)';
    inScope = false;
  }
  return {
    id: npc.id,
    civ: npc.civ,
    rendererPath,
    scopeClass: inScope ? 'town' : 'football',
    pxPersonAtlasOverride: Object.hasOwn(pxPersonAtlas, npc.id),
    ...(pxPersonAtlas[npc.id] ? { pxPersonAtlasKey: pxPersonAtlas[npc.id] } : {}),
    inScope
  };
});

const inventory = {
  schemaVersion: 1,
  source: 'VaporCity_HD2D_Hybrid_Test.html (live NPC records + renderer dispatch)',
  npcCount: inventoryNpcs.length,
  civCount: liveCivs.length,
  civs: liveCivs,
  fanNpcIds: inventoryNpcs.filter(n => n.civ === 'fan').map(n => n.id),
  pixelPack: {
    enabledOnlyWhen: "PXS.on && M.id === 'street' && pxUse()",
    pxPersonAtlasNpcIds: Object.keys(pxPersonAtlas).sort(),
    behavior: 'Mapped ids are drawn from the atlas on the street when pixel-pack mode is enabled; otherwise they fall through to owCiv.'
  },
  npcs: inventoryNpcs
};
const output = JSON.stringify(inventory, null, 2) + '\n';

if (process.argv.includes('--check')) {
  if (!fs.existsSync(inventoryPath)) throw new Error('Missing qa/npc-inventory.json; run the generator without --check');
  const committed = fs.readFileSync(inventoryPath, 'utf8');
  const committedInventory = JSON.parse(committed);
  const indexedIds = new Set((committedInventory.npcs || []).map(n => n.id));
  const missingIds = [...new Set(npcs.map(n => n.id))].filter(id => !indexedIds.has(id));
  if (missingIds.length) throw new Error('Live NPC ids missing inventory entries: ' + missingIds.join(', '));
  if (committed !== output) {
    throw new Error('qa/npc-inventory.json is stale: regenerate it from the live NPC data and render dispatch');
  }
  console.log(JSON.stringify({ pass: true, npcCount: inventoryNpcs.length, civCount: liveCivs.length, fanCount: inventory.fanNpcIds.length, pxPersonAtlasCount: Object.keys(pxPersonAtlas).length }));
} else {
  fs.writeFileSync(inventoryPath, output);
  console.log('Generated qa/npc-inventory.json: ' + inventoryNpcs.length + ' NPC ids, ' + liveCivs.length + ' civs, ' + inventory.fanNpcIds.length + ' fans.');
}
