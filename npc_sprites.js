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
        front:[[9,8,27],[10,6,29],[11,6,29],[12,7,28],[13,8,27],[14,10,24],[15,12,21],[16,13,19],[17,14,17],[18,14,17],[19,14,17],[20,14,17],[21,14,17],[22,14,17],[23,15,16],[24,16,15]],
        back:[[9,8,27],[10,6,29],[11,6,29],[12,7,28],[13,8,27],[14,10,24],[15,12,21],[16,13,19],[17,14,17],[18,14,17],[19,14,17],[20,14,17],[21,14,17],[22,14,17],[23,15,16],[24,16,15]],
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
      reshapeTorsoRows('athletic',view,y=>y<=15?{left:-2,right:2}:y>=18?{left:1,right:-1}:{left:-1,right:1});
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
          const dx=right?(spec.rightLegX??spec.legSpread??0):(spec.leftLegX??-(spec.legSpread||0));
          const dy=right?(spec.rightLegY||0):(spec.leftLegY||0);
          const dw=right?(spec.rightLegW||0):(spec.leftLegW||0);
          return [x+dx,y+dy,Math.max(1,w+dw),h,role];
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
      civic:makeArchetypeRig({armSpread:-1,legSpread:0,sideArmX:-2,sideArmY:1}),
      elder:makeArchetypeRig({armSpread:-1,leftArmY:2,rightArmY:2,leftArmW:-1,rightArmW:-1,legSpread:-1,leftLegX:-2,rightLegX:-1,leftLegY:2,rightLegY:2,leftLegW:-1,rightLegW:-1,sideArmX:-3,sideArmY:3})
    });
    const ARCHETYPE_PROP_LAYERS=Object.freeze({
      athletic:{types:{front:'whistle',side:'whistle',back:'jersey-mark'},front:[[1,12,5,5,'duffel'],[26,12,5,5,'duffel'],[21,19,2,2,'whistle']],back:[[1,12,5,5,'duffel'],[26,12,5,5,'duffel'],[7,19,2,2,'whistle']],side:[[25,12,5,6,'duffel'],[17,18,2,2,'whistle']]},
      courier:{types:{front:'parcel',side:'courier-pack',back:'courier-pack'},front:[[1,16,4,14,'satchel'],[22,18,3,3,'parcel']],back:[[27,16,4,14,'satchel'],[7,18,3,3,'parcel']],side:[[27,14,4,16,'satchel'],[17,18,3,3,'parcel']]},
      guard:{types:{front:'baton',side:'baton',back:'guard-plate'},front:[[27,12,4,17,'shield'],[23,15,1,7,'baton']],back:[[1,12,4,17,'shield'],[8,15,1,7,'baton']],side:[[27,12,4,17,'shield'],[18,15,1,7,'baton']]},
      vendor:{types:{front:'bowl',side:'apron-ties',back:'apron-ties'},front:[[6,19,4,2,'bowl']],back:[[8,14,2,10,'apron'],[22,14,2,10,'apron']],side:[[16,19,4,2,'bowl']]},
      clinic:{types:{front:'medical-kit',side:'medical-kit',back:'clinic-yoke'},front:[[22,17,4,4,'medkit']],back:[[8,17,4,4,'medkit']],side:[[17,17,3,3,'medkit']]},
      trades:{types:{front:'wrench',side:'wrench',back:'tool-pocket'},front:[[1,29,5,8,'toolroll'],[22,17,2,5,'wrench']],back:[[26,29,5,8,'toolroll'],[8,17,2,5,'wrench']],side:[[26,29,5,8,'toolroll'],[18,16,2,5,'wrench']]},
      youth:{types:{front:'notebook',side:'backpack',back:'backpack'},front:[[1,15,5,11,'backpack'],[21,18,3,5,'notebook']],back:[[26,15,5,11,'backpack']],side:[[26,15,5,11,'backpack']]},
      performer:{types:{front:'guitar',side:'guitar',back:'guitar-back'},front:[[26,11,5,17,'guitar'],[21,21,1,3,'guitar']],back:[[1,11,5,17,'guitar'],[8,21,1,3,'guitar']],side:[[26,11,5,17,'guitar'],[17,20,1,3,'guitar']]},
      civic:{types:{front:'clipboard',side:'clipboard',back:'coat-tail'},front:[[1,18,5,10,'briefcase'],[7,18,3,4,'clipboard']],back:[[26,18,5,10,'briefcase'],[21,18,3,4,'clipboard']],side:[[26,18,5,10,'briefcase'],[17,17,3,4,'clipboard']]},
      elder:{types:{front:'cardigan-pin',side:'cardigan-back',back:'cardigan-back'},front:[[20,13,2,2,'pin']],back:[],side:[]},
      fan:{types:{front:'fan-crowd-gear',side:'fan-crowd-gear',back:'fan-crowd-gear'},front:[[1,12,5,14,'foamfinger']],side:[[27,12,5,14,'foamfinger']],back:[[26,12,5,14,'foamfinger']]}
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
      guitar:['..#..','..#..','..#..','..#..','..#..','..#..','..#..','.###.','#####','#####','#####','.###.','..#..','..#..','..#..','..#..','..#..'],
      briefcase:['.###.','#####','##.##','#####','#####','#####','#####','#####','.###.','.###.'],
      clipboard:['.##','###','###','.##'],
      notebook:['.##','###','##.','###','###'],
      pin:['.#','##'],
      toolroll:['.###.','#####','##.##','#####','#####','#####','#####','.###.'],
      foamfinger:['..#..','.###.','.###.','.###.','.###.','#####','#####','.###.','.###.','.###.','.###.','.###.','..#..','..#..'],
      pennant:['#....','##...','###..','####.','#####','####.','###..','##...','#....','#....','#....','#....','#....','#....'],
      megaphone:['..#..','.###.','#####','#####','#####','.###.','..#..','..#..','..#..','..#..','..#..','..#..','..#..','..#..'],
      rallytowel:['#####','####.','###..','##...','#....','##...','###..','####.','#####','####.','###..','##...','#....','.....']
    });
    const PROP_ROLE_COLORS=Object.freeze({
      duffel:'#D8A04D',whistle:'#F5D45C',satchel:'#9A6541',parcel:'#D88A45',
      shield:'#65788D',baton:'#C6D3E0',bowl:'#F2F2F8',medkit:'#E3F3FF',
      wrench:'#AEB8C2',backpack:'#B4FF3A',guitar:'#FF7A1A',briefcase:'#8A5B38',
      clipboard:'#F4F6FF',notebook:'#FF2FA8',pin:'#FFD0EE',toolroll:'#8C9AA8',foamfinger:'#FFD23A',
      pennant:'#FF3B5C',megaphone:'#D7E6FF',rallytowel:'#58FFB0'
    });
    const FAN_VARIANT_HEADS=Object.freeze({
      driverA:'cap-profile',fan1:'beanie',fan2:'bucket-hat',fanA:'round-fringe',fanB:'visor',
      fanC:'newsboy-cap',fanD:'hair-band',gamer1:'hood',hb_denny:'cap-profile',
      hb_pete:'beanie',hb_shopper:'cowboy-hat',hb_splinter:'round-fringe',hb_wick:'pom-beanie',
      patient1:'newsboy-cap',r2_saltwife:'hair-band',r2_stack:'cap-profile',
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
    const ARCHETYPE_ACCESSORY_ROLES=new Set(['duffel','whistle','satchel','parcel','shield','baton','bowl','medkit','toolroll','wrench','backpack','guitar','briefcase','clipboard','umbrella','notebook','pin','foamfinger','pennant','megaphone','rallytowel']);
    return { CIV_TO_ARCHETYPE, ARCHETYPES, PALETTE_ROLES, ARCHETYPE_TORSO_MASKS, BASE_RIG_PARTS, makeArchetypeRig, ARCHETYPE_RIG_PARTS, ARCHETYPE_PROP_LAYERS, ARCHETYPE_PROP_SHAPES, PROP_ROLE_COLORS, FAN_VARIANT_PALETTES, FAN_VARIANT_HEADS, FAN_VARIANT_PROPS, ARCHETYPE_ACCESSORY_ROLES };
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

  function createCivRenderer({CIV,HB_CIV,GRANNY_REF,OWT,og,drawGrannyVoltSprite}) {
    const { CIV_TO_ARCHETYPE, ARCHETYPES, PALETTE_ROLES, ARCHETYPE_TORSO_MASKS, BASE_RIG_PARTS, makeArchetypeRig, ARCHETYPE_RIG_PARTS, ARCHETYPE_PROP_LAYERS, ARCHETYPE_PROP_SHAPES, PROP_ROLE_COLORS, FAN_VARIANT_PALETTES, FAN_VARIANT_HEADS, FAN_VARIANT_PROPS, ARCHETYPE_ACCESSORY_ROLES } = TABLES;
    function owCiv(x,y,dir,moving,n,tm,ph,ctxOverride,qaOptions){
      const kind=n.civ;
      if(n.id==='granny'){drawGrannyVoltSprite(n,dir,moving,tm,ph,ctxOverride);return}
      const archetypeKey=CIV_TO_ARCHETYPE[kind];
      if(!archetypeKey||!ARCHETYPES[archetypeKey]||!CIV[kind])throw new Error('Missing civilian archetype mapping or palette: '+kind);
      const A=ARCHETYPES[archetypeKey],P=Object.assign({},A.palette,CIV[kind]);
      const headStyle=kind==='fan'?(FAN_VARIANT_HEADS[n.id]||A.head):A.head;
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
      const skin=palette.skin[0],skinShade=palette.skin[1],skinLight=palette.skin[2];
      // CIV is the live per-civilian color source. Archetype palettes provide
      // shading fallbacks, while CIV body/trim/pants/hair colors distinguish
      // individuals that share a body rig (runner/coach/ref, broker/usher/fan).
      const hairBase=P.hair||palette.hair[0];
      const hairShade=P.hair?mixHex(P.hair,'#000000',.32):palette.hair[1];
      const hairLight=P.hair?mixHex(P.hair,'#ffffff',.24):palette.hair[2];
      const clothBase=P.body||palette.clothing[0];
      const clothShade=P.body?mixHex(P.body,'#000000',.34):palette.clothing[1];
      const clothLight=P.body?mixHex(P.body,'#ffffff',.34):palette.clothing[2];
      const clothLower=P.pants||palette.clothing[3];
      const accentGarment=P.trim||palette.accent[0],accentProp=palette.accent[1];
      const ink=mixHex(hairBase,'#000000',.85),N=64,H=96,SCALE=1;
      // Higher-density fixed pixel canvas: 32 columns x 48 rows.
      const grid=Array.from({length:H},()=>Array(N).fill(null));
      const put=(x0,y0,w,h,role)=>{for(let yy=y0*2;yy<(y0+h)*2;yy++)for(let xx=x0*2;xx<(x0+w)*2;xx++)if(xx>=0&&xx<N&&yy>=0&&yy<H)grid[yy][xx]=role};
      // Paint each logical cell as a solid 2x2 native block, avoiding sparse stripe fills.
      const set=(xx,yy,role)=>{for(let py=yy*2;py<yy*2+2;py++)for(let px=xx*2;px<xx*2+2;px++)if(px>=0&&px<N&&py>=0&&py<H)grid[py][px]=role};
      const PROP_SHAPES=ARCHETYPE_PROP_SHAPES;
      const paintProp=(x,y,w,h,role)=>{
        const pattern=PROP_SHAPES[role];
        if(!pattern){put(x,y,w,h,role);return}
        // Cut the prop's footprint out of the body first. Otherwise transparent
        // mask corners reveal the shirt underneath and turn every prop into a box.
        for(let py=y*2;py<(y+h)*2;py++)for(let px=x*2;px<(x+w)*2;px++)if(px>=0&&px<N&&py>=0&&py<H)grid[py][px]=null;
        for(let yy=0;yy<h;yy++){
          const row=pattern[Math.min(pattern.length-1,Math.floor(yy*pattern.length/h))];
          for(let xx=0;xx<w;xx++){
            const cell=row[Math.min(row.length-1,Math.floor(xx*row.length/w))];
            if(cell!==' '&&cell!=='.')set(x+xx,y+yy,role);
          }
        }
        // Tiny readable prop details; highlights use the garment's light role.
        if(role==='medkit'&&w>=3&&h>=3){set(x+Math.floor(w/2),y+1,'bodyhi');set(x+Math.floor(w/2),y+2,'bodyhi');set(x+Math.floor(w/2)-1,y+1,'bodyhi');set(x+Math.floor(w/2)+1,y+1,'bodyhi')}
        if(role==='shield'&&w>=3&&h>=3)set(x+Math.floor(w/2),y+1,'bodyhi');
        if(role==='guitar'&&w>=3&&h>=3)set(x+Math.floor(w/2),y+Math.floor(h/2),'bodyhi');
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
        set(15,5,'inkdetail');set(17,5,'inkdetail'); // two native pixels apart
        set(16,8,'inkdetail'); // 1x1 mouth
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
        const profileRows=ARCHETYPE_TORSO_MASKS[A.torso].side;
        for(const [yy,x1,x2] of profileRows)for(let xx=x1;xx<=x2;xx++)set(xx,yy,'body');
        for(let yy=10;yy<=23;yy++)for(let xx=12;xx<=15;xx++)if(grid[yy][xx]==='body')set(xx,yy,'bodyshade');
        for(let yy=12;yy<=16;yy++)set(18,yy,'bodyhi');
      }else{
        // Shared humanoid base silhouette: broad shoulder yoke, tapered ribcage,
        // defined waist, then a slight hip flare. These proportions are the
        // reusable anatomy rules for every non-player civilian archetype.
        // Each role gets its own torso contour while sharing the same Granny-calibrated
        // height and pixel grid. These are silhouette masks, not palette-only variants.
        const torsoRows=ARCHETYPE_TORSO_MASKS[A.torso][back?'back':'front'];
        for(const [yy,x1,x2] of torsoRows)for(let xx=x1;xx<=x2;xx++)set(xx,yy,'body');
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
      const rigParts=ARCHETYPE_RIG_PARTS[archetypeKey][rigView];
      for(const [rx,ry,rw,rh,role] of rigParts.arms)put(rx,ry,rw,rh,role);
      // Directional limb masks are table-driven; the same rig is shared while each archetype owns its silhouette data.
      for(const [rx,ry,rw,rh,role] of rigParts.legs)put(rx,ry,rw,rh,role);
      if(P.stripes&&!side&&!back)for(let yy=12;yy<22;yy++){set(12,yy,'clothhi');set(19,yy,'clothhi')}
      if(P.apron&&!back)put(13,16,6,8,'apron');
      if(P.jacket||kind==='courier')for(let yy=12;yy<22;yy++)set(16,yy,'bodyshade');
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
        if(!side)for(let yy=13;yy<=21;yy++)set(19,yy,'pack');
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
      if(P.scarf&&!back)put(10,10,12,3,'clothhi');
      if(!qaExcludeProps&&P.pack&&(back||side))put(side?19:9,14,3,9,'pack');
      if(!qaExcludeProps&&P.umb){put(27,0,2,24,'umb');put(23,0,8,2,'umbhi')}
      if(!qaExcludeProps&&P.keys)put(4,29,24,2,'key');
      // Props are explicit per-archetype/per-direction layers; no shared prop footprint is inferred.
      const propSpec=kind==='fan'?ARCHETYPE_PROP_LAYERS.fan:ARCHETYPE_PROP_LAYERS[archetypeKey];
      const declaredPropType=kind==='fan'?'fan-crowd-gear':A.prop&&A.prop[rigView]&&A.prop[rigView].type;
      if(!propSpec||!declaredPropType||propSpec.types[rigView]!==declaredPropType) {
        throw new Error('Archetype '+rigView+' prop metadata/table mismatch: '+archetypeKey);
      }
      const fanPropRole=FAN_VARIANT_PROPS[n.id]||'foamfinger';
      const propLayers=kind==='fan'
        ? [[rigView==='front'?1:rigView==='side'?27:26,12,5,14,fanPropRole]]
        : propSpec[rigView];
      for(const [px,py,pw,ph,role] of propLayers){
        if(qaExcludeProps&&ARCHETYPE_ACCESSORY_ROLES.has(role))continue;
        if(ARCHETYPE_ACCESSORY_ROLES.has(role))paintProp(px,py,pw,ph,role);
        else put(px,py,pw,ph,role);
      }
      if(P.long)put(10,22,12,2,'bodyshade');
      // Give the footwear a dark sole and toe highlight using existing palette roles.
      if(!side){
        for(let xx=10;xx<=14;xx++)set(xx,39,'inkdetail');
        for(let xx=18;xx<=22;xx++)set(xx,39,'inkdetail');
        set(10,37,'bodyhi');set(18,37,'bodyhi');
      }else{
        for(let xx=9;xx<=13;xx++)set(xx,39,'inkdetail');
        for(let xx=17;xx<=21;xx++)set(xx,39,'inkdetail');
        set(9,37,'bodyhi');set(17,37,'bodyhi');
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
          case 'bodyshade':case 'armshade':case 'legback':return clothShade;
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
          case 'baton':case 'bowl':case 'parcel':case 'medkit':case 'whistle':case 'wrench':case 'backpack':case 'guitar':case 'clipboard':case 'notebook':case 'pin':case 'foamfinger':case 'pennant':case 'megaphone':case 'rallytowel':case 'duffel':case 'satchel':case 'shield':case 'toolroll':case 'briefcase':return PROP_ROLE_COLORS[role]||accentProp;
          default:return null;
        }
      };
      // Keep facial marks at true native 1x1 resolution despite logical block helpers.
      if(!side&&!back&&headStyle!=='helmet'&&headStyle!=='hood'){grid[10][28]='inkdetail';grid[10][36]='inkdetail';grid[16][32]='inkdetail';}
      if(side)grid[8][40]='skin';
      const fanJerseyStyles={
        driverA:'stripes',fan1:'crest',fan2:'bars',fanA:'sash',fanB:'split',
        fanC:'stripes',fanD:'crest',gamer1:'bars',hb_denny:'sash',hb_pete:'split',
        hb_shopper:'stripes',hb_splinter:'crest',hb_wick:'bars',patient1:'sash',
        r2_saltwife:'split',r2_stack:'stripes',regular1:'crest',shopper1:'bars',
        wait1:'sash',wait2:'split'
      };
      const fanJerseyStyle=kind==='fan'?(fanJerseyStyles[n.id]||'stripes'):null;
      // Give fan jerseys readable garment construction, not just a new swatch.
      // These small motifs sit on the chest and never cover the foam-finger prop.
      if(kind==='fan'&&!back&&!side){
        if(fanJerseyStyle==='stripes'){
          for(let yy=13;yy<=21;yy++){set(12,yy,'clothhi');set(19,yy,'clothhi')}
        }else if(fanJerseyStyle==='crest'){
          [[15,13],[14,14],[16,14],[15,15],[15,16]].forEach(([x,y])=>set(x,y,'clothhi'));
          set(15,14,'bodyhi');
        }else if(fanJerseyStyle==='bars'){
          for(const yy of [13,17,21])for(let xx=12;xx<=19;xx++)set(xx,yy,'clothhi');
        }else if(fanJerseyStyle==='sash'){
          for(let yy=13;yy<=21;yy++)set(12+Math.floor((yy-13)/2),yy,'clothhi');
          for(let yy=14;yy<=20;yy++)set(13+Math.floor((yy-14)/2),yy,'bodyhi');
        }else if(fanJerseyStyle==='split'){
          for(let yy=13;yy<=21;yy++){set(15,yy,'clothhi');set(16,yy,'bodyhi')}
          for(let xx=12;xx<=14;xx++)set(xx,20,'clothhi');
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
      // Palette audit is measured from the final native pixel grid, including its outline.
      const palettePixelCounts=Object.create(null);
      for(const color of finalGrid.flat())if(color!==null)palettePixelCounts[color]=(palettePixelCounts[color]||0)+1;
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
      for(let gy=0;gy<H;gy++)for(let gx=0;gx<N;gx++){
        const color=finalGrid[gy][gx];
        if(color!==null){ctx.fillStyle=color;ctx.fillRect(gx,gy,1,1);}
      }
      const step=moving?Math.sin(tm*11+ph*6):0;
      const bob=moving?Math.abs(step)*.45:Math.sin(tm*1.8+((n.x*13+n.y*7)|0))*.12;
      const sx=(n.rx!=null?n.rx:n.x)*OWT+OWT/2,sy=(n.ry!=null?n.ry:n.y)*OWT+OWT-6;
      targetG.save();targetG.globalAlpha=1;targetG.globalCompositeOperation='source-over';targetG.filter='none';targetG.imageSmoothingEnabled=false;
      // The visible sprite occupies grid rows 0-40 (80 doubled pixels).
      // Pin its feet to Granny's baseline and center the narrower 32x48 canvas.
      targetG.drawImage(spriteCanvas,sx-32*U,sy-bob-80*U,64*U,96*U);
      targetG.restore();
    }
    return owCiv;
  }

  window.NPC_SPRITES = Object.freeze({TABLES,createGrannyRenderer,createCivRenderer});
})();
