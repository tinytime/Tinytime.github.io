/* ===== TOWN 2: HALE HARBOR ===== */
/* ================================================================================================
   TOWN 2: HALE HARBOR  (formerly Brinewick Harbor). Cold, dry, working harbor. Built from the Build Bible Rev 3.
   Data first (map, buildings, props, interiors), then renderers, then logic. Nothing here touches Town 1 data.
   ================================================================================================ */
const HBW=50,HBH=52;
const HBG=[   // v3.20T: the circular harbor (CF_81 3.2). . cobble , green = quay  P planks  ~ water  # building  D door  r riprap  T tree (build 3; walkable ground until then)  F yard fence  G yard gate  c boat cradle
 'T,,,,,,,,,T,,,,,,,,,T,,,,,,,,T,,,,,,,,T,,FFFFFFFFF',
 '.......................................,,F,,,,,,,F',
 '...............................######..T,F,,,,,,,F',
 '..######,,,,,.#####,,,######,,,######..,,F,,ccc,,F',
 '..######,,,,,.#####,,,######,,,######..,,F,,,,,,,F',
 '..######,,,,,.#####,,,######,,,######..,TF,,,,,,,F',
 '..######,,,T,.##D##,T,##D###,T,##D###..,,F,,,,,,,F',
 '..##D###...............................,,FFFFGFFFF',
 '......................======......................',
 '...................============...................',
 '..,,,,,######....=====~~==~~=====........#####....',
 '..,,,,,######...===~~~~~==~~~~~===.......#####....',
 '..,,,,,######.====~~~~~~==~~~~~~==PP.....#####....',
 '..T,,,,####D#===~~~~~~~~==~~~~######=....##D##....',
 '.............==~~~~~~~~~==~~~~######=.............',
 '...,,,,,,,..==~~~~~~~~~~==~~~~######==............',
 '...,,,,,,,.===~~~~~~~~~~==~~~~###D##===...........',
 '...,,,,,,,.==~~~~~~~~~~~==~~~~~~~PPPP==...........',
 '...,T,,,T,.==~~~~~~~~~~~==~~~~~~~~~~~==...........',
 '...,,,,,,,==~~~~~~~~~~~====~~~~~~~~~~~==..........',
 '..........==~~~~~~~~####DD####~~~~~~~~==######....',
 '..........==~~~~~~~~##########~~~~~~~~==######....',
 '..........==~~~~~~~~##########~~~~####==######....',
 '..........==~~~~~~~~##########~~~~####==######....',
 '..########==~~~~~~~~##########~~~~#D##==##D###....',
 '..########=PPPP~~~~~##########~~~~PPPP==..........',
 '..########=PPPP~~~~~~~~~~~~~~~~~~~~~~~==..........',
 '..###D####==~~~~~~~~~~~~~~~~~~~~~~~~~~==..........',
 '...........==~~~~~~~~~~~~~~~~~~~~~~~~==...........',
 '...........==######~~~~~~~~~~~~~~~~~~==...........',
 '...,,,,,,,.==######~~~~~~~~~~~~~~~~~===...........',
 '...,,,,,,,..=######~~~~~~~~~~~~~~PP~==#######.....',
 '...,,,,,,,...#D####~~~~~~~~~~~~~~PP==.#######.....',
 '...,,T,,T,...===~~~~~~~~~~~~~~~~~~===.#######.....',
 '...,,,,,,,....====~~~~~~~~~~~~~~====..#######.....',
 '................===~~~PPPPPP~~~===....###D###.....',
 '.................=====PPPPPP=====.................',
 '..................r===~~~~~~===r..........,,,,,,,,',
 '..................r===~~~~~~===r..........,,,,,,,,',
 '..................r===~~~~~~===r..........,,,,,,,,',
 '..######..........r===~~~~~~===r..#######.,,,,,T,,',
 '..######..........r===~~~~~~===r..#######.,,,,,,,,',
 '..##D###.......,,,r===~~~~~~===r..###D###.,T,,,,,,',
 '...............,,,r===~~~~~~===r..........,,,,,,,,',
 '...............,T,r===~~~~~~===r..................',
 '======================~~~~~~======================',
 '~~~~~~~~~~~~PP~~~PP===~~~~~~===~~~~~~~~~~~PP~~~~~~',
 '~~~~~~~~~~~~PP~~~P####~~~~~~===~~~~~~~~~~~PP~~~~~~',
 '~~~~~~~~~~~~PP~~~P####~~~~~~~~~~~~~~~~~~~~PP~~~~~~',
 '~~~~~~~~~~~~PP~~~P####~~~~~~~~~~~~~~~~~~~~PP~~~~~~',
 '~~~~~~~~~~~~PP~~~P#D##~~~~~~~~~~~~~~~~~~~~PP~~~~~~',
 '~~~~~~~~~~~~~~~~~PPP~~~~~~~~~~~~~~~~~~~~~~PP~~~~~~'];
const HB_ENTRY=[0,21],HB_GATE=[42,46],HB_GATE2=[43,46],HB_BOARD=[42,43,50],HB_FERRY=[42,47];   // west edge in; the ferry chain; boarding tiles on the deck; the ferry safe spot
const HB_LAYOUT={   // v3.20T: new rectangles, doors and door facing (names, signs, colours, interiors unchanged)
 B01:{x:20,y:20,w:10,h:6,doors:[[24, 20], [25, 20]],face:'u'},
 B07:{x:30,y:13,w:6,h:4,doors:[[33, 16]],face:'d'},
 B11:{x:34,y:22,w:4,h:3,doors:[[35, 24]],face:'d'},
 B12:{x:13,y:29,w:6,h:4,doors:[[14, 32]],face:'d'},
 B10:{x:2,y:24,w:8,h:4,doors:[[5, 27]],face:'d'},
 B03:{x:7,y:10,w:6,h:4,doors:[[11, 13]],face:'d'},
 B06:{x:38,y:31,w:7,h:5,doors:[[41, 35]],face:'d'},
 B14:{x:2,y:40,w:6,h:3,doors:[[4, 42]],face:'d'},
 B16:{x:18,y:47,w:4,h:4,doors:[[19, 50]],face:'d'},
 B13:{x:22,y:3,w:6,h:4,doors:[[24, 6]],face:'d'},
 B02:{x:31,y:2,w:6,h:5,doors:[[33, 6]],face:'d'},
 B04:{x:2,y:3,w:6,h:5,doors:[[4, 7]],face:'d'},
 B08:{x:14,y:3,w:5,h:4,doors:[[16, 6]],face:'d'},
 B09:{x:41,y:10,w:5,h:4,doors:[[43, 13]],face:'d'},
 B05:{x:40,y:20,w:6,h:5,doors:[[42, 24]],face:'d'},
 B15:{x:34,y:40,w:7,h:3,doors:[[37, 42]],face:'d'}};
const HB_TREES=[['R', 0, 0, 'yellow'], ['R', 20, 6, 'orange'], ['R', 29, 0, 'red'], ['B', 4, 18, 'yellow'], ['B', 38, 0, 'yellow'], ['B', 40, 5, 'green'], ['B', 47, 40, 'orange'], ['S', 2, 13, 'green'], ['S', 8, 33, 'green'], ['S', 10, 0, 'green'], ['S', 16, 44, 'green'], ['S', 20, 0, 'green'], ['S', 39, 2, 'green'], ['S', 43, 42, 'green'], ['O', 5, 33, 'red'], ['O', 8, 18, 'orange'], ['O', 11, 6, 'red'], ['O', 29, 6, 'yellow']];   // [kind,x,y,colour] S spruce, P pine, O oak, B birch, R rowan; colour: green/yellow/orange/red (v3.24T)
const HBB=[   // building table
 {id:'B01',kind:'arena',x:14,y:3,w:10,h:7,doors:[[18,9],[19,9]],sign:'THE BASIN',sub:'DRY DOCK 14',col:'#3A4A55',col2:'#A9542F',z:2},
 {id:'B02',kind:'shop',x:7,y:3,w:6,h:5,doors:[[9,7]],sign:'VOSS BUNK ROOM 3',sub:'BOARDING HOUSE',col:'#8A4F3C',col2:'#E8C98A',z:2,look:'brick'},
 {id:'B03',kind:'club',x:14,y:18,w:6,h:4,doors:[[16,21]],sign:'HALE CLUBHOUSE',sub:'LOCKERS / MIRROR',col:'#3E6F6A',col2:'#F0D9A8',z:3,look:'shed'},
 {id:'B04',kind:'lot',x:4,y:12,w:6,h:5,doors:[[6,16]],sign:'GILLNET LOFT',sub:'CREW I',col:'#4F7F89',col2:'#F2C57C',z:2,look:'clap'},
 {id:'B05',kind:'lot',x:4,y:27,w:7,h:5,doors:[[7,31]],sign:'LONGSHORE HALL',sub:'CREW II',col:'#97603A',col2:'#B7E0D6',z:1,look:'brick'},
 {id:'B06',kind:'lot',x:25,y:24,w:7,h:5,doors:[[28,28]],sign:'CANNERY CLUB',sub:'CREW III',col:'#8C4A3A',col2:'#F2E2B8',z:4,look:'brick'},
 {id:'B07',kind:'shop',x:25,y:4,w:6,h:4,doors:[[27,7]],sign:'SALT ARCADE',sub:'CRANE DROP',col:'#2D74A0',col2:'#F2B65C',z:2,look:'tin'},
 {id:'B08',kind:'shop',x:26,y:12,w:5,h:4,doors:[[28,15]],sign:'APOTHECARY',sub:'COLD REMEDIES',col:'#5A7A62',col2:'#F2E6B8',z:2,look:'clap'},
 {id:'B09',kind:'shop',x:20,y:12,w:5,h:4,doors:[[22,15]],sign:"SHIP'S STORE",sub:'TRADE / SWAP',col:'#8F6B3C',col2:'#EBCB96',z:3,look:'tin'},
 {id:'B10',kind:'shop',x:4,y:20,w:8,h:4,doors:[[7,23]],sign:'FISH MARKET',sub:'ICE / CATCH',col:'#3F6F70',col2:'#E6F2EE',z:1,look:'market'},
 {id:'B11',kind:'shop',x:27,y:20,w:5,h:3,doors:[[29,22]],sign:'BAIT & TACKLE',sub:'LIVE EELS',col:'#6E8350',col2:'#F0DC98',z:4,look:'clap'},
 {id:'B12',kind:'shop',x:13,y:27,w:6,h:4,doors:[[15,30]],sign:'THE BILGE',sub:'OPEN LATE',col:'#5E3445',col2:'#E58E55',z:1,look:'brick'},
 {id:'B13',kind:'shop',x:21,y:18,w:6,h:4,doors:[[23,21]],sign:'HARBORMASTER',sub:'TIDE & TAPE',col:'#41607F',col2:'#E8CC86',z:3,look:'office'},
 {id:'B14',kind:'shop',x:4,y:34,w:6,h:3,doors:[[6,36]],sign:'CHANDLERY',sub:'ROPE & TAR',col:'#7B5C8C',col2:'#E2C877',z:5,look:'clap'},
 {id:'B15',kind:'shop',x:14,y:34,w:7,h:3,doors:[[17,36]],sign:'UNION HALL',sub:'CREW & KIN',col:'#4B72AA',col2:'#F0DDB5',z:5,look:'brick'},
 {id:'B16',kind:'shop',x:30,y:33,w:4,h:4,doors:[[31,36]],sign:'BEACON',sub:"KEEPER'S EST. 1867",col:'#2F4A55',col2:'#E3D7B3',z:5,look:'tower'}];
HBB.forEach(b=>b.room='hb_'+b.id);
HBB.forEach(b=>Object.assign(b,HB_LAYOUT[b.id]));   // v3.20T: new places and door facing
// outdoor props: [x,y,kind,solid]
const HBP=[   // Hale Harbor outdoor props: intentional working-harbor clusters, clear negative space & story props
 // North quay & Basin causeway focal frame
 {x:18,y:9,t:'lamp',s:1},
 {x:30,y:9,t:'lamp',s:1},
 {x:24,y:8,t:'tugdecal',s:0,m:["HALE 14. Painted on the quay. Fresh coat.", "Someone keeps it up."]},
 {x:25,y:8,t:'tugdecal',s:0,m:["HALE 14. Painted on the quay. Fresh coat.", "Someone keeps it up."]},
 // North residential & civic row (B04 Gillnet Loft, B08 Apothecary, B13 Harbormaster, B02 Boarding House)
 {x:9,y:6,t:'bench',s:1},
 {x:15,y:7,t:'planter',c:'#8E6BD9',s:1},
 {x:20,y:4,t:'bench',s:1},
 {x:35,y:7,t:'planter',c:'#E8B23D',s:1},
 {x:36,y:9,t:'bench',s:1},
 // NE drydock & boatyard (story props intact)
 {x:44,y:3,t:'cradletalk',w:3,s:0,m:["An empty cradle. Keel blocks.", "Chalked on one: 14."]},
 {x:48,y:2,t:'namescrap',s:1,m:["A strip of old name board.", "Every letter gouged out."]},
 {x:47,y:5,t:'skifftrolley',w:2,s:1},
 {x:48,y:9,t:'cart',s:1},
 // West Gut, Quay & Fish Market (fishbox moved beside yellow NPC hb_oldsalt at 11,20; quay walkway clear)
 {x:4,y:11,t:'dryboat',w:2,c:'#2F8A9A',s:1},
 {x:6,y:16,t:'bench',s:1},
 {x:11,y:21,t:'fishbox',s:1},
 {x:9,y:23,t:'lamp',s:1},
 {x:8,y:28,t:'crates',s:1},
 {x:3,y:29,t:'netroll',s:1},
 {x:5,y:31,t:'netrack',w:2,s:1},
 // Ship's Store Outfitting & Harbor Anchor Square (between Ship's Store and Longshore Hall)
 {x:42,y:14,t:'crates',s:1},
 {x:45,y:14,t:'barrel',c:'#8A6A3A',s:1},
 {x:46,y:14,t:'rope',s:0},
 {x:40,y:16,t:'lamp',s:1},
 {x:42,y:16,t:'anchor',w:2,h:2,s:1,m:["A cast-iron anchor from the old packet steamer.", "Brass plaque: HALE HARBOR — EST. 1867."]},
 {x:44,y:16,t:'bench',s:1},
 // East Longshore Hall & Cannery Row (clear yard between halls; tight wall-anchored service & single east cargo bay by hb_loader)
 {x:46,y:22,t:'crates',s:1},
 {x:46,y:23,t:'barrel',c:'#8A6A3A',s:1},
 {x:47,y:28,t:'container',w:2,c:'#C2492F',s:1},
 {x:47,y:29,t:'container',w:2,c:'#2F8A9A',s:1},
 {x:47,y:31,t:'crates',s:1},
 {x:46,y:32,t:'forklift',s:1},
 {x:45,y:34,t:'barrel',c:'#B8643A',s:1},
 {x:35,y:34,t:'fishbox',s:1},
 // SE Harbor Park — Kids Playground (swings, slide, sandbox + overlooking bench)
 {x:45,y:38,t:'bench',s:1},
 {x:43,y:39,t:'swings',w:2,s:1,m:["A pair of weathered harbor swings.", "The chains creak in the salt breeze."]},
 {x:45,y:41,t:'slide',w:2,s:1,m:["A galvanized slide overlooking the harbor.", "Polished bright by a hundred raincoats."]},
 {x:47,y:42,t:'sandbox',w:2,s:1,m:["A wooden sandbox filled with harbor beach sand.", "Someone built a crooked seawall out of wet sand."]},
 // SW Harbor Market & Chandlery (B14 Rope & Tar)
 {x:8,y:37,t:'stall',w:2,c:'#2F8A9A',s:1},
 {x:11,y:37,t:'stall',w:2,c:'#C2492F',s:1},
 {x:14,y:37,t:'stall',w:2,c:'#E8B23D',s:1},
 {x:11,y:40,t:'stall',w:2,c:'#4C9A5E',s:1},
 {x:17,y:37,t:'barrel',c:'#E8743A',s:1},
 {x:9,y:41,t:'fishbox',s:1},
 {x:17,y:42,t:'crates',s:1},
 {x:3,y:43,t:'barrel',c:'#8A6A3A',s:1},
 {x:5,y:43,t:'rope',s:0},
 {x:9,y:43,t:'pots',s:1},
 {x:7,y:44,t:'bench',s:1},
 {x:15,y:44,t:'bench',s:1},
 // SE Union Hall & Ferry Quay
 {x:33,y:44,t:'netrack',w:2,s:1},
 {x:39,y:43,t:'planter',c:'#E8B23D',s:1},
 {x:39,y:44,t:'lamp',s:1},
 {x:46,y:45,t:'pots',s:1},
 {x:47,y:44,t:'bench',s:1}];
const HB_ZONES=[   // [id,x0,y0,x1,y1,ambient hex]  Z5 Quay/Breakwater, Z1 The Gut, Z3 Old Town, Z4 Cannery Row, Z2 Drydock (later entries win)
 [5,0,36,49,51,'#2F4A55'],[1,0,10,11,35,'#3A4040'],[3,0,0,38,9,'#315E63'],[4,36,8,49,44,'#7A3E2F'],[2,17,8,32,26,'#2F3E46']];
const HB_POOLS=[   // outdoor light pools [x,y,r(tiles),hex,alpha]  (CF_81 3.9; at most 4 on any screen)
 [5,21,2,'#E0A458',.28],[24,7,3,'#E8A33D',.30],[24,18,2,'#9FB7B0',.24],[33,12,2,'#E8A33D',.26],[42,25,2,'#E0A458',.26],[45,8,2,'#E0A458',.24],[12,38,2,'#E8A33D',.26],
 [36,32,2,'#E8A33D',.28],[12,29,2,'#E8A33D',.28],[20,45,3,'#E8A33D',.34],[41,45,2,'#9FC4D4',.22],[37,43,2,'#D9C7A3',.24]];

/* ---- outdoor NPCs (positions slightly moved from the Bible where they would block the entry mat) ---- */
const HB_OUT_NPCS=[
 {id:'hb_docker',civ:'guard',x:2,y:22,d:'r',name:'GATE DOCKER',f:['Cold air. No rain. That\'s the harbor.','Watch the gulls. They steal.']},
 {id:'hb_lkid',civ:'kid',x:29,y:32,d:'u',name:'LIGHTHOUSE KID',f:["He's gonna come back. He promised."]},
 {id:'hb_fisher',civ:'fisher',x:17,y:33,d:'r',name:'QUAY FISHER',f:['Tug bought bait here once.','Paid full price. Real one, he was.']},
 {id:'hb_fishwife',civ:'vendor',x:9,y:24,d:'l',name:'FISH WIFE',f:['Cod. Eel. Whatever the net gave.','Ice is extra.']},
 {id:'hb_oldsalt',civ:'slicker',x:23,y:34,d:'d',name:'OLD SALT',f:['Used to watch Tug at the Basin.','Now I walk out to his jersey.']},
 {id:'hb_crabkid',civ:'kid2',x:36,y:34,d:'l',sit:1,name:'CRAB KID',f:['Seven crabs. One bucket.','They keep leaving.']},
 {id:'hb_painter',civ:'painter',x:13,y:24,d:'d',name:'PAINTER',f:['Third coat on the Hall this year.','Nobody asks why.']},
 {id:'hb_welder',civ:'welder',x:31,y:10,d:'d',name:'WELDER',f:["Don't look at the arc.","People always look."]},
 {id:'hb_deckhand',civ:'sailor',x:34,y:36,d:'d',name:'DECKHAND',f:["Ferry's chained. Harbor first.",'Not my rule.'],c:['Ferry runs when you say.']},
 {id:'hb_gulllady',civ:'granny',x:3,y:33,d:'r',name:'GULL LADY',f:["Don't feed them.",'I feed them.']},
 {id:'hb_messenger',civ:'courier',x:21,y:10,d:'l',name:'MESSENGER',f:["Basin's closed to strangers.",'Even to me.']},
 {id:'hb_cook',civ:'cook',x:12,y:15,d:'d',name:'BRINE COOK',f:['Chowder. Hot. Cheap.','Tell no one about the pepper.']},
 {id:'hb_mender',civ:'sailor',x:16,y:15,d:'d',name:'NET MENDER',f:['Knots hold. People do not.','Hand me that twine.']},
 {id:'hb_shopper',civ:'fan',x:14,y:16,d:'r',name:'SHOPPER',f:['Closers win every close one.','Funny how that works.']},
 {id:'hb_yardman',civ:'welder',x:3,y:6,d:'r',name:'BOAT WRIGHT',f:["She'll float by spring.","Spring's been late for years."]},
 {id:'hb_loader',civ:'slicker',x:33,y:11,d:'r',name:'LOADER',f:['Heavy today. Heavier tomorrow.',"That's the job."]},
 {id:'hb_sketch',civ:'painter',x:19,y:12,d:'u',name:'SKETCH ARTIST',f:['Drawing the Basin from memory.','The lines never close.']},
 {id:'hb_walker',civ:'sailor',x:22,y:37,d:'r',name:'DOCK WALKER',patrol:1,loop:[[22,37],[23,37],[24,37],[25,37],[26,37],[27,37],[28,37],[27,37],[26,37],[25,37],[24,37],[23,37]],f:['Counting boats. Always one short.']},
 {id:'hb_kidrun',civ:'kid2',x:13,y:14,d:'r',name:'RUNNING KID',patrol:1,loop:[[13,14],[14,14],[15,14],[16,14],[17,14],[18,14],[19,14],[18,14],[17,14],[16,14],[15,14],[14,14]],f:['Tag! You\'re it. Kidding.','Gotta go.']},
 {id:'hb_runner',civ:'runner',x:11,y:11,d:'r',name:'DOCK RUNNER',patrol:1,loop:[[11,11],[12,11],[13,11],[14,11],[15,11],[16,11],[17,11],[18,11],[19,11],[20,11],[21,11],[22,11],[23,11],[24,11],[25,11],[26,11],[25,11],[24,11],[23,11],[22,11],[21,11],[20,11],[19,11],[18,11],[17,11],[16,11],[15,11],[14,11],[13,11],[12,11]],f:['Tug ran this row. Every morning.','Hard to keep up.']}];
// v3.20T: outdoor people move to their new tiles (same ids, same lines; CF_81 3.7)
{const P={'hb_docker': [3, 20, 'r'], 'hb_oldsalt': [11, 20, 'l'], 'hb_fishwife': [7, 28, 'l'], 'hb_yardman': [46, 8, 'l'], 'hb_mender': [9, 36, 'd'], 'hb_shopper': [13, 39, 'u'], 'hb_cook': [12, 36, 'd'], 'hb_fisher': [22, 9, 'd'], 'hb_messenger': [27, 9, 'l'], 'hb_sketch': [39, 21, 'l'], 'hb_painter': [40, 25, 'r'], 'hb_loader': [46, 30, 'l'], 'hb_welder': [34, 32, 'd'], 'hb_deckhand': [41, 45, 'd'], 'hb_gulllady': [10, 45, 'd'], 'hb_lkid': [20, 44, 'd'], 'hb_crabkid': [29, 46, 'l']},L={'hb_walker': [32, 40, 45], 'hb_kidrun': [37, 43, 8], 'hb_runner': [2, 37, 1]};
 HB_OUT_NPCS.push({id:'hb_vance',civ:'coach',x:26,y:19,d:'l',name:'COACH VANCE',act:'drill',drill:'t2_crush',f:['Circuit Drillmaster Vance.','Hale Harbor is CRUSH THE CARRIER — 4-way keep-away on the dockyard field.','Style on them, force fumbles, and hold the 2x Hotspot.']});
 for(const n of HB_OUT_NPCS){const p=P[n.id];if(p){n.x=p[0];n.y=p[1];n.d=p[2]}const l=L[n.id];if(l){const a=[];for(let x=l[0];x<=l[1];x++)a.push([x,l[2]]);for(let x=l[1]-1;x>l[0];x--)a.push([x,l[2]]);n.loop=a;n.x=l[0];n.y=l[2];n.d='r'}}}


/* ---- interiors ----
   props: {x,y,k:art kind,w,h,s:solid,m:text lines,wall:true for things hung on the back wall}
   clutter: [x,y,kind] floor decals;  pools: [x,y,radiusTiles,hex,alpha];  npcs use f (first), w (after a crew), c (after the captain) */
const HBI={
 hb_B02:{hb:1,w:10,h:8,fl:'plank',floor:'#6E5238',wall:'#4A3A30',wl:'wain',acc:'#E6DCC8',acc2:'#A9542F',title:"CADOGAN'S  -  ROOM 3",
  arch:{type:'residential',variant:'boarding',
   zones:[
    {x:3,y:4,w:3,h:2,kind:'rug',col:'#6E3B2B',border:'#E6DCC8',trim:'#C88A52'},
    {x:7,y:2,w:2,h:1,kind:'tile',col:'rgba(160,185,190,.35)',border:'rgba(40,55,60,.45)'},
    {x:7,y:5,w:2,h:2,kind:'bay',col:'rgba(40,30,22,.32)',border:'rgba(230,220,200,.35)'},
    {x:4,y:6,w:2,h:1,kind:'mat',col:'#7D4E2D',border:'#E6DCC8'}
   ],
   wallDeco:[{x:1,y:1,kind:'frame',col:'#8A4F3C'}]},
  props:[
   {x:1,y:2,k:'bunk',w:2,s:1,act:'bed',m:['Rest. Save.']},
   {x:3,y:2,k:'box',s:1},
   {x:8,y:2,k:'shelf',s:1},
   {x:1,y:4,k:'table',s:1},
   {x:2,y:4,k:'chair',s:1},
   {x:1,y:6,k:'plant',s:1},
   {x:8,y:5,k:'dummy',s:1,act:'testref',m:['Test yourself.']},
   {x:4,y:1,k:'window',w:2,wall:1,m:['The light blinks. Slow. Steady.']},
   {x:7,y:1,k:'basin',wall:1}
  ],
  clutter:[[3,6,'boots'],[2,6,'bag'],[4,4,'mug'],[7,3,'paper']],
  pools:[[5,2,2.2,'#E8A33D',.26],[5,1,1.8,'#9FC4D4',.22]],
  npcs:[{id:'hb_cadogan',civ:'granny',x:6,y:4,d:'l',name:'MRS. CADOGAN',f:["Rent's Friday. Don't be shy about the stairs.",'Man before you was a ballplayer too.','Left in a hurry.'],w:["Rent's still Friday."],c:["You're still here. That's something.",'Most of \'em leave.']}]},
 hb_B03:{hb:1,w:12,h:9,fl:'plank',floor:'#8A6A4A',wall:'#3E5F62',wl:'panel',acc:'#E8A33D',acc2:'#4E7C7A',title:'THE BOAT SHED  -  MEMBERS ONLY',
  arch:{type:'clubhouse',variant:'harbor-shed',
   zones:[
    {x:5,y:4,w:2,h:4,kind:'runner',col:'rgba(62,95,98,.38)',border:'rgba(232,163,61,.5)'},
    {x:8,y:5,w:3,h:3,kind:'rug',col:'#365255',border:'#E8A33D',trim:'#A9542F'},
    {x:5,y:7,w:2,h:1,kind:'mat',col:'#4A3B2A',border:'#E8A33D'}
   ]},
  props:[
   {x:2,y:1,k:'photo',wall:1,m:["Hale Harbor. The '14 crew."]},
   {x:8,y:1,k:'oars',wall:1},
   {x:10,y:1,k:'board',wall:1},
   {x:4,y:2,k:'locker',w:2,s:1,act:'squad'},
   {x:6,y:2,k:'mirror',w:2,s:1,act:'team'},
   {x:1,y:3,k:'trophy',s:1,m:["Hale Harbor, '14. One trophy. One name."]},
   {x:1,y:5,k:'bench',s:1},{x:1,y:6,k:'bench',s:1},
   {x:10,y:3,k:'note',s:1,m:['Coach Pell called. Said he\'s proud.','- Manager.']},
   {x:9,y:5,k:'bench',s:1},{x:10,y:5,k:'table',s:1}
  ],
  clutter:[[3,7,'bag'],[7,6,'tape'],[4,7,'bottle'],[8,7,'towel']],
  pools:[[6,2,3,'#E8A33D',.30],[2,4,1.8,'#4E7C7A',.22]],
  npcs:[
   {id:'hb_skeeter',civ:'coach',x:8,y:4,d:'d',name:'SKEETER MOSS',f:['Manager said you were coming.',"Didn't say you'd be small.","Locker's yours. Don't break the mirror."],w:['Three down. One light to go.',"Tug cleared all three. Clean."],c:['You did it.','Now the hard part.','Being it.']},
   {id:'hb_zd',civ:'runner',x:9,y:6,d:'l',name:'ZERO DAY',f:['Kid by the light was staring at my cleats.','Nobody here looks at you like an away team.']},
   {id:'hb_riptide',civ:'courier',x:9,y:7,d:'l',name:'"RIPTIDE" STERLING',when:'afterCaptain',f:[]}
  ]},
 hb_B04:{hb:1,w:12,h:9,fl:'plank',floor:'#6A6A62',wall:'#34505A',wl:'board',acc:'#A9542F',acc2:'#9FC4D4',title:'GILLNET LOFT  -  CREW FLOOR',
  arch:{type:'crew_hq',variant:'cold-loft',
   zones:[
    {x:1,y:2,w:10,h:3,kind:'tile',col:'rgba(76,108,116,.32)',border:'rgba(159,196,212,.4)'},
    {x:5,y:6,w:2,h:2,kind:'runner',col:'rgba(52,80,90,.36)',border:'rgba(169,84,47,.5)'},
    {x:5,y:7,w:2,h:1,kind:'mat',col:'#4A3B2A',border:'#A9542F'}
   ]},
  props:[
   {x:2,y:1,k:'nets',w:2,wall:1},
   {x:7,y:1,k:'scale',wall:1,m:['Reads zero. Reads zero since the strike.']},
   {x:9,y:1,k:'icebox',wall:1,m:['Locked. Cold comes through the seams.']},
   {x:1,y:3,k:'table',w:2,s:1},{x:1,y:5,k:'bin',s:1},{x:1,y:6,k:'bin',s:1},
   {x:9,y:3,k:'crates',w:2,s:1},{x:9,y:5,k:'table',s:1},{x:9,y:6,k:'bench',s:1}
  ],
  clutter:[[3,7,'crate'],[8,7,'sign'],[6,3,'ice'],[2,7,'boots']],
  pools:[[5,3,2.5,'#E8A33D',.26],[9,2,2,'#9FC4D4',.26]],
  npcs:[
   {id:'hb_rita',crew:'baitdogs',x:5,y:4,d:'d',name:'RITA "ROPES" CALLOWAY',f:["You're the Spillway kid.","This floor's ours. Always has been.","Want the ice? Come take it."],w:["Cold room's yours. Don't leave the door open.",'Tug worked this floor once.','Never cut a corner. Drove me nuts.'],c:['Whole harbor\'s yours now.',"Tug would've liked how you did it.","Bram won't."]},
   {id:'hb_pete',civ:'fan',x:3,y:5,d:'r',name:'PETE "TEN-TON" OKAFOR',f:['Mind the wet. It\'s always wet.',"Boss is in a mood. She's always in a mood."],w:['You hit like a forklift.',"That's a compliment."],c:['Tell the light I said hey. It won\'t answer.']},
   {id:'hb_dockhand',civ:'vendor',x:8,y:6,d:'l',name:'DOCK HAND',f:["Don't slip. I just mopped.","I always just mopped."],c:["Town hasn't been this loud since the strike."]}
  ]},
 hb_B05:{hb:1,w:12,h:9,fl:'herring',floor:'#5A5046',wall:'#4A3E2C',wl:'brick',acc:'#A9542F',acc2:'#E6DCC8',title:'LONGSHORE HALL  -  LOCAL 14',
  arch:{type:'crew_hq',variant:'boatwright-hall',
   zones:[
    {x:4,y:2,w:5,h:4,kind:'bay',col:'rgba(42,32,24,.35)',border:'rgba(230,220,200,.4)'},
    {x:5,y:7,w:2,h:1,kind:'mat',col:'#4A3B2A',border:'#E6DCC8'}
   ]},
  props:[
   {x:2,y:1,k:'hooks',wall:1,m:['Every hook has a shadow. One\'s missing.']},
   {x:9,y:1,k:'paint',wall:1},
   {x:5,y:3,k:'hull',w:3,h:2,s:1,m:["Name's painted over. Twice."]},
   {x:1,y:2,k:'tools',s:1},{x:1,y:3,k:'bench',s:1},{x:1,y:6,k:'bench',s:1},
   {x:10,y:3,k:'blocks',s:1},{x:10,y:5,k:'blocks',s:1},{x:10,y:6,k:'crates',s:1}
  ],
  clutter:[[5,6,'dust'],[3,6,'tool'],[8,6,'rag'],[9,4,'pail']],
  pools:[[6,3,3,'#E8A33D',.26],[2,4,1.8,'#4E7C7A',.22]],
  npcs:[
   {id:'hb_deke',crew:'longshore',x:6,y:5,d:'d',name:'DEKE MARROW',f:["You're small.","Tug was small too.","Won clean. Dumb way to win."],w:['Huh.',"Didn't see that.",'Nobody sees that.'],c:["Bram's the wall. I'm just the dock.",'You beat the wall. Remember that.']},
   {id:'hb_splinter',civ:'fan',x:2,y:4,d:'r',name:'"SPLINTER" JIM DOYLE',f:['Careful. Everything here bites.','Even the wood.'],w:["Deke doesn't say 'huh' to just anyone."],c:["Deke didn't say nothin'.","That's his way of saying it."]}
  ]},
 hb_B06:{hb:1,w:12,h:9,fl:'steel',floor:'#6A6F72',wall:'#4F3228',wl:'panel',acc:'#7A3E2F',acc2:'#CFC3A5',title:'CANNERY CLUB  -  WE PACK HEAVY',
  arch:{type:'crew_hq',variant:'cannery-floor',
   zones:[
    {x:1,y:2,w:6,h:2,kind:'tile',col:'rgba(58,64,68,.55)',border:'rgba(207,195,165,.35)'},
    {x:8,y:2,w:3,h:3,kind:'bay',col:'rgba(122,62,47,.25)',border:'rgba(232,163,61,.45)'},
    {x:4,y:4,w:4,h:3,kind:'bay',col:'rgba(36,42,46,.32)',border:'rgba(207,195,165,.45)'},
    {x:5,y:7,w:2,h:1,kind:'mat',col:'#4A3B2A',border:'#CFC3A5'}
   ]},
  props:[
   {x:2,y:1,k:'line',w:4,wall:1,m:['Runs on a timer. Nobody knows where.']},
   {x:9,y:2,k:'crates',w:2,h:2,s:1},
   {x:6,y:3,k:'hook',s:1,m:['Turns. Nothing attached.']},
   {x:1,y:4,k:'tools',s:1},{x:1,y:6,k:'bench',s:1},
   {x:9,y:6,k:'bench',s:1},{x:10,y:7,k:'crates',s:1}
  ],
  clutter:[[3,7,'can'],[7,7,'glove'],[4,4,'paper'],[8,6,'pail']],
  pools:[[6,3,3,'#E8A33D',.26],[9,3,1.8,'#9FC4D4',.22]],
  npcs:[
   {id:'hb_marla',crew:'gantry',x:6,y:5,d:'d',name:'MARLA "GANTRY" QUINN',f:["You're the Spillway kid.","Good. Saves me a walk.","Let's see if you survive the crane."],w:['Hm.',"You've got hands. Hands don't lie.","Bram's next."],c:['Bram fell.','Huh.','Somebody finally did.']},
   {id:'hb_wick',civ:'fan',x:3,y:5,d:'r',name:'"WICK" FERRER',f:['Boss hits like a crane. Obviously.','Watch the second half. She gets meaner.'],c:["You're the first who made it look easy."]}
  ]},
 hb_B07:{hb:1,w:11,h:9,fl:'check',floor:'#2E3242',wall:'#3C2E3E',wl:'board',acc:'#E8A33D',acc2:'#9FC4D4',title:'SALT ARCADE  -  PIER 3',
  arch:{type:'arcade',variant:'pier-arcade',
   zones:[
    {x:1,y:3,w:8,h:1,kind:'runner',col:'rgba(232,163,61,.18)',border:'rgba(232,163,61,.45)'},
    {x:1,y:5,w:3,h:3,kind:'tile',col:'rgba(42,32,50,.6)',border:'rgba(159,196,212,.45)'},
    {x:4,y:7,w:2,h:1,kind:'mat',col:'#4A3B2A',border:'#E8A33D'}
   ]},
  props:[
   {x:1,y:2,k:'cab',s:1},{x:2,y:2,k:'cab',s:1},{x:4,y:2,k:'cab',s:1},{x:5,y:2,k:'cab',s:1},
   {x:9,y:2,k:'crane',s:1,w:1,m:['The crane cabinet. The claw is the real game.']},
   {x:9,y:3,k:'change',s:1},
   {x:2,y:5,k:'counter',w:2,s:1,m:['Rubber eels. Toy boats. A whistle.']},
   {x:1,y:6,k:'shelf',s:1},
   {x:8,y:6,k:'bench',s:1},
   {x:8,y:1,k:'flyer',wall:1,m:['CELLAR FIELD  -  INVITE ONLY.']}
  ],
  clutter:[[3,3,'token'],[6,3,'ticket'],[9,7,'broom'],[8,5,'stool']],
  pools:[[3,2,2.5,'#E8A33D',.28],[9,3,1.8,'#9FC4D4',.22]],
  npcs:[
   {id:'hb_marv',civ:'vendor',x:2,y:6,d:'u',name:'MARV',act:'arcade',f:['One token. One shot.','Beat the score, you get the gear.','Nobody beats the score.'],c:["You're the first to beat the light AND the machine.","That's a weird trophy."]},
   {id:'hb_pip',civ:'kid',x:5,y:3,d:'u',name:'PIP',f:["Tug's score. Nobody's touched it.",'My cousin plays in the Cellar Field. It\'s secret. You ever been?',"Bring it home. Like Tug."]}
  ]},
 hb_B08:{hb:1,w:10,h:8,fl:'check',floor:'#A8AAA0',wall:'#4F6F5C',wl:'tile',acc:'#E8D8B0',acc2:'#A9542F',title:'APOTHECARY  -  COLD REMEDIES',
  arch:{type:'shop',variant:'apothecary',
   zones:[
    {x:1,y:2,w:8,h:2,kind:'tile',col:'rgba(79,111,92,.28)',border:'rgba(79,111,92,.55)'},
    {x:4,y:5,w:2,h:2,kind:'runner',col:'rgba(169,84,47,.16)',border:'rgba(169,84,47,.4)'},
    {x:7,y:5,w:2,h:2,kind:'rug',col:'#557260',border:'#E8D8B0'},
    {x:4,y:6,w:2,h:1,kind:'mat',col:'#4F6F5C',border:'#E8D8B0'}
   ],
   wallDeco:[{x:2,y:1,w:2,kind:'window'}]},
  props:[
   {x:1,y:2,k:'shelf',w:4,s:1,m:['Tinctures. Ointments. Nothing stronger.']},
   {x:7,y:2,k:'mortar',s:1},{x:8,y:2,k:'shelf',s:1},
   {x:2,y:4,k:'counter',w:4,s:1},
   {x:6,y:4,k:'ledger',s:1,m:['Orders. Names. A page torn out.']},
   {x:8,y:5,k:'bench',s:1},{x:7,y:5,k:'stool',s:1},
   {x:1,y:6,k:'plant',s:1},{x:2,y:6,k:'box',s:1},
   {x:7,y:1,k:'scale',wall:1}
  ],
  clutter:[[3,5,'bottle'],[7,3,'rag'],[3,6,'coat']],
  pools:[[4,3,2.5,'#E8A33D',.26],[8,4,1.8,'#D9C7A3',.20]],
  npcs:[{id:'hb_ivy',civ:'clinic',x:4,y:3,d:'d',name:'IVY',f:['You look like you need something. Everyone does.',"Take this or don't. It's your lungs."],w:['Still standing. Good. That\'s the whole trick.'],c:["The harbor's cold. People forget that."],extra:['Closers buy ice here. A lot of ice.']}]},
 hb_B09:{hb:1,w:10,h:8,fl:'plank',floor:'#5A4632',wall:'#5A5040',wl:'board',acc:'#A9542F',acc2:'#4E7C7A',title:"SHIP'S STORE  -  SALVAGE & SWAP",
  arch:{type:'shop',variant:'salvage-cage',
   zones:[
    {x:1,y:2,w:8,h:2,kind:'tile',col:'rgba(42,36,28,.45)',border:'rgba(169,84,47,.45)'},
    {x:4,y:5,w:2,h:2,kind:'runner',col:'rgba(78,124,122,.22)',border:'rgba(169,84,47,.45)'},
    {x:4,y:6,w:2,h:1,kind:'mat',col:'#4A3B2A',border:'#A9542F'}
   ],
   wallDeco:[{x:2,y:1,kind:'window'}]},
  props:[
   {x:1,y:2,k:'pile',w:2,h:2,s:1},
   {x:7,y:2,k:'shelf',s:1},{x:8,y:2,k:'prop',s:1},
   {x:3,y:4,k:'cage',w:4,s:1,m:['Trade what you got. Once.']},
   {x:1,y:6,k:'crates',s:1},
   {x:8,y:5,k:'table',s:1},{x:8,y:6,k:'box',s:1},
   {x:6,y:1,k:'helmet',wall:1,m:['Glass is fogged. Someone was in there a long time.']}
  ],
  clutter:[[2,5,'chain'],[7,6,'bucket'],[3,5,'tag'],[2,6,'oil']],
  pools:[[5,3,2.5,'#E8A33D',.26],[8,4,1.5,'#4E7C7A',.22]],
  npcs:[{id:'hb_sable',civ:'broker',x:5,y:3,d:'d',name:'SABLE',act:'swap',f:['You got power-ups. I got a cage.','One swap. Then the cage closes.',"That's the rule."],w:['Tug pawned his ring here.',"Bought cleats for the kids' league.",'Never got it back. Still here.'],c:["You're the only one who ever used the cage and won.","Or didn't. I don't keep records."]}]},
 hb_B10:{hb:1,w:11,h:8,fl:'tile',floor:'#7C9298',wall:'#3F6A6C',wl:'tile',acc:'#DCE6E3',acc2:'#A9542F',title:'FISH MARKET  -  BACK ROOM',
  arch:{type:'shop',variant:'fish-market',
   zones:[
    {x:1,y:2,w:9,h:2,kind:'tile',col:'rgba(48,88,92,.35)',border:'rgba(220,230,227,.45)'},
    {x:4,y:5,w:2,h:2,kind:'runner',col:'rgba(63,106,108,.28)',border:'rgba(220,230,227,.4)'},
    {x:4,y:6,w:2,h:1,kind:'mat',col:'#3F6A6C',border:'#DCE6E3'}
   ],
   wallDeco:[{x:2,y:1,w:2,kind:'window'}]},
  props:[
   {x:1,y:2,k:'crates',s:1},{x:2,y:2,k:'crates',s:1},{x:8,y:2,k:'icebin',w:2,s:1,m:['Cold enough to hurt.']},
   {x:1,y:4,k:'icebin',w:4,s:1,m:['Cold enough to hurt.']},{x:1,y:4,k:'fishtray',w:4},
   {x:7,y:4,k:'table',w:2,s:1},{x:7,y:4,k:'fishtray',w:2},
   {x:1,y:6,k:'crates',w:1,s:1},{x:9,y:6,k:'crates',w:1,s:1},
   {x:7,y:1,k:'scale',wall:1,m:['Reads zero. Reads zero since the strike.']}
  ],
  clutter:[[3,5,'scrap'],[6,3,'scoop'],[8,3,'knife'],[2,6,'boots']],
  pools:[[4,3,2.5,'#9FC4D4',.26],[8,4,1.8,'#E8A33D',.20]],
  npcs:[{id:'hb_cormac',civ:'vendor',x:4,y:3,d:'d',name:'CORMAC',f:['You want fish? I got fish.',"Tug's mom works here.",'She won\'t talk about him.'],w:['Fish are cold. Customers are colder.'],c:["You're the one.","She watched you, you know."]}]},
 hb_B11:{hb:1,w:8,h:7,fl:'plank',floor:'#6A5A3C',wall:'#4A5C40',wl:'board',acc:'#A9542F',acc2:'#E6DCC8',title:'BAIT & TACKLE  -  LIVE EELS',
  arch:{type:'shop',variant:'tackle-shack',
   zones:[
    {x:1,y:2,w:6,h:2,kind:'tile',col:'rgba(56,74,48,.35)',border:'rgba(230,220,200,.35)'},
    {x:3,y:5,w:2,h:1,kind:'mat',col:'#4A3B2A',border:'#E6DCC8'}
   ],
   wallDeco:[{x:2,y:1,kind:'window'}]},
  props:[
   {x:1,y:2,k:'tank',w:2,s:1,m:["Eels. They don't look happy."]},
   {x:6,y:2,k:'shelf',s:1},
   {x:3,y:4,k:'counter',w:3,s:1},
   {x:6,y:4,k:'stool',s:1},{x:6,y:5,k:'crates',s:1},
   {x:5,y:1,k:'rods',wall:1,m:['For sale. Not for you.']}
  ],
  clutter:[[1,4,'bucket'],[5,3,'paper'],[3,3,'knife']],
  pools:[[4,3,2,'#E8A33D',.26],[2,3,1.5,'#4E7C7A',.22]],
  npcs:[{id:'hb_finn',civ:'coach',x:4,y:3,d:'d',name:'FINN',act:'tip',f:["Fish don't lie. People do.","You want bait or a story?","Bait's cheaper."],extra:['Never caught anything. Said he liked the quiet.']}]},
 hb_B12:{hb:1,w:12,h:9,fl:'plank',floor:'#4A3A2A',wall:'#4A2C30',wl:'brick',acc:'#E8A33D',acc2:'#A9542F',title:'THE BILGE',
  arch:{type:'tavern',variant:'harbor-pub',
   partitions:[{x:7,y:2,w:1,h:2}],
   zones:[
    {x:1,y:4,w:6,h:1,kind:'runner',col:'rgba(169,84,47,.20)',border:'rgba(232,163,61,.35)'},
    {x:8,y:4,w:3,h:4,kind:'rug',col:'#5A2E2A',border:'#E8A33D',trim:'#A9542F'},
    {x:1,y:6,w:3,h:2,kind:'rug',col:'#4E3228',border:'rgba(232,163,61,.45)'},
    {x:5,y:7,w:2,h:1,kind:'mat',col:'#4A3B2A',border:'#E8A33D'}
   ]},
  props:[
   {x:2,y:3,k:'bar',w:5,s:1},
   {x:2,y:4,k:'stool',s:1},{x:3,y:4,k:'stool',s:1},{x:5,y:4,k:'stool',s:1},
   {x:1,y:7,k:'bench',s:1},{x:2,y:7,k:'table',s:1},
   {x:9,y:5,k:'table',s:1},{x:8,y:7,k:'table',s:1},
   {x:1,y:1,k:'bell',wall:1,m:["Rings when the door opens. Never when it closes."]},
   {x:5,y:1,k:'taps',w:2,wall:1},
   {x:3,y:1,k:'photo',wall:1,m:['#14. "Brinewick\'s Closer." Photo\'s from before.','A back to the camera, mid-throw. Face not visible.']},
   {x:9,y:1,k:'darts',wall:1}
  ],
  clutter:[[6,4,'glass'],[3,6,'peanuts'],[10,7,'mop']],
  pools:[[4,3,2.5,'#E8A33D',.26],[9,5,1.8,'#9FC4D4',.22],[2,7,1.5,'#A9542F',.2]],
  npcs:[
   {id:'hb_duke',civ:'vendor',x:4,y:2,d:'d',name:'DUKE',f:["Tug's stool. Nobody sits in it.","Bram's crew wanted it. We said no.","Real fans walk out to the nail."],c:['You beat the wall.',"Town'll talk about that a year.","Tug's stool's still empty."]},
   {id:'hb_marty',civ:'coach',x:7,y:7,d:'r',name:'MARTY',f:['He promised the kid.','He never broke a promise.','So ask who did.'],c:['Maybe you\'re the one who comes back.','Somebody has to be.']},
   {id:'hb_denny',civ:'fan',x:10,y:5,d:'l',name:'DENNY',f:["I heard he's up north. Working.","I heard he's sick.","I heard he's dead. Pick one."],c:['Three versions. Still three.','Ask the light. It knows.']},
   {id:'hb_tommy',civ:'kid',x:9,y:4,d:'d',name:'WEE TOMMY',f:["My brother says Tug's coming Friday.",'He said that last Friday too.'],c:['Are you Tug?',"You're not Tug.",'Okay.']}
  ]},
 hb_B13:{hb:1,w:11,h:8,fl:'check',floor:'#B0A27C',wall:'#2F4258',wl:'wain',acc:'#E8A33D',acc2:'#9FC4D4',title:'PORT OF HALE HARBOR',
  arch:{type:'workplace',variant:'port-office',
   zones:[
    {x:2,y:2,w:6,h:2,kind:'rug',col:'#364C64',border:'#E8A33D',trim:'#9FC4D4'},
    {x:4,y:5,w:2,h:2,kind:'runner',col:'rgba(47,66,88,.25)',border:'rgba(232,163,61,.5)'},
    {x:8,y:3,w:2,h:3,kind:'tile',col:'rgba(47,66,88,.22)',border:'rgba(159,196,212,.45)'},
    {x:4,y:6,w:2,h:1,kind:'mat',col:'#2F4258',border:'#E8A33D'}
   ],
   wallDeco:[{x:2,y:1,kind:'window'}]},
  props:[
   {x:1,y:2,k:'shelf',w:1,h:2,s:1},{x:1,y:5,k:'shelf',s:1},
   {x:3,y:4,k:'table',w:3,s:1},{x:6,y:4,k:'ledger',s:1,m:['Entries. Weather. One page torn.']},
   {x:9,y:4,k:'board',s:1,act:'board'},
   {x:8,y:6,k:'chair',s:1},{x:1,y:6,k:'plant',s:1},
   {x:4,y:1,k:'clip',wall:1,act:'manifest'},
   {x:7,y:1,k:'clock',wall:1},
   {x:9,y:1,k:'radio',wall:1}
  ],
  clutter:[[3,3,'mug'],[5,3,'pencil'],[9,6,'coat']],
  pools:[[5,3,2.5,'#E8A33D',.26],[9,3,1.8,'#9FC4D4',.20]],
  npcs:[{id:'hb_kell',civ:'coach',x:4,y:3,d:'d',name:'OLD MAN KELL',f:["You're the one came in through the Spillway.","We log everyone.","Even the ones who don't want it."],m:["That? Above my pay grade.","Ask the ice man. If he's still alive."],w:['Three crews. Logged.',"Tug's still in the book, you know.",'Never checked out.'],c:["Log's closed. For now."],extra:['A boat took him. No log entry.']}]},
 hb_B14:{hb:1,w:11,h:9,fl:'plank',floor:'#7A5A3E',wall:'#4E3E5A',wl:'board',acc:'#A9542F',acc2:'#E8A33D',title:"PENROSE  -  SHIP'S STORE",
  arch:{type:'shop',variant:'chandlery',
   zones:[
    {x:1,y:2,w:9,h:2,kind:'tile',col:'rgba(56,42,64,.35)',border:'rgba(232,163,61,.4)'},
    {x:4,y:5,w:2,h:3,kind:'runner',col:'rgba(169,84,47,.18)',border:'rgba(232,163,61,.45)'},
    {x:4,y:7,w:2,h:1,kind:'mat',col:'#4A3B2A',border:'#E8A33D'}
   ]},
  props:[
   {x:1,y:2,k:'ropes',w:1,h:2,s:1},{x:3,y:2,k:'shelf',w:3,s:1},{x:9,y:2,k:'tar',s:1},
   {x:3,y:4,k:'counter',w:4,s:1},{x:7,y:4,k:'ledger',s:1,m:['Orders. Names. A page torn out.']},
   {x:1,y:6,k:'bins',s:1},{x:2,y:6,k:'bins',s:1},
   {x:9,y:6,k:'tar',s:1},{x:9,y:7,k:'crates',s:1},
   {x:4,y:1,k:'lanterns',w:2,wall:1},
   {x:8,y:1,k:'wheel',wall:1,m:['Turns. Nothing attached.']}
  ],
  clutter:[[3,6,'twine'],[8,6,'can'],[2,7,'boots']],
  pools:[[5,3,2.5,'#E8A33D',.26],[2,3,1.8,'#4E7C7A',.20]],
  npcs:[{id:'hb_penrose',civ:'coach',x:5,y:3,d:'d',name:'OLD PENROSE',f:["Hands like that, you'll drop the ball.","Rope's cheap. Tar's cheaper.","Don't thank me. Buy something."],w:['Tug bought my rope every spring.','Paid full price. Never haggled.','Bram haggles.'],c:['You beat the wall.',"Light don't care. But I do."]}]},
 hb_B15:{hb:1,w:12,h:9,fl:'herring',floor:'#7A7A6A',wall:'#34506E',wl:'panel',acc:'#E6DCC8',acc2:'#A9542F',title:'UNION HALL  -  LOCAL 14',
  arch:{type:'workplace',variant:'union-hall',
   zones:[
    {x:3,y:4,w:6,h:3,kind:'rug',col:'#3B4E62',border:'#E6DCC8',trim:'#A9542F'},
    {x:5,y:7,w:2,h:1,kind:'mat',col:'#34506E',border:'#E6DCC8'}
   ],
   wallDeco:[{x:2,y:1,w:2,kind:'window'},{x:9,y:1,kind:'window'}]},
  props:[
   {x:1,y:2,k:'books',w:4,s:1},
   {x:9,y:2,k:'piano',w:2,s:1,m:['Out of tune. Plays anyway.']},
   {x:9,y:3,k:'stool',s:1},
   {x:4,y:5,k:'table',w:4,s:1},
   {x:4,y:4,k:'chair',s:1},{x:7,y:4,k:'chair',s:1},{x:3,y:5,k:'chair',s:1},{x:8,y:5,k:'chair',s:1},
   {x:1,y:6,k:'bench',s:1},
   {x:10,y:5,k:'radiator',s:1},
   {x:6,y:1,k:'notice',wall:1,m:['Strike notice. Old. Still up.']}
  ],
  clutter:[[5,4,'paper'],[6,4,'chess'],[10,7,'coat'],[2,5,'mug']],
  pools:[[5,3,2.5,'#D9C7A3',.24],[9,4,2,'#E8A33D',.20]],
  npcs:[
   {id:'hb_dutch',civ:'coach',x:5,y:3,d:'d',name:'DUTCH',pw:'anchor',f:[],pwl:["Line's only as strong as the dumbest foot on it.","Plant like a bollard. Take the hit. Give nothing."],t2:['Still standing. Good.']},
   {id:'hb_agnes',civ:'granny',x:8,y:6,d:'l',name:'SISTER AGNES',f:['Tug was a good boy. Stayed one.',"Someone's wearing his name now.",'He wears it badly.'],c:['Play fair. That\'s all I ask.']}
  ]},
 hb_B16:{hb:1,w:10,h:9,fl:'concrete',floor:'#7A7A74',wall:'#CFC6AE',wl:'brick',acc:'#A9542F',acc2:'#E8A33D',title:"HALE POINT LIGHT  -  KEEPER'S ROOM",
  arch:{type:'residential',variant:'lighthouse',
   partitions:[{x:6,y:2,w:1,h:2}],
   zones:[
    {x:7,y:2,w:2,h:3,kind:'bay',col:'rgba(42,50,56,.38)',border:'rgba(232,163,61,.5)'},
    {x:2,y:4,w:4,h:2,kind:'rug',col:'#6E4332',border:'#E8A33D',trim:'#CFC6AE'},
    {x:4,y:7,w:2,h:1,kind:'mat',col:'#4A3B2A',border:'#E8A33D'}
   ],
   wallDeco:[{x:1,y:1,kind:'window'},{x:7,y:1,kind:'clock'}]},
  props:[
   {x:1,y:2,k:'desk',s:1},{x:2,y:2,k:'ledger',s:1,m:['Weather. Ships. One entry in a different hand.']},{x:1,y:3,k:'chair',s:1},
   {x:8,y:2,k:'hatch',s:1,m:["Up. Locked. Keeper's business."]},
   {x:8,y:4,k:'tools',s:1},
   {x:1,y:5,k:'cot',s:1},{x:1,y:6,k:'box',s:1},
   {x:8,y:6,k:'radiator',s:1},
   {x:3,y:1,k:'lamp',w:2,wall:1,m:['Gears turn. Light sweeps. It never stops.']}
  ],
  clutter:[[2,3,'mug'],[7,5,'radio'],[7,6,'can'],[3,7,'coat']],
  pools:[[4,3,3,'#E8A33D',.28],[4,1,2,'#9FC4D4',.20]],
  npcs:[{id:'hb_gus',civ:'coach',x:4,y:5,d:'d',name:'GUS VALE',pw:'beacon',f:["You're the Voss kid.","Tug stood right there. Same spot.","Said light's honest. Play like it."],pwl:['Fog lies. Light doesn\'t.','Throw where the light is. Not where you hope.'],t2:["The light's still on. So are you."],w:["Bram's up at the drydock.","Always is. Waiting."],c:["Bram never beat Tug straight.","You did. Don't let it go to your head."],extra:["Tug never said goodbye. Not once."]}]}
};
// v2.84: the Basin is a room you walk into once the three crews are down; Bram waits inside (before that, the doors stay shut)
// v2.85: it is Bram's room now, and it shows: Tug's 14 with Bram's name taped over it, cash for the refs, a crate of flags, two bought refs
HBI.hb_B01={hb:1,w:14,h:10,fl:'concrete',floor:'#6A6F72',wall:'#3A4A55',wl:'panel',acc:'#A9542F',acc2:'#9FC6D8',title:'THE BASIN  -  DRY DOCK 14',
  props:[{x:6,y:1,k:'jersey14',w:2,wall:1,m:["Tug's 14. His name's taped over.","KESSLER, in marker. Crooked."]},
   {x:2,y:1,k:'photo',wall:1,m:["Bram and Tug, the '14 crew.","Tug's half is torn off."]},
   {x:10,y:1,k:'board',w:2,wall:1,m:['WINS: 31. FLAGS FOR US: 112.','Nobody wrote CLEAN.']},{x:12,y:1,k:'clock',wall:1},
   {x:4,y:3,k:'trophy',s:1,m:["Tug's trophy. Name scraped off.","BRAM scratched in. Shaky hand."]},
   {x:9,y:3,k:'cash',w:2,s:1,m:['Cash. Banded. Counted twice.',"A ref's name on every band."]},
   {x:1,y:5,k:'cash',s:1,m:['More cash. A note: REFS, SUNDAY.']},
   {x:12,y:5,k:'flagbin',s:1,m:['Yellow flags. A whole crate.','Ready before the game starts.']},
   {x:2,y:3,k:'icebin',s:1,m:['Ice. Paid for. A lot of it.']},
   {x:12,y:3,k:'mirror',s:1,m:["Chalk on the floor here.","Tug's stance. Bram practices it."]},
   {x:2,y:7,k:'bench',s:1,m:['An envelope on the bench.','"Same as always."']}],
  clutter:[[5,8,'tape'],[9,8,'towel'],[8,6,'bottle'],[3,5,'pail'],[10,5,'paper']],pools:[[7,2,3,'#E8A33D',.3],[10,4,1.8,'#9FC6D8',.22],[4,4,1.6,'#E8C53A',.18]],
  npcs:[{id:'hb_bram',crew:'closers',x:7,y:4,d:'d',name:'BRAM KESSLER',f:["You throw into the dark. I've heard.","Heard you're not your brother."],c:["Without the 14 I'm nobody.","Tug never needed a flag.",'Walk out with something.']},
   {id:'hb_ref1',civ:'ref',x:10,y:6,d:'l',name:'LINE JUDGE',f:["Didn't see a thing.",'Never do. Pays better.'],c:['Saw you win. Clean.',"Didn't know we still could."]},
   {id:'hb_ref2',civ:'ref',x:3,y:7,d:'r',name:'BACK JUDGE',f:['Bram calls it. We blow it.',"Envelope's on the bench."],c:['No envelope this week.','Feels lighter, somehow.']},
   {id:'hb_riptide_b',civ:'courier',x:11,y:8,d:'l',name:'"RIPTIDE" STERLING',when:'beforeCaptain',f:['Tug taught me to run.','Then he was gone.']}]};

/* ================================================================================================
   ROUTE 2: GULL'S REACH. The ferry from Hale Harbor to a cold, wind-scoured salt island; its tidal causeway (the Causeway of
   CF_06 11) runs on east to Cinderhold. Built from the Route 2 Build Bible v2 with the builder's canon fixes (CF_01 v2.88).
   Data first (map, buildings, props, people, rooms). Rooms live in HBI with ids r2_* so the harbor room code draws them.
   ================================================================================================ */
const R2W=42,R2H=26;
/* 1 char = 1 tile.  ~ water (solid)  . shingle  _ boardwalk  , salt pan  P pier / slipway  = causeway  # building  D door  r rock (solid) */
const R2G=['~~~~~~~~~~~~~~~~~~~~~~~PP~~~~~~~~~~~~~~~~~',
 '~~~~~~~~~~~~~~~~~~~~~~.PP~~~~~~~~~~~~~~~~~',
 '~~~~~~~~~~~~~~~r.######PP.r...~~~~~~~~~~~~',
 '~~~~~~~~~~~~~~...######PP......~~~~~~~~~~~',
 '~~~~~~~~~~~~~....######PP.########~~~~~~~~',
 '~~~~~~~~~........##D###PP.########~~~~~~~~',
 '~~~~~~~~..................########~~~~~~~~',
 '~~~~~~~.#####.............########...~~~~~',
 '~~~~~~~.#####.............###DD###..r.~~~~',
 '~~~~~~~.#####.........................~~~~',
 '~~~~~~~.##D##.........................~~~~',
 '~~~~~~................................~~~~',
 '~PPPPPPP________....................======',
 '~PPPPPPP________....................======',
 '~~~~~~............,,,,,,,,,,,,,,,,....~~~~',
 '~~~~~~~...........,,,,,,,,,,,,,,,,....~~~~',
 '~~~~~~~..#######..,,,,,,,,,,,,,,,,....~~~~',
 '~~~~~~~..#######..,,,,,,,,,,,,,,,,...r~~~~',
 '~~~~~~~r.#######..,,,,,,,,,,,,,,,,....~~~~',
 '~~~~~~~~.###D###..,,,,,,,,,,,,,,,,...~~~~~',
 '~~~~~~~~~.........,,,,,,,,,,,,,,,,~~~~~~~~',
 '~~~~~~~~~.......................~~~~~~~~~~',
 '~~~~~~~~~~~~~~.................~~~~~~~~~~~',
 '~~~~~~~~~~~~~~~...........~~~r~~~~~~~~~~~~',
 '~~~~~~~~~~~~~~~....~~...~~~~~~~~~~~~~~~~~~',
 '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'];
const R2_ARR=[3,12],R2_GATE=[39,12],R2_GATE2=[39,13],R2_EXITX=41;   // step off the ferry at the pier; the causeway gate is chained until the Dredgers' boss falls
const R2B=[
 {id:'B01',kind:'shop',x:8,y:7,w:5,h:4,doors:[[10,10]],sign:'TIDE SHED',sub:'THE KEEPER',col:'#5C6B73',col2:'#9E8D7A',look:'shed',room:'r2_B01'},
 {id:'B02',kind:'lot',x:26,y:4,w:8,h:5,doors:[[29,8],[30,8]],sign:'SALT WORKS',sub:'CREW I',col:'#8B7D6B',col2:'#4A3B32',look:'tin',room:'r2_B02'},
 {id:'B03',kind:'shop',x:9,y:16,w:7,h:4,doors:[[12,19]],sign:'ANCHORAGE',sub:'FOOD & BUNK',col:'#6B4A35',col2:'#E8E2D0',look:'clap',room:'r2_B03'},
 {id:'B04',kind:'shop',x:17,y:2,w:6,h:4,doors:[[19,5]],sign:'LIFEBOAT',sub:'STATION',col:'#2F6F6A',col2:'#B5643C',look:'brick',room:'r2_B04'}];
/* outdoor props (same art kinds as the harbor where they exist; wreck, saltpile, booth, laundry, gatepost, sign and rake are new and drawn in r2_render.js) */
const R2P=[
 {x:6,y:12,t:'rope',s:0},{x:8,y:11,t:'lamp',s:1},{x:6,y:14,t:'bollard',s:1},
 {x:7,y:8,t:'barrel',c:'#B5643C',s:1},{x:13,y:11,t:'bench',s:1},{x:13,y:7,t:'laundry',w:3,s:0},{x:7,y:7,t:'pots',s:1},
 {x:14,y:4,t:'dryboat',w:2,c:'#B5643C',s:1},{x:16,y:6,t:'pots',s:1},{x:21,y:6,t:'netroll',s:1},{x:25,y:3,t:'buoy',s:0},
 {x:25,y:9,t:'crates',s:1},{x:34,y:7,t:'container',w:2,c:'#B5643C',s:1},{x:36,y:7,t:'saltpile',s:1},{x:37,y:10,t:'saltpile',s:1},{x:33,y:10,t:'cart',s:1},
 {x:20,y:15,t:'saltpile',s:1},{x:26,y:19,t:'saltpile',s:1},{x:31,y:15,t:'saltpile',s:1},{x:23,y:15,t:'rake',s:0},{x:29,y:19,t:'rake',s:0},
 {x:17,y:22,t:'wreck',w:6,h:2,s:1,m:["The MARY KELLY. Ran aground in '09.","Nobody hauled her off.","The gulls own her now."]},
 {x:7,y:16,t:'barrel',c:'#4A6FA5',s:1},{x:14,y:21,t:'bench',s:1},{x:10,y:21,t:'lamp',s:1},{x:16,y:20,t:'fishbox',s:1},
 {x:35,y:11,t:'booth',s:1,m:['TOLL. Paint says 1931.','Nobody has paid in years.']},{x:36,y:14,t:'sign',s:1,m:['CAUSEWAY  -  CINDERHOLD 9 MI.','FLOODS AT HIGH WATER.']},
 {x:37,y:11,t:'gatepost',s:1},{x:37,y:14,t:'gatepost',s:1},{x:34,y:14,t:'lamp',s:1}];
const R2_POOLS=[];   // daylight: no light pools outdoors (Bible 13: baked daylight)
/* ---- outdoor people. f = first, w = after the Flats test, c = after Mud Kelly. Lines <= 37 chars, <= 3 lines. ---- */
const R2_OUT_NPCS=[
 {id:'r2_skipper',civ:'sailor',x:6,y:11,d:'d',name:'SKIPPER NOLL',act:'ferryback',f:['Ferry runs till dark.','Want the harbor? Say so.']},
 {id:'r2_dock',civ:'guard',x:5,y:13,d:'u',name:'DOCKWORKER',f:['Planks are wet. Rope is wet.',"Everything's wet but the salt."]},
 {id:'r2_fisher',civ:'fisher',x:1,y:13,d:'r',name:'NET FISHER',act:'netdrag',f:["Net's full. My back isn't.",'Haul it with me?'],w:['Arms like that, throw with them.']},
 {id:'r2_zd',civ:'runner',x:12,y:11,d:'d',name:'ZERO DAY',f:['Salt. Rust. No lights.','I hate it.']},
 {id:'r2_laundry',civ:'granny',x:14,y:9,d:'u',name:'WASHERWOMAN',f:['Wind dries it in an hour.','Takes it in two.']},
 {id:'r2_crewman',civ:'slicker',x:21,y:7,d:'u',name:'LIFEBOAT HAND',f:['We go out in any weather.','Nobody pays us. Nobody has to.']},
 {id:'r2_saltw',civ:'welder',x:32,y:10,d:'l',name:'SALT WORKER',patrol:1,loop:[[32,10],[31,10],[31,11],[32,11],[33,11],[34,11],[33,11],[32,11]],f:['Rake, dry, bag. Repeat.','Dredgers play like they rake.']},
 {id:'r2_raker',civ:'vendor',x:19,y:17,d:'r',name:'SALT RAKER',patrol:1,loop:[[19,17],[20,17],[21,17],[22,17],[23,17],[24,17],[25,17],[26,17],[27,17],[28,17],[27,17],[26,17],[25,17],[24,17],[23,17],[22,17],[21,17],[20,17]],f:["Salt doesn't care who wins."]},
 {id:'r2_gullkid',civ:'kid',x:22,y:21,d:'d',name:'GULL KID',f:['Forty gulls live in the wreck.','I named eleven.']},
 {id:'r2_oldfish',civ:'fisher',x:18,y:21,d:'d',sit:1,name:'OLD FISHER',f:['Ferry brought a crew once.','Bought flags. Lost anyway.']},
 {id:'r2_runkid',civ:'kid2',x:8,y:15,d:'r',name:'RUNNING KID',patrol:1,loop:[[8,15],[9,15],[10,15],[11,15],[12,15],[13,15],[14,15],[15,15],[14,15],[13,15],[12,15],[11,15],[10,15],[9,15]],f:['Race you to the wreck!','Kidding. You lose.']},
 {id:'r2_riptide',civ:'courier',x:35,y:12,d:'l',name:'"RIPTIDE" STERLING',f:['Watch your step.','The tide takes the slow ones.']},
 {id:'r2_toll',civ:'guard',x:35,y:15,d:'u',name:'TOLL KEEPER',f:["Causeway's shut to crews.",'Beat the Dredgers. Then walk.'],c:["Tide's out. Go on.","Cinderhold's past the smoke."]}];
/* ---- rooms (the harbor room renderer draws them; hbNormalize keeps everyone on a reachable tile) ---- */
Object.assign(HBI,{
 r2_deck:{hb:1,r2:1,deck:1,w:12,h:10,fl:'steel',floor:'#5E676C',wall:'#3A464E',wl:'panel',acc:'#E8E2D0',acc2:'#B5643C',title:'FERRY  -  HALE TO GULL\'S REACH',
  props:[{x:5,y:2,k:'ramp',w:2,s:1,act:'bow'},{x:9,y:1,k:'bell',wall:1,act:'bell'},{x:2,y:1,k:'ring',wall:1,m:['Life ring. HALE HARBOR FERRY.','The paint is newer than the boat.']},
   {x:2,y:5,k:'bench',s:1},{x:9,y:5,k:'bench',s:1},{x:2,y:3,k:'crates',s:1,m:['Mail sacks. Salt bags. A bike.']},{x:9,y:7,k:'crates',s:1,m:['Lobster pots. Tagged for the Reach.']}],
  clutter:[[4,7,'rag'],[7,6,'pail'],[3,8,'boots']],pools:[],
  npcs:[{id:'r2_noll',civ:'sailor',x:7,y:3,d:'d',name:'SKIPPER NOLL',f:["Gull's Reach. Salt and rust.",'Bow ramp when you\'re ready.','Stern takes you back.']},
   {id:'r2_zdf',civ:'runner',x:3,y:6,d:'r',sit:1,name:'ZERO DAY',f:['This boat smells like wet dog.']},
   {id:'r2_ripf',civ:'courier',x:8,y:7,d:'l',name:'"RIPTIDE" STERLING',f:['Harbor ends here.','So does the easy money.']}]},
 r2_B01:{hb:1,r2:1,w:8,h:7,fl:'concrete',floor:'#7A7A74',wall:'#3A464E',wl:'board',acc:'#9E8D7A',acc2:'#B5643C',title:'TIDE SHED',
  arch:{type:'residential',variant:'tide-shed',
   zones:[
    {x:2,y:3,w:3,h:2,kind:'rug',col:'#5D4334',border:'#E8E2D0'},
    {x:3,y:5,w:2,h:1,kind:'mat',col:'#4A3B2A',border:'#9E8D7A'}
   ],
   wallDeco:[{x:6,y:1,kind:'window'}]},
  props:[
   {x:1,y:2,k:'cot',s:1,act:'bed',m:['Rest. Save.']},
   {x:1,y:4,k:'table',s:1},
   {x:6,y:2,k:'radiator',s:1},
   {x:6,y:4,k:'shelf',s:1},
   {x:2,y:1,k:'clock',wall:1},
   {x:4,y:1,k:'notice',wall:1,m:['TIDE TABLE. Low water at four.','Causeway floods at high water.']}
  ],
  clutter:[[2,5,'boots'],[5,5,'coat'],[2,4,'mug']],
  pools:[[4,3,2,'#E8A33D',.22]],
  npcs:[{id:'r2_sela',civ:'granny',x:4,y:3,d:'d',name:'OLD SELA',f:['Tide Shed. Rest if you need.','The Dredgers run the flats.'],w:["Mud's next. He plays it straight."],c:["Causeway's yours now.","Cinderhold's past the smoke."]}]},
 r2_B02:{hb:1,r2:1,w:12,h:9,fl:'concrete',floor:'#9C9384',wall:'#8B5A3C',wl:'board',acc:'#E8E2D0',acc2:'#A55132',title:'SALT WORKS  -  DREDGERS',
  arch:{type:'crew_hq',variant:'salt-works',
   zones:[
    {x:1,y:2,w:4,h:3,kind:'bay',col:'rgba(232,226,208,.18)',border:'rgba(165,81,50,.45)'},
    {x:8,y:2,w:3,h:3,kind:'tile',col:'rgba(90,74,60,.25)',border:'rgba(232,226,208,.45)'},
    {x:4,y:4,w:4,h:3,kind:'bay',col:'rgba(74,58,44,.2)',border:'rgba(232,226,208,.4)'},
    {x:5,y:7,w:2,h:1,kind:'mat',col:'#4A3B2A',border:'#E8E2D0'}
   ]},
  props:[
   {x:1,y:2,k:'pile',w:2,h:2,s:1,m:['Salt bags. Fifty pounds each.','Stacked by hand.']},
   {x:1,y:5,k:'crates',s:1},
   {x:9,y:3,k:'scale',s:1,m:['Reads true.','Somebody checks it every day.']},
   {x:10,y:3,k:'table',s:1},
   {x:1,y:7,k:'bench',s:1},{x:9,y:7,k:'bench',s:1},
   {x:5,y:1,k:'notice',w:2,wall:1,m:['NO FLAGS FOR SALE.','- M.K.']},
   {x:9,y:1,k:'tools',wall:1,m:['Rakes. Shovels. All clean.']}
  ],
  clutter:[[4,6,'dust'],[7,6,'pail'],[3,4,'dust'],[10,6,'boots']],
  pools:[[6,3,2.5,'#E8E2D0',.20]],
  npcs:[
   {id:'r2_mud',crew:'dredgers',x:6,y:4,d:'d',name:'"MUD" KELLY',f:['You beat Bram. Heard.','We don\'t buy flags here.','We play.'],w:["Second string couldn't hold you.",'Now me. First to 14.'],c:['You earned it. No flags here.','Causeway\'s open. Go.']},
   {id:'r2_stack',civ:'fan',x:3,y:4,d:'r',name:'BAG STACKER',f:['Bags weigh fifty.','Mud carries two.']},
   {id:'r2_ref',civ:'ref',x:8,y:5,d:'l',name:'THE FLATS REF',f:['I call what I see.',"Out here that's enough."],c:['Clean game. Write that down.']}
  ]},
 r2_B03:{hb:1,r2:1,w:12,h:9,fl:'plank',floor:'#6B4A35',wall:'#4A3020',wl:'wain',acc:'#E8A33D',acc2:'#B5643C',title:'THE ANCHORAGE',
  arch:{type:'tavern',variant:'island-inn',
   partitions:[{x:8,y:2,w:1,h:2}],
   zones:[
    {x:1,y:4,w:6,h:1,kind:'runner',col:'rgba(181,100,60,.20)',border:'rgba(232,163,61,.35)'},
    {x:2,y:5,w:3,h:3,kind:'rug',col:'#5B3624',border:'#E8A33D'},
    {x:9,y:2,w:2,h:4,kind:'tile',col:'rgba(60,54,48,.48)',border:'rgba(181,100,60,.45)'},
    {x:5,y:7,w:2,h:1,kind:'mat',col:'#4A3B2A',border:'#E8A33D'}
   ]},
  props:[
   {x:1,y:3,k:'bar',w:6,s:1},
   {x:2,y:4,k:'stool',s:1},{x:5,y:4,k:'stool',s:1},
   {x:2,y:6,k:'table',s:1},{x:8,y:6,k:'table',s:1},
   {x:10,y:2,k:'box',s:1},
   {x:10,y:3,k:'crates',s:1,act:'crate'},
   {x:2,y:1,k:'taps',w:2,wall:1},
   {x:5,y:1,k:'photo',wall:1,m:['The Dredgers. Every season.','Same faces. No trophies.']},
   {x:7,y:1,k:'darts',wall:1}
  ],
  clutter:[[3,5,'glass'],[7,7,'peanuts'],[1,7,'mop']],
  pools:[[4,3,2.5,'#E8A33D',.24],[9,5,1.8,'#9FC4D4',.18]],
  npcs:[
   {id:'r2_keep',civ:'vendor',x:4,y:2,d:'d',name:'BARKEEP',f:['Chowder or stew.','Same pot.']},
   {id:'r2_saltwife',civ:'fan',x:3,y:6,d:'l',name:'SALT WIFE',f:["We don't buy flags here.",'You play dirty, you leave.']},
   {id:'r2_courier',civ:'courier',x:9,y:3,d:'r',name:'THE COURIER',f:['I just move the boxes.'],c:["Route's clear.","I'm moving on."]},
   {id:'r2_oldsalt',civ:'fisher',x:9,y:6,d:'l',sit:1,name:'FOUNDRY MAN',f:["Cinderhold's doctor works late.",'Foundry kids cough all winter.']}
  ]},
 r2_B04:{hb:1,r2:1,w:10,h:8,fl:'concrete',floor:'#6E7477',wall:'#2F6F6A',wl:'panel',acc:'#E8E2D0',acc2:'#B5643C',title:'LIFEBOAT STATION',
  arch:{type:'workplace',variant:'rescue-station',
   zones:[
    {x:2,y:2,w:5,h:4,kind:'bay',col:'rgba(47,111,106,.26)',border:'#E8E2D0',trim:'#B5643C'},
    {x:4,y:6,w:2,h:1,kind:'mat',col:'#2F6F6A',border:'#E8E2D0'}
   ],
   wallDeco:[{x:8,y:1,kind:'window'}]},
  props:[
   {x:3,y:3,k:'hull',w:3,h:2,s:1,m:['The lifeboat. Oars inside.','Ready to go. Always.']},
   {x:8,y:2,k:'desk',s:1},{x:8,y:3,k:'radio',s:1},
   {x:8,y:6,k:'tools',s:1,m:['Boathooks. Flares. A spare oar.']},
   {x:1,y:5,k:'box',s:1},{x:1,y:6,k:'bench',s:1},
   {x:2,y:1,k:'oars',wall:1},
   {x:5,y:1,k:'board',w:2,wall:1,m:['RESCUES: 211.','Nobody paid for one.']}
  ],
  clutter:[[2,6,'boots'],[6,6,'pail'],[7,5,'coat']],
  pools:[[5,3,2.5,'#9FC4D4',.22]],
  npcs:[{id:'r2_ida',civ:'slicker',x:7,y:4,d:'l',name:'IDA MARR',pw:'gaff',f:[],pwl:["Tide's coming. You'll need grip.","Take this. Don't fall."],t2:['Hook holds. So should you.']}]}
});

/* ---------------------------------------------------------------- layout normalizer: keeps every prop and person on a valid, reachable tile */
window.__hbAdj=[];
function hbNormalize(){
  const adj=window.__hbAdj;
  for(const id in HBI){const d=HBI[id],w=d.w,h=d.h,ex=[Math.floor(w/2)-1,Math.floor(w/2)],sp=[ex[1],h-2];
    const sol=new Uint8Array(w*h),ctr=new Uint8Array(w*h),fl=(x,y)=>x>=1&&x<=w-2&&y>=2&&y<=h-2,lane=(x,y)=>y>=h-2&&(x===ex[0]||x===ex[1]);
    const mark=(p,isC)=>{for(let yy=0;yy<(p.h||1);yy++)for(let xx=0;xx<(p.w||1);xx++){const X=p.x+xx,Y=p.y+yy;if(X>=0&&Y>=0&&X<w&&Y<h){sol[Y*w+X]=1;if(isC)ctr[Y*w+X]=1}}};
    if(d.arch&&d.arch.partitions)for(const pt of d.arch.partitions)mark(pt,false);
    const free=(x,y,sx,sy)=>{for(let yy=0;yy<sy;yy++)for(let xx=0;xx<sx;xx++){const X=x+xx,Y=y+yy;if(!fl(X,Y)||sol[Y*w+X]||lane(X,Y))return false}return true};
    const near=(p,sx,sy)=>{if(free(p.x,p.y,sx,sy))return [p.x,p.y];for(let r=1;r<8;r++)for(let dy=-r;dy<=r;dy++)for(let dx=-r;dx<=r;dx++){if(Math.max(Math.abs(dx),Math.abs(dy))!==r)continue;if(free(p.x+dx,p.y+dy,sx,sy))return [p.x+dx,p.y+dy]}return null};
    for(const p of d.props){if(p.k==='fishtray'){p.s=0;continue}if(p.wall){p.y=1;if(p.s===undefined)p.s=0;continue}if(p.s===undefined)p.s=1;
      const q=near(p,p.w||1,p.h||1);if(!q){adj.push([id,'prop DROPPED',p.k,p.x,p.y]);p.s=0;p.drop=1;continue}if(q[0]!==p.x||q[1]!==p.y){adj.push([id,'prop',p.k,p.x+','+p.y,'->',q[0]+','+q[1]]);p.x=q[0];p.y=q[1]}if(p.s)mark(p,p.k==='counter'||p.k==='bar'||p.k==='cage'||p.k==='table'||p.k==='desk'||p.k==='icebin')}
    const reach=()=>{const seen=new Uint8Array(w*h),q=[sp];seen[sp[1]*w+sp[0]]=1;let c=0;while(q.length){const [x,y]=q.shift();for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const X=x+dx,Y=y+dy;if(X<0||Y<0||X>=w||Y>=h||seen[Y*w+X])continue;if(sol[Y*w+X]||!fl(X,Y)&&!(Y===h-1&&ex.includes(X)))continue;seen[Y*w+X]=1;q.push([X,Y])}}return seen};
    for(const n of d.npcs){n.hb=1;if(n.when){const k=n.when;Object.defineProperty(n,'off',{get(){return !hbWhen(k)},configurable:true})}
      let q=near(n,1,1);if(!q){adj.push([id,'npc DROPPED',n.id]);n.x=sp[0];n.y=1;n.drop=1;continue}
      sol[q[1]*w+q[0]]=1;
      // everyone and every interactive prop must stay reachable from the door
      const rs=reach(),adjOk=([x,y])=>[[1,0],[-1,0],[0,1],[0,-1]].some(([dx,dy])=>{const X=x+dx,Y=y+dy;if(X>=0&&Y>=0&&X<w&&Y<h&&rs[Y*w+X])return true;if(X>=0&&Y>=0&&X<w&&Y<h&&ctr[Y*w+X]){const X2=X+dx,Y2=Y+dy;if(X2>=0&&Y2>=0&&X2<w&&Y2<h&&rs[Y2*w+X2])return true}return false});
      if(!adjOk(q)){sol[q[1]*w+q[0]]=0;let ok=false;for(let r=1;r<8&&!ok;r++)for(let dy=-r;dy<=r&&!ok;dy++)for(let dx=-r;dx<=r&&!ok;dx++){if(Math.max(Math.abs(dx),Math.abs(dy))!==r)continue;const X=n.x+dx,Y=n.y+dy;if(!free(X,Y,1,1))continue;sol[Y*w+X]=1;const r2=reach();if([[1,0],[-1,0],[0,1],[0,-1]].some(([ax,ay])=>{const A=X+ax,Bq=Y+ay;return A>=0&&Bq>=0&&A<w&&Bq<h&&r2[Bq*w+A]})){q=[X,Y];ok=true}else sol[Y*w+X]=0}if(!ok){adj.push([id,'npc UNREACHABLE',n.id]);sol[q[1]*w+q[0]]=1}}
      if(q[0]!==n.x||q[1]!==n.y){adj.push([id,'npc',n.id,n.x+','+n.y,'->',q[0]+','+q[1]]);n.x=q[0];n.y=q[1]}}
    d.title=d.title||'';
  }
}

/* ---------------------------------------------------------------- the town: baked map */
const hbRGB=h=>{const n=parseInt(String(h).slice(1),16);return[n>>16&255,n>>8&255,n&255]};
const hbMix=(a,b,t)=>{const A=hbRGB(a),B2=hbRGB(b);return'rgb('+Math.round(A[0]+(B2[0]-A[0])*t)+','+Math.round(A[1]+(B2[1]-A[1])*t)+','+Math.round(A[2]+(B2[2]-A[2])*t)+')'};
const hbCh=(x,y)=>(x<0||y<0||x>=HBW||y>=HBH)?'~':HBG[y][x];
/* ===== v3.20T HALE HARBOR, CIRCULAR LAYOUT (CF_81 build 2). The town map is drawn tile by tile from HBG, in chunks (see owBakeChunked). ===== */
const HB_FV={u:[0,-1],d:[0,1],l:[-1,0],r:[1,0]};
function hbSolidGrid(){const S=new Uint8Array(HBW*HBH);
  for(let y=0;y<HBH;y++)for(let x=0;x<HBW;x++){const c=HBG[y][x];if(c==='#'||c==='~'||c==='r'||c==='F'||c==='c'||c==='T')S[y*HBW+x]=1}   // v3.26T: the yard gate 'G' is shut by hbYardOpen() in owBlocked, not here
  for(let y=0;y<HBH;y++)if(y!==HB_ENTRY[1])S[y*HBW]=1;   // the west fence; the Spillway road on row 21 is the way out
  S[45*HBW+HBW-1]=1;   // the south quay ends at a barrier
  return S}
const hbSeed=(x,y,s)=>((((x+11)*73856093)^((y+7)*19349663)^((s||1)*83492791))>>>0)||1;
const hbTR=(x,y,s)=>owRnd(hbSeed(x,y,s));
const hbIsW=c=>c==='~';
const hbGreen=(x,y)=>{const c=hbCh(x,y);return c===','||c==='T'};   // v3.22T: every tree stands on grass
const hbPierH=(x,y)=>{let h=1,v=1;for(let i=x-1;hbCh(i,y)==='P';i--)h++;for(let i=x+1;hbCh(i,y)==='P';i++)h++;for(let j=y-1;hbCh(x,j)==='P';j--)v++;for(let j=y+1;hbCh(x,j)==='P';j++)v++;return h>=v};
const HB_N4=[[0,-1,'u'],[0,1,'d'],[-1,0,'l'],[1,0,'r']];
const HB_MOORED=[[19.2,11.08,2.2,.85,'#C2492F',0],[12.15,19.2,2.2,.85,'#4E7C7A',1],[37.0,26.15,1.7,.85,'#E8B23D',1],[17.2,33.1,2.2,.85,'#2F8A9A',0],[29.6,33.1,2.0,.85,'#8E6BD9',0],[12.2,27.1,2.0,.85,'#5F7F86',0]];   // v3.21T moored boats [x,y,length,beam,colour,upright]
function owBakeHarbor(c,m,reg){
  const g=c.getContext('2d'),B=BP,MW=HBW*B,MH=HBH*B;g.imageSmoothingEnabled=true;
  reg=reg||{x0:0,y0:0,x1:HBW,y1:HBH};
  const rIn=(x,y,w,h,p)=>x+w>reg.x0-p&&x<reg.x1+p&&y+h>reg.y0-p&&y<reg.y1+p;
  const tx0=Math.max(0,reg.x0-1),ty0=Math.max(0,reg.y0-1),tx1=Math.min(HBW,reg.x1+1),ty1=Math.min(HBH,reg.y1+1);
  const zoneOf=(x,y)=>{let z=3;for(const q of HB_ZONES){if(x>=q[1]&&x<=q[3]&&y>=q[2]&&y<=q[4])z=q[0]}return z};
  const ZC={1:'#675c52',2:'#4e5d6b',3:'#566b60',4:'#6c5249',5:'#4a6270'};
  // 1. water: the basin a touch greener, the open sea darker the further out
  for(let y=ty0;y<ty1;y++)for(let x=tx0;x<tx1;x++){const px=x*B,py=y*B,R=hbTR(x,y,1);
    g.fillStyle=y>=46?hbMix('#1b3640','#12232b',Math.min(1,(y-46)/6)):'#21404a';g.fillRect(px,py,B,B);
    if(hbCh(x,y)!=='~')continue;
    for(let i=0;i<2;i++){const rx=px+R()*B,ry=py+R()*B;g.strokeStyle='rgba(200,225,230,'+(.04+R()*.08)+')';g.lineWidth=1.5;g.beginPath();g.moveTo(rx,ry);g.lineTo(rx+B*(.2+R()*.45),ry);g.stroke()}}
  // 1b. where water meets anything solid or walkable: a dark lip on the water and one ripple row further out
  for(let y=ty0;y<ty1;y++)for(let x=tx0;x<tx1;x++){if(hbCh(x,y)!=='~')continue;const px=x*B,py=y*B;
    for(const [a,b2,d] of HB_N4){const n=hbCh(x+a,y+b2);if(n==='~'||n==='r')continue;if(x+a<0||y+b2<0||x+a>=HBW||y+b2>=HBH)continue;
      g.fillStyle='rgba(0,0,0,.36)';g.strokeStyle='rgba(200,225,230,.13)';g.lineWidth=1.6;g.beginPath();
      if(d==='u'){g.fillRect(px,py,B,8);g.moveTo(px+6,py+16);g.lineTo(px+B-6,py+16)}else if(d==='d'){g.fillRect(px,py+B-8,B,8);g.moveTo(px+6,py+B-16);g.lineTo(px+B-6,py+B-16)}
      else if(d==='l'){g.fillRect(px,py,8,B);g.moveTo(px+16,py+6);g.lineTo(px+16,py+B-6)}else{g.fillRect(px+B-8,py,8,B);g.moveTo(px+B-16,py+6);g.lineTo(px+B-16,py+B-6)}g.stroke()}}
  // 2. ground, tile by tile (every tile has its own random stream, so any chunk draws the same picture)
  for(let y=ty0;y<ty1;y++)for(let x=tx0;x<tx1;x++){const ch=HBG[y][x],px=x*B,py=y*B,R=hbTR(x,y,2);
    if(ch==='~'||ch==='#'||ch==='D')continue;
    if(ch==='r'){   // riprap: rough boulders piled on the breakwater's sea face
      for(let i=0;i<6;i++){const bx=px+B*(.12+R()*.76),by=py+B*(.12+R()*.76),r=B*(.16+R()*.14);g.fillStyle=R()<.5?'#5a6066':'#6e757b';g.strokeStyle='#22282c';g.lineWidth=3;g.beginPath();g.ellipse(bx,by,r,r*.8,R()*3,0,7);g.fill();g.stroke();g.fillStyle='rgba(255,255,255,.10)';g.beginPath();g.ellipse(bx-r*.25,by-r*.25,r*.4,r*.28,0,0,7);g.fill()}
      for(let i=0;i<4;i++){g.fillStyle='rgba(230,240,240,.25)';g.beginPath();g.arc(px+R()*B,py+R()*B,2+R()*2,0,7);g.fill()}
      continue}
    if(ch==='='){   // quay / promenade / breakwater: big cut stone slabs
      g.fillStyle='#6E7477';g.fillRect(px,py,B,B);
      for(let sy=0;sy<2;sy++)for(let sx=0;sx<2;sx++){const ox=(y%2)*B/4,v=R();g.fillStyle=v<.3?'rgba(255,255,255,.06)':v<.6?'rgba(0,0,0,.08)':'rgba(0,0,0,0)';g.fillRect(px+sx*B/2+ox%(B/2)+1,py+sy*B/2+1,B/2-2,B/2-2)}
      g.strokeStyle='rgba(20,24,28,.45)';g.lineWidth=2;for(let sy=0;sy<2;sy++){g.beginPath();g.moveTo(px,py+sy*B/2);g.lineTo(px+B,py+sy*B/2);g.stroke();for(let sx=0;sx<3;sx++){const jx=px+sx*B/2+((y*2+sy)%2)*B/4;if(jx<px||jx>px+B)continue;g.beginPath();g.moveTo(jx,py+sy*B/2);g.lineTo(jx,py+(sy+1)*B/2);g.stroke()}}
      for(let i=0;i<2;i++){g.fillStyle='rgba(150,175,185,.10)';g.fillRect(px+R()*B,py+R()*B,6+R()*12,2)}   // wet sheen
      continue}
    if(ch==='P'){   // planks: boards across the pier, 3 board lines per tile
      const hz=hbPierH(x,y);g.fillStyle='#8A6A4A';g.fillRect(px,py,B,B);
      for(let i=0;i<3;i++){g.fillStyle=R()<.5?'#6E5238':'rgba(255,230,190,.06)';if(hz)g.fillRect(px+i*B/3,py,B/3,B);else g.fillRect(px,py+i*B/3,B,B/3)}
      g.strokeStyle='rgba(30,20,12,.65)';g.lineWidth=2.4;for(let i=0;i<=3;i++){g.beginPath();if(hz){g.moveTo(px+i*B/3,py);g.lineTo(px+i*B/3,py+B)}else{g.moveTo(px,py+i*B/3);g.lineTo(px+B,py+i*B/3)}g.stroke()}
      g.fillStyle='rgba(20,14,8,.7)';for(let i=0;i<3;i++){const a=(i+.5)*B/3;if(hz){g.fillRect(px+a-2,py+B*.2,4,4);g.fillRect(px+a-2,py+B*.78,4,4)}else{g.fillRect(px+B*.2,py+a-2,4,4);g.fillRect(px+B*.78,py+a-2,4,4)}}   // nail heads
      continue}
    if(hbGreen(x,y)){   // the Commons: rough grass
      g.fillStyle='#4F6B4A';g.fillRect(px,py,B,B);
      for(let i=0;i<9;i++){const gx=px+R()*B,gy=py+R()*B;g.strokeStyle=R()<.6?'#5E7A55':'#45603f';g.lineWidth=2;g.beginPath();g.moveTo(gx,gy);g.lineTo(gx+(R()-.5)*6,gy-6-R()*6);g.stroke()}
      if(R()<.18){g.fillStyle='rgba(30,40,28,.35)';g.beginPath();g.ellipse(px+R()*B,py+R()*B,B*.2,B*.1,0,0,7);g.fill()}
      continue}
    // cobble (also under the yard fence, the cradle and the tree spots until build 3)
    const z=zoneOf(x,y);g.fillStyle=ZC[z];g.fillRect(px,py,B,B);
    for(let sy=0;sy<3;sy++)for(let sx=0;sx<3;sx++){const ox=(sy%2)*B/6,sw=B/3-3,sh=B/3-3,v=R();g.fillStyle=v<.3?'rgba(255,255,255,.07)':v<.6?'rgba(0,0,0,.10)':'rgba(255,255,255,0)';g.fillRect(px+sx*B/3+ox+1.5,py+sy*B/3+1.5,sw,sh);g.strokeStyle='rgba(8,12,16,.5)';g.lineWidth=1.6;g.strokeRect(px+sx*B/3+ox+1.5,py+sy*B/3+1.5,sw,sh)}
    if(R()<.05){g.fillStyle='rgba(20,28,32,.5)';g.fillRect(px+R()*B*.6,py+R()*B*.6,B*.3,B*.2)}
    if(R()<.04){g.strokeStyle='rgba(8,10,12,.55)';g.lineWidth=1.5;g.beginPath();let cx=px+R()*B,cy=py;g.moveTo(cx,cy);for(let q=0;q<4;q++){cx+=(R()-.5)*12;cy+=B/4;g.lineTo(cx,cy)}g.stroke()}}
  // 2b. edges: a stone kerb where the town meets the quay; a pale coping, cleats and (on the south shore) a hazard stripe where the quay meets the water
  for(let y=ty0;y<ty1;y++)for(let x=tx0;x<tx1;x++){const ch=HBG[y][x],px=x*B,py=y*B;if(ch==='~'||ch==='#'||ch==='D'||ch==='r'||ch==='P')continue;
    for(const [a,b2,d] of HB_N4){const n=(x+a<0||y+b2<0||x+a>=HBW||y+b2>=HBH)?'x':hbCh(x+a,y+b2);
      const park=ch==='.'&&(n===','||n==='T');
      if(park){g.fillStyle='#9a978f';if(d==='u')g.fillRect(px,py,B,5);else if(d==='d')g.fillRect(px,py+B-5,B,5);else if(d==='l')g.fillRect(px,py,5,B);else g.fillRect(px+B-5,py,5,B);
        g.fillStyle='rgba(20,24,28,.45)';if(d==='u')g.fillRect(px,py+5,B,2);else if(d==='d')g.fillRect(px,py+B-7,B,2);else if(d==='l')g.fillRect(px+5,py,2,B);else g.fillRect(px+B-7,py,2,B);continue}
      if((ch===','||ch==='T')&&n!==','&&n!=='T'&&n!=='x'){g.fillStyle='rgba(30,44,28,.45)';if(d==='u')g.fillRect(px,py,B,6);else if(d==='d')g.fillRect(px,py+B-6,B,6);else if(d==='l')g.fillRect(px,py,6,B);else g.fillRect(px+B-6,py,6,B);continue}
      const wat=n==='~'||n==='r',kerb=ch==='='&&(n==='.'||n===','||n==='T');if(!wat&&!kerb)continue;
      const t=wat?10:6;g.fillStyle=wat?'#8E8B84':'#8E8B84';
      if(d==='u')g.fillRect(px,py,B,t);else if(d==='d')g.fillRect(px,py+B-t,B,t);else if(d==='l')g.fillRect(px,py,t,B);else g.fillRect(px+B-t,py,t,B);
      g.fillStyle=wat?'#2b2f31':'rgba(30,34,38,.55)';const e=wat?3:2;
      if(d==='u')g.fillRect(px,py,B,e);else if(d==='d')g.fillRect(px,py+B-e,B,e);else if(d==='l')g.fillRect(px,py,e,B);else g.fillRect(px+B-e,py,e,B);
      if(wat&&ch==='='&&y===45&&d==='d'){g.fillStyle='#e8c53a';g.fillRect(px,py+B-t-B*.08,B,B*.07);g.fillStyle='#1d1d1d';for(let i=0;i<5;i++)g.fillRect(px+i*B/5+B*.04,py+B-t-B*.08,B*.09,B*.07)}
      if(wat&&hbSeed(x,y,5)%6===0){const cxp=d==='l'?px+B*.2:d==='r'?px+B*.8:px+B*.5,cyp=d==='u'?py+B*.2:d==='d'?py+B*.8:py+B*.5;   // mooring cleat
        g.fillStyle='#22272a';g.fillRect(cxp-B*.12,cyp-B*.05,B*.24,B*.1);g.fillRect(cxp-B*.04,cyp-B*.1,B*.08,B*.2);g.fillStyle='rgba(255,255,255,.15)';g.fillRect(cxp-B*.12,cyp-B*.05,B*.24,3)}}}
  // 3. zone colour: broad soft ovals
  for(const [id,x0,y0,x1,y1,col] of HB_ZONES){const cx=(x0+x1+1)/2*B,cy=(y0+y1+1)/2*B,rx=(x1-x0+1)/2*B*1.05,ry=(y1-y0+1)/2*B*1.05;
    if(!rIn(x0-2,y0-2,x1-x0+5,y1-y0+5,0))continue;
    g.save();g.globalAlpha=.34;g.translate(cx,cy);g.scale(1,ry/rx);const gr=g.createRadialGradient(0,0,rx*.25,0,0,rx);gr.addColorStop(0,col);gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(-rx,-rx,rx*2,rx*2);g.restore()}
  // 4. pier rails and pilings, the causeway arch, the swing bridge, fences, the yard
  hbBakeLife(g,reg,rIn);
  // 5. buildings (pilings under the ones that stand over water)
  for(const b of HBB){if(!rIn(b.x,b.y,b.w,b.h,2))continue;if(b.kind!=='arena')hbPilings(g,b);hbBakeB(g,b,owRnd(hbSeed(b.x,b.y,9)))}
  // 6. props
  for(const p of HBP){if(!rIn(p.x,p.y,p.w||1,p.h||1,2))continue;hbBakeProp(g,p,owRnd(hbSeed(p.x,p.y,13)))}
  // 7. the entry mat at the west road
  if(rIn(0,HB_ENTRY[1],1,1,1)){g.fillStyle='#2b3438';g.fillRect(0,HB_ENTRY[1]*B,B*.18,B);g.fillStyle='rgba(232,226,208,.5)';g.beginPath();const ex=B*.3,ey=HB_ENTRY[1]*B+B*.5;g.moveTo(ex,ey-B*.2);g.lineTo(ex+B*.5,ey);g.lineTo(ex,ey+B*.2);g.closePath();g.fill()}
  // 8. the painted berth at the foot of the causeway: HALE 14, flowers and a taped photo
  if(rIn(22,7,6,3,1)){hbBerth(g,owRnd(1414));for(const [fx,fy,fc] of [[23.75,8.98,'#c9a26b'],[24.0,9.08,'#e8d5a8'],[26.25,8.98,'#b5392b'],[26.0,9.08,'#e8d5a8']]){g.fillStyle=fc;g.beginPath();g.arc(fx*B,fy*B,B*.07,0,7);g.fill()}}
  // 10. light: warm and ice pools baked additive
  g.save();g.globalCompositeOperation='lighter';
  for(const [x,y,r,col,al] of HB_POOLS){if(!rIn(x-r-1,y-r-1,2*r+3,2*r+3,0))continue;const rr=r*B*1.3,gr=g.createRadialGradient(x*B+B/2,y*B+B/2,0,x*B+B/2,y*B+B/2,rr);const rgb=hbRGB(col).join(',');gr.addColorStop(0,'rgba('+rgb+','+al+')');gr.addColorStop(.6,'rgba('+rgb+','+al*.4+')');gr.addColorStop(1,'rgba('+rgb+',0)');g.fillStyle=gr;g.fillRect(x*B+B/2-rr,y*B+B/2-rr,rr*2,rr*2)}
  g.restore();
  // 11. fog banked on the south shore and the breakwater only (Z5; light, never over 25%)
  {const F=owRnd(4242);for(let i=0;i<16;i++){const x=F()*MW,y=(43+F()*7)*B,rx=B*(3+F()*4),ry=B*(.7+F()*1.1);if(x+rx<reg.x0*B-B||x-rx>reg.x1*B+B||y+ry<reg.y0*B-B||y-ry>reg.y1*B+B)continue;const gr=g.createRadialGradient(x,y,2,x,y,rx);gr.addColorStop(0,'rgba(190,215,225,.16)');gr.addColorStop(1,'rgba(190,215,225,0)');g.save();g.translate(x,y);g.scale(1,ry/rx);g.translate(-x,-y);g.fillStyle=gr;g.fillRect(x-rx,y-rx,rx*2,rx*2);g.restore()}}
  // flicker lights: lamp posts, pier lanterns, the beacon and the green harbor light
  for(const p of HBP)if(p.t==='lamp')LG.push({x:(p.x+.5)*B,y:(p.y+.2)*B,r:B*2.2,col:'#E8A33D',a:.34,f:hbSeed(p.x,p.y,3)%9});
  for(const [lx,ly] of [[14.8,25.15],[33.2,32.85],[43.85,46.2],[34.85,12.15]])LG.push({x:lx*B,y:ly*B,r:B*2,col:'#E8A33D',a:.3,f:lx%9});
  LG.push({x:20*B,y:48.1*B,r:B*4,col:'#E8A33D',a:.4,f:1});
  LG.push({x:29.5*B,y:47.7*B,r:B*1.8,col:'#6FD38A',a:.32,f:4});
}
function hbPilings(g,b){   // dark posts in the water under any edge of a building that stands over the basin
  const B=BP;for(let y=b.y;y<b.y+b.h;y++)for(let x=b.x;x<b.x+b.w;x++){
    for(const [a,c,d] of HB_N4){const nx=x+a,ny=y+c;if(nx>=b.x&&nx<b.x+b.w&&ny>=b.y&&ny<b.y+b.h)continue;if(hbCh(nx,ny)!=='~')continue;
      for(const t of [.25,.75]){const px=d==='l'?x*B-B*.1:d==='r'?(x+1)*B+B*.1:(x+t)*B,py=d==='u'?y*B-B*.1:d==='d'?(y+1)*B+B*.14:(y+t)*B;
        g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(px+3,py+5,B*.13,B*.08,0,0,7);g.fill();g.fillStyle='#2a2118';g.beginPath();g.arc(px,py,B*.1,0,7);g.fill();g.fillStyle='#5c4a36';g.beginPath();g.arc(px-1,py-1,B*.062,0,7);g.fill()}}}}
function hbBerth(g,R){
  const B=BP,X=23.55*B,Y=8.16*B,W=2.9*B,H=.68*B;g.save();
  g.fillStyle='rgba(28,52,58,.9)';g.fillRect(X,Y,W,H);
  g.strokeStyle='rgba(232,226,208,.85)';g.lineWidth=3;g.strokeRect(X+5,Y+5,W-10,H-10);
  g.fillStyle='rgba(232,226,208,.9)';g.font='700 '+Math.round(H*.52)+'px "Bowlby One",Impact,sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('HALE',X+W*.34,Y+H*.54);
  g.fillStyle='#E8743A';g.fillText('14',X+W*.78,Y+H*.54);
  g.fillStyle='rgba(28,52,58,.95)';for(const gx of[X+W*.2,X+W*.46,X+W*.7])g.fillRect(gx,Y+8,3,H-16);   // stencil bridges
  for(let i=0;i<46;i++){g.fillStyle=R()<.5?'rgba(110,116,119,.75)':'rgba(88,94,97,.7)';g.fillRect(X+R()*W,Y+R()*H,2+R()*7,2+R()*3)}   // worn through to the stone
  g.fillStyle='rgba(232,226,208,.55)';g.fillRect(X-B*.22,Y,B*.1,H);g.fillRect(X+W+B*.12,Y,B*.1,H);   // the two berth bars
  g.restore()}

/* ---- baked town dressing: pier rails and pilings, the causeway arch, the swing bridge, edge fences, the yard, door paint, laundry ---- */
function hbBakeLife(g,reg,rIn){
  const B=BP;reg=reg||{x0:0,y0:0,x1:HBW,y1:HBH};rIn=rIn||(()=>true);
  const tx0=Math.max(0,reg.x0-1),ty0=Math.max(0,reg.y0-1),tx1=Math.min(HBW,reg.x1+1),ty1=Math.min(HBH,reg.y1+1);
  // piers: pilings and a rope rail along every side that meets water; an end beam where the pier stops
  for(let y=ty0;y<ty1;y++)for(let x=tx0;x<tx1;x++){if(HBG[y][x]!=='P')continue;const X=x*B,Y=y*B,hz=hbPierH(x,y);
    for(const [a,c,d] of HB_N4){if(hbCh(x+a,y+c)!=='~')continue;const along=(d==='u'||d==='d')===hz;   // a side that runs along the pier's length
      const P0=d==='l'?[X+B*.07,Y+B*.15]:d==='r'?[X+B*.93,Y+B*.15]:d==='u'?[X+B*.15,Y+B*.07]:[X+B*.15,Y+B*.93],P1=d==='l'||d==='r'?[P0[0],Y+B*.85]:[X+B*.85,P0[1]];
      if(!along){g.fillStyle='#2a2118';if(d==='u')g.fillRect(X,Y,B,8);else if(d==='d')g.fillRect(X,Y+B-8,B,8);else if(d==='l')g.fillRect(X,Y,8,B);else g.fillRect(X+B-8,Y,8,B)}
      for(const q of [P0,P1]){g.fillStyle='#2a2118';g.beginPath();g.arc(q[0],q[1],B*.1,0,7);g.fill();g.fillStyle='#6b5a44';g.beginPath();g.arc(q[0],q[1]-1,B*.065,0,7);g.fill()}
      if(along){g.strokeStyle='rgba(191,167,106,.9)';g.lineWidth=3;g.beginPath();g.moveTo(P0[0],P0[1]);const mx=(P0[0]+P1[0])/2,my=(P0[1]+P1[1])/2;g.quadraticCurveTo(mx+(d==='l'?-3:d==='r'?3:0),my+(d==='u'?-3:d==='d'?3:0)+(d==='l'||d==='r'?0:4),P1[0],P1[1]);g.stroke()}}}
  // the causeway: low stone parapet posts both sides, and the arch at rows 13-14 where boats pass under
  if(rIn(22,9,6,11,1)){
    for(let y=10;y<=18;y++)for(const [x,s] of [[24,-1],[25,1]]){const X=(s<0?x*B+B*.1:(x+1)*B-B*.1);for(const t of [.2,.7]){g.fillStyle='#9a978f';g.fillRect(X-5,y*B+t*B-5,10,10);g.strokeStyle='#2b2f31';g.lineWidth=2;g.strokeRect(X-5,y*B+t*B-5,10,10)}}
    for(const s of [-1,1]){const ex=s<0?24*B:26*B;g.save();g.beginPath();if(s<0)g.rect(ex-B*.6,13*B,B*.6,2*B);else g.rect(ex,13*B,B*.6,2*B);g.clip();
      g.fillStyle='rgba(4,9,12,.6)';g.beginPath();g.ellipse(ex,14*B,B*.48,B*.92,0,0,7);g.fill();g.strokeStyle='#8E8B84';g.lineWidth=7;g.beginPath();g.ellipse(ex,14*B,B*.48,B*.92,0,0,7);g.stroke();
      g.strokeStyle='rgba(43,47,49,.8)';g.lineWidth=2;for(let i=-3;i<=3;i++){const a=i*.42;g.beginPath();g.moveTo(ex+Math.sin(a)*B*.44*-s,14*B-Math.cos(a)*B*.88);g.lineTo(ex+Math.sin(a)*B*.53*-s,14*B-Math.cos(a)*B*.98);g.stroke()}g.restore()}
    g.fillStyle='#b8b3a6';g.fillRect(24*B+2,14*B-6,10,12);g.fillRect(26*B-12,14*B-6,10,12);   // keystones on the parapet
    // chevrons on the causeway pointing at the gatehouse doors
    for(const cy of [15.5,16.5,17.5]){g.strokeStyle='rgba(232,224,204,.24)';g.lineWidth=B*.1;g.beginPath();g.moveTo(25*B-B*.4,cy*B-B*.2);g.lineTo(25*B,cy*B+B*.15);g.lineTo(25*B+B*.4,cy*B-B*.2);g.stroke()}}
  // the swing bridge: a pivot drum at the west end and hazard joints where it meets the quay
  if(rIn(21,34,8,4,1)){const px=22.4*B,py=35.5*B;g.fillStyle='#2b2f31';g.beginPath();g.arc(px,py,B*.34,0,7);g.fill();g.strokeStyle='#8E8B84';g.lineWidth=5;g.stroke();g.fillStyle='#6E7780';g.beginPath();g.arc(px,py,B*.14,0,7);g.fill();
    for(const jx of [22*B,28*B-6])for(let i=0;i<5;i++){g.fillStyle=i%2?'#1d1d1d':'#e8c53a';g.fillRect(jx,36*B+i*B/5,6,B/5)}}
  // the green harbor light at the end of the east arm
  if(rIn(28,46,3,3,1)){const lx=29.5*B,ly=47.72*B;g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(lx,ly+B*.2,B*.2,B*.07,0,0,7);g.fill();g.fillStyle='#1b2125';g.fillRect(lx-4,ly-B*.36,8,B*.5);g.fillStyle='#6FD38A';g.beginPath();g.arc(lx,ly-B*.4,B*.11,0,7);g.fill();g.fillStyle='#d8ffe4';g.beginPath();g.arc(lx,ly-B*.42,B*.045,0,7);g.fill()}
  // edges: the west fence (open only where the Spillway road comes in) and the barriers at both ends of the south quay
  for(let y=Math.max(0,ty0);y<Math.min(45,ty1);y++){if(y===HB_ENTRY[1]||tx0>0)continue;const c=hbCh(0,y);if(c==='~'||c==='#')continue;hbFence(g,0,y*B,B,'v')}
  for(const ex of [0,HBW-1]){if(!rIn(ex,45,1,1,1))continue;const X=ex*B,Y=45*B,right=ex>0;
    g.fillStyle='#2b2f31';g.fillRect(X,Y,B,B);g.fillStyle='#4a3a2c';g.fillRect(X+(right?B*.1:B*.2),Y,B*.7,B);g.strokeStyle='rgba(0,0,0,.5)';g.lineWidth=2;for(let i=1;i<4;i++){g.beginPath();g.moveTo(X+B*.1,Y+i*B/4);g.lineTo(X+B*.9,Y+i*B/4);g.stroke()}
    g.fillStyle='#e8c53a';for(let i=0;i<4;i++){g.beginPath();g.moveTo(X+B*.14+i*B*.2,Y+B*.3);g.lineTo(X+B*.26+i*B*.2,Y+B*.3);g.lineTo(X+B*.16+i*B*.2,Y+B*.5);g.lineTo(X+B*.04+i*B*.2,Y+B*.5);g.closePath();g.fill()}
    g.fillStyle='#C2492F';g.fillRect(X+B*.2,Y+B*.56,B*.6,B*.28);g.fillStyle='#fff3d0';g.font='700 '+Math.round(B*.17)+'px "Barlow Condensed",sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('NO PASS',X+B*.5,Y+B*.7)}
  // the Longshore Yard (on the Commons since v3.20bT): fence, the shut gate, the empty cradle where Tug's boat was kept
  for(let y=ty0;y<ty1;y++)for(let x=tx0;x<tx1;x++){const c=HBG[y][x],X=x*B,Y=y*B;
    if(c==='F'){const fv=k=>k==='F'||k==='G',v=fv(hbCh(x,y-1))||fv(hbCh(x,y+1)),h=fv(hbCh(x-1,y))||fv(hbCh(x+1,y));if(v)hbFence(g,x===HBW-1?X:X-B*.3,Y,B,'v');if(h||!v)hbFence(g,X,Y+B*.25,B,'h')}
    else if(c==='G'){g.fillStyle='rgba(120,116,108,.6)';g.fillRect(X,Y+B*.72,B,B*.1);g.fillStyle='#1b2125';g.fillRect(X-B*.04,Y+B*.12,B*.14,B*.7);g.fillRect(X+B*.9,Y+B*.12,B*.14,B*.7)}}
  {let cx0=99,cx1=-1,cy=-1;for(let y=0;y<HBH;y++)for(let x=0;x<HBW;x++)if(HBG[y][x]==='c'){cx0=Math.min(cx0,x);cx1=Math.max(cx1,x);cy=y}
   if(cy>=0&&rIn(cx0,cy,cx1-cx0+1,1,1)){const X0=cx0*B,X1=(cx1+1)*B,Y=cy*B;g.fillStyle='rgba(0,0,0,.3)';g.fillRect(X0+6,Y+B*.2,X1-X0,B*.8);
     g.fillStyle='#4a3a2c';g.fillRect(X0+B*.1,Y+B*.42,X1-X0-B*.2,B*.16);
     for(let x=X0+B*.4;x<X1-B*.2;x+=B*.75){g.fillStyle='#5d4630';g.fillRect(x-B*.1,Y+B*.08,B*.2,B*.84);g.strokeStyle='#241a12';g.lineWidth=3;g.strokeRect(x-B*.1,Y+B*.08,B*.2,B*.84);
       g.fillStyle='#7a5a3e';g.beginPath();g.moveTo(x-B*.1,Y+B*.08);g.lineTo(x+B*.16,Y+B*.3);g.lineTo(x-B*.1,Y+B*.3);g.closePath();g.fill();g.beginPath();g.moveTo(x-B*.1,Y+B*.92);g.lineTo(x+B*.16,Y+B*.7);g.lineTo(x-B*.1,Y+B*.7);g.closePath();g.fill()}
     g.fillStyle='rgba(232,224,204,.55)';g.font='700 '+Math.round(B*.22)+'px "Bowlby One",Impact,sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('14',(cx0+cx1+1)/2*B,Y+B*.5)}}   // chalked on a keel block
  // v3.26T inside the yard: a strip of old name board leaning on the fence (every letter gouged out) and a skiff on a trolley
  if(rIn(46,1,4,6,1)){const X=48*B,Y=2*B;g.fillStyle='rgba(0,0,0,.3)';g.fillRect(X+B*.12,Y+B*.62,B*.82,B*.18);g.fillStyle='#5c4632';g.fillRect(X+B*.08,Y+B*.18,B*.84,B*.48);g.strokeStyle='#241a12';g.lineWidth=3;g.strokeRect(X+B*.08,Y+B*.18,B*.84,B*.48);
    g.strokeStyle='rgba(232,226,208,.55)';g.lineWidth=2;for(let i=0;i<5;i++){const lx=X+B*(.18+i*.15);g.beginPath();g.moveTo(lx,Y+B*.28);g.lineTo(lx+B*.08,Y+B*.56);g.moveTo(lx+B*.08,Y+B*.28);g.lineTo(lx,Y+B*.56);g.stroke()}
    const SX=47*B,SY=5*B;g.fillStyle='#2b2f31';for(const wx of [.3,1.7])g.fillRect(SX+wx*B-5,SY+B*.72,10,B*.18);g.fillStyle='#4a3a2c';g.fillRect(SX+B*.15,SY+B*.62,B*1.7,B*.1);
    hbBakeBoat(g,47.05,5.12,1.9,.62,'#E6DCC8',0)}
  // the slipway: two steel rails from the yard gate down to the water, where the Boat Race starts
  if(rIn(35,7,12,13,1)){const RA=[[45.34,7.9],[45.34,9.34],[38.34,9.34],[38.34,18.34],[36.2,18.34]],RB=[[45.66,7.9],[45.66,9.66],[38.66,9.66],[38.66,18.66],[36.2,18.66]];
    for(let i=0;i<RA.length-1;i++){const [a1,a2]=[RA[i],RA[i+1]],[b1,b2]=[RB[i],RB[i+1]],L=Math.hypot(a2[0]-a1[0],a2[1]-a1[1]);for(let t=.2;t<L;t+=.45){const f=t/L;g.fillStyle='rgba(70,52,36,.75)';const x1=a1[0]+(a2[0]-a1[0])*f,y1=a1[1]+(a2[1]-a1[1])*f,x2=b1[0]+(b2[0]-b1[0])*f,y2=b1[1]+(b2[1]-b1[1])*f;g.strokeStyle='rgba(70,52,36,.8)';g.lineWidth=6;g.beginPath();g.moveTo(x1*B-(y2-y1)*0,y1*B);g.lineTo(x2*B,y2*B);g.stroke()}}   // sleepers
    for(const P of [RA,RB]){g.strokeStyle='rgba(30,34,38,.9)';g.lineWidth=5;g.beginPath();P.forEach(([x,y],i)=>i?g.lineTo(x*B,y*B):g.moveTo(x*B,y*B));g.stroke();g.strokeStyle='rgba(170,180,185,.55)';g.lineWidth=1.6;g.beginPath();P.forEach(([x,y],i)=>i?g.lineTo(x*B-1,y*B-1):g.moveTo(x*B-1,y*B-1));g.stroke()}
    g.fillStyle='#6E7477';g.fillRect(36.05*B,18.2*B,B*.95,B*.6);g.fillStyle='rgba(0,0,0,.35)';g.fillRect(36.05*B,18.7*B,B*.95,B*.1)}   // the stone ramp into the water
  // v3.21T tree trunks (baked): ground shadow, an iron grate for the Old Town birches, the trunk; the canopy is a separate layer (hbCanopies)
  for(const [k,x,y] of HB_TREES){if(!rIn(x-1,y-1,3,2,1))continue;const X=x*B,Y=y*B,cx=X+B/2;
    g.fillStyle='rgba(0,0,0,.32)';g.beginPath();g.ellipse(cx+B*.08,Y+B*.78,B*(k==='O'?.62:k==='S'?.42:.38),B*.16,0,0,7);g.fill();
    if(k==='B'&&!hbGreen(x,y)){g.fillStyle='#26333C';g.fillRect(X+B*.14,Y+B*.5,B*.72,B*.42);g.strokeStyle='#3d4a54';g.lineWidth=2;for(let i=1;i<4;i++){g.beginPath();g.moveTo(X+B*.14+i*B*.18,Y+B*.5);g.lineTo(X+B*.14+i*B*.18,Y+B*.92);g.stroke()}}
    if(k==='B'){g.strokeStyle='#3A3A3A';g.lineWidth=B*.19;g.lineCap='round';g.beginPath();g.moveTo(cx,Y+B*.78);g.quadraticCurveTo(cx+B*.04,Y,cx+B*.35,Y-B*.75);g.stroke();g.strokeStyle='#E6DCC8';g.lineWidth=B*.14;g.stroke();g.lineCap='butt';g.fillStyle='#3A3A3A';for(const t of [.6,.3,0,-.3])g.fillRect(cx-B*.05+B*.1*(.6-t),Y+B*t,B*.09,B*.035)}
    else{g.fillStyle=k==='S'?'#5C4A3A':k==='P'?'#8a4a2e':k==='R'?'#6d6a64':'#6B4A2E';const tw=k==='O'?.22:k==='R'?.13:.16;g.fillRect(cx-B*tw/2,Y-B*.2,B*tw,B*.98);g.fillStyle='rgba(0,0,0,.25)';g.fillRect(cx+B*.02,Y-B*.2,B*tw*.4,B*.98)}}
  // v3.21T moored boats along the inner promenade (still; two more bob in the animated layer) with their lines to the quay
  for(const [x,y,w,h,col,vert] of HB_MOORED){if(!rIn(x-1,y-1,w+2,h+2,1))continue;hbBakeBoat(g,x,y,w,h,col,vert)}
  // v3.21T the Gantry Gang's crane over the cannery pier
  if(rIn(31,29,8,5,1)){const y0=31.15*B;g.fillStyle='rgba(0,0,0,.28)';g.fillRect(32.3*B,y0+B*.5,5.3*B,B*.18);
    for(const lx of [33.4,37.3]){g.fillStyle='#7a3a22';g.fillRect(lx*B-6,y0-B*.4,12,B*1.3);g.fillStyle='#2b2f31';g.fillRect(lx*B-9,y0+B*.82,18,6)}
    g.fillStyle='#A9542F';g.fillRect(32.2*B,y0-B*.14,5.4*B,B*.28);g.strokeStyle='#5c2a18';g.lineWidth=2;for(let x=32.4;x<37.5;x+=.35){g.beginPath();g.moveTo(x*B,y0-B*.14);g.lineTo((x+.17)*B,y0+B*.14);g.lineTo((x+.35)*B,y0-B*.14);g.stroke()}
    g.fillStyle='#2b2f31';g.fillRect(32.5*B,y0-B*.2,B*.4,B*.4);g.strokeStyle='#9aa4a8';g.lineWidth=2;g.beginPath();g.moveTo(32.7*B,y0+B*.2);g.lineTo(32.7*B,y0+B*.75);g.stroke();g.strokeStyle='#e8c53a';g.lineWidth=3;g.beginPath();g.arc(32.7*B,y0+B*.82,B*.07,0,Math.PI);g.stroke()}
  // painted door frames for the doors that face down (the side and top doors paint their own)
  HBB.forEach((b,i)=>{if(b.face&&b.face!=='d')return;if(!rIn(b.x,b.y,b.w,b.h,1))return;const col=HB_DOORCOL[i%HB_DOORCOL.length];for(const [dx,dy] of b.doors){const px=dx*B,py=dy*B;g.strokeStyle=col;g.lineWidth=6;g.strokeRect(px+B*.1,py+B*.1,B*.8,B*.9);g.fillStyle=col;g.fillRect(px+B*.1,py+B*.04,B*.8,B*.1)}});
  // laundry lines (coloured shirts) between houses in Old Town
  for(const [x0,y0,x1,y1,sag] of[[8.1,4.3,13.9,4.3,.4],[28.1,3.3,30.9,3.3,.25]]){if(!rIn(x0,y0,x1-x0,2,1))continue;const X0=x0*B,Y0=y0*B,X1=x1*B,Y1=y1*B;g.strokeStyle='rgba(8,10,12,.85)';g.lineWidth=2;g.beginPath();g.moveTo(X0,Y0);g.quadraticCurveTo((X0+X1)/2,Y0+sag*B*2,X1,Y1);g.stroke();
    for(let t=.08;t<.95;t+=.17){const px=X0+(X1-X0)*t,py=(1-t)*(1-t)*Y0+2*(1-t)*t*(Y0+sag*B*2)+t*t*Y1;g.fillStyle=HB_DOORCOL[Math.round(t*100)%HB_DOORCOL.length];g.fillRect(px-B*.11,py,B*.22,B*.3);g.fillStyle='rgba(255,255,255,.18)';g.fillRect(px-B*.11,py,B*.22,B*.06)}}
}
/* v3.21T a moored boat drawn into the map (no bobbing): hull, thwarts, a mooring line to the nearest quay */
function hbBakeBoat(g,x,y,w,h,col,vert){const B=BP;g.save();g.translate(x*B,y*B);if(vert){g.translate(h*B,0);g.rotate(Math.PI/2)}
  g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(w*B/2+5,h*B/2+6,w*B/2,h*B/2,0,0,7);g.fill();
  g.fillStyle=col;g.strokeStyle='#14181b';g.lineWidth=3;g.beginPath();g.moveTo(0,h*B*.5);g.quadraticCurveTo(w*B*.12,0,w*B*.55,0);g.quadraticCurveTo(w*B*1.02,h*B*.2,w*B*1.04,h*B*.5);g.quadraticCurveTo(w*B*1.02,h*B*.8,w*B*.55,h*B);g.quadraticCurveTo(w*B*.12,h*B,0,h*B*.5);g.closePath();g.fill();g.stroke();
  g.fillStyle='#8a6a4a';g.beginPath();g.ellipse(w*B*.5,h*B*.5,w*B*.36,h*B*.28,0,0,7);g.fill();g.strokeStyle='rgba(0,0,0,.35)';g.lineWidth=2;for(const t of [.32,.5,.68]){g.beginPath();g.moveTo(w*B*t,h*B*.25);g.lineTo(w*B*t,h*B*.75);g.stroke()}
  g.strokeStyle='rgba(191,167,106,.85)';g.lineWidth=3;g.beginPath();g.moveTo(w*B*.08,h*B*.5);g.quadraticCurveTo(-B*.2,h*B*.5+B*.15,-B*.45,h*B*.15);g.stroke();
  g.restore()}
/* v3.21T TREE CANOPIES: one cached picture per species (and a mirrored one), drawn over the people; fades to 45% while Eli stands under it */
const HB_CAN={};
const HB_FALL={green:null,yellow:['#8f6e1a','#c9a23a','#ead07a'],orange:['#8a3f22','#A9542F','#d07a42'],red:['#6e1f1c','#a3322a','#d25a40']};   // v3.24T autumn leaf colours
function hbCanopyPic(k,flip,col){const key=k+flip+(col||'');if(HB_CAN[key])return HB_CAN[key];const B=BP,sz=k==='O'?[3.6,3.0]:k==='B'?[2.8,2.9]:k==='P'?[3.6,3.9]:k==='R'?[3.4,3.0]:[1.9,3.7],c=document.createElement('canvas');c.width=Math.ceil(sz[0]*B);c.height=Math.ceil(sz[1]*B);
  const g=c.getContext('2d'),R=owRnd(k.charCodeAt(0)*31+flip*7+3),ol='#173822';if(flip){g.translate(c.width,0);g.scale(-1,1)}
  const blob=(x,y,r,cols)=>{g.fillStyle=ol;g.beginPath();g.arc(x,y,r+3,0,7);g.fill();g.fillStyle=cols[0];g.beginPath();g.arc(x,y,r,0,7);g.fill();g.fillStyle=cols[1];g.beginPath();g.arc(x-r*.22,y-r*.24,r*.68,0,7);g.fill();g.fillStyle=cols[2];g.beginPath();g.arc(x-r*.4,y-r*.42,r*.3,0,7);g.fill()};
  const trunk=(cx,y0,y1,w,col,limbs)=>{g.fillStyle=col;g.beginPath();g.moveTo(cx-w*B/2,y0*B);g.lineTo(cx-w*B*.32,y1*B);g.lineTo(cx+w*B*.32,y1*B);g.lineTo(cx+w*B/2,y0*B);g.closePath();g.fill();
    g.strokeStyle=col;g.lineCap='round';for(const [dx,dy,ex,ey,lw] of limbs){g.lineWidth=lw*B;g.beginPath();g.moveTo(cx+dx*B,dy*B);g.lineTo(cx+ex*B,ey*B);g.stroke()}g.lineCap='butt'};
  if(k==='O'){const P=[[.5,.62,.42],[1.05,.5,.5],[1.6,.55,.46],[.75,1.12,.5],[1.4,1.1,.52],[1.05,1.45,.48],[2.1,1.05,.42],[.35,1.25,.36],[1.95,1.55,.38]],C=HB_FALL[col]||['#2E5E3A','#3F7449','#57895A'];
    trunk(1.8*B,3.0,1.3,.24,'#6B4A2E',[[0,1.9,-.55,1.3,.09],[0,1.75,.5,1.2,.08]]);
    for(const [x,y,r] of P){const j=(R()-.5)*.08;blob((x+.55+j)*B,(y+.2)*B,r*B,C)}}
  else if(k==='P'){   // Scots pine: tall bare red trunk, flat clumps of dark needles up top
    trunk(1.8*B,3.9,.9,.17,'#8a4a2e',[[0,1.7,-.7,1.15,.06],[0,1.45,.65,.95,.06],[0,2.3,.45,1.95,.05]]);
    g.fillStyle='rgba(255,170,110,.25)';g.fillRect(1.8*B-B*.085,1.2*B,B*.05,2.6*B);
    const P=[[1.0,1.15,.55,.26],[2.55,.95,.55,.25],[1.8,.55,.75,.3],[1.35,.8,.5,.22],[2.2,1.45,.5,.22],[1.1,1.6,.42,.2]];
    for(const [x,y,rx,ry] of P){g.fillStyle='#173822';g.beginPath();g.ellipse(x*B,y*B,rx*B+3,ry*B+3,0,0,7);g.fill();g.fillStyle='#1E3F33';g.beginPath();g.ellipse(x*B,y*B,rx*B,ry*B,0,0,7);g.fill();
      g.fillStyle='#2C5946';g.beginPath();g.ellipse(x*B-rx*B*.15,y*B-ry*B*.25,rx*B*.72,ry*B*.6,0,0,7);g.fill();g.fillStyle='#3E7058';g.beginPath();g.ellipse(x*B-rx*B*.35,y*B-ry*B*.45,rx*B*.35,ry*B*.3,0,0,7);g.fill()}}
  else if(k==='R'){   // rowan: slim grey trunk, small rust-orange crown with red berries (late autumn)
    trunk(1.7*B,3.0,1.5,.13,'#6d6a64',[[0,2.0,-.4,1.55,.05],[0,1.9,.4,1.5,.05]]);
    const P=[[1.2,.75,.34],[1.75,.6,.36],[2.2,.85,.32],[1.05,1.2,.32],[1.65,1.15,.4],[2.25,1.3,.3],[1.6,1.6,.3]],C=HB_FALL[col]||['#8a3f22','#A9542F','#d07a42'];
    for(const [x,y,r] of P)blob(x*B,y*B,r*B,C);
    for(let i=0;i<9;i++){const bx=(1.0+R()*1.4)*B,by=(.6+R()*1.1)*B;g.fillStyle='#c2312a';for(const [ox,oy] of [[0,0],[5,2],[2,5]]){g.beginPath();g.arc(bx+ox,by+oy,3,0,7);g.fill()}}}
  else if(k==='B'){const P=[[.75,.55,.36],[1.25,.45,.38],[1.7,.7,.34],[.6,1.05,.36],[1.15,1.05,.42],[1.65,1.2,.34],[1.0,1.5,.32]],C=HB_FALL[col]||['#4F7F4A','#6B9A5A','#8DB07A'];
    for(const [x,y,r] of P){blob((x+.1)*B,(y+.2)*B,r*B,C)}
    g.fillStyle='rgba(230,220,200,.5)';for(let i=0;i<5;i++){g.fillRect((.7+R()*1.1)*B,(.9+R()*.7)*B,3,B*.12)}}   // white twigs showing through
  else{const C=['#1F4A34','#2E6B3E','#3F7F4E'];for(let i=0;i<4;i++){const y=(.25+i*.78)*B,w=(.42+i*.17)*B,h=1.0*B,x=.95*B+(i===0?1:0);
      g.fillStyle=ol;g.beginPath();g.moveTo(x,y-4);g.lineTo(x+w+4,y+h+3);g.lineTo(x-w-4,y+h+3);g.closePath();g.fill();
      g.fillStyle=C[0];g.beginPath();g.moveTo(x,y);g.lineTo(x+w,y+h);g.lineTo(x-w,y+h);g.closePath();g.fill();
      g.fillStyle=C[1];g.beginPath();g.moveTo(x,y+4);g.lineTo(x-w*.15,y+h*.95);g.lineTo(x-w*.85,y+h*.95);g.closePath();g.fill();
      g.fillStyle=C[2];g.beginPath();g.moveTo(x-2,y+8);g.lineTo(x-w*.3,y+h*.6);g.lineTo(x-w*.55,y+h*.6);g.closePath();g.fill()}}
  return HB_CAN[key]=c}
const HB_CANBOX={P:[-1.3,-3.4,3.6,3.9],R:[-1.2,-2.5,3.4,3.0],O:[-1.3,-2.5,3.6,3.0],B:[-.25,-2.35,2.8,2.9],S:[-.45,-3.35,1.9,3.7]};   // where each picture sits, in tiles from the trunk tile's top-left
const HB_CANFOOT={P:[-1,-3,3,3],R:[-1,-2,3,2],O:[-1,-2,3,2],B:[0,-2,2,2],S:[0,-3,1,3]};                          // the tiles each canopy covers (CF_81 3.8)
function hbCanopies(og,OT,tm,cx,cy,W,H){
  for(const [k,x,y,i,col] of HB_TREES.map((t,i)=>[t[0],t[1],t[2],i,t[3]])){const b=HB_CANBOX[k],X=(x+b[0])*OT,Y=(y+b[1])*OT,w=b[2]*OT,h=b[3]*OT;if(X>cx+W||X+w<cx||Y>cy+H||Y+h<cy)continue;
    const f=HB_CANFOOT[k],under=OW.px>=x+f[0]-.5&&OW.px<=x+f[0]+f[2]-.5&&OW.py>=y+f[1]-.6&&OW.py<=y+f[1]+f[3]-.4;
    og.globalAlpha=under?.45:1;og.drawImage(hbCanopyPic(k,i%2,col),X,Y,w,h)}
  og.globalAlpha=1}
/* side and top doors: the opening sits on the edge the door faces, with its own painted frame and a lit threshold */
function hbSideDoors(g,b,R){const B=BP,C=b.col2,f=b.face,col=HB_DOORCOL[HBB.indexOf(b)%HB_DOORCOL.length],fv=HB_FV[f];
  for(const [dx,dy] of b.doors){const px=dx*B,py=dy*B;let x,y,w,h;
    if(f==='u'){x=px+B*.12;y=py+B*.04;w=B*.76;h=B*.56}else if(f==='l'){x=px+B*.04;y=py+B*.12;w=B*.56;h=B*.76}else{x=px+B*.4;y=py+B*.12;w=B*.56;h=B*.76}
    g.fillStyle='rgba(0,0,0,.35)';g.fillRect(x-5,y-5,w+10,h+10);
    g.fillStyle='#0d1114';g.fillRect(x,y,w,h);g.strokeStyle=col;g.lineWidth=6;g.strokeRect(x,y,w,h);
    g.fillStyle='rgba(232,163,61,.45)';if(f==='u')g.fillRect(x+4,y+4,w-8,B*.12);else if(f==='l')g.fillRect(x+4,y+4,B*.12,h-8);else g.fillRect(x+w-4-B*.12,y+4,B*.12,h-8);
    g.fillStyle=C;if(f==='u')g.fillRect(x-4,y+h,w+8,B*.08);else if(f==='l')g.fillRect(x+w,y-4,B*.08,h+8);else g.fillRect(x-B*.08,y-4,B*.08,h+8);
    g.fillStyle='#d9d0b8';g.beginPath();g.arc(f==='u'?x+w*.78:x+w*.5,f==='u'?y+h*.62:y+h*.74,3,0,7);g.fill();
    LG.push({x:(dx+.5+fv[0]*.9)*B,y:(dy+.5+fv[1]*.9)*B,r:B*1.6,col:'#E8A33D',a:.22,f:R()*9})}}
/* THE BASIN from above: Dry Dock 14, flooded, the Closers' ship inside (bow east), the caisson gate on the west end, the gatehouse on the north rim */
function hbBakeDock(g,b,R){const B=BP,X=b.x*B,Y=b.y*B,W=b.w*B,H=b.h*B;g.save();
  g.fillStyle='rgba(0,0,0,.4)';g.fillRect(X+6,Y+10,W+6,H+6);
  g.fillStyle='#5b636a';g.fillRect(X,Y,W,H);
  g.strokeStyle='rgba(20,24,28,.5)';g.lineWidth=2;for(let x=X+B*.5;x<X+W;x+=B*.5){g.beginPath();g.moveTo(x,Y+H-B*.38);g.lineTo(x,Y+H);g.stroke();g.beginPath();g.moveTo(x,Y);g.lineTo(x,Y+B*.3);g.stroke()}
  g.strokeStyle='#8E8B84';g.lineWidth=8;g.strokeRect(X+4,Y+4,W-8,H-8);
  const ix=X+B*.42,iy=Y+B*1.02,iw=W-B*.84,ih=H-B*1.42;
  {const gr=g.createLinearGradient(0,iy,0,iy+ih);gr.addColorStop(0,'#15303a');gr.addColorStop(1,'#1f3f48');g.fillStyle=gr;g.fillRect(ix,iy,iw,ih)}
  g.strokeStyle='rgba(0,0,0,.55)';g.lineWidth=6;g.strokeRect(ix,iy,iw,ih);
  g.strokeStyle='rgba(142,139,132,.35)';g.lineWidth=2;for(let i=1;i<=2;i++)g.strokeRect(ix+i*6,iy+i*6,iw-i*12,ih-i*12);   // the stepped altars of the dock wall, under water
  for(let i=0;i<14;i++){g.strokeStyle='rgba(200,225,230,'+(.05+R()*.07)+')';g.lineWidth=1.5;const rx=ix+R()*iw,ry=iy+R()*ih;g.beginPath();g.moveTo(rx,ry);g.lineTo(rx+B*(.2+R()*.4),ry);g.stroke()}
  // the caisson gate (west end): grey steel, ribs, a faded cream 14
  const cw=B*.5;g.fillStyle='#6E7780';g.fillRect(ix,iy,cw,ih);g.strokeStyle='rgba(20,24,28,.6)';g.lineWidth=2;for(let y=iy+B*.3;y<iy+ih;y+=B*.3){g.beginPath();g.moveTo(ix,y);g.lineTo(ix+cw,y);g.stroke()}g.strokeStyle='#2b2f31';g.lineWidth=3;g.strokeRect(ix,iy,cw,ih);
  g.save();g.translate(ix+cw/2,iy+ih/2);g.rotate(-Math.PI/2);g.fillStyle='rgba(232,224,204,.42)';g.font='700 '+Math.round(B*.42)+'px "Bowlby One",Impact,sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('14',0,0);g.restore();
  // the ship
  const sx0=ix+cw+B*.3,sx1=ix+iw-B*.25,sy=iy+ih/2,hw=ih*.34,L=sx1-sx0;
  const hull=(s)=>{const h=hw*s,a=sx0+(1-s)*B*.25,e=sx1-(1-s)*B*.45;g.beginPath();g.moveTo(a+B*.45,sy-h);g.lineTo(e-L*.24,sy-h);g.quadraticCurveTo(e-L*.05,sy-h*.85,e,sy);g.quadraticCurveTo(e-L*.05,sy+h*.85,e-L*.24,sy+h);g.lineTo(a+B*.45,sy+h);g.quadraticCurveTo(a,sy+h,a,sy);g.quadraticCurveTo(a,sy-h,a+B*.45,sy-h);g.closePath()};
  g.fillStyle='rgba(0,0,0,.4)';g.save();g.translate(5,8);hull(1);g.fill();g.restore();
  g.fillStyle='#3b2a1c';hull(1);g.fill();g.strokeStyle='#140e08';g.lineWidth=3;g.stroke();
  g.fillStyle='#8a6a4a';hull(.8);g.fill();
  g.save();hull(.8);g.clip();g.strokeStyle='rgba(30,20,12,.5)';g.lineWidth=2;for(let y=sy-hw;y<sy+hw;y+=B*.22){g.beginPath();g.moveTo(sx0,y);g.lineTo(sx1,y);g.stroke()}
    for(let i=0;i<18;i++){g.fillStyle=R()<.5?'rgba(255,230,190,.06)':'rgba(0,0,0,.08)';g.fillRect(sx0+R()*L,sy-hw+R()*hw*2,B*(.3+R()*.6),B*.2)}g.restore();
  g.strokeStyle='#2a1d12';g.lineWidth=4;g.beginPath();g.moveTo(sx1,sy);g.lineTo(sx1+B*.6,sy);g.stroke();   // bowsprit
  for(const [fx,fw] of [[.18,.5],[.43,.6],[.66,.45]]){g.fillStyle='#4a3726';g.fillRect(sx0+L*fx-fw*B/2,sy-B*.22,fw*B,B*.44);g.strokeStyle='#140e08';g.lineWidth=2;g.strokeRect(sx0+L*fx-fw*B/2,sy-B*.22,fw*B,B*.44)}   // hatches
  {const wx=sx0+B*.55;g.strokeStyle='#5c4632';g.lineWidth=3;g.beginPath();g.arc(wx,sy,B*.16,0,7);g.stroke();for(let i=0;i<8;i++){const a=i*Math.PI/4;g.beginPath();g.moveTo(wx,sy);g.lineTo(wx+Math.cos(a)*B*.22,sy+Math.sin(a)*B*.22);g.stroke()}}   // the wheel at the stern
  for(const [fx,yl] of [[.3,1.0],[.55,1.12],[.78,.92]]){const mx=sx0+L*fx,yh=hw*yl*1.15;
    g.strokeStyle='#2a1d12';g.lineWidth=5;g.beginPath();g.moveTo(mx,sy-yh);g.lineTo(mx,sy+yh);g.stroke();
    g.fillStyle='#e6dcc8';g.strokeStyle='rgba(60,50,40,.6)';g.lineWidth=2;g.beginPath();g.moveTo(mx+B*.02,sy-yh*.9);g.quadraticCurveTo(mx+B*.24,sy,mx+B*.02,sy+yh*.9);g.lineTo(mx+B*.02,sy-yh*.9);g.fill();g.stroke();for(const t of[-.55,-.2,.2,.55]){g.beginPath();g.moveTo(mx,sy+yh*t);g.lineTo(mx+B*.15,sy+yh*t);g.stroke()}   // furled sail on the yard
    g.fillStyle='#5c4632';g.beginPath();g.arc(mx,sy,B*.13,0,7);g.fill();g.strokeStyle='#140e08';g.lineWidth=2;g.stroke()}
  {const fx=sx0+B*.18,fy=sy-hw*.55;g.strokeStyle='#1b1410';g.lineWidth=3;g.beginPath();g.moveTo(fx,fy+B*.2);g.lineTo(fx,fy-B*.15);g.stroke();g.fillStyle='#14110f';g.fillRect(fx,fy-B*.15,B*.46,B*.3);
    g.fillStyle='#e6dcc8';g.beginPath();g.moveTo(fx+B*.17,fy+B*.02);g.quadraticCurveTo(fx+B*.17,fy-B*.11,fx+B*.23,fy-B*.11);g.quadraticCurveTo(fx+B*.29,fy-B*.11,fx+B*.29,fy+B*.02);g.lineTo(fx+B*.32,fy+B*.05);g.lineTo(fx+B*.14,fy+B*.05);g.closePath();g.fill();g.strokeStyle='#e6dcc8';g.lineWidth=2;g.beginPath();g.moveTo(fx+B*.08,fy+B*.12);g.lineTo(fx+B*.38,fy+B*.03);g.moveTo(fx+B*.08,fy+B*.03);g.lineTo(fx+B*.38,fy+B*.12);g.stroke()}   // the Closers' bell over crossed bones
  // the gatehouse on the north rim; the doors open onto the forecourt
  const gx0=(b.x+1.4)*B,gx1=(b.x+b.w-1.4)*B,gy=Y,gh=B*.98;
  g.fillStyle='#3A4A55';g.fillRect(gx0,gy,gx1-gx0,gh);g.strokeStyle='rgba(0,0,0,.3)';g.lineWidth=2;for(let y=gy+B*.2;y<gy+gh;y+=B*.2){g.beginPath();g.moveTo(gx0,y);g.lineTo(gx1,y);g.stroke()}
  g.fillStyle='rgba(255,255,255,.06)';g.fillRect(gx0,gy,gx1-gx0,B*.12);g.fillStyle='rgba(0,0,0,.45)';g.fillRect(gx0,gy+gh-6,gx1-gx0,6);
  for(const [dx,dy] of b.doors){const px=dx*B,py=dy*B;g.fillStyle='#0d1114';g.fillRect(px+B*.06,py+B*.04,B*.88,B*.5);g.strokeStyle='#A9542F';g.lineWidth=6;g.strokeRect(px+B*.06,py+B*.04,B*.88,B*.5);g.fillStyle='rgba(232,163,61,.4)';g.fillRect(px+B*.12,py+B*.1,B*.76,B*.1)}
  g.strokeStyle='#A9542F';g.lineWidth=3;g.beginPath();g.moveTo(25*B,gy+B*.04);g.lineTo(25*B,gy+B*.54);g.stroke();
  {const sw=B*3.4,sx=25*B-sw/2,sy=gy+B*.58;g.fillStyle='#1f1a16';g.fillRect(sx,sy,sw,B*.36);g.strokeStyle='#E6DCC8';g.lineWidth=3;g.strokeRect(sx+2,sy+2,sw-4,B*.36-4);
    g.fillStyle='#efe6d0';g.textAlign='center';g.textBaseline='middle';g.font='700 '+Math.round(B*.22)+'px "Bowlby One",Impact,sans-serif';g.fillText(b.sign+'  ·  '+b.sub,25*B,sy+B*.19)}
  for(const bx of [X+B*.5,X+W-B*1.3]){const by=Y+B*.08;g.fillStyle='#E6DCC8';g.fillRect(bx,by,B*.8,B*.86);g.fillStyle='#A9542F';g.textAlign='center';g.textBaseline='middle';g.font='700 '+Math.round(B*.42)+'px "Bowlby One",Impact,sans-serif';g.fillText('14',bx+B*.4,by+B*.38);g.font='700 '+Math.round(B*.12)+'px "Barlow Condensed",sans-serif';g.fillText('FOREVER',bx+B*.4,by+B*.72);g.fillStyle='#8a4b2f';g.fillRect(bx,by+B*.83,B*.8,B*.05)}
  for(const [lx,ly] of [[X+B*.3,Y+B*.3],[X+W-B*.3,Y+B*.3],[X+B*.3,Y+H-B*.3],[X+W-B*.3,Y+H-B*.3]]){g.fillStyle='#d9d0b8';g.beginPath();g.arc(lx,ly,6,0,7);g.fill();LG.push({x:lx,y:ly,r:B*2,col:'#E8A33D',a:.28,f:R()*9})}
  LG.push({x:25*B,y:(b.y-.6)*B,r:B*1.8,col:'#E8A33D',a:.24,f:R()*9});
  g.restore()}

/* ---------------------------------------------------------------- town animation: fog over the south shore, the beacon sweep, gulls */
function hbAnim(og,OT,tm){
  const fx=((tm*.35)%1.4-.2)*HBW*OT;og.save();og.globalAlpha=.55;const fg=og.createLinearGradient(fx-OT*6,0,fx+OT*6,0);fg.addColorStop(0,'rgba(190,215,225,0)');fg.addColorStop(.5,'rgba(190,215,225,.13)');fg.addColorStop(1,'rgba(190,215,225,0)');og.fillStyle=fg;og.fillRect(fx-OT*6,44*OT,OT*12,OT*4);og.restore();
  {const bx=20*OT,by=48.1*OT,a=tm*1.1;og.save();og.globalCompositeOperation='lighter';og.translate(bx,by);og.rotate(a);const gr=og.createLinearGradient(0,0,OT*9,0);gr.addColorStop(0,'rgba(255,214,140,.30)');gr.addColorStop(1,'rgba(255,214,140,0)');og.fillStyle=gr;og.beginPath();og.moveTo(0,0);og.lineTo(OT*9,-OT*1.1);og.lineTo(OT*9,OT*1.1);og.closePath();og.fill();og.restore()}
  for(const [gx,gy,ph] of [[16,14,0],[33,27,2.1]]){const fl=Math.sin(tm*5+ph)>0,x=gx*OT+OT/2+Math.sin(tm*.6+ph)*OT*.3,y=gy*OT+OT*.5;og.save();og.translate(x,y);og.fillStyle='rgba(0,0,0,.28)';og.beginPath();og.ellipse(0,OT*.28,OT*.18,OT*.05,0,0,7);og.fill();og.fillStyle='#e8e6de';og.beginPath();og.ellipse(0,0,OT*.1,OT*.06,0,0,7);og.fill();og.strokeStyle='#e8e6de';og.lineWidth=2;og.beginPath();if(fl){og.moveTo(-OT*.02,0);og.lineTo(-OT*.2,-OT*.1);og.moveTo(OT*.02,0);og.lineTo(OT*.2,-OT*.1)}else{og.moveTo(-OT*.02,0);og.lineTo(-OT*.2,OT*.03);og.moveTo(OT*.02,0);og.lineTo(OT*.2,OT*.03)}og.stroke();og.fillStyle='#d9a437';og.fillRect(OT*.09,-OT*.01,OT*.05,OT*.02);og.restore()}
  hbAnim2(og,OT,tm);
}
/* ---- the animated layer: the ferry and its chain, boats, roof flags, smoke, ripples, gulls ---- */
function hbAnim2(og,OT,tm){
  // the ferry, moored broadside across the end of the ferry dock (its deck is the boarding tiles)
  {const by=Math.sin(tm*1.1)*OT*.03,x0=40.5,x1=45.7,y0=49.8,y1=52;og.save();og.translate(0,by);
    og.fillStyle='rgba(0,0,0,.3)';og.beginPath();og.ellipse(43.2*OT,51.2*OT,2.8*OT,1.2*OT,0,0,7);og.fill();
    og.fillStyle='#f1ead8';og.strokeStyle='#14181b';og.lineWidth=2.6;og.beginPath();og.moveTo(x0*OT,y0*OT);og.lineTo((x1-1)*OT,y0*OT);og.quadraticCurveTo((x1-.1)*OT,y0*OT,x1*OT,(y0+1.1)*OT);og.lineTo(x1*OT,y1*OT);og.lineTo(x0*OT,y1*OT);og.closePath();og.fill();og.stroke();
    og.fillStyle='#C2492F';og.fillRect(x0*OT,y0*OT,(x1-x0-1)*OT,.16*OT);
    og.fillStyle='#8a6a4a';og.fillRect(41.85*OT,50.0*OT,2.3*OT,1.95*OT);og.strokeStyle='rgba(0,0,0,.4)';og.lineWidth=1;for(let i=0;i<=12;i++){og.beginPath();og.moveTo((41.85+i*.19)*OT,50*OT);og.lineTo((41.85+i*.19)*OT,51.95*OT);og.stroke()}
    og.fillStyle='#4A6FA5';og.fillRect(40.75*OT,50.15*OT,.95*OT,1.7*OT);og.strokeStyle='#14181b';og.lineWidth=2;og.strokeRect(40.75*OT,50.15*OT,.95*OT,1.7*OT);
    og.fillStyle='#ffe9b0';for(const wy of[50.35,50.9,51.45])og.fillRect(40.95*OT,wy*OT,.3*OT,.3*OT);
    og.fillStyle='#C2492F';og.beginPath();og.arc(44.85*OT,50.9*OT,.17*OT,0,7);og.fill();og.fillStyle='#fff3d0';og.beginPath();og.arc(44.85*OT,50.9*OT,.07*OT,0,7);og.fill();
    og.font='700 '+Math.round(OT*.2)+'px "Bowlby One",Impact,sans-serif';og.textAlign='center';og.textBaseline='middle';og.fillStyle='#2a3338';og.fillText('FERRY',44.9*OT,50.35*OT);
    og.restore()}
  hbBoat(og,OT,14.2,16.4,2.8,1.35,'#2F8A9A',tm,0,'fish');
  hbBoat(og,OT,27.4,29.7,1.7,.85,'#C2492F',tm,1.7,'row');
  hbBoat(og,OT,7.5,48.4,1.8,.85,'#E8B23D',tm,3.1,'row');
  hbBoat(og,OT,14.15,47.3,1.0,2.2,'#4E7C7A',tm,2.2,'row');
  // the chain across the ferry dock
  {const open=hbGateOpen(),x0=42.04*OT,x1=43.96*OT,y=46.5*OT;
    og.fillStyle='#14181b';og.fillRect(x0-OT*.1,y-OT*.22,OT*.14,OT*.44);og.fillRect(x1-OT*.04,y-OT*.22,OT*.14,OT*.44);og.fillStyle='#E8C53A';og.fillRect(x0-OT*.1,y-OT*.22,OT*.14,OT*.1);og.fillRect(x1-OT*.04,y-OT*.22,OT*.14,OT*.1);
    og.strokeStyle='#9aa4a8';og.lineWidth=3;og.lineCap='round';og.setLineDash([4,3]);og.beginPath();
    if(!open){og.moveTo(x0,y-OT*.1);og.quadraticCurveTo((x0+x1)/2,y+OT*.22+Math.sin(tm*1.6)*OT*.04,x1,y-OT*.1)}else{og.moveTo(x0,y-OT*.1);og.quadraticCurveTo(x0-OT*.05,y+OT*.12,x0+OT*.02,y+OT*.3)}
    og.stroke();og.setLineDash([]);
    if(!open){og.fillStyle='#C2492F';og.fillRect((x0+x1)/2-OT*.2,y+OT*.04+Math.sin(tm*1.6)*OT*.02,OT*.4,OT*.26);og.strokeStyle='#fff3d0';og.lineWidth=2;og.beginPath();og.moveTo((x0+x1)/2-OT*.1,y+OT*.1);og.lineTo((x0+x1)/2+OT*.1,y+OT*.24);og.moveTo((x0+x1)/2+OT*.1,y+OT*.1);og.lineTo((x0+x1)/2-OT*.1,y+OT*.24);og.stroke()}
    else{og.fillStyle='#4C9A5E';og.beginPath();og.arc(42.5*OT,50.5*OT+Math.sin(tm*3)*OT*.02,OT*.07,0,7);og.fill();og.fillStyle='#E8C53A';og.beginPath();og.arc(43.5*OT,50.5*OT,OT*.07,0,7);og.fill()}
  }
  // v3.26T the Longshore Yard gate: chained shut until the Longshoremen are beaten, then swung open
  {const X=HB_YARDGATE[0]*OT,Y=HB_YARDGATE[1]*OT,open=hbYardOpen();
    if(!open){for(const x0 of [.06,.5]){og.fillStyle='#6b4f33';og.fillRect(X+x0*OT,Y+OT*.2,OT*.44,OT*.56);og.strokeStyle='#241a12';og.lineWidth=1.5;og.strokeRect(X+x0*OT,Y+OT*.2,OT*.44,OT*.56);og.beginPath();og.moveTo(X+x0*OT,Y+OT*.2);og.lineTo(X+(x0+.44)*OT,Y+OT*.76);og.stroke()}
      og.strokeStyle='#9aa4a8';og.lineWidth=1.5;og.setLineDash([2,1.5]);og.beginPath();og.moveTo(X+OT*.3,Y+OT*.5);og.lineTo(X+OT*.7,Y+OT*.5);og.stroke();og.setLineDash([]);og.fillStyle='#e8c53a';og.fillRect(X+OT*.42,Y+OT*.42,OT*.16,OT*.2)}
    else{og.fillStyle='#6b4f33';og.strokeStyle='#241a12';og.lineWidth=1.5;og.fillRect(X+OT*.04,Y-OT*.38,OT*.12,OT*.56);og.strokeRect(X+OT*.04,Y-OT*.38,OT*.12,OT*.56);og.fillRect(X+OT*.84,Y-OT*.38,OT*.12,OT*.56);og.strokeRect(X+OT*.84,Y-OT*.38,OT*.12,OT*.56)}}
  hbYardSync();
  // flags on the roofs
  for(const [fx,fy,col,ph] of[[8.3,10.2,'#E8743A',0],[3.3,24.2,'#E8C53A',1.1],[43.3,31.2,'#C2492F',2.2],[35.3,13.2,'#2D74A0',3.3],[27.3,3.2,'#4C9A5E',4.4],[45.3,20.2,'#8E4E9E',5.5]]){
    og.save();og.translate(fx*OT,fy*OT);og.strokeStyle='#14181b';og.lineWidth=2.2;og.beginPath();og.moveTo(0,0);og.lineTo(0,-OT*.95);og.stroke();
    og.fillStyle=col;og.beginPath();og.moveTo(0,-OT*.95);for(let i=0;i<=6;i++)og.lineTo(i*OT*.09,-OT*.95+Math.sin(tm*4+i*.7+ph)*OT*.04);for(let i=6;i>=0;i--)og.lineTo(i*OT*.09,-OT*.62+Math.sin(tm*4+i*.7+ph)*OT*.04);og.closePath();og.fill();og.restore()}
  // smoke from the cannery stack and the arcade vent
  for(const [sx,sy] of[[44.15,31.4],[31.4,13.5]]){for(let i=0;i<6;i++){const t=((tm*.22+i/6)%1),x=sx*OT+t*OT*1.4+Math.sin(tm+i)*OT*.1,y=sy*OT-t*OT*2.2;og.fillStyle='rgba(205,215,220,'+(.20*(1-t))+')';og.beginPath();og.arc(x,y,OT*(.12+t*.32),0,7);og.fill()}}
  // ripples at the pier ends and round the Beacon
  for(const [rx,ry] of[[12.6,27.2],[33.6,33.2],[24.6,34.5],[20,51.4]]){for(let i=0;i<2;i++){const t=((tm*.5+i*.5+rx)%1);og.strokeStyle='rgba(200,225,230,'+(.30*(1-t))+')';og.lineWidth=1.6;og.beginPath();og.ellipse(rx*OT,ry*OT,OT*(.25+t*.7),OT*(.09+t*.25),0,0,7);og.stroke()}}
  // more gulls, and one riding the wind over the open sea
  for(const [gx,gy,ph] of[[6,47,1.3],[37,48,2.6],[17,27,.7],[31,19,4.1]]){const fl=Math.sin(tm*5+ph)>0,x=gx*OT+OT/2+Math.sin(tm*.5+ph)*OT*.35,y=gy*OT+OT*.4+Math.cos(tm*.4+ph)*OT*.1;og.save();og.translate(x,y);og.fillStyle='rgba(0,0,0,.25)';og.beginPath();og.ellipse(0,OT*.26,OT*.16,OT*.045,0,0,7);og.fill();og.fillStyle='#ecebe4';og.beginPath();og.ellipse(0,0,OT*.09,OT*.055,0,0,7);og.fill();og.strokeStyle='#ecebe4';og.lineWidth=2;og.beginPath();if(fl){og.moveTo(-OT*.02,0);og.lineTo(-OT*.19,-OT*.1);og.moveTo(OT*.02,0);og.lineTo(OT*.19,-OT*.1)}else{og.moveTo(-OT*.02,0);og.lineTo(-OT*.19,OT*.03);og.moveTo(OT*.02,0);og.lineTo(OT*.19,OT*.03)}og.stroke();og.restore()}
  {const t=(tm*.08)%1.3-.15,gx=t*HBW*OT,gy=(48+Math.sin(tm*.7)*.6)*OT,fl=Math.sin(tm*7)>0;og.save();og.translate(gx,gy);og.strokeStyle='#ecebe4';og.lineWidth=2.4;og.beginPath();og.moveTo(-OT*.2,fl?-OT*.1:OT*.04);og.lineTo(0,0);og.lineTo(OT*.2,fl?-OT*.1:OT*.04);og.stroke();og.restore()}
}

/* ---- v3.20T MEMORY: big town maps are drawn in 4 x 4 chunks; only the chunks near the screen are kept (at most 8, about 27 MB for the harbor) ---- */
const OWCH={c:4,r:4,keep:8,pad:4,stat:{peak:0,made:0}};
function owBakeChunked(m,fn){
  const W=m.w*BP,H=m.h*BP,cw=Math.ceil(W/OWCH.c),ch=Math.ceil(H/OWCH.r);
  LG=[];VT=[];const t=document.createElement('canvas');t.width=t.height=1;try{fn(t,m,null)}finally{t.width=t.height=0}   // one pass on a 1 px canvas only collects the lights
  m.baked={chunked:1,width:W,height:H,cw,ch,fn,ck:{},n:0};m.lights=LG;m.vents=VT}
function owChunk(m,i,j){const b=m.baked,k=i*16+j,e=b.ck[k];if(e){e.u=++b.n;return e.c}
  const P=OWCH.pad,c=document.createElement('canvas');c.width=b.cw+2*P;c.height=b.ch+2*P;const g=c.getContext('2d');g.translate(P-i*b.cw,P-j*b.ch);
  const kl=LG,kv=VT;LG=[];VT=[];
  const reg={x0:Math.floor(i*b.cw/BP),y0:Math.floor(j*b.ch/BP),x1:Math.ceil((i+1)*b.cw/BP),y1:Math.ceil((j+1)*b.ch/BP)};
  try{b.fn(c,m,reg)}finally{LG=kl;VT=kv}
  b.ck[k]={c,u:++b.n,i,j};OWCH.stat.made++;
  const live=Object.keys(b.ck).length;if(live>OWCH.stat.peak)OWCH.stat.peak=live;return c}
function owZap(b){if(!b)return;if(b.chunked){for(const k in b.ck){const c=b.ck[k].c;c.width=c.height=0}b.ck={}}else{b.width=b.height=0}}
function owBlit(Mp,cx,cy,W,H,k,fit,mw,mh){const b=Mp.baked;
  if(!b.chunked){if(fit)og.drawImage(b,0,0,b.width,b.height,0,0,mw,mh);else og.drawImage(b,cx/k,cy/k,W/k,H/k,cx,cy,W,H);return}
  const P=OWCH.pad,sx0=Math.max(0,cx/k),sy0=Math.max(0,cy/k),sx1=Math.min(b.width,(cx+W)/k),sy1=Math.min(b.height,(cy+H)/k);
  const i0=Math.floor(sx0/b.cw),i1=Math.min(OWCH.c-1,Math.floor((sx1-.01)/b.cw)),j0=Math.floor(sy0/b.ch),j1=Math.min(OWCH.r-1,Math.floor((sy1-.01)/b.ch)),vis={};
  let miss=0;for(let j=j0;j<=j1;j++)for(let i=i0;i<=i1;i++){vis[i*16+j]=1;if(!b.ck[i*16+j])miss++}
  if(miss){const f=Object.keys(b.ck).filter(q=>!vis[q]).sort((p,q)=>b.ck[p].u-b.ck[q].u);while(f.length&&Object.keys(b.ck).length+miss>OWCH.keep){const q=f.shift();b.ck[q].c.width=b.ck[q].c.height=0;delete b.ck[q]}}   // make room first, so memory never spikes
  for(let j=j0;j<=j1;j++)for(let i=i0;i<=i1;i++){const c=owChunk(Mp,i,j),ox=i*b.cw,oy=j*b.ch;
    const a0=Math.max(sx0,ox)-1,a1=Math.min(sx1,ox+b.cw)+1,b0=Math.max(sy0,oy)-1,b1=Math.min(sy1,oy+b.ch)+1;   // 1 px into the neighbour, so no seam shows
    og.drawImage(c,a0-ox+P,b0-oy+P,a1-a0,b1-b0,a0*k,b0*k,(a1-a0)*k,(b1-b0)*k)}
  // look ahead: draw at most one chunk the camera is about to reach; let go of the ones furthest away
  const mx=b.cw*.45,my=b.ch*.45,ni0=Math.max(0,Math.floor((sx0-mx)/b.cw)),ni1=Math.min(OWCH.c-1,Math.floor((sx1+mx)/b.cw)),nj0=Math.max(0,Math.floor((sy0-my)/b.ch)),nj1=Math.min(OWCH.r-1,Math.floor((sy1+my)/b.ch));
  let want=null;const near={};for(let j=nj0;j<=nj1;j++)for(let i=ni0;i<=ni1;i++){near[i*16+j]=1;if(!want&&!b.ck[i*16+j])want=[i,j]}
  const drop=q=>{b.ck[q].c.width=b.ck[q].c.height=0;delete b.ck[q]},far=x=>Object.keys(b.ck).filter(q=>!vis[q]&&!(x&&near[q])).sort((p,q)=>b.ck[p].u-b.ck[q].u);
  if(want){if(Object.keys(b.ck).length>=OWCH.keep){const f=far(1);if(f.length)drop(f[0])}if(Object.keys(b.ck).length<OWCH.keep)owChunk(Mp,want[0],want[1])}
  while(Object.keys(b.ck).length>OWCH.keep){const f=far(1).length?far(1):far(0);if(!f.length)break;drop(f[0])}}

/* ---- v3.26T LONGSHORE YARD (CF_81 3.13, moved to the Commons in section 11): opens when the Longshoremen are beaten ---- */
const HB_YARDGATE=[45,7],HB_WRIGHT_OUT=[46,8,'l'],HB_WRIGHT_IN=[43,4,'r'];
const hbYardOpen=()=>(SAVE.beaten||[]).includes('longshore');
const hbIsYard=(x,y)=>x===HB_YARDGATE[0]&&y===HB_YARDGATE[1];
function hbYardSync(){if(!M||!M.harbor)return;const open=hbYardOpen(),n=M.npcs.find(q=>q.id==='hb_yardman');
  if(n){const t=open?HB_WRIGHT_IN:HB_WRIGHT_OUT;if((n.x!==t[0]||n.y!==t[1])&&!(OW.x===t[0]&&OW.y===t[1])&&!OW.busy){n.x=t[0];n.y=t[1];n.d=t[2]}}
  if(open&&!OW.busy&&OWON){const T=hbS();if(!T.yardSeen){T.yardSeen=true;persist();owToast('LONGSHORE YARD OPEN')}}}
/* ---- v3.20T/v3.20bT SAVE MOVE: a save made on an older Hale Harbor map is moved once onto the current one (CF_81 3.12 + 11). Only harbor positions are touched. ---- */
const HB_MAPV=3;
function hbMigrate(){try{
  if(!SAVE||SAVE.hbMapV===HB_MAPV)return;
  const o=SAVE.ow,T=SAVE.t2||{},v2=SAVE.hbMapV===2,FR=[HB_FERRY[0],HB_FERRY[1],'d'],
    OLD={'18,10':[24,19,'u'],'19,10':[25,19,'u'],'9,8':[33,7,'d'],'16,22':[11,14,'d'],'6,17':[4,8,'d'],'7,32':[42,25,'d'],'28,29':[41,36,'d'],'27,8':[33,17,'d'],'28,16':[16,7,'d'],
      '22,16':[43,14,'d'],'7,24':[5,28,'d'],'29,23':[35,25,'d'],'15,31':[14,33,'d'],'23,22':[24,7,'d'],'6,37':[4,43,'d'],'17,37':[37,43,'d'],'31,37':[19,51,'d']},
    V2={'13,12':[11,14,'d'],'39,22':[42,25,'d'],'37,33':[41,36,'d'],'32,12':[33,17,'d'],'40,12':[43,14,'d'],'7,23':[5,28,'d'],'38,23':[35,25,'d'],'12,30':[14,33,'d'],'19,46':[19,51,'d']},
    fer=(x,y)=>(x===35||x===36)&&y>=37&&y<=42,
    S=hbSolidGrid(),free=(x,y)=>x>=0&&y>=0&&x<HBW&&y<HBH&&!S[y*HBW+x]&&!hbDoorAt(x,y),
    to=(x,y,d)=>{const k=x+','+y;if(v2){if(V2[k])return V2[k];return free(x,y)?[x,y,d||'d']:FR}
      if(OLD[k])return OLD[k];if(fer(x,y)||T.route2Unlocked)return FR;return [1,HB_ENTRY[1],'r']};
  if(o&&o.map==='harbor'){const t=to(o.x,o.y,o.d);o.x=t[0];o.y=t[1];o.d=t[2];o.ret=null}
  else if(o&&typeof o.map==='string'&&o.map.indexOf('hb_')===0&&o.ret){const t=to(o.ret.x,o.ret.y,o.ret.d);o.ret=Object.assign({},o.ret,{x:t[0],y:t[1],d:t[2]})}
  else if(o&&o.ret&&o.ret.map==='harbor'&&!v2&&fer(o.ret.x,o.ret.y)){o.ret=Object.assign({},o.ret,{x:HB_FERRY[0],y:HB_FERRY[1]})}   // the ferry deck's way back
  SAVE.hbMapV=HB_MAPV;persist()}catch(e){try{console.error('[CF] harbor save move failed',e)}catch(_){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",_)}}}

/* ===== v3.27T BOAT RACE vs RIPTIDE (CF_81 3.14, D8-D10): once round the island, clockwise, under the causeway arch. Tap the LEFT half of the
   screen for the left oar, the RIGHT half for the right oar, in a steady rhythm. Riptide always rows it in 33.0 s; a tie goes to him. ===== */
const RACE={T100:29.3,rip:33.0,pts:[[.30,.96],[.35,1],[.45,.92],[.55,.84],[.60,.80]],ease:.25,coast:.60,decay:.88,crab:.40,crabRec:1.0,maxT:45,count:3,reward:3};
function rcPct(g){const P=RACE.pts;if(g<=P[0][0])return P[0][1];for(let i=1;i<P.length;i++)if(g<=P[i][0]){const [a,pa]=P[i-1],[b,pb]=P[i];return pa+(pb-pa)*(g-a)/(b-a)}return P[P.length-1][1]}
function rcNew(){return{v:0,tg:0,last:null,side:null,crab:0,s:0,t:0,done:null,strokes:0,crabs:0}}
function rcStroke(st,t,side){if(st.last===null)st.tg=rcPct(.45);else{const gap=t-st.last;if(gap<.30||side===st.side){st.crab=RACE.crabRec;st.crabs++;st.last=t;st.side=side;return 'crab'}st.tg=rcPct(gap)}st.last=t;st.side=side;st.strokes++;return 'good'}
function rcStep(st,dt){if(dt<=0)return;st.t+=dt;st.v+=(st.tg-st.v)*Math.min(1,dt/RACE.ease);
  if(st.last!==null&&st.t-st.last>RACE.coast){const f=Math.pow(RACE.decay,dt/.1);st.v*=f;st.tg=Math.min(st.tg,st.v)}
  const mul=st.crab>0?RACE.crab+(1-RACE.crab)*(1-st.crab/RACE.crabRec):1;if(st.crab>0)st.crab=Math.max(0,st.crab-dt);
  const ds=st.v*mul*dt/RACE.T100;if(st.s<1&&st.s+ds>=1&&st.done===null)st.done=st.t-dt+dt*(1-st.s)/ds;st.s+=ds}
function hbRaceTalk(n){const T=hbS(),ask=()=>owAsk(n.name,'Once round the island. Clean.',[['RACE',()=>hbRace(n)],['NOT NOW']]);
  if(!T.raceMet){T.raceMet=true;persist();owSay(n.name,["Bram doesn't know I come here.","Race me round the island?"],ask)}else ask()}
function hbRace(n){
  OW.busy=true;
  let el=$('#race');if(!el){el=document.createElement('div');el.id='race';el.style.cssText='position:absolute;inset:0;z-index:6;background:#0b1217;touch-action:none';el.innerHTML='<canvas style="width:100%;height:100%;display:block;touch-action:none"></canvas>';$('#world').appendChild(el)}
  if(el.parentElement!==$('#world'))$('#world').appendChild(el);
  el.hidden=false;el.style.display='block';
  const cv=el.firstChild,r=$('#world').getBoundingClientRect(),W=cv.width=Math.round(r.width),H=cv.height=Math.round(r.height),c=cv.getContext('2d');
  const k=Math.min(W/480,H/315),ox=(W-480*k)/2,oy=(H-315*k)/2,lite=document.body.classList.contains('lite');
  const CX=240,CY=158,RX=165,RY=100,st=rcNew(),q=[];
  const t0=performance.now(),horn=t0+RACE.count*1000;let gone=false,over=0,honked=false,flash=null,spray=[],lastSide=null,res=null;
  const at=(s,lane)=>{const a=s*Math.PI*2,rx=RX+lane,ry=RY+lane*.6;return [CX+rx*Math.cos(a),CY+ry*Math.sin(a),Math.atan2(ry*Math.cos(a),-rx*Math.sin(a))]};
  const close=()=>{if(gone)return;gone=true;cv.onpointerdown=null;el.style.display='none';OW.busy=false};
  const finish=()=>{const T=hbS(),mine=st.done,win=mine!==null&&mine<RACE.rip,first=win&&!T.raceWon;
    if(mine!==null)T.raceBest=T.raceBest?Math.min(T.raceBest,mine):mine;
    if(first){T.raceWon=true;SAVE.upPts=(SAVE.upPts||0)+RACE.reward}persist();
    res={win,mine,first,best:T.raceBest};over=performance.now();try{if(SND.smp)SND.smp('sfx_bell',1,.5)}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}
    cv.onpointerdown=e=>{e.stopPropagation();e.preventDefault();if(performance.now()-over<700)return;close();owHud();
      const L=win?(hbCap()?null:['You row clean.',"Don't tell Bram."]):['Again when your arms work.'],tst=first?()=>owToast('+'+RACE.reward+' UPGRADE POINTS'):null;   // lines as approved (CF_81 3.14); none after the captain
      if(L)owSay(n.name,L,tst);else if(tst)tst()}};
  cv.onpointerdown=e=>{e.stopPropagation();e.preventDefault();if(over)return;
    const ts=(e.timeStamp>0&&Math.abs(e.timeStamp-performance.now())<2000)?e.timeStamp:performance.now();if(ts<horn)return;   // taps before the horn don't count
    q.push([(ts-horn)/1000,e.clientX<window.innerWidth/2?'L':'R'])};
  const boat=(x,y,a,col,trim)=>{c.save();c.translate(x,y);c.rotate(a);c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(2,3,13,6,0,0,7);c.fill();
    c.fillStyle=col;c.strokeStyle='#14181b';c.lineWidth=1.6;c.beginPath();c.moveTo(14,0);c.quadraticCurveTo(6,-7,-11,-5);c.lineTo(-12,5);c.quadraticCurveTo(6,7,14,0);c.closePath();c.fill();c.stroke();
    c.fillStyle=trim;c.fillRect(-4,-3,6,6);c.restore()};
  const tick=now=>{if(gone)return;
    if(!honked&&now>=horn){honked=true;try{r2Horn()}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}}
    if(!over&&now>=horn){q.sort((a,b)=>a[0]-b[0]);while(q.length){const [tt,sd]=q.shift();rcStep(st,tt-st.t);const r=rcStroke(st,Math.max(tt,st.t),sd);lastSide=sd;flash={t:.35,crab:r==='crab',sd};
        if(r==='good'){try{if(SND.smp)SND.smp('sfx_net',1.25+Math.random()*.2,.25)}catch(e){if(window.__cfDebug&&window.CFRuntime)window.CFRuntime.warn("core",e)}if(!lite){const p=at(st.s,-8);for(let i=0;i<5;i++)spray.push({x:p[0],y:p[1],vx:(Math.random()-.5)*40,vy:(Math.random()-.5)*40,t:.4})}}}
      rcStep(st,(now-horn)/1000-st.t);if(st.done!==null||st.t>=RACE.maxT)finish()}
    const rt=now>=horn?(over?Math.min(RACE.rip,(over-horn)/1000):(now-horn)/1000):0,rs=Math.min(1,rt/RACE.rip);
    c.setTransform(1,0,0,1,0,0);c.fillStyle='#0b1217';c.fillRect(0,0,W,H);c.setTransform(k,0,0,k,ox,oy);
    const gr=c.createLinearGradient(0,0,0,315);gr.addColorStop(0,'#21404a');gr.addColorStop(1,'#17323a');c.fillStyle=gr;c.fillRect(0,0,480,315);
    c.strokeStyle='#8E8B84';c.lineWidth=10;c.beginPath();c.ellipse(CX,CY,RX+42,RY+40,0,0,7);c.stroke();c.strokeStyle='rgba(200,225,230,.08)';c.lineWidth=1;for(let i=0;i<14;i++){c.beginPath();c.moveTo(40+i*30,40+(i*37)%230);c.lineTo(58+i*30,40+(i*37)%230);c.stroke()}
    c.setLineDash([3,6]);c.strokeStyle='rgba(232,226,208,.18)';c.lineWidth=1.5;c.beginPath();c.ellipse(CX,CY,RX,RY,0,0,7);c.stroke();c.setLineDash([]);
    c.fillStyle='#5b636a';c.fillRect(CX-62,CY-34,124,68);c.fillStyle='#1f3f48';c.fillRect(CX-54,CY-24,108,52);c.fillStyle='#3b2a1c';c.beginPath();c.ellipse(CX+4,CY+2,44,14,0,0,7);c.fill();c.fillStyle='#8a6a4a';c.beginPath();c.ellipse(CX+4,CY+2,36,10,0,0,7);c.fill();
    for(const [bx,by] of [[CX,CY-RY-22],[CX+RX+22,CY],[CX,CY+RY+22],[CX-RX-22,CY]]){c.fillStyle='#C2492F';c.beginPath();c.arc(bx,by,6,0,7);c.fill();c.fillStyle='#fff3d0';c.fillRect(bx-6,by-1.5,12,3)}
    for(let i=0;i<6;i++){c.fillStyle=i%2?'#14110f':'#efe6d0';c.fillRect(CX+RX-14+i*5,CY-2,5,4)}   // start / finish, off the yard's ramp
    const R=at(rs,10),P=at(Math.min(1,st.s),-10);boat(R[0],R[1],R[2],'#9FB7C4','#3A4A55');boat(P[0],P[1],P[2],'#efe6d0','#E8743A');
    for(const p of spray){p.t-=1/60;p.x+=p.vx/60;p.y+=p.vy/60;c.fillStyle='rgba(230,240,240,'+Math.max(0,p.t*2)+')';c.beginPath();c.arc(p.x,p.y,1.6,0,7);c.fill()}spray=spray.filter(p=>p.t>0);
    c.fillStyle='#6E7477';c.fillRect(CX-9,0,18,CY-34);c.strokeStyle='#8E8B84';c.lineWidth=2;c.strokeRect(CX-9,0,18,CY-34);c.fillStyle='rgba(0,0,0,.35)';c.beginPath();c.ellipse(CX,CY-RY,13,7,0,0,7);c.fill();   // the causeway arch: boats pass under it
    if(flash)flash.t-=1/60;
    for(const [sd,x] of [['L',48],['R',432]]){const hot=flash&&flash.t>0&&flash.sd===sd;c.strokeStyle=hot?(flash.crab?'#ff5a4a':'#E8A33D'):'rgba(232,226,208,.35)';c.lineWidth=hot?5:3;c.beginPath();c.arc(x,262,24,0,7);c.stroke();c.fillStyle='rgba(232,226,208,.75)';c.font='700 16px "Bowlby One",Impact,sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillText(sd,x,263)}
    c.textBaseline='alphabetic';c.fillStyle='#fff';c.font='700 22px "Barlow Condensed",sans-serif';c.textAlign='left';c.fillText((now>=horn?(st.done!==null?st.done:st.t):0).toFixed(1)+' s',14,26);
    c.textAlign='right';c.font='600 14px "Barlow Condensed",sans-serif';c.fillStyle='#9FC4D4';c.fillText('RIPTIDE '+RACE.rip.toFixed(1)+' s',466,22);
    c.textAlign='center';c.font='500 14px "Barlow Condensed",sans-serif';c.fillStyle='#9FC4D4';
    if(now<horn){c.fillText('Left side, right side, left... steady. Mashing crabs the oars.',240,306);c.fillStyle='#fff';c.font='700 56px "Bowlby One",Impact,sans-serif';c.fillText(String(Math.ceil((horn-now)/1000)),240,176)}
    else if(!over){if(flash&&flash.t>0&&flash.crab){c.fillStyle='#ff5a4a';c.font='700 22px "Bowlby One",Impact,sans-serif';c.fillText('CRAB!',240,300)}else c.fillText(st.strokes?'Keep the rhythm.':'GO! Tap left, then right.',240,306)}
    if(over&&res){c.fillStyle='rgba(0,0,0,.66)';c.fillRect(70,92,340,140);c.fillStyle=res.win?'#35d07f':'#ffd23a';c.font='700 34px "Bowlby One",Impact,sans-serif';c.fillText(res.win?'YOU WIN':'RIPTIDE WINS',240,132);
      c.fillStyle='#fff';c.font='600 16px "Barlow Condensed",sans-serif';c.fillText('YOU '+(res.mine!==null?res.mine.toFixed(2)+' s':'did not finish')+'   ·   RIPTIDE '+RACE.rip.toFixed(2)+' s',240,158);
      c.fillStyle='#cdbfa5';c.fillText('BEST '+(res.best?res.best.toFixed(2)+' s':'-'),240,180);
      if(res.first){c.fillStyle='#E8A33D';c.fillText('+'+RACE.reward+' · first race win over Riptide (pays once)',240,202)}
      c.fillStyle='#9FC4D4';c.font='500 14px "Barlow Condensed",sans-serif';c.fillText('Tap to continue',240,224)}
    requestAnimationFrame(tick)};
  requestAnimationFrame(tick)}

function hbFence(g,X,Y,B,dir,R){g.save();g.strokeStyle='rgba(20,26,30,.95)';g.lineWidth=3;g.fillStyle='#232b30';
  if(dir==='h'){g.fillRect(X,Y,B,B*.55);g.strokeStyle='rgba(120,135,140,.35)';g.lineWidth=1.5;for(let i=-4;i<10;i++){g.beginPath();g.moveTo(X+i*B/8,Y);g.lineTo(X+i*B/8+B*.5,Y+B*.55);g.stroke()}g.fillStyle='#3a444a';g.fillRect(X,Y+B*.5,B,6)}
  else{g.fillRect(X+B*.3,Y,B*.7,B);g.strokeStyle='rgba(120,135,140,.35)';g.lineWidth=1.5;for(let i=-4;i<10;i++){g.beginPath();g.moveTo(X+B*.3,Y+i*B/8);g.lineTo(X+B,Y+i*B/8+B*.45);g.stroke()}}
  g.restore()}
function hbBakeB(g,b,R){
  const B=BP,X=b.x*B,Y=b.y*B,W=b.w*B,H=b.h*B,fh=2*B,rh=H-fh,fy=Y+rh,A=b.col,C=b.col2;
  if(b.kind==='arena'){hbBakeDock(g,b,R);return}   // v3.20T: Dry Dock 14 seen from above
  g.fillStyle='rgba(0,0,0,.42)';g.fillRect(X-4,Y+8,W+10,H+10);
  const sodium='#E8A33D',look=b.look||'brick';
  // roof (the top rows): colour from the building, cooled toward slate
  const roof=hbMix(A,'#26333C',.28);
  if(b.kind==='arena'){   // the Basin: a drained dry dock under a heavy concrete rim
    g.fillStyle='#4b535a';g.fillRect(X,Y,W,rh);g.fillStyle='#3a4249';g.fillRect(X+10,Y+10,W-20,rh-16);
    g.fillStyle='#6a747a';g.fillRect(X+B*.6,Y+B*.6,W-B*1.2,rh-B*1.1);g.strokeStyle='#A9542F';g.lineWidth=5;g.strokeRect(X+B*.6,Y+B*.6,W-B*1.2,rh-B*1.1);
    g.strokeStyle='rgba(232,226,208,.6)';g.lineWidth=2;for(let i=1;i<10;i++){g.beginPath();g.moveTo(X+B*.6+(W-B*1.2)*i/10,Y+B*.6);g.lineTo(X+B*.6+(W-B*1.2)*i/10,Y+rh-B*.5);g.stroke()}
        for(const [lx,ly] of [[X+B*.35,Y+B*.35],[X+W-B*.35,Y+B*.35],[X+B*.35,Y+rh-B*.35],[X+W-B*.35,Y+rh-B*.35]]){g.fillStyle='#d9d0b8';g.beginPath();g.arc(lx,ly,6,0,7);g.fill();LG.push({x:lx,y:ly,r:B*2,col:sodium,a:.28,f:R()*9})}
  }else if(look==='tower'){   // the lighthouse: round lantern room seen from above, striped tower below
    g.fillStyle='#3d4a50';g.fillRect(X,Y,W,rh);g.fillStyle='#e3d7b3';g.beginPath();g.arc(X+W/2,Y+rh/2+B*.1,Math.min(W,rh)*.46,0,7);g.fill();g.strokeStyle='#2a3338';g.lineWidth=5;g.stroke();
    g.fillStyle='#A9542F';g.beginPath();g.arc(X+W/2,Y+rh/2+B*.1,Math.min(W,rh)*.28,0,7);g.fill();g.fillStyle='#ffe9b0';g.beginPath();g.arc(X+W/2,Y+rh/2+B*.1,Math.min(W,rh)*.14,0,7);g.fill();
  }else{
    g.fillStyle=roof;g.fillRect(X,Y,W,rh);
    if(look==='tin'){g.strokeStyle='rgba(0,0,0,.25)';g.lineWidth=2;for(let x=X+10;x<X+W;x+=18){g.beginPath();g.moveTo(x,Y);g.lineTo(x,Y+rh);g.stroke()}g.fillStyle='rgba(255,255,255,.05)';g.fillRect(X,Y,W,6)}
    else if(look==='brick'){g.strokeStyle='rgba(0,0,0,.28)';g.lineWidth=2;for(let y=Y+10;y<Y+rh;y+=B*.28){g.beginPath();g.moveTo(X,y);g.lineTo(X+W,y);g.stroke()}}
    else{g.strokeStyle='rgba(0,0,0,.25)';g.lineWidth=2;for(let y=Y+12;y<Y+rh;y+=B*.22){g.beginPath();g.moveTo(X,y);g.lineTo(X+W,y);g.stroke()}}
    g.strokeStyle='rgba(0,0,0,.55)';g.lineWidth=4;g.beginPath();g.moveTo(X+W/2,Y+2);g.lineTo(X+W/2,Y+rh);g.stroke();   // ridge
    g.fillStyle='rgba(255,255,255,.06)';g.fillRect(X,Y,W/2,rh);
    // chimney / vent / skylight, one or two per roof
    const nv=Math.max(1,Math.floor(b.w/3));for(let i=0;i<nv;i++){const vx=X+B*(.7+R()*(b.w-1.8)),vy=Y+B*.35+R()*Math.max(4,rh-B*1.1);
      if(R()<.5){g.fillStyle='#23292d';g.fillRect(vx,vy,B*.45,B*.5);g.fillStyle='#14181b';g.fillRect(vx+4,vy+4,B*.45-8,B*.5-8)}else{g.fillStyle='rgba(159,196,212,.35)';g.fillRect(vx,vy,B*.7,B*.5);g.strokeStyle='#23292d';g.lineWidth=3;g.strokeRect(vx,vy,B*.7,B*.5)}}
    g.fillStyle='rgba(0,0,0,.30)';g.fillRect(X,Y,W,5);g.fillStyle='rgba(0,0,0,.35)';g.fillRect(X,fy-6,W,6);
    if(b.id==='B15'||b.id==='B13'){g.fillStyle='#1b2227';g.fillRect(X+W-B*1.1,Y+B*.1,B*.8,B*.8);g.fillStyle='#e8d8b0';g.beginPath();g.arc(X+W-B*.7,Y+B*.5,B*.3,0,7);g.fill();g.strokeStyle='#1b2227';g.lineWidth=3;g.beginPath();g.moveTo(X+W-B*.7,Y+B*.5);g.lineTo(X+W-B*.7,Y+B*.3);g.moveTo(X+W-B*.7,Y+B*.5);g.lineTo(X+W-B*.55,Y+B*.55);g.stroke()}   // tower clock
    if(b.id==='B06'){g.fillStyle='#1d2124';g.fillRect(X+W-B*1.2,Y+B*.3,B*.7,B*.7);g.fillStyle='rgba(190,205,210,.14)';g.beginPath();g.arc(X+W-B*.85,Y+B*.1,B*.4,0,7);g.fill()}   // cannery stack
  }
  // facade: the two rows under the roof, where the door and the sign are
  const wallC=hbMix(A,'#3A4A55',.15);
  g.fillStyle=wallC;g.fillRect(X,fy,W,fh);
  if(look==='brick'||b.kind==='arena'){g.strokeStyle='rgba(0,0,0,.30)';g.lineWidth=2;for(let y=fy+B*.2;y<fy+fh;y+=B*.2){g.beginPath();g.moveTo(X,y);g.lineTo(X+W,y);g.stroke()}for(let r=0;r<10;r++){const y=fy+r*B*.2;for(let x=X+((r%2)?B*.12:0);x<X+W;x+=B*.28){g.beginPath();g.moveTo(x,y);g.lineTo(x,y+B*.2);g.stroke()}}}
  else if(look==='tin'){g.strokeStyle='rgba(0,0,0,.28)';g.lineWidth=2;for(let x=X+B*.14;x<X+W;x+=B*.22){g.beginPath();g.moveTo(x,fy);g.lineTo(x,fy+fh);g.stroke()}g.fillStyle='rgba(255,255,255,.05)';g.fillRect(X,fy,W,B*.3)}
  else if(look==='tower'){for(let r=0;r<4;r++){g.fillStyle=r%2?'#e3d7b3':'#A9542F';g.fillRect(X,fy+r*B*.5,W,B*.5)}g.strokeStyle='rgba(0,0,0,.3)';g.lineWidth=2;g.strokeRect(X,fy,W,fh)}
  else{g.strokeStyle='rgba(0,0,0,.30)';g.lineWidth=2;for(let y=fy+B*.18;y<fy+fh;y+=B*.2){g.beginPath();g.moveTo(X,y);g.lineTo(X+W,y);g.stroke()}g.fillStyle='rgba(255,255,255,.04)';g.fillRect(X,fy,W,B*.4)}
  g.fillStyle=C;g.fillRect(X,fy,W,B*.12);g.fillStyle='rgba(0,0,0,.4)';g.fillRect(X,fy+fh-B*.1,W,B*.1);   // cornice and footing
  // windows (lit sodium) on the facade, skipping the door tiles and the sign
  const dxs=(b.face&&b.face!=='d')?[]:b.doors.map(d=>d[0]);
  if(look!=='tower')for(let tx=b.x;tx<b.x+b.w;tx++){if(dxs.includes(tx)||dxs.includes(tx-1)&&false)continue;if((tx-b.x)%2===0&&b.kind!=='arena'||b.kind==='arena'&&(tx-b.x)%3===1){const wx=tx*B+B*.2,wy=fy+B*.78,ww=B*.6,wh=B*.5;g.fillStyle='#10161a';g.fillRect(wx-3,wy-3,ww+6,wh+6);g.fillStyle=R()<.8?'rgba(232,163,61,.8)':'rgba(40,52,58,.9)';g.fillRect(wx,wy,ww,wh);g.strokeStyle=C;g.lineWidth=2;g.strokeRect(wx,wy,ww,wh);g.beginPath();g.moveTo(wx+ww/2,wy);g.lineTo(wx+ww/2,wy+wh);g.stroke()}}
  // doors
  if(b.face&&b.face!=='d')hbSideDoors(g,b,R);else for(const [dx,dy] of b.doors){const px=dx*B,py=dy*B;g.fillStyle='#0d1114';g.fillRect(px+B*.1,py+B*.1,B*.8,B*.9);g.strokeStyle=C;g.lineWidth=4;g.strokeRect(px+B*.1,py+B*.1,B*.8,B*.9);g.fillStyle='rgba(232,163,61,.35)';g.fillRect(px+B*.18,py+B*.18,B*.64,B*.2);g.fillStyle='#d9d0b8';g.beginPath();g.arc(px+B*.76,py+B*.6,3,0,7);g.fill();
    g.fillStyle='rgba(0,0,0,.4)';g.fillRect(px+B*.05,py+B*.96,B*.9,B*.06)}
  // sign board above the door
  const fc=b.face||'d',dc=(fc==='l'||fc==='r')?b.x+b.w/2:b.doors.reduce((q,d)=>q+d[0],0)/b.doors.length+.5,sw=Math.min(W-B*.3,Math.max(B*1.5,b.sign.length*B*.27)),sx=Math.max(X+B*.15,Math.min(X+W-sw-B*.15,dc*B-sw/2)),sy=(fc==='u'&&look!=='tower')?(b.doors[0][1]+.66)*B:fy+B*.2;
  g.fillStyle='#1f1a16';g.fillRect(sx,sy,sw,B*.5);g.strokeStyle=C;g.lineWidth=3;g.strokeRect(sx+2,sy+2,sw-4,B*.5-4);
  g.fillStyle='#efe6d0';g.textAlign='center';g.textBaseline='middle';const fs=Math.min(B*.30,(sw-B*.3)/(b.sign.length*.62));g.font='700 '+Math.round(fs)+'px "Bowlby One",Impact,sans-serif';g.fillText(b.sign,sx+sw/2,sy+B*.26);
  if(b.sub&&b.kind!=='arena'){g.font='700 '+Math.round(B*.16)+'px "Barlow Condensed",sans-serif';g.fillStyle='rgba(239,230,208,.9)';g.fillText(b.sub,sx+sw/2,sy+B*.62)}
  if(b.kind==='arena'){g.font='700 '+Math.round(B*.17)+'px "Barlow Condensed",sans-serif';g.fillStyle='rgba(239,230,208,.9)';g.fillText(b.sub,sx+sw/2,sy+B*.62);
    // #14 FOREVER banner hung on the dock wall
    for(const bx of [X+B*.9,X+W-B*.9-B*.8]){const by=Y+rh-B*.1;g.fillStyle='#E6DCC8';g.fillRect(bx,by,B*.8,B*1.15);g.fillStyle='#A9542F';g.font='700 '+Math.round(B*.5)+'px "Bowlby One",Impact,sans-serif';g.fillText('14',bx+B*.4,by+B*.5);g.font='700 '+Math.round(B*.12)+'px "Barlow Condensed",sans-serif';g.fillText('FOREVER',bx+B*.4,by+B*.95);g.fillStyle='#8a4b2f';g.fillRect(bx,by+B*1.12,B*.8,B*.05)}}
  // lit window glow on the cobbles in front of the door
  if(fc==='d')LG.push({x:dc*B,y:(b.y+b.h+.4)*B,r:B*1.6,col:sodium,a:.20,f:R()*9});
}
function hbBakeProp(g,p,R){
  const B=BP,X=p.x*B,Y=p.y*B,cx=X+B/2,cy=Y+B/2;g.save();
  const sh=(w)=>{g.fillStyle='rgba(0,0,0,.38)';g.beginPath();g.ellipse(cx,cy+B*.38,w||B*.4,B*.1,0,0,7);g.fill()};
  switch(p.t){
   case'truck':{sh(B*.46);g.fillStyle='#2a3a40';g.fillRect(X+4,Y+B*.12,B-8,B*.78);g.fillStyle='#A9542F';g.fillRect(X+4,Y+B*.12,B-8,B*.3);g.fillStyle='#10161a';g.fillRect(X+10,Y+B*.5,B-20,B*.28);g.fillStyle='rgba(159,196,212,.5)';g.fillRect(X+14,Y+B*.54,B-28,B*.18);g.fillStyle='#0b0e10';g.fillRect(X+2,Y+B*.78,10,10);g.fillRect(X+B-12,Y+B*.78,10,10);break}
   case'forklift':{sh();g.fillStyle='#d9a437';g.fillRect(X+B*.2,Y+B*.3,B*.5,B*.5);g.fillStyle='#161a1d';g.fillRect(X+B*.28,Y+B*.1,B*.34,B*.28);g.fillStyle='#8a8f91';g.fillRect(X+B*.74,Y+B*.1,6,B*.7);g.fillRect(X+B*.84,Y+B*.1,6,B*.7);g.fillStyle='#0b0e10';g.fillRect(X+B*.16,Y+B*.74,10,10);g.fillRect(X+B*.56,Y+B*.74,10,10);break}
   case'crates':{sh();for(const [ox,oy,w,h,c] of [[.08,.4,.5,.46,'#6b4f33'],[.5,.52,.42,.38,'#7a5a3e'],[.22,.12,.46,.38,'#5d4630']]){g.fillStyle=c;g.fillRect(X+ox*B,Y+oy*B,w*B,h*B);g.strokeStyle='#241a12';g.lineWidth=3;g.strokeRect(X+ox*B,Y+oy*B,w*B,h*B);g.beginPath();g.moveTo(X+ox*B,Y+oy*B);g.lineTo(X+(ox+w)*B,Y+(oy+h)*B);g.stroke()}break}
   case'netroll':{sh();g.fillStyle='#4E7C7A';g.beginPath();g.ellipse(cx,cy+B*.08,B*.42,B*.34,0,0,7);g.fill();g.strokeStyle='#243a39';g.lineWidth=2;for(let i=0;i<8;i++){g.beginPath();g.ellipse(cx,cy+B*.08,B*.42-i*B*.05,B*.34-i*B*.04,0,0,7);g.stroke()}g.fillStyle='#A9542F';g.beginPath();g.arc(cx+B*.12,cy-B*.05,B*.07,0,7);g.fill();break}
   case'bollard':{sh(B*.26);g.fillStyle='#1d2226';g.fillRect(cx-B*.16,cy-B*.1,B*.32,B*.4);g.fillStyle='#3a4249';g.beginPath();g.ellipse(cx,cy-B*.1,B*.2,B*.1,0,0,7);g.fill();g.fillStyle='rgba(255,255,255,.12)';g.fillRect(cx-B*.1,cy-B*.1,B*.06,B*.34);break}
   case'lamp':{g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(cx,cy+B*.4,B*.18,B*.07,0,0,7);g.fill();g.fillStyle='#1b2125';g.fillRect(cx-B*.05,Y-B*.4,B*.1,B*.95);g.fillRect(cx-B*.2,Y-B*.46,B*.4,B*.09);g.fillStyle='#ffd9a0';g.fillRect(cx-B*.15,Y-B*.4,B*.3,B*.07);break}
   case'rope':{g.strokeStyle='#bfa76a';g.lineWidth=5;for(let i=0;i<4;i++){g.beginPath();g.ellipse(cx,cy+B*.15,B*.3-i*B*.06,B*.14-i*B*.025,0,0,7);g.stroke()}break}
   case'buoy':case'cradletalk':case'namescrap':case'skifftrolley':break;
   default:hbBakeProp2(g,p,R);
  }
  g.restore();
}

/* ---------------------------------------------------------------- the silhouette at the shrine: a two-frame scripted beat, drawn full-screen over the world */
function hbSilhouette(SW,SH,t){   // t = seconds since start (0..2.4)
  const a=t<.3?t/.3:t>2.0?Math.max(0,(2.4-t)/.4):1;if(a<=0)return;
  og.save();og.globalAlpha=a;og.fillStyle='rgba(6,10,14,.92)';og.fillRect(0,0,SW,SH);
  const gr=og.createRadialGradient(SW*.5,SH*.32,4,SW*.5,SH*.32,SH*.7);gr.addColorStop(0,'rgba(232,163,61,.55)');gr.addColorStop(.5,'rgba(232,163,61,.14)');gr.addColorStop(1,'rgba(232,163,61,0)');og.fillStyle=gr;og.fillRect(0,0,SW,SH);
  const cx=SW/2,gy=SH*.78,u=SH/9,f1=t>1.1;   // frame 0: back to us, hands in jacket.  frame 1: head bowed toward the shrine
  og.fillStyle='#1A2228';og.beginPath();og.ellipse(cx,gy,u*1.2,u*.18,0,0,7);og.fill();
  og.fillStyle='#10161a';og.fillRect(cx-u*.32,gy-u*.9,u*.2,u*.9);og.fillRect(cx+u*.12,gy-u*.9,u*.2,u*.9);
  og.fillStyle='#1A2228';og.beginPath();og.moveTo(cx-u*.5,gy-u*.85);og.lineTo(cx-u*.55,gy-u*2.2);og.quadraticCurveTo(cx,gy-u*2.45,cx+u*.55,gy-u*2.2);og.lineTo(cx+u*.5,gy-u*.85);og.closePath();og.fill();
  og.beginPath();og.arc(cx+(f1?u*.08:0),gy-u*(f1?2.5:2.62),u*.26,0,7);og.fill();
  og.strokeStyle='rgba(232,220,200,.55)';og.lineWidth=Math.max(2,u*.06);og.beginPath();og.moveTo(cx-u*.12,gy-u*1.9);og.lineTo(cx-u*.12,gy-u*1.5);og.moveTo(cx+u*.12,gy-u*1.9);og.lineTo(cx+u*.12,gy-u*1.5);og.stroke();   // tape marks over the number
  og.fillStyle='rgba(232,220,200,.5)';og.font='700 '+Math.round(u*.5)+'px "Bowlby One",Impact,sans-serif';og.textAlign='center';og.textBaseline='middle';og.fillText('14',cx,gy-u*1.7);if(CH3ON){og.fillStyle='#1A2228';og.fillRect(cx+u*.42,gy-u*1.3,u*.42,u*.34);og.strokeStyle='rgba(216,199,160,.35)';og.lineWidth=Math.max(2,u*.08);og.beginPath();og.moveTo(cx-u*.45,gy-u*2.15);og.lineTo(cx+u*.5,gy-u*1.25);og.stroke();og.save();og.translate(cx,gy-u*1.7);og.rotate(-.4);og.fillStyle='rgba(232,225,207,.55)';og.fillRect(-u*.42,-u*.07,u*.84,u*.14);og.restore()}
  og.restore()}

/* ---------------------------------------------------------------- interiors: bright-ish, cold, dry, painted rather than neon */
function hbFloor(g,m,d,R){
  const f=d.fl,W=m.w,H=m.h,x0=BP,y0=2*BP,x1=(W-1)*BP,y1=(H-1)*BP,aw=x1-x0,ah=y1-y0;g.save();g.beginPath();g.rect(x0,y0,aw,ah);g.clip();
  g.fillStyle=d.floor;g.fillRect(x0,y0,aw,ah);
  if(f==='plank'){const ph=BP*.4;for(let y=y0,i=0;y<y1;y+=ph,i++){g.fillStyle=i%2?'rgba(0,0,0,.10)':'rgba(255,230,190,.04)';g.fillRect(x0,y,aw,ph);g.strokeStyle='rgba(0,0,0,.4)';g.lineWidth=2;g.beginPath();g.moveTo(x0,y);g.lineTo(x1,y);g.stroke();for(let x=x0+((i*53)%BP);x<x1;x+=BP*1.6){g.beginPath();g.moveTo(x,y);g.lineTo(x,y+ph);g.stroke()}}}
  else if(f==='concrete'){for(let x=x0;x<x1;x+=BP*2)for(let y=y0;y<y1;y+=BP*2){g.fillStyle=R()<.5?'rgba(255,255,255,.04)':'rgba(0,0,0,.07)';g.fillRect(x,y,BP*2,BP*2);g.strokeStyle='rgba(0,0,0,.35)';g.lineWidth=2;g.strokeRect(x,y,BP*2,BP*2)}for(let i=0;i<8;i++){g.fillStyle='rgba(20,24,28,.28)';g.beginPath();g.ellipse(x0+R()*aw,y0+R()*ah,BP*(.2+R()*.5),BP*(.1+R()*.3),0,0,7);g.fill()}}
  else if(f==='tile'){for(let x=x0,i=0;x<x1;x+=BP*.5,i++)for(let y=y0,j=0;y<y1;y+=BP*.5,j++){g.fillStyle=(i+j)%2?'rgba(255,255,255,.10)':'rgba(0,0,0,.10)';g.fillRect(x,y,BP*.5,BP*.5)}g.strokeStyle='rgba(0,0,0,.18)';g.lineWidth=1;for(let x=x0;x<x1;x+=BP*.5){g.beginPath();g.moveTo(x,y0);g.lineTo(x,y1);g.stroke()}for(let y=y0;y<y1;y+=BP*.5){g.beginPath();g.moveTo(x0,y);g.lineTo(x1,y);g.stroke()}}
  else if(f==='check'){for(let x=x0,i=0;x<x1;x+=BP,i++)for(let y=y0,j=0;y<y1;y+=BP,j++){g.fillStyle=(i+j)%2?'rgba(255,255,255,.10)':'rgba(0,0,0,.16)';g.fillRect(x,y,BP,BP)}}
  else if(f==='herring'){const bw=BP*.5,bh=BP*.25;for(let y=y0,j=0;y<y1;y+=bh,j++)for(let x=x0-(j%2)*bw/2;x<x1;x+=bw){g.fillStyle=((x/bw|0)+j)%3?'rgba(0,0,0,.10)':'rgba(255,235,200,.07)';g.fillRect(x,y,bw,bh);g.strokeStyle='rgba(0,0,0,.34)';g.lineWidth=1.5;g.strokeRect(x,y,bw,bh)}}
  else if(f==='steel'){g.strokeStyle='rgba(255,255,255,.13)';g.lineWidth=2;for(let x=x0,i=0;x<x1;x+=BP*.5,i++)for(let y=y0,j=0;y<y1;y+=BP*.5,j++){g.beginPath();if((i+j)%2){g.moveTo(x+4,y+4);g.lineTo(x+BP*.5-4,y+BP*.5-4)}else{g.moveTo(x+BP*.5-4,y+4);g.lineTo(x+4,y+BP*.5-4)}g.stroke()}}
  else{for(let x=x0,i=0;x<x1;x+=BP*.75,i++)for(let y=y0,j=0;y<y1;y+=BP*.75,j++){g.fillStyle=(i+j)%2?'rgba(60,40,20,.18)':'rgba(255,240,210,.06)';g.fillRect(x,y,BP*.75,BP*.75)}}
  g.restore()}
function hbWallStyle(g,d,W,B){const s=d.wl;if(!s)return;g.save();g.beginPath();g.rect(0,0,W,2*B);g.clip();
  if(s==='brick'){g.strokeStyle='rgba(0,0,0,.34)';g.lineWidth=2;for(let y=0,j=0;y<2*B;y+=B*.25,j++){g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke();for(let x=(j%2)*B*.25;x<W;x+=B*.5){g.beginPath();g.moveTo(x,y);g.lineTo(x,y+B*.25);g.stroke()}}}
  else if(s==='tile'){g.fillStyle='rgba(235,245,245,.2)';g.fillRect(0,B*.7,W,B*1.3);g.strokeStyle='rgba(0,0,0,.28)';g.lineWidth=2;for(let y=B*.7;y<2*B;y+=B*.325){g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke()}for(let x=0;x<W;x+=B*.5){g.beginPath();g.moveTo(x,B*.7);g.lineTo(x,2*B);g.stroke()}}
  else if(s==='panel'){for(let x=0;x<W;x+=B*1.5){g.fillStyle='rgba(255,255,255,.08)';g.fillRect(x+3,B*.15,B*1.5-6,B*1.7);g.strokeStyle='rgba(0,0,0,.4)';g.lineWidth=3;g.strokeRect(x+3,B*.15,B*1.5-6,B*1.7);g.fillStyle='rgba(0,0,0,.4)';for(const ry of[B*.28,B*1.72])for(const rx of[x+B*.14,x+B*1.36]){g.beginPath();g.arc(rx,ry,3,0,7);g.fill()}}}
  else if(s==='board'){g.strokeStyle='rgba(0,0,0,.38)';g.lineWidth=3;for(let x=0;x<W;x+=B*.36){g.beginPath();g.moveTo(x,0);g.lineTo(x,2*B);g.stroke()}g.fillStyle='rgba(255,230,190,.05)';for(let x=B*.36,i=0;x<W;x+=B*.72,i++)g.fillRect(x,0,B*.36,2*B)}
  else if(s==='wain'){g.fillStyle='rgba(0,0,0,.22)';g.fillRect(0,B*.9,W,B*1.1);g.strokeStyle='rgba(255,235,200,.16)';g.lineWidth=2;g.strokeRect(-4,B*.9,W+8,B*1.1);for(let x=B*.2;x<W;x+=B*.9){g.strokeStyle='rgba(0,0,0,.3)';g.strokeRect(x,B*1.05,B*.7,B*.8)}}
  g.restore()}
function owBakeHarborRoom(c,m){
  const g=c.getContext('2d'),d=m.def,R=owRnd(d.title.length*97+13),W=m.w*BP,H=m.h*BP,B=BP;
  g.fillStyle='#0b1014';g.fillRect(0,0,W,H);hbFloor(g,m,d,R);
  for(let i=0;i<8;i++){g.fillStyle='rgba(200,220,230,.05)';g.beginPath();g.ellipse((1.5+R()*(m.w-3))*B,(2.5+R()*(m.h-4))*B,B*(.3+R()),B*.16,0,0,7);g.fill()}
  // walls: back wall painted in the room colour with a darker lower band and a rail
  const wg=g.createLinearGradient(0,0,0,2*B);wg.addColorStop(0,hbMix(d.wall,'#000000',.45));wg.addColorStop(1,d.wall);g.fillStyle=wg;g.fillRect(0,0,W,2*B);
  g.strokeStyle='rgba(0,0,0,.28)';g.lineWidth=2;for(let x=0;x<W;x+=B*.5){g.beginPath();g.moveTo(x,0);g.lineTo(x,2*B);g.stroke()}
  hbWallStyle(g,d,W,B);
  g.fillStyle='rgba(0,0,0,.2)';g.fillRect(0,B*1.25,W,B*.75);g.fillStyle=d.acc2;g.fillRect(0,B*1.22,W,5);g.fillStyle='rgba(0,0,0,.4)';g.fillRect(0,2*B-6,W,6);
  g.fillStyle=d.wall;g.fillRect(0,0,B,H);g.fillRect(W-B,0,B,H);g.fillRect(0,H-B,W,B);g.fillStyle='rgba(0,0,0,.32)';g.fillRect(B-8,2*B,8,H-3*B);g.fillRect(W-B,2*B,8,H-3*B);g.fillStyle='#070a0c';g.fillRect(0,H-B,W,6);
  // painted title board on the back wall
  {const t=d.title,bw=Math.min(W-B*3,t.length*B*.3+B*.8),bx=W/2-bw/2,by=B*.2;g.fillStyle='#211a14';g.fillRect(bx,by,bw,B*.62);g.strokeStyle=d.acc;g.lineWidth=3;g.strokeRect(bx+3,by+3,bw-6,B*.62-6);g.fillStyle='#efe6d0';g.textAlign='center';g.textBaseline='middle';const fs=Math.min(B*.34,(bw-B*.5)/(t.length*.6));g.font='700 '+Math.round(fs)+'px "Bowlby One",Impact,sans-serif';g.fillText(t,W/2,by+B*.33)}
  // exit mat
  for(const x of m.ex){const X=x*B,Y=(m.h-1)*B;g.fillStyle='#4a3b2a';g.fillRect(X,Y,B,B);g.strokeStyle='rgba(0,0,0,.4)';g.lineWidth=2;for(let i=0;i<5;i++){g.beginPath();g.moveTo(X,Y+i*B/5);g.lineTo(X+B,Y+i*B/5);g.stroke()}g.fillStyle='rgba(232,163,61,.14)';g.fillRect(X,Y,B,B*.6)}
  // architectural floor zones (rugs, runners, bays, welcome mats) & wall deco
  if(d.arch){hbArchZones(g,d,B);hbArchWallDeco(g,d,B)}
  // floor clutter (decals), then props, then interior partitions, then light
  for(const [cx2,cy2,k] of (d.clutter||[]))hbClutter(g,cx2,cy2,k,d);
  for(const p of m.props)if(!p.drop)hbRoomProp(g,p,d,R);
  if(d.arch&&d.arch.partitions)hbArchPartitions(g,d,B);
  g.save();g.globalCompositeOperation='lighter';
  for(const [px,py,r,col,al] of (d.pools||[])){const rr=r*B*1.25,X=(px+.5)*B,Y=(py+.5)*B,gr=g.createRadialGradient(X,Y,0,X,Y,rr),rgb=hbRGB(col).join(',');gr.addColorStop(0,'rgba('+rgb+','+al+')');gr.addColorStop(.6,'rgba('+rgb+','+al*.4+')');gr.addColorStop(1,'rgba('+rgb+',0)');g.fillStyle=gr;g.fillRect(X-rr,Y-rr,rr*2,rr*2)}
  g.restore();
  const vg=g.createRadialGradient(W/2,H/2,Math.min(W,H)*.3,W/2,H/2,Math.max(W,H)*.72);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.36)');g.fillStyle=vg;g.fillRect(0,0,W,H);
}
function hbArchZones(g,d,B){
  for(const z of (d.arch.zones||[])){
    const X=z.x*B,Y=z.y*B,W=(z.w||1)*B,H=(z.h||1)*B;g.save();
    if(z.kind==='rug'){
      g.fillStyle='rgba(0,0,0,.22)';g.fillRect(X+6,Y+8,W-8,H-8);
      g.fillStyle=z.col||'#5a3528';g.fillRect(X+4,Y+4,W-8,H-8);
      g.strokeStyle=z.border||d.acc;g.lineWidth=3;g.strokeRect(X+9,Y+9,W-18,H-18);
      if(z.trim){g.strokeStyle=z.trim;g.lineWidth=1.5;g.strokeRect(X+15,Y+15,W-30,H-30)}
      g.fillStyle='rgba(255,245,220,.14)';for(let yy=Y+18;yy<Y+H-18;yy+=14)for(let xx=X+18;xx<X+W-18;xx+=14)g.fillRect(xx,yy,3,3);
    }else if(z.kind==='runner'){
      g.fillStyle=z.col||'rgba(232,163,61,.18)';g.fillRect(X+6,Y+4,W-12,H-8);
      g.strokeStyle=z.border||d.acc;g.lineWidth=2;g.strokeRect(X+10,Y+8,W-20,H-16);
    }else if(z.kind==='mat'){
      g.fillStyle=z.col||'#5a3b28';g.fillRect(X+8,Y+B*.35,W-16,H-B*.42);
      g.strokeStyle=z.border||d.acc;g.lineWidth=2.5;g.strokeRect(X+11,Y+B*.38,W-22,H-B*.48);
    }else if(z.kind==='tile'){
      g.fillStyle=z.col||'rgba(40,60,70,.35)';g.fillRect(X+2,Y+2,W-4,H-4);
      g.strokeStyle='rgba(0,0,0,.18)';g.lineWidth=1;
      for(let xx=X+B*.5;xx<X+W;xx+=B*.5){g.beginPath();g.moveTo(xx,Y+2);g.lineTo(xx,Y+H-2);g.stroke()}
      for(let yy=Y+B*.5;yy<Y+H;yy+=B*.5){g.beginPath();g.moveTo(X+2,yy);g.lineTo(X+W-2,yy);g.stroke()}
      if(z.border){g.strokeStyle=z.border;g.lineWidth=2;g.strokeRect(X+3,Y+3,W-6,H-6)}
    }else if(z.kind==='bay'||z.kind==='stage'){
      g.fillStyle=z.col||'rgba(40,48,54,.3)';g.fillRect(X+4,Y+4,W-8,H-8);
      g.strokeStyle=z.border||d.acc;g.lineWidth=2.5;g.setLineDash([10,6]);g.strokeRect(X+7,Y+7,W-14,H-14);g.setLineDash([]);
      if(z.trim){g.fillStyle=z.trim;g.fillRect(X+8,Y+H-10,W-16,4)}
    }
    g.restore();
  }
}
function hbArchWallDeco(g,d,B){
  for(const w of (d.arch.wallDeco||[])){
    const X=w.x*B,Y=w.y*B,W=(w.w||1)*B,by=Y+B*.18,bh=B*.8;g.save();
    if(w.kind==='window'){
      g.fillStyle='#0e1519';g.fillRect(X+B*.1,by-B*.05,W-B*.2,bh);
      g.fillStyle='rgba(159,196,212,.58)';g.fillRect(X+B*.16,by,W-B*.32,bh-B*.1);
      g.strokeStyle='#211a14';g.lineWidth=4;g.strokeRect(X+B*.1,by-B*.05,W-B*.2,bh);
      g.beginPath();g.moveTo(X+W/2,by);g.lineTo(X+W/2,by+bh-B*.1);g.moveTo(X+B*.16,by+(bh-B*.1)/2);g.lineTo(X+W-B*.16,by+(bh-B*.1)/2);g.stroke();
    }else if(w.kind==='door'){
      g.fillStyle='#211a14';g.fillRect(X+B*.15,by-B*.06,B*.7,bh+B*.14);
      g.fillStyle=w.col||'#5a4030';g.fillRect(X+B*.21,by,B*.58,bh+B*.04);
      g.fillStyle='#E8C53A';g.beginPath();g.arc(X+B*.68,by+bh*.55,3.5,0,7);g.fill();
    }else if(w.kind==='frame'){
      g.fillStyle='#211a14';g.fillRect(X+B*.18,by+B*.04,B*.64,bh*.72);
      g.fillStyle=w.col||d.acc2;g.fillRect(X+B*.24,by+B*.1,B*.52,bh*.58);
      g.fillStyle='#E8E2D0';g.fillRect(X+B*.3,by+B*.22,B*.4,bh*.24);
    }else if(w.kind==='clock'){
      const cx=X+W/2;g.fillStyle='#211a14';g.beginPath();g.arc(cx,by+bh*.45,B*.28,0,7);g.fill();
      g.fillStyle='#e8e2d0';g.beginPath();g.arc(cx,by+bh*.45,B*.22,0,7);g.fill();
      g.strokeStyle='#211a14';g.lineWidth=2.5;g.beginPath();g.moveTo(cx,by+bh*.45);g.lineTo(cx+B*.1,by+bh*.32);g.stroke();
    }
    g.restore();
  }
}
function hbArchPartitions(g,d,B){
  for(const pt of (d.arch.partitions||[])){
    const X=pt.x*B,Y=pt.y*B,W=(pt.w||1)*B,H=(pt.h||1)*B;g.save();
    g.fillStyle='rgba(0,0,0,.38)';g.fillRect(X+6,Y+H-4,W,12);
    g.fillStyle=d.wall;g.fillRect(X,Y,W,H);
    g.fillStyle=hbMix(d.wall,'#ffffff',.18);g.fillRect(X,Y,W,B*.22);
    g.fillStyle='rgba(0,0,0,.28)';g.fillRect(X,Y+H-B*.28,W,B*.28);
    g.fillStyle=d.acc2;g.fillRect(X,Y+H-B*.32,W,4);
    g.strokeStyle='#14110f';g.lineWidth=3;g.strokeRect(X+1.5,Y+1.5,W-3,H-3);
    g.restore();
  }
}
function hbClutter(g,tx,ty,k,d){const B=BP,X=tx*B,Y=ty*B,cx=X+B/2,cy=Y+B/2;g.save();g.fillStyle='rgba(0,0,0,.28)';g.beginPath();g.ellipse(cx,cy+B*.18,B*.2,B*.07,0,0,7);g.fill();
  const col={boots:'#2a1e16',bag:'#4a5a4a',mug:'#e6dcc8',paper:'#e8e2d0',tape:'#cfc3a5',bottle:'#3e6a5a',towel:'#c9d6d8',crate:'#6b4f33',sign:'#e8c53a',ice:'#cfe6ee',dust:'#c9b37e',tool:'#8a8f91',rag:'#a9a28f',pail:'#4a5a63',can:'#9aa4a8',glove:'#d9a437',token:'#e8c53a',ticket:'#e0a458',broom:'#a98a5a',stool:'#6b4f33',scrap:'#a9c4cc',scoop:'#cfd6d8',knife:'#bfc7ca',peanuts:'#c9a26b',glass:'#9fc4d4',mop:'#cfc3a5',coat:'#4a3f35',pencil:'#e8c53a',twine:'#bfa76a',chess:'#e6dcc8',radio:'#3a444a',chain:'#8a8f91',bucket:'#4a5a63',tag:'#e8e2d0',oil:'#14181b'}[k]||'#8a8f91';
  g.fillStyle=col;if(k==='boots'){g.fillRect(cx-B*.18,cy-B*.05,B*.14,B*.18);g.fillRect(cx+B*.02,cy,B*.14,B*.16)}else if(k==='bag'||k==='coat'||k==='towel'){g.beginPath();g.ellipse(cx,cy,B*.22,B*.12,.2,0,7);g.fill()}else if(k==='can'||k==='mug'||k==='pail'||k==='bucket'||k==='bottle'||k==='glass'||k==='scoop'||k==='oil'){g.beginPath();g.arc(cx,cy,B*.1,0,7);g.fill();g.strokeStyle='rgba(0,0,0,.4)';g.lineWidth=2;g.stroke()}else if(k==='ice'||k==='dust'||k==='scrap'){g.globalAlpha=.7;g.beginPath();g.ellipse(cx,cy,B*.2,B*.1,0,0,7);g.fill()}else{g.fillRect(cx-B*.14,cy-B*.08,B*.28,B*.16);g.strokeStyle='rgba(0,0,0,.4)';g.lineWidth=2;g.strokeRect(cx-B*.14,cy-B*.08,B*.28,B*.16)}
  g.restore()}
function hbRoomProp(g,p,d,R){
  const B=BP,w=p.w||1,h=p.h||1,X=p.x*B,Y=p.y*B,W=w*B,H=h*B,cx=X+W/2,cy=Y+H/2,a=d.acc,a2=d.acc2,k=p.k;
  const sh=(ww)=>{g.fillStyle='rgba(0,0,0,.36)';g.beginPath();g.ellipse(cx,Y+H-B*.1,ww||W*.42,B*.09,0,0,7);g.fill()};
  const box=(c,x,y,ww,hh)=>{g.fillStyle=c;g.fillRect(x,y,ww,hh);g.strokeStyle='rgba(0,0,0,.55)';g.lineWidth=3;g.strokeRect(x,y,ww,hh)};
  const dark=hbMix(d.wall,'#000000',.4);
  g.save();
  if(p.wall){   // things hung or fixed on the back wall
    const by=Y+B*.18,bh=B*.8;
    if(k==='window'){g.fillStyle='#0e1519';g.fillRect(X+B*.1,by-B*.05,W-B*.2,bh);g.fillStyle='rgba(159,196,212,.6)';g.fillRect(X+B*.16,by,W-B*.32,bh-B*.1);g.strokeStyle='#211a14';g.lineWidth=4;g.strokeRect(X+B*.1,by-B*.05,W-B*.2,bh);g.beginPath();g.moveTo(X+W/2,by);g.lineTo(X+W/2,by+bh-B*.1);g.stroke()}
    else if(k==='locker'){for(let i=0;i<w;i++){box('#3a4a55',X+i*B+B*.1,by-B*.1,B*.8,bh+B*.15);g.fillStyle='rgba(0,0,0,.4)';for(let q=0;q<3;q++)g.fillRect(X+i*B+B*.3,by+q*B*.07,B*.4,3);g.fillStyle=a;g.fillRect(X+i*B+B*.45,by+B*.5,B*.1,B*.18)}}
    else if(k==='nets'){g.fillStyle='#4E7C7A';g.fillRect(X+B*.1,by-B*.1,W-B*.2,bh);g.strokeStyle='#243a39';g.lineWidth=2;for(let i=0;i<10;i++){g.beginPath();g.moveTo(X+B*.1+i*(W-B*.2)/10,by-B*.1);g.lineTo(X+B*.1+i*(W-B*.2)/10+B*.1,by+bh-B*.1);g.stroke()}for(let q=0;q<5;q++){g.beginPath();g.moveTo(X+B*.1,by-B*.1+q*bh/5);g.lineTo(X+W-B*.1,by-B*.1+q*bh/5);g.stroke()}}
    else if(k==='oars'||k==='rods'||k==='lanterns'||k==='hooks'){g.strokeStyle='#bfa76a';g.lineWidth=5;g.beginPath();g.moveTo(X+B*.2,by-B*.1);g.lineTo(X+B*.45,by+bh);g.moveTo(X+B*.6,by-B*.1);g.lineTo(X+B*.8,by+bh);g.stroke();g.fillStyle=a2;g.fillRect(X+B*.1,by+B*.05,B*.8,5)}
    else if(k==='board'||k==='notice'||k==='flyer'||k==='photo'||k==='note'){g.fillStyle='#211a14';g.fillRect(X+B*.1,by-B*.1,W-B*.2,bh);g.fillStyle=k==='photo'?'#cfcabd':'#e8e2d0';g.fillRect(X+B*.2,by,W-B*.4,bh-B*.2);g.fillStyle='rgba(0,0,0,.45)';for(let q=0;q<3;q++)g.fillRect(X+B*.28,by+B*.08+q*B*.1,W-B*.56,3);if(k==='flyer'){g.fillStyle='#b5392b';g.fillRect(X+B*.28,by+B*.02,B*.2,B*.05)}if(k==='photo'){g.fillStyle='#2a2a2a';g.fillRect(X+B*.3,by+B*.05,W-B*.6,bh-B*.35)}}
    else if(k==='scale'||k==='clock'||k==='bell'||k==='wheel'||k==='darts'){g.fillStyle='#211a14';g.beginPath();g.arc(cx,by+bh*.45,B*.3,0,7);g.fill();g.fillStyle=k==='bell'?'#d9a437':'#e8e2d0';g.beginPath();g.arc(cx,by+bh*.45,B*.24,0,7);g.fill();g.strokeStyle='#211a14';g.lineWidth=3;g.beginPath();g.moveTo(cx,by+bh*.45);g.lineTo(cx+B*.12,by+bh*.3);g.stroke()}
    else if(k==='clip'){g.fillStyle='#211a14';g.fillRect(X+B*.2,by-B*.12,W-B*.4,bh+B*.1);g.fillStyle='#e8e2d0';g.fillRect(X+B*.26,by-B*.04,W-B*.52,bh-B*.1);g.fillStyle='#a9542f';g.fillRect(X+B*.26,by-B*.04,W-B*.52,B*.06);g.fillStyle='rgba(0,0,0,.45)';for(let q=0;q<3;q++)g.fillRect(X+B*.32,by+B*.1+q*B*.1,W-B*.64,3)}
    else if(k==='line'||k==='lamp'||k==='taps'||k==='icebox'||k==='basin'||k==='radio'||k==='paint'){box(k==='lamp'?'#d9a437':'#3a444a',X+B*.1,by-B*.1,W-B*.2,bh);g.fillStyle=k==='lamp'?'#ffe9b0':a;g.fillRect(X+B*.2,by+B*.08,W-B*.4,B*.12);if(k==='lamp'){g.save();g.globalCompositeOperation='lighter';const gr=g.createRadialGradient(cx,by+B*.3,0,cx,by+B*.3,B*1.4);gr.addColorStop(0,'rgba(255,220,140,.55)');gr.addColorStop(1,'rgba(255,220,140,0)');g.fillStyle=gr;g.fillRect(cx-B*1.4,by-B,B*2.8,B*2.6);g.restore()}}
    else if(k==='jersey14'){   // v2.85: Tug's jersey in a frame, his name taped over with KESSLER in marker
      box('#211a14',X+B*.12,by-B*.12,W-B*.24,bh+B*.08);g.fillStyle='#E6DCC8';g.beginPath();const jx=X+B*.25,jw=W-B*.5,jt=by-B*.02;g.moveTo(jx+jw*.3,jt);g.lineTo(jx+jw*.7,jt);g.lineTo(jx+jw,jt+bh*.22);g.lineTo(jx+jw*.86,jt+bh*.38);g.lineTo(jx+jw*.8,jt+bh*.3);g.lineTo(jx+jw*.8,jt+bh*.82);g.lineTo(jx+jw*.2,jt+bh*.82);g.lineTo(jx+jw*.2,jt+bh*.3);g.lineTo(jx+jw*.14,jt+bh*.38);g.lineTo(jx,jt+bh*.22);g.closePath();g.fill();
      g.fillStyle='#A9542F';g.font='700 '+Math.round(B*.42)+'px "Bowlby One",Impact,sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('14',cx,jt+bh*.56);
      g.save();g.translate(cx,jt+bh*.22);g.rotate(-.06);g.fillStyle='#cfc3a5';g.fillRect(-jw*.42,-B*.07,jw*.84,B*.14);g.fillStyle='#14110f';g.font='700 '+Math.round(B*.12)+'px "Barlow Condensed",sans-serif';g.fillText('KESSLER',0,B*.01);g.restore()}
    else{box(dark,X+B*.12,by-B*.08,W-B*.24,bh)}
    g.restore();return}
  // the clubhouse's two usable things: a bright locker bank and a framed mirror, each on a lit mat
  if(k==='fishtray'){const fc=['#9FB7C4','#C9D3D6','#A9B7A0','#D99A7A'];g.fillStyle='rgba(200,230,240,.55)';g.fillRect(X+B*.04,Y+B*.1,W-B*.08,B*.5);for(let i=0;i<w*3;i++){const fx=X+B*.18+i*B*.32,fy=Y+B*.26+((i*37)%5)*B*.04;g.fillStyle=fc[i%4];g.beginPath();g.ellipse(fx,fy,B*.19,B*.09,(i%3-1)*.25,0,7);g.fill();g.fillStyle='#0b1014';g.fillRect(fx+B*.05,fy-B*.02,B*.025,B*.025)}for(let i=0;i<w*4;i++){g.fillStyle='rgba(255,255,255,.7)';g.fillRect(X+B*.1+((i*53)%(w*B-B*.3)),Y+B*.14+((i*29)%7)*B*.06,B*.07,B*.05)}const sg=g.createLinearGradient(X,Y+B*.1,X,Y+B*.6);sg.addColorStop(0,'rgba(255,255,255,.38)');sg.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=sg;g.fillRect(X+B*.04,Y+B*.1,W-B*.08,B*.5);for(let i=0;i<w*3;i+=1){g.fillStyle='rgba(255,255,255,.75)';g.fillRect(X+B*.1+i*B*.32,Y+B*.2,B*.1,B*.025)}
  g.restore();return}
  if(p.act==='squad'||p.act==='team'){
    g.fillStyle='rgba(232,163,61,.20)';g.fillRect(X-B*.05,Y+H-B*.05,W+B*.1,B*.95);g.strokeStyle='rgba(232,163,61,.55)';g.lineWidth=3;g.setLineDash([10,7]);g.strokeRect(X-B*.05,Y+H-B*.05,W+B*.1,B*.95);g.setLineDash([]);
    sh(W*.48);
    if(p.act==='squad'){for(let i=0;i<w;i++){const lx=X+i*B+B*.06;g.fillStyle='#2E7D74';g.fillRect(lx,Y+B*.04,B*.88,H-B*.1);g.strokeStyle='rgba(0,0,0,.6)';g.lineWidth=3;g.strokeRect(lx,Y+B*.04,B*.88,H-B*.1);
        g.fillStyle='rgba(255,255,255,.16)';g.fillRect(lx+B*.05,Y+B*.1,B*.78,B*.12);g.fillStyle='rgba(0,0,0,.45)';for(let q=0;q<4;q++)g.fillRect(lx+B*.2,Y+B*.3+q*B*.06,B*.48,3);g.fillStyle='#E8C53A';g.beginPath();g.arc(lx+B*.7,Y+H*.55,B*.06,0,7);g.fill();
        g.fillStyle='#F2E6B8';g.fillRect(lx+B*.2,Y+H-B*.42,B*.48,B*.16);g.fillStyle='#8a1f12';g.font='700 '+Math.round(B*.12)+'px "Barlow Condensed",sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(i?'#14':'TEAM',lx+B*.44,Y+H-B*.34)}}
    else{g.fillStyle='#C9A24A';g.fillRect(X+B*.06,Y+B*.02,W-B*.12,H-B*.04);g.strokeStyle='rgba(0,0,0,.6)';g.lineWidth=3;g.strokeRect(X+B*.06,Y+B*.02,W-B*.12,H-B*.04);
      const mg=g.createLinearGradient(X,Y,X+W,Y+H);mg.addColorStop(0,'#cfe6ee');mg.addColorStop(.5,'#86a9b8');mg.addColorStop(1,'#d7edf4');g.fillStyle=mg;g.fillRect(X+B*.2,Y+B*.12,W-B*.4,H-B*.26);
      g.fillStyle='rgba(255,255,255,.55)';g.beginPath();g.moveTo(X+B*.4,Y+B*.12);g.lineTo(X+B*.75,Y+B*.12);g.lineTo(X+B*.4,Y+H-B*.14);g.lineTo(X+B*.18,Y+H-B*.14);g.closePath();g.fill()}
    g.restore();return}
  if(k==='cash'){   // v2.85: banded stacks of bills
    sh(W*.46);for(let i=0;i<w*3;i++){const sx=X+B*.12+(i%(w*2))*B*.42,sy=Y+B*.28+Math.floor(i/(w*2))*B*.3+((i*7)%3)*B*.03;for(let l=0;l<3;l++){g.fillStyle=l%2?'#5f8a52':'#79a866';g.fillRect(sx,sy-l*B*.05,B*.36,B*.2);g.strokeStyle='rgba(20,40,20,.6)';g.lineWidth=1.5;g.strokeRect(sx,sy-l*B*.05,B*.36,B*.2)}g.fillStyle='#E8C53A';g.fillRect(sx+B*.14,sy-B*.1,B*.08,B*.2)}
    g.restore();return}
  if(k==='flagbin'){   // v2.85: a crate of yellow penalty flags
    sh(W*.4);for(let i=0;i<6;i++){const fx=X+B*(.22+(i%3)*.24),fy=Y+B*(.18+Math.floor(i/3)*.12);g.fillStyle='#E8C53A';g.beginPath();g.moveTo(fx,fy);g.quadraticCurveTo(fx+B*.16,fy-B*.06,fx+B*.2,fy+B*.12);g.lineTo(fx+B*.04,fy+B*.2);g.closePath();g.fill();g.strokeStyle='#7a5a10';g.lineWidth=1.5;g.stroke()}
    box('#6b4f33',X+B*.12,Y+B*.42,W-B*.24,H-B*.52);g.strokeStyle='rgba(0,0,0,.45)';g.lineWidth=2;g.beginPath();g.moveTo(X+B*.12,Y+B*.62);g.lineTo(X+W-B*.12,Y+B*.62);g.stroke();
    g.restore();return}
  // floor props
  if(k==='bunk'||k==='bed'||k==='cot'){sh();box('#2a1f18',X+B*.05,Y+B*.12,W-B*.1,H-B*.2);g.fillStyle=a2;g.fillRect(X+B*.14,Y+B*.22,W-B*.28,H-B*.46);g.fillStyle=a;g.fillRect(X+B*.14,Y+B*.2,B*.34,H-B*.4);if(k==='bunk'){g.strokeStyle='#2a1f18';g.lineWidth=4;g.beginPath();g.moveTo(X+B*.1,Y);g.lineTo(X+B*.1,Y+H);g.moveTo(X+W-B*.1,Y);g.lineTo(X+W-B*.1,Y+H);g.stroke()}}
  else if(k==='plant'){sh(B*.3);box('#5a3d2b',cx-B*.2,Y+B*.56,B*.4,B*.32);g.fillStyle='#3f7a4c';for(let i=0;i<5;i++){g.beginPath();g.ellipse(cx+(i-2)*B*.11,Y+B*.38-Math.abs(i-2)*B*.04,B*.11,B*.24,(i-2)*.35,0,7);g.fill();g.strokeStyle='#1d3a24';g.lineWidth=1.5;g.stroke()}}
  else if(k==='chair'||k==='stool'){sh(B*.26);g.fillStyle='#211a14';g.fillRect(cx-3,cy,6,B*.34);g.fillStyle='#8a6a4a';g.beginPath();g.ellipse(cx,cy-2,B*.26,B*.14,0,0,7);g.fill();g.strokeStyle='#211a14';g.lineWidth=2;g.stroke()}
  else if(k==='table'||k==='counter'||k==='bar'||k==='bench'||k==='desk'||k==='cage'||k==='blocks'||k==='ledger'||k==='piano'||k==='radiator'||k==='mortar'||k==='dummy'||k==='trophy'||k==='mirror'||k==='note'){
    sh(W*.46);
    if(k==='mirror'){box('#3a4a55',X+B*.1,Y+B*.02,W-B*.2,H*.96);g.fillStyle='rgba(159,196,212,.55)';g.fillRect(X+B*.18,Y+B*.1,W-B*.36,H*.8)}
    else if(k==='trophy'){box('#3a2f24',X+B*.12,Y+B*.3,W-B*.24,H*.6);g.fillStyle='#d9a437';g.fillRect(cx-B*.1,Y+B*.1,B*.2,B*.25);g.fillRect(cx-B*.16,Y+B*.35,B*.32,B*.07)}
    else if(k==='dummy'){g.fillStyle='#bfa76a';g.fillRect(cx-B*.09,Y+B*.2,B*.18,B*.6);g.beginPath();g.arc(cx,Y+B*.18,B*.14,0,7);g.fill();g.fillRect(cx-B*.3,Y+B*.3,B*.6,B*.12);g.strokeStyle='#2a1f18';g.lineWidth=3;g.strokeRect(cx-B*.09,Y+B*.2,B*.18,B*.6)}
    else if(k==='note'){box('#3a2f24',X+B*.3,Y+B*.1,B*.4,B*.8);g.fillStyle='#e8e2d0';g.fillRect(X+B*.36,Y+B*.26,B*.28,B*.22)}
    else if(k==='piano'){box('#1b1613',X+B*.04,Y+B*.2,W-B*.08,H-B*.3);g.fillStyle='#e6dcc8';for(let i=0;i<6;i++)g.fillRect(X+B*.1+i*(W-B*.2)/6,Y+B*.62,(W-B*.2)/6-2,B*.22)}
    else if(k==='radiator'){box('#5a6168',X+B*.15,Y+B*.2,W-B*.3,H-B*.3);g.strokeStyle='rgba(0,0,0,.5)';g.lineWidth=3;for(let i=1;i<5;i++){g.beginPath();g.moveTo(X+B*.15+i*(W-B*.3)/5,Y+B*.2);g.lineTo(X+B*.15+i*(W-B*.3)/5,Y+H-B*.1);g.stroke()}}
    else if(k==='cage'){box('#2e2a25',X+B*.04,Y+B*.2,W-B*.08,H-B*.3);g.strokeStyle='#8a8f91';g.lineWidth=2;for(let i=1;i<10;i++){g.beginPath();g.moveTo(X+i*W/10,Y+B*.2);g.lineTo(X+i*W/10,Y+B*.3+H-B*.4);g.stroke()}g.fillStyle=a;g.fillRect(X+B*.04,Y+B*.2,W-B*.08,5)}
    else{box(k==='bar'?'#3a2a20':'#5a4632',X+B*.04,Y+B*.22,W-B*.08,H-B*.3);g.fillStyle='rgba(255,230,190,.14)';g.fillRect(X+B*.04,Y+B*.22,W-B*.08,B*.1);g.fillStyle=a;g.fillRect(X+B*.04,Y+H-B*.2,W-B*.08,3)}}
  else if(k==='locker'||k==='shelf'||k==='books'||k==='ropes'||k==='bins'||k==='tools'||k==='tank'||k==='icebin'||k==='crates'||k==='crate'||k==='box'||k==='bin'||k==='pile'||k==='prop'||k==='tar'||k==='hull'||k==='hook'||k==='hatch'||k==='helmet'){
    sh(W*.46);
    if(k==='hull'){g.fillStyle='#4a3b2c';g.beginPath();g.moveTo(X,Y+H*.8);g.quadraticCurveTo(cx,Y-H*.2,X+W,Y+H*.8);g.lineTo(X+W,Y+H);g.lineTo(X,Y+H);g.closePath();g.fill();g.strokeStyle='#211a14';g.lineWidth=4;g.stroke();g.strokeStyle='rgba(0,0,0,.4)';g.lineWidth=2;for(let i=1;i<6;i++){g.beginPath();g.moveTo(X+i*W/6,Y+H*.4);g.lineTo(X+i*W/6,Y+H);g.stroke()}}
    else if(k==='tank'){box('#1f3a44',X+B*.05,Y+B*.2,W-B*.1,H-B*.3);g.fillStyle='rgba(159,196,212,.4)';g.fillRect(X+B*.14,Y+B*.3,W-B*.28,H-B*.5);g.strokeStyle='#8a8f91';g.lineWidth=3;g.strokeRect(X+B*.14,Y+B*.3,W-B*.28,H-B*.5)}
    else if(k==='icebin'){box('#8aa4ae',X+B*.05,Y+B*.2,W-B*.1,H-B*.3);g.fillStyle='#e6f0f4';for(let i=0;i<7;i++){g.fillRect(X+B*.14+R()*(W-B*.5),Y+B*.26+R()*B*.3,B*.14,B*.12)}}
    else if(k==='hook'){g.strokeStyle='#8a8f91';g.lineWidth=7;g.beginPath();g.arc(cx,Y+B*.5,B*.22,Math.PI*.2,Math.PI*1.7);g.stroke();g.fillStyle='#3a444a';g.fillRect(cx-B*.04,Y+B*.1,B*.08,B*.2)}
    else if(k==='hatch'){box('#3a444a',X+B*.1,Y+B*.1,W-B*.2,H-B*.2);g.fillStyle=a;g.fillRect(cx-B*.1,cy-B*.02,B*.2,B*.06)}
    else if(k==='helmet'){g.fillStyle='#8a8f91';g.beginPath();g.arc(cx,cy,B*.3,0,7);g.fill();g.fillStyle='rgba(159,196,212,.55)';g.beginPath();g.arc(cx,cy,B*.14,0,7);g.fill();g.strokeStyle='#211a14';g.lineWidth=3;g.stroke()}
    else if(k==='locker'||k==='shelf'||k==='books'||k==='ropes'||k==='bins'||k==='tools'){const n=Math.max(w,h);box('#3a2f24',X+B*.05,Y+B*.1,W-B*.1,H-B*.15);for(let r=0;r<3;r++){g.fillStyle='rgba(0,0,0,.5)';g.fillRect(X+B*.1,Y+B*.3+r*B*.22,W-B*.2,3);for(let i=0;i<Math.max(2,w*2);i++){g.fillStyle=[a,a2,'#e8e2d0','#9FC4D4','#bfa76a'][(i+r+p.x)%5];g.fillRect(X+B*.14+i*(W-B*.3)/Math.max(2,w*2),Y+B*.14+r*B*.22,B*.14,B*.14)}}}
    else{box(k==='tar'?'#14110f':'#6b4f33',X+B*.14,Y+B*.22,W-B*.28,H-B*.32);g.strokeStyle='rgba(0,0,0,.5)';g.lineWidth=3;g.beginPath();g.moveTo(X+B*.14,Y+B*.22);g.lineTo(X+W-B*.14,Y+H-B*.1);g.stroke()}}
  else if(k==='cab'||k==='crane'||k==='change'){sh();box('#1f1a18',X+B*.12,Y+B*.04,W-B*.24,H-B*.1);const sc=(p.x+p.y)%2?'#E8A33D':'#9FC4D4';g.fillStyle=sc;g.fillRect(X+B*.2,Y+B*.14,W-B*.4,B*.34);g.save();g.globalCompositeOperation='lighter';const gr=g.createRadialGradient(cx,Y+B*.35,0,cx,Y+B*.35,B*.9);gr.addColorStop(0,hbRGB(sc).length?'rgba('+hbRGB(sc).join(',')+',.3)':'rgba(255,200,120,.3)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(cx-B,Y-B*.4,B*2,B*1.8);g.restore();g.fillStyle='#0b0e10';g.fillRect(X+B*.2,Y+B*.56,W-B*.4,B*.3);g.fillStyle=a2;g.fillRect(X+B*.3,Y+B*.62,B*.12,B*.1);if(k==='crane'){g.strokeStyle='#e8e2d0';g.lineWidth=3;g.beginPath();g.moveTo(cx,Y+B*.14);g.lineTo(cx,Y+B*.36);g.stroke()}}
  else if(k==='basin'||k==='oars'||k==='radio'||k==='lamp'){box(dark,X+B*.15,Y+B*.2,W-B*.3,H-B*.3)}
  else{sh();box(dark,X+B*.12,Y+B*.2,W-B*.24,H-B*.3)}
  g.restore();
}

/* ================================================================================================
   TOWN 2 LOGIC: save flags, crews + rosters, talk, challenges, shops, Crane Drop, gate + silhouette, Route 2 stub
   ================================================================================================ */
const HB_CREW_IDS=['baitdogs','longshore','gantry'];
const hbCap=()=>(SAVE.beaten||[]).includes('closers');
const hbGateOpen=()=>hbCap();
const hbWhen=k=>k==='afterCaptain'?hbCap():k==='beforeCaptain'?!hbCap():true;
const HB_DEF=()=>({raceWon:false,raceBest:null,raceMet:false,entered:false,arcadeHighScore:0,baitTipsUsed:[],harbormaster:{route1Best:null,bestScore:0,games:0,captains:0},homeVisited:false,route2Unlocked:false,starJoined:false,testRefSeen:false,tugClues:[],gateSilhouetteSeen:false,riptideTruthFired:false,riptidePre:false,kellAsked:false,fromY:24});
function hbS(){const t=SAVE.t2=SAVE.t2||{},d=HB_DEF();for(const k in d)if(t[k]===undefined)t[k]=d[k];return t}

/* ---- crews. Rosters follow Bible 5.3; the game has seven fixed slots (QB RB WR WR TE OL OL), so the Bible's LB and DB take the second OL and second WR slots. ---- */
function hbFit(p,t){const w=POS_W[p.pos];if(!w)return;for(let i=0;i<14&&ovr(p)!==t;i++){const d=Math.sign(t-ovr(p));for(const k in w)p[k]=clamp(p[k]+d,30,99)}p.tkl=clamp(Math.round((p.pow>p.blk?p.pow:(p.pow+p.blk)/2)-3),30,99);p.cov=clamp(Math.round((p.spd+p.hnd)/2-2),25,99)}
const HB_BASE={QB:[64,50,45,30,40,72],RB:[72,70,50,30,48,30],WR:[76,48,64,30,42,30],TE:[58,68,60,64,50,30],OL:[44,72,34,70,56,20]};
function hbRoster(rows){return rows.map(([n,pos,t,star])=>{const b=HB_BASE[pos],p=mk(n,pos,b[0],b[1],b[2],b[3],b[4],b[5],star?'bulldozer':null,!!star);rescale(p,t);hbFit(p,t);return p})}
const HB_UNI=o=>Object.assign({jo:'#14110f',po:'#14110f'},o);
const HB_CREWS=[
 {id:'baitdogs',name:'Bait Dogs',short:'BAIT DOGS',town:'Hale Harbor',ez:'BAIT DOGS',boss:'Rita "Ropes" Calloway',level:1,target:21,col:'#B5643C',town2:true,logo:'hbanchor',gain:5,T:76,
  uni:HB_UNI({j:2,jc:'#1F3A5F',jt:'#B5643C',jn:'#E8E2D0',p:1,pc:'#1F3A5F',ps:'#B5643C',sock:'#1F3A5F',shoe:'#14110f',h:0,hc:'#1F3A5F',hs:'#B5643C',mask:'#E8E2D0'}),
  scout:'Ground and pound. Stacks the box and trusts the run. Throw over it.',tag:'Everything heavy.',
  pre:["You're the Spillway kid. Good.","We load heavy here."],win:'Heavy wins.',lose:'Go on. Tell them you moved a crate.',
  mix:()=>pick(['stack','stack','stack','bal','bal','blitz']),
  roster:hbRoster([['Rita "Ropes" Calloway','QB',76],['Sully Brant','RB',77],['"Tally" Nunes','WR',76],['Petey Vance','WR',76],['Big Ray Cobb','TE',77],['Marta "Mule" Quinn','OL',76],['"Hook" Ostrander','OL',76]])},
 {id:'longshore',name:'Longshoremen',short:'SHOREMEN',town:'Hale Harbor',ez:'LONGSHOREMEN',boss:'Deke Marrow',level:2,target:21,col:'#4E9C94',town2:true,logo:'hbhooks',gain:5,T:78,
  uni:HB_UNI({j:0,jc:'#2F6F6A',jt:'#E8E2D0',jn:'#2B3036',p:1,pc:'#E8E2D0',ps:'#2F6F6A',sock:'#E8E2D0',shoe:'#14110f',h:1,hc:'#2F6F6A',hs:'#E8E2D0',mask:'#2B3036'}),
  scout:'Loads the strong side. The weak side is open. Mixes coverage to bait you.',tag:'Nothing gets through.',
  pre:["You're small.","Tug was small too."],win:'Huh.',lose:'Nobody sees that.',
  mix:()=>pick(['bal','bal','stack','deep','blitz']),
  roster:hbRoster([['Deke Marrow','QB',78],['Nessa Quill','RB',77],['"Sparrow" Ives','WR',79],['Tuck Ames','WR',77],['Gil Fenner','TE',76],['Kettle','OL',77],['"Grap" Doyle','OL',78]])},
 {id:'gantry',name:'Gantry Gang',short:'GANTRY',town:'Hale Harbor',ez:'GANTRY GANG',boss:'Marla "Gantry" Quinn',level:3,target:21,col:'#D9A441',town2:true,logo:'hbcrane',gain:6,T:80,
  uni:HB_UNI({j:1,jc:'#2B3036',jt:'#9FC6D8',jn:'#D9A441',p:1,pc:'#2B3036',ps:'#9FC6D8',sock:'#2B3036',shoe:'#14110f',h:2,hc:'#2B3036',hs:'#9FC6D8',mask:'#9FC6D8'}),
  scout:'Sits back and does not chase. Stronger in the second half. Make them chase.',tag:'We pack. You crack.',
  pre:["You're the Spillway kid.","Saves me a walk."],win:"Hands don't lie.",lose:"Bram's next.",
  mix:d=>d===3?pick(['blitz','blitz','bal']):pick(['deep','deep','deep','bal','stack']),
  roster:hbRoster([['Marla "Gantry" Quinn','QB',80],['"Anvil" Theo Marsh','RB',80],['Cyrus "Wick" Dunmore','WR',79],['"Wick" Ferrer','WR',78],['Hana Boyle','TE',78],['"Piling" Jack Rudd','OL',79],['Cross','OL',80]])},
 {id:'closers',name:'Closers',short:'CLOSERS',town:'Hale Harbor',ez:'CLOSERS',boss:'Bram "The Wall" Kessler',level:4,target:28,captain:true,capSim:7,col:'#9FC6D8',town2:true,logo:'hbbell',gain:8,T:81,
  uni:HB_UNI({j:2,jc:'#9FC6D8',jt:'#F2EFE6',jn:'#3A4450',p:1,pc:'#3A4450',ps:'#F2EFE6',sock:'#3A4450',shoe:'#14110f',h:0,hc:'#9FC6D8',hs:'#F2EFE6',mask:'#3A4450'}),
  scout:'Blitzes on 3rd down. Stacks the box on 4th and short. The refs lean their way.',tag:'The light stays on.',
  pre:["You throw into the dark. I've heard.","Heard you're not your brother."],win:'Tug was the best. I kept his name.',lose:'Walk out with something. That\'s the harbor way.',
  mix:(down,togo)=>{if(down===3)return Math.random()<.7?'blitz':'bal';if(down===4||togo<=7)return Math.random()<.7?'stack':'bal';return pick(['deep','deep','bal','stack'])},
  roster:hbRoster([['Bram "The Wall" Kessler','QB',81],['"Riptide" Sterling','RB',79,1],['"Lark" Sorren','WR',78],['Ines Varela','WR',78],['Odele Pike','TE',78],['"Cope" Halloran','OL',79],['"Bell" Coates','OL',80]])}
];
HB_CREWS.forEach(c=>{c.uni.jo=c.uni.jo||'#14110f';c.uni.po=c.uni.po||'#14110f'});
HB_CREWS[3].onJoin=()=>{const t=hbS();t.starJoined=true;t.harbormaster.captains=(t.harbormaster.captains||0)+1;persist()};

/* ---- extras for the existing systems ---- */


/* ---- muted working-harbor palettes for the civilians (Town 1's neon palette stays in Town 1) ---- */
const HB_FANC=['#A9542F','#4E7C7A','#6E7477','#C9B37E','#3A4A55','#7A3E2F'];
const HB_CIV={
 kid:{body:'#B5643C',trim:'#E6DCC8',pants:'#26333C',hood:1},
 fisher:{body:'#C9A24A',trim:'#6e5a20',pants:'#26333C',hat:'wide',hair:'#d8d8d0'},
 guard:{body:'#26333C',trim:'#E8A33D',pants:'#1c262c',helm:0,wide:0,baton:0,hat:'cap'},
 coach:{body:'#3A4A55',trim:'#E8A33D',pants:'#26333C',hat:'cap',hair:'#d8d8d0'},
 runner:{body:'#4E7C7A',trim:'#E6DCC8',pants:'#26333C',band:'#A9542F'},
 courier:{body:'#9FC4D4',trim:'#E6DCC8',pants:'#26333C',pack:null,hat:'cap'},
 fan:{body:'#A9542F',trim:'#E6DCC8',pants:'#26333C',scarf:1},
 vendor:{body:'#3A4A55',trim:'#E6DCC8',pants:'#26333C',apron:'#E6DCC8',band:'#A9542F',bowl:0},
 clinic:{body:'#E6DCC8',trim:'#4E7C7A',pants:'#26333C',band:'#4E7C7A'},
 broker:{body:'#5C4A3A',trim:'#E8A33D',pants:'#1f1a14'},
 granny:{body:'#5C6B73',trim:'#E6DCC8',pants:'#26333C',umb:null},
 slicker:{body:'#E8C53A',trim:'#2a2a2a',pants:'#26333C',hat:'wide',hair:'#d8d8d0'},
 sailor:{body:'#E6DCC8',trim:'#2F5A8A',pants:'#2F4A6A',hat:'cap'},
 welder:{body:'#C2492F',trim:'#E8C53A',pants:'#1f1a14',hat:'cap'},
 painter:{body:'#4C9A8A',trim:'#E8B23D',pants:'#E6DCC8',band:'#D9437A'},
 kid2:{body:'#4A7FD1',trim:'#E8C53A',pants:'#26333C',hood:1},
 cook:{body:'#E6DCC8',trim:'#C2492F',pants:'#26333C',apron:'#C2492F',hat:'cap'},
 ref:{body:'#F2EFE6',trim:'#14110f',pants:'#14110f',hat:'cap',stripes:'#14110f'}   // v2.85: referee stripes (drawn by owCiv)
};
/* ---- live maps ---- */
const HB_PROPS=HBP.filter(p=>p.t!=='banner14');
const HB_NPCS=HB_OUT_NPCS.map(n=>Object.assign({hb:1,t:n.f.slice()},n));
{const n={id:'riptide_yard',hb:1,civ:'courier',x:46,y:5,d:'d',name:'"RIPTIDE" STERLING',f:[],t:[]};Object.defineProperty(n,'off',{get(){return !(hbYardOpen()&&!HB_CREW_IDS.every(i=>SAVE.beaten.includes(i)))},configurable:true});HB_NPCS.push(n)}   // v3.27T Riptide waits in the yard by his skiff: from the yard opening until all three crews are beaten (never two Riptides)
hbNormalize();
for(const id in HBI){for(const n of HBI[id].npcs)n.t=(n.f||[]).slice()}
const HB_WMIN={hb_skeeter:3,hb_kell:3};
function hbLines(n){const T=hbS(),nc=HB_CREW_IDS.filter(i=>SAVE.beaten.includes(i)).length,cap=hbCap();
  if(n.crew){if(cap&&n.c)return n.c;if(SAVE.beaten.includes(n.crew)&&n.w)return n.w;return n.f}
  if(cap&&n.c)return n.c;if(n.w&&nc>=(HB_WMIN[n.id]||1))return n.w;return n.f}

/* ---- talk ---- */
function hbTalk(n){
  const T=hbS();
  if(!(SAVE.met||[]).includes(n.id)){SAVE.met=(SAVE.met||[]).concat(n.id);persist();owHud()}
  const cap=hbCap();
  if(n.id==='hb_yardman'&&hbYardOpen()){owSay(n.name,n.f,()=>owSay(n.name,['Tug built boats in this yard.','Bram towed the big one to the Basin.','Scraped her name off that night.']));return}   // v3.26T yard open (CF_81 3.13, D10)
  if(n.id==='riptide_yard'){if(window.SHELVED_MINIS){owSay(n.name,["I moved the rowing rig over to Salt Arcade.","Beat my 33.0 on Marv's board."]);return}hbRaceTalk(n);return}
  if(n.id==='hb_riptide'){owSay(n.name,T.riptideTruthFired?["Tug taught me to run.","Then he was gone."]:["I watched you win clean.","That's why I'm here."],hbCap()?()=>owAsk(n.name,'Round the island again?',[['RACE',()=>hbRace(n)],['NOT NOW']]):undefined);return}
  if(n.id==='hb_kell'&&T.tugClues.includes('q7_manifest')&&!T.kellAsked&&n.m){T.kellAsked=true;persist();owSay(n.name,n.m);return}
  if(n.pw){
    if(!(SAVE.pw||[]).includes(n.pw)){owSay(n.name,n.f||[],()=>owGive(n.pw,[n.name].concat(n.pwl)));return}
    owSay(n.name,(cap&&n.c)?n.c:(n.w&&HB_CREW_IDS.some(i=>SAVE.beaten.includes(i)))?n.w:(n.t2||['Good luck.']));return}
  let L=hbLines(n).slice();
  if(L===n.f||L.join()===(n.f||[]).join()){if(n.extra&&L.length<3)L=L.concat(n.extra)}
  if(!L.length)L=['...'];
  if(n.act==='drill'&&typeof fdTalk==='function'){fdTalk(n);return}
  const after=n.crew?()=>hbChallenge(n):n.act==='arcade'?()=>hbArcadeAsk(n):n.act==='swap'?()=>owSwap(n):n.act==='tip'?()=>hbTip(n):null;
  owSay(n.name,L,after);
}
function hbChallenge(n){
  const c=HB_CREWS.find(x=>x.id===n.crew);if(!c)return;
  const i=HB_CREWS.indexOf(c);
  if(i>0&&i<3&&!SAVE.beaten.includes(HB_CREWS[i-1].id)){owSay(n.name,['Not yet. Beat '+HB_CREWS[i-1].name+' first.']);return}
  owAsk(n.name,(SAVE.beaten.includes(c.id)?'Rematch? ':'Take on my crew? ')+'First to '+c.target+'.  '+c.scout,[['PLAY',()=>owPlay(c)],['NOT YET']])}
function hbArena(b){
  const c=HB_CREWS[3],T=hbS();
  {const fv=HB_FV[b.face||'d'];OW.x+=fv[0];OW.y+=fv[1];OW.px=OW.x;OW.py=OW.y;OW.d=b.face||'d'}OW.mv=false;owSave();
  if(!HB_CREW_IDS.every(i=>SAVE.beaten.includes(i))){owSay('THE BASIN',['Dry Dock 14. Closed to strangers.','Beat the Bait Dogs, Longshoremen and Gantry Gang first.']);return}
  const ask=()=>owAsk('BRAM KESSLER',(SAVE.beaten.includes('closers')?'Back for more? ':'')+'First to '+c.target+'.  '+c.scout,[['PLAY',()=>owPlay(c)],['NOT YET']]);
  owSay('BRAM KESSLER',c.pre,()=>{if(!T.riptidePre){T.riptidePre=true;persist();owSay('"RIPTIDE" STERLING',["Tug taught me to run.","Then he was gone."],ask)}else ask()})}
function hbTip(n){const T=hbS(),tips={baitdogs:['BAIT DOGS','They bite on the first fake.'],longshore:['LONGSHORE','They load the strong side. Watch the weak one.'],gantry:['GANTRY',"They don't chase. Make them chase."]};
  owAsk(n.name,'A tide tip? One per crew.',Object.keys(tips).map(id=>[tips[id][0],()=>{if(T.baitTipsUsed.includes(id)){owSay(n.name,['Told you already.']);return}T.baitTipsUsed.push(id);persist();owSay(n.name,[tips[id][1]])}]).concat([['NOT NOW']]))}
function hbRecords(){const T=hbS(),s=stt(),R=SAVE.route||{},sp=['rats1','rats2','tire'].filter(k=>R[k]).length;
  owSay('RECORDS BOARD',['CREWS BEATEN: '+HB_CREWS.filter(c=>SAVE.beaten.includes(c.id)).length+' of 4   CAPTAINS FELLED: '+(['captain','closers'].filter(i=>SAVE.beaten.includes(i)).length),'GAMES: '+s.games+'  (W '+s.wins+' / L '+(s.games-s.wins)+')','CRANE DROP BEST: '+(T.arcadeHighScore||0)+'   SPILLWAY TESTS: '+sp+' of 3'],T.raceBest?()=>owSay('RECORDS BOARD',['BOAT RACE BEST: '+T.raceBest.toFixed(2)+' s']):undefined)}
function hbTestRef(){const T=hbS();T.testRefSeen=true;persist();
  owAsk('TEST REF','Practice game. No rewards, no penalty. Pick a crew.',HB_CREWS.slice(0,3).map(c=>[c.short,()=>owPlay(Object.assign({},c,{practice:true,target:14}))]).concat([['CLOSE']]))}
/* props with their own act (the generic ones, squad / team / tire, stay in owBump) */
function hbAct(p){const T=hbS();
  if(p.act==='bed'){owAsk('BED','Rest. Save.',[['SAVE',()=>{owSave();persist();owToast('Saved.')}],['CLOSE']]);return true}
  if(p.act==='testref'){hbTestRef();return true}
  if(p.act==='board'){hbRecords();return true}
  if(p.act==='manifest'){const first=!T.tugClues.includes('q7_manifest');if(first){T.tugClues.push('q7_manifest');persist()}owSay('CLIPBOARD',['A shipping manifest.',"'Q-7 - medical supplies.'",'Signed with initials. Q.M.']);return true}
  return false}
const hbIsGate=(x,y)=>y===HB_GATE[1]&&(x===HB_GATE[0]||x===HB_GATE2[0]);
function hbBump(x,y){if(M.harbor&&hbIsGate(x,y)&&!hbGateOpen()){SND.fx('err');owSay('FERRY CHAIN',["Chain's up. Harbor first."]);return true}if(M.harbor&&hbIsYard(x,y)&&!hbYardOpen()){SND.fx('err');owSay('YARD GATE',['Chained. Longshore yard.',"Deke's crew keeps the key."]);return true}return false}

/* ---- movement: doors, edges, rooms ---- */
function hbDoorAt(x,y){for(const b of HBB)for(const d of b.doors)if(d[0]===x&&d[1]===y)return b;return null}
function hbEnter(b){
  SND.fx('open');
  if(b.kind==='arena'&&typeof bdEnterBasin==='function'&&bdEnterBasin(b)){owHud();return}
  if(b.kind==='arena'&&!HB_CREW_IDS.every(i=>SAVE.beaten.includes(i))){hbArena(b);return}   // v2.84: shut until the three crews fall; then you walk in and Bram is inside
  {const fv=HB_FV[b.face||'d'];OW.ret={x:OW.x+fv[0],y:OW.y+fv[1],d:b.face||'d'}}const d=HBI[b.room];
  owPlace(b.room,Math.floor(d.w/2),d.h-2,'u',OW.ret);owHud();owToast(b.sign);
  if(b.room==='hb_B03'&&hbCap()){const T=hbS();if(T.gateSilhouetteSeen&&!T.riptideTruthFired)setTimeout(()=>{if(M.id!=='hb_B03'||OW.busy)return;owSay('"RIPTIDE" STERLING',["You're not from here. See it clear.","Tug signed something. Not by choice.","Bram took the name. I kept the 14."],()=>{T.riptideTruthFired=true;persist()})},700)}
  if(b.room==='hb_B02'){const T=hbS();if(!T.homeVisited){T.homeVisited=true;persist()}}}
function hbLeave(){SND.fx('close');const r=OW.ret||(M.r2?{x:R2_ARR[0],y:R2_ARR[1],map:M.def&&M.def.deck?'harbor':'island'}:{x:HB_ENTRY[0]+3,y:HB_ENTRY[1]});if(M.def&&M.def.deck&&!OW.ret){r.x=HB_FERRY[0];r.y=HB_FERRY[1]}owPlace(r.map||'harbor',r.x,r.y,r.d||'d',null);OW.ret=null;owHud()}
function hbEnterTown(){const T=hbS(),first=!T.entered;T.entered=true;T.fromY=OW.y;persist();owPlace('harbor',1,HB_ENTRY[1],'r',null);owHud();
  if(first){owToast('HALE HARBOR');setTimeout(()=>{if(M.harbor)owToast("Brinewick, if you're old.")},3400)}else owToast('HALE HARBOR')}
function hbExitWest(){const T=hbS();let y=clamp(T.fromY||10,1,SPH-2);
  owPlace('spillway',SPW-2,y,'l',null);
  if(owBlocked(OW.x,OW.y)){for(let r=1;r<SPH;r++){let ok=false;for(const yy of [y-r,y+r]){if(yy<1||yy>=SPH-1)continue;OW.x=OW.px=SPW-2;OW.y=OW.py=yy;if(!owBlocked(OW.x,OW.y)){ok=true;break}}if(ok)break}}
  owSave();owHud()}
function hbArrive(){
  if(OW.x===0){owClearIn();hbExitWest();return}
  if(M.harbor&&OW.y===HB_BOARD[2]&&HB_BOARD.slice(0,2).includes(OW.x)){
    owClearIn();const T=hbS();T.route2Unlocked=true;
    const stub=()=>r2Board();
    if(!T.gateSilhouetteSeen){OW.busy=true;OW.sil={t:0,after:()=>{T.gateSilhouetteSeen=true;persist();OW.busy=false;stub()}}}else stub()}}
function hbSilFrame(dt,SW,SH){if(!OW.sil)return;OW.sil.t+=dt*1.6;hbSilhouette(SW,SH,OW.sil.t);if(OW.sil.t>=2.4){const a=OW.sil.after;OW.sil=null;if(a)a()}}

/* ---- CRANE DROP (Salt Arcade). All geometry is in the Bible's 480 x 315 frame and scaled to fit. Score 12+ unlocks Trawl Knit and Dock Cuff. ---- */
const CR={round:25,rail:44,rest:76,x0:72,x1:408,v0:150,v1:220,box:24,slots:[108,204,300,396],cw:56,tol:28,start:2,max:3,rf0:.8,rf1:1.4,drop:.35,need:12};
function hbArcadeAsk(n){const T=hbS(),won=(SAVE.arcWon||[]).includes(2);
  owAsk(n.name,'Play CRANE DROP? Tap to drop the hook on an open crate. 25 seconds.'+(won?'':'  Score '+CR.need+'+ wins a new jersey and pants.')+(T.arcadeHighScore?'  Best: '+T.arcadeHighScore:''),[['PLAY',()=>hbCrane(n)],['NOT NOW']])}
function hbCrane(n){
  OW.busy=true;
  let el=$('#crane');if(!el){el=document.createElement('div');el.id='crane';el.style.cssText='position:absolute;inset:0;z-index:6;background:#0b1217;touch-action:none';el.innerHTML='<canvas style="width:100%;height:100%;display:block;touch-action:none"></canvas>';$('#world').appendChild(el)}
  if(el.parentElement!==$('#world'))$('#world').appendChild(el);
  el.hidden=false;el.style.display='block';
  const cv=el.firstChild,r=$('#world').getBoundingClientRect(),W=cv.width=Math.round(r.width),H=cv.height=Math.round(r.height),c=cv.getContext('2d');
  const k=Math.min(W/480,H/315),ox=(W-480*k)/2,oy=(H-315*k)/2;
  let time=CR.round,hx=CR.x0,dir=1,sc=0,over=false,last=performance.now(),active=CR.slots.slice().sort(()=>Math.random()-.5).slice(0,CR.start),refill=[],drop=null,flash=null,gone=false;
  const speed=()=>CR.v0+(CR.v1-CR.v0)*(1-time/CR.round);
  const refillOne=()=>{refill.push(CR.rf0+Math.random()*(CR.rf1-CR.rf0))};
  const close=()=>{if(gone)return;gone=true;cv.onpointerdown=null;el.style.display='none';OW.busy=false};
  const finish=()=>{over=true;const T=hbS();T.arcadeHighScore=Math.max(T.arcadeHighScore||0,sc);T.harbormaster.bestScore=T.arcadeHighScore;persist();
    cv.onpointerdown=e=>{e.stopPropagation();close();const first=sc>=CR.need&&!(SAVE.arcWon||[]).includes(2);if(first){SAVE.arcWon=(SAVE.arcWon||[]).concat(2);persist()}
      owSay(n.name,first?['Score '+sc+'. Huh.','★ PRIZE: Trawl Knit jersey + Dock Cuff pants','Wear them at the Clubhouse mirror.']:[(sc>=T.arcadeHighScore&&sc>0?'New best: '+sc+'.':'Score '+sc+'. Best: '+T.arcadeHighScore+'.')].concat((SAVE.arcWon||[]).includes(2)?['Come back and beat it.']:['Score '+CR.need+' or more and the gear is yours.']),first?()=>owToast('Unlocked: Trawl Knit. Dock Cuff.'):null)}};
  cv.onpointerdown=e=>{e.stopPropagation();e.preventDefault();if(over||drop)return;drop={t:0,x:hx}};
  const tick=now=>{if(gone)return;const dt=Math.min(.05,(now-last)/1000);last=now;
    if(!over){time-=dt;if(time<=0){time=0;finish()}
      if(!drop){hx+=dir*speed()*dt;if(hx>=CR.x1){hx=CR.x1;dir=-1}if(hx<=CR.x0){hx=CR.x0;dir=1}}
      else{drop.t+=dt/CR.drop;if(drop.t>=1){const hit=active.find(s=>Math.abs(s-drop.x)<=CR.tol);if(hit!==undefined){sc++;active=active.filter(s=>s!==hit);refillOne();flash={t:.5,txt:'LOADED',x:hit}}else flash={t:.5,txt:'MISS',x:drop.x};drop=null}}
      if(active.length<CR.max&&!refill.length&&active.length<CR.start)refillOne();
      for(let i=refill.length-1;i>=0;i--){refill[i]-=dt;if(refill[i]<=0){refill.splice(i,1);const free=CR.slots.filter(s=>!active.includes(s));if(free.length&&active.length<CR.max)active.push(free[(Math.random()*free.length)|0])}}}
    if(flash){flash.t-=dt;if(flash.t<=0)flash=null}
    c.setTransform(1,0,0,1,0,0);c.fillStyle='#0b1217';c.fillRect(0,0,W,H);c.setTransform(k,0,0,k,ox,oy);
    const gr=c.createLinearGradient(0,0,0,315);gr.addColorStop(0,'#1b2a33');gr.addColorStop(1,'#10181d');c.fillStyle=gr;c.fillRect(0,0,480,315);
    c.fillStyle='#2a3a43';c.fillRect(0,250,480,65);c.fillStyle='#3a4a55';c.fillRect(0,250,480,5);   // quay
    c.fillStyle='#0b1217';c.fillRect(0,CR.rail-4,480,8);c.fillStyle='#6E7780';c.fillRect(0,CR.rail-2,480,4);   // rail
    for(const s of CR.slots){const on=active.includes(s);c.fillStyle=on?'#8a6a3a':'#2c2f33';c.fillRect(s-CR.cw/2,226,CR.cw,26);c.strokeStyle=on?'#E8A33D':'#3a444a';c.lineWidth=3;c.strokeRect(s-CR.cw/2,226,CR.cw,26);if(on){c.fillStyle='rgba(232,163,61,.28)';c.fillRect(s-CR.tol,252,CR.tol*2,3)}}
    const hy=drop?CR.rest+(226-CR.rest)*Math.sin(Math.min(1,drop.t)*Math.PI/2):CR.rest,hxx=drop?drop.x:hx;
    c.strokeStyle='#bfc7ca';c.lineWidth=3;c.beginPath();c.moveTo(hxx,CR.rail);c.lineTo(hxx,hy);c.stroke();c.fillStyle='#E8A33D';c.fillRect(hxx-CR.box/2,CR.rail-6,CR.box,10);
    c.strokeStyle='#9FC6D8';c.lineWidth=5;c.lineCap='round';c.beginPath();c.moveTo(hxx,hy);c.quadraticCurveTo(hxx+14,hy+18,hxx-1,hy+22);c.stroke();
    c.fillStyle='#fff';c.font='700 24px "Barlow Condensed",sans-serif';c.textAlign='left';c.fillText('LOADED '+sc,14,26);c.textAlign='right';c.fillText(Math.ceil(time)+'s',466,26);
    if(flash){c.textAlign='center';c.globalAlpha=Math.min(1,flash.t*3);c.fillStyle=flash.txt==='LOADED'?'#35d07f':'#ffd23a';c.font='700 22px "Bowlby One",Impact,sans-serif';c.fillText(flash.txt,Math.max(60,Math.min(420,flash.x)),205);c.globalAlpha=1}
    c.textAlign='center';c.font='500 14px "Barlow Condensed",sans-serif';c.fillStyle='#9FC4D4';c.fillText(over?'':'TAP TO DROP THE HOOK',240,306);
    if(over){c.fillStyle='rgba(0,0,0,.62)';c.fillRect(0,105,480,110);c.fillStyle=sc>=CR.need?'#35d07f':'#ffd23a';c.font='700 38px "Bowlby One",Impact,sans-serif';c.fillText('TIME  '+sc,240,157);c.fillStyle='#fff';c.font='500 16px "Barlow Condensed",sans-serif';c.fillText('Tap to continue',240,193)}
    requestAnimationFrame(tick)};
  requestAnimationFrame(tick)}

/* ===== v2.77 DEKE MARROW, THE CROOKED REF (Longshoremen game): three flags a game on plays that gain 7+, one of them wipes a touchdown. He says why, every time. ===== */
const HB_REF_CFG={   // every Hale Harbor crew cheats; the further up the harbor, the more openly
 baitdogs:{who:'RITA "ROPES" CALLOWAY',org:'BAIT DOGS',cap:['#5E7F9A','#3E5F7A'],max:2},
 longshore:{who:'DEKE MARROW',org:'LONGSHOREMEN',cap:['#4E9C94','#2f6f6a'],marrow:1},
 gantry:{who:'MARLA "GANTRY" QUINN',org:'GANTRY GANG',cap:['#C2842F','#8A5A1F'],max:2},
 closers:{who:'BRAM "THE WALL" KESSLER',org:'CLOSERS',cap:['#9FC6D8','#5E8EA6'],every:1,tdTake:1}};
const HB_REF_LINES={
 longshore:{a:{call:'HOLDING · OFFENSE',t:["Life's like the sea, kid. Not fair.","Learn to roll with the tide."]},
  b:{call:'ILLEGAL BLOCK',t:["Saw nothing. Called it anyway.","Who's gonna stop me?"]},
  td:{call:'NO TOUCHDOWN · HOLDING',t:["The sea gives. The sea takes.","Guess who's the sea."]}},
 baitdogs:[{call:'ILLEGAL MOTION',t:["Never said you could move there.","Bait's free. The hook isn't."]},
  {call:'HOLDING · OFFENSE',t:["Nobody saw it. Nobody will say.","That's the dock. We keep our own."]}],
 gantry:[{call:'ILLEGAL BLOCK',t:["That block? Dropped from a crane.","My crane. My call."]},
  {call:'DELAY OF GAME',t:["Clock says no. I say late.","Gantry lifts. Gantry drops you."]}],
 closers:{list:[{call:'HOLDING · OFFENSE',t:["The Wall doesn't move.","So you must have held it."]},
   {call:'ILLEGAL USE OF HANDS',t:["Nobody goes through the Wall.","So we call it."]},
   {call:'PASS INTERFERENCE',t:["Closers close. Games, too.","Flag's how we close."]},
   {call:'ROUGHING',t:["Tug never needed this flag.","I do. Walk it back."]}],
  td:{call:'NO TOUCHDOWN · TURNOVER ON DOWNS',t:["No points. My ball.","The Wall takes what it wants."],turnover:1}}};
function hbRefFlag(type,spot,c){
  const cid=G&&G.crew&&G.crew.id,cfg=HB_REF_CFG[cid];
  if(!cfg||!G.crew.town2||G.crew.practice)return null;
  if(type!=='tackle'&&type!=='oob'&&type!=='td')return null;
  if(F.spUsed||(c.role==='QB'&&F.passer===c))return null;
  if(type!=='td'&&spot-F.los<7)return null;   // only plays that gain more than 6 get a flag
  const R=G.ref||(G.ref={n:0,td:0,last:-9,pk:0,dv:null}),pn=G.pn||0,since=pn-R.last,dv=G.dv||(G.dv={plays:0,yds:0});
  const L=HB_REF_LINES[cid];let pick=null,isTd=false;
  if(cfg.marrow){   // Longshoremen: three a game, any down, one of them wipes a touchdown
    if(type==='td'){if(!R.td&&R.n<3){pick=L.td;isTd=true;R.td=1}}
    else if(R.n-R.td<2&&pn>=2&&since>=2&&(since>=6||Math.random()<.4)){pick=R.pk===0?L.a:L.b;R.pk++}}
  else if(type==='td'){if(cfg.tdTake&&!R.td){pick=L.td;isTd=true;R.td=1;R.dv=dv}}   // Closers: your first touchdown never counts
  else if(G.down===1&&R.dv!==dv&&(cfg.every?Math.random()<.85:R.n<cfg.max)){   // first-down plays only, one flag a drive
    pick=cfg.every?L.list[R.pk%L.list.length]:L[R.pk];R.pk++;R.dv=dv}
  if(!pick)return null;
  R.n++;R.last=pn;return {kind:isTd?'td':'f',td:isTd,turnover:!!pick.turnover,call:pick.call,t:pick.t,who:cfg.who,org:cfg.org,cap:cfg.cap}}
function hbRefBeat(cb){
  const info=(F&&F.refInfo)||{call:'HOLDING',t:["Life's like the sea, kid. Not fair."],who:'DEKE MARROW',org:'LONGSHOREMEN',cap:['#4E9C94','#2f6f6a']};
  const d=document.createElement('div');d.style.cssText='position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;flex-direction:column;background:rgba(10,16,20,.86);opacity:0;transition:opacity .25s';
  d.innerHTML='<svg viewBox="0 0 200 110" style="width:min(58vw,52vh);height:auto"><g><rect x="22" y="14" width="4" height="84" fill="#cfc7b4"/><path d="M26 16 L78 30 L26 50 Z" fill="#E8C53A" stroke="#7a5a10" stroke-width="2" stroke-linejoin="round"/></g>'+
  '<g transform="translate(118 54)"><circle r="34" fill="#C9A27E" stroke="#2a1d12" stroke-width="3"/><path d="M-35 -6 A35 35 0 0 1 35 -6 L35 -12 L-35 -12 Z" fill="'+info.cap[0]+'" stroke="#2a1d12" stroke-width="3"/><rect x="-35" y="-14" width="70" height="7" fill="'+info.cap[1]+'"/>'+
  '<path d="M-20 -1 L-6 2" stroke="#2a1d12" stroke-width="3.4" stroke-linecap="round"/><path d="M8 2 L22 -1" stroke="#2a1d12" stroke-width="3.4" stroke-linecap="round"/><circle cx="-13" cy="6" r="2.4" fill="#2a1d12"/><circle cx="15" cy="6" r="2.4" fill="#2a1d12"/>'+
  '<path d="M-14 20 Q4 24 20 11" stroke="#2a1d12" stroke-width="3.6" fill="none" stroke-linecap="round"/></g></svg>'+
  '<div style="text-align:center;margin-top:-2px;max-width:86vw"><div style="font:700 11px/1 Barlow Condensed,Impact,sans-serif;letter-spacing:.18em;color:#E8C53A">'+info.call+'</div>'+
  '<div style="font:400 15px/1 Bowlby One,Impact,sans-serif;color:#e8e2d0;margin:6px 0 5px;letter-spacing:.06em">'+info.who+' <span style="font:700 10px Barlow Condensed,sans-serif;color:#9FC4D4;letter-spacing:.14em">\u00b7 '+info.org+'</span></div>'+
  info.t.map(x=>'<div style="font:600 14px/1.35 Barlow Condensed,Arial,sans-serif;color:#fff;letter-spacing:.03em">“'+x+'”</div>').join('')+'</div>';
  document.body.appendChild(d);requestAnimationFrame(()=>d.style.opacity=1);let done=0;
  const end=()=>{if(done)return;done=1;d.style.opacity=0;setTimeout(()=>{d.remove();cb()},260)};
  setTimeout(()=>d.addEventListener('click',end),900);setTimeout(end,3600)}

/* ================================================================================================
   v2.73 HARBOR LIFE: colour, props, docks, barriers, the ferry, boats, flags, smoke, the berth decal,
   and the glowing interaction marks in the clubhouse.  Everything here is drawn in code (no assets).
   ================================================================================================ */
const HB_DOORCOL=['#C2492F','#E8B23D','#2F8A9A','#4C9A5E','#8E4E9E','#D9743A','#4A6FA5'];

/* ---- extra outdoor props (the data lives in HBP; hbBakeProp falls through to here) ---- */
function hbBakeProp2(g,p,R){
  const B=BP,X=p.x*B,Y=p.y*B,w=(p.w||1)*B,cx=X+w/2,cy=Y+B/2,c=p.c||'#C2492F';g.save();
  const sh=(ww)=>{g.fillStyle='rgba(0,0,0,.36)';g.beginPath();g.ellipse(cx,Y+B*.88,ww||w*.45,B*.1,0,0,7);g.fill()};
  const ol='rgba(10,12,14,.65)';
  switch(p.t){
   case'barrel':{sh(B*.3);g.fillStyle=c;g.beginPath();g.ellipse(cx,cy+B*.06,B*.3,B*.34,0,0,7);g.fill();g.strokeStyle=ol;g.lineWidth=3;g.stroke();
     g.fillStyle='rgba(0,0,0,.28)';g.beginPath();g.ellipse(cx,cy-B*.14,B*.24,B*.11,0,0,7);g.fill();
     g.strokeStyle='rgba(15,15,15,.5)';g.lineWidth=3;for(const dy of[-.02,.22]){g.beginPath();g.ellipse(cx,cy+B*dy,B*.3,B*.07,0,0,Math.PI);g.stroke()}
     g.fillStyle='rgba(255,255,255,.2)';g.fillRect(cx-B*.2,cy-B*.08,B*.07,B*.36);break}
   case'planter':{sh(B*.38);g.fillStyle='#6b4a2e';g.fillRect(X+B*.1,Y+B*.5,B*.8,B*.36);g.strokeStyle=ol;g.lineWidth=3;g.strokeRect(X+B*.1,Y+B*.5,B*.8,B*.36);
     g.fillStyle='#3f7a3a';g.beginPath();g.ellipse(cx,Y+B*.5,B*.38,B*.16,0,0,7);g.fill();
     for(let i=0;i<9;i++){g.fillStyle=i%3?c:'#fff3d0';g.beginPath();g.arc(X+B*(.2+R()*.6),Y+B*(.34+R()*.2),B*.07,0,7);g.fill()}break}
   case'pots':{sh(B*.4);for(const [ox,oy,cc] of [[.08,.42,'#C9B37E'],[.5,.46,'#9CC2A6']]){g.fillStyle=cc;g.fillRect(X+ox*B,Y+oy*B,B*.42,B*.4);g.strokeStyle='#3a2f24';g.lineWidth=2;g.strokeRect(X+ox*B,Y+oy*B,B*.42,B*.4);for(let i=1;i<4;i++){g.beginPath();g.moveTo(X+ox*B+i*B*.105,Y+oy*B);g.lineTo(X+ox*B+i*B*.105,Y+oy*B+B*.4);g.stroke()}g.fillStyle='#C2492F';g.fillRect(X+ox*B+B*.14,Y+oy*B-B*.05,B*.14,B*.06)}break}
   case'fishbox':{sh(B*.36);g.fillStyle='#8aa4ae';g.fillRect(X+B*.14,Y+B*.4,B*.72,B*.46);g.strokeStyle=ol;g.lineWidth=3;g.strokeRect(X+B*.14,Y+B*.4,B*.72,B*.46);g.fillStyle='#e6f0f4';for(let i=0;i<4;i++)g.fillRect(X+B*(.2+R()*.5),Y+B*(.44+R()*.1),B*.12,B*.08);
     for(let i=0;i<3;i++){g.fillStyle=['#C9D6DA','#E8743A','#9CC2D6'][i];g.beginPath();g.ellipse(X+B*(.3+i*.2),Y+B*.58,B*.1,B*.045,.3*i,0,7);g.fill()}break}
   case'bench':{sh(B*.4);g.fillStyle='#2a1f18';g.fillRect(X+B*.14,Y+B*.56,B*.06,B*.3);g.fillRect(X+B*.8,Y+B*.56,B*.06,B*.3);g.fillStyle='#9a7248';g.fillRect(X+B*.06,Y+B*.46,B*.88,B*.14);g.fillStyle='#7a5a38';g.fillRect(X+B*.06,Y+B*.3,B*.88,B*.14);g.strokeStyle=ol;g.lineWidth=2;g.strokeRect(X+B*.06,Y+B*.46,B*.88,B*.14);g.strokeRect(X+B*.06,Y+B*.3,B*.88,B*.14);break}
   case'cone':{g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(cx,Y+B*.82,B*.2,B*.06,0,0,7);g.fill();g.fillStyle='#F07A2A';g.beginPath();g.moveTo(cx-B*.16,Y+B*.8);g.lineTo(cx,Y+B*.3);g.lineTo(cx+B*.16,Y+B*.8);g.closePath();g.fill();g.fillStyle='#fff3d0';g.fillRect(cx-B*.1,Y+B*.52,B*.2,B*.07);g.fillStyle='#1d1d1d';g.fillRect(cx-B*.2,Y+B*.78,B*.4,B*.06);break}
   case'cart':{sh(B*.4);g.fillStyle='#7a5a38';g.fillRect(X+B*.14,Y+B*.4,B*.72,B*.34);g.strokeStyle=ol;g.lineWidth=3;g.strokeRect(X+B*.14,Y+B*.4,B*.72,B*.34);g.fillStyle='#2F8A9A';g.fillRect(X+B*.2,Y+B*.3,B*.3,B*.14);g.fillStyle='#E8B23D';g.fillRect(X+B*.52,Y+B*.32,B*.28,B*.12);g.fillStyle='#14181b';g.beginPath();g.arc(X+B*.3,Y+B*.78,B*.1,0,7);g.arc(X+B*.7,Y+B*.78,B*.1,0,7);g.fill();g.strokeStyle='#bfa76a';g.lineWidth=4;g.beginPath();g.moveTo(X+B*.86,Y+B*.5);g.lineTo(X+B*1.0,Y+B*.7);g.stroke();break}
   case'stall':{ // a market stall: striped awning over a produce table
     g.fillStyle='rgba(0,0,0,.34)';g.fillRect(X+B*.06,Y+B*.56,w-B*.12,B*.42);
     g.fillStyle='#7a5a38';g.fillRect(X+B*.1,Y+B*.52,w-B*.2,B*.34);g.strokeStyle=ol;g.lineWidth=3;g.strokeRect(X+B*.1,Y+B*.52,w-B*.2,B*.34);
     for(let i=0;i<9;i++){g.fillStyle=['#E8743A','#E8C53A','#9CC2A6','#C2492F','#fff3d0'][i%5];g.beginPath();g.arc(X+B*.24+i*(w-B*.48)/8,Y+B*.6,B*.07,0,7);g.fill()}
     const n=Math.round(w/(B*.25));for(let i=0;i<n;i++){g.fillStyle=i%2?'#f4ecd6':c;g.fillRect(X+i*w/n,Y+B*.04,w/n+1,B*.4);g.beginPath();g.arc(X+i*w/n+w/n/2,Y+B*.44,w/n/2,0,Math.PI);g.fill()}
     g.strokeStyle=ol;g.lineWidth=3;g.strokeRect(X,Y+B*.04,w,B*.4);g.fillStyle='#2a1f18';g.fillRect(X+B*.04,Y+B*.4,B*.06,B*.5);g.fillRect(X+w-B*.1,Y+B*.4,B*.06,B*.5);break}
   case'container':{ // a shipping container, seen from the front, in the cargo-yard colours
     sh(w*.46);g.fillStyle=c;g.fillRect(X+B*.04,Y+B*.1,w-B*.08,B*.78);g.strokeStyle=ol;g.lineWidth=3;g.strokeRect(X+B*.04,Y+B*.1,w-B*.08,B*.78);
     g.strokeStyle='rgba(0,0,0,.3)';g.lineWidth=2;for(let x=X+B*.14;x<X+w-B*.1;x+=B*.14){g.beginPath();g.moveTo(x,Y+B*.12);g.lineTo(x,Y+B*.86);g.stroke()}
     g.fillStyle='rgba(255,255,255,.22)';g.fillRect(X+B*.04,Y+B*.1,w-B*.08,B*.1);g.fillStyle='rgba(0,0,0,.28)';g.fillRect(X+B*.04,Y+B*.8,w-B*.08,B*.08);
     g.fillStyle='rgba(255,255,255,.75)';g.font='700 '+Math.round(B*.16)+'px "Barlow Condensed",sans-serif';g.textAlign='center';g.fillText('HHC '+(1000+((p.x*37+p.y*11)%9000)),cx,Y+B*.46);break}
   case'netrack':{sh(w*.45);g.fillStyle='#3a2a1c';g.fillRect(X+B*.1,Y+B*.2,B*.08,B*.7);g.fillRect(X+w-B*.18,Y+B*.2,B*.08,B*.7);g.fillRect(X+B*.1,Y+B*.2,w-B*.2,B*.07);
     g.fillStyle='rgba(78,140,138,.78)';g.beginPath();g.moveTo(X+B*.18,Y+B*.27);g.lineTo(X+w-B*.18,Y+B*.27);g.lineTo(X+w-B*.3,Y+B*.74);g.lineTo(X+B*.3,Y+B*.74);g.closePath();g.fill();g.strokeStyle='rgba(20,50,50,.8)';g.lineWidth=2;
     for(let i=1;i<10;i++){g.beginPath();g.moveTo(X+B*.18+i*(w-B*.36)/10,Y+B*.27);g.lineTo(X+B*.3+i*(w-B*.6)/10,Y+B*.74);g.stroke()}for(let j=1;j<4;j++){g.beginPath();g.moveTo(X+B*.2,Y+B*.27+j*B*.12);g.lineTo(X+w-B*.2,Y+B*.27+j*B*.12);g.stroke()}
     for(let i=0;i<4;i++){g.fillStyle='#E8743A';g.beginPath();g.arc(X+B*.4+i*(w-B*.8)/3,Y+B*.72,B*.05,0,7);g.fill()}break}
   case'dryboat':{ // a boat up on trestles
     if(p.v){const L=(p.h||2)*B;g.fillStyle='rgba(0,0,0,.36)';g.beginPath();g.ellipse(X+B*.62,Y+L/2,B*.12,L*.42,0,0,7);g.fill();g.save();g.translate(X,Y+L);g.rotate(-Math.PI/2);const x0=0,y0=0,ww=L,mx=L/2;
       g.fillStyle='#2a1f18';g.fillRect(x0+B*.2,y0+B*.62,B*.08,B*.3);g.fillRect(x0+ww-B*.28,y0+B*.62,B*.08,B*.3);
       g.fillStyle=c;g.beginPath();g.moveTo(x0+B*.05,y0+B*.5);g.quadraticCurveTo(mx,y0+B*1.0,x0+ww-B*.05,y0+B*.5);g.quadraticCurveTo(mx,y0+B*.1,x0+B*.05,y0+B*.5);g.closePath();g.fill();g.strokeStyle=ol;g.lineWidth=3;g.stroke();
       g.fillStyle='#f4ecd6';g.beginPath();g.moveTo(x0+B*.12,y0+B*.5);g.quadraticCurveTo(mx,y0+B*.4,x0+ww-B*.12,y0+B*.5);g.quadraticCurveTo(mx,y0+B*.56,x0+B*.12,y0+B*.5);g.fill();
       g.strokeStyle='rgba(0,0,0,.4)';g.lineWidth=2;g.beginPath();g.moveTo(x0+B*.2,y0+B*.52);g.quadraticCurveTo(mx,y0+B*.78,x0+ww-B*.2,y0+B*.52);g.stroke();g.restore();break}
     sh(w*.45);g.fillStyle='#2a1f18';g.fillRect(X+B*.2,Y+B*.62,B*.08,B*.3);g.fillRect(X+w-B*.28,Y+B*.62,B*.08,B*.3);
     g.fillStyle=c;g.beginPath();g.moveTo(X+B*.05,Y+B*.5);g.quadraticCurveTo(cx,Y+B*1.0,X+w-B*.05,Y+B*.5);g.quadraticCurveTo(cx,Y+B*.1,X+B*.05,Y+B*.5);g.closePath();g.fill();g.strokeStyle=ol;g.lineWidth=3;g.stroke();
     g.fillStyle='#f4ecd6';g.beginPath();g.moveTo(X+B*.12,Y+B*.5);g.quadraticCurveTo(cx,Y+B*.4,X+w-B*.12,Y+B*.5);g.quadraticCurveTo(cx,Y+B*.56,X+B*.12,Y+B*.5);g.fill();
     g.strokeStyle='rgba(0,0,0,.4)';g.lineWidth=2;g.beginPath();g.moveTo(X+B*.2,Y+B*.52);g.quadraticCurveTo(cx,Y+B*.78,X+w-B*.2,Y+B*.52);g.stroke();break}
   case'swings':{ // wooden A-frame harbor swing set (2x1)
     g.fillStyle='rgba(110,88,58,.42)';g.beginPath();g.ellipse(cx,Y+B*.82,w*.44,B*.16,0,0,7);g.fill();
     g.fillStyle='rgba(0,0,0,.28)';g.fillRect(X+B*.16,Y+B*.78,w-B*.32,B*.08);
     g.strokeStyle=ol;g.lineWidth=7;g.lineCap='round';
     g.beginPath();g.moveTo(X+B*.18,Y+B*.84);g.lineTo(X+B*.28,Y+B*.16);g.lineTo(X+B*.38,Y+B*.84);
     g.moveTo(X+w-B*.38,Y+B*.84);g.lineTo(X+w-B*.28,Y+B*.16);g.lineTo(X+w-B*.18,Y+B*.84);g.stroke();
     g.strokeStyle='#7a5736';g.lineWidth=4;g.stroke();
     g.strokeStyle=ol;g.lineWidth=7;g.beginPath();g.moveTo(X+B*.22,Y+B*.18);g.lineTo(X+w-B*.22,Y+B*.18);g.stroke();
     g.strokeStyle='#8ca2af';g.lineWidth=3.5;g.stroke();g.lineCap='butt';
     for(const [ox,sc] of [[.62,'#C2492F'],[1.38,'#E8B23D']]){
       const sx=X+B*ox;
       g.strokeStyle='rgba(20,24,28,.75)';g.lineWidth=2;g.beginPath();g.moveTo(sx-B*.12,Y+B*.2);g.lineTo(sx-B*.11,Y+B*.64);g.moveTo(sx+B*.12,Y+B*.2);g.lineTo(sx+B*.11,Y+B*.64);g.stroke();
       g.fillStyle='rgba(0,0,0,.3)';g.fillRect(sx-B*.13,Y+B*.76,B*.26,B*.06);
       g.fillStyle=sc;g.fillRect(sx-B*.15,Y+B*.62,B*.3,B*.1);g.strokeStyle=ol;g.lineWidth=2;g.strokeRect(sx-B*.15,Y+B*.62,B*.3,B*.1)}
     break}
   case'slide':{ // timber ladder + steel harbor slide (2x1)
     g.fillStyle='rgba(205,184,140,.5)';g.beginPath();g.ellipse(X+w-B*.35,Y+B*.78,B*.36,B*.16,0,0,7);g.fill();
     g.fillStyle='rgba(0,0,0,.32)';g.beginPath();g.ellipse(cx,Y+B*.86,w*.42,B*.1,0,0,7);g.fill();
     g.fillStyle='#6e4d30';g.fillRect(X+B*.18,Y+B*.24,B*.46,B*.62);g.strokeStyle=ol;g.lineWidth=3;g.strokeRect(X+B*.18,Y+B*.24,B*.46,B*.62);
     g.fillStyle='#966e46';g.fillRect(X+B*.16,Y+B*.2,B*.5,B*.14);g.strokeRect(X+B*.16,Y+B*.2,B*.5,B*.14);
     g.strokeStyle='#3a2414';g.lineWidth=2.5;for(let i=0;i<3;i++){g.beginPath();g.moveTo(X+B*.22,Y+B*(.42+i*.14));g.lineTo(X+B*.58,Y+B*(.42+i*.14));g.stroke()}
     g.fillStyle='#3d8898';g.beginPath();g.moveTo(X+B*.64,Y+B*.24);g.lineTo(X+w-B*.14,Y+B*.74);g.lineTo(X+w-B*.28,Y+B*.84);g.lineTo(X+B*.56,Y+B*.38);g.closePath();g.fill();
     g.strokeStyle=ol;g.lineWidth=3;g.stroke();
     g.strokeStyle='rgba(255,255,255,.45)';g.lineWidth=2;g.beginPath();g.moveTo(X+B*.63,Y+B*.3);g.lineTo(X+w-B*.22,Y+B*.76);g.stroke();break}
   case'sandbox':{ // framed beach-sand box with red bucket & yellow shovel (2x1)
     g.fillStyle='rgba(0,0,0,.32)';g.fillRect(X+B*.1,Y+B*.24,w-B*.16,B*.68);
     g.fillStyle='#7a5736';g.fillRect(X+B*.08,Y+B*.18,w-B*.16,B*.68);g.strokeStyle=ol;g.lineWidth=3;g.strokeRect(X+B*.08,Y+B*.18,w-B*.16,B*.68);
     g.fillStyle='#d8c296';g.fillRect(X+B*.18,Y+B*.28,w-B*.36,B*.48);
     g.fillStyle='rgba(175,148,100,.45)';g.beginPath();g.ellipse(cx-B*.15,Y+B*.54,B*.34,B*.15,0,0,7);g.fill();
     for(let i=0;i<10;i++){g.fillStyle=i%2?'rgba(255,248,225,.5)':'rgba(140,115,75,.35)';g.fillRect(X+B*(.24+R()*1.45),Y+B*(.32+R()*.38),3,2)}
     g.fillStyle='#C2492F';g.fillRect(X+B*.42,Y+B*.42,B*.18,B*.18);g.strokeStyle=ol;g.lineWidth=2;g.strokeRect(X+B*.42,Y+B*.42,B*.18,B*.18);
     g.strokeStyle='#E8B23D';g.lineWidth=3;g.beginPath();g.moveTo(X+B*1.25,Y+B*.42);g.lineTo(X+B*1.46,Y+B*.62);g.stroke();
     g.fillStyle='#E8B23D';g.fillRect(X+B*1.42,Y+B*.58,B*.12,B*.1);break}
   case'anchor':{ // cast-iron harbor anchor & chain on a stone plinth (2x2)
     const hh=(p.h||2)*B,my=Y+hh/2;
     g.fillStyle='rgba(0,0,0,.38)';g.fillRect(X+B*.14,Y+B*.22,w-B*.22,hh-B*.26);
     g.fillStyle='#5c666e';g.fillRect(X+B*.12,Y+B*.14,w-B*.24,hh-B*.28);g.strokeStyle=ol;g.lineWidth=3;g.strokeRect(X+B*.12,Y+B*.14,w-B*.24,hh-B*.28);
     g.fillStyle='#78848c';g.fillRect(X+B*.2,Y+B*.22,w-B*.4,hh-B*.44);g.strokeStyle='rgba(255,255,255,.22)';g.lineWidth=2;g.strokeRect(X+B*.2,Y+B*.22,w-B*.4,hh-B*.44);
     for(const [bx,by] of [[.22,.24],[1.78,.24],[.22,1.72],[1.78,1.72]]){g.fillStyle='#252e34';g.beginPath();g.arc(X+B*bx,Y+B*by,B*.06,0,7);g.fill()}
     g.strokeStyle='#7c4a2e';g.lineWidth=5;g.beginPath();g.ellipse(cx-B*.34,my+B*.34,B*.26,B*.18,.2,0,7);g.stroke();
     g.strokeStyle='#a86a42';g.lineWidth=2;g.setLineDash([4,4]);g.beginPath();g.ellipse(cx-B*.34,my+B*.34,B*.26,B*.18,.2,0,7);g.stroke();g.setLineDash([]);
     g.save();g.translate(cx,my-B*.02);g.rotate(-.55);
     g.strokeStyle=ol;g.lineWidth=11;g.lineCap='round';
     g.beginPath();g.moveTo(0,-B*.46);g.lineTo(0,B*.42);g.moveTo(-B*.32,-B*.26);g.lineTo(B*.32,-B*.26);g.stroke();
     g.beginPath();g.arc(0,B*.08,B*.44,.32,Math.PI-.32);g.stroke();
     g.strokeStyle='#2a353e';g.lineWidth=7;
     g.beginPath();g.moveTo(0,-B*.46);g.lineTo(0,B*.42);g.moveTo(-B*.32,-B*.26);g.lineTo(B*.32,-B*.26);g.stroke();
     g.beginPath();g.arc(0,B*.08,B*.44,.32,Math.PI-.32);g.stroke();
     g.strokeStyle='#5a6e7d';g.lineWidth=2;g.beginPath();g.moveTo(-2,-B*.44);g.lineTo(-2,B*.38);g.stroke();
     g.strokeStyle='#2a353e';g.lineWidth=4;g.beginPath();g.arc(0,-B*.56,B*.11,0,7);g.stroke();
     g.fillStyle='#2a353e';for(const sgn of [-1,1]){g.beginPath();g.moveTo(sgn*B*.42,B*.18);g.lineTo(sgn*B*.52,B*.04);g.lineTo(sgn*B*.32,B*.12);g.closePath();g.fill()}
     g.restore();g.lineCap='butt';
     g.fillStyle='#d8a648';g.fillRect(cx-B*.28,Y+hh-B*.26,B*.56,B*.11);g.strokeStyle=ol;g.lineWidth=1.5;g.strokeRect(cx-B*.28,Y+hh-B*.26,B*.56,B*.11);break}
  }
  g.restore()}

/* ---- the painted berth: HALE 14, stencilled on a dark panel with worn paint ---- */
/* ---- the animated layer: gate chain, boats, flags, smoke, ripples, gulls ---- */
function hbBoat(og,OT,x,y,w,h,col,tm,ph,kind){
  const by=Math.sin(tm*1.2+ph)*OT*.035,bx=Math.sin(tm*.8+ph)*OT*.02;og.save();og.translate(x*OT+bx,y*OT+by);
  og.fillStyle='rgba(0,0,0,.28)';og.beginPath();og.ellipse(w*OT/2+OT*.06,h*OT/2+OT*.08,w*OT/2,h*OT/2,0,0,7);og.fill();
  og.fillStyle=col;og.strokeStyle='#14181b';og.lineWidth=2.4;og.beginPath();og.moveTo(0,h*OT*.5);og.quadraticCurveTo(w*OT*.12,0,w*OT*.55,0);og.quadraticCurveTo(w*OT*1.02,h*OT*.2,w*OT*1.04,h*OT*.5);og.quadraticCurveTo(w*OT*1.02,h*OT*.8,w*OT*.55,h*OT);og.quadraticCurveTo(w*OT*.12,h*OT,0,h*OT*.5);og.closePath();og.fill();og.stroke();
  og.fillStyle='#8a6a4a';og.beginPath();og.ellipse(w*OT*.5,h*OT*.5,w*OT*.36,h*OT*.28,0,0,7);og.fill();og.strokeStyle='rgba(0,0,0,.35)';og.lineWidth=1;for(let i=-3;i<=3;i++){og.beginPath();og.moveTo(w*OT*.5+i*w*OT*.1,h*OT*.26);og.lineTo(w*OT*.5+i*w*OT*.1,h*OT*.74);og.stroke()}
  if(kind==='fish'){og.fillStyle='#f4ecd6';og.fillRect(w*OT*.3,h*OT*.3,w*OT*.26,h*OT*.4);og.strokeStyle='#14181b';og.lineWidth=1.6;og.strokeRect(w*OT*.3,h*OT*.3,w*OT*.26,h*OT*.4);og.fillStyle='#9FC4D4';og.fillRect(w*OT*.34,h*OT*.38,w*OT*.18,h*OT*.1);og.fillStyle='#E8743A';og.fillRect(w*OT*.7,h*OT*.4,w*OT*.12,h*OT*.2)}
  else{og.fillStyle='#E8C53A';og.fillRect(w*OT*.46,h*OT*.44,w*OT*.08,h*OT*.12)}
  og.restore()}

/* ---- clubhouse (and bunk, arcade): the interactive things glow and bob so they read as things you use ---- */
const HB_ACTLAB={squad:'MY SQUAD',team:'UNIFORM',bed:'SAVE',testref:'PRACTICE'};
function hbRoomAnim(og,OT,tm){
  if(!M||!M.hb)return;
  for(const p of M.props){const lab=HB_ACTLAB[p.act];if(!lab||p.drop)continue;
    const w=p.w||1,h=p.h||1,cx=(p.x+w/2)*OT,pulse=.5+.5*Math.sin(tm*3+p.x),by=Math.sin(tm*3.2+p.x)*OT*.06;
    og.save();og.globalCompositeOperation='lighter';og.fillStyle='rgba(232,163,61,'+(.16+.14*pulse)+')';og.fillRect((p.x-.1)*OT,(p.y+h)*OT-OT*.05,(w+.2)*OT,OT*.9);
    og.restore();
    if(p.act==='squad'||p.act==='team'){const X0=p.x*OT,Y0=p.y*OT,Ww=w*OT,Hh=h*OT,ph=(tm*.42+p.x*.17)%1.6,bx=X0-OT*.4+Ww*1.3*(ph/1.6)*1.4;og.save();og.beginPath();og.rect(X0,Y0,Ww,Hh);og.clip();og.globalCompositeOperation='lighter';if(ph<1.2){og.fillStyle='rgba(255,255,255,.34)';og.beginPath();og.moveTo(bx,Y0);og.lineTo(bx+OT*.32,Y0);og.lineTo(bx+OT*.12,Y0+Hh);og.lineTo(bx-OT*.2,Y0+Hh);og.closePath();og.fill()}og.restore();
      og.save();og.globalCompositeOperation='lighter';og.strokeStyle='rgba(255,246,220,'+(.22+.22*pulse)+')';og.lineWidth=2;og.strokeRect(X0+1,Y0+1,Ww-2,Hh-2);
      const sx=X0+Ww*(.78),sy=Y0+Hh*.22,sr=OT*(.08+.07*pulse);og.fillStyle='rgba(255,252,235,'+(.5+.4*pulse)+')';og.beginPath();og.moveTo(sx,sy-sr*2);og.lineTo(sx+sr*.5,sy-sr*.5);og.lineTo(sx+sr*2,sy);og.lineTo(sx+sr*.5,sy+sr*.5);og.lineTo(sx,sy+sr*2);og.lineTo(sx-sr*.5,sy+sr*.5);og.lineTo(sx-sr*2,sy);og.lineTo(sx-sr*.5,sy-sr*.5);og.closePath();og.fill();og.restore()}
    og.save();og.fillStyle='#E8A33D';og.strokeStyle='#1b1208';og.lineWidth=2;og.beginPath();const ay=(p.y+h)*OT+OT*.55+by;og.moveTo(cx-OT*.2,ay+OT*.2);og.lineTo(cx+OT*.2,ay+OT*.2);og.lineTo(cx,ay-OT*.1);og.closePath();og.fill();og.stroke();
    og.font='700 '+Math.round(OT*.24)+'px "Bowlby One",Impact,sans-serif';og.textAlign='center';og.textBaseline='middle';og.lineJoin='round';og.lineWidth=4;og.strokeStyle='rgba(10,8,4,.9)';og.strokeText(lab,cx,(p.y+h)*OT+OT*.2);og.fillStyle='#ffe9b0';og.fillText(lab,cx,(p.y+h)*OT+OT*.2);og.restore()}
}


