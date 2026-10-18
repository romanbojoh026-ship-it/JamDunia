const cities=[
 ['Jakarta','Asia/Jakarta','WIB'],['Manado','Asia/Makassar','WITA'],['Jayapura','Asia/Jayapura','WIT'],
 ['Singapore','Asia/Singapore','SGT'],['Beijing','Asia/Shanghai','CST'],['Hong Kong','Asia/Hong_Kong','HKT'],
 ['London','Europe/London','GMT'],['New York','America/New_York','EST'],['UTC','UTC','UTC']];
const NS='http://www.w3.org/2000/svg',grid=document.getElementById('grid');
function el(t,a,p){const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);p&&p.appendChild(e);return e}
const refs=cities.map(([name,tz,abbr])=>{
  const card=document.createElement('div');card.className='card';
  const svg=el('svg',{viewBox:'0 0 200 200'});
  el('circle',{cx:100,cy:100,r:96,class:'face'},svg);
  for(let i=0;i<60;i++){const big=i%5===0,a=i*6*Math.PI/180,r1=big?80:85;
    el('line',{x1:100+Math.sin(a)*r1,y1:100-Math.cos(a)*r1,x2:100+Math.sin(a)*90,y2:100-Math.cos(a)*90,class:'tick'+(big?'':' min'),'stroke-width':big?2.5:1},svg)}
  for(let n=1;n<=12;n++){const a=n*30*Math.PI/180;const t=el('text',{x:100+Math.sin(a)*68,y:100-Math.cos(a)*68,class:'num'},svg);t.textContent=n}
  const h=el('line',{x1:100,y1:108,x2:100,y2:56,class:'hand-h','stroke-width':6},svg);
  const m=el('line',{x1:100,y1:112,x2:100,y2:34,class:'hand-m','stroke-width':4},svg);
  const s=el('line',{x1:100,y1:118,x2:100,y2:26,class:'hand-s','stroke-width':1.6},svg);
  el('circle',{cx:100,cy:100,r:4.5,class:'pin'},svg);
  card.appendChild(svg);
  card.insertAdjacentHTML('beforeend',`<div class="info"><div><div class="city">${name}</div><div class="meta"></div></div><div class="dig"></div><span class="tag"></span></div></div>`);
  grid.appendChild(card);
  return {tz,abbr,h,m,s,meta:card.querySelector('.meta'),tag:card.querySelector('.tag')};
});
function parts(d,tz){const o={};new Intl.DateTimeFormat('en-GB',{timeZone:tz,hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23',weekday:'short',day:'2-digit',month:'short',year:'numeric'}).formatToParts(d).forEach(p=>o[p.type]=p.value);return o}
function tick(){
  const now=new Date();
  refs.forEach(r=>{const p=parts(now,r.tz),H=+p.hour,M=+p.minute,S=+p.second;
    r.h.setAttribute('transform',`rotate(${(H%12)*30+M*.5} 100 100)`);
    r.m.setAttribute('transform',`rotate(${M*6+S*.1} 100 100)`);
    r.s.setAttribute('transform',`rotate(${S*6} 100 100)`);
    r.meta.textContent=`${p.weekday}, ${p.day} ${p.month} · ${r.abbr}`;
    const day=H>=6&&H<18;r.tag.className='tag '+(day?'day':'night');r.tag.textContent=day?'Siang':'Malam';});
  document.getElementById('localTime').textContent=now.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});
  document.getElementById('localDate').textContent=now.toLocaleDateString('en-GB',{weekday:'short',day:'2-digit',month:'short',year:'numeric'});
}
tick();setInterval(tick,1000);
