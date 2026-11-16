const firebaseConfig={apiKey:"AIzaSyBG6usK-VeVIrb_4uvFSz5oK58jXnwIMcY",authDomain:"granitas-logistic.firebaseapp.com",projectId:"granitas-logistic",storageBucket:"granitas-logistic.firebasestorage.app",messagingSenderId:"170442392201",appId:"1:170442392201:web:d5316bb485e3d3504c7c58"};
firebase.initializeApp(firebaseConfig);
const db=firebase.firestore(),auth=firebase.auth(),FV=firebase.firestore.FieldValue,$=i=>document.getElementById(i),QA=s=>document.querySelectorAll(s);
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
const ms=a=>a.createdAt?.toMillis?.()||0,fmt=a=>ms(a)?new Date(ms(a)).toLocaleString("az-AZ",{dateStyle:"short",timeStyle:"short"}):"—";
let me,users=[],ads=[],msgs=[];
function toast(m,t=""){const e=$("toast");e.textContent=m;e.className="toast "+t;clearTimeout(toast.x);toast.x=setTimeout(()=>e.classList.add("hidden"),3200);}
function theme(m){document.documentElement.dataset.theme=m;localStorage.setItem("theme",m);$("theme").textContent=m==="dark"?"☀️":"🌙";}
theme(localStorage.getItem("theme")||"light");$("theme").onclick=()=>theme(document.documentElement.dataset.theme==="dark"?"light":"dark");
$("lf").onsubmit=async e=>{e.preventDefault();let p=$("ph").value.replace(/[^\d+]/g,"");if(p.startsWith("00"))p="+"+p.slice(2);if(!p.startsWith("+")&&p.length===10&&p[0]==="0")p="+994"+p.slice(1);
  try{await auth.signInWithEmailAndPassword(p.replace(/\D/g,"")+"@granitas.local",$("pw").value);}catch(_){toast("Nömrə və ya şifrə yanlışdır.","error");}};
$("out").onclick=()=>auth.signOut();
auth.onAuthStateChanged(async u=>{
  if(!u){$("login").classList.remove("hidden");$("panel").classList.add("hidden");$("out").classList.add("hidden");return;}
  try{const s=await db.collection("users").doc(u.uid).get();
    if(!s.exists||s.data().role!=="ADMIN"){await auth.signOut();return toast("Bu hesabın admin icazəsi yoxdur.","error");}
    me={id:u.uid,...s.data()};$("login").classList.add("hidden");$("panel").classList.remove("hidden");$("out").classList.remove("hidden");load();
  }catch(_){toast("Xəta. Firestore qaydalarını yoxlayın.","error");}
});
QA("[data-t]").forEach(b=>b.onclick=()=>{if(b.dataset.t==="ref")return load();QA("[data-t]").forEach(x=>x.classList.toggle("active",x===b));["dash","users","ads","msgs","imp"].forEach(k=>$("s-"+k).classList.toggle("hidden",k!==b.dataset.t));});
async function load(){
  try{const g=c=>db.collection(c).limit(1000).get(),[u,c,t,m]=await Promise.all(["users","cargo_ads","truck_ads","messages"].map(g));
    users=u.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>ms(b)-ms(a));
    ads=[...c.docs.map(d=>({id:d.id,coll:"cargo_ads",...d.data()})),...t.docs.map(d=>({id:d.id,coll:"truck_ads",...d.data()}))].sort((a,b)=>ms(b)-ms(a));
    msgs=m.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>ms(b)-ms(a));render();}catch(e){toast("Yükləmə xətası: "+(e.code||""),"error");}
}
function render(){
  const act=ads.filter(a=>a.status==="ACTIVE"),nw=msgs.filter(m=>!m.read).length,ex=act.filter(a=>a.expiresAt&&a.expiresAt<new Date().toISOString().slice(0,10)).length;
  const st=[["İstifadəçilər",users.length],["Yük sahibi",users.filter(u=>u.role==="CARGO_OWNER").length],["Daşıyıcı",users.filter(u=>u.role==="CARRIER").length],["Aktiv yük",act.filter(a=>a.coll==="cargo_ads").length],["Aktiv tır",act.filter(a=>a.coll==="truck_ads").length],["Arxiv",ads.length-act.length],["Vaxtı bitmiş",ex],["Yeni mesaj",nw],["Bloklu",users.filter(u=>u.blocked).length]];
  $("stats").innerHTML=st.map(([k,v])=>`<div class="stat"><span class="muted">${k}</span><b>${v}</b></div>`).join("");$("mc").textContent=nw?`(${nw})`:"";
  const days=[...Array(7)].map((_,i)=>{const d=new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()-6+i);return d;});
  const cnt=(arr,d)=>arr.filter(x=>{const m=ms(x);return m>=d.getTime()&&m<d.getTime()+864e5;}).length,mx=Math.max(1,...days.map(d=>cnt(users,d)+cnt(ads,d)));
  $("bars").innerHTML=days.map(d=>{const a=cnt(users,d),b=cnt(ads,d);return `<div title="Qeydiyyat ${a}, elan ${b}"><i style="height:${(a+b)/mx*80}px"></i>${a}/${b}<br>${d.getDate()}.${d.getMonth()+1}</div>`;}).join("");
  renderUsers();renderAds();renderMsgs();
}
function renderUsers(){const q=$("uq").value.toLowerCase(),n={};ads.forEach(a=>n[a.ownerId]=(n[a.ownerId]||0)+1);
  $("ut").innerHTML=users.filter(u=>!q||(u.fullName+" "+u.phone).toLowerCase().includes(q)).map(u=>{const self=u.id===me.id;return `<tr><td>${esc(u.fullName)}${u.blocked?" 🚫":""}</td><td>${esc(u.phone)}</td>
  <td><select class="form-control" ${self?"disabled":""} onchange="setRole('${u.id}',this.value)">${["CARGO_OWNER","CARRIER","ADMIN"].map(r=>`<option ${u.role===r?"selected":""}>${r}</option>`).join("")}</select></td><td>${n[u.id]||0}</td><td>${fmt(u)}</td>
  <td>${self?"":`<button class="btn small ${u.blocked?"success":"secondary"}" type="button" onclick="block('${u.id}',${!u.blocked})">${u.blocked?"Aç":"Blokla"}</button> <button class="btn small danger" type="button" onclick="delUser('${u.id}')">Sil</button>`}</td></tr>`;}).join("");}
function renderAds(){const q=$("aq").value.toLowerCase(),f=$("af").value;
  $("at").innerHTML=ads.filter(a=>(!f||a.status===f)&&(!q||[a.from,a.to,a.productName,a.ownerName,a.ownerPhone].join(" ").toLowerCase().includes(q))).slice(0,300).map(a=>`<tr><td>${a.coll==="cargo_ads"?"🚚 Yük":"🚛 Tır"}</td><td>${esc(a.from)} → ${esc(a.to)}<div class="muted">${esc(a.productName||"")}</div></td><td>${esc(a.ownerName)}<div class="muted">${esc(a.ownerPhone)}</div></td><td>${esc(a.status)}</td><td>${a.views||0}</td>
  <td><button class="btn small secondary" type="button" onclick="adSt('${a.coll}','${a.id}','${a.status==="ACTIVE"?"ARCHIVED":"ACTIVE"}')">${a.status==="ACTIVE"?"Arxivlə":"Aktiv et"}</button> <button class="btn small danger" type="button" onclick="delAd('${a.coll}','${a.id}')">Sil</button></td></tr>`).join("");}
function renderMsgs(){$("ml").innerHTML=msgs.map(m=>`<div class="msg${m.read?"":" new"}"><b>${esc(m.name)}</b> · ${esc(m.phone)} · <span class="muted">${fmt(m)}</span><p>${esc(m.text)}</p>
  <a class="btn small success" target="_blank" rel="noopener" href="https://wa.me/${String(m.phone||"").replace(/\D/g,"")}">WhatsApp</a> ${m.read?"":`<button class="btn small secondary" type="button" onclick="rd('${m.id}')">Oxundu</button>`} <button class="btn small danger" type="button" onclick="delMsg('${m.id}')">Sil</button></div>`).join("")||'<div class="empty">Mesaj yoxdur.</div>';}
$("uq").oninput=renderUsers;$("aq").oninput=$("af").onchange=renderAds;
async function run(p,ok="Hazırdır."){try{await p;toast(ok,"success");load();}catch(e){toast("Xəta: "+(e.code||""),"error");}}
window.setRole=(id,r)=>confirm("Rol dəyişdirilsin?")?run(db.collection("users").doc(id).update({role:r})):renderUsers();
window.block=(id,b)=>run(db.collection("users").doc(id).update({blocked:b}));
window.delUser=id=>confirm("Profil silinsin?")&&run(db.collection("users").doc(id).delete());
window.adSt=(c,id,s)=>run(db.collection(c).doc(id).update({status:s,updatedAt:FV.serverTimestamp()}));
window.delAd=(c,id)=>confirm("Elan silinsin?")&&run(db.collection(c).doc(id).delete());
window.rd=id=>run(db.collection("messages").doc(id).update({read:true}));
window.delMsg=id=>confirm("Mesaj silinsin?")&&run(db.collection("messages").doc(id).delete());
function csv(n,rows){const a=document.createElement("a");a.href=URL.createObjectURL(new Blob(["\ufeff"+rows.map(r=>r.map(x=>'"'+String(x??"").replace(/"/g,'""')+'"').join(",")).join("\n")],{type:"text/csv"}));a.download=n;a.click();}
$("ux").onclick=()=>csv("users.csv",[["Ad","Telefon","Rol","Bloklu","Tarix"],...users.map(u=>[u.fullName,u.phone,u.role,u.blocked?1:0,fmt(u)])]);
$("ax").onclick=()=>csv("ads.csv",[["Növ","Haradan","Haraya","Yük","Sahib","Telefon","Status","Baxış"],...ads.map(a=>[a.coll,a.from,a.to,a.productName,a.ownerName,a.ownerPhone,a.status,a.views||0])]);

// ===== WhatsApp idxalı =====
let impRows=[];
$("imf").onchange=async e=>{const f=e.target.files[0];if(!f)return;
  try{impRows=JSON.parse(await f.text());if(!Array.isArray(impRows))throw 0;}catch(_){impRows=[];toast("JSON oxunmadı.","error");}
  $("imi").textContent=impRows.length+" elan oxundu.";$("imb").disabled=!impRows.length;};
$("imb").onclick=async()=>{
  if(!impRows.length||!confirm(impRows.length+" elan idxal olunsun?"))return;
  const d=Math.min(14,Math.max(1,Number($("imd").value)||3)),td=new Date().toISOString().slice(0,10),ex=new Date(Date.now()+d*864e5).toISOString().slice(0,10);
  $("imb").disabled=true;let n=0;
  try{for(let i=0;i<impRows.length;i+=400){const b=db.batch();
    impRows.slice(i,i+400).forEach(r=>{const k=r.kind==="truck"?"truck_ads":"cargo_ads";
      b.set(db.collection(k).doc(),{productName:String(r.productName||"Yük").slice(0,120),truckType:r.truckType||"Tent",volume:r.volume||"",truckCount:1,fromCountry:r.fromCountry||"",from:String(r.from||"").slice(0,100),toCountry:r.toCountry||"",to:String(r.to||"").slice(0,100),weight:Number(r.weight)||0,customs:"",payType:r.payType||"agree",price:Number(r.price)||0,currency:r.currency||"USD",advance:0,urgent:!!r.urgent,ready:!!r.ready,adr:!!r.adr,noBroker:!!r.noBroker,seal:!!r.seal,
        status:"ACTIVE",views:0,imported:true,source:"whatsapp",ownerId:me.id,ownerName:"GruzNet (WhatsApp)",ownerPhone:r.ownerPhone||"",date:td,expiresAt:ex,createdAt:FV.serverTimestamp(),updatedAt:FV.serverTimestamp()});n++;});
    await b.commit();}
    toast(n+" elan idxal olundu.","success");load();}catch(e){toast("Xəta: "+(e.code||e.message),"error");}
  $("imb").disabled=false;};
$("imx").onclick=async()=>{
  if(!confirm("İdxal olunmuş bütün elanlar silinsin?"))return;let n=0;
  try{for(const c of["cargo_ads","truck_ads"]){const s=await db.collection(c).where("imported","==",true).get();
    for(let i=0;i<s.docs.length;i+=400){const b=db.batch();s.docs.slice(i,i+400).forEach(d=>{b.delete(d.ref);n++;});await b.commit();}}
    toast(n+" elan silindi.","success");load();}catch(e){toast("Xəta: "+(e.code||e.message),"error");}};
