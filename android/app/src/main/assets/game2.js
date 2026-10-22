function tap(e){
 if(S.hp<=0)return;
 if(e&&e.preventDefault)e.preventDefault();
 const crit=Math.random()<S.crit;
 const base=mode==="day"?S.dmg:nightDmg();
 const dd=Math.ceil(base*(crit?3:1));
 S.hp=Math.max(0,S.hp-dd);
 const b=$("#boss"),r=b.getBoundingClientRect();
 const x=(e&&e.clientX)||(r.left+r.width/2),y=(e&&e.clientY)||(r.top+r.height/2);
 const el=document.createElement("div");el.className="dmg"+(crit?" crit":"");
 el.textContent=(crit?EMOJI.spark:"")+fmt(dd);
 el.style.left=x+"px";el.style.top=(y-20)+"px";
 document.body.appendChild(el);setTimeout(function(){el.remove();},950);
 burst(x,y,crit?"#fde047":"#fff",crit?26:12,crit?300:200);
 b.classList.remove("hit");void b.offsetWidth;b.classList.add("hit");
 bumpCombo();beep(crit?980:520,.06,crit?.09:.05);
 draw();if(S.hp<=0)win();
}
function bossRect(){const b=$("#boss"),r=b.getBoundingClientRect();return{left:r.left,top:r.top,width:r.width,height:r.height};}
function win(){
 const night=mode==="night";const r=bossRect();burstBig(r.left+r.width/2,r.top+r.height/2);
 if(night){
  const i=Math.min(S.night,NIGHT.length-1),b=NIGHT[i];
  const reward=Math.ceil(nightReward(i)*(1+S.coinb));
  S.coins+=reward;S.kills++;
  const wasLast=i>=NIGHT.length-1;
  S.night=Math.min(S.night+1,NIGHT.length-1);save();
  $("#wt").textContent=b.n+" \u043F\u043E\u0431\u0435\u0436\u0434\u0451\u043D!";
  $("#wp").textContent="\u041D\u0430\u0433\u0440\u0430\u0434\u0430: "+fmt(reward)+" "+EMOJI.coin+
   (wasLast?"\n"+EMOJI.moon+" \u0412\u0441\u044F \u043D\u043E\u0447\u044C \u043F\u0440\u043E\u0439\u0434\u0435\u043D\u0430!"
   :"\n\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u0431\u043E\u0441\u0441: HP x"+Math.pow(NMUL,S.night));
 }else{
  const b=dayBoss(),reward=Math.ceil(b.coin*(1+S.coinb));
  S.coins+=reward;S.kills++;
  const wasLast=S.boss>=BOSSES.length-1;
  S.boss=Math.min(S.boss+1,BOSSES.length-1);save();
  $("#wt").textContent=b.n+" \u043F\u043E\u0431\u0435\u0436\u0434\u0451\u043D!";
  $("#wp").textContent="\u041D\u0430\u0433\u0440\u0430\u0434\u0430: "+fmt(reward)+" "+EMOJI.coin+
   (wasLast?"\n"+EMOJI.moon+" \u041D\u043E\u0447\u044C \u043E\u0442\u043A\u0440\u044B\u0442\u0430!":"");
 }
 $("#win").classList.add("show");
}
function nextBoss(){$("#win").classList.remove("show");startBoss();save();renderTabs();renderUps();}
function buy(i){
 const u=UPG[i],lv=S.up[i]||0,cost=Math.floor(u.c*Math.pow(u.g,lv));
 if(S.coins<cost){toast("\u041D\u0435 \u0445\u0432\u0430\u0442\u0430\u0435\u0442 \u043C\u043E\u043D\u0435\u0442");return;}
 S.coins-=cost;S.up[i]=lv+1;
 if(u.k==="dmg")S.dmg=Math.floor(S.dmg+1);
 if(u.k==="dmg2")S.dmg=Math.floor(S.dmg*2);
 if(u.k==="crit")S.crit=Math.min(.9,S.crit+.1);
 if(u.k==="coin")S.coinb+=.25;
 save();renderUps();draw();toast("\u041A\u0443\u043F\u043B\u0435\u043D\u043E!");
}
function buyNight(){
 const lv=S.nup||0,cost=Math.floor(NUPG.c*Math.pow(NUPG.g,lv));
 if(S.coins<cost){toast("\u041D\u0435 \u0445\u0432\u0430\u0442\u0430\u0435\u0442 \u043C\u043E\u043D\u0435\u0442");return;}
 S.coins-=cost;S.nup=lv+1;S.nm=Math.pow(NMUL,S.nup);
 save();renderUps();draw();toast("\u041A\u0443\u043F\u043B\u0435\u043D\u043E!");
}
function renderUps(){
 const box=$("#ups");box.innerHTML="";
 if(mode==="night"){
  const lv=S.nup||0,cost=Math.floor(NUPG.c*Math.pow(NUPG.g,lv));
  const b=document.createElement("button");b.className="up";b.disabled=S.coins<cost;
  b.innerHTML="<b>"+NUPG.t+"</b><span class='c'>"+fmt(cost)+" "+EMOJI.coin+"</span><span>\u0443\u0440. "+lv+" \u00B7 \u0441\u0438\u043B\u0430 x"+S.nm+"</span>";
  b.onclick=buyNight;box.appendChild(b);
  const back=document.createElement("button");back.className="up";
  back.innerHTML="<b>\u21A9 \u041D\u0430\u0437\u0430\u0434 \u043A \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u044E</b><span>\u0434\u043D\u0435\u0432\u043D\u043E\u0439 \u0440\u0435\u0436\u0438\u043C</span>";
  back.onclick=function(){mode="day";setMode();startBoss();renderTabs();renderUps();save();};
  box.appendChild(back);return;
 }
 UPG.forEach(function(u,i){
  const lv=S.up[i]||0,cost=Math.floor(u.c*Math.pow(u.g,lv));
  const b=document.createElement("button");b.className="up";b.disabled=S.coins<cost;
  b.innerHTML="<b>"+u.t+"</b><span class='c'>"+fmt(cost)+" "+EMOJI.coin+"</span><span>\u0443\u0440. "+lv+"</span>";
  b.onclick=function(){buy(i);};box.appendChild(b);
 });
}
function renderTabs(){
 const t=$("#tabs");t.innerHTML="";
 if(mode==="night"){
  NIGHT.forEach(function(b,i){
   if(i>S.night)return;
   const el=document.createElement("button");
   el.className="tab"+(i===S.night?" on":"");
   el.textContent=(i+1)+". "+b.f+" "+b.n;
   el.onclick=function(){S.night=i;startBoss();save();renderTabs();};
   t.appendChild(el);
  });return;
 }
 BOSSES.forEach(function(b,i){
  if(i>S.boss)return;
  const el=document.createElement("button");
  el.className="tab"+(i===S.boss?" on":"");
  el.textContent=b.f+" "+b.n;
  el.onclick=function(){S.boss=i;startBoss();save();renderTabs();};
  t.appendChild(el);
 });
}
function setMode(){
 document.body.classList.toggle("night",mode==="night");
 $("#mDay").classList.toggle("on",mode==="day");
 $("#mNight").classList.toggle("on",mode==="night");
}
function init(){
 load();
 if(!S.nm)S.nm=1;
 $("#icCoin").textContent=EMOJI.coin;
 $("#icSword").textContent=EMOJI.sword;
 $("#icSkull").textContent=EMOJI.skull;
 $("#mDay").textContent=EMOJI.sun+" \u0414\u0435\u043D\u044C";
 $("#mNight").textContent=EMOJI.moon+" \u041D\u043E\u0447\u044C";
 $("#hint").textContent="\u0442\u0430\u043F\u0430\u0439 \u043F\u043E \u0431\u043E\u0441\u0441\u0443";
 $("#nextBtn").textContent="\u0414\u0430\u043B\u044C\u0448\u0435";
 $("#medal").textContent=EMOJI.trophy;
 $("#mDay").onclick=function(){mode="day";setMode();startBoss();renderTabs();renderUps();save();};
 $("#mNight").onclick=function(){mode="night";setMode();startBoss();renderTabs();renderUps();save();};
 $("#nextBtn").onclick=nextBoss;
 $("#stage").addEventListener("pointerdown",function(e){tap(e);});
 document.addEventListener("contextmenu",function(e){e.preventDefault();});
 setMode();startBoss();renderTabs();renderUps();draw();
}
init();