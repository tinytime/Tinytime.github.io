/* ============================ overworld: Vapor City ============================ */
const OWT=36,BP=72;   // on-screen tile size, baked tile size
const owc=$('#owc'),og=owc.getContext('2d');
let OWON=false,owW=390,owH=780,owDpr=1;
const owRnd=seed=>{let s=seed>>>0||1;return()=>(s=(Math.imul(s,1664525)+1013904223)>>>0)/4294967296};

/* ---------- the street ---------- */
const OWB=[
 {id:'arena',ck:'闘勝',x:8,y:1,w:16,h:9,kind:'arena',col:'#ff2fa8',col2:'#27e0ff',sign:'NETRUNNERS',sub:'ARENA',doors:[[15,9],[16,9]]},
 {id:'crew1',ck:'猫乱',x:2,y:12,w:8,h:6,kind:'lot',col:'#9b5cff',col2:'#ff2fa8',sign:'GLITCH CATS',doors:[[5,17],[6,17]]},
 {id:'crew2',ck:'鉄王',x:22,y:12,w:8,h:7,kind:'lot',col:'#f2b632',col2:'#ff7a1a',sign:'SCRAP KINGS',doors:[[25,18],[26,18]]},
 {id:'crew3',ck:'空風',x:2,y:24,w:8,h:7,kind:'tower',col:'#2fe0a8',col2:'#27e0ff',sign:'DRIFTERS',doors:[[5,30],[6,30]]},
 {id:'club',ck:'友会',x:22,y:24,w:7,h:6,kind:'club',col:'#27e0ff',col2:'#9b5cff',sign:'CLUBHOUSE',doors:[[24,29],[25,29]]},
 {id:'home',ck:'安灯',x:10,y:24,w:4,h:5,kind:'shop',col:'#ffd23a',col2:'#ff2fa8',sign:'\u5bb6',sub:'HOME',doors:[[11,28]]},
 {id:'pharma',ck:'医命',x:18,y:24,w:4,h:5,kind:'shop',col:'#27e0ff',col2:'#58ffb0',sign:'\u85ac',sub:'PHARMA',doors:[[19,28]]},
 {id:'bar',ck:'夜杯',x:1,y:2,w:6,h:7,kind:'shop',col:'#9b5cff',col2:'#ff2fa8',sign:'\u9152',sub:'HOLO BAR',doors:[[3,8],[4,8]]},
 {id:'den',ck:'光網',x:25,y:2,w:6,h:7,kind:'shop',col:'#58ffb0',col2:'#27e0ff',sign:'\u96fb',sub:'DATA DEN',doors:[[27,8],[28,8]]},
 {id:'arcade',ck:'遊機',x:2,y:35,w:8,h:3,kind:'shop',col:'#ffd23a',col2:'#ff2fa8',sign:'\u8ced',sub:'PIXEL PALACE',doors:[[5,37],[6,37]]},
 {id:'pawn',ck:'質売',x:22,y:35,w:8,h:3,kind:'shop',col:'#ff7a1a',col2:'#9b5cff',sign:'\u91d1',sub:'PAWN & TRADE',doors:[[25,37],[26,37]]}
];
const HUTM=["A tiny bait shack with a glowing \u91e3 sign.",'The door is padlocked. A note: "GONE FISHING. (Out back. Always.)"'];
const OWWATER={x0:1,x1:11,y0:21,y1:22,dock:[[4,21],[5,21],[6,21]],bridge:[[9,21],[10,21],[9,22],[10,22]]};
const OWP=[
 // North district: Arena Plaza, Holo Bar (west nightlife), Data Den (east tech)
 {x:14,y:12,t:'lamp',s:1},{x:17,y:12,t:'lamp',s:1},
 {x:20,y:10,t:'barrier',s:1},{x:10,y:10,t:'vent',s:0},
 {x:6,y:9,t:'hoload',s:1,m:['A hologram ad projector. A smiling idol sells a drink that does not exist.']},{x:1,y:9,t:'bench',s:1},
 {x:25,y:9,t:'hoload',s:1,m:['A hologram ad projector. The ad glitches: "BUY. SMILE. BUY."']},{x:30,y:9,t:'vent',s:0},
 // Mid-north: Glitch Cats east alley & Scrap Kings west service wall (boulevard & patrol loop clear)
 {x:10,y:13,t:'stall',s:1,m:['A street-food stall squeezed into a gap. The cook has four arms. Two are cybernetic.','"Noodles. Rain-proof. Do not ask what is in the broth."']},
 {x:10,y:14,t:'none',s:1},{x:10,y:15,t:'none',s:1,m:['A lean-to bolted onto the Glitch Cats wall. Somebody sleeps in here when it rains. It always rains.']},
 {x:10,y:16,t:'dump',s:1},
 {x:21,y:14,t:'crate',s:1},{x:21,y:16,t:'dump',s:1},
 {x:21,y:17,t:'repair',s:1,m:['A gray-market tech repair stall. Cracked visors, dead implants, a sign: "WE FIX WHAT THE WARRANTY WON\'T."']},
 // Canal, bait shack, memorial & east freight approach
 {x:1,y:19,t:'hut',s:1,m:HUTM},{x:2,y:19,t:'none',s:1,m:HUTM},{x:1,y:18,t:'none',s:1,m:HUTM},{x:2,y:18,t:'none',s:1,m:HUTM},
 {x:2,y:22,t:'kayak',s:1,m:['A little kayak tied to the dock. It has seen better rain.']},
 {x:3,y:19,t:'bench',s:1},
 {x:1,y:23,t:'fence22',s:1,m:['A chain-link fence. A faded 22 is sprayed across it in paint nobody has touched in two years.','Dante. Number 22. The first Deuce.']},
 {x:12,y:22,t:'vent',s:0},{x:14,y:23,t:'lamp',s:1},{x:17,y:23,t:'lamp',s:1},
 {x:30,y:18,t:'sign',s:1,m:['FREIGHT LINE  >>  SERVICE SUSPENDED','Closed to people. Authorized crates only.']},{x:29,y:19,t:'crate',s:1},
 // Mid-south: Home & Pharma boulevard, Noodle Vendor seating, Clubhouse (open 2-3 tile traversal everywhere)
 {x:16,y:25,t:'vent',s:0},{x:14,y:26,t:'bench',s:1},
 {x:13,y:29,t:'stall',s:1,m:['A steamy noodle stall under a hissing pipe. The menu is in four languages.','"Skewers and broth, 2 credits. Fresh. Probably."']},
 {x:13,y:30,t:'bench',s:1},{x:17,y:29,t:'pole',s:1},
 {x:17,y:26,t:'car',o:'v',col:'#ff2fa8',s:1,m:['A parked hover-car, cold engine. The windows are fogged from the inside.']},{x:17,y:27,t:'none',s:1,m:['A parked hover-car, cold engine. The windows are fogged from the inside.']},
 {x:21,y:29,t:'vend',s:1,m:['A vending machine. "SYNTH-COLA, 3 CREDITS." Your pockets are empty.']},
 {x:27,y:30,t:'bench',s:1},{x:29,y:30,t:'lamp',s:1},
 // South district: staggered boulevard & curbside hover-cars, Pixel Palace arcade, Pawn & Trade, South Gate checkpoint
 {x:14,y:31,t:'car',o:'v',col:'#27e0ff',s:1,m:['A parked hover-car, cold engine. The windows are fogged from the inside.']},{x:14,y:32,t:'none',s:1,m:['A parked hover-car, cold engine. The windows are fogged from the inside.']},
 {x:18,y:32,t:'vent',s:0},
 {x:2,y:33,t:'car',o:'h',col:'#ffb02e',s:1,m:['A parked hover-car, cold engine. The windows are fogged from the inside.']},{x:3,y:33,t:'none',s:1,m:['A parked hover-car, cold engine. The windows are fogged from the inside.']},
 {x:26,y:31,t:'car',o:'h',col:'#27e0ff',s:1,m:['A parked hover-car, cold engine. The windows are fogged from the inside.']},{x:27,y:31,t:'none',s:1,m:['A parked hover-car, cold engine. The windows are fogged from the inside.']},
 {x:10,y:34,t:'pole',s:1},{x:10,y:36,t:'vend',s:1,m:['A vending machine. Every slot says SOLD OUT in flickering kanji.']},
 {x:21,y:34,t:'lamp',s:1},{x:21,y:36,t:'repair',s:1,m:['A repair stall piled with chrome limbs and flickering screens.','"Black-market parts? We just call them second-hand."']},
 {x:28,y:34,t:'crate',s:1},{x:29,y:34,t:'dump',s:1},
 {x:12,y:38,t:'cone',s:0},{x:18,y:38,t:'sign',s:1,m:['ROUTE 1  >>  HALE HARBOR','Gate closed. Only Netrunners-cleared runners pass.']},{x:19,y:38,t:'barrier',s:1}
];
const OWN=[
 {id:'fanA',civ:'fan',x:18,y:10,d:'u',name:'FAN',t:['Doors open any minute. Row 4 is mine.']},
 {id:'fanB',civ:'fan',x:19,y:10,d:'u',name:'FAN',t:['I came from the Freight Line to see Mo run the same three plays.']},
 {id:'fanC',civ:'fan',x:19,y:13,d:'l',name:'FAN',t:['Is it true there is a receiver nobody can cover?']},
 {id:'fanD',civ:'fan',x:10,y:12,d:'l',name:'FAN',t:['Shh. I am saving this spot for my cousin.']},
 {id:'wait1',civ:'fan',x:17,y:36,d:'d',name:'WAITING RUNNER',t:['Gate is shut till somebody beats the Netrunners. I have been here since breakfast.']},
 {id:'wait2',civ:'fan',x:28,y:22,d:'r',name:'TRAVELER',t:['Freight line is down for people. The crates still roll through at night.']},
 {id:'courier',civ:'courier',x:15,y:27,d:'d',name:'COURIER',tf:()=>owGateOpen()?['Gate is open. Hale Harbor is the first stop on the Circuit.','I go where the crates go, runner. I will see you down the line.']:['I left that card on your windowsill at two a.m. Rule of the grid: I never ask who sent it.','Beat the three street crews. Then Mainframe Mo opens the Arena.','Beat him and the south gate opens for the Five-Line Circuit.']},
 {id:'mouse',civ:'mouse',x:14,y:24,d:'r',name:'MOUSE',tf:()=>owGateOpen()?['Go on, Deuce. I will keep the lights counted.','The east line stays shut. Somebody wants you to go south.']:['You were out on the lot again last night. I counted sixteen throws.','I stayed up. Somebody has to.','Beat the Netrunners, Deuce. Then we get the lights back.']},
 {id:'vendor',civ:'vendor',x:12,y:29,d:'r',name:'NOODLE VENDOR',t:['Best noodles in the grid. Rain costs extra.','Late shifters at the Arena talk about crates stamped Q-7 coming in at 3 a.m. Somebody they call the Quartermaster.','Talk to everybody in town. People here reward the ones who listen.']},
 {id:'kid',civ:'kid',x:19,y:20,d:'l',name:'STREET KID',t:['That big glowing arena? Home of the Netrunners.','Mainframe Mo wins by running the same three plays. Nobody stops them.']},
 {id:'runner',civ:'runner',x:13,y:13,d:'d',name:'MARATHON MAX',patrol:1,t:['Whoa, you actually stopped me? Nobody ever does.',"I run laps around this plaza all day. 42 laps and counting.",'The pharmacist sells a rub that keeps your legs fresh. Tell him I sent you.']},
 {id:'fisher',civ:'fisher',x:5,y:21,d:'d',name:'OLD FISHERMAN',pw:'gloves',pwl:['Shh. Sit a spell.',"Fifty years I've fished this puddle. Never missed a catch.","Soft hands, kid. Squeeze it, don't fight it. Take my glove cream."],t2:['Nothing biting. Never is. Still love it.']},
 {id:'granny',civ:'granny',x:20,y:22,d:'d',name:'GRANNY VOLT',t:["I've watched football on this street since before the neon.",'Back then, the rain was just rain.']},
 {id:'busker',civ:'busker',x:7,y:19,d:'r',name:'STREET BUSKER',t:['A one-man synth band. The puddles keep the beat.']},
 {id:'gateS',civ:'guard',x:13,y:38,d:'r',name:'GATE GUARD',gate:'S'},
 {id:'gateE',civ:'guard',x:30,y:22,d:'u',name:'GATE GUARD',gate:'E'},
 {id:'vc_vance',civ:'coach',x:18,y:16,d:'d',name:'COACH VANCE',act:'drill',drill:'t1_rush',t:['Circuit Drillmaster Vance.','Every town I run an on-field drill. Vapor City is RUSHING ATTACK.','Read the blocks, hit the neon gates, break tackles into the end zone.']}
];
const OWGATES=[[14,38],[15,38],[16,38],[17,38],[30,19],[30,20],[30,21]];   // gates sit right in front of the road exits (south exit row 39, east exit column 31)

/* ---------- interiors: small rooms with people in them ---------- */
const rowP=(t,x0,x1,y,o)=>{const a=[];for(let x=x0;x<=x1;x++)a.push(Object.assign({x,y,t,s:1},o||{}));return a};
const INTERIOR_ARCHETYPES={
 residential:{label:'Residential',zones:'warm-rug',entryFrame:true},
 shop:{label:'Shop / Service',zones:'counter-split',entryFrame:true},
 tavern:{label:'Bar / Tavern',zones:'lounge-split',entryFrame:false},
 arcade:{label:'Arcade',zones:'aisle-runner',entryFrame:false},
 workplace:{label:'Workplace / Civic',zones:'work-zones',entryFrame:true},
 clubhouse:{label:'Clubhouse',zones:'locker-zones',entryFrame:false},
 crew_hq:{label:'Crew HQ',zones:'stage-flank',entryFrame:false}
};
const OWI={
 home:{w:10,h:8,fl:'wood',floor:'#1f1626',wall:'#2e1a38',acc:'#ffd23a',acc2:'#ff2fa8',title:'HOME',kan:'\u5bb6',
  arch:{type:'residential',variant:'apt',
   zones:[
    {x:1,y:2,w:3,h:2,kind:'rug',col:'rgba(110,60,140,.28)',border:'rgba(255,210,58,.45)'},
    {x:1,y:4,w:2,h:3,kind:'tile',col:'rgba(42,32,54,.68)',border:'rgba(255,255,255,.12)'},
    {x:3,y:4,w:3,h:2,kind:'rug',col:'rgba(107,34,80,.78)',border:'#ffd23a',trim:'rgba(255,47,168,.75)'},
    {x:4,y:6,w:2,h:1,kind:'mat',col:'rgba(255,210,58,.24)',border:'#ffd23a'}
   ],
   wallDeco:[{x:7,y:1,kind:'door',col:'#3b2548'}]},
  props:[
   {x:1,y:2,t:'bed',s:1,w:2},
   {x:3,y:2,t:'photo',s:1,m:['A photo of two boys in oversized jerseys. One wears 22. The small one wears 7.','Dante never took his eyes off the camera. Eli always looked at him.']},
   {x:2,y:1,t:'window',s:0,w:2},
   {x:5,y:1,t:'jerseyframe',s:0},
   {x:6,y:2,t:'desk',s:1,w:2,m:['A cheap terminal. The last message is an unpaid power bill. QUIET HOURS: 12 AM to 5 AM.']},
   {x:8,y:2,t:'case',s:1,m:['A shelf of old trophies, dusty. The 22 jersey is folded on the bottom.']},
   {x:7,y:3,t:'ball',s:1,m:['Your ball. The laces are worn smooth on one side.']},
   {x:1,y:4,t:'fridge',s:1,m:['A small fridge. Half a carton of milk and a lot of hot sauce.']},
   {x:1,y:5,t:'counter',s:1,m:['A hot plate and a dented kettle. Dinner is instant noodles again.']},
   {x:1,y:6,t:'counter',s:1,m:['Empty. The block has not been the same since the lights went.']},
   {x:6,y:5,t:'table',s:1},
   {x:7,y:5,t:'stool',s:1},
   {x:3,y:6,t:'plant',s:1},
   {x:7,y:6,t:'plant',s:1},
   {x:8,y:6,t:'crate',s:1,m:['A box of shoes and spare laces by the door. Two pairs are a size too small.']}
  ],
  npcs:[
   {id:'cat',x:5,y:4,d:'l',sprite:'cat',act:'card',name:'STRAY CAT',t:['Meow.','(She sleeps on Dante\'s old jacket. She has opinions about your form.)']}
  ]},
 pharma:{w:11,h:9,fl:'clinic',floor:'#122a33',wall:'#0e3340',acc:'#27e0ff',acc2:'#58ffb0',title:'PHARMA 24H',kan:'\u85ac',
  arch:{type:'shop',variant:'clinic',
   zones:[
    {x:1,y:2,w:9,h:2,kind:'tile',col:'rgba(14,54,68,.55)',border:'rgba(39,224,255,.35)'},
    {x:4,y:5,w:2,h:3,kind:'runner',col:'rgba(88,255,176,.20)',border:'rgba(88,255,176,.55)'},
    {x:7,y:5,w:3,h:3,kind:'rug',col:'rgba(20,76,88,.48)',border:'rgba(39,224,255,.4)'},
    {x:4,y:7,w:2,h:1,kind:'mat',col:'rgba(88,255,176,.26)',border:'#58ffb0'}
   ],
   wallDeco:[{x:3,y:1,kind:'door',col:'#123e4d'}]},
  props:[
   ...rowP('counter',2,8,4),
   {x:1,y:2,t:'fridge',s:1},{x:2,y:2,t:'fridge',s:1},{x:6,y:2,t:'term',s:1},{x:8,y:2,t:'fridge',s:1},{x:9,y:2,t:'fridge',s:1},
   {x:1,y:6,t:'shelf',s:1},{x:1,y:7,t:'shelf',s:1},{x:3,y:6,t:'shelf',s:1},{x:3,y:7,t:'shelf',s:1},
   {x:8,y:6,t:'chair',s:1},{x:8,y:7,t:'chair',s:1},{x:9,y:5,t:'scale',s:1,m:['A bathroom scale. It says: "NOPE."']},
   {x:7,y:7,t:'plant',s:1},
   {x:4,y:1,t:'xsign',s:0,w:3}
  ],
  npcs:[
   {id:'pharmacist',civ:'clinic',x:5,y:3,d:'d',name:'PHARMACIST',pw:'legs',pwl:['Welcome to Pharma 24H. We stock everything except sunshine.','You are Dante Voss\'s brother. I sell a rub for tired legs. I do not sell what he took. I knew something was moving through this city. I did not know whose vial was whose. I should have done more.','You look winded. Runners come in here all day.',"This is my Iron Legs rub. It goes on your skin and washes off. Nothing goes inside you. On the house."],t2:['Drink water. Stretch. Then run.']},
   {id:'patient1',civ:'fan',x:2,y:6,d:'l',name:'PATIENT',t:['Sprained my ankle on a rooftop route. Worth it.']},
   {id:'patient2',civ:'runner',x:7,y:6,d:'r',name:'WAITING RUNNER',t:['They say the drifters never get tired. I say they never sleep.']}
  ]},
 bar:{w:12,h:9,fl:'boards',floor:'#140e2c',wall:'#26104a',acc:'#9b5cff',acc2:'#ff2fa8',title:'HOLO BAR',kan:'\u9152',
  arch:{type:'tavern',variant:'neon-lounge',
   zones:[
    {x:2,y:2,w:7,h:1,kind:'tile',col:'rgba(48,18,76,.65)',border:'rgba(255,47,168,.35)'},
    {x:1,y:6,w:3,h:2,kind:'rug',col:'rgba(88,24,78,.42)',border:'rgba(255,47,168,.45)'},
    {x:8,y:6,w:3,h:2,kind:'rug',col:'rgba(42,24,84,.42)',border:'rgba(155,92,255,.45)'},
    {x:5,y:7,w:2,h:1,kind:'mat',col:'rgba(155,92,255,.25)',border:'#9b5cff'}
   ],
   wallDeco:[{x:10,y:1,kind:'door',col:'#33165c'}]},
  props:[
   ...rowP('bottles',2,8,2).filter(p=>p.x!==5),
   ...rowP('counter',2,8,3),
   {x:3,y:4,t:'stool',s:1},{x:4,y:4,t:'stool',s:1},{x:7,y:4,t:'stool',s:1},{x:8,y:4,t:'stool',s:1},
   {x:1,y:4,t:'jukebox',s:1,m:['The jukebox plays a synth version of the school fight song.']},
   {x:10,y:4,t:'dj',s:1,m:['A DJ deck. The record spins by itself.']},
   {x:10,y:5,t:'dj',s:1,m:['A DJ deck. The record spins by itself.']},
   {x:1,y:6,t:'booth',s:1},{x:2,y:6,t:'table',s:1},
   {x:9,y:7,t:'table',s:1},{x:10,y:7,t:'stool',s:1},
   {x:4,y:5,t:'dancefloor',s:0,w:4,h:3}
  ],
  npcs:[
   {id:'bartender',civ:'vendor',x:5,y:2,d:'d',name:'BARTENDER',t:['Welcome to the Holo Bar. Everything on the menu glows.']},
   {id:'regular1',civ:'fan',x:4,y:5,d:'u',name:'REGULAR',t:['I have sat at this stool since the Netrunners were underdogs.']},
   {id:'regular2',civ:'dancer',x:6,y:6,d:'d',name:'HOLOGRAM DANCER',t:['I only exist after 9 PM. The rain makes me glitch.']},
   {id:'regular3',civ:'coach',x:2,y:7,d:'u',name:'OLD COACH',tf:()=>owGateOpen()?['The gate hums, I hear. Five towns, Deuce.','The grid eats tired boys. Keep your people close.']:['Elbow still drops. You hold the ball like a champion, kid. Quit fumbling it.','Your brother threw into the dark and trusted it to land. You throw like someone is keeping score.','I coached you and Dante from the little leagues, Deuce. I still pay for Mouse\'s boots. Do not argue with me.','(He presses a peppermint into your hand, the way he did when you were small.)','Beat the Netrunners. The gate opens. After that, the Circuit finds you.']}
  ]},
 den:{w:12,h:9,fl:'circuit',floor:'#0b1a18',wall:'#0c2a24',acc:'#58ffb0',acc2:'#27e0ff',title:'DATA DEN',kan:'\u96fb',
  arch:{type:'workplace',variant:'cyber-lab',
   zones:[
    {x:1,y:2,w:1,h:4,kind:'tile',col:'rgba(10,40,36,.75)',border:'rgba(88,255,176,.35)'},
    {x:10,y:2,w:1,h:4,kind:'tile',col:'rgba(10,40,36,.75)',border:'rgba(39,224,255,.35)'},
    {x:4,y:4,w:4,h:3,kind:'bay',col:'rgba(18,62,56,.45)',border:'rgba(88,255,176,.65)'},
    {x:5,y:7,w:2,h:1,kind:'mat',col:'rgba(88,255,176,.22)',border:'#58ffb0'}
   ]},
  props:[
   {x:3,y:2,t:'term',s:1},{x:4,y:2,t:'term',s:1},{x:7,y:2,t:'term',s:1},{x:8,y:2,t:'term',s:1},
   {x:1,y:2,t:'rack',s:1},{x:1,y:3,t:'rack',s:1},{x:1,y:4,t:'rack',s:1},{x:1,y:5,t:'rack',s:1},
   {x:10,y:2,t:'rack',s:1},{x:10,y:3,t:'rack',s:1},{x:10,y:4,t:'rack',s:1},{x:10,y:5,t:'rack',s:1},
   {x:5,y:5,t:'holo',s:1,w:2},{x:6,y:5,t:'none',s:1},
   {x:1,y:7,t:'crate',s:1},{x:2,y:7,t:'term',s:1},
   {x:8,y:7,t:'term',s:1},{x:9,y:7,t:'case',s:1},
   {x:2,y:1,t:'monwall',s:0,w:8},{x:3,y:3,t:'cables',s:0,w:6,h:4}
  ],
  npcs:[
   {id:'hacker',civ:'hacker',x:5,y:3,d:'d',name:'HACKER',act:'stats',t:["You walked in off the street? Bold. I respect bold.",'Fun fact from the grid: the same shipping code, Q-7, is on lockers in three different crews.','Somebody supplies this whole street. I just have not found out who.']},
   {id:'scriptkid',civ:'kid',x:3,y:3,d:'u',name:'SCRIPT KID',t:["I'm training an AI to predict the Netrunners' next play. It says: run."]},
   {id:'techgirl',civ:'tech',x:9,y:6,d:'d',name:'TECH VENDOR',t:['Buying data chips? Sorry, we only trade in secrets.']}
  ]},
 arcade:{w:12,h:9,fl:'carpet',floor:'#1c0f24',wall:'#2e1034',acc:'#ffd23a',acc2:'#ff2fa8',title:'PIXEL PALACE',kan:'\u8ced',
  arch:{type:'arcade',variant:'neon-arcade',
   zones:[
    {x:5,y:2,w:2,h:6,kind:'runner',col:'rgba(255,47,168,.16)',border:'rgba(255,210,58,.45)'},
    {x:8,y:5,w:3,h:3,kind:'tile',col:'rgba(48,16,58,.58)',border:'rgba(255,210,58,.55)'},
    {x:5,y:7,w:2,h:1,kind:'mat',col:'rgba(255,210,58,.24)',border:'#ffd23a'}
   ]},
  props:[
   ...rowP('cab',2,4,2),...rowP('cab',7,9,2),
   {x:3,y:5,t:'cab',s:1},{x:4,y:5,t:'cab',s:1},
   {x:1,y:3,t:'pinball',s:1},{x:1,y:4,t:'pinball',s:1},
   {x:1,y:6,t:'claw',s:1},{x:1,y:7,t:'claw',s:1},
   {x:8,y:5,t:'counter',s:1},{x:9,y:5,t:'counter',s:1},{x:8,y:6,t:'counter',s:1},
   {x:10,y:5,t:'shelf',s:1},{x:10,y:6,t:'shelf',s:1},
   {x:3,y:1,t:'ticket',s:0,w:6}
  ],
  npcs:[
   {id:'owner',civ:'vendor',x:9,y:6,d:'l',name:'ARCADE OWNER',act:'mini',t:['Welcome to Pixel Palace. Every machine is rigged, but fairly.']},
   {id:'gamer1',civ:'fan',x:3,y:3,d:'u',name:'HIGH SCORER',t:['Level 99, boss fight. Do NOT talk to me.']},
   {id:'gamer2',civ:'mouse',x:8,y:3,d:'u',name:'RETRO KID',t:['Football is just a hard arcade game with a real ball.']}
  ]},
 pawn:{w:11,h:9,fl:'concrete',floor:'#241608',wall:'#38200c',acc:'#ff7a1a',acc2:'#9b5cff',title:'PAWN & TRADE',kan:'\u91d1',
  arch:{type:'shop',variant:'pawn-vault',
   zones:[
    {x:1,y:2,w:9,h:2,kind:'tile',col:'rgba(46,28,12,.68)',border:'rgba(255,122,26,.4)'},
    {x:4,y:5,w:2,h:3,kind:'runner',col:'rgba(255,122,26,.18)',border:'rgba(255,122,26,.45)'},
    {x:1,y:5,w:3,h:3,kind:'rug',col:'rgba(70,38,16,.42)',border:'rgba(155,92,255,.4)'},
    {x:4,y:7,w:2,h:1,kind:'mat',col:'rgba(255,122,26,.24)',border:'#ff7a1a'}
   ]},
  props:[
   ...rowP('cage',2,8,4),
   {x:1,y:2,t:'safe',s:1,m:['A vault door. Combination: a very long number.']},
   {x:2,y:2,t:'safe',s:1,m:['A vault door. Combination: a very long number.']},
   {x:8,y:2,t:'term',s:1,m:['A tray of cracked phones and a console with no cables. Everything is tagged in marker.']},
   {x:9,y:2,t:'crate',s:1},
   {x:3,y:6,t:'case',s:1},
   {x:1,y:6,t:'case',s:1,m:['Four jerseys: 9, 14, 31, 5. Each tag has a name scratched out.','The 14 is faded at the shoulders. Salt stains. Somebody wore it in the harbor.']},
   {x:2,y:6,t:'case',s:1,m:['A jersey folded with care: number 22. The tag says HOLD. NOT FOR SALE.']},
   {x:1,y:7,t:'crate',s:1},
   {x:9,y:6,t:'case',s:1,m:['Old electronics, two cameras, and a pair of mirrored glasses. NOT FOR SALE.']},
   {x:8,y:6,t:'case',s:1},
   {x:8,y:7,t:'crate',s:1,m:['Stacked boxes of someone\'s whole life. The tags say UNCLAIMED.']},
   {x:2,y:1,t:'hang',s:0},{x:5,y:1,t:'hang',s:0},{x:8,y:1,t:'hang',s:0}
  ],
  npcs:[
   {id:'broker',civ:'broker',x:5,y:3,d:'d',name:'BROKER',act:'swap',t:['Buy, sell, trade. Mostly trade. Nothing is what it seems.']},
   {id:'shopper1',civ:'fan',x:2,y:7,d:'u',name:'SHOPPER',t:['Somebody pawned a pair of championship cleats. I want them.']},
   {id:'shopper2',civ:'busker',x:7,y:6,d:'r',name:'COLLECTOR',t:['Old league jerseys. Rain-faded. Priceless.','Retired numbers, mostly. Kids the Circuit used up. That 22 behind the glass, nobody touches.']}
  ]},
 club:{w:12,h:9,fl:'rubber',floor:'#0f1a2a',wall:'#132038',acc:'#27e0ff',acc2:'#9b5cff',title:'CLUBHOUSE',kan:'\u8857',
  arch:{type:'clubhouse',variant:'urban-locker',
   zones:[
    {x:1,y:5,w:3,h:3,kind:'rug',col:'rgba(24,42,72,.52)',border:'rgba(39,224,255,.4)'},
    {x:9,y:4,w:2,h:3,kind:'bay',col:'rgba(34,26,64,.5)',border:'rgba(155,92,255,.45)'},
    {x:5,y:7,w:2,h:1,kind:'mat',col:'rgba(39,224,255,.22)',border:'#27e0ff'}
   ]},
  props:[
   ...rowP('locker',1,10,2).map(p=>p.x===3?Object.assign(p,{act:'squad',m:null}):p.x===8?Object.assign(p,{t:'mirror',act:'team'}):p),
   {x:3,y:4,t:'bench',s:1},{x:4,y:4,t:'bench',s:1},{x:7,y:4,t:'bench',s:1},{x:8,y:4,t:'bench',s:1},
   {x:1,y:4,t:'fridge',s:1},{x:1,y:5,t:'case',s:1},{x:1,y:6,t:'case',s:1},
   {x:1,y:7,t:'barrel',s:1,m:['A water cooler. The cups are labeled in marker.']},
   {x:3,y:7,t:'tvstand',s:1},
   {x:10,y:4,t:'weights',s:1},{x:10,y:5,t:'weights',s:1},
   {x:10,y:6,t:'crate',s:1,m:['A city notice is taped to the crate: ALL LOCKERS MUST BE CLEARED BEFORE DEMOLITION. NEXT OF KIN SUMMONED. LOCKER 22 LISTED.']},
   {x:10,y:7,t:'crate',s:1,m:['Gear bags. One has a very worn glove sticking out.']},
   {x:8,y:7,t:'table',s:1},{x:7,y:7,t:'stool',s:1},
   {x:2,y:1,t:'jerseyframe',s:0},{x:5,y:1,t:'board',s:0,w:3},{x:9,y:1,t:'jerseyframe',s:0}
  ],
  npcs:[
   {id:'manager',civ:'coach',x:5,y:3,d:'d',name:'EQUIPMENT MANAGER',t:['Your locker is the glowing one on the left. Check your squad there.','The mirror on the right is for your look. Jersey, pants, colors.','New jersey and pants styles are prizes in the city. Try the arcade.']},
   {id:'mate1',x:4,y:6,d:'l',name:'TEAMMATE',t:['You can run the same play all day. Defenders adapt, though.']},
   {id:'mate2',civ:'kid',x:9,y:5,d:'l',name:'WATER BOY',t:['Hydrate. Stretch. Do not trust the rain puddles.']}
  ]},
 crew1:{w:12,h:9,fl:'glitch',floor:'#1a1030',wall:'#2a1450',acc:'#9b5cff',acc2:'#ff2fa8',title:'GLITCH CATS',kan:'\u732b',
  arch:{type:'crew_hq',variant:'neon-lounge-hq',
   zones:[
    {x:4,y:2,w:4,h:3,kind:'stage',col:'rgba(155,92,255,.22)',border:'#ff2fa8'},
    {x:1,y:5,w:3,h:3,kind:'rug',col:'rgba(74,26,114,.42)',border:'rgba(155,92,255,.45)'},
    {x:8,y:5,w:3,h:3,kind:'rug',col:'rgba(74,26,114,.42)',border:'rgba(255,47,168,.45)'},
    {x:5,y:7,w:2,h:1,kind:'mat',col:'rgba(155,92,255,.24)',border:'#9b5cff'}
   ]},
  props:[
   {x:1,y:2,t:'speaker',s:1},{x:2,y:2,t:'catstatue',s:1},{x:9,y:2,t:'catstatue',s:1},{x:10,y:2,t:'speaker',s:1},
   {x:1,y:6,t:'couch',s:1},{x:2,y:6,t:'couch',s:1},{x:3,y:7,t:'table',s:1},
   {x:9,y:6,t:'couch',s:1},{x:10,y:6,t:'couch',s:1},{x:8,y:7,t:'table',s:1},
   {x:4,y:1,t:'tv',s:0,w:4}
  ],
  npcs:[
   {id:'pete',x:5,y:3,d:'d',name:'PIXEL PETE',crew:'cats',t:['Glitch Cats run this alley.','There is one locker in the back nobody opens. Cheaper not to ask who pays for it.']},
   {id:'cat1',x:2,y:5,d:'d',name:'GLITCH CAT',t:['Pete never misses a read. Unless it rains.']},
   {id:'cat2',x:9,y:5,d:'d',name:'GLITCH CAT',t:['Our offense is perfectly balanced. Also, mostly random.']},
   {id:'gcat1',x:3,y:4,d:'r',sprite:'cat',name:'GLITCH KITTEN',pal:{b:'#7a3cff',k:'#4b1fa8',h:'#9b5cff',t:'#6a2fe0',e:'#27e0ff',n:'#ff2fa8'},t:['Mrrp. (Her tail flickers. For a second there are two of her.)']},
   {id:'gcat2',x:8,y:4,d:'l',sprite:'cat',name:'GLITCH KITTEN',pal:{b:'#ff2fa8',k:'#a0126a',h:'#ff6cc8',t:'#e0208f',e:'#58ffb0',n:'#27e0ff'},t:['Prrr. (Static crackles when you pet her.)']},
   {id:'gcat3',x:10,y:5,d:'l',sprite:'cat',name:'GLITCH KITTEN',pal:{b:'#27e0ff',k:'#0e8aa8',h:'#7af0ff',t:'#1fb8d8',e:'#ff2fa8',n:'#9b5cff'},t:['Mew. (She phases through the couch. Then back. Rude.)']}
  ]},
 crew2:{w:12,h:9,fl:'plate',floor:'#2a1e0c',wall:'#40260c',acc:'#f2b632',acc2:'#ff7a1a',title:'SCRAP KINGS',kan:'\u62f3',
  arch:{type:'crew_hq',variant:'iron-gym-hq',
   zones:[
    {x:4,y:2,w:4,h:4,kind:'bay',col:'rgba(242,182,50,.14)',border:'#f2b632'},
    {x:1,y:3,w:2,h:4,kind:'tile',col:'rgba(40,24,10,.55)',border:'rgba(255,122,26,.4)'},
    {x:9,y:3,w:2,h:4,kind:'tile',col:'rgba(40,24,10,.55)',border:'rgba(255,122,26,.4)'},
    {x:5,y:7,w:2,h:1,kind:'mat',col:'rgba(242,182,50,.22)',border:'#f2b632'}
   ]},
  props:[
   {x:3,y:2,t:'barrel',s:1},{x:5,y:2,t:'throne',s:1,w:2},{x:6,y:2,t:'none',s:1},{x:8,y:2,t:'barrel',s:1},
   {x:1,y:3,t:'tires',s:1},{x:1,y:4,t:'tires',s:1},{x:1,y:6,t:'weights',s:1},{x:2,y:6,t:'weights',s:1},{x:1,y:7,t:'barrel',s:1},
   {x:10,y:3,t:'tires',s:1},{x:10,y:4,t:'tires',s:1},{x:10,y:6,t:'weights',s:1},{x:9,y:6,t:'weights',s:1},{x:10,y:7,t:'crate',s:1},{x:8,y:7,t:'barrel',s:1},
   {x:2,y:1,t:'chains',s:0,w:8}
  ],
  npcs:[
   {id:'rusty',x:5,y:4,d:'d',name:'RUSTY OKOYE',crew:'kings',t:['Scrap Kings take on anybody who can win the first round.','Blue-cap bottles keep turning up in the gym. We stack them out back. Nobody drinks them.']},
   {id:'king1',x:3,y:5,d:'r',name:'SCRAP KING',t:['We stack the box. It is a whole philosophy.']},
   {id:'king2',x:8,y:5,d:'l',name:'SCRAP KING',t:['Try throwing on us. Go on.']}
  ]},
 crew3:{w:12,h:9,fl:'seam',floor:'#0e2a2a',wall:'#0a3a3a',acc:'#2fe0a8',acc2:'#27e0ff',title:'SKYLINE DRIFTERS',kan:'\u9f8d',
  arch:{type:'crew_hq',variant:'rooftop-loft-hq',
   zones:[
    {x:4,y:3,w:4,h:4,kind:'bay',col:'rgba(47,224,168,.14)',border:'rgba(39,224,255,.55)'},
    {x:1,y:5,w:2,h:3,kind:'rug',col:'rgba(14,68,68,.5)',border:'rgba(47,224,168,.45)'},
    {x:9,y:5,w:2,h:3,kind:'rug',col:'rgba(14,68,68,.5)',border:'rgba(47,224,168,.45)'},
    {x:5,y:7,w:2,h:1,kind:'mat',col:'rgba(47,224,168,.24)',border:'#2fe0a8'}
   ]},
  props:[
   {x:1,y:2,t:'planter',s:1},{x:2,y:2,t:'term',s:1},{x:9,y:2,t:'term',s:1},{x:10,y:2,t:'planter',s:1},
   {x:1,y:4,t:'rack',s:1},{x:10,y:4,t:'rack',s:1},
   {x:5,y:5,t:'maptable',s:1,w:2},{x:6,y:5,t:'none',s:1},
   {x:1,y:6,t:'lounge',s:1},{x:2,y:6,t:'lounge',s:1},{x:9,y:6,t:'lounge',s:1},{x:10,y:6,t:'lounge',s:1},
   {x:1,y:7,t:'planter',s:1},{x:3,y:7,t:'crate',s:1},{x:8,y:7,t:'barrel',s:1,m:['A rooftop rain barrel. Somebody drew a smiley face on it.']},{x:10,y:7,t:'planter',s:1},
   {x:1,y:1,t:'skyline',s:0,w:10},{x:2,y:2,t:'stringlights',s:0,w:8}
  ],
  npcs:[
   {id:'lou',x:5,y:3,d:'d',name:'SLICK LOU',crew:'rollers',t:['Skyline Drifters play from the rooftops.','Found a crate up here stamped Q-7. We put it back. Roof rule: you do not look.']},
   {id:'drift1',x:3,y:4,d:'r',name:'DRIFTER',t:['We sit back deep, then come with the blitz on third down.']},
   {id:'drift2',x:8,y:4,d:'l',name:'DRIFTER',t:['Think the view is good from here? Wait till you see it from the roof.']}
  ]},
 arena:{w:14,h:10,fl:'court',floor:'#10301c',wall:'#1d1546',acc:'#ff2fa8',acc2:'#27e0ff',title:'NETRUNNERS ARENA',kan:'\u62f3',
  props:[{x:1,y:2,t:'case',s:1},{x:2,y:2,t:'case',s:1},{x:11,y:2,t:'case',s:1},{x:12,y:2,t:'case',s:1},{x:4,y:5,t:'turnstile',s:1},{x:9,y:5,t:'turnstile',s:1},{x:3,y:8,t:'banner',s:0},{x:10,y:8,t:'banner',s:0},{x:4,y:1,t:'bigscreen',s:0,w:6},{x:5,y:2,t:'tunnel',s:0,w:4,h:1}],
  npcs:[{id:'mo',x:6,y:3,d:'d',name:'MAINFRAME MO',crew:'captain',t:['Mainframe Mo. I run this arena.','You got a card from the Circuit. Everybody who is any good does, eventually.','Voss. You have Dante\'s eyes. (He looks at the floor.) I do not talk about that night.','My receiver, Zero Day, is the best on the grid. Beat us and he walks out of here with you.']},
   {id:'fan1',civ:'fan',x:2,y:6,d:'r',name:'NETRUNNERS FAN',t:['We have not lost at home in three seasons.']},
   {id:'fan2',civ:'fan',x:11,y:6,d:'l',name:'NETRUNNERS FAN',t:['Mo has a star receiver. Nobody covers him.']},
   {id:'usher',civ:'usher',x:7,y:5,d:'d',name:'USHER',t:['Tickets are free tonight. The tough part is surviving the game.']}]}
};
