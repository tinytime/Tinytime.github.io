/* Vapor City NPC sprite renderer and archetype data.
 * Loaded before the game IIFE; renderer factories receive live game dependencies.
 */
(function(){
  const TABLES = (() => {
    const CIV_TO_ARCHETYPE=Object.freeze({
      runner:'athletic',coach:'athletic',ref:'athletic',
      courier:'courier',
      guard:'guard',
      vendor:'vendor',cook:'vendor',
      clinic:'clinic',tech:'clinic',hacker:'clinic',
      fisher:'trades',sailor:'trades',slicker:'trades',painter:'trades',welder:'trades',
      kid:'youth',kid2:'youth',mouse:'youth',
      busker:'performer',dancer:'performer',
      broker:'civic',usher:'civic',fan:'civic',
      granny:'elder'
    });
    const CIV_HEAD_STYLES=Object.freeze({
      runner:'round-fringe',coach:'visor',ref:'cap-profile',courier:'cap-profile',
      guard:'helmet',vendor:'hat',cook:'chef-hat',
      clinic:'hair-band',tech:'visor',hacker:'hood',
      fisher:'work-cap',sailor:'newsboy-cap',slicker:'bucket-hat',painter:'beanie',welder:'welder-mask',
      kid:'hood',kid2:'pom-beanie',mouse:'mouse-ears',
      busker:'beanie',dancer:'hair-band',broker:'newsboy-cap',usher:'cap-profile'
    });
    const ARCHETYPES=Object.freeze({
      athletic:{head:'round-fringe',torso:'athletic',palette:{body:'#58ffb0',trim:'#ffffff',pants:'#0e2a24',hair:'#1a1410'},prop:{
        front:{type:'whistle',hand:'right'},side:{type:'whistle',hand:'right'},back:{type:'jersey-mark'}}},
      courier:{head:'cap-profile',torso:'courier',palette:{body:'#e8742a',trim:'#27e0ff',pants:'#15202e',hair:'#1a1410'},prop:{
        front:{type:'parcel',hand:'right'},side:{type:'courier-pack'},back:{type:'courier-pack'}}},
      guard:{head:'helmet',torso:'guard',palette:{body:'#1b2430',trim:'#27e0ff',pants:'#10161e',hair:'#000000'},prop:{
        front:{type:'baton',hand:'right'},side:{type:'baton',hand:'right'},back:{type:'guard-plate'}}},
      vendor:{head:'hat',torso:'vendor',palette:{body:'#2a2f3a',trim:'#e8e8f0',pants:'#1a1d26',hair:'#14110f'},prop:{
        front:{type:'bowl',hand:'left'},side:{type:'apron-ties'},back:{type:'apron-ties'}}},
      clinic:{head:'hair-band',torso:'clinic',palette:{body:'#e8f4f8',trim:'#27e0ff',pants:'#1a2433',hair:'#2a1a20'},prop:{
        front:{type:'medical-kit',hand:'right'},side:{type:'medical-kit'},back:{type:'clinic-yoke'}}},
      trades:{head:'work-cap',torso:'trades',palette:{body:'#286c8b',trim:'#cfe8f1',pants:'#27313b',hair:'#241e1b'},prop:{
        front:{type:'wrench',hand:'right'},side:{type:'wrench',hand:'right'},back:{type:'tool-pocket'}}},
      youth:{head:'hood',torso:'youth',palette:{body:'#27e0ff',trim:'#0a2a38',pants:'#1a2433',hair:'#1a1410'},prop:{
        front:{type:'notebook',hand:'left'},side:{type:'backpack'},back:{type:'backpack'}}},
      performer:{head:'beanie',torso:'performer',palette:{body:'#3a5a8a',trim:'#ff7a1a',pants:'#1a1a26',hair:'#1a1410'},prop:{
        front:{type:'guitar',hand:'right'},side:{type:'guitar',hand:'right'},back:{type:'guitar-back'}}},
      civic:{head:'newsboy-cap',torso:'civic',palette:{body:'#5a3a2a',trim:'#ffb02e',pants:'#1a1410',hair:'#8a8a90'},prop:{
        front:{type:'clipboard',hand:'left'},side:{type:'clipboard',hand:'left'},back:{type:'coat-tail'}}},
      elder:{head:'bun',torso:'elder',palette:{body:'#9a4a9a',trim:'#ffd0ee',pants:'#2a1a2a',hair:'#e8e8f0'},prop:{
        front:{type:'cardigan-pin',hand:'right'},side:{type:'cardigan-back'},back:{type:'cardigan-back'}}}
    });
    const PALETTE_ROLES=Object.freeze({
      athletic:{skin:['#E8B78F','#A96F54','#F7D4B5'],hair:['#241A16','#100C0B','#5B4032'],clothing:['#58FFB0','#174B39','#B8FFE0','#172A26'],accent:['#FF2FA8','#FFD23A']},
      courier:{skin:['#DDA47D','#8D5A42','#F2C6A4'],hair:['#211713','#0E0B0A','#574033'],clothing:['#E8742A','#713817','#FFB16B','#15202E'],accent:['#27E0FF','#D88A45']},
      guard:{skin:['#C98A62','#75452F','#E9B38A'],hair:['#171A20','#090B10','#454B58'],clothing:['#1B2430','#0C121B','#536174','#10161E'],accent:['#65788D','#00D7FF']},
      vendor:{skin:['#E0AD87','#986447','#F3CFB2'],hair:['#241A16','#100B09','#5A4033'],clothing:['#2A2F3A','#151923','#697384','#1A1D26'],accent:['#F2F2F8','#FFBD3D']},
      clinic:{skin:['#DDA47D','#8D5A42','#F2C6A4'],hair:['#2A1A20','#100A0E','#68434E'],clothing:['#E8F4F8','#A6C8D4','#FFFFFF','#1A2433'],accent:['#27E0FF','#F4F6FF']},
      trades:{skin:['#C98A62','#75452F','#E9B38A'],hair:['#211A1A','#0D0B0B','#574444'],clothing:['#286C8B','#163A4B','#72B4CF','#27313B'],accent:['#D9A23B','#AEB8C2']},
      youth:{skin:['#E8B78F','#A96F54','#F7D4B5'],hair:['#241A16','#100C0B','#5B4032'],clothing:['#27E0FF','#0B3B4B','#9CF3FF','#1A2433'],accent:['#FF2FA8','#B4FF3A']},
      performer:{skin:['#DDA47D','#8D5A42','#F2C6A4'],hair:['#241A16','#100C0B','#5B4032'],clothing:['#3A5A8A','#1A2C4B','#83A7E0','#1A1A26'],accent:['#FF7A1A','#9B5CFF']},
      civic:{skin:['#C98A62','#75452F','#E9B38A'],hair:['#27212A','#100D13','#62536B'],clothing:['#5A3A2A','#2B1C17','#B17A59','#1A1410'],accent:['#FFB02E','#FF2FA8']},
      elder:{skin:['#D6A17F','#996052','#F0C09D'],hair:['#C6CAD5','#55576B','#E8E8F0'],clothing:['#98539F','#43294F','#C27CC0','#2A1A2A'],accent:['#FF2FA8','#FFD0EE']}
    });
    const ARCHETYPE_TORSO_MASKS=({
      athletic:{
        front:[[9,13,18],[10,11,20],[11,10,21],[12,10,21],[13,11,22],[14,12,21],[15,12,21],[16,13,20],[17,14,19],[18,14,19],[19,14,19],[20,14,19],[21,14,19],[22,14,19],[23,15,18],[24,16,17]],
        back:[[9,13,18],[10,11,20],[11,10,21],[12,10,21],[13,11,22],[14,12,21],[15,12,21],[16,13,20],[17,14,19],[18,14,19],[19,14,19],[20,14,19],[21,14,19],[22,14,19],[23,15,18],[24,16,17]],
        side:[[10,13,18],[11,12,19],[12,12,19],[13,13,18],[14,14,18],[15,14,17],[16,14,17],[17,14,17],[18,13,18],[19,13,18],[20,13,18],[21,13,18],[22,13,18],[23,13,18]]
      },
    
      courier:{
        front:[[10,12,19],[11,11,20],[12,11,21],[13,12,21],[14,13,21],[15,14,20],[16,14,20],[17,14,20],[18,13,19],[19,12,19],[20,11,18],[21,11,18],[22,12,18],[23,12,18]],
        back:[[10,11,20],[11,11,20],[12,11,21],[13,12,21],[14,13,21],[15,13,21],[16,13,20],[17,13,20],[18,12,19],[19,12,19],[20,12,18],[21,12,18],[22,13,18],[23,13,18],[24,13,18]],
        side:[[10,13,19],[11,12,20],[12,12,20],[13,13,20],[14,14,19],[15,15,18],[16,15,18],[17,15,18],[18,14,18],[19,13,17],[20,13,17],[21,13,17],[22,13,17],[23,13,17]]
      },
      guard:{
        front:[[10,7,24],[11,6,25],[12,6,25],[13,7,24],[14,8,23],[15,8,23],[16,9,22],[17,9,22],[18,9,22],[19,9,22],[20,8,23],[21,8,23],[22,9,22],[23,10,21],[24,10,21]],
        back:[[10,6,25],[11,6,25],[12,7,24],[13,7,24],[14,8,23],[15,8,23],[16,8,23],[17,8,23],[18,8,23],[19,8,23],[20,8,23],[21,8,23],[22,9,22],[23,9,22],[24,10,21],[25,10,21]],
        side:[[10,8,24],[11,8,24],[12,8,24],[13,9,23],[14,9,23],[15,9,23],[16,9,23],[17,9,23],[18,9,23],[19,8,24],[20,8,24],[21,8,24],[22,8,24],[23,8,24],[24,8,24]]
      },
      vendor:{
        // Apron-weighted silhouette: compact shoulder, clean waist, modest flared hem.
        front:[[10,13,18],[11,12,19],[12,11,20],[13,11,20],[14,10,21],[15,10,21],[16,10,21],[17,11,20],[18,11,20],[19,10,21],[20,8,24],[21,7,26],[22,5,28],[23,4,30],[24,4,30],[25,5,28],[26,7,26]],
        back:[[10,13,18],[11,12,19],[12,11,20],[13,11,20],[14,10,21],[15,10,21],[16,10,21],[17,11,20],[18,11,20],[19,10,21],[20,8,24],[21,7,26],[22,5,28],[23,4,30],[24,4,30],[25,5,28],[26,7,26],[27,9,23]],
        side:[[10,14,18],[11,13,19],[12,13,19],[13,12,20],[14,12,20],[15,11,21],[16,9,23],[17,8,24],[18,6,26],[19,6,26],[20,6,26],[21,7,25],[22,8,24],[23,10,22],[24,11,21]]
      },
      clinic:{
        front:[[10,10,21],[11,9,22],[12,9,22],[13,9,22],[14,9,22],[15,9,22],[16,9,22],[17,9,22],[18,8,23],[19,8,23],[20,8,23],[21,7,24],[22,7,24],[23,7,24],[24,7,24],[25,8,23],[26,9,22]],
        back:[[10,10,21],[11,9,22],[12,9,22],[13,9,22],[14,9,22],[15,9,22],[16,9,22],[17,9,22],[18,8,23],[19,8,23],[20,8,23],[21,7,24],[22,7,24],[23,7,24],[24,7,24],[25,8,23],[26,9,22],[27,10,21]],
        side:[[10,11,20],[11,10,21],[12,10,21],[13,10,21],[14,10,21],[15,10,21],[16,10,21],[17,10,21],[18,9,22],[19,9,22],[20,9,22],[21,9,22],[22,8,23],[23,8,23],[24,8,23],[25,9,22],[26,10,21]]
      },
      trades:{
        front:[[10,9,22],[11,8,23],[12,8,23],[13,9,22],[14,10,21],[15,10,21],[16,10,21],[17,9,22],[18,8,23],[19,8,23],[20,8,23],[21,8,23],[22,9,22],[23,10,21],[24,10,21]],
        back:[[10,9,22],[11,8,23],[12,8,23],[13,9,22],[14,9,22],[15,9,22],[16,9,22],[17,9,22],[18,9,22],[19,9,22],[20,9,22],[21,10,21],[22,10,21],[23,11,20],[24,11,20]],
        side:[[10,10,22],[11,9,23],[12,9,23],[13,9,23],[14,9,23],[15,10,22],[16,10,22],[17,10,22],[18,9,23],[19,9,23],[20,9,23],[21,9,23],[22,10,22],[23,11,21],[24,12,20]]
      },
      youth:{
        front:[[12,13,18],[13,12,19],[14,12,19],[15,13,18],[16,13,18],[17,13,18],[18,13,18],[19,12,19],[20,12,19],[21,13,18],[22,13,18]],
        back:[[12,13,18],[13,12,19],[14,12,19],[15,13,18],[16,13,18],[17,13,18],[18,13,18],[19,12,19],[20,12,19],[21,13,18],[22,13,18],[23,14,17]],
        side:[[10,14,17],[11,14,17],[12,14,17],[13,14,17],[14,14,17],[15,14,17],[16,14,17],[17,14,17],[18,14,17],[19,14,17],[20,14,17],[21,14,17]]
      },
    
      performer:{
        front:[[10,11,20],[11,10,21],[12,10,21],[13,11,22],[14,12,23],[15,12,23],[16,13,24],[17,13,24],[18,14,24],[19,14,24],[20,13,23],[21,12,23],[22,11,22],[23,11,22]],
        back:[[10,11,20],[11,10,21],[12,10,21],[13,11,22],[14,12,23],[15,12,23],[16,13,24],[17,13,24],[18,14,24],[19,14,24],[20,13,23],[21,12,23],[22,11,22],[23,11,22],[24,11,22]],
        side:[[10,10,22],[11,10,22],[12,11,23],[13,11,23],[14,12,24],[15,12,24],[16,12,24],[17,12,24],[18,12,24],[19,12,24],[20,11,23],[21,11,23],[22,10,22],[23,10,22]]
      },
      civic:{
        front:[[10,11,20],[11,10,21],[12,10,21],[13,10,21],[14,10,21],[15,9,22],[16,9,22],[17,8,23],[18,7,24],[19,6,25],[20,5,26],[21,4,27],[22,4,27],[23,5,26],[24,6,25],[25,7,24],[26,8,23],[27,9,22]],
        back:[[10,11,20],[11,10,21],[12,10,21],[13,10,21],[14,10,21],[15,9,22],[16,9,22],[17,8,23],[18,7,24],[19,6,25],[20,5,26],[21,4,27],[22,4,27],[23,5,26],[24,6,25],[25,7,24],[26,8,23],[27,9,22],[28,10,21]],
        side:[[10,12,20],[11,11,21],[12,11,21],[13,10,22],[14,10,22],[15,9,23],[16,8,24],[17,7,25],[18,6,26],[19,6,26],[20,6,26],[21,7,25],[22,8,24],[23,9,23],[24,10,22],[25,11,21]]
      },
      elder:{
        front:[[10,10,20],[11,9,21],[12,8,22],[13,7,22],[14,8,22],[15,9,21],[16,10,21],[17,11,20],[18,11,20],[19,10,21],[20,9,22],[21,8,22],[22,9,21],[23,10,20],[24,11,19]],
        back:[[10,10,20],[11,9,21],[12,8,22],[13,7,22],[14,8,22],[15,9,21],[16,10,21],[17,11,20],[18,11,20],[19,10,21],[20,9,22],[21,8,22],[22,9,21],[23,10,20],[24,11,19],[25,12,18]],
        side:[[10,11,21],[11,10,21],[12,9,21],[13,9,22],[14,10,22],[15,11,21],[16,12,20],[17,12,20],[18,12,20],[19,11,20],[20,10,21],[21,10,21],[22,11,20],[23,12,19],[24,13,18]]
      }
    });
    function reshapeTorsoRows(archetype, view, transform) {
      ARCHETYPE_TORSO_MASKS[archetype][view] = ARCHETYPE_TORSO_MASKS[archetype][view].map(([y,left,right]) => {
        const delta = transform(y, left, right);
        return [y, left + delta.left, right + delta.right];
      });
    }
    // Distinguish body types with real contour changes, not palette or props:
    // V-shaped athletic build, narrower forward-leaning courier, heavier civic waist,
    // squared guard shoulders, apron-weighted vendor, asymmetric trades build,
    // compact youth, and stooped/heavier elder.
    for (const view of ['front','back','side']) {
      reshapeTorsoRows('athletic',view,y=>y<=15?{left:2,right:-2}:y>=18?{left:-1,right:1}:{left:1,right:-1});
      reshapeTorsoRows('courier',view,y=>view==='side'?{left:1,right:-2}:{left:1,right:-1});
      reshapeTorsoRows('civic',view,y=>view==='front'
        ? (y<=15?{left:1,right:-1}:y<=22?{left:3,right:-3}:{left:0,right:0})
        : (y>=15?{left:2,right:-2}:{left:0,right:1}));
      reshapeTorsoRows('guard',view,y=>y<=16?{left:-2,right:2}:y>=20?{left:1,right:-1}:{left:-1,right:1});
      reshapeTorsoRows('vendor',view,y=>y<=14?{left:1,right:-1}:y>=17?{left:-2,right:2}:{left:-1,right:1});
      if(view==='front')reshapeTorsoRows('vendor','front',y=>y>=19?{left:-1,right:1}:{left:0,right:0});
      reshapeTorsoRows('trades',view,y=>y>=13&&y<=22?{left:1,right:-2}:{left:0,right:1});
      reshapeTorsoRows('youth',view,y=>view==='side'?{left:0,right:0}:{left:2,right:-2});
      reshapeTorsoRows('elder',view,y=>y<=14?{left:3,right:-3}:y>=17?{left:-4,right:4}:{left:-1,right:1});
    }
    reshapeTorsoRows('clinic','side',y=>y>=13&&y<=21?{left:1,right:-1}:{left:0,right:1});
    reshapeTorsoRows('clinic','front',y=>y>=18?{left:2,right:-2}:{left:0,right:0});
    reshapeTorsoRows('clinic','back',y=>y<=13?{left:-1,right:1}:{left:2,right:-2});
    // Per-civilian contour signatures prevent same-archetype jobs from becoming
    // palette-only swaps. Each type gets its own cloned mask; archetype templates
    // remain immutable and are never cumulatively modified.
    const CIV_TORSO_VARIANTS=Object.freeze({
      runner:[-2,0,-1],coach:[-2,1,2],ref:[2,-2,-1],
      courier:[-1,2,-2],guard:[2,0,-2],
      vendor:[-2,-2,-4],cook:[-1,0,-3],
      clinic:[0,2,4],tech:[2,0,2],hacker:[-2,2,-1],
      fisher:[2,-2,2],sailor:[1,-1,-2],slicker:[0,2,2],painter:[2,2,-2],welder:[-2,-2,0],
      kid:[-2,0,2],kid2:[2,0,-2],mouse:[0,2,0],
      busker:[-2,2,2],dancer:[2,-2,-2],
      broker:[-2,0,0],usher:[0,-2,0],fan:[2,2,2]
    });
    const CIV_TORSO_MASKS=Object.freeze(Object.fromEntries(Object.entries(CIV_TORSO_VARIANTS).map(([civ,variant])=>{
      const source=ARCHETYPE_TORSO_MASKS[ARCHETYPES[CIV_TO_ARCHETYPE[civ]].torso];
      const masks={};
      for(const view of ['front','back','side']){
        masks[view]=source[view].map(([y,left,right])=>{
          const band=variant[y<=14?0:y<=20?1:2];
          if(!band)return [y,left,right];
          const profileHemTrim=view==='side'&&y>=18?(civ==='vendor'?3:civ==='cook'?1:civ==='busker'?3:0):0;
          const l=view==='side'?Math.max(0,left+band+profileHemTrim):Math.max(0,left-band);
          const r=view==='side'?Math.min(31,right-band-profileHemTrim):Math.min(civ==='cook'&&view==='front'?30:31,right+band);
          const mid=Math.floor((left+right)/2);
          let L=l,R=r;
          if(R-L<3){L=mid-1;R=mid+2}
          if(['tech','hacker','clinic','usher','cook','vendor'].includes(civ)&&y>=17){
            if(view==='side'){L=Math.max(L,11);R=Math.min(R,20)}else{L=Math.max(L,9);R=Math.min(R,22)}
          }
          // Break the two closest back-view silhouette pairs with contour changes,
          // not palette or prop differences. Coach keeps an athletic V taper;
          // the welder gets a broader protective shoulder line than the sailor.
          if(civ==='coach'&&(view==='back'||view==='front')){
            if(y<=14){L=Math.max(0,L-2);R=Math.min(31,R+2);}
            else if(y>=17){
              const mid=Math.floor((L+R)/2),half=Math.max(1,Math.floor((R-L)/2)-(view==='front'?3:3));
              L=mid-half;R=mid+half;
            }
          }
          if(civ==='welder'&&view==='back'&&y<=16){L=Math.max(0,L-4);R=Math.min(31,R+4);}
          if(civ==='sailor'&&view==='back'&&y<=16){
            const mid=Math.floor((L+R)/2),half=Math.max(1,Math.floor((R-L)/2)-3);
            L=mid-half;R=mid+half;
          }
          return [y,L,R];
        });
        Object.freeze(masks[view]);
      }
      return [civ,Object.freeze(masks)];
    })));
    // The usher is individually authored rather than inheriting the flared civic coat.
    // Keep the jacket within shoulder width, with a compact waist and a two-row back tail.
    const USHER_TORSO_MASKS=Object.freeze({
      front:Object.freeze([
        [10,12,19],[11,11,20],[12,10,21],[13,10,21],
        [14,10,21],[15,11,20],[16,11,20],[17,11,20],
        [18,11,20],[19,11,20],[20,11,20],[21,11,20],
        [22,12,19],[23,13,18],[24,14,17]
      ]),
      back:Object.freeze([
        [10,12,19],[11,11,20],[12,10,21],[13,10,21],
        [14,10,21],[15,11,20],[16,11,20],[17,11,20],
        [18,11,20],[19,11,20],[20,11,20],[21,11,20],
        [22,12,19],[23,12,19],[24,12,19],[25,13,18]
      ]),
      side:Object.freeze([
        [10,14,18],[11,13,19],[12,13,19],[13,13,19],
        [14,13,19],[15,13,19],[16,13,19],[17,13,19],
        [18,13,19],[19,13,19],[20,13,19],[21,13,19],
        [22,14,18],[23,14,18]
      ])
    });
    const FAN_TORSO_VARIANTS=Object.freeze({
      driverA:[-4,-4,-4],fan1:[-4,-4,0],fan2:[4,6,-6],fanA:[-4,0,-4],fanB:[-4,0,0],
      fanC:[-4,0,4],fanD:[-4,4,-4],gamer1:[-4,4,0],hb_denny:[-4,4,4],hb_pete:[0,-4,-4],
      hb_shopper:[0,-4,0],hb_splinter:[0,-4,4],hb_wick:[0,0,-4],patient1:[0,0,0],
      r2_saltwife:[0,0,4],r2_stack:[0,4,-4],regular1:[0,4,0],shopper1:[0,4,4],
      wait1:[4,-4,-4],wait2:[4,-4,0]
    });
    const FAN_SIDE_TORSO_VARIANTS=Object.freeze({
      // Side silhouettes need more than small width nudges: these four bodies
      // were the closest rendered pairs after the first fan differentiation pass.
      fanA:[-6,-4,-2],r2_stack:[4,6,0],
      fan2:[4,6,-6],r2_saltwife:[4,-4,-6],wait1:[-6,6,6]
    });
    const FAN_TORSO_MASKS=Object.freeze(Object.fromEntries(Object.entries(FAN_TORSO_VARIANTS).map(([id,variant])=>{
      const source=ARCHETYPE_TORSO_MASKS[ARCHETYPES[CIV_TO_ARCHETYPE.fan].torso],masks={};
      for(const view of ['front','back','side']){
        const shape=view==='side'?(FAN_SIDE_TORSO_VARIANTS[id]||variant):variant;
        masks[view]=source[view].map(([y,left,right])=>{
          const band=shape[y<=14?0:y<=20?1:2];
          if(!band)return [y,left,right];
          return view==='side'?[y,Math.max(0,left+band),Math.min(31,right-band)]:[y,Math.max(0,left-band),Math.min(31,right+band)];
        });
        Object.freeze(masks[view]);
      }
      return [id,Object.freeze(masks)];
    })));
    Object.freeze(ARCHETYPE_TORSO_MASKS);
    
    
    const BASE_RIG_PARTS=Object.freeze({
      front:{
        arms:[[8,10,3,4,'arm'],[8,13,2,4,'armshade'],[8,16,2,4,'arm'],[9,19,2,3,'armhi'],[9,21,2,2,'skin'],[21,10,3,4,'arm'],[22,13,2,4,'armshade'],[22,16,2,4,'arm'],[21,19,2,3,'armhi'],[21,21,2,2,'skin']],
        legs:[[11,24,4,6,'pants'],[17,24,4,6,'pants'],[11,29,4,4,'pants'],[17,29,4,4,'pants'],[10,33,4,4,'pants'],[18,33,4,4,'pants'],[12,25,1,5,'legshadow'],[18,25,1,5,'legshadow'],[12,31,1,4,'legshadow'],[19,31,1,4,'legshadow'],[13,26,1,3,'bodyhi'],[17,26,1,3,'bodyhi'],[10,37,5,3,'shoe'],[18,37,5,3,'shoe']]
      },
      back:{
        arms:[[8,10,3,4,'arm'],[8,13,2,4,'armshade'],[8,16,2,4,'arm'],[9,19,2,3,'armhi'],[9,21,2,2,'skin'],[21,10,3,4,'arm'],[22,13,2,4,'armshade'],[22,16,2,4,'arm'],[21,19,2,3,'armhi'],[21,21,2,2,'skin']],
        legs:[[11,24,4,6,'pants'],[17,24,4,6,'pants'],[11,29,4,4,'pants'],[17,29,4,4,'pants'],[10,33,4,4,'pants'],[18,33,4,4,'pants'],[12,25,1,5,'legshadow'],[18,25,1,5,'legshadow'],[12,31,1,4,'legshadow'],[19,31,1,4,'legshadow'],[13,26,1,3,'bodyhi'],[17,26,1,3,'bodyhi'],[10,37,5,3,'shoe'],[18,37,5,3,'shoe']]
      },
      side:{
        arms:[[19,10,3,4,'arm'],[20,13,2,4,'armshade'],[19,16,2,4,'arm'],[18,19,2,3,'armhi'],[18,21,2,2,'skin']],
        legs:[[10,24,5,6,'legback'],[10,29,4,4,'legback'],[9,33,4,4,'legback'],[15,24,5,6,'legfront'],[16,29,4,4,'legfront'],[17,33,4,4,'legfront'],[10,25,1,4,'legshadow'],[15,25,1,3,'bodyhi'],[18,25,1,4,'bodyhi'],[17,30,1,3,'legshadow'],[9,37,5,3,'shoe'],[17,37,5,3,'shoefront']]
      }
    });
    function makeArchetypeRig(spec={}){
      const result={};
      for(const view of ['front','back','side']){
        const side=view==='side',base=BASE_RIG_PARTS[view];
        const arms=base.arms.map(([x,y,w,h,role])=>{
          const right=side||x>=16;
          const dx=side?(spec.sideArmX||0):(right?(spec.rightArmX??spec.armSpread??0):(spec.leftArmX??-(spec.armSpread||0)));
          const dy=side?(spec.sideArmY||0):(right?(spec.rightArmY||0):(spec.leftArmY||0));
          const dw=side?(spec.sideArmW||0):(right?(spec.rightArmW||0):(spec.leftArmW||0));
          return [x+dx,y+dy,Math.max(1,w+dw),h,role];
        });
        const legs=base.legs.map(([x,y,w,h,role])=>{
          const right=side?x>=14:x>=16;
          const spread=view==='back'?(spec.backLegSpread??spec.legSpread):view==='side'?(spec.sideLegSpread??spec.legSpread):spec.legSpread;
          const dx=right?(spec.backRightLegX??spec.rightLegX??spread??0):(spec.backLeftLegX??spec.leftLegX??-(spread||0));
          const dy=right?(spec.backRightLegY??spec.rightLegY??0):(spec.backLeftLegY??spec.leftLegY??0);
          const dw=right?(spec.backRightLegW??spec.rightLegW??0):(spec.backLeftLegW??spec.leftLegW??0);
          const wDelta=(role==='bodyhi'||role==='legshadow')?0:dw;
          return [x+dx,y+dy,Math.max(1,w+wDelta),h,role];
        });
        result[view]={arms,legs};
      }
      return Object.freeze(result);
    }
    const ARCHETYPE_RIG_PARTS=Object.freeze({
      athletic:BASE_RIG_PARTS,
      courier:makeArchetypeRig({leftArmX:1,rightArmX:-1,leftArmY:1,leftLegX:-1,leftLegY:0,sideArmX:3,sideArmY:1}),
      guard:makeArchetypeRig({armSpread:1,leftArmW:1,rightArmW:1,legSpread:1,leftLegW:1,rightLegW:1,sideArmX:2,sideArmY:-2}),
      vendor:makeArchetypeRig({armSpread:-2,leftArmY:1,rightArmY:1,legSpread:1,leftLegW:1,rightLegW:1,sideArmX:-3,sideArmY:2}),
      clinic:makeArchetypeRig({leftArmW:-1,rightArmW:-1,legSpread:-1,leftLegY:0,rightLegY:0}),
      trades:makeArchetypeRig({armSpread:1,leftArmY:1,legSpread:2,leftLegW:1,rightLegW:1,sideArmX:-2,sideArmY:1}),
      youth:makeArchetypeRig({armSpread:-1,leftArmY:1,rightArmY:1,leftArmW:-1,rightArmW:-1,legSpread:-1,leftLegY:0,rightLegY:0,leftLegW:-1,rightLegW:-1}),
      performer:makeArchetypeRig({leftArmX:-2,rightArmX:1,leftArmY:-1,rightArmY:1,leftLegX:-1,rightLegX:1,rightLegY:0,sideArmX:3,sideArmY:2}),
      civic:makeArchetypeRig({armSpread:-1,legSpread:0,backLegSpread:2,backLeftLegW:1,backRightLegW:1,sideLegSpread:2,sideArmX:-2,sideArmY:1}),
      elder:makeArchetypeRig({armSpread:-1,leftArmY:2,rightArmY:2,leftArmW:-1,rightArmW:-1,legSpread:-1,leftLegX:-2,rightLegX:-1,leftLegY:2,rightLegY:2,leftLegW:-1,rightLegW:-1,sideArmX:-3,sideArmY:3})
    });
    // Character-level limb silhouettes add stance and shoulder variation within jobs.
    // Keep profession-specific shoulder and stance profiles readable at native scale.
    const CIV_RIG_VARIANTS=Object.freeze({
      coach:{armSpread:2,armY:1,legSpread:2,legW:1,armPose:'down'},
      ref:{armSpread:-2,armY:-1,legSpread:-2,armPose:'whistle'},
      runner:{armSpread:0,armY:0,legSpread:1,armPose:'swing',legPose:'stride'},
      courier:{armSpread:1,armY:1,legSpread:-1},
      guard:{armSpread:1,armY:-1,legSpread:1,legW:1},
      vendor:{armSpread:-1,armY:1,legSpread:1},
      cook:{armSpread:2,armY:-1,legSpread:-2,legW:1,armPose:'down'},
      clinic:{armSpread:-1,armY:1,legSpread:1,legW:1,sideArmX:-3,sideLegSpread:-3},
      tech:{armSpread:2,armY:-1,legSpread:-2},
      hacker:{armSpread:-2,armY:-1,legSpread:2,legW:-1},
      fisher:{armSpread:2,armY:0,legSpread:2,legW:1,sideArmX:3,sideLegSpread:3},
      sailor:{armSpread:-2,armY:1,legSpread:-2,sideArmX:-2,sideLegSpread:-2},
      slicker:{armSpread:0,armY:-1,legSpread:2,legW:-1},
      painter:{armSpread:-2,armY:1,legSpread:0,legW:2},
      welder:{armSpread:2,armY:0,legSpread:-2,sideArmX:3,sideLegSpread:2,backLeftArmX:1},
      kid:{armSpread:-1,armY:1,legSpread:-1,legW:-1},
      kid2:{armSpread:1,armY:-1,legSpread:1,legW:1},
      mouse:{armSpread:0,armY:-1,legSpread:0,legW:-1},
      busker:{armSpread:-1,armY:-1,legSpread:1,legW:1},
      dancer:{armSpread:-2,armY:1,legSpread:-1,legW:-1},
      broker:{armSpread:1,armY:-1,legSpread:-1,legW:1,
        leftArmX:-2,rightArmX:1,leftArmY:2,rightArmY:-1,
        leftLegX:-3,rightLegX:3,leftLegY:0,rightLegY:0,leftLegW:1,rightLegW:1},
      usher:{armSpread:-2,armY:1,legSpread:2,legW:-1},
      fan:{armSpread:-2,armY:1,legSpread:1}
    });
    const FAN_RIG_VARIANTS=Object.freeze({
      driverA:{armSpread:-3,armY:-1,legSpread:-3,legW:-1,sideArmX:-4,sideLegSpread:-4},
      fan1:{armSpread:3,armY:1,legSpread:3,legW:1,sideArmX:4,sideLegSpread:4},
      fan2:{armSpread:3,armY:-2,legSpread:-3,legW:2,sideArmX:-2,sideLegSpread:2},
      fanA:{armSpread:2,armY:-2,legSpread:-1,legW:1,sideArmX:2,sideLegSpread:-2},
      fanB:{armSpread:4,armY:0,legSpread:-2,legW:2,sideArmX:-4,sideLegSpread:2},
      fanC:{armSpread:3,armY:-2,legSpread:-3,legW:1,sideArmX:4,sideLegSpread:-2},
      fanD:{armSpread:0,armY:2,legSpread:0,legW:2,sideArmX:0,sideLegSpread:0},
      gamer1:{armSpread:2,armY:2,legSpread:3,legW:-1,sideArmX:2,sideLegSpread:4},
      hb_denny:{armSpread:-2,armY:-2,legSpread:-3,legW:1,sideArmX:-2,sideLegSpread:-4},
      hb_pete:{armSpread:3,armY:2,legSpread:0,legW:-1,sideArmX:4,sideLegSpread:0},
      hb_shopper:{armSpread:-3,armY:-2,legSpread:2,legW:1,sideArmX:-4,sideLegSpread:-4},
      hb_splinter:{armSpread:2,armY:0,legSpread:-2,legW:-1,sideArmX:2,sideLegSpread:-4},
      hb_wick:{armSpread:-2,armY:2,legSpread:3,legW:1,sideArmX:-2,sideLegSpread:4},
      patient1:{armSpread:0,armY:-2,legSpread:-3,legW:-1,sideArmX:0,sideLegSpread:-2},
      r2_saltwife:{armSpread:3,armY:0,legSpread:2,legW:-1,sideArmX:4,sideLegSpread:2},
      r2_stack:{armSpread:-3,armY:2,legSpread:-2,legW:1,sideArmX:-4,sideLegSpread:-2},
      regular1:{armSpread:2,armY:-2,legSpread:0,legW:0,sideArmX:2,sideLegSpread:0},
      shopper1:{armSpread:-2,armY:0,legSpread:3,legW:-1,sideArmX:-2,sideLegSpread:2},
      wait1:{armSpread:3,armY:2,legSpread:-2,legW:0,sideArmX:4,sideLegSpread:4},
      wait2:{armSpread:-3,armY:-2,legSpread:0,legW:1,sideArmX:-4,sideLegSpread:0}
    });
    const makeIndividualRig=(archetype,spec={})=>{
      const base=ARCHETYPE_RIG_PARTS[archetype],result={};
      for(const view of ['front','back','side']){
        const side=view==='side';
        let arms=base[view].arms.map(([x,y,w,h,role])=>{
          const right=side||x>=16;
          const dx=side?(spec.sideArmX??spec.armSpread??0):(view==='back'&&!right?(spec.backLeftArmX??spec.leftArmX??-(spec.armSpread||0)):(right?(spec.rightArmX??spec.armSpread??0):(spec.leftArmX??-(spec.armSpread||0))));
          const dy=side?(spec.sideArmY??spec.armY??0):(right?(spec.rightArmY??spec.armY??0):(spec.leftArmY??spec.armY??0));
          const dw=side?(spec.sideArmW??spec.armW??0):(right?(spec.rightArmW??spec.armW??0):(spec.leftArmW??spec.armW??0));
          return [x+dx,y+dy,Math.max(1,w+dw),h,role];
        });
        // Articulated poses replace the generic straight arm blocks for athletics.
        if(spec.armPose==='whistle'){
          // Referee's near arm bends inward and rises to the mouth; the far arm hangs naturally.
          arms=side
            ? [[18,13,2,3,'arm'],[19,11,2,3,'armshade'],[20,9,2,2,'skin']]
            : [[10,14,2,4,'arm'],[10,18,2,3,'armshade'],[11,21,2,2,'skin'],
               [16,14,2,3,'arm'],[18,12,2,3,'armshade'],[20,11,2,2,'skin'],
               [21,12,2,2,'skin']];
        }else if(spec.armPose==='down'){
          arms=side
            ? [[19,13,2,4,'arm'],[18,17,2,3,'armshade'],[18,20,2,2,'skin']]
            : [[10,13,2,4,'arm'],[10,17,2,3,'armshade'],[11,20,2,2,'skin'],
               [20,13,2,4,'arm'],[20,17,2,3,'armshade'],[19,20,2,2,'skin']];
        }else if(spec.armPose==='swing'){
          arms=side
            ? [[20,13,2,4,'arm'],[21,16,2,3,'armshade'],[22,18,2,2,'skin']]
            : [[9,10,2,3,'arm'],[10,13,2,2,'armshade'],[11,15,2,2,'skin'],
               [20,14,2,3,'arm'],[19,17,2,2,'armshade'],[18,19,2,2,'skin']];
        }
        let legs=base[view].legs.map(([x,y,w,h,role])=>{
          const right=side?x>=14:x>=16;
          const spread=side?(spec.sideLegSpread??spec.legSpread):spec.legSpread;
          const dx=side?(spec.sideLegX??spread??0):(right?(spec.rightLegX??spread??0):(spec.leftLegX??-(spread||0)));
          const dy=side?(spec.sideLegY||0):(right?(spec.rightLegY||0):(spec.leftLegY||0));
          const dw=side?(spec.sideLegW??spec.legW??0):(right?(spec.rightLegW??spec.legW??0):(spec.leftLegW??spec.legW??0));
          const wDelta=(role==='bodyhi'||role==='legshadow')?0:dw;
          return [x+dx,y+dy,Math.max(1,w+wDelta),h,role];
        });
        if(spec.legPose==='stride'&&side){
          // Continuous stepped shins run into each boot; no detached toe blocks.
          legs=[[15,24,4,5,'legback'],[14,28,4,5,'legback'],[13,32,4,5,'legback'],
            [21,22,4,5,'legfront'],[22,26,4,5,'legfront'],[23,30,4,6,'legfront'],
            [15,25,1,4,'legshadow'],[21,23,1,4,'bodyhi'],[24,28,1,3,'legshadow'],
            [13,36,5,4,'shoe'],[23,35,5,5,'shoefront']];
        }
        result[view]={arms,legs};
      }
      return Object.freeze(result);
    };
    const CIV_RIG_PARTS=Object.freeze(Object.fromEntries(Object.entries(CIV_TO_ARCHETYPE)
      .map(([civ,archetype])=>[civ,makeIndividualRig(archetype,CIV_RIG_VARIANTS[civ]||{})])));
    const FAN_RIG_PARTS=Object.freeze(Object.fromEntries(Object.entries(FAN_RIG_VARIANTS)
      .map(([id,spec])=>[id,makeIndividualRig(CIV_TO_ARCHETYPE.fan,spec)])));
    const ARCHETYPE_PROP_LAYERS=Object.freeze({
      athletic:{types:{front:'whistle',side:'whistle',back:'jersey-mark'},front:[[1,12,5,5,'duffel'],[26,12,5,5,'duffel'],[21,19,2,2,'whistle']],back:[[1,12,5,5,'duffel'],[26,12,5,5,'duffel'],[7,19,2,2,'whistle']],side:[[25,12,5,6,'duffel'],[17,18,2,2,'whistle']]},
      courier:{types:{front:'parcel',side:'courier-pack',back:'courier-pack'},front:[[5,22,4,8,'satchel'],[22,18,3,3,'parcel']],back:[[24,18,4,11,'satchel'],[7,18,3,3,'parcel']],side:[[11,16,4,11,'satchel'],[17,18,3,3,'parcel']]},
      guard:{types:{front:'baton',side:'baton',back:'guard-plate'},front:[[27,12,4,17,'shield'],[23,15,1,7,'baton']],back:[[1,12,4,17,'shield'],[8,15,1,7,'baton']],side:[[27,12,4,17,'shield'],[18,15,1,7,'baton']]},
      vendor:{types:{front:'bowl',side:'apron-ties',back:'apron-ties'},front:[[6,19,4,2,'bowl']],back:[[8,14,2,10,'apron'],[22,14,2,10,'apron']],side:[[16,19,4,2,'bowl']]},
      clinic:{types:{front:'medical-kit',side:'medical-kit',back:'clinic-yoke'},front:[[22,17,4,4,'medkit']],back:[[8,17,4,4,'medkit']],side:[[17,17,3,3,'medkit']]},
      trades:{types:{front:'wrench',side:'wrench',back:'tool-pocket'},front:[[1,29,5,8,'toolroll'],[22,17,2,5,'wrench']],back:[[26,29,5,8,'toolroll'],[8,17,2,5,'wrench']],side:[[26,29,5,8,'toolroll'],[18,16,2,5,'wrench']]},
      youth:{types:{front:'notebook',side:'backpack',back:'backpack'},front:[[21,18,3,5,'notebook']],back:[[12,12,8,10,'backpack']],side:[[9,13,5,10,'backpack']]},
      performer:{types:{front:'guitar',side:'guitar',back:'guitar-back'},front:[[26,11,5,17,'guitar'],[21,21,1,3,'guitar']],back:[[1,11,5,17,'guitar'],[8,21,1,3,'guitar']],side:[[26,11,5,17,'guitar'],[17,20,1,3,'guitar']]},
      civic:{types:{front:'clipboard',side:'clipboard',back:'coat-tail'},front:[[1,18,5,10,'briefcase'],[7,18,3,4,'clipboard']],back:[[26,18,5,10,'briefcase'],[21,18,3,4,'clipboard']],side:[[26,18,5,10,'briefcase'],[17,17,3,4,'clipboard']]},
      elder:{types:{front:'cardigan-pin',side:'cardigan-back',back:'cardigan-back'},front:[[20,13,2,2,'pin']],back:[],side:[]},
      fan:{types:{front:'fan-crowd-gear',side:'fan-crowd-gear',back:'fan-crowd-gear'},front:[[1,12,5,14,'foamfinger']],side:[[22,12,5,14,'foamfinger']],back:[[22,12,5,14,'foamfinger']]}
    });
    // Individual civilian prop layouts replace repeated archetype-level tools.
    const CIV_PROP_LAYERS=Object.freeze({
      kid2:{types:{front:'notebook',side:'satchel',back:'satchel'},front:[[21,18,3,5,'notebook']],side:[[10,15,3,8,'satchel']],back:[[14,14,4,8,'satchel']]},
      runner:{types:{front:'no-held-prop',side:'no-held-prop',back:'no-held-prop'},front:[],side:[],back:[]},
      coach:{types:{front:'clipboard',side:'clipboard',back:'coach-board'},front:[[22,18,3,7,'clipboard']],side:[[23,17,3,7,'clipboard']],back:[[13,14,6,4,'clipboard']]},
      ref:{types:{front:'whistle',side:'whistle',back:'whistle'},front:[[16,14,2,2,'whistle']],side:[[21,8,2,2,'whistle']],back:[[7,18,2,2,'whistle']]},
      fisher:{types:{front:'fishnet',side:'fishnet',back:'net-roll'},front:[[23,16,3,8,'fishnet']],side:[[25,16,3,8,'fishnet']],back:[[24,15,4,10,'fishnet']]},
      welder:{types:{front:'welding-torch',side:'welding-torch',back:'weld-cylinder'},front:[[23,16,3,7,'weldingtorch']],side:[[24,15,3,7,'weldingtorch']],back:[[18,13,4,12,'weldcylinder']]},
      sailor:{types:{front:'rope-coil',side:'rope-coil',back:'sailor-seam'},front:[[23,17,3,5,'ropecoil']],side:[[24,16,3,5,'ropecoil']],back:[[23,15,4,6,'ropecoil']]},
      painter:{types:{front:'paintbrush',side:'paintbrush',back:'paint-can'},front:[[23,15,3,9,'paintbrush']],side:[[24,15,3,9,'paintbrush']],back:[[24,14,4,9,'paintcan']]},
      slicker:{types:{front:'umbrella',side:'umbrella',back:'umbrella-pack'},front:[[23,13,3,12,'umbrella']],side:[[24,13,3,12,'umbrella']],back:[[24,14,4,10,'umbrella']]},
      cook:{types:{front:'serving-spoon',side:'serving-spoon',back:'apron-tools'},front:[[23,16,3,9,'servingspoon']],side:[[24,16,3,9,'servingspoon']],back:[[23,15,3,9,'servingspoon']]},
      vendor:{types:{front:'serving-tray',side:'serving-tray',back:'apron-ties'},front:[[23,18,5,2,'servingtray']],side:[[24,18,5,2,'servingtray']],back:[[13,16,5,4,'aprontie']]},
      dancer:{types:{front:'ribbon',side:'ribbon',back:'ribbon-tie'},front:[[23,15,3,8,'ribbon']],side:[[24,15,3,8,'ribbon']],back:[[13,14,6,4,'ribbon']]},
      busker:{types:{front:'guitar',side:'guitar',back:'guitar-back'},front:[[24,12,5,17,'guitar']],side:[[24,12,5,17,'guitar']],back:[[9,11,5,17,'guitar']]},
      usher:{types:{front:'lapel-pin',side:'earpiece',back:'radio-pin'},front:[[21,13,2,2,'pin']],side:[[19,12,2,2,'pin']],back:[[20,13,2,2,'pin']]},
      hacker:{types:{front:'no-held-prop',side:'no-held-prop',back:'no-held-prop'},front:[],side:[],back:[]},
      tech:{types:{front:'tablet',side:'tablet',back:'tablet'},front:[[22,17,4,4,'tablet']],side:[[17,17,3,3,'tablet']],back:[[8,17,4,4,'tablet']]}
    });
    const ARCHETYPE_PROP_SHAPES=Object.freeze({
      duffel:['..##.','.####','#####','#####','.####'],
      whistle:['.#.','###','.#.'],
      satchel:['.##.','####','####','.##.','####','####','####','####','####','####','####','.##.','.##.','....'],
      parcel:['.#.','###','###'],
      shield:['.##.','####','####','####','####','####','####','####','####','####','.##.','.##.','..#.','..#.','..#.','....','....'],
      baton:['#','#','#','#','#','#','#'],
      bowl:['.##.','####'],
      medkit:['.##.','####','####','.##.'],
      wrench:['##','.#','.#','.#','##'],
      backpack:['.###.','#####','##.##','##.##','#####','#####','#####','#####','#####','.###.','..#..'],
      tablet:['####','####','####','####'],
      guitar:['..#..','..#..','..#..','..#..','..#..','..#..','..#..','..#..','.###.','.###.','.###.','#####','#####','#####','#####','.###.','.###.'],
      briefcase:['.###.','#####','##.##','#####','#####','#####','#####','#####','.###.','.###.'],
      clipboard:['.##','###','###','.##'],
      notebook:['.##','###','##.','###','###'],
      pin:['.#','##'],
      toolroll:['.###.','#####','##.##','#####','#####','#####','#####','.###.'],
      foamfinger:['..#..','..#..','.###.','.###.','.###.','#####','#####','.####','..###','..###','..###','..###','..#..','..#..'],
      pennant:['#....','##...','###..','####.','#####','####.','###..','##...','#....','#....','#....','#....','#....','#....'],
      megaphone:['.###.','#####','#####','#####','.###.','..##.','..##.','...#.','...#.','...#.','.....','.....','.....','.....'],
      rallytowel:['#####','#####','####.','#####','#####','####.','#####','#####','#####','####.','#####','#####','#####','#####'],
      fishnet:['#.#','.#.','#.#','.#.','#.#','.#.','#.#','.#.'],
      weldingtorch:['#..','##.','.#.','.#.','.#.','.#.','.#.'],
      ropecoil:['###','#.#','###'],
      paintbrush:['.#.','.#.','.#.','.#.','.#.','###','###','###'],
      umbrella:['..#..','.###.','#####','..#..','..#..','..#..','..#..','..#..','..#..','..#..','..#..','..#..'],
      ribbon:['#.#','.#.','###','.#.','#.#','.#.','###','.#.'],
      servingspoon:['.#.','.#.','.#.','.#.','.#.','.#.','###','#.#','###'],
      servingtray:['#####','#####'],
      weldcylinder:['.##.','####','####','####','####','####','####','.##.'],
      paintcan:['.##.','####','#..#','#..#','#..#','####','.##.'],
      aprontie:['#...#','.###.','..#..','.###.','#...#']
    });
    const PROP_ROLE_COLORS=Object.freeze({
      duffel:'#D8A04D',whistle:'#F5D45C',satchel:'#9A6541',parcel:'#D88A45',
      shield:'#65788D',baton:'#C6D3E0',bowl:'#F2F2F8',medkit:'#E8384F',
      wrench:'#AEB8C2',tablet:'#27E0FF',backpack:'#B4FF3A',guitar:'#FF7A1A',briefcase:'#8A5B38',
      clipboard:'#F4F6FF',notebook:'#FF2FA8',pin:'#FFD0EE',toolroll:'#8C9AA8',foamfinger:'#FFD23A',
      pennant:'#FF3B5C',megaphone:'#D7E6FF',rallytowel:'#58FFB0',
      fishnet:'#6DB8C8',weldingtorch:'#F5A623',ropecoil:'#D6B47A',paintbrush:'#E76F51',
      umbrella:'#A78BFA',ribbon:'#FF4FA3',servingspoon:'#D9E2EC',servingtray:'#E8EDF2',
      weldcylinder:'#65717A',paintcan:'#E6B84A',aprontie:'#D9B7C9'
    });
    const FAN_VARIANT_HEADS=Object.freeze({
      driverA:'cap-profile',fan1:'beanie',fan2:'bucket-hat',fanA:'round-fringe',fanB:'visor',
      fanC:'newsboy-cap',fanD:'hair-band',gamer1:'hood',hb_denny:'hat',
      hb_pete:'work-cap',hb_shopper:'cowboy-hat',hb_splinter:'visor',hb_wick:'pom-beanie',
      patient1:'pom-beanie',r2_saltwife:'bucket-hat',r2_stack:'cap-profile',
      regular1:'beanie',shopper1:'cowboy-hat',wait1:'visor',wait2:'newsboy-cap'
    });
    const FAN_VARIANT_PROPS=Object.freeze({
      driverA:'foamfinger',fan1:'pennant',fan2:'megaphone',fanA:'rallytowel',fanB:'foamfinger',
      fanC:'pennant',fanD:'megaphone',gamer1:'rallytowel',hb_denny:'foamfinger',hb_pete:'pennant',
      hb_shopper:'megaphone',hb_splinter:'rallytowel',hb_wick:'foamfinger',patient1:'pennant',
      r2_saltwife:'megaphone',r2_stack:'rallytowel',regular1:'foamfinger',shopper1:'pennant',
      wait1:'megaphone',wait2:'rallytowel'
    });
    const FAN_VARIANT_PALETTES=Object.freeze({
      driverA:{body:'#27e0ff',trim:'#0e2a38',pants:'#10202b',hair:'#1a1410'},
      fan1:{body:'#ff2fa8',trim:'#ffd0ee',pants:'#1a2433',hair:'#2a1a20'},
      fan2:{body:'#ff7a1a',trim:'#ffe0a8',pants:'#2a1a10',hair:'#1a1410'},
      fanA:{body:'#9b5cff',trim:'#d9c2ff',pants:'#21163a',hair:'#14110f'},
      fanB:{body:'#58ffb0',trim:'#d9ffe9',pants:'#0e2a24',hair:'#1a1410'},
      fanC:{body:'#ff3b5c',trim:'#ffd1d8',pants:'#2b1420',hair:'#14110f'},
      fanD:{body:'#ffd23a',trim:'#fff1b8',pants:'#2d2814',hair:'#1a1410'},
      gamer1:{body:'#70a8ff',trim:'#d7e6ff',pants:'#142b54',hair:'#111827'},
      hb_denny:{body:'#2ec4b6',trim:'#c6fff7',pants:'#0f3b3a',hair:'#102a29'},
      hb_pete:{body:'#ff8a65',trim:'#ffe0d4',pants:'#4a1d24',hair:'#241312'},
      hb_shopper:{body:'#c77dff',trim:'#f0d8ff',pants:'#3c096c',hair:'#1b1025'},
      hb_splinter:{body:'#b5e48c',trim:'#e8f7c8',pants:'#1b4332',hair:'#152d22'},
      hb_wick:{body:'#4361ee',trim:'#dbe4ff',pants:'#14213d',hair:'#111827'},
      patient1:{body:'#d8d8e0',trim:'#f4f4f8',pants:'#3a4a5a',hair:'#22232a'},
      r2_saltwife:{body:'#e052a0',trim:'#ffd1e8',pants:'#3b1735',hair:'#21101c'},
      r2_stack:{body:'#f9844a',trim:'#ffe0c2',pants:'#6a2c16',hair:'#23130c'},
      regular1:{body:'#00b4d8',trim:'#c8f6ff',pants:'#003049',hair:'#101820'},
      shopper1:{body:'#a7f3d0',trim:'#e1fff2',pants:'#1d473a',hair:'#172c24'},
      wait1:{body:'#f4d35e',trim:'#fff1b8',pants:'#45321a',hair:'#24170e'},
      wait2:{body:'#90caf9',trim:'#e3f2fd',pants:'#1f3b57',hair:'#172333'}
    });
    const ARCHETYPE_ACCESSORY_ROLES=new Set(['duffel','whistle','tablet','satchel','parcel','shield','baton','bowl','medkit','toolroll','wrench','backpack','guitar','briefcase','clipboard','umbrella','notebook','pin','foamfinger','pennant','megaphone','rallytowel','fishnet','weldingtorch','ropecoil','paintbrush','umbrella','ribbon','servingspoon','servingtray','weldcylinder','paintcan','aprontie']);
    return { CIV_TO_ARCHETYPE, CIV_HEAD_STYLES, ARCHETYPES, PALETTE_ROLES, ARCHETYPE_TORSO_MASKS, CIV_TORSO_MASKS, USHER_TORSO_MASKS, FAN_TORSO_MASKS, BASE_RIG_PARTS, makeArchetypeRig, ARCHETYPE_RIG_PARTS, CIV_RIG_PARTS, FAN_RIG_PARTS, ARCHETYPE_PROP_LAYERS, CIV_PROP_LAYERS, ARCHETYPE_PROP_SHAPES, PROP_ROLE_COLORS, FAN_VARIANT_PALETTES, FAN_VARIANT_HEADS, FAN_VARIANT_PROPS, ARCHETYPE_ACCESSORY_ROLES };
  })();

  function createGrannyRenderer({OWT,og,artShadow}) {
    function drawGrannyVoltSprite(n,dir,moving,tm,ph,ctxOverride,measureOptions){
      const g=ctxOverride||og,scale=OWT/36*.28,sx=(n.rx!=null?n.rx:n.x)*OWT+OWT/2,sy=(n.ry!=null?n.ry:n.y)*OWT+OWT-5;
      // Feet remain pinned; the upper body keeps the existing one-pixel idle breath.
      const frame=Math.floor(tm*(moving?8:6)+(ph||0))%4,bob=[0,-1,0,1][frame],prevBob=[0,-1,0,1][(frame+3)%4];
      const back=dir==='u',side=dir==='l'||dir==='r',facingLeft=dir==='l';
      const omitUmbrella=!!(measureOptions&&measureOptions.excludeUmbrella);
      const omitGroundEffects=!!(measureOptions&&measureOptions.excludeGroundEffects);
      // Keep measurement passes free of contact-shadow and additive glow pixels.
      if(!omitGroundEffects)artShadow(g,sx,sy,OWT*.24,OWT*.075,.75,2);
      g.save();g.translate(sx,sy);g.scale(scale,scale);g.translate(-50,-137);
      // Side views use a narrower profile; left is the mirrored right-facing pose.
      if(side){g.translate(50,0);g.scale(facingLeft?-.72:.72,1);g.translate(-50,0)}
      const ink='#171725',deep='#482B59',skin='#D6A17F';
      const path=(pts,fill,stroke=ink,lw=2)=>{g.beginPath();g.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)g.lineTo(pts[i][0],pts[i][1]);g.closePath();g.fillStyle=fill;g.fill();if(stroke){g.strokeStyle=stroke;g.lineWidth=lw;g.lineJoin='round';g.stroke()}};
      const grad=(x1,y1,x2,y2,stops)=>{const z=g.createLinearGradient(x1,y1,x2,y2);for(const [p,c] of stops)z.addColorStop(p,c);return z};
      const line=(pts,color,width=3)=>{g.beginPath();g.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)g.lineTo(pts[i][0],pts[i][1]);g.strokeStyle=color;g.lineWidth=width;g.lineCap='round';g.lineJoin='round';g.stroke()};
    
      // Narrow two-pixel trouser legs with a deliberately asymmetric stance.
      // Each leg is a compact polygon rather than a thick round-ended stroke.
      path([[37,93],[41,93],[40,105],[37,117],[36,130],[32,130],[33,117],[36,105]],grad(35,98,42,124,[[0,'#A69AAF'],[.55,'#51475E'],[1,'#262538']]),ink,1);
      path([[58,93],[62,94],[64,105],[69,116],[71,129],[67,130],[65,117],[60,106]],grad(58,98,69,124,[[0,'#B8ACBF'],[.45,'#70647C'],[1,'#302A3C']]),ink,1);
      // One-pixel dark-brown ankle breaks separate trousers from the shoes.
      // One-pixel knee creases define the transition from thigh to calf.
      g.fillStyle='#30283A';g.fillRect(36,111,1,1);g.fillRect(66,111,1,1);
      line([[33,129],[36,129]],'#39251F',1);line([[68,129],[71,129]],'#39251F',1);
      // Three-pixel dark shoe blocks, each nudged forward for the three-quarter stance.
      path([[29,130],[35,130],[38,133],[38,136],[29,136],[27,134]],'#292638',ink,1);
      path([[68,130],[74,130],[77,133],[78,136],[69,136],[66,133]],'#292638',ink,1);
      line([[29,135],[37,135]],'#141622',1);line([[69,135],[77,135]],'#141622',1);
    
      // Upper body bobs; umbrella is behind the head and jacket.
      g.save();g.translate(0,bob/scale);
      // Rounded dome canopy with a distinct pointed crown, raised three pixels.
      if(!omitUmbrella){
      g.save();g.translate(3,-3);
      g.beginPath();g.moveTo(47,2);
      g.quadraticCurveTo(31,2,21,8);
      g.bezierCurveTo(15,12,12,17,12,23);
      g.quadraticCurveTo(18,20,24,25);
      g.quadraticCurveTo(30,21,36,25);
      g.quadraticCurveTo(42,21,48,25);
      g.quadraticCurveTo(55,21,61,25);
      g.quadraticCurveTo(68,20,79,23);
      g.quadraticCurveTo(76,12,65,7);
      g.quadraticCurveTo(56,2,47,2);g.closePath();
      g.fillStyle=grad(18,4,72,25,[[0,'#FF8ACB'],[.36,'#E72D9D'],[.72,'#A91D77'],[1,'#661C59']]);g.fill();
      g.strokeStyle=ink;g.lineWidth=2.2;g.stroke();
      // Subtle canopy panels; keep the silhouette clean rather than stripy.
      line([[47,4],[47,23]],'#FFD2ED',1.2);
      line([[22,10],[32,22]],'#FFB3DF',1.15);
      line([[69,10],[59,22]],'#B51E78',1.15);
      line([[14,22],[23,24],[30,22],[37,24],[48,22],[59,24],[68,22],[78,23]],'#FF9FD8',1.25);
      line([[14,22],[20,11],[31,5]],'#FF9A3D',1.4);
      line([[64,6],[75,15],[79,23]],'#29F2E8',1.4);
      g.restore();
      }
      // Shift the head and umbrella grip one pixel right; canopy remains untouched.
      g.save();g.translate(1,0);
      // Shaft descends beside the viewer-right cheek to the raised gripping hand.
      if(!omitUmbrella)line([[65,18],[64,38]],'#D7C5AA',1);
      // Hand is a crisp 2x2 skin-colored grip at cheek/chin height.
      g.fillStyle=skin;g.fillRect(63,37,2,2);
      g.strokeStyle=ink;g.lineWidth=1;g.strokeRect(63,37,2,2);
      g.fillStyle='#F1C3A1';g.fillRect(63,37,1,1);
    
      // Neck, face and hair change by facing: back has no visible face, side has a profile.
      path([[43,38],[55,38],[57,48],[44,49]],'#B97966');
      if(!back){
        const faceX=side?(facingLeft?45:53):49;
        g.beginPath();g.ellipse(faceX,30,side?10:13,16,-.12,0,Math.PI*2);
        g.fillStyle=grad(37,22,61,38,[[0,'#F0C09D'],[.45,skin],[1,'#996052']]);g.fill();
        g.strokeStyle=ink;g.lineWidth=1.8;g.stroke();
        if(side){
          const noseX=facingLeft?34:64;
          path([[noseX,29],[noseX+(facingLeft?-3:3),32],[noseX,34]],skin,ink,1);
          line([[facingLeft?40:58,29],[facingLeft?42:60,29]],'#202A3A',1);
        }else{
          line([[48,29],[57,29]],'#202A3A',1);
          line([[52,40],[55,40]],'#8D554E',1);
        }
      }else{
        // Back-facing silver hair mass replaces the face; the nape remains visible.
        g.beginPath();g.ellipse(49,30,13,16,0,0,Math.PI*2);
        g.fillStyle=grad(36,17,62,43,[[0,'#D9DCE3'],[.45,'#AEB4C2'],[1,'#55576B']]);g.fill();
        g.strokeStyle=ink;g.lineWidth=1.8;g.stroke();
        line([[40,27],[44,36],[49,39],[55,35],[59,26]],'#85899D',1.4);
      }
      // Silver hair cap and side sweep. Keep the existing one-frame hair lag.
      g.save();g.translate(0,(prevBob-bob)/scale);
      g.beginPath();g.moveTo(36,31);g.quadraticCurveTo(32,11,48,10);
      g.quadraticCurveTo(68,8,66,28);g.lineTo(61,42);
      g.quadraticCurveTo(57,35,57,26);g.quadraticCurveTo(48,33,36,31);g.closePath();
      g.fillStyle=grad(35,12,65,35,[[0,'#D9DCE3'],[.35,'#C6CAD5'],[.72,'#85899D'],[1,'#55576B']]);g.fill();
      g.strokeStyle=ink;g.lineWidth=2;g.stroke();
      // Muted silver-gray hair sheen follows the cap's curve without a bright block.
      line([[39,19],[45,16],[50,15],[56,16]],'#AEB4C2',1.2);
      g.beginPath();g.ellipse(36,23,7.5,6.5,-.4,0,Math.PI*2);g.fillStyle='#AEB4C2';g.fill();g.strokeStyle=ink;g.lineWidth=1.5;g.stroke();
      g.restore();
      g.restore(); // end one-pixel head/grip shift
    
      // Shift the jacket/hip mass one pixel right; skirt and legs stay centered.
      g.save();g.translate(1,0);
      // Jacket and skirt volume: deep umbrella cast shadow on the hairline/face,
      // plus the requested left-side purple highlight.
      path([[35,49],[45,46],[59,48],[68,56],[70,83],[65,97],[34,96],[29,83],[30,60]],grad(30,49,68,88,[[0,'#C27CC0'],[.28,'#98539F'],[.62,'#75417F'],[1,'#43294F']]));
      path([[34,91],[67,91],[73,111],[66,116],[31,113],[27,108]],grad(30,96,70,112,[[0,'#A66AAB'],[.45,'#74427F'],[1,'#382643']]));
      if(!back&&!side){
        // Front jacket: collar, lapels, front seam and small buttons.
        g.fillStyle='#2A1335';g.fillRect(45,47,9,1);
        path([[38,19],[47,17],[58,19],[63,25],[58,27],[48,24],[40,26]],'#2A1335',null);
        path([[33,53],[43,49],[47,53],[45,88],[38,94],[31,87]],'#B35BCE',null);
        path([[59,50],[67,56],[69,83],[63,93],[57,88],[60,67]],'#4D2D60',null);
        line([[36,57],[39,74],[37,87]],'#E3A2D9',1.8);
        line([[62,60],[60,77],[64,87]],'#33223F',2);
        line([[40,94],[51,96],[64,93]],'#E7A8DA',1.5);
        line([[34,96],[45,97],[56,97],[66,95]],'#70477D',1/scale);
        line([[35,97],[45,98],[56,98],[65,96]],'rgba(190,116,184,.48)',.8/scale);
        line([[31,113],[42,114],[55,114],[66,112]],'#2A1335',1/scale);
        line([[32,111],[43,113],[55,113],[66,111]],'rgba(255,47,168,.42)',1.15/scale);
        path([[42,49],[49,56],[54,49],[58,53],[52,62],[46,59]],'#F0B5E0',ink,1.4);
        line([[50,60],[49,88]],'#4A2C58',1.6);
        [66,74,82].forEach(y=>{g.beginPath();g.arc(50,y,1.2,0,7);g.fillStyle='#FFE1F4';g.fill()});
        g.beginPath();g.arc(40,70,3,0,7);g.fillStyle='#FFD15B';g.fill();g.strokeStyle=ink;g.lineWidth=1;g.stroke();
      }else if(back){
        // Back-facing jacket: broad shoulder yoke, center seam and skirt pleats.
        path([[33,52],[42,49],[58,49],[67,54],[64,66],[36,66]],'#62386F',ink,1);
        line([[50,54],[50,94]],'#2A1335',1.8);
        line([[37,69],[40,88],[36,96]],'#B35BCE',1.5);
        line([[63,69],[60,88],[64,96]],'#4D2D60',1.5);
        line([[33,111],[43,113],[56,113],[67,111]],'#2A1335',1.2);
        path([[42,49],[50,56],[58,49],[55,61],[50,65],[45,61]],'#8D5A99',ink,1);
      }else{
        // Side-facing jacket: a narrow profile seam and one visible side pocket.
        path([[43,51],[55,49],[62,57],[61,88],[56,96],[42,94],[39,76]],'#75417F',ink,1);
        line([[52,57],[52,91]],'#2A1335',1.6);
        path([[54,78],[60,78],[60,86],[54,86]],'#B35BCE',ink,1);
        line([[44,96],[55,97],[60,94]],'#E7A8DA',1.2);
      }
    
      // Left arm (viewer-left) hangs naturally at the side: narrow sleeve and 2x2 hand.
      path([[34,55],[38,57],[35,68],[34,81],[30,81],[31,67]],grad(30,56,38,79,[[0,'#B66FC0'],[.55,'#75417F'],[1,'#43294F']]),ink,1);
      // Separate the resting arm from the jacket with a dark inner edge and light outer rim.
      line([[31,59],[30,70],[30,80]],'#392448',1);
      line([[29,61],[28,72],[29,80]],'#DFA0DA',1);
      // One-pixel sleeve-to-hand crease makes the resting hand read cleanly.
      line([[30,80],[32,80]],'#392448',1);
      g.fillStyle=skin;g.fillRect(30,81,2,2);
      g.strokeStyle=ink;g.lineWidth=1;g.strokeRect(30,81,2,2);
      // Right arm (viewer-right) rises from shoulder, bends at elbow, and joins the grip.
      // Elbow moves one pixel left in screen space while the shoulder follows the torso.
      path([[61,53],[65,53],[67,47],[66,43],[65,41],[62,45],[65,47],[63,50]],grad(61,42,70,53,[[0,'#D09AD5'],[.5,'#85498F'],[1,'#4B2C5C']]),ink,1);
      // Forearm shifts one pixel less than the torso so it meets the right-shifted grip.
      path([[62,44],[65,45],[64,38],[61,37],[60,41]],grad(60,38,65,45,[[0,'#D09AD5'],[1,'#4B2C5C']]),ink,1);
      g.restore(); // end one-pixel hip/jacket shift
    
      // Preserve the existing rim-light pass exactly; do not alter its color, width or placement.
      // One-screen-pixel rim accents, broken into directional top/side hits rather than a full outline.
      g.save();g.globalAlpha=.62;g.shadowBlur=.65/scale;g.shadowColor='rgba(255,154,61,.38)';
      line([[36,53],[39,49],[45,47]],'rgba(255,177,104,.86)',1/scale);
      line([[31,57],[28,64],[29,69]],'rgba(255,154,61,.78)',1/scale);
      g.shadowColor='rgba(41,242,232,.34)';
      line([[57,49],[64,51],[68,56]],'rgba(113,245,229,.82)',1/scale);
      line([[68,57],[72,65],[72,71]],'rgba(41,210,211,.76)',1/scale);
      g.restore();
      // Close the upper-body bob group and character transform.
      g.restore();g.restore();
      // Preserve the existing subtle additive bounce around the planted feet.
      if(!omitGroundEffects){
      g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.16;
      let glow=g.createRadialGradient(sx,sy-OWT*.025,1,sx,sy-OWT*.025,OWT*.34);
      glow.addColorStop(0,'rgba(41,242,232,.26)');glow.addColorStop(.48,'rgba(255,47,168,.12)');glow.addColorStop(1,'rgba(41,242,232,0)');
      g.fillStyle=glow;g.beginPath();g.ellipse(sx,sy-OWT*.025,OWT*.34,OWT*.17,0,0,7);g.fill();g.restore();
      }
    }
    return drawGrannyVoltSprite;
  }

  // Usher drawn the way Granny is drawn: vector paths + gradients on the same 100x140 source grid,
// same anchor, same scale rule, same ink colour. PROPOSED art, not wired into the game.
function drawUsherVector(n, dir, ctx, OWT, opts) {
  opts = opts || {};
  const g = ctx, scale = OWT / 36 * .28;
  const sx = (n.rx != null ? n.rx : n.x) * OWT + OWT / 2, sy = (n.ry != null ? n.ry : n.y) * OWT + OWT - 5;
  const back = dir === 'u', side = dir === 'l' || dir === 'r', facingLeft = dir === 'l';
  g.save(); g.translate(sx, sy); g.scale(scale, scale); g.translate(-50, -137);
  if (facingLeft) { g.translate(50, 0); g.scale(-1, 1); g.translate(-50, 0); }
  const ink = '#171725', skin = '#C98A62', pink = '#D6A84F', pinkHi = '#F4D58A', pinkLo = '#8A6428';
  const path = (pts, fill, stroke = ink, lw = 1.6) => { g.beginPath(); g.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]); g.closePath(); g.fillStyle = fill; g.fill(); if (stroke) { g.strokeStyle = stroke; g.lineWidth = lw; g.lineJoin = 'round'; g.stroke(); } };
  const grad = (x1, y1, x2, y2, stops) => { const z = g.createLinearGradient(x1, y1, x2, y2); for (const [p, c] of stops) z.addColorStop(p, c); return z; };
  const line = (pts, color, width = 2) => { g.beginPath(); g.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]); g.strokeStyle = color; g.lineWidth = width; g.lineCap = 'round'; g.lineJoin = 'round'; g.stroke(); };
  const jacketG = (x1, x2) => grad(x1, 50, x2, 98, [[0, '#718DAF'], [.4, '#294B70'], [1, '#142A43']]);
  const pantsL = grad(36, 93, 48, 130, [[0, '#A9BED0'], [.48, '#7189A3'], [1, '#3D536B']]);
  const pantsR = grad(52, 93, 64, 130, [[0, '#91A9C0'], [.48, '#647E99'], [1, '#344B64']]);
  const sleeveG = (x1, x2) => grad(x1, 54, x2, 86, [[0, '#8AA5C1'], [.5, '#3F6284'], [1, '#1C3855']]);
  const shoe = grad(34, 130, 66, 136, [[0, '#777B8B'], [1, '#414357']]);
  const ell = (cx, cy, rx, ry, fill, stroke = ink, lw = 1.6, rot = 0) => { g.beginPath(); g.ellipse(cx, cy, rx, ry, rot, 0, Math.PI * 2); g.fillStyle = fill; g.fill(); if (stroke) { g.strokeStyle = stroke; g.lineWidth = lw; g.stroke(); } };
  const board = (x, y, w, h, face) => {
    path([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], face ? '#EDE8D8' : grad(x, y, x + w, y + h, [[0, '#D89A5A'], [1, '#8F5B33']]), ink, 1.4);
    if (face) { for (let i = 0; i < 4; i++) line([[x + 2, y + 5 + i * 4], [x + w - 2, y + 5 + i * 4]], '#7F7392', 1); }
    path([[x + w * .28, y - 3], [x + w * .72, y - 3], [x + w * .72, y + 3], [x + w * .28, y + 3]], '#C6D3E0', ink, 1.2);
  };
  const cap = (cx, front) => {
    // flat usher cap: dome, pink band, small badge
    g.beginPath(); g.moveTo(cx - 15, 23); g.quadraticCurveTo(cx - 16, 8, cx, 8); g.quadraticCurveTo(cx + 16, 8, cx + 15, 23); g.closePath();
    g.fillStyle = grad(cx - 15, 8, cx + 15, 23, [[0, '#718DAF'], [.6, '#294B70'], [1, '#142A43']]); g.fill(); g.strokeStyle = ink; g.lineWidth = 1.8; g.stroke();
    line([[cx - 14, 22], [cx, 24], [cx + 14, 22]], pink, 3.2);
    line([[cx - 9, 12], [cx - 2, 10]], '#A58CC4', 1.2);
    if (front) { path([[cx - 4, 14], [cx + 4, 14], [cx + 3, 20], [cx, 21], [cx - 3, 20]], pinkHi, ink, 1); }
  };
  const hairG = grad(34, 14, 64, 46, [[0, '#4A3C4E'], [.5, '#241B26'], [1, '#14101A']]);

  // ---------------- legs & shoes ----------------
  if (!side) {
    path([[38, 93], [49, 93], [48, 108], [47, 120], [47, 130], [37, 130], [38, 120], [38, 108]], pantsL, ink, 1.4);
    path([[51, 93], [62, 93], [62, 108], [62, 120], [63, 130], [53, 130], [52, 120], [51, 108]], pantsR, ink, 1.4);
    line([[41, 104], [44, 104]], '#1D1936', 1); line([[56, 104], [59, 104]], '#1D1936', 1);
    path([[36, 130], [47, 130], [49, 133], [49, 136], [35, 136], [34, 133]], shoe, ink, 1.4);
    path([[53, 130], [64, 130], [66, 133], [66, 136], [52, 136], [52, 133]], shoe, ink, 1.4);
    line([[36, 135], [48, 135]], '#120F20', 1); line([[54, 135], [65, 135]], '#120F20', 1);
    line([[37, 131], [43, 131]], '#6E849B', 1); line([[54, 131], [60, 131]], '#6E849B', 1);
  } else {
    // Side stance: retain two readable trouser planes at 28x42 rather than
    // letting the far leg and shoe collapse into one near-black column.
    const sideFarPants = grad(38, 93, 50, 130, [[0, '#607993'], [.55, '#405B78'], [1, '#2C4058']]);
    const sideNearPants = grad(46, 93, 59, 130, [[0, '#B4C8D8'], [.48, '#829BB3'], [1, '#4B647D']]);
    const sideShoe = grad(36, 130, 66, 136, [[0, '#526176'], [.58, '#354257'], [1, '#202A3B']]);
    path([[40, 93], [50, 93], [49, 108], [47, 120], [46, 130], [37, 130], [38, 120], [39, 108]], sideFarPants, ink, 1.4);
    path([[37, 130], [47, 130], [52, 133], [53, 136], [36, 136]], sideShoe, ink, 1.4);
    path([[46, 93], [57, 93], [57, 108], [58, 120], [59, 130], [49, 130], [48, 120], [47, 108]], sideNearPants, ink, 1.4);
    path([[48, 130], [59, 130], [65, 133], [66, 136], [47, 136], [47, 133]], sideShoe, ink, 1.4);
    line([[48, 135], [65, 135]], '#111827', 1.8); line([[50, 131], [56, 131]], '#9AA9BC', 1.1);
  }

  // ---------------- upper body ----------------
  if (!side) {
    // neck
    path([[44, 40], [55, 40], [56, 50], [43, 50]], back ? '#A8704F' : '#B97F5C', ink, 1.4);
    // jacket
    path([[35, 53], [43, 48], [57, 48], [65, 53], [67, 62], [66, 84], [68, 99], [32, 99], [34, 84], [33, 62]], jacketG(33, 67), ink, 1.8);
    if (!back) {
      // collar V + lapels
      path([[43, 48], [50, 60], [57, 48], [55, 47], [50, 54], [45, 47]], skin, null);
      path([[40, 50], [49, 62], [46, 66], [38, 55]], '#355777', ink, 1.2);
      path([[60, 50], [51, 62], [54, 66], [62, 55]], '#1C3855', ink, 1.2);
      line([[41, 52], [48, 61]], pink, 2.4); line([[59, 52], [52, 61]], pink, 2.4);
      line([[50, 62], [50, 98]], '#241632', 1.5);
      [72, 82, 92].forEach(y => { ell(50, y, 1.0, 1.0, '#B8C6D4', null); });
      // name badge
      path([[56, 65], [66, 65], [66, 74], [56, 74]], '#E6D5A4', ink, 1.2); path([[59, 67], [63, 67], [63, 72], [59, 72]], '#314C67', null); line([[57, 75], [65, 75]], '#B7C7D6', 1);
      // hem trim
      line([[34, 97], [50, 99], [66, 97]], pink, 3);
      path([[36, 99], [64, 99], [64, 103], [36, 103]], '#8FA6BC', ink, 1); path([[48, 99], [53, 99], [53, 103], [48, 103]], '#D6A84F', ink, .8);
      // hanging right arm (viewer-left)
      path([[33, 55], [38, 54], [37, 72], [36, 88], [30, 88], [31, 72]], sleeveG(30, 38), ink, 1.4);
      line([[30.5, 85], [36.5, 85]], pink, 3);
      path([[30, 88], [36, 88], [36, 94], [30, 94]], skin, ink, 1.2);
      // bent left arm (viewer-right) holding clipboard
      path([[62, 54], [67, 55], [69, 68], [66, 80], [58, 82], [57, 76], [62, 74], [63, 66]], sleeveG(57, 69), ink, 1.4);
      board(50, 60, 15, 19, true);
      path([[50, 74], [60, 74], [61, 82], [51, 83]], sleeveG(50, 61), ink, 1.3);
      line([[50.5, 79], [58, 80]], pink, 3);
      ell(48, 78, 3.4, 3.2, skin, ink, 1.3);
    } else {
      // back: yoke, centre seam, short coat tail
      path([[34, 54], [43, 49], [57, 49], [66, 54], [65, 66], [35, 66]], '#294B70', ink, 1.2);
      line([[50, 52], [50, 98]], '#241632', 1.6);
      line([[34, 97], [50, 99], [66, 97]], pink, 3);
      path([[39, 99], [49, 99], [49, 109], [44, 111], [39, 108]], '#172A40', ink, 1.3);
      path([[51, 99], [61, 99], [61, 108], [56, 111], [51, 109]], '#203B59', ink, 1.3);
      // viewer-left = character's left arm (clipboard hand hidden in front)
      path([[33, 55], [38, 54], [38, 70], [36, 82], [30, 80], [31, 68]], sleeveG(30, 38), ink, 1.4);
      line([[30.5, 78], [36.5, 80]], pink, 3);
      // viewer-right = character's right arm, hanging, hand visible
      path([[62, 54], [67, 55], [69, 72], [70, 88], [64, 88], [63, 72]], sleeveG(62, 70), ink, 1.4);
      line([[64, 85], [70, 85]], pink, 3);
      path([[64, 88], [70, 88], [70, 94], [64, 94]], skin, ink, 1.2);
    }
  } else {
    // side (facing right)
    path([[44, 40], [54, 40], [55, 50], [43, 50]], '#B97F5C', ink, 1.4);
    path([[43, 53], [49, 48], [57, 50], [61, 56], [60, 84], [62, 99], [38, 99], [41, 84], [40, 60]], grad(40, 50, 62, 98, [[0, '#718DAF'], [.45, '#294B70'], [1, '#142A43']]), ink, 1.8);
    line([[39, 97], [50, 99], [61, 97]], pink, 3);
    path([[41, 99], [60, 99], [60, 102], [41, 102]], '#8FA6BC', ink, .9);
    path([[38, 94], [43, 96], [41, 105], [37, 101]], '#172A40', ink, 1.2);   // short rear tail
    line([[56, 56], [57, 96]], '#241632', 1.3);
    ell(57, 74, 1.2, 1.2, '#FFD0EE', null); ell(57, 84, 1.2, 1.2, '#FFD0EE', null);
    // One near arm carries the clipboard. Draw the board first, then
    // the connected bent sleeve/forearm and gripping hand over its lower edge.
    // The far hand and the formerly hanging near arm are intentionally hidden.
    board(57, 60, 10, 19, true);
    line([[59,62],[65,61]],'#D6A84F',1.6);
    line([[59,67],[65,66]],'#6E849B',.9);
    // Continuous near-arm chain: shoulder -> elbow -> forearm -> board grip.
    path([[44,54],[50,54],[54,59],[56,67],[61,73],[59,79],
          [54,78],[51,71],[49,63]], sleeveG(44,61), ink, 1.4);
    path([[54,73],[60,73],[63,78],[60,82],[55,80],[52,77]], '#8FA6BC', ink, 1.15);
    line([[55,77],[61,78]], pink, 2.2);
    // Single visible hand wraps the board's lower/front edge.
    path([[57,78],[62,78],[65,81],[63,85],[58,84],[55,81]], skin, ink, 1.2);
    line([[58,81],[62,82]], '#9A5E45', 1);
  }

  // ---------------- head ----------------
  if (!side) {
    if (!back) {
      ell(49, 30, 11.8, 15.2, grad(37, 18, 61, 44, [[0, '#E2AC85'], [.5, skin], [1, '#8F5A45']]), ink, 1.8, -.06);
      // hair sides + fringe under cap
      path([[36, 24], [35, 40], [39, 46], [40, 30]], hairG, ink, 1.4); path([[62, 24], [63, 40], [59, 46], [58, 30]], hairG, ink, 1.4);
      ell(44.2, 31, 1.45, 2.15, '#171725', null); ell(54.2, 31, 1.45, 2.15, '#171725', null);
      ell(44.7, 30.3, .45, .5, '#FFFFFF', null); ell(54.7, 30.3, .45, .5, '#FFFFFF', null);
      // Usher's composed, slightly hooded gaze and one subtly lifted brow.
      line([[40.5, 27], [45.5, 25.4], [47, 26]], '#30212B', 1.7); line([[52.5, 25.5], [57.5, 27]], '#30212B', 1.35);
      line([[49, 32.5], [47.8, 36.8], [50.5, 37]], '#9A5E45', 1.25);
      line([[46, 41], [49, 41.8], [52, 40.8]], '#6E3940', 1.35);
      // visor
      path([[37, 24], [61, 24], [64, 27], [49, 30], [34, 27]], '#2A1A3A', ink, 1.4);
      line([[38, 25.5], [60, 25.5]], '#6F8EAA', .9);
      cap(49, true);
      // Brow line sits below the visor so Usher's composed gaze survives headwear overlap.
      line([[41,29.7],[45,29.1],[47,29.6]],'#30212B',1.45);line([[52,29.4],[56,29.8]],'#30212B',1.25);
    } else {
      ell(49, 30, 13, 15.5, hairG, ink, 1.8);
      line([[40, 27], [44, 37], [49, 40], [55, 36], [59, 27]], '#4A3C4E', 1.2);
      cap(49, false);
      path([[44, 44], [55, 44], [54, 49], [45, 49]], '#B97F5C', null);
      ctxNoop();
    }
  } else {
    // profile, facing right
    ell(49, 30, 11, 15, hairG, ink, 1.8);
    ell(53, 31, 9, 13.5, grad(44, 18, 62, 44, [[0, '#E2AC85'], [.55, skin], [1, '#8F5A45']]), ink, 1.6, -.04);
    path([[61, 29], [66, 33], [61, 36]], skin, ink, 1.2);                       // nose
    ell(44, 31, 2.2, 3.2, '#B07050', ink, 1, 0);                                   // ear
    ell(57, 30.5, 1.35, 2, '#171725', null); ell(57.4, 29.9, .4, .45, '#FFFFFF', null);
    line([[53.5, 26.8], [58.8, 25.6]], '#30212B', 1.55);
    line([[56, 39.5], [59.5, 40]], '#6E3940', 1.25);
    // visor to the front
    path([[50, 24], [62, 24], [71, 27], [62, 29], [50, 28]], '#142A43', ink, 1.4);
    line([[52, 25.5], [66, 26]], '#718DAF', .9);
    line([[54,29.4],[58.5,29]],'#30212B',1.4);
    cap(48, false);
    path([[56, 15], [63, 21], [60, 22], [54, 16]], '#203B59', null);
  }

  // ---------------- rim light (same recipe as Granny) ----------------
  g.save(); g.globalAlpha = .62; g.shadowBlur = .65 / scale; g.shadowColor = 'rgba(255,154,61,.38)';
  if (!side) {
    line([[36, 53], [40, 49], [46, 47]], 'rgba(255,177,104,.86)', 1 / scale);
    line([[32, 58], [29, 66], [30, 72]], 'rgba(255,154,61,.78)', 1 / scale);
    g.shadowColor = 'rgba(41,242,232,.34)';
    line([[56, 48], [63, 50], [67, 55]], 'rgba(113,245,229,.82)', 1 / scale);
    line([[68, 58], [71, 66], [71, 72]], 'rgba(41,210,211,.76)', 1 / scale);
  } else {
    line([[44, 52], [47, 49], [52, 48]], 'rgba(255,177,104,.86)', 1 / scale);
    g.shadowColor = 'rgba(41,242,232,.34)';
    line([[60, 52], [62, 58], [62, 66]], 'rgba(113,245,229,.82)', 1 / scale);
  }
  g.restore();
  g.restore();
  function ctxNoop() {}
};



  // Cook: original kitchen silhouette, tall pleated toque, double-breasted coat,
  // cross-tied terracotta apron, and a readable handled sauté pan. 100x140 grid.
  function drawCookVector(n, dir, ctx, OWT, opts) {
    opts=opts||{}; const g=ctx, scale=OWT/36*.28;
    const sx=(n.rx!=null?n.rx:n.x)*OWT+OWT/2, sy=(n.ry!=null?n.ry:n.y)*OWT+OWT-5;
    const back=dir==='u', side=dir==='l'||dir==='r', flip=dir==='l';
    g.save();g.translate(sx,sy);g.scale(scale,scale);g.translate(-50,-139);
    if(flip){g.translate(50,0);g.scale(-1,1);g.translate(-50,0);}
    const ink='#171725', skin='#B97855';
    const grad=(x1,y1,x2,y2,stops)=>{const z=g.createLinearGradient(x1,y1,x2,y2);stops.forEach(([p,c])=>z.addColorStop(p,c));return z;};
    const path=(p,fill,stroke=ink,w=1.6)=>{g.beginPath();g.moveTo(p[0][0],p[0][1]);p.slice(1).forEach(v=>g.lineTo(v[0],v[1]));g.closePath();g.fillStyle=fill;g.fill();if(stroke){g.strokeStyle=stroke;g.lineWidth=w;g.lineJoin='round';g.stroke();}};
    const line=(p,c,w=1.5)=>{g.beginPath();g.moveTo(p[0][0],p[0][1]);p.slice(1).forEach(v=>g.lineTo(v[0],v[1]));g.strokeStyle=c;g.lineWidth=w;g.lineCap='round';g.lineJoin='round';g.stroke();};
    const ell=(x,y,rx,ry,fill,stroke=ink,w=1.4)=>{g.beginPath();g.ellipse(x,y,rx,ry,0,0,Math.PI*2);g.fillStyle=fill;g.fill();if(stroke){g.strokeStyle=stroke;g.lineWidth=w;g.stroke();}};
    const coat=grad(34,48,67,99,[[0,'#F8EBD2'],[.45,'#D9C6A6'],[1,'#9E8A72']]);
    const apron=grad(36,68,65,113,[[0,'#D66B42'],[.5,'#A84432'],[1,'#642D32']]);
    const pants=grad(37,96,64,132,[[0,'#414451'],[1,'#202431']]);
    // Legs are broad and planted beneath the apron, unlike the narrow usher trousers.
    if(!side){
      path([[38,103],[49,103],[48,119],[48,131],[36,131],[37,118]],pants);
      path([[51,103],[63,103],[63,119],[65,131],[53,131],[52,118]],pants);
      path([[36,129],[48,129],[50,134],[49,137],[33,137],[33,134]],'#34303A');
      path([[53,129],[65,129],[68,134],[67,137],[51,137],[51,134]],'#34303A');
      line([[36,135],[47,135]],'#A7A2A0',1);line([[54,135],[65,135]],'#A7A2A0',1);
    }else{
      path([[40,101],[53,101],[52,120],[53,131],[40,131],[39,119]],pants);
      path([[39,129],[52,129],[57,134],[56,137],[37,137]],'#34303A');
      line([[40,135],[54,135]],'#A7A2A0',1);
    }
    // Neck and coat: broad chef shoulders, high double-breasted collar.
    path([[44,39],[56,39],[57,52],[43,52]],skin);
    if(!side){
      path([[27,54],[38,46],[62,46],[73,54],[72,91],[77,101],[23,101],[28,90]],coat,ink,1.9);
      if(!back){
        path([[41,47],[50,59],[59,47],[56,44],[50,52],[44,44]],'#FFF8E9',ink,1.1);
        line([[50,59],[50,96]],'#8C7966',1.2);
        [65,76,87].forEach(y=>{ell(45,y,1.5,1.5,'#8B5B43',null);ell(55,y,1.5,1.5,'#8B5B43',null);});
        // Apron bib, broad waist, shaped lower panel and stitched hem.
        path([[36,59],[64,59],[68,76],[73,111],[27,111],[32,76]],apron,ink,1.8);
        line([[40,59],[38,69],[34,72]],'#E9A17A',1.6);
        line([[60,59],[62,69],[66,72]],'#E9A17A',1.6);
        line([[35,105],[65,105]],'#F0A078',1.4);
        path([[42,82],[58,82],[58,94],[42,94]],'#7B3540',ink,1.1);
        line([[45,85],[55,85]],'#F4C49C',1);line([[45,89],[53,89]],'#F4C49C',1);
        // Sleeves and hands: left arm rests at hip; right arm presents the pan.
        path([[27,54],[36,53],[34,77],[31,89],[23,88],[24,69]],coat);
        path([[27,86],[34,86],[35,94],[28,95]],skin);
        path([[64,53],[73,54],[77,68],[75,78],[78,84],[73,89],[68,84],[70,77],[66,69]],coat);
        // A distinct cuff bridges the sleeve to the gripping hand.
        path([[68,74],[76,75],[78,82],[73,86],[67,83]],'#C8B89F',ink,1.1);
        // The handle and pan are laid in first; the hand is painted last so its grip remains visible.
        // Shallow, wide sauté pan: an obvious oval rim and low-sided bowl, not a mug.
        path([[79,82],[95,82],[96,85],[94,90],[90,93],[82,92],[77,87]],'#B95B3C',ink,1.8);
        // Draw the long handle over the lower pan edge; the hand is painted last to show the grip.
        path([[70,86],[78,84],[88,85],[87,89],[77,91],[72,90]],'#4B3434',ink,1.25);
        line([[80,85],[88,85.5]],'#C18A62',1.6);
        ell(87,83,9,2.8,'#E5A06B',ink,1.4);
        ell(87,83,6.4,1.25,'#4C3540',null);
        line([[81,87],[85,91],[90,91.5]],'#F2B17C',1.2);
        path([[68,82],[74,80],[80,84],[80,90],[76,94],[70,91],[67,87]],skin,ink,1.25);
        line([[69,87],[75,88]],'#8D5944',1);line([[70,90],[75,91]],'#8D5944',.8);
      }else{
        // Rear coat yoke, apron straps and tied bow; no front-only details leak through.
        path([[27,54],[39,47],[61,47],[73,54],[71,68],[29,68]],'#D6C2A3',ink,1.2);
        line([[50,51],[50,97]],'#A18B70',1.2);
        path([[35,59],[65,59],[72,110],[28,110]],apron,ink,1.6);
        line([[39,64],[35,78],[38,84]],'#F0A078',2);line([[61,64],[65,78],[62,84]],'#F0A078',2);
        path([[45,68],[50,73],[55,68],[53,77],[50,80],[47,77]],'#E9A17A',ink,1);
        line([[35,106],[65,106]],'#F0A078',1.4);
        path([[27,54],[36,53],[34,83],[28,90],[23,87]],coat);
        path([[64,53],[73,54],[77,83],[71,90],[66,85]],coat);
      }
    }else{
      path([[38,52],[50,46],[62,51],[68,60],[68,94],[74,101],[29,101],[35,87]],coat,ink,1.8);
      path([[39,60],[62,60],[72,108],[29,108]],apron,ink,1.6);
      line([[45,62],[44,97]],'#F0A078',1.5);
      line([[59,62],[61,97]],'#7D3440',1.5);
      // Far arm is occluded by the torso; keep only the near pan-holding arm.
      path([[62,56],[69,60],[72,74],[74,81],[70,87],[64,84],[66,77]],coat);
      // Visible cuff and forearm lead into the near hand.
      path([[65,79],[72,79],[75,84],[70,88],[64,85]],'#C8B89F',ink,1.05);
      // Draw the shallow pan bowl first. Layer the handle over the bowl so
      // a short shaft remains visible between the gripping fingers and rim.
      g.save();g.translate(87,88);
      ell(0,0,7,4.5,'#B95B3C',ink,1.5);ell(0,-.3,5.2,2.4,'#3E2C34',null);
      line([[-6,-3],[4,-4.5]],'#F2B17C',1);g.restore();
      // Keep roughly 3 native pixels of handle shaft exposed beyond the fingers.
      line([[72,86],[84,87]],'#4B3434',4.2);
      line([[78,85.8],[84,86.4]],'#C18A62',1.4);
      // Paint the hand last so it grips the handle end without hiding its shaft.
      path([[67,82],[73,81],[79,85],[79,91],[75,94],[69,91],[66,86]],skin,ink,1.2);
      line([[68,87],[74,88]],'#8D5944',1);line([[69,90],[74,91]],'#8D5944',.8);
    }
    // Head: broad rounded face, cropped dark curls, and a tall pleated toque.
    if(!side){
      if(!back){
        ell(50,31,13,15,grad(37,17,63,45,[[0,'#E5B08B'],[.55,skin],[1,'#814B3C']]),ink,1.8);
        // Hair curls visible at temples beneath hat.
        [38,41,59,62].forEach((x,i)=>ell(x,38+(i%2),3.2,5,'#38242A',ink,.8));
        ell(44.5,31,1.35,1.9,'#241725',null);ell(55.5,31,1.35,1.9,'#241725',null);
        ell(44.9,30.3,.42,.48,'#FFFFFF',null);ell(55.9,30.3,.42,.48,'#FFFFFF',null);
        // Cook's friendly, broad-cheeked expression: softly arched brows and a full smile.
        line([[40,28.7],[44,27.8],[47,28.8]],'#49302B',1.8);line([[53,28.8],[56,27.8],[60,28.7]],'#49302B',1.8);
        path([[47,33],[49,32],[53,34],[51,37],[48,37]],'#A5654D',null);
        line([[43.5,40],[47,42.5],[52,43],[56.5,40]],'#713D3A',1.8);
        line([[39.5,37.5],[41.5,38.5]],'#C17D62',1);line([[58.5,38.5],[60.5,37.5]],'#C17D62',1);
      }else{
        ell(50,31,13,15,'#30242A',ink,1.7);
        [40,45,50,55,60].forEach(x=>line([[x,20],[x+1,39]],'#59404A',1));
      }
      // Tall soft toque: pleated crown, rolled band, small offset fold.
      // Lower only the crown 2 source pixels to preserve clear headroom in all views.
      g.save();g.translate(0,29);g.scale(1,.75);g.translate(0,-29);
      g.beginPath();g.moveTo(38,29);
      g.bezierCurveTo(31,24,33,12,41,11);
      g.bezierCurveTo(42,3,56,2,59,10);
      g.bezierCurveTo(68,11,69,24,62,29);g.closePath();
      g.fillStyle=grad(34,3,66,29,[[0,'#FFFDF6'],[1,'#E3D9C6']]);g.fill();g.strokeStyle=ink;g.lineWidth=1.7;g.stroke();
      line([[40,14],[41,27]],'#C8BDAA',1.1);line([[49,7],[49,27]],'#C8BDAA',1.1);line([[58,13],[58,27]],'#C8BDAA',1.1);
      g.restore();
      path([[36,22],[64,22],[65,27],[35,27]],'#D8CBB7',ink,1.3);
      line([[38,24],[62,24]],'#FFFDF4',1.1);
      if(!back) line([[49,23],[52,23]],'#B95B3C',1.5);
    }else{
      ell(50,31,12,15,'#30242A',ink,1.7);
      ell(55,31,9,13,grad(45,18,64,44,[[0,'#E5B08B'],[1,skin]]),ink,1.4);
      path([[60,30],[68,34],[62,38],[58,37]],skin,ink,1.15);
      ell(56,30,1.25,1.8,'#241725',null);
      ell(44,34,1.7,2.1,'#B97855',ink,.8);
      line([[52,39],[59,40]],'#713D3A',1.55);
      line([[53,28.5],[57,27.8]],'#49302B',1.55);
      g.save();g.translate(0,29);g.scale(1,.75);g.translate(0,-29);
      g.beginPath();g.moveTo(39,29);g.bezierCurveTo(33,22,37,12,45,11);
      g.bezierCurveTo(48,3,60,4,61,11);g.bezierCurveTo(68,15,66,24,63,29);g.closePath();
      g.fillStyle='#F8F3E8';g.fill();g.strokeStyle=ink;g.lineWidth=1.7;g.stroke();
      g.restore();
      path([[38,22],[64,22],[65,27],[37,27]],'#D8CBB7',ink,1.2);
    }
    // restrained warm/cool rim accents keep the figure legible in neon town scenes
    g.save();g.globalAlpha=.58;g.shadowBlur=.7/scale;g.shadowColor='rgba(255,126,65,.42)';
    line([[34,54],[40,49],[46,48]],'rgba(255,190,133,.9)',1/scale);
    g.shadowColor='rgba(41,242,232,.28)';
    line([[60,51],[67,55],[70,63]],'rgba(113,245,229,.72)',1/scale);
    g.restore();g.restore();
  }


  // Courier: original forward-leaning messenger with a weatherproof dispatch cap,
  // cross-body ochre satchel, reinforced teal jacket and hand-carried parcel.
  function drawCourierVector(n, dir, ctx, OWT, opts) {
    opts=opts||{}; const g=ctx, scale=OWT/36*.28;
    const sx=(n.rx!=null?n.rx:n.x)*OWT+OWT/2, sy=(n.ry!=null?n.ry:n.y)*OWT+OWT-5;
    const back=dir==='u', side=dir==='l'||dir==='r', flip=dir==='l';
    g.save();g.translate(sx,sy);g.scale(scale,scale);g.translate(-50,-139);
    if(flip){g.translate(50,0);g.scale(-1,1);g.translate(-50,0);}
    // Keep front/back feet on the shared baseline; avoid a whole-sprite tilt.
    const ink='#171725',skin='#A96F54';
    const grad=(x1,y1,x2,y2,stops)=>{const z=g.createLinearGradient(x1,y1,x2,y2);stops.forEach(([p,c])=>z.addColorStop(p,c));return z;};
    const path=(p,fill,stroke=ink,w=1.7)=>{g.beginPath();g.moveTo(p[0][0],p[0][1]);p.slice(1).forEach(v=>g.lineTo(v[0],v[1]));g.closePath();g.fillStyle=fill;g.fill();if(stroke){g.strokeStyle=stroke;g.lineWidth=w;g.lineJoin='round';g.stroke();}};
    const line=(p,c,w=1.5)=>{g.beginPath();g.moveTo(p[0][0],p[0][1]);p.slice(1).forEach(v=>g.lineTo(v[0],v[1]));g.strokeStyle=c;g.lineWidth=w;g.lineCap='round';g.lineJoin='round';g.stroke();};
    const ell=(x,y,rx,ry,fill,stroke=ink,w=1.4)=>{g.beginPath();g.ellipse(x,y,rx,ry,0,0,Math.PI*2);g.fillStyle=fill;g.fill();if(stroke){g.strokeStyle=stroke;g.lineWidth=w;g.stroke();}};
    const jacket=grad(31,48,68,103,[[0,'#65C7B8'],[.48,'#237F83'],[1,'#14505F']]);
    const pants=grad(38,99,64,134,[[0,'#35445A'],[1,'#172536']]);
    const bag=grad(24,61,48,108,[[0,'#E6B45D'],[.48,'#B77A36'],[1,'#70472E']]);
    const parcel=grad(73,66,96,91,[[0,'#F5D89A'],[1,'#B97A43']]);
    // Leaning stride and compact boots create a runner's delivery posture.
    if(!side){
      path([[37,101],[49,103],[47,119],[45,132],[34,132],[36,117]],pants);
      path([[52,103],[64,100],[66,117],[68,131],[56,132],[53,117]],pants);
      path([[34,129],[46,129],[48,134],[47,138],[31,138],[30,134]],'#263246');
      path([[56,129],[68,128],[72,133],[71,137],[55,138],[54,134]],'#263246');
      line([[33,135],[45,135]],'#83A0AA',1.1);line([[57,135],[68,134]],'#83A0AA',1.1);
    }else{
      path([[40,100],[54,101],[55,119],[57,132],[43,133],[40,118]],pants);
      path([[43,130],[56,130],[61,134],[60,138],[40,138]],'#263246');
      line([[43,135],[57,135]],'#83A0AA',1.1);
    }
    path([[43,39],[56,39],[58,53],[42,53]],skin);
    if(!side){
      // Tapered windbreaker torso with a high storm collar and offset zip.
      path([[31,53],[41,47],[60,49],[71,57],[68,91],[75,101],[25,103],[31,88]],jacket,ink,1.9);
      if(!back){
        path([[41,48],[49,58],[57,49],[55,45],[49,52],[44,45]],'#D8F0E5',ink,1.1);
        path([[43,55],[57,55],[55,67],[50,72],[44,66]],'#1B5964',ink,1.1);
        line([[51,57],[47,96]],'#B9E7D9',1.5);
        path([[34,73],[44,73],[43,84],[33,84]],'#1C6670',ink,1);
        line([[35,78],[42,78]],'#9AD8C9',1);
        // Front-facing satchel sits on the hip; the strap visibly terminates at its flap.
        path([[24,80],[39,77],[44,84],[42,103],[25,106],[19,96]],bag,ink,1.7);
        path([[24,81],[38,79],[41,87],[25,91],[21,88]],'#E6B45D',ink,1.1);
        line([[25,94],[40,90]],'#F3D18A',1.3);
        path([[30,95],[36,94],[37,99],[30,100]],'#70472E',ink,1);
        // Cross-body strap is layered over the jacket and visibly anchors the bag.
        line([[64,54],[60,65],[53,77],[43,91]],'#D99A48',5);
        line([[64,54],[60,65],[53,77],[43,91]],ink,1);
        path([[27,54],[37,52],[35,77],[31,89],[24,88],[24,69]],jacket);
        path([[24,85],[31,86],[33,94],[27,96],[23,91]],skin);
        path([[65,55],[73,58],[77,74],[76,84],[69,86],[66,73]],jacket);
        path([[70,82],[77,82],[80,88],[76,93],[70,90]],skin);
        // Parcel sits in the courier's forward hand, with taped corners and label.
        path([[73,70],[91,68],[96,73],[94,91],[77,94],[71,87]],parcel,ink,1.8);
        line([[82,70],[84,91]],'#9A633D',1.2);
        line([[73,80],[94,78]],'#F7E8C5',2);
        path([[82,76],[89,75],[89,80],[82,81]],'#F7F0DC',ink,.9);
        line([[84,78],[87,78]],'#4B6570',.8);
        // The gripping fingers overlap the parcel edge so the delivery prop never floats.
        path([[69,83],[75,82],[79,86],[78,91],[73,92],[69,88]],skin,ink,1.2);
        line([[73,86],[77,87]],'#DDA47D',.9);
      }else{
        path([[31,54],[41,48],[60,50],[70,57],[68,91],[74,101],[26,103]],'#286D76',ink,1.8);
        // The same compact messenger satchel sits on the courier's right hip.
        // From behind, the character's right is viewer-right; the strap crosses
        // from the opposite shoulder to the satchel exactly as it does in front.
        path([[57,80],[72,77],[78,84],[76,103],[59,106],[53,96]],bag,ink,1.7);
        path([[58,81],[71,79],[75,87],[59,92],[55,88]],'#E6B45D',ink,1.1);
        line([[59,95],[74,91]],'#F3D18A',1.3);
        path([[64,96],[70,95],[71,100],[64,101]],'#70472E',ink,1);
        line([[36,54],[41,66],[49,78],[59,91]],'#D99A48',5);
        line([[36,54],[41,66],[49,78],[59,91]],ink,1);
        path([[29,54],[37,54],[35,83],[29,91],[23,87]],jacket);
        path([[64,55],[72,58],[76,83],[70,90],[65,84]],jacket);
      }
    }else{
      // Side profile of the same messenger satchel: compact, hip-height, and
      // attached by a visible strap rather than a separate backpack silhouette.
      path([[38,53],[49,47],[63,52],[69,62],[66,92],[74,101],[30,103],[35,88]],jacket,ink,1.8);
      path([[29,77],[42,74],[49,80],[48,99],[34,103],[27,94]],bag,ink,1.7);
      path([[30,79],[41,77],[46,83],[33,88],[29,85]],'#E6B45D',ink,1);
      line([[31,92],[45,88]],'#F3D18A',1.2);
      line([[53,54],[48,72],[41,82]],'#D99A48',4);line([[53,54],[48,72],[41,82]],ink,1);
      path([[62,57],[70,61],[75,79],[72,88],[65,85],[62,72]],jacket);
      path([[68,82],[75,82],[78,88],[74,93],[68,90]],skin);
      path([[74,72],[91,70],[95,75],[93,91],[77,94],[72,87]],parcel,ink,1.7);
      line([[82,72],[84,91]],'#9A633D',1.2);line([[75,81],[93,79]],'#F7E8C5',2);
      // Visible fingers wrap the near parcel corner and connect to the sleeve.
      path([[69,83],[75,82],[79,86],[78,91],[73,92],[69,88]],skin,ink,1.2);
      line([[73,86],[77,87]],'#DDA47D',.9);
    }
    // Distinctive low-profile storm cap: swept crown, short visor and cyan piping.
    if(!side){
      if(!back){
        ell(50,31,12.5,14.5,grad(38,17,62,45,[[0,'#D99D73'],[.55,skin],[1,'#70483E']]),ink,1.7);
        // close-cropped dark hair and alert courier expression
        path([[38,26],[39,18],[47,14],[59,18],[63,25],[59,27],[53,23],[46,25],[41,29]],'#29252B',ink,1.3);
        ell(44.5,31,1.45,2.1,'#171725',null);ell(56,30.5,1.7,2.25,'#171725',null);ell(44.9,30.2,.45,.5,'#FFF',null);ell(56.5,29.8,.48,.5,'#FFF',null);
        // Courier's alert, asymmetrical gaze and sharper nose distinguish the messenger.
        line([[41,29.6],[46,28.8],[48,29.5]],'#35242A',1.75);line([[53,29],[59.5,29.8]],'#35242A',1.45);
        path([[48,33],[47,37],[52,36]],'#805442',null);
        line([[45,41],[50,40],[55,41]],'#633D3C',1.2);
      }else{
        ell(50,31,12,14,'#29252B',ink,1.6);
        line([[42,20],[44,37]],'#55454A',1);line([[50,17],[50,39]],'#55454A',1);line([[58,20],[57,37]],'#55454A',1);
      }
      path([[36,25],[38,16],[47,11],[59,14],[65,22],[62,27],[39,28]],'#236E78',ink,1.8);
      path([[36,24],[49,22],[67,25],[68,29],[48,29],[37,28]],'#D9A04D',ink,1.3);
      line([[42,18],[49,14],[58,16]],'#9EE1D3',1.2);
      line([[53,29.8],[58.5,29.3]],'#35242A',1.45);
      path([[44,20],[56,19],[58,23],[45,24]],'#1B5964',null);
    }else{
      // True right-facing profile: visible cheek, jaw, ear and nose beneath
      // the short visor. The left-facing view mirrors this authored profile.
      ell(50,31,11.5,13.5,'#29252B',ink,1.5);
      path([[43,27],[49,23],[59,25],[64,31],[63,39],[57,44],[47,42],[43,36]],
        grad(44,25,63,44,[[0,'#D99D73'],[1,skin]]),ink,1.4);
      ell(44,34,2.4,3.2,'#B9785E',ink,.9);
      path([[55,29],[62,31],[66,35],[62,37],[58,35]],skin,ink,1);
      ell(59,31,1.05,1.35,'#171725',null);
      line([[55,27],[61,25.5]],'#35242A',1.65);
      path([[57,36],[64,35],[66,37],[61,38]],skin,ink,.9);
      line([[56,41],[61,40]],'#633D3C',1.1);
      path([[39,25],[43,17],[51,13],[60,17],[65,24],[61,28],[54,24],[47,26],[42,30]],'#236E78',ink,1.7);
      path([[38,25],[51,23],[68,25],[69,29],[49,29],[38,29]],'#D9A04D',ink,1.2);
      line([[44,19],[51,15],[59,17]],'#9EE1D3',1.1);
      line([[56,29.7],[61,29.2]],'#35242A',1.35);
    }
    // Small reflective piping catches light without turning the silhouette neon.
    g.save();g.globalAlpha=.55;g.shadowBlur=.8/scale;g.shadowColor='rgba(41,242,232,.34)';
    line([[31,57],[39,51],[46,50]],'rgba(158,225,211,.9)',1/scale);
    line([[61,53],[68,58],[71,65]],'rgba(41,224,255,.8)',1/scale);
    g.restore();g.restore();
  }


  // Runner: spring-loaded mid-stride athlete with a cropped race singlet,
  // split shorts, high-top curls, sweatband, race bib and technical shoes.
  // Deliberately unlike the upright Courier and broad-uniform Cook.
  function drawRunnerVector(n,dir,ctx,OWT,opts){
    opts=opts||{};const g=ctx,scale=OWT/36*.28;
    const sx=(n.rx!=null?n.rx:n.x)*OWT+OWT/2,sy=(n.ry!=null?n.ry:n.y)*OWT+OWT-3;
    const back=dir==='u',side=dir==='l'||dir==='r',flip=dir==='l';
    g.save();g.translate(sx,sy);g.scale(scale,scale*1.066);g.translate(-50,-139);
    if(flip){g.translate(50,0);g.scale(-1,1);g.translate(-50,0);}
    const ink='#171725',skin='#965A43';
    const grad=(x1,y1,x2,y2,stops)=>{const z=g.createLinearGradient(x1,y1,x2,y2);stops.forEach(([p,c])=>z.addColorStop(p,c));return z;};
    const path=(p,fill,stroke=ink,w=1.7)=>{g.beginPath();g.moveTo(p[0][0],p[0][1]);p.slice(1).forEach(v=>g.lineTo(v[0],v[1]));g.closePath();g.fillStyle=fill;g.fill();if(stroke){g.strokeStyle=stroke;g.lineWidth=w;g.lineJoin='round';g.stroke();}};
    const line=(p,c,w=1.5)=>{g.beginPath();g.moveTo(p[0][0],p[0][1]);p.slice(1).forEach(v=>g.lineTo(v[0],v[1]));g.strokeStyle=c;g.lineWidth=w;g.lineCap='round';g.lineJoin='round';g.stroke();};
    const ell=(x,y,rx,ry,fill,stroke=ink,w=1.4)=>{g.beginPath();g.ellipse(x,y,rx,ry,0,0,Math.PI*2);g.fillStyle=fill;g.fill();if(stroke){g.strokeStyle=stroke;g.lineWidth=w;g.stroke();}};
    const top=grad(30,47,67,96,[[0,'#F07860'],[.45,'#D94F43'],[1,'#8C2F3D']]);
    const shorts=grad(35,88,66,119,[[0,'#3C3454'],[1,'#171B35']]);
    const shoe=grad(30,125,76,139,[[0,'#F6C95C'],[1,'#D88B35']]);
    const legSkin=grad(28,101,78,122,[[0,'#B8795F'],[.55,skin],[1,'#653B32']]);
    const curvePath=(start,segments,fill,stroke=ink,w=1.7)=>{g.beginPath();g.moveTo(start[0],start[1]);segments.forEach(v=>g.bezierCurveTo(...v));g.closePath();g.fillStyle=fill;g.fill();if(stroke){g.strokeStyle=stroke;g.lineWidth=w;g.lineJoin='round';g.stroke();}};
    // Airborne sprint: asymmetrical knee drive and trailing foot.
    if(!side){
      // Coach-inspired lower-body construction: clean, confident polygon planes
      // with straight outer contours, compact knee transitions and clear shoes.
      // The sprint remains asymmetric, but the legs share the same solid anatomy
      // and visual weight as the other civilians rather than ribbon-like curves.
      path([[36,89],[49,90],[49,98],[46,104],[39,106],[33,102],[33,95]],shorts,ink,1.6);
      // Keep both knees stacked over the feet: lower legs descend cleanly
      // instead of kicking outward from the shorts, following Coach's
      // straight, tapered leg construction while retaining a running offset.
      path([[37,103],[46,104],[45,111],[44,118],[43,125],[37,128],[32,125],[33,118],[35,110]],legSkin,ink,1.5);
      path([[52,89],[65,89],[68,96],[70,104],[68,110],[63,109],[57,102]],shorts,ink,1.6);
      path([[65,106],[73,108],[74,115],[75,122],[73,128],[67,130],[63,126],[63,119],[64,112]],legSkin,ink,1.5);
      path([[31,123],[40,123],[45,127],[44,132],[29,133],[26,129]],shoe,ink,1.6);
      path([[63,125],[72,125],[78,128],[77,133],[62,134],[59,130]],shoe,ink,1.6);
      // Removed detached pale sole glints; shoe highlights are now contained within the boot shapes.
      line([[37,109],[44,113]],'#8C2F3D',1.1);line([[62,108],[68,112]],'#8C2F3D',1.1); // restrained shorts seam, not torn orange slashes.
    }else{
      // Profile legs are drawn once, after the torso, as two separated
      // stride planes. Avoid prepainting an extra underlayer here.
    }
    path([[42,39],[56,39],[57,52],[43,52]],skin);
    if(!side){
      // Narrow, forward-tilted runner torso and racerback cut.
      path([[34,52],[43,47],[58,48],[68,55],[66,80],[70,89],[30,90],[34,80]],top,ink,1.9);
      if(!back){
        path([[42,47],[50,59],[58,48],[55,45],[50,53],[45,45]],'#F6D6B8',ink,1);
        path([[39,57],[45,54],[43,79],[37,86],[31,82],[34,66]],'#A9363B',ink,1);
        path([[57,54],[63,57],[68,83],[62,87],[57,78]],'#A9363B',ink,1);
        line([[50,60],[50,87]],'#F7B36A',1.5);
        // Race bib with readable number block and safety pins.
        path([[43,65],[57,65],[58,81],[42,81]],'#F5E8CE',ink,1.2);
        line([[45,68],[55,68]],'#D94F43',1);
        g.fillStyle='#25243B';g.font='bold 8px sans-serif';g.textAlign='center';g.fillText('07',50,77);
        ell(44,65,1,1,'#E9C77A',null);ell(56,65,1,1,'#E9C77A',null);
        // Arm drive: one fist high, opposite arm pumping behind the ribs.
        path([[34,54],[42,54],[39,66],[31,72],[24,67],[29,60]],top);
        path([[23,63],[29,59],[34,63],[32,70],[25,72],[21,68]],skin);
        path([[64,54],[72,56],[78,68],[73,76],[67,72],[63,64]],top);
        path([[70,71],[77,73],[78,80],[72,82],[68,77]],skin);
        // Stopwatch on the raised wrist.
        path([[22,64],[29,61],[31,66],[24,69]],'#F6C95C',ink,1);
        ell(26,64,2.3,2.3,'#25243B',ink,1);line([[26,62],[27,64]],'#F6E7C1',.8);
        // Split-short hem and a small side vent.
        line([[30,89],[47,90]],'#F6C95C',1.5);line([[55,90],[69,88]],'#F6C95C',1.5);
        path([[63,91],[68,91],[70,98],[65,99]],'#F07860',ink,1);
      }else{
        path([[34,53],[43,48],[58,49],[68,56],[66,80],[70,89],[30,90]],'#B73D43',ink,1.8);
        // Racerback panel and twin ventilation seams.
        path([[42,49],[50,59],[58,49],[55,46],[50,53],[45,46]],'#F6D6B8',ink,1);
        path([[39,59],[44,57],[47,90],[39,91]],'#8C2F3D',null);
        path([[56,57],[61,59],[61,91],[53,91]],'#8C2F3D',null);
        line([[45,61],[44,83]],'#F6A16F',1.2);line([[55,61],[56,83]],'#F6A16F',1.2);
        // Back of raised arm and pumping opposite arm.
        path([[34,55],[42,54],[38,67],[30,73],[23,68],[28,61]],top);
        path([[23,64],[29,61],[33,65],[31,71],[25,73],[21,69]],skin);
        path([[64,55],[72,57],[78,69],[73,77],[67,73],[63,65]],top);
        path([[70,72],[77,74],[78,81],[72,83],[68,78]],skin);
        line([[31,89],[68,89]],'#F6C95C',1.5);
      }
    }else{
      // Profile: high knee, trailing arm and forward lean make the running
      // action readable even in the two side directions.
      // Side silhouette leans forward from the hips: shoulders and chest
      // travel toward the runner's facing direction while the waist stays back.
      // The left-facing view mirrors this authored forward pitch.
      path([[42,52],[53,46],[63,50],[68,59],[66,78],[64,90],[31,91],[36,79]],top,ink,1.8);
      if(!back){
        path([[49,48],[57,58],[65,50],[61,46],[57,53],[52,46]],'#F6D6B8',ink,1);
        // Side bib wraps the near torso plane instead of reading as a flat
        // front-facing placard; the tapered edge foreshortens into the ribs.
        path([[55,64],[62,63],[66,67],[65,78],[58,81],[54,77]],'#F5E8CE',ink,1.1);
        line([[62,65],[64,68],[63,77]],'#D7C8AC',.9);
        g.save();
        // The whole left profile is mirrored for anatomy, but the printed
        // race number must remain typographically unmirrored.
        if(flip){g.translate(108,0);g.scale(-1,1);}
        g.fillStyle='#25243B';g.font='bold 6px sans-serif';g.textAlign='center';g.fillText('07',60,75);
        g.restore();
        path([[62,55],[71,58],[77,70],[73,78],[66,74],[62,65]],top);
        path([[71,74],[78,76],[79,82],[73,84],[69,80]],skin);
        // Far arm is occluded in profile; the near arm carries the stopwatch.
        // Far trailing leg and lifted rear shoe, painted behind the near leg.
        path([[36,97],[46,100],[40,112],[31,121],[25,127],[19,124],[25,113]],'#6E4234',ink,1.5);
        path([[15,123],[26,123],[29,128],[28,133],[13,133],[10,128]],'#C9802F',ink,1.6);
        // The near-leg shorts and leg are layered over the trailing stride.
        path([[35,89],[57,90],[60,99],[56,106],[43,107],[36,101]],shorts,ink,1.6);
        path([[43,103],[56,104],[58,113],[55,122],[49,128],[40,126],[39,119],[42,111]],legSkin,ink,1.5);
        path([[40,124],[54,124],[61,130],[60,135],[38,135],[35,131]],shoe,ink,1.6);
        // The far foot is fully occluded in profile: keep one clear near shoe
        // and avoid a detached rear shoe shape that reads as a third foot.
        // No floating sole strokes beneath the sprinting shoe.
        path([[69,73],[76,72],[78,77],[71,79]],'#F6C95C',ink,1);
        ell(72,74,2.5,2.5,'#25243B',ink,.9);line([[72,72],[73,74]],'#F6E7C1',.8);
      }else{
        path([[37,53],[49,48],[63,53],[69,63],[66,80],[71,90],[31,91]],'#B73D43',ink,1.8);
        path([[62,56],[71,59],[77,71],[73,79],[66,75],[62,66]],'#B73D43');
        path([[31,90],[63,90],[67,101],[54,108],[39,101]],shorts);
        path([[53,107],[68,111],[81,118],[91,117],[94,123],[88,129],[73,127],[58,120]],shorts);
        path([[74,121],[91,118],[96,123],[93,129],[77,132],[70,127]],shoe,ink,1.6);
        path([[32,106],[46,111],[41,121],[29,127],[19,123],[27,114]],shorts);
        path([[18,121],[31,122],[36,127],[33,133],[16,132],[13,127]],shoe,ink,1.6);
        // No detached highlight below the rear-view shoe.
      }
    }
    // Head and face: close-cropped curls, terry sweatband, strong brow.
    if(!side){
      if(!back){
        ell(50,31,12.5,14.5,grad(38,17,62,45,[[0,'#C27D5D'],[.55,skin],[1,'#5F342D']]),ink,1.7);
        // Dense short curls form a compact but unmistakable crown silhouette.
        for(let i=0;i<9;i++){const x=39+(i%5)*5.2,y=18+Math.floor(i/5)*4;ell(x,y,3.1,3.1,i%2?'#24202A':'#34252A',ink,.7);}
        ell(44,32,2,2.6,'#171725',null);ell(56,32,2,2.6,'#171725',null);ell(44.7,31.1,.65,.65,'#FFF',null);ell(56.7,31.1,.65,.65,'#FFF',null);
        line([[41,27],[47,26]],'#3E2729',1.2);line([[53,26],[59,27]],'#3E2729',1.2);
        line([[49,34],[47,37],[51,37]],'#704338',1);
        line([[45,41],[50,42],[55,40]],'#5A302D',1.3);
        [42,58].forEach(x=>ell(x,35,.6,.6,'#E9B18D',null));
      }else{
        ell(50,31,12,14,'#29212A',ink,1.6);
        for(let i=0;i<7;i++)ell(39+(i%4)*7,18+Math.floor(i/4)*5,3,3,'#34252A',ink,.6);
        line([[43,21],[44,37]],'#65505A',1);line([[56,21],[55,37]],'#65505A',1);
      }
      path([[36,25],[39,20],[45,19],[50,21],[55,19],[61,21],[64,26],[61,29],[39,29]],'#F6C95C',ink,1.4);
      line([[39,25],[61,25]],'#FFF0B2',1.2);
      path([[36,29],[64,29],[62,32],[38,32]],'#D88B35',ink,1);
    }else{
      ell(50,31,12,14,back?'#29212A':grad(38,17,62,45,[[0,'#C27D5D'],[.55,skin],[1,'#5F342D']]),ink,1.6);
      if(!back){
        // Keep the enlarged profile crown clear of the 64x96 crop edge.
        ell(40,21.5,3.4,3.2,'#34252A',ink,.65);ell(47,19,3.6,3.3,'#24202A',ink,.65);ell(54,19,3.5,3.3,'#34252A',ink,.65);ell(60,22.5,3.2,3.1,'#24202A',ink,.65);
        ell(58,31,1.8,2.1,'#171725',null);line([[57,28],[62,28]],'#3E2729',1.2);
        // A distinct projecting nose and a clean mouth tick; avoid cheek/chin
        // flecks that collapse into apparent stubble at native scale.
        path([[59,32],[68,34],[65,37],[60,38]],'#B8795F',ink,.9);
        line([[60,41],[63,41]],'#40282A',1.45);
      }else{
        ell(40,19,3.4,3.2,'#34252A',ink,.6);ell(47,17,3.4,3.2,'#24202A',ink,.6);ell(54,17,3.4,3.2,'#34252A',ink,.6);ell(60,20,3.2,3.1,'#24202A',ink,.6);
      }
      path([[38,24],[43,19],[56,19],[63,24],[61,29],[39,29]],'#F6C95C',ink,1.3);
      line([[40,25],[61,25]],'#FFF0B2',1.1);
    }
    // Sweatband tail and wrist tape; details remain visible at 64x96.
    if(!back&&!side){path([[38,25],[42,26],[40,35],[35,37],[36,32]],'#D88B35',ink,1);}
    g.restore();
  }

  // Coach: veteran sideline tactician with a broad forest-green warm-up jacket,
  // cream shoulder yoke, whistle, marked clipboard, track trousers and court shoes.
  // The silhouette and layered kit are deliberately unlike Runner's racewear.
  function drawCoachVector(n,dir,ctx,OWT,opts){
    opts=opts||{};const g=ctx,scale=OWT/36*.28;
    const sx=(n.rx!=null?n.rx:n.x)*OWT+OWT/2,sy=(n.ry!=null?n.ry:n.y)*OWT-5+OWT;
    const back=dir==='u',side=dir==='l'||dir==='r',flip=dir==='l';
    g.save();g.translate(sx,sy);g.scale(scale,scale);g.translate(-50,-139);
    if(flip){g.translate(50,0);g.scale(-1,1);g.translate(-50,0);}
    const ink='#171725',skin='#B87959';
    const grad=(x1,y1,x2,y2,stops)=>{const z=g.createLinearGradient(x1,y1,x2,y2);stops.forEach(([p,c])=>z.addColorStop(p,c));return z;};
    const path=(p,fill,stroke=ink,w=1.7)=>{g.beginPath();g.moveTo(p[0][0],p[0][1]);p.slice(1).forEach(v=>g.lineTo(v[0],v[1]));g.closePath();g.fillStyle=fill;g.fill();if(stroke){g.strokeStyle=stroke;g.lineWidth=w;g.lineJoin='round';g.stroke();}};
    const line=(p,c,w=1.5)=>{g.beginPath();g.moveTo(p[0][0],p[0][1]);p.slice(1).forEach(v=>g.lineTo(v[0],v[1]));g.strokeStyle=c;g.lineWidth=w;g.lineCap='round';g.lineJoin='round';g.stroke();};
    const ell=(x,y,rx,ry,fill,stroke=ink,w=1.3)=>{g.beginPath();g.ellipse(x,y,rx,ry,0,0,Math.PI*2);g.fillStyle=fill;g.fill();if(stroke){g.strokeStyle=stroke;g.lineWidth=w;g.stroke();}};
    const jacket=grad(30,48,70,105,[[0,'#4E8769'],[.5,'#24583F'],[1,'#143A30']]);
    const pants=grad(35,94,66,137,[[0,'#3A4650'],[1,'#1C2731']]);
    const shoe=grad(32,128,69,139,[[0,'#E6DCC1'],[1,'#9CA9A0']]);
    // Grounded coach stance: broad, steady legs rather than a running stride.
    if(!side){
      path([[37,99],[48,100],[47,119],[45,132],[32,133],[34,117]],pants);
      path([[52,100],[64,98],[67,116],[68,132],[55,133],[53,117]],pants);
      path([[31,129],[45,129],[48,134],[47,138],[28,138],[27,134]],shoe);
      path([[55,129],[68,128],[73,133],[72,138],[54,138],[53,134]],shoe);
      line([[31,134],[44,134]],'#F4E9CF',1.2);line([[58,134],[69,134]],'#F4E9CF',1.2);
    }else{
      path([[39,99],[57,99],[59,119],[60,133],[43,134],[40,116]],pants);
      path([[42,130],[58,130],[63,134],[62,138],[39,138],[38,134]],shoe);
      line([[43,134],[58,134]],'#F4E9CF',1.2);
    }
    path([[43,39],[57,39],[57,53],[43,53]],skin);
    // Jacket body and visible side seams.
    if(!side)path([[35,51],[43,47],[58,47],[65,52],[66,95],[64,101],[36,101],[34,95]],jacket,ink,2);
    if(back){
      path([[35,53],[43,49],[58,49],[66,54],[62,61],[50,64],[38,61]],'#D8D7B8',ink,1.3);
      path([[39,68],[50,74],[61,68],[63,96],[37,96]],'#24583F',null);
      line([[50,73],[50,96]],'#9EB89A',1.4);
      line([[35,91],[65,91]],'#D6B85D',1.5);
      // Coach initials and small stitched team crest.
      // Font-independent stitched VC mark built from vector paths.
      line([[44,79],[47,87],[50,79]],'#F0E5C9',1.8);
      line([[56,80],[53,79],[51,81],[51,85],[53,87],[56,86]],'#F0E5C9',1.8);
      // Arms rest at the sides, hands relaxed.
      path([[31,55],[39,56],[37,79],[33,91],[26,89],[27,72]],jacket);
      path([[26,87],[34,88],[34,97],[28,100],[24,95]],skin);
      path([[64,55],[72,56],[75,78],[72,91],[65,91],[66,73]],jacket);
      path([[66,89],[73,89],[75,97],[69,100],[65,96]],skin);
    }else if(side){
      // Narrow single-plane torso: do not leave the broad front-view jacket
      // underneath this profile silhouette.
      // Add real jacket volume along the rear contour so the side view
      // reads as a solid veteran's torso rather than a narrow edge-on sliver.
      path([[38,51],[52,48],[61,52],[66,60],[65,91],[61,100],[36,100],[35,76]],jacket,ink,1.7);
      // The cream yoke expands with the shoulder and follows the rear seam.
      path([[36,53],[48,50],[56,53],[61,59],[54,62],[42,61],[37,58]],'#D8D7B8',ink,1.05);
      line([[43,64],[43,97]],'#A7C0A6',1.2);
      // Arm and grip are behind the board. Paint the clipboard afterward so
      // it visibly sits in front of the hand instead of being obscured by it.
      path([[62,58],[70,60],[75,78],[71,89],[64,89],[61,75]],jacket);
      path([[61,84],[70,84],[75,92],[69,98],[61,92]],skin,ink,1.2);
      path([[61,68],[77,65],[84,93],[67,99],[59,91]],'#C69A58',ink,1.5);
      path([[64,71],[75,69],[81,90],[68,94]],'#F2E8CE',ink,1);
      path([[69,67],[77,66],[78,71],[70,73]],'#7A6246',ink,1);
      line([[67,78],[77,76]],'#3B6650',1.15);line([[68,84],[78,82]],'#3B6650',1.15);line([[69,89],[79,87]],'#3B6650',1);
      // Fingers curl over the near edge so the grip remains legible.
      path([[60,84],[65,82],[69,85],[68,89],[62,90]],skin,ink,1);
      // Far arm is occluded by the torso; only the clipboard-holding near arm shows.
      // Gold whistle and short lanyard are visible in profile, below the yoke.
      // Lanyard and whistle angle toward the face/front edge of the profile.
      // The pendant stays on the chest-front side instead of hanging at the back.
      line([[40,64],[44,70],[48,64]],'#D6B85D',1.8);
      path([[42,73],[47,71],[51,73],[53,76],[50,79],[45,78],[41,76]],'#D9AD45',ink,1);
      path([[46,72],[51,73],[51,77],[47,78]],'#F3D985',ink,.8);
      ell(49,75,1.05,.8,'#302B27',null);
      line([[47,74],[51,75]],'#FFF0C8',1);
    }else{
      // Front jacket: cream shoulder yoke, zipper, pocket seams and hem band.
      path([[34,52],[43,48],[58,48],[68,54],[64,60],[50,63],[36,60]],'#D8D7B8',ink,1.3);
      path([[37,67],[50,73],[63,67],[68,91],[65,100],[35,100],[32,91]],jacket,null);
      line([[50,70],[50,99]],'#D5DCC4',1.6);
      path([[34,78],[45,78],[45,91],[35,91]],'#1B4937',ink,1);
      path([[55,78],[66,78],[65,91],[55,91]],'#1B4937',ink,1);
      line([[37,94],[63,94]],'#D6B85D',1.5);
      // Relaxed arms; the right hand grips the clipboard edge.
      path([[31,55],[39,56],[38,76],[34,91],[27,91],[26,74]],jacket);
      path([[27,88],[35,88],[36,97],[30,101],[25,96]],skin);
      path([[64,55],[72,57],[76,78],[73,91],[66,91],[65,74]],jacket);
      path([[67,88],[74,89],[76,97],[70,101],[66,96]],skin);
      // Clipboard, brass clip, practice marks and a clearly held hand overlap.
      path([[72,69],[84,68],[87,95],[75,98]],'#C69A58',ink,1.6);
      path([[74,72],[82,71],[84,92],[76,94]],'#F2E8CE',ink,1);
      path([[77,69],[82,69],[82,73],[77,74]],'#7A6246',ink,1);
      line([[77,79],[82,78]],'#3B6650',1);line([[77,84],[83,83]],'#3B6650',1);line([[78,89],[82,88]],'#3B6650',1);
      path([[69,88],[76,87],[78,94],[73,98],[68,94]],skin,ink,1.2);
      // Whistle on a short gold lanyard.
      line([[46,64],[50,76],[55,64]],'#D6B85D',1.9);
      // Side-facing whistle reads as a compact horizontal barrel and tip.
      // Angled whistle chamber and dark mouthpiece opening remain distinct
      // from a flat gold bar at native and game scale.
      path([[47,75],[50,72.8],[56,74],[59,77],[56,80],[50,79],[46,77]],'#D9AD45',ink,1.05);
      path([[43,74],[49,73],[49,77],[45,79]],'#F3D985',ink,.85);
      ell(48,75.5,1.05,.8,'#302B27',null);
      line([[51,75],[56,76]],'#FFF0C8',1.1);
    }
    // Head: older coach, swept silver temples, expressive brows and visor.
    if(!side){
      ell(50,30,12.5,14.5,grad(38,16,63,45,[[0,'#D99C76'],[.55,skin],[1,'#754632']]),ink,1.6);
      if(!back){
        path([[37,22],[39,15],[48,13],[58,16],[64,22],[61,27],[39,27]],'#5B6260',ink,1.2);
        path([[37,26],[39,26],[39,32],[38,34],[37,31]],'#AEB5A8',null);path([[63,26],[61,26],[61,32],[62,34],[63,31]],'#AEB5A8',null);
        ell(44,31,2,2.6,ink,null);ell(56,31,2,2.6,ink,null);ell(44.7,30.1,.65,.65,'#FFF',null);ell(56.7,30.1,.65,.65,'#FFF',null);
        line([[41,26],[47,25]],'#49332D',1.3);line([[53,25],[59,26]],'#49332D',1.3);
        line([[49,33],[47,37],[52,37]],'#80513D',1);
        line([[45,41],[50,42],[55,41]],'#714333',1.2);
        ell(43,35,2,1,'#D18A72',null);ell(57,35,2,1,'#D18A72',null);
      }else{
        // Rear hair: silver-templed charcoal hair with a shaped nape beneath the cap.
        path([[37,23],[40,19],[45,20],[50,22],[55,20],[61,19],[64,24],[63,35],[59,41],[54,43],[50,40],[46,43],[41,40],[37,34]],'#59615D',ink,1.25);
        path([[41,29],[43,29],[44,35],[42,38],[41,34]],'#AEB5A8',null);
        path([[57,29],[59,29],[59,34],[58,38],[56,35]],'#AEB5A8',null);
        line([[45,30],[46,37]],'#D2D0C3',1.1);line([[53,29],[52,38]],'#D2D0C3',1.1);
        path([[42,39],[46,42],[49,40],[52,42],[56,39],[59,40],[56,44],[44,44]],'#343B38',ink,.8);
      }
      path([[34,23],[38,17],[47,16],[61,18],[67,23],[65,27],[35,27]],'#263B35',ink,1.4);
      path([[32,25],[68,25],[66,27],[34,27]],'#D6B85D',ink,1.1);
      line([[43,19],[57,19]],'#526C58',.9);

    }else{
      if(back){
        ell(50,30,12,14,'#5B6260',ink,1.5);
        path([[38,23],[42,18],[49,19],[55,18],[62,22],[63,32],[59,40],[53,43],[46,41],[40,37]],'#59615D',ink,1.15);
        path([[40,25],[44,23],[47,29],[44,36],[40,34]],'#AEB5A8',null);
        path([[55,25],[60,23],[62,28],[59,36],[55,37]],'#AEB5A8',null);
        line([[47,30],[47,38]],'#D2D0C3',1);
        path([[36,23],[42,17],[58,17],[65,23],[63,27],[37,27]],'#263B35',ink,1.3);
        path([[35,25],[65,25],[63,29],[37,29]],'#D6B85D',ink,1);
      }else{
        // A true side-profile head: a shaped rear cranium, projecting
        // forehead/nose and one visible eye, not a front oval turned sideways.
        path([[35,24],[38,18],[45,18],[49,23],[47,34],[44,41],[38,39],[34,32]],'#59615D',ink,1.1);
        path([[36,28],[39,27],[40,33],[38,37],[36,34]],'#AEB5A8',null);
        path([[42,18],[52,16],[59,19],[63,24],[62,30],[67,33],[63,37],[61,41],[53,44],[45,42],[40,37],[38,29],[39,22]],
          grad(38,16,63,45,[[0,'#D99C76'],[.55,skin],[1,'#754632']]),ink,1.5);
        path([[38,22],[42,16],[55,16],[63,22],[66,25],[64,27],[40,27]],'#5B6260',ink,1);
        // One visible eye, a small rear ear, a projecting nose and a defined
        // jaw. Keep the cheek clear so the face cannot read as a second eye.
        ell(57,31,1.25,1.6,ink,null);
        ell(42,31,1.35,1.75,'#D99C76',ink,.65);
        line([[57,33],[64,34],[68,36],[64,38]],'#80513D',1.35);
        line([[52,42],[57,43],[62,41]],'#714333',1.15);
        // The visor projects forward, making the profile direction explicit.
        path([[37,23],[42,16],[54,16],[62,20],[66,25],[64,27],[39,27]],'#263B35',ink,1.3);
        path([[49,25],[67,25],[66,28],[49,28]],'#D6B85D',ink,1);
        line([[44,19],[55,19]],'#526C58',.8);
      }
    }
    // Shared restrained warm/cool rim recipe for face and shoulder readability.
    g.save();g.globalAlpha=.56;g.shadowBlur=.7/scale;g.shadowColor='rgba(255,154,61,.38)';
    if(!side){
      line([[34,53],[39,49],[45,48]],'rgba(255,177,104,.84)',1/scale);
      line([[29,59],[27,68],[29,75]],'rgba(255,154,61,.72)',1/scale);
      g.shadowColor='rgba(41,242,232,.30)';
      line([[59,49],[66,52],[70,58]],'rgba(113,245,229,.78)',1/scale);
      line([[71,62],[73,70],[71,76]],'rgba(41,210,211,.68)',1/scale);
    }else{
      line([[37,53],[43,49],[50,48]],'rgba(255,177,104,.84)',1/scale);
      g.shadowColor='rgba(41,242,232,.30)';
      line([[61,53],[66,59],[67,66]],'rgba(113,245,229,.78)',1/scale);
    }
    g.restore();g.restore();
  }


  // Referee: decisive match official with a raised yellow-card silhouette,
  // black/ivory striped shirt, vermilion shorts, tall socks and whistle.
  // This is a graphic, upright officiating pose—not another coaching stance.
  function drawRefVector(n,dir,ctx,OWT,opts){
    opts=opts||{};const g=ctx,scale=OWT/36*.28;
    const sx=(n.rx!=null?n.rx:n.x)*OWT+OWT/2,sy=(n.ry!=null?n.ry:n.y)*OWT-5+OWT;
    const back=dir==='u',side=dir==='l'||dir==='r',flip=dir==='l';
    g.save();g.translate(sx,sy);g.scale(scale,scale);g.translate(-50,-139);
    if(flip){g.translate(50,0);g.scale(-1,1);g.translate(-50,0);}
    const ink='#171725',skin='#A96F53';
    const grad=(a,b,stops)=>{const z=g.createLinearGradient(a[0],a[1],b[0],b[1]);stops.forEach(([p,c])=>z.addColorStop(p,c));return z;};
    const path=(p,fill,stroke=ink,w=1.7)=>{g.beginPath();g.moveTo(p[0][0],p[0][1]);p.slice(1).forEach(v=>g.lineTo(v[0],v[1]));g.closePath();g.fillStyle=fill;g.fill();if(stroke){g.strokeStyle=stroke;g.lineWidth=w;g.lineJoin='round';g.stroke();}};
    const line=(p,c,w=1.5)=>{g.beginPath();g.moveTo(p[0][0],p[0][1]);p.slice(1).forEach(v=>g.lineTo(v[0],v[1]));g.strokeStyle=c;g.lineWidth=w;g.lineCap='round';g.lineJoin='round';g.stroke();};
    const ell=(x,y,rx,ry,fill,stroke=ink,w=1.3)=>{g.beginPath();g.ellipse(x,y,rx,ry,0,0,Math.PI*2);g.fillStyle=fill;g.fill();if(stroke){g.strokeStyle=stroke;g.lineWidth=w;g.stroke();}};
    const shirt=grad([30,48],[69,101],[[0,'#F4F0E2'],[.55,'#D8D8D0'],[1,'#AEB8B5']]);
    const shorts=grad([37,93],[65,117],[[0,'#C64C3E'],[1,'#792D31']]);
    const sock=grad([35,112],[66,133],[[0,'#F2EFE4'],[1,'#B8C2BF']]);
    const shoe=grad([31,130],[68,139],[[0,'#343A43'],[1,'#111820']]);
    // Short official's shorts and split stance, with tall contrasting socks.
    if(!side){
      path([[37,94],[49,95],[48,112],[44,118],[33,117],[34,106]],shorts);
      path([[51,95],[64,94],[67,108],[67,118],[55,118],[52,110]],shorts);
      path([[34,114],[45,114],[45,132],[34,132]],sock);
      path([[56,114],[67,114],[68,132],[57,132]],sock);
      line([[34,120],[45,120]],'#343A43',1.5);line([[57,120],[68,120]],'#343A43',1.5);
      path([[31,129],[46,129],[49,134],[47,138],[28,138],[27,134]],shoe);
      path([[56,129],[69,129],[74,134],[73,138],[54,138],[53,134]],shoe);
      line([[32,134],[45,134]],'#9DA7A8',1);line([[59,134],[70,134]],'#9DA7A8',1);
    }else{
      path([[39,94],[59,95],[61,112],[58,118],[41,118],[39,107]],shorts);
      path([[42,114],[59,114],[60,132],[43,132]],sock);
      line([[43,120],[59,120]],'#343A43',1.5);
      path([[40,129],[60,129],[64,134],[62,138],[38,138],[37,134]],shoe);
      line([[42,134],[59,134]],'#9DA7A8',1);
    }
    path([[43,39],[57,39],[57,52],[43,52]],skin);
    // Torso is slightly tapered, with strong vertical stripe rhythm.
    // Front/back base only: side views use their own narrow torso below.
    if(!side)path([[36,50],[44,47],[57,47],[66,51],[69,88],[64,98],[35,98],[30,88]],shirt,ink,2);
    if(back){
      // Rear stripe layout and small official badge between shoulder blades.
      for(const x of [38,46,54,62])path([[x,51],[x+4,50],[x+4,94],[x,95]],'#222B33',null);
      path([[44,56],[56,56],[55,66],[45,66]],'#E7E3D7',ink,1);
      ell(50,61,2,2,'#C64C3E',null);
      line([[36,93],[64,93]],'#C64C3E',1.6);
      // Rear view: the official's anatomical left arm stays raised (viewer-left from behind).
      line([[46,50],[50,62],[55,50]],'#C5A34D',1.5);
      ell(50,64,2.2,2.8,'#C5A34D',ink,1);
      path([[39,55],[33,52],[29,42],[26,31],[20,28],[16,33],[22,49],[29,67],[35,72]],shirt);
      path([[27,36],[21,33],[19,23],[11,22],[10,40],[21,43]],skin);
      path([[8,12],[27,12],[27,37],[8,37]],'#E8BE45',ink,1.7);
      line([[12,17],[23,17]],'#FFF0A7',1.3);
      line([[17,22],[17,30]],'#C64C3E',2);
      ell(17,33,1.5,1.5,'#C64C3E',null);
      // Fingers overlap the lower card edge so the grip reads at native scale.
      path([[18,34],[26,34],[29,40],[25,44],[17,40]],skin,ink,1.1);
      line([[20,36],[25,37]],'#754633',1);
      path([[62,55],[68,57],[72,77],[69,92],[63,92],[61,72]],shirt);
      path([[61,88],[69,89],[70,97],[64,100],[59,95]],skin);
    }else if(side){
      // Side-facing raised arm and card remain a clear official silhouette.
      // Narrow, offset torso planes make the profile read as a real side view.
      path([[43,51],[50,48],[58,52],[62,61],[61,91],[57,98],[40,98],[39,76]],shirt);
      line([[48,53],[47,93]],'#27313A',2.6);
      line([[55,55],[55,91]],'#27313A',1.8);
      // Raised arm and yellow card are on the forward/face side of the
      // profile (the nose points right in local coordinates). The mirrored
      // left-facing render keeps the card on that view's front side too.
      path([[58,57],[65,55],[71,45],[76,32],[82,28],[87,32],[83,49],[75,68],[66,74]],shirt);
      path([[78,34],[84,31],[86,22],[94,21],[95,39],[85,42]],skin);
      path([[78,13],[97,13],[97,39],[78,39]],'#E8BE45',ink,1.7);
      line([[82,18],[93,18]],'#FFF0A7',1.2);
      line([[87,23],[87,32]],'#C64C3E',2);
      ell(87,35,1.5,1.5,'#C64C3E',null);
      path([[79,36],[87,36],[90,42],[86,46],[78,42]],skin,ink,1.1);
      line([[81,38],[87,39]],'#754633',1);
      // Far arm is occluded behind the torso; only the raised-card arm shows.
      line([[46,63],[50,73],[54,63]],'#C5A34D',1.4);ell(50,75,2.2,2.7,'#C5A34D',ink,1);
    }else{
      // Front stripes are broad enough to survive native 64x96 downsampling.
      for(const x of [35,44,53,62])path([[x,51],[x+4,50],[x+4,94],[x,95]],'#222B33',null);
      path([[43,53],[57,53],[56,62],[44,62]],'#E7E3D7',ink,1);
      ell(50,58,2,2,'#C64C3E',null);
      line([[36,94],[64,94]],'#C64C3E',1.6);
      // Left arm hangs relaxed; right arm reaches up with a yellow card.
      path([[30,54],[38,56],[35,78],[32,92],[25,92],[25,72]],shirt);
      path([[25,89],[33,89],[34,98],[28,101],[23,96]],skin);
      path([[62,54],[68,52],[71,41],[74,27],[80,24],[84,30],[79,48],[73,66],[66,72]],shirt);
      path([[73,27],[79,24],[81,14],[89,13],[90,31],[79,34]],skin);
      path([[73,10],[93,10],[93,37],[73,37]],'#E8BE45',ink,1.8);
      line([[77,15],[89,15]],'#FFF0A7',1.3);
      line([[83,20],[83,29]],'#C64C3E',2);
      ell(83,33,1.7,1.7,'#C64C3E',null);
      // The hand is drawn over the card's lower edge to show a firm grip.
      path([[74,29],[82,30],[85,36],[81,41],[73,37]],skin,ink,1.1);
      line([[76,32],[82,33]],'#754633',1);
      // Gold whistle and lanyard, centered over the shirt stripes.
      line([[45,51],[50,65],[55,51]],'#C5A34D',1.6);
      ell(50,67,2.5,3,'#C5A34D',ink,1);
      line([[49,67],[51,67]],'#FFF0A7',.8);
    }
    // Distinctive close-cropped hair, no cap: profile remains readable.
    if(!side){
      ell(50,29,12.2,14.3,grad([38,15],[63,44],[[0,'#D69A72'],[.6,skin],[1,'#754633']]),ink,1.5);
      if(!back){
        path([[37,24],[38,17],[44,14],[56,14],[63,20],[63,26],[38,27]],'#28252A',ink,1.3);
        line([[40,26],[47,25]],'#302329',1.2);line([[53,25],[60,26]],'#302329',1.2);
        ell(44,31,2,2.6,ink,null);ell(56,31,2,2.6,ink,null);ell(44.7,30.1,.65,.65,'#FFF',null);ell(56.7,30.1,.65,.65,'#FFF',null);
        line([[49,34],[47,38],[52,38]],'#80513D',1);
        line([[46,42],[54,42]],'#704333',1.1);
      }else{
        // Rear hair is a deliberate dark cropped mass under the sweatband,
        // with short textured locks at the nape—not exposed skin or pale streaks.
        path([[38,23],[40,16],[46,13],[55,13],[62,18],[64,27],[62,36],[57,42],[43,42],[38,36]],'#30282A',ink,1.2);
        line([[42,31],[44,38]],'#4A3938',1.1);
        line([[48,32],[49,40]],'#4A3938',1.1);
        line([[56,31],[55,39]],'#4A3938',1.1);
        path([[41,37],[45,41],[48,39],[51,42],[55,39],[59,40],[57,43],[43,43]],'#272126',ink,.8);
      }
      // Slim black sweatband with a small white official mark.
      path([[36,23],[42,17],[58,17],[65,23],[63,27],[37,27]],'#28252A',ink,1.2);
      line([[43,20],[57,20]],'#E8E3D7',1);
    }else{
      ell(50,29,12,14,back?'#30282A':grad([38,15],[63,44],[[0,'#D69A72'],[.6,skin],[1,'#754633']]),ink,1.5);
      if(!back){
        // Close-cropped rear hair and a short nape lock remain visible behind the ear.
        path([[34,22],[38,16],[47,16],[51,21],[48,31],[44,38],[37,37],[33,31]],'#28252A',ink,1.1);
        path([[35,24],[40,19],[44,20],[42,31],[38,34]],'#51434A',null);
        path([[38,23],[42,16],[55,16],[63,22],[61,27],[39,27]],'#28252A',ink,1.2);
        // Profile ear and projecting nose: warm ear crease and a clear
        // skin-toned bridge/tip keep the face readable at native scale.
        ell(47.5,32,2.1,2.8,'#B87959',ink,.8);
        ell(48,32,1,1.5,'#80513D',null);
        ell(59,31,1.5,1.8,ink,null);
        path([[62,32],[66.5,34.5],[67,36],[62,37],[60,35]],'#B87959',ink,.8);
        line([[64,35],[66,35.5]],'#80513D',.8);
        // Keep the chin contour inside the jaw; no dark line may protrude
        // beyond the profile head silhouette.
        line([[55,40],[58,40]],'#704333',.9);
        // A short angled jacket seam adds a subtle near/far plane to the
        // profile without broadening the established side silhouette.
        line([[43,55],[45,68],[44,84],[46,94]],'#E5E2D5',.9);
      }else{line([[43,22],[44,38]],'#A9A59A',1);line([[57,22],[56,38]],'#A9A59A',1);}
      path([[36,23],[42,17],[58,17],[65,23],[63,27],[37,27]],'#28252A',ink,1.2);
      line([[43,20],[57,20]],'#E8E3D7',1);
    }
    // Shared restrained warm/cool rim accents; avoid tracing the yellow card.
    g.save();g.globalAlpha=.56;g.shadowBlur=.7/scale;g.shadowColor='rgba(255,154,61,.38)';
    if(!side){
      line([[35,52],[40,49],[46,48]],'rgba(255,177,104,.84)',1/scale);
      line([[29,58],[27,67],[29,74]],'rgba(255,154,61,.72)',1/scale);
      g.shadowColor='rgba(41,242,232,.30)';
      line([[58,50],[65,53],[69,59]],'rgba(113,245,229,.78)',1/scale);
      line([[70,63],[72,71],[70,77]],'rgba(41,210,211,.68)',1/scale);
    }else{
      line([[40,52],[46,49],[52,49]],'rgba(255,177,104,.84)',1/scale);
      g.shadowColor='rgba(41,242,232,.30)';
      line([[60,53],[65,59],[66,66]],'rgba(113,245,229,.78)',1/scale);
    }
    g.restore();g.restore();
  }


  // Guard: compact protective wedge with braced character-right forearm,
  // flexed offset stance, segmented shell and rear-harness radio.
  function drawGuardVector(n, dir, ctx, OWT, opts) {
    opts=opts||{}; const g=ctx, scale=OWT/36*.28;
    const sx=(n.rx!=null?n.rx:n.x)*OWT+OWT/2, sy=(n.ry!=null?n.ry:n.y)*OWT+OWT-5;
    const back=dir==='u', side=dir==='l'||dir==='r', flip=dir==='l';
    g.save();g.translate(sx,sy);g.scale(scale,scale);g.translate(-50,-139);
    if(flip){g.translate(50,0);g.scale(-1,1);g.translate(-50,0);}
    const ink='#171725',skin='#C98A62';
    const grad=(x1,y1,x2,y2,stops)=>{const z=g.createLinearGradient(x1,y1,x2,y2);stops.forEach(([p,c])=>z.addColorStop(p,c));return z;};
    const path=(p,fill,stroke=ink,w=1.7)=>{g.beginPath();g.moveTo(p[0][0],p[0][1]);p.slice(1).forEach(v=>g.lineTo(v[0],v[1]));g.closePath();g.fillStyle=fill;g.fill();if(stroke){g.strokeStyle=stroke;g.lineWidth=w;g.lineJoin='round';g.lineCap='round';g.stroke();}};
    const line=(p,c,w=1.4)=>{g.beginPath();g.moveTo(p[0][0],p[0][1]);p.slice(1).forEach(v=>g.lineTo(v[0],v[1]));g.strokeStyle=c;g.lineWidth=w;g.lineCap='round';g.lineJoin='round';g.stroke();};
    const ell=(x,y,rx,ry,fill,stroke=ink,w=1.3)=>{g.beginPath();g.ellipse(x,y,rx,ry,0,0,Math.PI*2);g.fillStyle=fill;g.fill();if(stroke){g.strokeStyle=stroke;g.lineWidth=w;g.stroke();}};
    const shell=grad(30,48,69,101,[[0,'#596B7E'],[.38,'#34465B'],[1,'#172331']]);
    const plate=grad(34,53,65,82,[[0,'#71869A'],[1,'#29394B']]);
    const trousers=grad(38,98,62,134,[[0,'#303B4B'],[1,'#111A25']]);
    const boot=grad(32,129,67,138,[[0,'#596575'],[1,'#202A36']]);
    if(!side){
      // Offset planted stance: left leg carries weight, right knee is flexed outward.
      path([[35,99],[48,101],[47,117],[44,132],[32,132],[33,116]],trousers);
      path([[51,99],[64,96],[68,111],[65,124],[70,132],[57,134],[53,122]],trousers);
      path([[31,129],[44,129],[47,134],[46,138],[29,138],[27,134]],boot);
      path([[57,129],[68,128],[73,133],[72,137],[55,138],[54,134]],boot);
      line([[31,135],[44,135]],'#8794A2',1);line([[58,135],[69,135]],'#8794A2',1);
    }else{
      // Side stance has one visible near leg; the flexed knee and heavy boot
      // are independently composed for the left and right facing silhouettes.
      path([[39,98],[55,98],[54,114],[59,127],[58,134],[43,134],[41,119]],trousers);
      path([[42,130],[57,130],[64,134],[64,138],[39,138]],boot);
      line([[43,135],[60,135]],'#8794A2',1);
    }
    path([[43,39],[57,39],[58,52],[42,52]],skin);
    if(!side){
      // Squared shoulder wedge and short segmented protective shell.
      path([[27,54],[39,46],[61,46],[73,54],[70,73],[68,99],[31,99],[29,75]],shell,ink,2);
      if(!back){
        path([[38,48],[50,57],[62,48],[58,44],[50,51],[42,44]],'#A7B4C0',ink,1.2);
        path([[34,57],[47,54],[50,67],[38,72]],plate,ink,1.2);
        path([[52,54],[66,57],[62,72],[51,67]],'#263749',ink,1.2);
        line([[50,57],[50,96]],'#111A25',1.5);
        line([[37,74],[63,74]],'#8A9AA8',1.1);
        path([[34,83],[66,83],[65,96],[35,96]],'#202E3E',ink,1.1);
        path([[29,53],[37,51],[35,70],[30,82],[23,79],[24,64]],plate,ink,1.5);
        path([[62,53],[71,54],[76,68],[74,76],[68,77],[65,66]],shell,ink,1.5);
        // Character-right bracer (viewer-left) joins the bent forearm.
        path([[24,76],[32,74],[38,79],[47,78],[53,71],[59,72],[60,80],[52,86],[39,87],[30,84]],'#34475C',ink,1.5);
        path([[22,74],[32,72],[37,78],[34,86],[25,87],[20,82]],'#8797A5',ink,1.4);
        line([[23,78],[34,80]],'#D0A66A',1.8);
        path([[51,69],[59,68],[63,74],[59,80],[52,79]],skin,ink,1.1);
        // Far arm hangs cleanly and does not duplicate the braced silhouette.
        path([[67,58],[73,59],[75,80],[72,92],[66,92],[66,78]],shell,ink,1.4);
        path([[66,91],[73,91],[73,97],[67,97]],skin,ink,1.1);
        line([[35,97],[65,97]],'#B38B50',2);
      }else{
        path([[29,54],[39,48],[61,48],[71,54],[68,70],[32,70]],'#2B3A4B',ink,1.3);
        path([[34,59],[50,55],[66,59],[63,68],[37,68]],plate,ink,1.1);
        line([[50,55],[50,97]],'#111A25',1.5);
        line([[34,70],[66,70]],'#111A25',1.2);
        path([[31,71],[69,71],[68,98],[32,98]],shell,ink,1.2);
        line([[38,76],[62,76]],'#718294',1);
        path([[29,54],[36,53],[35,82],[29,90],[24,87],[25,69]],shell,ink,1.3);
        path([[64,54],[71,54],[75,81],[70,90],[64,88]],shell,ink,1.3);
        // Radio is clipped to rear gear harness only; it is absent from front.
        path([[56,73],[67,73],[69,87],[57,88]],'#111A25',ink,1.2);
        path([[58,75],[65,75],[65,83],[58,83]],'#596B7E',ink,1);
        line([[61,76],[61,82]],'#B38B50',1);line([[66,70],[68,64],[71,63]],'#B38B50',1.2);
        ell(62,80,1,1,'#00D7FF',null);
        line([[34,97],[66,97]],'#B38B50',2);
      }
    }else{
      // Side-on shell is narrower than the front wedge. Only the near braced
      // arm is visible; the far-side arm/bracer is occluded behind the torso.
      path([[39,52],[49,47],[61,51],[67,60],[65,82],[67,99],[35,99],[38,82]],shell,ink,1.8);
      if(!back){
        path([[42,52],[54,55],[61,66],[56,72],[43,66]],plate,ink,1.1);
        line([[42,73],[61,73]],'#718294',1);
        // Near-side arm bends forward into a single bracer, with no far arm.
        if(dir==='l'){
          path([[41,55],[49,56],[51,68],[59,75],[64,72],[68,78],[62,85],[52,83],[45,75]],shell,ink,1.4);
          path([[59,72],[68,72],[72,80],[67,86],[58,82]],'#8797A5',ink,1.3);
          line([[60,76],[69,78]],'#B38B50',1.7);
          path([[63,81],[69,79],[73,83],[70,88],[64,87]],skin,ink,1);
        }else{
          // Far-side bent arm is occluded by the torso in the right profile.
          path([[43,55],[50,56],[53,66],[51,76],[45,80],[40,74]],shell,ink,1.2);
        }
      }else{
        path([[38,55],[49,50],[62,53],[66,65],[62,73],[40,73]],'#2B3A4B',ink,1.2);
        line([[41,68],[63,68]],'#718294',1);
        path([[40,56],[47,55],[47,83],[41,91],[35,87]],shell,ink,1.2);
        path([[61,56],[67,58],[70,85],[64,91],[60,83]],shell,ink,1.2);
        path([[55,74],[65,74],[66,87],[56,88]],'#111A25',ink,1.1);
        path([[57,76],[63,76],[63,83],[57,83]],'#596B7E',ink,1);
        line([[60,77],[60,82]],'#B38B50',1);
      }
      path([[38,97],[65,97],[65,101],[38,101]],'#202E3E',ink,1);
    }
    // Helmet: low brow shelf, squared jaw and compact chin.
    if(!side){
      if(!back){
        ell(50,31,12,14,grad(38,17,62,44,[[0,'#E4B28D'],[.55,skin],[1,'#86553F']]),ink,1.7);
        path([[36,23],[37,13],[44,8],[57,9],[64,17],[63,26],[57,22],[42,22]],'#111A25',ink,1.7);
        path([[33,20],[67,20],[68,25],[32,25]],'#596B7E',ink,1.5);
        path([[39,28],[45,27],[48,29]],'#090B10',ink,1);
        ell(44,31,1.2,1.7,'#171725',null);ell(55,31,1.2,1.7,'#171725',null);
        line([[40,27],[46,26]],'#171725',1.6);line([[53,26],[59,27]],'#171725',1.6);
        path([[49,32],[47,37],[52,38]],'#9B6449',null);
        line([[44,42],[50,43],[56,42]],'#754A3B',1.2);
      }else{
        ell(50,31,12,14,'#171D28',ink,1.5);
        path([[36,22],[38,12],[45,8],[57,9],[64,18],[63,26],[37,26]],'#111A25',ink,1.5);
        line([[42,16],[50,12],[59,17]],'#596B7E',1.1);
        path([[43,44],[57,44],[56,49],[44,49]],skin,null);
      }
    }else{
      ell(50,31,11,13,'#171D28',ink,1.5);
      if(!back){
        path([[46,20],[55,19],[63,25],[65,32],[60,39],[52,43],[43,39],[40,29]],grad(42,21,64,44,[[0,'#E4B28D'],[1,skin]]),ink,1.4);
        path([[39,22],[41,12],[49,8],[59,11],[65,19],[63,25],[48,21]],'#111A25',ink,1.5);
        path([[43,19],[65,19],[68,24],[44,24]],'#596B7E',ink,1.3);
        ell(59,30,1.1,1.5,'#171725',null);
        path([[62,31],[68,34],[64,37],[60,36]],skin,ink,1);
        line([[53,27],[60,26]],'#171725',1.4);
        line([[55,41],[61,40]],'#754A3B',1);
      }else{
        path([[39,20],[43,10],[56,9],[65,18],[64,28],[44,28]],'#111A25',ink,1.5);
        line([[44,15],[56,12],[63,18]],'#596B7E',1);
      }
    }
    // Restrained steel/ochre rim accents; no full-outline glow.
    g.save();g.globalAlpha=.55;g.shadowBlur=.7/scale;g.shadowColor='rgba(179,139,80,.35)';
    line([[30,54],[38,49],[45,48]],'rgba(179,139,80,.85)',1/scale);
    g.shadowColor='rgba(41,210,211,.25)';
    line([[60,52],[68,56],[71,64]],'rgba(113,190,211,.72)',1/scale);
    g.restore();g.restore();
  }


  // Vendor: forward-pitched stall worker with split waistcoat, open shirt
  // negative space, offset sash and a shallow tray supported by the palm.
  function drawVendorVector(n, dir, ctx, OWT, opts) {
    opts=opts||{}; const g=ctx, scale=OWT/36*.28;
    const sx=(n.rx!=null?n.rx:n.x)*OWT+OWT/2, sy=(n.ry!=null?n.ry:n.y)*OWT+OWT-5;
    const back=dir==='u', side=dir==='l'||dir==='r', flip=dir==='l';
    g.save();g.translate(sx,sy);g.scale(scale,scale);g.translate(-50,-139);
    if(flip){g.translate(50,0);g.scale(-1,1);g.translate(-50,0);}
    const ink='#171725',skin='#D09A73';
    const grad=(x1,y1,x2,y2,stops)=>{const z=g.createLinearGradient(x1,y1,x2,y2);stops.forEach(([p,c])=>z.addColorStop(p,c));return z;};
    const path=(p,fill,stroke=ink,w=1.7)=>{g.beginPath();g.moveTo(p[0][0],p[0][1]);p.slice(1).forEach(v=>g.lineTo(v[0],v[1]));g.closePath();g.fillStyle=fill;g.fill();if(stroke){g.strokeStyle=stroke;g.lineWidth=w;g.lineJoin='round';g.lineCap='round';g.stroke();}};
    const line=(p,c,w=1.4)=>{g.beginPath();g.moveTo(p[0][0],p[0][1]);p.slice(1).forEach(v=>g.lineTo(v[0],v[1]));g.strokeStyle=c;g.lineWidth=w;g.lineCap='round';g.lineJoin='round';g.stroke();};
    const ell=(x,y,rx,ry,fill,stroke=ink,w=1.3)=>{g.beginPath();g.ellipse(x,y,rx,ry,0,0,Math.PI*2);g.fillStyle=fill;g.fill();if(stroke){g.strokeStyle=stroke;g.lineWidth=w;g.stroke();}};
    const vest=grad(31,48,68,102,[[0,'#754B68'],[.48,'#4B3048'],[1,'#261B2B']]);
    const linen=grad(43,52,59,100,[[0,'#F0E4CA'],[1,'#BDAE91']]);
    const trouser=grad(37,99,64,134,[[0,'#544454'],[1,'#282333']]);
    const shoe='#302735';
    if(!side){
      // Leaning torso and offset leading foot; the stance is not upright or symmetric.
      path([[36,101],[48,102],[46,118],[43,132],[31,132],[32,117]],trouser);
      path([[51,98],[64,95],[68,111],[67,125],[72,132],[59,134],[54,121]],trouser);
      path([[29,129],[43,129],[46,134],[45,138],[27,138],[25,134]],shoe);
      path([[59,129],[70,128],[75,133],[74,137],[57,138],[56,134]],shoe);
      line([[30,135],[43,135]],'#B89B8A',1);line([[60,135],[71,135]],'#B89B8A',1);
    }else{
      path([[39,98],[54,97],[55,114],[60,128],[58,134],[43,134],[40,118]],trouser);
      path([[42,130],[57,130],[64,134],[64,138],[39,138]],shoe);
      line([[43,135],[60,135]],'#B89B8A',1);
    }
    path([[43,39],[56,39],[58,52],[42,52]],skin);
    if(!side){
      // Forward-pitched shoulder line, separated vest panels and open shirt center.
      path([[31,54],[43,47],[61,50],[71,59],[68,92],[76,101],[28,103],[32,87]],vest,ink,1.9);
      if(!back){
        path([[42,49],[50,60],[58,50],[55,47],[50,53],[45,46]],linen,ink,1.1);
        path([[45,57],[55,57],[57,78],[50,88],[43,78]],linen,ink,1.2);
        path([[32,56],[43,51],[48,62],[44,91],[31,97],[27,83]],vest,ink,1.5);
        path([[57,52],[68,58],[70,83],[65,97],[53,91],[52,62]],vest,ink,1.5);
        // Offset saffron sash leaves the shirt-shaped opening readable.
        line([[62,56],[58,69],[51,82],[42,96]],'#D8A247',4);
        line([[62,56],[58,69],[51,82],[42,96]],ink,.8);
        path([[30,55],[38,54],[37,77],[33,91],[26,90],[25,72]],vest,ink,1.3);
        path([[26,88],[34,88],[35,95],[28,97]],skin,ink,1.1);
        // Reaching shoulder/upper arm and continuous forearm-to-palm support.
        path([[65,56],[72,59],[78,72],[82,80],[88,81],[88,87],[79,89],[72,82],[68,72]],vest,ink,1.4);
        path([[77,80],[85,79],[91,82],[91,87],[84,90],[77,87]],skin,ink,1.1);
        // Shallow tray on character-left (viewer-right); palm is visibly under its lip.
        path([[72,75],[94,75],[97,79],[95,83],[73,83],[70,80]],'#D6C7A7',ink,1.5);
        path([[73,75],[94,75],[92,78],[74,78]],'#F1E6D1',ink,1);
        line([[75,80],[93,80]],'#8D735B',1);
        path([[80,82],[88,82],[90,86],[86,89],[79,87]],skin,ink,1);
        // Opposite arm hangs separately with clear negative space.
        path([[31,58],[37,58],[35,81],[30,91],[24,89],[26,72]],vest,ink,1.3);
        path([[24,88],[31,89],[31,96],[25,97]],skin,ink,1.1);
      }else{
        path([[31,55],[43,49],[61,51],[70,59],[67,91],[74,101],[28,103]],'#38263A',ink,1.8);
        path([[36,56],[47,53],[50,67],[43,93],[31,97]],vest,ink,1.3);
        path([[53,53],[66,58],[68,94],[56,97],[51,68]],vest,ink,1.3);
        line([[38,59],[42,80],[36,94]],'#D8A247',2.8);
        line([[50,53],[50,97]],'#201827',1.1);
        path([[28,57],[36,56],[34,83],[29,92],[23,89]],vest,ink,1.2);
        path([[64,58],[71,60],[75,85],[69,92],[64,85]],vest,ink,1.2);
        // Far-side tray is mostly hidden behind the torso, never a second floating prop.
        path([[67,78],[78,78],[82,81],[78,84],[68,84]],'#D6C7A7',ink,1);
      }
    }else{
      // Side profile: distinct forward pitch, near-side torso plane and advanced foot.
      path([[38,54],[49,47],[63,53],[70,63],[66,90],[75,102],[29,103],[35,86]],vest,ink,1.8);
      if(!back){
        path([[44,51],[54,54],[60,68],[54,76],[43,68]],linen,ink,1.1);
        path([[39,55],[48,53],[52,72],[43,93],[31,98],[29,82]],vest,ink,1.3);
        path([[55,55],[65,60],[67,91],[57,97],[50,73]],vest,ink,1.3);
        line([[63,57],[57,71],[47,91]],'#D8A247',3.5);
        if(dir==='l'){
          // Near arm bends forward; wrist and palm support the tray underside.
          path([[61,57],[69,62],[77,75],[84,80],[90,78],[93,84],[86,89],[76,86],[68,75]],vest,ink,1.3);
          path([[82,80],[90,78],[95,81],[94,86],[87,89],[81,86]],skin,ink,1);
          path([[85,75],[98,75],[99,79],[97,82],[84,82]],'#D6C7A7',ink,1.3);
          line([[86,78],[97,78]],'#8D735B',1);
        }else{
          // Far-side tray and hand are hidden behind the torso; only the
          // shoulder/upper-arm pitch remains visible at the rear contour.
          path([[61,57],[68,61],[72,73],[68,81],[63,77]],vest,ink,1.2);
        }
      }else{
        path([[39,56],[49,51],[64,56],[68,70],[62,96],[31,98]],'#38263A',ink,1.3);
        line([[43,58],[48,77],[38,95]],'#D8A247',2.6);
        path([[38,57],[44,57],[43,85],[37,94]],vest,ink,1.2);
        path([[62,59],[69,63],[73,86],[67,94],[62,83]],vest,ink,1.2);
      }
    }
    // Sloped soft cap and fuller cheek; front/profile face cues are distinct from Cook/Courier.
    if(!side){
      if(!back){
        ell(50,31,13,15,grad(37,17,63,45,[[0,'#F0C29D'],[.55,skin],[1,'#9C694F']]),ink,1.7);
        ell(39,37,4,6,'#9C694F',null);ell(61,37,4,6,'#9C694F',null);
        ell(44,31,1.5,1.9,'#171725',null);ell(56,30.5,1.5,1.9,'#171725',null);
        ell(44.5,30.2,.45,.5,'#FFF',null);ell(56.5,29.7,.45,.5,'#FFF',null);
        line([[40,28],[45,26],[48,28]],'#49302B',1.6);line([[53,27],[59,29]],'#49302B',1.3);
        path([[49,32],[48,37],[53,38]],'#A66E54',null);
        line([[43,41],[49,43],[56,40]],'#814B49',1.5);
      }else{
        ell(50,31,12,14,'#382B34',ink,1.5);line([[42,20],[44,39]],'#654A57',1);line([[56,20],[56,39]],'#654A57',1);
      }
      path([[36,22],[40,14],[51,11],[63,17],[66,24],[57,26],[40,24]],'#4B3048',ink,1.7);
      path([[35,22],[50,20],[68,23],[66,27],[48,27],[36,26]],'#D8A247',ink,1.2);
      line([[43,17],[53,14],[61,18]],'#B78A78',1);
    }else{
      ell(50,31,11,13,'#382B34',ink,1.4);
      if(!back){
        path([[43,25],[49,20],[59,23],[65,31],[62,39],[54,44],[45,41],[40,33]],grad(42,22,64,44,[[0,'#F0C29D'],[1,skin]]),ink,1.3);
        ell(45,34,2.2,3,'#B77F62',ink,.8);
        path([[59,30],[66,33],[70,37],[65,39],[60,36]],skin,ink,1);
        ell(61,31,1.1,1.4,'#171725',null);
        line([[56,27],[62,27]],'#49302B',1.4);line([[56,41],[62,40]],'#814B49',1.2);
      }
      path([[39,24],[44,15],[54,14],[64,21],[67,26],[56,28],[43,26]],'#4B3048',ink,1.5);
      path([[39,24],[54,22],[69,25],[68,29],[50,28],[40,27]],'#D8A247',ink,1.1);
    }
    g.save();g.globalAlpha=.55;g.shadowBlur=.7/scale;g.shadowColor='rgba(216,162,71,.35)';
    line([[31,55],[39,50],[46,49]],'rgba(231,190,128,.85)',1/scale);
    g.shadowColor='rgba(113,245,229,.25)';line([[62,54],[69,60],[72,67]],'rgba(113,245,229,.7)',1/scale);
    g.restore();g.restore();
  }

  // Clinic Worker: calm offset-hip stance, tapered wrap tunic, gathered low
  // hair coil/side tie and character-left hip pouch separate from the hand.
  function drawClinicVector(n, dir, ctx, OWT, opts) {
    opts=opts||{}; const g=ctx, scale=OWT/36*.28;
    const sx=(n.rx!=null?n.rx:n.x)*OWT+OWT/2, sy=(n.ry!=null?n.ry:n.y)*OWT+OWT-5;
    const back=dir==='u', side=dir==='l'||dir==='r', flip=dir==='l';
    g.save();g.translate(sx,sy);g.scale(scale,scale);g.translate(-50,-139);
    if(flip){g.translate(50,0);g.scale(-1,1);g.translate(-50,0);}
    const ink='#171725',skin='#D09A78';
    const grad=(x1,y1,x2,y2,stops)=>{const z=g.createLinearGradient(x1,y1,x2,y2);stops.forEach(([p,c])=>z.addColorStop(p,c));return z;};
    const path=(p,fill,stroke=ink,w=1.7)=>{g.beginPath();g.moveTo(p[0][0],p[0][1]);p.slice(1).forEach(v=>g.lineTo(v[0],v[1]));g.closePath();g.fillStyle=fill;g.fill();if(stroke){g.strokeStyle=stroke;g.lineWidth=w;g.lineJoin='round';g.lineCap='round';g.stroke();}};
    const line=(p,c,w=1.4)=>{g.beginPath();g.moveTo(p[0][0],p[0][1]);p.slice(1).forEach(v=>g.lineTo(v[0],v[1]));g.strokeStyle=c;g.lineWidth=w;g.lineCap='round';g.lineJoin='round';g.stroke();};
    const ell=(x,y,rx,ry,fill,stroke=ink,w=1.2)=>{g.beginPath();g.ellipse(x,y,rx,ry,0,0,Math.PI*2);g.fillStyle=fill;g.fill();if(stroke){g.strokeStyle=stroke;g.lineWidth=w;g.stroke();}};
    const tunic=grad(31,48,66,105,[[0,'#B5D5C9'],[.46,'#4D8B82'],[1,'#285D5B']]);
    const shadow='#173C3C',plum='#8B647F',trouser=grad(38,99,64,134,[[0,'#46535C'],[1,'#202A34']]);
    if(!side){
      // Soft shoulder line, shifted hip and angled foot stance.
      path([[37,100],[48,101],[46,118],[42,132],[30,132],[32,117]],trouser);
      path([[52,98],[63,96],[66,111],[65,126],[71,132],[58,134],[53,121]],trouser);
      path([[28,129],[42,129],[45,134],[44,138],[26,138],[24,134]],'#27323B');
      path([[58,129],[69,128],[74,133],[73,137],[56,138],[55,134]],'#27323B');
      line([[29,135],[42,135]],'#9CB6B0',1);line([[59,135],[70,135]],'#9CB6B0',1);
    }else{
      path([[39,98],[54,98],[55,115],[59,129],[57,134],[42,134],[40,119]],trouser);
      path([[41,130],[57,130],[64,134],[64,138],[38,138]],'#27323B');
      line([[42,135],[60,135]],'#9CB6B0',1);
    }
    path([[44,39],[56,39],[57,52],[43,52]],skin);
    if(!side){
      path([[33,54],[42,48],[60,49],[69,57],[66,91],[73,101],[29,102],[33,86]],tunic,ink,1.8);
      if(!back){
        path([[42,49],[50,59],[58,49],[55,46],[50,52],[45,46]],'#DDE9DE',ink,1.1);
        path([[36,55],[46,52],[51,66],[44,84],[33,97],[27,88]],tunic,ink,1.3);
        path([[58,52],[67,57],[68,88],[61,97],[49,82],[53,65]],tunic,ink,1.3);
        // Diagonal wrap panel overlaps the body; curved hem exposes trousers.
        path([[43,57],[58,59],[61,75],[51,91],[34,96],[38,81]],'#DDE9DE',ink,1.2);
        line([[44,59],[55,77],[39,94]],plum,2.3);
        path([[34,94],[65,91],[68,101],[30,102]],'#285D5B',ink,1.2);
        line([[35,99],[64,98]],'#B5D5C9',1.1);
        // Character-left pouch (viewer-right), attached at the hip.
        path([[57,79],[69,78],[71,90],[68,99],[56,99],[54,91]],plum,ink,1.3);
        path([[57,80],[67,80],[67,85],[56,86]],'#B38AA0',ink,1);
        line([[59,88],[66,88]],'#E0C9D6',1);
        // Hands stay outside the pouch silhouette with a clear 2px negative-space gap.
        path([[28,58],[35,58],[34,80],[30,90],[24,89],[25,73]],tunic,ink,1.2);
        path([[24,88],[31,88],[31,95],[25,96]],skin,ink,1);
        path([[66,58],[72,60],[75,77],[75,86],[72,89],[67,87],[68,73]],tunic,ink,1.2);
        path([[74,88],[80,88],[81,94],[76,96],[73,93]],skin,ink,1);
      }else{
        path([[33,55],[43,49],[60,50],[68,57],[66,91],[72,101],[29,102]],'#285D5B',ink,1.7);
        path([[38,56],[62,56],[65,69],[35,69]],'#4D8B82',ink,1.1);
        line([[50,52],[50,97]],shadow,1.2);
        line([[39,72],[61,72]],'#B5D5C9',1);
        // Rear pouch reverses to viewer-left, remaining character-left.
        path([[29,79],[40,78],[43,91],[39,99],[27,99],[25,90]],plum,ink,1.2);
        path([[28,81],[39,80],[39,86],[27,87]],'#B38AA0',ink,1);
        // The far arm is hidden behind the rear tunic so the character-left pouch
        // remains a distinct attached mass rather than merging with a hand.
        path([[64,58],[71,60],[75,84],[69,92],[64,84]],tunic,ink,1.2);
      }
    }else{
      // Narrow side-on tapered tunic with shifted hip and directional pouch occlusion.
      path([[40,53],[49,48],[62,52],[67,62],[64,89],[71,101],[30,102],[36,86]],tunic,ink,1.8);
      if(!back){
        path([[44,52],[55,55],[59,68],[51,80],[38,91],[33,86]],'#DDE9DE',ink,1.1);
        line([[46,57],[55,73],[39,92]],plum,2);
        path([[35,91],[64,90],[69,101],[30,102]],'#285D5B',ink,1.1);
        if(dir==='l'){
          // Near-side character-left pouch is behind the torso edge in this view.
          path([[30,80],[40,80],[42,92],[37,98],[27,97],[25,89]],plum,ink,1.1);
        }
        // Separate hand rests forward of the hip; never merges into the pouch.
        path([[62,57],[69,60],[73,78],[70,89],[64,89],[64,74]],tunic,ink,1.2);
        path([[64,88],[71,88],[71,95],[65,96]],skin,ink,1);
      }else{
        path([[40,55],[50,51],[62,55],[65,70],[61,96],[31,98]],'#285D5B',ink,1.2);
        line([[42,68],[62,68]],'#B5D5C9',1);
        line([[49,54],[50,96]],shadow,1.1);
      }
    }
    // Swept-back hair and low rear coil/side tie, deliberately unlike cap/helmet heads.
    if(!side){
      if(!back){
        ell(50,31,12.5,15,grad(37,17,62,45,[[0,'#E7B99A'],[.55,skin],[1,'#93654F']]),ink,1.6);
        ell(44,31,1.35,1.8,'#171725',null);ell(56,31,1.35,1.8,'#171725',null);
        line([[40,28],[45,27],[48,29]],'#3C2930',1.4);line([[53,28],[59,27]],'#3C2930',1.4);
        path([[48,32],[47,36],[51,38]],'#A87862',null);
        line([[44,42],[50,43],[55,41]],'#81534C',1.2);
        path([[37,20],[40,12],[51,10],[63,17],[64,23],[56,21],[47,19],[39,26]],'#35252B',ink,1.4);
      }else{
        ell(50,31,12,14,'#35252B',ink,1.5);
        line([[40,20],[43,39]],'#674B53',1);line([[50,18],[51,39]],'#674B53',1);line([[59,20],[57,38]],'#674B53',1);
      }
    }else{
      ell(50,31,11,13,'#35252B',ink,1.3);
      if(!back){
        path([[43,24],[49,19],[59,22],[64,30],[61,39],[53,44],[44,41],[40,33]],grad(42,21,64,44,[[0,'#E7B99A'],[1,skin]]),ink,1.2);
        ell(60,31,1.1,1.4,'#171725',null);
        path([[61,31],[67,34],[64,37],[59,36]],skin,ink,.9);
        line([[56,27],[62,26]],'#3C2930',1.3);
        line([[55,41],[61,40]],'#81534C',1.1);
      }
      path([[39,23],[43,15],[53,14],[63,20],[64,25],[55,26],[44,23]],'#35252B',ink,1.3);
    }
    // Low rear coil and side tie are visible from back/profile, not a high bun.
    if(back){ell(57,35,5.2,5.5,'#35252B',ink,1.2);line([[59,31],[65,28],[67,31]],plum,1.5);}
    else if(side){ell(58,37,4.2,4.5,'#35252B',ink,1.1);line([[60,35],[66,31],[68,34]],plum,1.4);}
    g.save();g.globalAlpha=.54;g.shadowBlur=.7/scale;g.shadowColor='rgba(113,190,211,.3)';
    line([[33,55],[41,50],[47,49]],'rgba(181,213,201,.85)',1/scale);
    g.shadowColor='rgba(216,162,71,.2)';line([[61,55],[68,60],[71,67]],'rgba(181,213,201,.65)',1/scale);
    g.restore();g.restore();
  }


  function createCivRenderer({CIV,HB_CIV,GRANNY_REF,OWT,og,drawGrannyVoltSprite}) {
    const { CIV_TO_ARCHETYPE, CIV_HEAD_STYLES, ARCHETYPES, PALETTE_ROLES, ARCHETYPE_TORSO_MASKS, CIV_TORSO_MASKS, USHER_TORSO_MASKS, FAN_TORSO_MASKS, BASE_RIG_PARTS, makeArchetypeRig, ARCHETYPE_RIG_PARTS, CIV_RIG_PARTS, FAN_RIG_PARTS, ARCHETYPE_PROP_LAYERS, CIV_PROP_LAYERS, ARCHETYPE_PROP_SHAPES, PROP_ROLE_COLORS, FAN_VARIANT_PALETTES, FAN_VARIANT_HEADS, FAN_VARIANT_PROPS, ARCHETYPE_ACCESSORY_ROLES } = TABLES;
    function owCiv(x,y,dir,moving,n,tm,ph,ctxOverride,qaOptions){
      const kind=n.civ;
      if(n.id==='granny'){drawGrannyVoltSprite(n,dir,moving,tm,ph,ctxOverride);return}
      if(kind==='cook'||kind==='usher'||kind==='courier'||kind==='runner'||kind==='coach'||kind==='ref'||kind==='guard'||kind==='vendor'||kind==='clinic'){
        const drawVector=kind==='cook'?drawCookVector:(kind==='usher'?drawUsherVector:(kind==='courier'?drawCourierVector:(kind==='runner'?drawRunnerVector:(kind==='coach'?drawCoachVector:(kind==='ref'?drawRefVector:(kind==='guard'?drawGuardVector:(kind==='vendor'?drawVendorVector:drawClinicVector)))))));
        drawVector(n,dir,ctxOverride||og,OWT,{moving,tm,ph});
        const qaCanvas=owCiv._vectorSnapshotCanvas||(owCiv._vectorSnapshotCanvas=document.createElement('canvas'));
        if(qaCanvas.width!==64)qaCanvas.width=64;if(qaCanvas.height!==96)qaCanvas.height=96;
        const qaCtx=qaCanvas.getContext('2d');qaCtx.setTransform(1,0,0,1,0,0);qaCtx.globalAlpha=1;
        qaCtx.globalCompositeOperation='source-over';qaCtx.clearRect(0,0,64,96);
        const qaOWT=36*.625/.28,qaNpc=Object.assign({},n,{x:0,y:0,rx:(32-qaOWT/2)/qaOWT,ry:(88-qaOWT)/qaOWT});
        drawVector(qaNpc,dir,qaCtx,qaOWT,{moving:false,tm:0,ph:0});
        owCiv._gridCanvas=qaCanvas;
        const pixels=qaCtx.getImageData(0,0,64,96).data,counts=new Map();let opaquePixelCount=0,outlinePixelCount=0;
        for(let p=0;p<pixels.length;p+=4){if(!pixels[p+3])continue;opaquePixelCount++;
          const hex='#'+[pixels[p],pixels[p+1],pixels[p+2]].map(v=>v.toString(16).padStart(2,'0')).join('');
          counts.set(hex,(counts.get(hex)||0)+1);if(hex==='#171725')outlinePixelCount++;}
        const dominant=(x0,y0,x1,y1)=>{const region=new Map();for(let y=y0;y<y1;y++)for(let x=x0;x<x1;x++){
          const p=(y*64+x)*4;if(!pixels[p+3])continue;const hex='#'+[pixels[p],pixels[p+1],pixels[p+2]].map(v=>v.toString(16).padStart(2,'0')).join('');
          region.set(hex,(region.get(hex)||0)+1);}return [...region].sort((a,b)=>b[1]-a[1])[0]||['#000000',0];};
        const [bodyColor,bodyPixelCount]=dominant(17,30,47,63),[pantsColor,pantsPixelCount]=dominant(17,63,47,82),[hairColor,hairPixelCount]=dominant(17,3,47,31);
        owCiv._lastPaletteMetrics={civ:kind,archetype:kind+'-vector',renderMode:'vector',colors:[...counts.keys()],
          uniqueColorCount:counts.size,opaquePixelCount,outlinePixelCount,outlineColor:'#171725',bodyColor,bodyPixelCount,
          pantsColor,pantsPixelCount,hairColor,hairPixelCount,colorPixelCounts:Object.fromEntries(counts)};
        const roleSets={ref:[{role:'ivory-official-stripes',color:'#F4F0E2'},{role:'graphite-stripes',color:'#222B33'},{role:'vermilion-shorts',color:'#C64C3E'},{role:'yellow-card',color:'#E8BE45'},{role:'whistle',color:'#C5A34D'},{role:'tall-socks',color:'#F2EFE4'},{role:'skin',color:'#A96F53'}],coach:[{role:'forest-coach-jacket',color:'#24583F'},{role:'cream-shoulder-yoke',color:'#D8D7B8'},{role:'practice-clipboard',color:'#C69A58'},{role:'whistle',color:'#D6B85D'},{role:'track-trousers',color:'#3A4650'},{role:'silver-temples',color:'#AEB5A8'},{role:'skin',color:'#B87959'}],runner:[{role:'coral-race-singlet',color:'#D94F43'},{role:'split-shorts',color:'#3C3454'},{role:'terry-sweatband',color:'#F6C95C'},{role:'race-bib',color:'#F5E8CE'},{role:'technical-shoes',color:'#D88B35'},{role:'skin',color:'#965A43'},{role:'curls',color:'#34252A'}],cook:[{role:'chef-coat',color:'#D9C6A6'},{role:'terracotta-apron',color:'#A84432'},{role:'copper-pan',color:'#B95B3C'},{role:'toque',color:'#F8F3E8'},{role:'skin',color:'#B97855'},{role:'hair',color:'#30242A'}],usher:[{role:'uniform-navy',color:'#294B70'},{role:'brass-trim',color:'#D6A84F'},{role:'skin',color:'#C98A62'},{role:'hair',color:'#241B26'}],courier:[{role:'windbreaker',color:'#237F83'},{role:'dispatch-satchel',color:'#B77A36'},{role:'parcel',color:'#F5D89A'},{role:'storm-cap',color:'#236E78'},{role:'skin',color:'#A96F54'},{role:'hair',color:'#29252B'}],guard:[{role:'protective-shell',color:'#34465B'},{role:'steel-bracer',color:'#8797A5'},{role:'blue-charcoal',color:'#243244'},{role:'ochre-gear',color:'#B38B50'},{role:'helmet',color:'#111A25'},{role:'skin',color:'#C98A62'}],vendor:[{role:'berry-waistcoat',color:'#4B3048'},{role:'linen-shirt',color:'#D6C7A7'},{role:'saffron-sash',color:'#D8A247'},{role:'service-tray',color:'#D6C7A7'},{role:'skin',color:'#D09A73'},{role:'cap',color:'#4B3048'}],clinic:[{role:'wrap-tunic',color:'#285D5B'},{role:'sea-glass',color:'#B5D5C9'},{role:'plum-pouch',color:'#8B647F'},{role:'trousers',color:'#202A34'},{role:'skin',color:'#D09A78'},{role:'hair',color:'#35252B'}]};
        owCiv._lastRoleDebugLegend=qaOptions&&(qaOptions.roleDebug||qaOptions.roleDebugLayers||qaOptions.roleDebugSourceLayers)?roleSets[kind]:null;
        owCiv._lastRoleDebugRows={civ:kind,direction:dir,view:dir==='u'?'back':(dir==='l'||dir==='r'?'side':'front'),torsoMaskRows:[],renderedSourceRows:[]};
        return;
      }
      const archetypeKey=CIV_TO_ARCHETYPE[kind];
      if(!archetypeKey||!ARCHETYPES[archetypeKey]||!CIV[kind])throw new Error('Missing civilian archetype mapping or palette: '+kind);
      const A=ARCHETYPES[archetypeKey],P=Object.assign({},A.palette,CIV[kind]);
      if(kind==='welder'&&!P.helm)P.helm='#69747e';
      const civTorsoMasks=kind==='usher'?USHER_TORSO_MASKS:(kind==='fan'?(FAN_TORSO_MASKS[n.id]||CIV_TORSO_MASKS[kind]||ARCHETYPE_TORSO_MASKS[A.torso]):(CIV_TORSO_MASKS[kind]||ARCHETYPE_TORSO_MASKS[A.torso]));
      const headStyle=kind==='fan'?(FAN_VARIANT_HEADS[n.id]||A.head):(CIV_HEAD_STYLES[kind]||A.head);
      const qaExcludeProps=!!(qaOptions&&qaOptions.excludeProps);
      if(n.hb&&HB_CIV[kind])Object.assign(P,HB_CIV[kind]);
      if(kind==='fan'&&FAN_VARIANT_PALETTES[n.id])Object.assign(P,FAN_VARIANT_PALETTES[n.id]);
      const palette=PALETTE_ROLES[archetypeKey];
      if(!palette||palette.skin.length!==3||palette.hair.length!==3||palette.clothing.length!==4||palette.accent.length!==2)throw new Error('Invalid 12-slot palette roles for '+archetypeKey);
      // Match Granny's measured umbrella-excluded body height (125 source rows);
      // civilian bodies occupy 80 visible source rows on the same 64x96 grid.
      // Use one shared scale for every civilian rather than per-role size multipliers.
      const targetG=ctxOverride||og,U=(GRANNY_REF.bodyHeight*GRANNY_REF.nativeScale)/GRANNY_REF.visibleCivHeight;
      const d=typeof dir==='number'?['d','u','l','r'][Math.max(0,Math.min(3,dir|0))]:(dir||'d').toLowerCase();
      const dirCode=d==='down'?'d':d==='up'?'u':d==='left'?'l':d==='right'?'r':d;
      const side=dirCode==='l'||dirCode==='r',back=dirCode==='u';
      const mixHex=(hex,target,amount)=>{
        if(typeof hex!=='string'||!/^#[0-9a-f]{6}$/i.test(hex))return hex;
        const a=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));
        const b=[1,3,5].map(i=>parseInt(target.slice(i,i+2),16));
        return '#'+a.map((v,i)=>Math.round(v+(b[i]-v)*amount).toString(16).padStart(2,'0')).join('');
      };
      const lum=h=>{const c=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255);return .2126*c[0]+.7152*c[1]+.0722*c[2]};
      const skin=palette.skin[0],skinShade=palette.skin[1],skinLight=palette.skin[2];
      // CIV is the live per-civilian color source. Archetype palettes provide
      // shading fallbacks, while CIV body/trim/pants/hair colors distinguish
      // individuals that share a body rig (runner/coach/ref, broker/usher/fan).
      const hairBase=P.hair||palette.hair[0];
      const hairShade=P.hair?mixHex(P.hair,'#000000',.32):palette.hair[1];
      const hairLight=P.hair?mixHex(P.hair,'#ffffff',.24):palette.hair[2];
      const clothBase0=P.body||palette.clothing[0];
      const clothBase=lum(clothBase0)<.26?mixHex(clothBase0,'#ffffff',.22):clothBase0;
      const needsValueSeparation=['usher','hacker','tech','vendor','guard','slicker','broker'].includes(kind);
      const clothShade=P.body?mixHex(clothBase,'#000000',needsValueSeparation?.27:.34):palette.clothing[1];
      const clothLight=P.body?mixHex(clothBase,'#ffffff',needsValueSeparation?.48:.34):palette.clothing[2];
      const clothLower0=P.pants?(needsValueSeparation?mixHex(P.pants,'#ffffff',.12):P.pants):palette.clothing[3];
      const clothLower=lum(clothLower0)<.1?mixHex(clothLower0,'#ffffff',.16):clothLower0;
      const accentGarment=P.trim||palette.accent[0],accentProp=palette.accent[1];
      const ink=mixHex(hairBase,'#000000',.85),N=64,H=96,SCALE=1;
      // Higher-density fixed pixel canvas: 32 columns x 48 rows.
      const grid=Array.from({length:H},()=>Array(N).fill(null));
      const debugSourceGrid=qaOptions&&(qaOptions.roleDebugLayers||qaOptions.roleDebugSourceLayers)?Array.from({length:H},()=>Array(N).fill(null)):null;
      let debugLayer='base';
      const put=(x0,y0,w,h,role)=>{for(let yy=y0*2;yy<(y0+h)*2;yy++)for(let xx=x0*2;xx<(x0+w)*2;xx++)if(xx>=0&&xx<N&&yy>=0&&yy<H){grid[yy][xx]=role;if(debugSourceGrid)debugSourceGrid[yy][xx]=debugLayer}};
      // Paint each logical cell as a solid 2x2 native block, avoiding sparse stripe fills.
      const set=(xx,yy,role)=>{for(let py=yy*2;py<yy*2+2;py++)for(let px=xx*2;px<xx*2+2;px++)if(px>=0&&px<N&&py>=0&&py<H){grid[py][px]=role;if(debugSourceGrid)debugSourceGrid[py][px]=debugLayer}};
      const PROP_SHAPES=ARCHETYPE_PROP_SHAPES;
      const paintProp=(x,y,w,h,role)=>{
        const pattern=PROP_SHAPES[role];
        if(!pattern){put(x,y,w,h,role);return}
        // Cut the prop's footprint out of the body first. Otherwise transparent
        // mask corners reveal the shirt underneath and turn every prop into a box.
        for(let py=y*2;py<(y+h)*2;py++)for(let px=x*2;px<(x+w)*2;px++)if(px>=0&&px<N&&py>=0&&py<H)grid[py][px]=null;
        for(let yy=0;yy<h;yy++){
          const row=pattern[Math.min(pattern.length-1,Math.floor((yy+.5)*pattern.length/h))];
          for(let xx=0;xx<w;xx++){
            const cell=row[Math.min(row.length-1,Math.floor((xx+.5)*row.length/w))];
            if(cell!==' '&&cell!=='.')set(x+xx,y+yy,role);
          }
        }
        // Tiny readable prop details; highlights use the garment's light role.
        if(role==='medkit'&&w>=3&&h>=3){set(x+Math.floor(w/2),y+1,'bodyhi');set(x+Math.floor(w/2),y+2,'bodyhi');set(x+Math.floor(w/2)-1,y+1,'bodyhi');set(x+Math.floor(w/2)+1,y+1,'bodyhi')}
        if(role==='shield'&&w>=3&&h>=3)set(x+Math.floor(w/2),y+1,'bodyhi');
        if(role==='guitar'&&w>=3&&h>=3)set(x+Math.floor(w/2),y+Math.floor(h*0.7),'bodyhi');
        if(role==='briefcase'&&w>=3)set(x+Math.floor(w/2),y,'bodyhi');
        if(role==='clipboard'&&w>=3)set(x+Math.floor(w/2),y+1,'bodyhi');
        if(role==='notebook'&&w>=3)set(x,y+1,'bodyhi');
        if(role==='parcel'&&w>=3&&h>=3)set(x+Math.floor(w/2),y+1,'bodyhi');
        if(role==='bowl'&&w>=3)set(x+Math.floor(w/2),y,'bodyhi');
      };
      // Head: hand-shaped pixel silhouette; clipped corners create a rounded cranium and jaw.
      put(12,1,8,7,'skin');put(11,2,10,6,'skin');put(13,8,6,1,'skin');
      set(11,1,null);set(20,1,null);set(11,8,null);set(20,8,null);set(12,9,null);set(19,9,null);
      // Two-pixel neck is added below the face for a clear head-to-body connection.
    
      put(10,2,1,6,'hair');put(21,2,1,6,'hair');
      put(12,0,8,2,'hair');put(11,1,10,2,'hair');
      // One-pixel sideburns frame both sides of the face.
      put(10,5,1,4,'hair');put(21,5,1,4,'hair');
      // Visible one-pixel sideburn tips on both sides of the front-facing face.
      if(!side&&!back){set(11,7,'hair');set(20,7,'hair');}
      if(side){
        put(10,2,2,7,'hair');
        put(11,8,1,1,'hair'); // one-pixel sideburn
        // Profile nose is painted as a native 1x1 pixel after logical geometry.
        set(19,4,'inkdetail');set(18,3,'skinshade');
      }else if(back){
        put(11,0,10,10,'hair');put(13,8,6,1,'hairlight');
      }else{
        put(10,2,2,7,'hair');put(20,2,2,7,'hair');
        // Single hanging lock on the viewer's left side of the face.
        put(10,4,1,5,'hair');
        put(14,3,1,2,'hair'); // one-pixel fringe over forehead
        if(headStyle==='helmet'||headStyle==='hood'){
          set(15,5,'inkdetail');set(17,5,'inkdetail');set(16,8,'inkdetail');
        }
      }
      if(headStyle==='bun')put(19,0,4,3,'hair');
      // Fan headwear must alter the rendered outline as well as the palette.
      // These one-pixel brim/hood/tuft extensions remain inside the 64x96
      // sprite and are intentionally distinct per headwear family.
      if(kind==='fan'){
        if(headStyle==='cap-profile')set(22,3,'cloth');
        else if(headStyle==='newsboy-cap'){set(9,2,'cloth');set(22,2,'cloth')}
        else if(headStyle==='work-cap'){set(9,1,'cloth');set(22,1,'cloth')}
        else if(headStyle==='beanie'){set(10,1,'cloth');set(21,1,'cloth')}
        else if(headStyle==='hat'){set(9,1,'clothhi');set(22,1,'clothhi')}
        else if(headStyle==='round-fringe'){set(9,0,'hair');set(22,0,'hair')}
        else if(headStyle==='hair-band'){set(9,4,'hair');set(22,4,'hair')}
        else if(headStyle==='hood'){put(9,2,1,5,'cloth');put(22,2,1,5,'cloth')}
        else if(headStyle==='bucket-hat'){put(8,0,16,1,'cloth');put(10,2,12,3,'cloth');put(8,0,2,1,'clothhi')}
        else if(headStyle==='visor'){put(9,1,14,1,'clothhi');put(11,2,10,2,'cloth')}
        else if(headStyle==='cowboy-hat'){put(7,0,18,1,'cloth');put(10,2,12,3,'cloth');put(7,0,2,1,'clothhi')}
        else if(headStyle==='pom-beanie'){put(11,0,10,3,'cloth');put(15,0,2,1,'clothhi')}
      }
      if(headStyle==='round-fringe'){put(11,0,10,2,'hair');put(13,2,6,1,'hairlight');put(14,3,4,1,'hair')}
      if(headStyle==='chef-hat'){
        put(11,0,4,2,'clothhi');put(15,0,4,2,'cloth');put(19,0,4,2,'clothhi');
        put(10,2,12,1,'cloth');
      }
      if(headStyle==='mouse-ears'){
        put(8,0,4,4,'hair');put(20,0,4,4,'hair');
        set(9,0,'hairlight');set(22,0,'hairlight');
      }
      if(headStyle==='helmet')put(10,0,12,4,'helm');
      else if(headStyle==='hood'){put(10,1,12,3,'clothhi');put(10,3,2,6,'cloth');put(20,3,2,6,'cloth')}
      else if(headStyle==='cap-profile'){put(10,1,12,2,'cloth');put(18,3,5,1,'clothhi')}
      else if(headStyle==='newsboy-cap'){put(10,0,12,2,'cloth');put(9,2,14,1,'clothhi');put(19,3,5,1,'cloth')}
      else if(headStyle==='work-cap'){put(9,1,14,1,'clothhi');put(12,0,8,2,'cloth')}
      else if(headStyle==='beanie'){put(12,0,8,2,'cloth');put(10,2,12,1,'clothhi')}
      else if(headStyle==='hat'){put(9,1,14,1,'clothhi');put(12,0,8,2,'cloth')}
      else if(headStyle==='hair-band')put(11,1,10,1,'hairband')
      else if(headStyle==='bucket-hat'){put(9,0,14,1,'cloth');put(11,1,10,3,'cloth')}
      else if(headStyle==='visor'){put(10,1,14,1,'cloth');put(12,2,10,1,'cloth')}
      else if(headStyle==='cowboy-hat'){put(8,0,16,1,'cloth');put(10,2,12,3,'cloth')}
      else if(headStyle==='pom-beanie'){put(11,0,10,3,'cloth');set(16,0,'clothhi')}
      if(headStyle==='welder-mask'){put(10,0,12,3,'helm');put(9,2,14,1,'inkdetail');put(11,3,10,1,'inkdetail')}
      // Facial planes and headwear highlights reuse the existing palette roles.
      if(!back){
        for(let xx=12;xx<=19;xx++)set(xx,3,'skinshade');
        for(let xx=14;xx<=18;xx++)set(xx,9,'skinshade');
        set(13,6,'skinlight');
        if(!side){grid[9][27]='skinlight';grid[9][37]='skinlight';}
      }
      if(headStyle==='round-fringe'||headStyle==='bun'){
        if(!back){grid[1][27]='hairlight';grid[1][28]='hairlight';}
        else {grid[2][29]='hairlight';grid[2][30]='hairlight';}
      }else if(headStyle==='helmet'){
        if(!back){grid[2][25]='clothhi';grid[2][26]='clothhi';grid[2][27]='clothhi';}
        else {grid[2][36]='clothhi';grid[2][37]='clothhi';}
      }else if(headStyle==='cap-profile'||headStyle==='newsboy-cap'||headStyle==='work-cap'||headStyle==='hat'){
        if(!back){grid[5][37]='clothhi';grid[5][38]='clothhi';}
        else {grid[5][25]='clothhi';grid[5][26]='clothhi';}
      }else if(headStyle==='beanie'){
        grid[1][27]='clothhi';grid[1][28]='clothhi';grid[1][29]='clothhi';
      }
      if(!back&&headStyle!=='helmet'&&headStyle!=='hood'){set(side?19:14,5,'inkdetail');if(!side)set(18,5,'inkdetail');}
      // Torso: front/back 12x14; profile 8x14 with four shadow + four base columns.
      // Body coordinates use a 16-wide local anatomy grid centered at X=8;
      // local shoulder Y=8 maps to grid Y=10, and local waist Y=12 to grid Y=14.
      if(side){
        // Profile torso has a shoulder bulge, narrow waist and hip return.
        const profileRows=civTorsoMasks.side;
        for(const [yy,x1,x2] of profileRows){debugLayer=yy>=18?'torso-mask-hem':'torso-mask-upper';for(let xx=x1;xx<=x2;xx++)set(xx,yy,'body')}
        for(let yy=10;yy<=23;yy++)for(let xx=12;xx<=15;xx++)if(grid[yy][xx]==='body')set(xx,yy,'bodyshade');
        for(let yy=12;yy<=16;yy++)set(18,yy,'bodyhi');
      }else{
        // Shared humanoid base silhouette: broad shoulder yoke, tapered ribcage,
        // defined waist, then a slight hip flare. These proportions are the
        // reusable anatomy rules for every non-player civilian archetype.
        // Each role gets its own torso contour while sharing the same Granny-calibrated
        // height and pixel grid. These are silhouette masks, not palette-only variants.
        const torsoRows=civTorsoMasks[back?'back':'front'];
        for(const [yy,x1,x2] of torsoRows){debugLayer=yy>=18?'torso-mask-hem':'torso-mask-upper';for(let xx=x1;xx<=x2;xx++)set(xx,yy,'body')}
        // Layered value structure: shadow under the right shoulder and along
        // the right ribcage, with a narrow upper-left highlight to round volume.
        for(let yy=10;yy<=22;yy++)for(let xx=17;xx<=22;xx++)if(grid[yy][xx]==='body')set(xx,yy,'bodyshade');
        for(let yy=12;yy<=17;yy++)for(let xx=10;xx<=11;xx++)if(grid[yy][xx]==='body')set(xx,yy,'bodyhi');
        set(21,23,'body');
        // Narrow neck joins the trapezius-shaped shoulder line.
        put(15,9,2,3,'skin');
      }
      // Articulated arms: broaden the shoulder cap, define an elbow, and
      // taper the forearm into a visible hand. The stepped contour avoids a tray pose.
      const rigView=side?'side':back?'back':'front';
      const rigParts=(kind==='fan'?(FAN_RIG_PARTS[n.id]||CIV_RIG_PARTS[kind]):(CIV_RIG_PARTS[kind]||ARCHETYPE_RIG_PARTS[archetypeKey]))[rigView];
      for(const [rx,ry,rw,rh,role] of rigParts.arms){debugLayer=role==='skin'?'hands':'sleeves-arms';put(rx,ry,rw,rh,role)}
      // Directional limb masks are table-driven; the same rig is shared while each archetype owns its silhouette data.
      for(const [rx,ry,rw,rh,role] of rigParts.legs){debugLayer='legs';put(rx,ry,rw,rh,role==='bodyhi'?'leghi':role)}
      // Fan gear is held: a short bent forearm bridges the raised hand to the prop.
      if(kind==='fan'){
        if(rigView==='front'){
          put(6,18,1,4,'arm');put(7,20,1,3,'armhi');put(8,21,1,2,'skin');
        }else if(rigView==='side'){
          put(22,18,2,4,'arm');put(24,20,2,3,'armhi');put(26,21,1,2,'skin');
        }else{
          put(23,18,1,4,'arm');put(24,20,1,3,'armhi');put(25,21,1,2,'skin');
        }
      }
      if(P.stripes&&!side&&!back)for(let yy=12;yy<22;yy++){set(12,yy,'clothhi');set(19,yy,'clothhi')}
      debugLayer='garment-overlays';
      if(P.apron&&!back){debugLayer='apron';put(13,16,6,8,'apron')}
      if(P.jacket||kind==='courier'){debugLayer='garment-overlays';for(let yy=12;yy<22;yy++)set(16,yy,'bodyshade')}
      // Archetype-specific garment construction keeps the five civilians from
      // collapsing into recolors of one generic body.
      if((archetypeKey==='athletic'||archetypeKey==='youth')&&!back&&!side){
        // Runner: raised knit shoulder seam and a broad chest panel.
        for(let xx=11;xx<=20;xx++)set(xx,14,'bodyhi');
        for(let xx=12;xx<=19;xx++)set(xx,15,'body');
        set(12,17,'bodyhi');set(19,17,'bodyshade');
      }else if(['courier','trades','performer'].includes(archetypeKey)&&!back){
        // Courier: offset zipper, collar fold, and a diagonal bag strap.
        for(let yy=12;yy<=21;yy++)set(15,yy,'inkdetail');
        for(let yy=13;yy<=20;yy++)set(14,yy,'bodyhi');
        if(!side)for(let i=0;i<=8;i++)set(19-i,13+i,'pack');
      }else if(archetypeKey==='guard'&&!back){
        // Guard: distinct shoulder armor and a reinforced central chest plate.
        put(side?18:8,10,3,3,'helm');put(side?18:23,10,3,3,'helm');
        if(!side){
          put(12,13,8,7,'helm');
          for(let xx=13;xx<=18;xx++)set(xx,14,'bodyhi');
          for(let xx=13;xx<=18;xx++)set(xx,19,'inkdetail');
        }else put(15,13,4,7,'helm');
      }else if(archetypeKey==='vendor'&&!back){
        // Vendor: visible shoulder straps, broad apron bib, and lower pocket seam.
        if(!side){
          put(12,12,2,12,'clothhi');put(18,12,2,12,'clothhi');
          put(12,15,8,9,'apron');
          for(let xx=14;xx<=17;xx++)set(xx,20,'bodyshade');
        }else put(15,14,4,9,'apron');
      }else if((archetypeKey==='clinic'||archetypeKey==='elder')&&!back){
        // Clinic worker: open coat lapels and a clear medical cross on the chest.
        if(!side){
          put(12,12,2,7,'clothhi');put(18,12,2,7,'clothhi');
          set(15,16,'inkdetail');set(16,16,'inkdetail');
          set(16,15,'inkdetail');set(16,17,'inkdetail');
        }else put(16,13,2,7,'clothhi');
      }
      // Individual trade and civic garment motifs make job identity readable beyond palette.
      if(!side&&!back){
        switch(kind){
          case 'coach':
            put(14,12,4,2,'clothhi');set(15,15,'inkdetail');set(16,15,'inkdetail');set(16,18,'clothhi');break;
          case 'ref':
            for(let yy=13;yy<=21;yy+=2){set(12,yy,'clothhi');set(19,yy,'clothhi');}
            set(15,13,'bodyshade');set(16,13,'bodyshade');break;
          case 'cook':
            put(12,14,8,9,'apron');set(15,16,'clothhi');set(16,16,'clothhi');
            set(15,19,'inkdetail');set(16,19,'inkdetail');break;
          case 'tech':
            put(12,13,8,8,'bodyshade');
            for(const yy of [14,17,20])for(let xx=13;xx<=18;xx+=2)set(xx,yy,'clothhi');
            set(14,16,'inkdetail');set(18,19,'inkdetail');break;
          case 'hacker':
            put(13,17,6,4,'bodyshade');set(14,18,'clothhi');set(18,18,'clothhi');
            set(15,20,'inkdetail');set(16,20,'inkdetail');break;
          case 'fisher':
            put(12,12,2,10,'clothhi');put(18,12,2,10,'clothhi');
            put(13,16,6,6,'apron');set(15,18,'bodyhi');set(16,18,'bodyhi');break;
          case 'sailor':
            set(12,13,'clothhi');set(13,14,'clothhi');set(14,15,'clothhi');
            set(19,13,'clothhi');set(18,14,'clothhi');set(17,15,'clothhi');
            set(15,17,'inkdetail');set(16,17,'inkdetail');break;
          case 'slicker':
            put(12,12,8,10,'bodyshade');
            for(const yy of [14,17,20]){set(15,yy,'clothhi');set(16,yy,'clothhi');}
            break;
          case 'painter':
            set(12,15,'clothhi');set(19,14,'bodyhi');set(14,19,'clothhi');
            set(18,20,'bodyhi');set(16,16,'inkdetail');break;
          case 'welder':
            put(12,15,8,8,'apron');put(11,12,2,4,'bodyshade');
            set(15,17,'clothhi');set(16,17,'clothhi');break;
          case 'kid':
            put(13,16,6,5,'pack');set(15,17,'clothhi');set(16,17,'clothhi');break;
          case 'kid2':
            put(13,19,6,2,'bodyshade');set(15,15,'clothhi');set(16,15,'clothhi');
            set(15,19,'inkdetail');break;
          case 'mouse':
            put(14,17,4,4,'bodyshade');set(15,18,'clothhi');break;
          case 'dancer':
            for(let yy=13;yy<=21;yy++)set(12+Math.floor((yy-13)/2),yy,'clothhi');
            set(18,20,'bodyhi');break;
          case 'broker':
            for(let yy=13;yy<=21;yy++)set(16,yy,'inkdetail');
            set(15,14,'clothhi');set(17,14,'clothhi');
            set(15,18,'bodyhi');break;
          case 'usher':
            put(11,12,2,3,'clothhi');put(19,12,2,3,'clothhi');
            set(15,15,'clothhi');set(16,15,'clothhi');set(16,18,'inkdetail');break;
          case 'busker':
            for(let yy=13;yy<=21;yy++)set(12+Math.floor((yy-13)/2),yy,'bodyshade');
            set(18,17,'clothhi');set(18,18,'clothhi');break;
        }
      }else if(back){
        // Back views carry profession-specific construction, not just recolors.
        if(kind==='fisher'){put(12,13,2,10,'bodyshade');put(18,13,2,10,'bodyshade');set(15,15,'clothhi');set(16,15,'clothhi');put(14,20,4,3,'apron');}
        if(kind==='welder'){put(11,13,3,11,'bodyshade');put(18,13,3,11,'bodyshade');put(13,18,6,6,'apron');set(15,20,'clothhi');set(16,20,'clothhi');}
        if(kind==='sailor'){set(13,13,'clothhi');set(18,13,'clothhi');for(let xx=14;xx<=17;xx++)set(xx,14,'bodyshade');set(14,16,'clothhi');set(17,16,'clothhi');}
        if(kind==='slicker'){put(13,13,6,11,'bodyshade');set(15,15,'clothhi');set(16,15,'clothhi');for(let yy=17;yy<=21;yy++)set(15,yy,'inkdetail');}
        if(kind==='painter'){put(12,15,2,8,'bodyshade');put(18,15,2,8,'bodyshade');put(14,18,4,5,'apron');set(15,19,'clothhi');set(16,19,'clothhi');}
        if(kind==='broker'||kind==='usher'){put(13,13,6,3,'bodyshade');set(15,16,'bodyshade');set(16,16,'bodyshade');for(let yy=17;yy<=22;yy++)set(16,yy,'bodyshade');}
        if(kind==='tech'){put(13,14,6,7,'bodyshade');set(15,16,'clothhi');set(16,16,'clothhi');set(14,19,'inkdetail');set(18,19,'inkdetail');}
        if(kind==='hacker'){put(12,13,8,10,'bodyshade');set(15,15,'clothhi');set(16,15,'clothhi');set(14,19,'inkdetail');set(17,20,'inkdetail');}
        if(kind==='cook'){put(12,13,2,10,'clothhi');put(18,13,2,10,'clothhi');put(14,19,4,5,'apron');set(15,20,'bodyshade');set(16,20,'bodyshade');}
        if(kind==='clinic'){put(12,13,2,9,'clothhi');put(18,13,2,9,'clothhi');set(15,17,'inkdetail');set(16,17,'inkdetail');set(15,18,'inkdetail');set(16,18,'inkdetail');}
        if(kind==='coach'){put(12,13,8,2,'clothhi');set(15,17,'bodyshade');set(16,17,'bodyshade');set(14,20,'clothhi');set(17,20,'clothhi');}
        if(kind==='ref'){for(let yy=13;yy<=21;yy+=2){set(13,yy,'clothhi');set(18,yy,'clothhi');}set(15,14,'bodyshade');set(16,14,'bodyshade');}
        if(kind==='dancer'){for(let yy=14;yy<=21;yy++)set(13+Math.floor((yy-14)/2),yy,'clothhi');set(18,21,'bodyhi');}
        if(kind==='busker'){for(let yy=13;yy<=21;yy++)set(15,yy,'bodyshade');set(14,15,'clothhi');set(17,19,'clothhi');}
      }else{
        // Side profiles get their own readable profession cues at 1x scale.
        if(kind==='fisher'){put(15,14,4,9,'apron');set(17,13,'clothhi');set(18,16,'inkdetail');}
        if(kind==='welder'){put(15,14,4,9,'apron');put(18,8,4,2,'inkdetail');set(19,9,'clothhi');set(17,19,'bodyhi');}
        if(kind==='sailor'){set(17,14,'clothhi');put(15,16,3,4,'bodyshade');set(17,19,'clothhi');}
        if(kind==='slicker'){put(15,13,3,10,'bodyshade');set(16,17,'clothhi');for(let yy=16;yy<=21;yy+=2)set(18,yy,'inkdetail');}
        if(kind==='painter'){put(16,15,3,8,'apron');set(18,16,'clothhi');set(17,20,'bodyhi');}
        if(kind==='broker'||kind==='usher'){set(16,16,'bodyshade');put(17,14,2,7,'clothhi');set(18,19,'inkdetail');}
        if(kind==='tech'){put(17,15,3,6,'bodyshade');set(18,18,'clothhi');set(17,20,'inkdetail');}
        if(kind==='hacker'){put(16,13,4,9,'bodyshade');set(18,16,'inkdetail');set(17,20,'clothhi');}
        if(kind==='cook'){put(15,15,4,8,'apron');set(17,18,'clothhi');set(18,20,'inkdetail');}
        if(kind==='clinic'){put(16,13,3,8,'clothhi');set(17,17,'inkdetail');set(18,18,'inkdetail');set(17,19,'clothhi');}
        if(kind==='coach'){set(17,14,'clothhi');set(17,18,'bodyshade');set(18,15,'inkdetail');set(18,16,'inkdetail');}
        if(kind==='ref'){for(let yy=14;yy<=20;yy+=2)set(17,yy,'clothhi');set(18,22,'inkdetail');}
        if(kind==='dancer'){for(let yy=14;yy<=20;yy+=2)set(15,yy,'clothhi');set(17,22,'bodyhi');}
        if(kind==='busker'){put(17,15,3,7,'bodyshade');set(18,18,'clothhi');set(17,20,'inkdetail');}
        if(kind==='courier'){put(16,13,2,9,'bodyshade');set(17,14,'clothhi');set(18,18,'inkdetail');}
      }
      // Layered clothing details: dark collar under neck and crisp shirt-to-trouser hem.
      if(!back){
        for(let xx=13;xx<=18;xx++)set(xx,11,'bodyshade');
        // One-pixel dark collar seam directly beneath the neck.
        set(15,12,'inkdetail');set(16,12,'inkdetail');
      }
      if(!side&&!back){
        // Single-pixel belt and shirt-over-pants shadow seam.
        for(let xx=10;xx<=21;xx++)set(xx,22,'inkdetail');
        for(let xx=9;xx<=22;xx++)set(xx,23,'bodyshade');
      }else if(side){
        for(let xx=13;xx<20;xx++)set(xx,23,'bodyshade');
        // Vertical hem seam keeps the shirt distinct from the separated legs.
        for(let yy=20;yy<=23;yy++)set(16,yy,'bodyshade');
        // Keep both requested stride-gap columns empty; no shadow fill is painted here.
        // (The renderer's outer outline pass supplies edge definition.)
      }
      if(P.scarf&&!back){if(side)put(16,10,3,3,'clothhi');else put(10,10,12,3,'clothhi');}
      if(!qaExcludeProps&&P.pack&&(back||side))put(side?19:9,14,3,9,'pack');
      if(!qaExcludeProps&&P.umb){put(27,0,2,24,'umb');put(23,0,8,2,'umbhi')}
      if(!qaExcludeProps&&P.keys){if(side||back)put(15,28,2,3,'key');else put(22,24,2,3,'key');}
      // Props are explicit per-archetype/per-direction layers; no shared prop footprint is inferred.
      if(!qaExcludeProps&&['kid','mouse'].includes(kind)&&rigView==='front'){put(14,13,1,8,'pack');put(17,13,1,8,'pack');}
      const propSpec=kind==='fan'?ARCHETYPE_PROP_LAYERS.fan:(CIV_PROP_LAYERS[kind]||ARCHETYPE_PROP_LAYERS[archetypeKey]);
      const declaredPropType=propSpec&&propSpec.types&&propSpec.types[rigView];
      if(!propSpec||!declaredPropType||propSpec.types[rigView]!==declaredPropType) {
        throw new Error('Archetype '+rigView+' prop metadata/table mismatch: '+archetypeKey);
      }
      const fanPropRole=FAN_VARIANT_PROPS[n.id]||'foamfinger';
      const propLayers=kind==='fan'
        ? [[rigView==='front'?1:rigView==='side'?24:24,12,5,14,fanPropRole]]
        : propSpec[rigView];
      // Bridge the wrist to the occupation-specific tool before painting it.
      const heldPropKinds=new Set(['coach','fisher','welder','sailor','painter','slicker','cook','vendor','dancer','busker']);
      debugLayer='held-hand-bridge';
      if(!qaExcludeProps&&heldPropKinds.has(kind)){
        if(rigView==='front'){put(21,17,2,4,'arm');put(22,19,2,2,'skin');}
        else if(rigView==='side'){put(22,16,3,3,'arm');put(24,17,2,2,'skin');}
      }
      if(!qaExcludeProps&&kind==='ref'){
        if(rigView==='front'){put(16,12,3,3,'arm');put(18,12,2,2,'skin');}
      }
      if(!qaExcludeProps&&kind==='welder'&&rigView==='back'){
        // A narrow shoulder strap joins the cylinder to the back rig in the rendered mask.
        put(16,12,2,10,'bodyshade');
      }
      if(!qaExcludeProps&&kind==='busker'&&rigView==='back'){
        // Guitar-case strap runs from shoulder to lower case so the silhouette is one piece.
        put(12,12,2,10,'bodyshade');
      }
      debugLayer='held-props';
      for(const [px,py,pw,ph,role] of propLayers){
        if(qaExcludeProps&&ARCHETYPE_ACCESSORY_ROLES.has(role))continue;
        if(ARCHETYPE_ACCESSORY_ROLES.has(role))paintProp(px,py,pw,ph,role);
        else put(px,py,pw,ph,role);
      }
      if(P.long){if(side)put(15,22,3,2,'bodyshade');else put(10,22,12,2,'bodyshade');}
      // Give the footwear a dark sole and toe highlight using existing palette roles.
      if(!side){
        for(let xx=10;xx<=14;xx++)set(xx,39,'inkdetail');
        for(let xx=18;xx<=22;xx++)set(xx,39,'inkdetail');
        set(10,37,'leghi');set(18,37,'leghi');
      }else{
        for(let xx=9;xx<=13;xx++)set(xx,39,'inkdetail');
        for(let xx=17;xx<=21;xx++)set(xx,39,'inkdetail');
        set(9,37,'leghi');set(17,37,'leghi');
      }
      if(side&&dirCode==='l')for(let yy=0;yy<H;yy++)grid[yy].reverse();
      const colorFor=(role,xx,yy)=>{
        switch(role){
          case 'skin':return skin;
          case 'skinshade':return skinShade;
          case 'skinlight':return skinLight;
          case 'hair':return hairBase;
          case 'hairlight':return hairLight;
          case 'body':case 'arm':case 'cloth':return clothBase;
          case 'bodyshade':case 'armshade':return clothShade;
          case 'legback':return mixHex(clothLower,'#000000',.2);
          case 'leghi':return mixHex(clothLower,'#ffffff',.18);
          case 'bodyhi':case 'armhi':case 'clothhi':return clothLight;
          case 'pants':case 'legfront':case 'shoe':case 'shoefront':return clothLower;
          case 'legshadow':case 'inkdetail':return ink;
          case 'helm':return typeof P.helm==='string'?P.helm:accentGarment;
          case 'apron':return typeof P.apron==='string'?P.apron:accentGarment;
          case 'pack':return typeof P.pack==='string'?P.pack:accentGarment;
          case 'umb':case 'umbrella':return typeof P.umb==='string'?P.umb:accentGarment;
          case 'umbhi':return accentGarment;
          case 'hairband':return typeof P.band==='string'?P.band:accentGarment;
          case 'labcoat':return typeof P.labcoat==='string'?P.labcoat:accentGarment;
          case 'key':return accentProp;
          case 'baton':case 'bowl':case 'parcel':case 'medkit':case 'whistle':case 'wrench':case 'backpack':case 'guitar':case 'clipboard':case 'notebook':case 'pin':case 'foamfinger':case 'pennant':case 'megaphone':case 'rallytowel':return PROP_ROLE_COLORS[role]||accentProp;
          case 'duffel':case 'satchel':case 'tablet':case 'shield':case 'toolroll':case 'briefcase':
          case 'fishnet':case 'weldingtorch':case 'ropecoil':case 'paintbrush':case 'umbrella':
          case 'ribbon':case 'servingspoon':case 'servingtray':case 'weldcylinder':case 'paintcan':case 'aprontie':return PROP_ROLE_COLORS[role]||accentProp;
          default:return null;
        }
      };
      // Keep facial marks at true native 1x1 resolution. Stable NPC-id hashing
      // selects a small expression family, so shared archetypes do not share one face.
      // Stable per-NPC expression families: brows, eye spacing and mouth shape
      // are deliberately distinct at native resolution rather than palette-only swaps.
      const faceHash=Array.from(String(n.id||kind)).reduce((sum,ch)=>((sum*31)+ch.charCodeAt(0))>>>0,7);
      // Civilian expression families are authored by occupation, not selected by an opaque hash.
      const CIV_FACE_FAMILIES={
        runner:0,coach:1,ref:2,courier:3,guard:4,vendor:5,cook:6,clinic:7,
        tech:0,hacker:1,fisher:2,sailor:3,slicker:4,painter:5,welder:6,
        kid:7,kid2:0,mouse:1,busker:2,dancer:3,broker:4,usher:5
      };
      const CIV_FACE_DETAILS={
        runner:[26,14],coach:[27,15],ref:[28,14],courier:[29,15],guard:[30,14],
        vendor:[31,15],cook:[32,14],clinic:[33,15],tech:[34,14],hacker:[35,15],
        fisher:[36,14],sailor:[37,15],slicker:[38,14],painter:[39,15],welder:[26,16],
        kid:[27,16],kid2:[28,16],mouse:[29,16],busker:[30,16],dancer:[31,16],
        broker:[32,16],usher:[33,16]
      };
      const faceStyle=kind==='fan'?faceHash%8:(CIV_FACE_FAMILIES[kind]??0);
      const faceDetail=null;
      const faceSets=[
        {eyes:[[28,10],[36,10]],brows:[[28,8],[36,8]],mouth:[32,16],mouthPixels:[[0,0,'inkdetail']]}, // calm
        {eyes:[[27,11],[36,10]],brows:[[27,9],[36,8]],mouth:[32,17],mouthPixels:[[0,0,'skinshade'],[1,0,'skinshade']]}, // friendly
        {eyes:[[28,10],[37,11]],brows:[[28,8],[37,9]],mouth:[33,16],mouthPixels:[[0,0,'inkdetail'],[0,1,'inkdetail']]}, // curious
        {eyes:[[27,10],[36,10]],brows:[[27,7],[36,9]],mouth:[31,17],mouthPixels:[[0,0,'inkdetail'],[-1,0,'inkdetail']]}, // skeptical
        {eyes:[[29,11],[36,11]],brows:[[29,9],[36,9]],mouth:[32,16],mouthPixels:[[0,0,'skinshade']],cheeks:[[26,14],[38,14]]}, // warm
        {eyes:[[28,10],[37,10]],brows:[[28,8],[37,8]],mouth:[33,17],mouthPixels:[[0,0,'skinshade'],[1,0,'skinshade']],facialHair:[[30,14],[31,14],[34,14],[35,14]]}, // grin
        {eyes:[[27,10],[36,11]],brows:[[27,8],[36,9]],mouth:[32,16],mouthPixels:[[0,0,'inkdetail'],[1,0,'inkdetail'],[0,1,'inkdetail']]}, // surprised
        {eyes:[[28,11],[36,10]],brows:[[28,9],[36,7]],mouth:[32,17],mouthPixels:[[0,0,'inkdetail'],[0,1,'skinshade']] } // concerned
      ];
      const FP={
        eyes:{dot:[[28,10,2,2],[36,10,2,2]],wide:[[27,10,3,2],[36,10,3,2]],tall:[[28,10,2,3],[36,10,2,3]],
         sleepy:[[27,11,3,1],[36,11,3,1]],close:[[29,10,2,2],[35,10,2,2]],far:[[27,10,2,2],[37,10,2,2]]},
        brows:{flat:[[27,7,4,2],[35,7,4,2]],arch:[[27,7,1,2],[28,6,2,2],[30,7,1,2],[35,7,1,2],[36,6,2,2],[38,7,1,2]],
         angry:[[27,7,2,2],[29,7,2,2],[35,7,2,2],[37,7,2,2]],worried:[[27,7,2,2],[29,7,2,2],[35,7,2,2],[37,7,2,2]],
         skew:[[27,7,4,2],[35,7,1,2],[36,6,2,2],[38,7,1,2]]},
        mouths:{flat:[[0,0,4,1,'inkdetail']],smile:[[0,0,4,1,'inkdetail'],[-1,-1,1,1,'inkdetail'],[4,-1,1,1,'inkdetail']],
         frown:[[0,0,4,1,'inkdetail'],[-1,1,1,1,'inkdetail'],[4,1,1,1,'inkdetail']],o:[[1,0,2,2,'inkdetail']],
         smirk:[[0,1,3,1,'inkdetail'],[3,0,1,1,'inkdetail'],[4,-1,1,1,'inkdetail']],
         grin:[[-1,0,6,2,'inkdetail'],[0,0,4,1,'skinlight']],small:[[1,0,2,1,'inkdetail']]}
      };
      const CIV_FACES={runner:['dot','flat','smile'],coach:['wide','angry','flat'],ref:['close','arch','o'],
       courier:['far','skew','smirk'],guard:['sleepy','flat','frown'],vendor:['tall','arch','grin'],
       cook:['wide','arch','smile'],clinic:['close','worried','small'],tech:['wide','flat','small'],
       hacker:['sleepy','angry','smirk'],fisher:['dot','angry','frown'],sailor:['far','arch','grin'],
       slicker:['tall','skew','flat'],painter:['dot','skew','smile'],welder:['sleepy','angry','flat'],
       kid:['tall','arch','o'],kid2:['close','flat','grin'],mouse:['far','worried','small'],
       busker:['close','skew','grin'],dancer:['tall','worried','smile'],broker:['dot','worried','frown'],
       usher:['wide','worried','o']};
      const face=faceSets[faceStyle];
      // Facial features are deliberately larger than single source pixels.
      // At the in-game scale a 1x1 mark disappears; 2x2 eyes/mouths and 3x2
      // brows survive downsampling while retaining the 64x96 pixel-art grid.
      const stampFace=(x,y,role,w=2,h=2)=>{
        for(let fy=y;fy<Math.min(H,y+h);fy++)for(let fx=x;fx<Math.min(N,x+w);fx++)if(fx>=0&&fy>=0)grid[fy][fx]=role;
      };
      if(!side&&!back){
        for(const [ex,ey] of [[28,10],[36,10],[32,16]])grid[ey][ex]='skin';
        const fp=kind!=='fan'&&CIV_FACES[kind];
        if(fp){
          for(let y=8;y<=17;y++)for(let x=26;x<=39;x++)grid[y][x]='skin';
          for(const [x,y,w,h] of FP.eyes[fp[0]])stampFace(x,y,'inkdetail',w,h);
          for(const [x,y,w,h] of FP.brows[fp[1]])stampFace(x,y,'hair',w,h);
          for(const [dx,dy,w,h,r] of FP.mouths[fp[2]])stampFace(31+dx,16+dy,r,w,h);
        }else{
          for(const [ex,ey] of face.eyes)stampFace(ex,ey,'inkdetail',2,2);
          for(const [bx,by] of face.brows)stampFace(bx,by,'hair',3,2);
          for(const [dx,dy,role] of face.mouthPixels)stampFace(face.mouth[0]+dx,face.mouth[1]+dy,role,2,2);
          if(face.cheeks)for(const [cx,cy] of face.cheeks)stampFace(cx,cy,'skinlight',2,2);
          if(face.facialHair)for(const [hx,hy] of face.facialHair)stampFace(hx,hy,'hair',2,2);
        }
        if(faceDetail)stampFace(faceDetail[0],faceDetail[1],'skinlight',2,2);
      }
      if(side){
        // Clear the frontal two-eye layout before drawing a true one-eye profile.
        for(const [ex,ey] of [[28,10],[36,10],[27,11],[37,11],[32,16]])stampFace(ex,ey,'skin',2,2);
        const profileFacingLeft=dirCode==='l';
        const profileEyeX=(profileFacingLeft?29:33)+(faceStyle%3);
        stampFace(profileEyeX,10,'inkdetail',2,2);
        stampFace(profileEyeX,8,'hair',2,2);
        stampFace(profileEyeX-1,16,faceStyle%2===0?'inkdetail':'skinshade',2,2);
        if(faceStyle===5){stampFace(profileEyeX-1,15,'hair',2,2);stampFace(profileEyeX,16,'hair',2,2);}
        if(faceStyle===6)stampFace(profileEyeX,11,'skinlight',2,2);
        if(faceStyle===7)stampFace(profileEyeX-1,9,'hair',2,2);
        // Position the nose on the outside edge after the left-facing mirror.
        const noseX=profileFacingLeft?20:42;
        stampFace(noseX,10,'skinlight',2,2);
        stampFace(noseX+(profileFacingLeft?-2:2),11,'skin',2,2);
        stampFace(noseX,12,'skinshade',2,2);
        stampFace(profileFacingLeft?23:41,14,'skinshade',2,2);
        stampFace(profileFacingLeft?24:40,15,'skinlight',2,2);
        if(faceDetail)stampFace(Math.min(40,faceDetail[0]+2),Math.min(16,faceDetail[1]),'skinlight',2,2);
      }
      const fanJerseyStyles={
        driverA:'stripes',fan1:'crest',fan2:'bars',fanA:'sash',fanB:'split',
        fanC:'chevron',fanD:'checker',gamer1:'ring',hb_denny:'star',hb_pete:'number',
        hb_shopper:'vertical',hb_splinter:'horizontal',hb_wick:'diagonal',patient1:'patch',
        r2_saltwife:'cross',r2_stack:'diamond',regular1:'piping',shopper1:'shoulder',
        wait1:'lightning',wait2:'panel'
      };
      const fanJerseyStyle=kind==='fan'?(fanJerseyStyles[n.id]||'stripes'):null;
      // Give fan jerseys readable garment construction, not just a new swatch.
      // These small motifs sit on the chest and never cover the foam-finger prop.
      if(kind==='fan'){
        const motif=fanJerseyStyle;
        if(!back&&!side){
          switch(motif){
            case 'stripes':for(let yy=13;yy<=21;yy++){set(12,yy,'clothhi');set(19,yy,'clothhi')}break;
            case 'crest':[[15,13],[14,14],[16,14],[15,15],[15,16]].forEach(([x,y])=>set(x,y,'clothhi'));set(15,14,'bodyhi');break;
            case 'bars':for(const yy of [13,17,21])for(let xx=12;xx<=19;xx++)set(xx,yy,'clothhi');break;
            case 'sash':for(let yy=13;yy<=21;yy++)set(12+Math.floor((yy-13)/2),yy,'clothhi');for(let yy=14;yy<=20;yy++)set(13+Math.floor((yy-14)/2),yy,'bodyhi');break;
            case 'split':for(let yy=13;yy<=21;yy++){set(15,yy,'clothhi');set(16,yy,'bodyhi')}for(let xx=12;xx<=14;xx++)set(xx,20,'clothhi');break;
            case 'chevron':for(let i=0;i<5;i++){set(12+i,14+i,'clothhi');set(19-i,14+i,'clothhi')}break;
            case 'checker':for(let yy=14;yy<=20;yy+=2)for(let xx=13;xx<=19;xx+=2)set(xx,yy,'clothhi');break;
            case 'ring':for(let xx=13;xx<=18;xx++){set(xx,14,'clothhi');set(xx,19,'clothhi')}set(13,16,'clothhi');set(18,16,'clothhi');break;
            case 'star':[[16,13],[15,14],[16,14],[17,14],[14,15],[18,15],[15,16],[16,16],[17,16]].forEach(([x,y])=>set(x,y,'clothhi'));break;
            case 'number':for(let yy=14;yy<=20;yy++)set(15,yy,'clothhi');for(let xx=15;xx<=18;xx++)set(xx,14,'clothhi');set(18,15,'clothhi');set(15,17,'clothhi');for(let xx=15;xx<=18;xx++)set(xx,20,'clothhi');break;
            case 'vertical':for(let xx of [13,16,19])for(let yy=13;yy<=21;yy++)set(xx,yy,'clothhi');break;
            case 'horizontal':for(const yy of [15,19])for(let xx=12;xx<=19;xx++)set(xx,yy,'clothhi');break;
            case 'diagonal':for(let yy=13;yy<=21;yy++)set(19-Math.floor((yy-13)/2),yy,'clothhi');break;
            case 'patch':put(13,14,4,4,'bodyshade');set(14,15,'clothhi');set(15,15,'clothhi');set(14,16,'clothhi');break;
            case 'cross':for(let yy=14;yy<=20;yy++)set(16,yy,'clothhi');for(let xx=13;xx<=19;xx++)set(xx,17,'clothhi');break;
            case 'diamond':for(let i=0;i<4;i++){set(16,14+i,'clothhi');set(15-i,17+i,'clothhi');set(17+i,17+i,'clothhi')}break;
            case 'piping':for(let yy=12;yy<=22;yy++){set(12,yy,'clothhi');set(19,yy,'clothhi')}set(13,12,'clothhi');set(18,12,'clothhi');break;
            case 'shoulder':put(11,11,3,4,'clothhi');put(18,11,3,4,'clothhi');for(let yy=15;yy<=21;yy++)set(16,yy,'bodyshade');break;
            case 'lightning':for(let yy=13;yy<=21;yy++)set(yy%2?14:18,yy,'clothhi');break;
            case 'panel':put(14,13,5,9,'bodyshade');for(const yy of [15,18,21])set(16,yy,'clothhi');break;
          }
        }else if(back){
          if(motif==='stripes'||motif==='vertical'||motif==='piping')for(let yy=13;yy<=22;yy++){set(12,yy,'clothhi');set(19,yy,'clothhi')}
          else if(motif==='bars'||motif==='horizontal')for(const yy of [14,18,22])for(let xx=12;xx<=19;xx++)set(xx,yy,'clothhi');
          else if(motif==='sash'||motif==='diagonal'||motif==='lightning')for(let yy=13;yy<=21;yy++)set(12+Math.floor((yy-13)/2),yy,'clothhi');
          else if(motif==='split'||motif==='number'||motif==='panel')for(let yy=13;yy<=22;yy++)set(16,yy,'clothhi');
          else if(motif==='checker')for(let yy=14;yy<=20;yy+=2)for(let xx=13;xx<=19;xx+=2)set(xx,yy,'clothhi');
          else if(motif==='cross'){for(let yy=14;yy<=20;yy++)set(16,yy,'clothhi');for(let xx=13;xx<=19;xx++)set(xx,17,'clothhi');}
          else {set(15,14,'clothhi');set(16,14,'clothhi');set(15,15,'clothhi');}
        }else{
          set(18,14,'clothhi');
          if(motif==='stripes'||motif==='vertical'||motif==='piping')for(let yy=13;yy<=21;yy++)set(18,yy,'clothhi');
          else if(motif==='bars'||motif==='horizontal')for(const yy of [15,19])set(18,yy,'clothhi');
          else if(motif==='sash'||motif==='diagonal'||motif==='lightning')for(let yy=14;yy<=20;yy++)set(18-Math.floor((yy-14)/2),yy,'clothhi');
          else if(motif==='split'||motif==='number'||motif==='panel')for(let yy=13;yy<=21;yy++)set(17,yy,'bodyshade');
          else set(17,16,'clothhi');
        }
      }
      const colors=grid.map((row,yy)=>row.map((role,xx)=>role?colorFor(role,xx,yy):null));
      const finalGrid=colors.map(row=>row.slice());
      // One grid cell of ink: each occupied cell touching transparency marks its
      // adjacent transparent cell, keeping the outline exactly one source pixel.
      for(let yy=0;yy<H;yy++)for(let xx=0;xx<N;xx++){
        if(colors[yy][xx]===null)continue;
        if(xx>0&&colors[yy][xx-1]===null)finalGrid[yy][xx-1]=ink;
        if(xx<N-1&&colors[yy][xx+1]===null)finalGrid[yy][xx+1]=ink;
        if(yy>0&&colors[yy-1][xx]===null)finalGrid[yy-1][xx]=ink;
        if(yy<H-1&&colors[yy+1][xx]===null)finalGrid[yy+1][xx]=ink;
      }
      // The side-view stride gap is genuinely transparent, not filled by the
      // automatic one-pixel outline pass. Mirror its column for left-facing sprites.
      if(side){
        const gapX=dirCode==='l'?38:24;
        for(let yy=48;yy<=72;yy++)finalGrid[yy][gapX]=null;
      }
      // Reserve one transparent native pixel above every civilian head. Move the
      // rendered grid origin up by the same amount below so feet remain baseline-locked.
      finalGrid.unshift(Array(N).fill(null));
      finalGrid.pop();
      // Palette audit is measured from the final native pixel grid, including its outline.
      const palettePixelCounts=Object.create(null);
      for(const color of finalGrid.flat())if(color!==null){const canonical=color.toLowerCase();palettePixelCounts[canonical]=(palettePixelCounts[canonical]||0)+1;}
      const uniquePaletteColors=Object.keys(palettePixelCounts);
      owCiv._lastPaletteMetrics={
        civ:kind,archetype:archetypeKey,fanJerseyStyle,uniqueColorCount:uniquePaletteColors.length,
        colors:uniquePaletteColors,colorPixelCounts:palettePixelCounts,
        opaquePixelCount:Object.values(palettePixelCounts).reduce((sum,count)=>sum+count,0),
        outlinePixelCount:palettePixelCounts[ink]||0,
        bodyColor:clothBase,bodyPixelCount:palettePixelCounts[clothBase]||0,
        pantsColor:clothLower,pantsPixelCount:palettePixelCounts[clothLower]||0,
        hairColor:hairBase,hairPixelCount:palettePixelCounts[hairBase]||0
      };
      // Keep a uniform dark outline; do not apply directional rim tints.
      const spriteCanvas=owCiv._gridCanvas||(owCiv._gridCanvas=document.createElement('canvas'));
      if(spriteCanvas.width!==N*SCALE)spriteCanvas.width=N*SCALE;
      if(spriteCanvas.height!==H*SCALE)spriteCanvas.height=H*SCALE;
      const ctx=spriteCanvas.getContext('2d');
      ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';ctx.clearRect(0,0,N*SCALE,H*SCALE);
      const roleDebug=!!(qaOptions&&(qaOptions.roleDebug||qaOptions.roleDebugLayers||qaOptions.roleDebugSourceLayers));
      const roleDebugLayers=!!(qaOptions&&(qaOptions.roleDebugLayers||qaOptions.roleDebugSourceLayers));
      const roleDebugGrid=roleDebug?grid.map(row=>row.slice()):null;
      if(roleDebug){
        roleDebugGrid.unshift(Array(N).fill(null));
        roleDebugGrid.pop();
        if(roleDebugLayers&&debugSourceGrid){debugSourceGrid.unshift(Array(N).fill(null));debugSourceGrid.pop();}
        const roles=[...new Set((roleDebugLayers?debugSourceGrid:roleDebugGrid).flat().filter(Boolean))].sort();
        const layerColors={'torso-mask-upper':'#268bd2','torso-mask-hem':'#dc322f','sleeves-arms':'#b58900','hands':'#2aa198','legs':'#6c71c4','apron':'#d33682','garment-overlays':'#859900','base':'#777777'};
        const roleColor=role=>layerColors[role]||'#eeeeee';
        owCiv._lastRoleDebugLegend=roles.map(role=>({role,color:roleColor(role)}));
        const rowSourceWidths=[];
        if(roleDebugLayers&&debugSourceGrid){
          for(let y=0;y<H;y++){
            const bySource={};
            for(let x=0;x<N;x++){
              const source=debugSourceGrid[y][x];
              if(source){const v=bySource[source]||(bySource[source]={minX:x,maxX:x,pixels:0});v.minX=Math.min(v.minX,x);v.maxX=Math.max(v.maxX,x);v.pixels++}
            }
            const sources={};
            for(const [name,v] of Object.entries(bySource))sources[name]={minX:v.minX,maxX:v.maxX,width:v.maxX-v.minX+1,pixels:v.pixels};
            rowSourceWidths.push({row:y,logicalRow:Math.floor(y/2),sources});
          }
        }
        const torsoRows=civTorsoMasks[side?'side':back?'back':'front']||[];
        owCiv._lastRoleDebugRows={civ:kind,direction:dirCode,view:side?'side':back?'back':'front',torsoMaskRows:torsoRows.map(([row,left,right])=>({row,left,right,width:right-left+1})),renderedSourceRows:rowSourceWidths};
      }else owCiv._lastRoleDebugLegend=null;
      for(let gy=0;gy<H;gy++)for(let gx=0;gx<N;gx++){
        const debugCell=roleDebug?(roleDebugLayers&&debugSourceGrid?debugSourceGrid[gy][gx]:roleDebugGrid[gy][gx]):null;
        const color=roleDebug
          ? (debugCell===null?null:owCiv._lastRoleDebugLegend.find(item=>item.role===debugCell)?.color||null)
          : finalGrid[gy][gx];
        if(color!==null){ctx.fillStyle=color;ctx.fillRect(gx,gy,1,1);}
      }
      const step=moving?Math.sin(tm*11+ph*6):0;
      const bob=moving?Math.abs(step)*.45:Math.sin(tm*1.8+((n.x*13+n.y*7)|0))*.12;
      const sx=(n.rx!=null?n.rx:n.x)*OWT+OWT/2,sy=(n.ry!=null?n.ry:n.y)*OWT+OWT-6;
      const youthScale=['kid','kid2','mouse'].includes(kind)?0.78:1;
      const spriteScale=U*youthScale;
      targetG.save();targetG.globalAlpha=1;targetG.globalCompositeOperation='source-over';targetG.filter='none';targetG.imageSmoothingEnabled=false;
      // Youth sprites are shorter and narrower; all feet remain pinned to the shared baseline.
      targetG.drawImage(spriteCanvas,sx-32*spriteScale,sy-bob-81*spriteScale,64*spriteScale,96*spriteScale);
      targetG.restore();
    }
    return owCiv;
  }

  window.NPC_SPRITES = Object.freeze({TABLES,createGrannyRenderer,createCivRenderer});
})();
