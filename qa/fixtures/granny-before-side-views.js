/* Frozen pre-side-view Granny renderer from commit a748f223874a7b9d3517ecd929dacb7137a65d3d parent ba8b35f70a0df063e277b1286e8c4e38136211ca. Visual comparison fixture only. */
window.makeGrannyBeforeSideViews = function(OWT, og, artShadow) {
  return (function drawGrannyVoltSprite(n,dir,moving,tm,ph,ctxOverride,measureOptions){
  const g=ctxOverride||og,scale=OWT/36*.28,sx=(n.rx!=null?n.rx:n.x)*OWT+OWT/2,sy=(n.ry!=null?n.ry:n.y)*OWT+OWT-5;
  // Feet remain pinned; the upper body keeps the existing one-pixel idle breath.
  const frame=Math.floor(tm*(moving?8:6)+(ph||0))%4,bob=[0,-1,0,1][frame],prevBob=[0,-1,0,1][(frame+3)%4];
  const back=dir==='u';
  const omitUmbrella=!!(measureOptions&&measureOptions.excludeUmbrella);
  const omitGroundEffects=!!(measureOptions&&measureOptions.excludeGroundEffects);
  // Keep measurement passes free of contact-shadow and additive glow pixels.
  if(!omitGroundEffects)artShadow(g,sx,sy,OWT*.24,OWT*.075,.75,2);
  g.save();g.translate(sx,sy);g.scale(scale,scale);g.translate(-50,-137);
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

  // Neck, face and hair: reduced facial noise, with only two eye pixels.
  path([[43,38],[55,38],[57,48],[44,49]],'#B97966');
  g.beginPath();g.ellipse(49,30,13,16,-.12,0,Math.PI*2);
  g.fillStyle=grad(37,22,61,38,[[0,'#F0C09D'],[.45,skin],[1,'#996052']]);g.fill();
  g.strokeStyle=ink;g.lineWidth=1.8;g.stroke();
  if(!back){
    // Clean one-pixel dark blue-black glasses/eye line and a restrained mouth mark.
    line([[48,29],[57,29]],'#202A3A',1);
    line([[52,40],[55,40]],'#8D554E',1);
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
  // One-pixel purple collar depth directly under the chin.
  g.fillStyle='#2A1335';g.fillRect(45,47,9,1);
  // Umbrella's underside shadow sits over the fringe/temple, not over the face.
  path([[38,19],[47,17],[58,19],[63,25],[58,27],[48,24],[40,26]],'#2A1335',null);
  path([[33,53],[43,49],[47,53],[45,88],[38,94],[31,87]],'#B35BCE',null);
  path([[59,50],[67,56],[69,83],[63,93],[57,88],[60,67]],'#4D2D60',null);
  line([[36,57],[39,74],[37,87]],'#E3A2D9',1.8);
  line([[62,60],[60,77],[64,87]],'#33223F',2);
  line([[40,94],[51,96],[64,93]],'#E7A8DA',1.5);
  // Softened jacket-to-skirt transition: lighter shadow with a one-pixel feather.
  line([[34,96],[45,97],[56,97],[66,95]],'#70477D',1/scale);
  line([[35,97],[45,98],[56,98],[65,96]],'rgba(190,116,184,.48)',.8/scale);
  line([[31,113],[42,114],[55,114],[66,112]],'#2A1335',1/scale);
  line([[32,111],[43,113],[55,113],[66,111]],'rgba(255,47,168,.42)',1.15/scale);
  path([[42,49],[49,56],[54,49],[58,53],[52,62],[46,59]],'#F0B5E0',ink,1.4);
  line([[50,60],[49,88]],'#4A2C58',1.6);
  [66,74,82].forEach(y=>{g.beginPath();g.arc(50,y,1.2,0,7);g.fillStyle='#FFE1F4';g.fill()});
  g.beginPath();g.arc(40,70,3,0,7);g.fillStyle='#FFD15B';g.fill();g.strokeStyle=ink;g.lineWidth=1;g.stroke();

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
});
};
