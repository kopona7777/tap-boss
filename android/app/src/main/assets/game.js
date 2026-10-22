const EMOJI={coin:"\uD83E\uDE99",sword:"\u2694",skull:"\uD83D\uDC80",sun:"\u2600\uFE0F",moon:"\uD83C\uDF19",trophy:"\uD83C\uDFC6",spark:"\u2726"};
const BOSSES=[
 {n:"\u0421\u043B\u0438\u0437\u0435\u043D\u044C",f:"\uD83E\uDD79",hp:100,coin:15},
 {n:"\u0413\u043E\u0431\u043B\u0438\u043D",f:"\uD83E\uDD7A",hp:420,coin:60},
 {n:"\u0421\u043A\u0435\u043B\u0435\u0442",f:"\uD83D\uDC80",hp:1600,coin:220},
 {n:"\u0414\u0440\u0430\u043A\u043E\u043D",f:"\uD83D\uDC09",hp:6500,coin:900},
 {n:"\u0422\u0438\u0442\u0430\u043D",f:"\uD83E\uDD51",hp:26000,coin:3800}
];
const NIGHT=[
 {n:"\u0422\u0435\u043D\u044C",f:"\uD83D\uDC64",hp:60},
 {n:"\u041A\u0440\u044B\u0441\u043E\u043B\u043E\u0432",f:"\uD83D\uDC00",hp:80},
 {n:"\u041F\u0435\u043F\u0435\u043B\u044C\u043D\u044B\u0439 \u0421\u0442\u0440\u0430\u0436",f:"\uD83D\uDD7F",hp:110},
 {n:"\u0421\u043A\u043E\u0440\u043F\u0438\u043E\u043D",f:"\uD83E\uDD82",hp:150},
 {n:"\u0411\u043E\u043B\u043E\u0442\u043D\u0430\u044F \u0422\u0432\u0430\u0440\u044C",f:"\uD83D\uDC0A",hp:200},
 {n:"\u0412\u0438\u0432\u0435\u0440\u043D\u0430",f:"\uD83D\uDC32",hp:260},
 {n:"\u041A\u043E\u0441\u0442\u044F\u043D\u043E\u0439 \u041B\u043E\u0440\u0434",f:"\uD83E\uFDB4",hp:330},
 {n:"\u041F\u0435\u043F\u0435\u043B\u044C\u043D\u044B\u0439 \u0414\u0440\u0430\u043A\u043E\u043D",f:"\uD83D\uDC09\u200D\uD83D\uDD25",hp:410},
 {n:"\u0414\u0435\u043C\u043E\u043D \u041F\u0443\u0441\u0442\u043E\u0442\u044B",f:"\uD83D\uDED3\uFE0F",hp:500},
 {n:"\u041B\u0443\u043D\u043D\u044B\u0439 \u0421\u043A\u0438\u043B\u043B\u0435\u0442",f:"\uD83D\uD5E0\uFE0F",hp:600},
 {n:"\u041F\u043E\u0436\u0438\u0440\u0430\u0442\u0435\u043B\u044C",f:"\uD83D\uDD78\uFE0F",hp:700},
 {n:"\u041A\u0440\u043E\u0432\u0430\u0432\u044B\u0439 \u041A\u043B\u0438\u043D\u043E\u043A",f:"\u2694\uFE0F",hp:820},
 {n:"\u0425\u043E\u0437\u044F\u0438\u043D \u0411\u0437\u0435\u0434\u043D\u044B",f:"\uD83C\uDF0A",hp:950},
 {n:"\u041F\u043E\u0436\u0438\u0440\u0430\u0442\u0435\u043B\u044C \u041C\u0438\u0440\u043E\u0432",f:"\uD83D\uD577\uFE0F",hp:1100},
 {n:"\u041D\u043E\u0447\u043D\u043E\u0439 \u0410\u0440\u0445\u043E\u043D\u0442",f:"\uD83C\uDF11",hp:1300}
];
const UPG=[
 {k:"dmg",t:"\u0423\u0440\u043E\u043D +1",c:20,g:1.5},
 {k:"dmg2",t:"\u0423\u0440\u043E\u043D x2",c:900,g:2.2},
 {k:"crit",t:"\u0428\u0430\u043D\u0441 \u043A\u0440\u0438\u0442\u0430 10%",c:300,g:1.6},
 {k:"coin",t:"\u041C\u043E\u043D\u0435\u0442 +25%",c:150,g:1.5}
];
const NUPG={t:"\u041D\u043E\u0447\u043D\u0430\u044F \u043C\u043E\u0449\u043D\u043E\u0441\u0442\u044C x3",c:300,g:3};
const NMUL=3;
let S={coins:0,dmg:1,crit:0,coinb:0,kills:0,boss:0,hp:0,maxhp:0,up:{},nm:1,nup:0,night:0};
let mode="day",combo=0,comboT=null;
const $=s=>document.querySelector(s);
function load(){try{const r=localStorage.getItem("tapboss");if(r)S=Object.assign(S,JSON.parse(r));}catch(e){}}
function save(){try{localStorage.setItem("tapboss",JSON.stringify(S));}catch(e){}}
const UNITS=[[1e21,"\u0441\u0435\u043A\u0441\u0442"],[1e18,"\u043A\u0432\u0438\u043D\u0442"],[1e15,"\u043A\u0432\u0430\u0434\u0440"],[1e12,"\u0442\u0440\u043B\u043D"],[1e9,"\u043C\u043B\u0440\u0434"],[1e6,"\u043C\u043B\u043D"],[1e3,"\u0442\u044B\u0441"]];
function fmt(n){n=Math.floor(n);if(!isFinite(n)||n<0)n=0;
 if(n<1e6)return n.toLocaleString("ru-RU");
 for(const u of UNITS){if(n>=u[0]){const q=n/u[0];const s=(q>=100?q.toFixed(0):q.toFixed(1)).replace(".0","").replace(".",",");return s+" "+u[1];}}
 const e=Math.floor(Math.log10(n)),q=n/Math.pow(10,e);
 return (q>=10?q.toFixed(0):q.toFixed(1)).replace(".",",")+"e"+e;}
function dayBoss(){return BOSSES[Math.min(S.boss,BOSSES.length-1)];}
function nightHP(i){return NIGHT[i].hp*Math.pow(NMUL,i);}
function nightReward(i){return 800*Math.pow(NMUL,i);}
function nightDmg(){return S.dmg*S.nm;}
function startBoss(){
 const night=mode==="night";
 const b=night?NIGHT[Math.min(S.night,NIGHT.length-1)]:dayBoss();
 S.maxhp=night?nightHP(S.night):b.hp;S.hp=S.maxhp;
 $("#face").textContent=b.f;$("#bnm").textContent=b.n;
 $("#blv").textContent=night?("\u041D\u043E\u0447\u044C "+(S.night+1)+"/"+NIGHT.length):("\u0423\u0440. "+(S.boss+1));
 const m=$("#mult");
 if(night){m.style.display="block";m.textContent="HP x"+Math.pow(NMUL,S.night)+" \u00B7 x"+NMUL+" \u0437\u0430 \u043A\u0430\u0436\u0434\u043E\u0433\u043E \u043F\u0440\u043E\u0439\u0434\u0435\u043D\u043D\u043E\u0433\u043E";}
 else m.style.display="none";
 draw();
}
function draw(){
 const pct=Math.max(0,Math.min(1,S.hp/S.maxhp));
 $("#hp").style.width=(pct*100)+"%";
 $("#hpwrap").classList.toggle("low",pct<0.25);
 $("#hptxt").textContent=fmt(S.hp)+" / "+fmt(S.maxhp);
 $("#coins").textContent=fmt(S.coins);
 $("#dmg").textContent=fmt(mode==="day"?S.dmg:nightDmg());
 $("#kills").textContent=fmt(S.kills);
}
let _tt=null;
function toast(t){const e=$("#toast");e.textContent=t;e.style.opacity=1;clearTimeout(_tt);_tt=setTimeout(()=>e.style.opacity=0,1300);}
let ac=null;
function beep(f,du,v){try{if(!ac)ac=new (window.AudioContext||window.webkitAudioContext)();
 const o=ac.createOscillator(),g=ac.createGain();o.type="square";o.frequency.value=f;g.gain.value=v||.05;
 o.connect(g);g.connect(ac.destination);o.start();o.stop(ac.currentTime+du);}catch(e){}}
const cv=$("#fx"),cx=cv.getContext("2d");
let parts=[];
function resize(){cv.width=innerWidth*devicePixelRatio;cv.height=innerHeight*devicePixelRatio;
 cv.style.width=innerWidth+"px";cv.style.height=innerHeight+"px";cx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);}
addEventListener("resize",resize);resize();
function burst(x,y,color,n,speed){for(let i=0;i<(n||14);i++){const a=Math.random()*Math.PI*2,s=Math.random()*(speed||220)+40;
 parts.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-60,life:1,dec:.012+Math.random()*.018,r:Math.random()*3+1.5,c:color||"#fde047"});}}
function burstBig(x,y){const cols=["#f43f5e","#fbbf24","#a855f7","#22d3ee","#4ade80","#fff"];
 for(let i=0;i<70;i++){const a=Math.random()*Math.PI*2,s=Math.random()*340+90;
 parts.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-140,life:1,dec:.006+Math.random()*.01,r:Math.random()*4+2,c:cols[(Math.random()*cols.length)|0]});}}
function loop(){cx.clearRect(0,0,innerWidth,innerHeight);
 for(let i=parts.length-1;i>=0;i--){const p=parts[i];p.vy+=8.3;p.x+=p.vx*.016;p.y+=p.vy*.016;p.life-=p.dec;
  if(p.life<=0){parts.splice(i,1);continue;}
  cx.globalAlpha=Math.max(0,p.life);cx.fillStyle=p.c;cx.beginPath();cx.arc(p.x,p.y,p.r,0,6.283);cx.fill();}
 cx.globalAlpha=1;requestAnimationFrame(loop);}
loop();
(function stars(){const bg=$("#bg");
 for(let i=0;i<46;i++){const s=document.createElement("div");s.className="star";
  s.style.left=Math.random()*100+"%";s.style.top=Math.random()*100+"%";
  s.style.animationDelay=(Math.random()*3.2).toFixed(2)+"s";
  s.style.animationDuration=(2.4+Math.random()*2.4).toFixed(2)+"s";bg.appendChild(s);}})();
function bumpCombo(){combo++;clearTimeout(comboT);const c=$("#combo");
 if(combo>=3){c.classList.add("on");c.textContent="x"+combo;}
 comboT=setTimeout(()=>{combo=0;c.classList.remove("on");},1100);}