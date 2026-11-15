// ================= GruzNet v2 =================
const firebaseConfig={apiKey:"AIzaSyBG6usK-VeVIrb_4uvFSz5oK58jXnwIMcY",authDomain:"granitas-logistic.firebaseapp.com",projectId:"granitas-logistic",storageBucket:"granitas-logistic.firebasestorage.app",messagingSenderId:"170442392201",appId:"1:170442392201:web:d5316bb485e3d3504c7c58"};
firebase.initializeApp(firebaseConfig);
const db=firebase.firestore(),auth=firebase.auth(),FV=firebase.firestore.FieldValue;
const $=id=>document.getElementById(id),QA=s=>document.querySelectorAll(s);
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));

// ---------- Dil ----------
const L={az:{login:"Giriş",register:"Qeydiyyat",logout:"Çıxış",name:"Ad, soyad",role:"Rol",owner:"Yük sahibi / Dispetçer",carrier:"Daşıyıcı",phone:"Telefon",password:"Şifrə",
loginDesc:"Telefon nömrənizlə daxil olun.",regDesc:"Yeni hesab yaradın.",loginBtn:"Daxil ol",regBtn:"Qeydiyyatdan keç",stats:"Statistika",ads:"Elanlar",users:"İstifadəçilər",
cargo:"Yük elanları",trucks:"Boş tırlar",searchPh:"Bakı, Daşkənd, qoz, taxta...",newest:"Ən yenilər",oldest:"Ən köhnələr",urgentFirst:"Təcili əvvəl",clear:"Təmizlə",
profile:"Profil",active:"Aktiv",past:"Keçmiş",views:"Baxış",favs:"Favori",addCargo:"🚚 Yük elan et",addTruck:"🚛 Boş tır elan et",paste:"WhatsApp mətnini yapışdır",autofill:"Avto-doldur",
product:"Yük",truckType:"Tır tipi",volume:"Həcm (m³)",count:"Tır sayı",fromC:"Haradan (ölkə)",from:"Haradan (şəhər)",toC:"Haraya (ölkə)",to:"Haraya (şəhər)",weight:"Çəki (ton)",
customs:"Gömrük",payType:"Ödəniş növü",price:"Frakht",advance:"Avans (%)",date:"Yükləmə tarixi",expires:"Son tarix",urgent:"Təcili",ready:"Yük hazırdır",noBroker:"Vasitəçisiz",seal:"Plomb daxildir",
publish:"Dərc et",cancel:"Ləğv et",addAd:"Elan əlavə et",editAd:"Elanı redaktə et",emptyTruck:"Boş tır",allFrom:"Haradan: hamısı",allTo:"Haraya: hamısı",allTrucks:"Bütün tır növləri",
cash:"Nağd",transfer:"Köçürmə",mixed:"Avans + qalıq",agree:"Razılaşma",noAds:"Elan yoxdur.",edit:"Redaktə",archive:"Arxivlə",renew:"Yenilə (+3 gün)",wa:"WhatsApp",call:"Zəng",
archiveQ:"Elanı arxivə göndərmək istəyirsiniz?",done:"Hazırdır.",loginOk:"Giriş uğurludur.",authWrong:"Nömrə və ya şifrə yanlışdır.",exists:"Bu nömrə artıq qeydiyyatdadır.",
badPhone:"Telefon beynəlxalq formatda olmalıdır (+998...).",weakPw:"Şifrə ən azı 6 simvol olmalıdır.",badName:"Ad və soyadı daxil edin.",badDates:"Son tarix yükləmə tarixindən əvvəl ola bilməz.",
dup:"Eyni marşrut və yük üçün aktiv elanınız var. Onu yeniləyin.",needLogin:"Əlaqə üçün daxil olun.",saved:"Elan yadda saxlandı.",parsed:"Mətn analiz olundu, yoxlayın.",
noPerm:"İcazə yoxdur.",err:"Xəta baş verdi. Yenidən cəhd edin.",expired:"Vaxtı bitib",ton:"ton",readyB:"Hazırdır",noBrokerB:"Vasitəçisiz"},
ru:{login:"Вход",register:"Регистрация",logout:"Выйти",name:"Имя, фамилия",role:"Роль",owner:"Грузовладелец / Диспетчер",carrier:"Перевозчик",phone:"Телефон",password:"Пароль",
loginDesc:"Войдите по номеру телефона.",regDesc:"Создайте новый аккаунт.",loginBtn:"Войти",regBtn:"Зарегистрироваться",stats:"Статистика",ads:"Объявления",users:"Пользователи",
cargo:"Грузы",trucks:"Свободные машины",searchPh:"Баку, Ташкент, орех, доска...",newest:"Сначала новые",oldest:"Сначала старые",urgentFirst:"Срочные сначала",clear:"Сбросить",
profile:"Профиль",active:"Активные",past:"Прошлые",views:"Просмотры",favs:"Избранное",addCargo:"🚚 Разместить груз",addTruck:"🚛 Свободная машина",paste:"Вставьте текст из WhatsApp",autofill:"Автозаполнение",
product:"Груз",truckType:"Тип машины",volume:"Объём (м³)",count:"Кол-во машин",fromC:"Откуда (страна)",from:"Откуда (город)",toC:"Куда (страна)",to:"Куда (город)",weight:"Вес (т)",
customs:"Таможня",payType:"Вид оплаты",price:"Фрахт",advance:"Аванс (%)",date:"Дата загрузки",expires:"Актуально до",urgent:"Срочно",ready:"Груз готов",noBroker:"Без посредников",seal:"Пломба включена",
publish:"Опубликовать",cancel:"Отмена",addAd:"Добавить объявление",editAd:"Редактировать",emptyTruck:"Свободная машина",allFrom:"Откуда: все",allTo:"Куда: все",allTrucks:"Все типы машин",
cash:"Наличные",transfer:"Перечисление",mixed:"Аванс + остаток",agree:"Договорная",noAds:"Объявлений нет.",edit:"Изменить",archive:"В архив",renew:"Обновить (+3 дня)",wa:"WhatsApp",call:"Звонок",
archiveQ:"Отправить объявление в архив?",done:"Готово.",loginOk:"Вход выполнен.",authWrong:"Неверный номер или пароль.",exists:"Этот номер уже зарегистрирован.",
badPhone:"Телефон в международном формате (+998...).",weakPw:"Пароль минимум 6 символов.",badName:"Введите имя и фамилию.",badDates:"Срок не может быть раньше даты загрузки.",
dup:"У вас уже есть активное объявление по этому маршруту и грузу. Обновите его.",needLogin:"Войдите, чтобы связаться.",saved:"Объявление сохранено.",parsed:"Текст разобран, проверьте поля.",
noPerm:"Нет доступа.",err:"Ошибка. Попробуйте ещё раз.",expired:"Истекло",ton:"т",readyB:"Готов",noBrokerB:"Без посредников"}};
let lang=localStorage.getItem("language")||"az";
const t=k=>L[lang]?.[k]||L.az[k]||k;
function applyI18n(){QA("[data-i18n]").forEach(e=>e.textContent=t(e.dataset.i18n));QA("[data-i18n-ph]").forEach(e=>e.placeholder=t(e.dataset.i18nPh));fillSelects();authUI();}

// ---------- Söhbətdən çıxarılan sabitlər ----------
const COUNTRIES={UZ:["🇺🇿","Özbəkistan","Узбекистан"],RU:["🇷🇺","Rusiya","Россия"],KZ:["🇰🇿","Qazaxıstan","Казахстан"],KG:["🇰🇬","Qırğızıstan","Киргизия"],TJ:["🇹🇯","Tacikistan","Таджикистан"],TM:["🇹🇲","Türkmənistan","Туркменистан"],AZ:["🇦🇿","Azərbaycan","Азербайджан"],TR:["🇹🇷","Türkiyə","Турция"],CN:["🇨🇳","Çin","Китай"],IR:["🇮🇷","İran","Иран"],GE:["🇬🇪","Gürcüstan","Грузия"],AM:["🇦🇲","Ermənistan","Армения"],BY:["🇧🇾","Belarus","Беларусь"],AF:["🇦🇫","Əfqanıstan","Афганистан"]};
const TRUCKS=["Tent","Ref","Mega","Platforma","Konteyner","Furqon","Dump","Tandem"];
const VOLS=["","82","92","96","105","120"];
const PAYS=["cash","transfer","mixed","agree"];
const cn=c=>COUNTRIES[c]?(COUNTRIES[c][0]+" "+COUNTRIES[c][lang==="ru"?2:1]):"";
function opts(arr,first){return (first?`<option value="">${first}</option>`:"")+arr.map(([v,l])=>`<option value="${esc(v)}">${esc(l)}</option>`).join("");}
function fillSelects(){
  const cs=Object.keys(COUNTRIES).map(c=>[c,cn(c)]);
  const keep=id=>$(id).value;const k=["s-from","s-to","s-truck","f-fc","f-tc","f-truck","f-vol","f-paytype"].map(keep);
  $("s-from").innerHTML=opts(cs,t("allFrom"));$("s-to").innerHTML=opts(cs,t("allTo"));$("s-truck").innerHTML=opts(TRUCKS.map(x=>[x,x]),t("allTrucks"));
  $("f-fc").innerHTML=opts(cs);$("f-tc").innerHTML=opts(cs);$("f-truck").innerHTML=opts(TRUCKS.map(x=>[x,x]));
  $("f-vol").innerHTML=opts(VOLS.map(x=>[x,x?x+" m³":"—"]));$("f-paytype").innerHTML=opts(PAYS.map(x=>[x,t(x)]));
  ["s-from","s-to","s-truck","f-fc","f-tc","f-truck","f-vol","f-paytype"].forEach((id,i)=>{if(k[i])$(id).value=k[i];});
}

// ---------- Köməkçilər ----------
function toast(m,type=""){const e=$("toast");e.textContent=m;e.className="toast "+type;clearTimeout(toast._t);toast._t=setTimeout(()=>e.classList.add("hidden"),3500);}
function normPhone(v){let x=String(v||"").trim().replace(/[^\d+]/g,"");if(x.startsWith("00"))x="+"+x.slice(2);if(!x.startsWith("+")&&x.length===10&&x[0]==="0")x="+994"+x.slice(1);else if(!x.startsWith("+")&&x)x="+"+x;return x;}
const digits=p=>String(p||"").replace(/\D/g,"");
const today=()=>new Date().toISOString().slice(0,10);
const addDays=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x.toISOString().slice(0,10);};
function busy(b,on){if(b){b.disabled=!!on;b.classList.toggle("loading",!!on);}}
let me=null,tab="cargo",ptab="active",authMode="login",cache={cargo:[],truck:[]},mine=[],favs=new Set(),unsub=[];
const kindOf=c=>c==="cargo_ads"?"cargo":"truck",collOf=k=>k==="cargo"?"cargo_ads":"truck_ads";

// ---------- Giriş / Qeydiyyat ----------
function authUI(){$("auth-desc").textContent=authMode==="register"?t("regDesc"):t("loginDesc");$("login-btn").textContent=authMode==="register"?t("regBtn"):t("loginBtn");$("register-extra").classList.toggle("hidden",authMode!=="register");QA("[data-auth-tab]").forEach(x=>x.classList.toggle("active",x.dataset.authTab===authMode));}
function showAuth(m){authMode=m||"login";$("auth-screen").classList.remove("hidden");$("app").classList.add("hidden");$("bottom-nav").classList.add("hidden");authUI();}
function showApp(){$("auth-screen").classList.add("hidden");$("app").classList.remove("hidden");$("bottom-nav").classList.remove("hidden");
  $("user-mini").textContent=me?(me.fullName||me.phone)+(me.role==="ADMIN"?" · Admin":""):"";$("logout-btn").classList.toggle("hidden",!me);
  $("admin-panel").classList.toggle("hidden",me?.role!=="ADMIN");if(me?.role==="ADMIN")loadAdmin();setHome();}
$("auth-form").addEventListener("submit",async e=>{
  e.preventDefault();const phone=normPhone($("auth-phone").value),pw=$("auth-password").value;
  if(!/^\+\d{9,14}$/.test(phone))return toast(t("badPhone"),"error");
  if(pw.length<6)return toast(t("weakPw"),"error");
  const b=$("login-btn"),mail=digits(phone)+"@granitas.local";busy(b,true);
  try{
    if(authMode==="login"){await auth.signInWithEmailAndPassword(mail,pw);toast(t("loginOk"),"success");}
    else{
      const name=$("reg-name").value.trim();if(name.length<2){busy(b,false);return toast(t("badName"),"error");}
      const c=await auth.createUserWithEmailAndPassword(mail,pw);
      await db.collection("users").doc(c.user.uid).set({fullName:name,phone,role:$("reg-role").value,language:lang,createdAt:FV.serverTimestamp()});
    }
  }catch(err){const c=err.code||"";toast(["auth/invalid-credential","auth/user-not-found","auth/wrong-password"].includes(c)?t("authWrong"):c==="auth/email-already-in-use"?t("exists"):c==="auth/weak-password"?t("weakPw"):t("err"),"error");}
  finally{busy(b,false);}
});
QA("[data-auth-tab]").forEach(b=>b.onclick=()=>showAuth(b.dataset.authTab));
$("logout-btn").onclick=()=>auth.signOut();
auth.onAuthStateChanged(async u=>{
  mine=[];favs=new Set();
  if(!u){me=null;showApp();return;}
  try{
    let s=await db.collection("users").doc(u.uid).get();
    for(let i=0;!s.exists&&i<3;i++){await new Promise(r=>setTimeout(r,500));s=await db.collection("users").doc(u.uid).get();}
    if(!s.exists){await auth.signOut();return;}
    me={id:u.uid,...s.data()};
    if(me.language&&L[me.language]&&me.language!==lang){lang=me.language;localStorage.setItem("language",lang);applyI18n();$("language-select").value=lang;}
    showApp();loadMine();
  }catch(err){toast(t("err"),"error");}
});
$("language-select").onchange=async e=>{lang=e.target.value;localStorage.setItem("language",lang);applyI18n();render();if(me){db.collection("users").doc(me.id).update({language:lang}).catch(()=>{});renderProfile();}};

// ---------- Elan siyahısı ----------
function listen(){
  unsub.forEach(f=>f());unsub=[];
  ["cargo","truck"].forEach(k=>unsub.push(db.collection(collOf(k)).where("status","==","ACTIVE").limit(300).onSnapshot(s=>{cache[k]=s.docs.map(d=>({id:d.id,collection:collOf(k),...d.data()}));if(tab===k)render();},()=>toast(t("err"),"error"))));
}
const ms=a=>a.createdAt?.toMillis?.()||0;
function render(){
  const q=$("s-text").value.trim().toLowerCase(),f=$("s-from").value,to=$("s-to").value,tr=$("s-truck").value,so=$("s-sort").value,td=today();
  let arr=cache[tab].filter(a=>(!a.expiresAt||a.expiresAt>=td)
    &&(!q||[a.productName,a.from,a.to,a.customs,a.truckType,a.ownerName].some(v=>String(v||"").toLowerCase().includes(q)))
    &&(!f||a.fromCountry===f)&&(!to||a.toCountry===to)&&(!tr||a.truckType===tr));
  arr.sort((a,b)=>so==="old"?ms(a)-ms(b):so==="urgent"?((b.urgent?1:0)-(a.urgent?1:0))||ms(b)-ms(a):ms(b)-ms(a));
  $("ad-list").innerHTML=arr.length?arr.map(a=>card(a,false)).join(""):`<div class="empty">${t("noAds")}</div>`;
}
function payText(a){
  const p=a.price?`${Number(a.price).toLocaleString("en-US")} ${a.currency||"USD"}`:"";
  return [a.payType?t(a.payType):"",p,a.advance?`${t("advance").split(" ")[0]} ${a.advance}%`:""].filter(Boolean).join(" · ")||a.pay||"—";
}
function card(a,own){
  const k=kindOf(a.collection),cargo=k==="cargo",fav=favs.has(k+"_"+a.id),exp=a.expiresAt&&a.expiresAt<today();
  const badges=[a.urgent?"🔥 "+t("urgent"):"",a.ready?"✅ "+t("readyB"):"",a.adr?"⚠️ ADR":"",a.noBroker?"🚫 "+t("noBrokerB"):"",a.seal?"🔒":"",exp?"⏳ "+t("expired"):""].filter(Boolean).map(x=>`<span class="flag">${x}</span>`).join("");
  const wa=`https://wa.me/${digits(a.ownerPhone)}?text=${encodeURIComponent(`Salam, GruzNet: ${a.from} → ${a.to}${cargo?", "+(a.productName||""):""}, ${a.date||""}`)}`;
  return `<article class="ad-card${a.urgent?" urgent":""}">
  <div class="ad-head"><div><div class="ad-title">${esc(cargo?a.productName:t("emptyTruck"))}</div>
  <div class="route">${cn(a.fromCountry)?esc(COUNTRIES[a.fromCountry][0]):""} ${esc(a.from)} → ${cn(a.toCountry)?esc(COUNTRIES[a.toCountry][0]):""} ${esc(a.to)}</div></div>
  <span class="badge">${esc(a.truckType||"")}${a.volume?" "+esc(a.volume)+"m³":""}</span></div>
  ${badges?`<div class="flags">${badges}</div>`:""}
  <div class="details">
  ${cargo?`<div class="detail"><b>${t("weight")}:</b> ${esc(a.weight||"—")}</div><div class="detail"><b>${t("customs")}:</b> ${esc(a.customs||"—")}</div>`:""}
  <div class="detail"><b>${t("count")}:</b> ${esc(a.truckCount||1)}</div>
  <div class="detail"><b>${t("price")}:</b> ${esc(payText(a))}</div>
  <div class="detail"><b>${t("date")}:</b> ${esc(a.date||"—")}</div>
  <div class="detail"><b>${t("expires")}:</b> ${esc(a.expiresAt||"—")}</div></div>
  <div class="ad-footer"><div class="muted">👤 ${esc(a.ownerName||"")}</div>
  <div class="ad-tools"><span class="views">👁 ${a.views||0}</span>
  <button class="favorite-btn${fav?" active":""}" type="button" onclick="toggleFav('${a.id}','${k}')">${fav?"❤️":"♡"}</button>
  ${own?`<button class="btn small secondary" type="button" onclick="editAd('${a.collection}','${a.id}')">${t("edit")}</button>
  ${a.status==="ACTIVE"?`<button class="btn small success" type="button" onclick="renewAd('${a.collection}','${a.id}')">${t("renew")}</button><button class="btn small danger" type="button" onclick="archiveAd('${a.collection}','${a.id}')">${t("archive")}</button>`:""}`
  :`<button class="btn small success" type="button" onclick="contact('${a.collection}','${a.id}','wa','${esc(wa)}')">${t("wa")}</button><button class="btn small" type="button" onclick="contact('${a.collection}','${a.id}','tel','tel:${esc(a.ownerPhone)}')">${t("call")}</button>`}
  </div></div></article>`;
}
function contact(coll,id,type,url){
  if(!me){toast(t("needLogin"),"error");return showAuth("login");}
  db.collection(coll).doc(id).update({views:FV.increment(1)}).catch(()=>{});
  window.open(url,type==="wa"?"_blank":"_self");
}
async function toggleFav(id,k){
  if(!me){return showAuth("login");}
  const key=k+"_"+id,ref=db.collection("favorites").doc(me.id+"_"+key);
  try{if(favs.has(key)){await ref.delete();favs.delete(key);}else{await ref.set({userId:me.id,adId:id,kind:k,createdAt:FV.serverTimestamp()});favs.add(key);}
  render();renderProfile();}catch(e){toast(t("err"),"error");}
}
window.contact=contact;window.toggleFav=toggleFav;

// ---------- Profil ----------
function loadMine(){
  if(!me)return;
  const m={cargo:[],truck:[]};
  ["cargo","truck"].forEach(k=>unsub.push(db.collection(collOf(k)).where("ownerId","==",me.id).limit(200).onSnapshot(s=>{m[k]=s.docs.map(d=>({id:d.id,collection:collOf(k),...d.data()}));mine=[...m.cargo,...m.truck];renderProfile();})));
  db.collection("favorites").where("userId","==",me.id).get().then(s=>{favs=new Set(s.docs.map(d=>d.data().kind+"_"+d.data().adId));render();renderProfile();}).catch(()=>{});
}
async function renderProfile(){
  if(!me)return;
  $("p-name").textContent=me.fullName||"";$("p-phone").textContent=me.phone||"";$("p-role").textContent=me.role==="ADMIN"?"Admin":me.role==="CARRIER"?t("carrier"):t("owner");
  $("p-avatar").textContent=(me.fullName||"P").split(/\s+/).slice(0,2).map(x=>x[0]).join("").toUpperCase();
  const act=mine.filter(a=>a.status==="ACTIVE");$("p-active").textContent=act.length;$("p-views").textContent=mine.reduce((n,a)=>n+(a.views||0),0);$("p-favs").textContent=favs.size;
  let list=ptab==="active"?act:ptab==="past"?mine.filter(a=>a.status!=="ACTIVE"):[];
  if(ptab==="favs"){
    const r=await Promise.all([...favs].map(f=>{const [k,id]=f.split("_");return db.collection(collOf(k)).doc(id).get().then(s=>s.exists?{id:s.id,collection:collOf(k),...s.data()}:null).catch(()=>null);}));
    list=r.filter(Boolean);
  }
  $("profile-ads").innerHTML=list.length?list.map(a=>card(a,ptab!=="favs")).join(""):`<div class="empty">${t("noAds")}</div>`;
}
QA("[data-profile-tab]").forEach(b=>b.onclick=()=>{ptab=b.dataset.profileTab;QA("[data-profile-tab]").forEach(x=>x.classList.toggle("active",x===b));renderProfile();});

// ---------- Elan əlavə et / redaktə ----------
function setKind(k){$("f-kind").value=k;QA("[data-kind]").forEach(x=>x.classList.toggle("active",x.dataset.kind===k));QA(".cg").forEach(x=>x.classList.toggle("hidden",k!=="cargo"));$("f-product").required=k==="cargo";}
QA("[data-kind]").forEach(b=>b.onclick=()=>setKind(b.dataset.kind));
function openAd(k,a){
  if(!me){toast(t("needLogin"),"error");return showAuth("login");}
  $("ad-form").reset();$("f-id").value=a?.id||"";setKind(k);$("f-cur").value="USD";$("f-count").value=1;$("f-date").value=today();$("f-exp").value=addDays(today(),3);
  $("modal-title").textContent=a?t("editAd"):t("addAd");$("kind-tabs").classList.toggle("hidden",!!a);$("paste-box").classList.toggle("hidden",!!a);
  if(a){const m={"f-product":"productName","f-truck":"truckType","f-vol":"volume","f-count":"truckCount","f-fc":"fromCountry","f-from":"from","f-tc":"toCountry","f-to":"to","f-weight":"weight","f-customs":"customs","f-paytype":"payType","f-price":"price","f-cur":"currency","f-advance":"advance","f-date":"date","f-exp":"expiresAt"};
    Object.entries(m).forEach(([i,f])=>{if(a[f]!=null)$(i).value=a[f];});
    [["f-urgent","urgent"],["f-ready","ready"],["f-adr","adr"],["f-nobroker","noBroker"],["f-seal","seal"]].forEach(([i,f])=>$(i).checked=!!a[f]);}
  $("ad-modal").classList.add("open");
}
window.editAd=(c,id)=>openAd(kindOf(c),mine.find(x=>x.id===id));
$("nav-add").onclick=()=>openAd(me?.role==="CARRIER"?"truck":"cargo");
$("modal-close").onclick=$("f-cancel").onclick=()=>$("ad-modal").classList.remove("open");
$("ad-form").addEventListener("submit",async e=>{
  e.preventDefault();if(!me)return;
  const k=$("f-kind").value,id=$("f-id").value,coll=collOf(k),date=$("f-date").value,exp=$("f-exp").value;
  if(exp<date)return toast(t("badDates"),"error");
  const d={productName:k==="cargo"?$("f-product").value.trim():t("emptyTruck"),truckType:$("f-truck").value,volume:$("f-vol").value,truckCount:Number($("f-count").value||1),
    fromCountry:$("f-fc").value,from:$("f-from").value.trim(),toCountry:$("f-tc").value,to:$("f-to").value.trim(),
    payType:$("f-paytype").value,price:Number($("f-price").value||0),currency:$("f-cur").value,advance:Number($("f-advance").value||0),
    date,expiresAt:exp,urgent:$("f-urgent").checked,noBroker:$("f-nobroker").checked,status:"ACTIVE",
    ownerId:me.id,ownerName:me.fullName||"",ownerPhone:me.phone||"",updatedAt:FV.serverTimestamp()};
  if(k==="cargo")Object.assign(d,{weight:Number($("f-weight").value||0),customs:$("f-customs").value.trim(),ready:$("f-ready").checked,adr:$("f-adr").checked,seal:$("f-seal").checked});
  if(!id&&mine.some(a=>a.collection===coll&&a.status==="ACTIVE"&&a.from.toLowerCase()===d.from.toLowerCase()&&a.to.toLowerCase()===d.to.toLowerCase()&&(k==="truck"||a.productName.toLowerCase()===d.productName.toLowerCase())))return toast(t("dup"),"error");
  const b=$("f-submit");busy(b,true);
  try{if(id)await db.collection(coll).doc(id).update(d);else await db.collection(coll).add({...d,views:0,createdAt:FV.serverTimestamp()});
    $("ad-modal").classList.remove("open");toast(t("saved"),"success");}
  catch(err){toast(t("err"),"error");}finally{busy(b,false);}
});
window.archiveAd=async(c,id)=>{if(!confirm(t("archiveQ")))return;try{await db.collection(c).doc(id).update({status:"ARCHIVED",archivedAt:FV.serverTimestamp(),updatedAt:FV.serverTimestamp()});toast(t("done"),"success");}catch(e){toast(t("noPerm"),"error");}};
window.renewAd=async(c,id)=>{try{await db.collection(c).doc(id).update({expiresAt:addDays(today(),3),updatedAt:FV.serverTimestamp(),createdAt:FV.serverTimestamp()});toast(t("done"),"success");}catch(e){toast(t("err"),"error");}};

// ---------- WhatsApp mətnindən avto-doldurma ----------
const flagCode=f=>[...f].map(c=>String.fromCharCode(c.codePointAt(0)-0x1F1E6+65)).join("");
function parsePaste(s){
  const o={},flags=(s.match(/[\u{1F1E6}-\u{1F1FF}]{2}/gu)||[]).map(flagCode).filter(c=>COUNTRIES[c]);
  if(flags[0])o.fc=flags[0];if(flags[1])o.tc=flags[1];
  const clean=s.replace(/[\u{1F1E6}-\u{1F1FF}]|\p{Extended_Pictographic}|\uFE0F|\*/gu,"");
  for(const ln of clean.split("\n")){const m=ln.match(/^\s*([^\d:→>\-–—➞➜]{2,30}?)\s*(?:→|->|—>|➞|➜|➡|–|—|-)\s*([^\d:→>\-–—➞➜]{2,30}?)\s*$/);if(m){o.from=m[1].trim();o.to=m[2].trim();break;}}
  const p=clean.match(/(?:груз|юк|yük|yuk)\s*[:\-]?\s*([^\n]{2,40})/i);if(p)o.product=p[1].trim();
  const w=clean.match(/(\d{1,2}(?:[.,]\d)?)\s*(?:т\b|тон|ton|tonn|t\b)/i);if(w)o.weight=w[1].replace(",",".");
  const pr=clean.match(/(\d[\d\s.]{2,7})\s*(?:\$|usd)/i)||clean.match(/(?:\$|usd)\s*(\d[\d\s.]{2,7})/i);if(pr)o.price=pr[1].replace(/[\s.]/g,"");
  const lc=clean.toLowerCase();
  o.truck=/реф|ref\b/.test(lc)&&!/тент/.test(lc)?"Ref":/мега|mega/.test(lc)?"Mega":/площадк/.test(lc)?"Platforma":/тент|tent/.test(lc)?"Tent":"";
  const v=lc.match(/\b(82|92|96|105|120)\b/);if(v)o.vol=v[1];
  o.pay=/безнал|перечисл|köçürmə/.test(lc)?"transfer":/нал|nağd|нақд|cash/.test(lc)?"cash":"";
  o.urgent=/срочн|təcili|шошилинч/.test(lc);o.ready=/груз готов|юк тайёр|hazır|погрузка готов/.test(lc);o.adr=/\bадр|\badr/.test(lc);o.nb=/без посредник|vasitəçi/.test(lc);o.seal=/пломб/.test(lc);
  const c=lc.match(/(\d+)\s*(?:авто|машин|тент|реф|та\b)/);if(c)o.count=c[1];
  return o;
}
$("f-parse").onclick=()=>{
  const o=parsePaste($("f-paste").value),set=(i,v)=>{if(v)$(i).value=v;};
  set("f-fc",o.fc);set("f-tc",o.tc);set("f-from",o.from);set("f-to",o.to);set("f-product",o.product);set("f-weight",o.weight);set("f-price",o.price);set("f-truck",o.truck);set("f-vol",o.vol);set("f-paytype",o.pay);set("f-count",o.count);
  $("f-urgent").checked=!!o.urgent;$("f-ready").checked=!!o.ready;$("f-adr").checked=!!o.adr;$("f-nobroker").checked=!!o.nb;$("f-seal").checked=!!o.seal;
  toast(t("parsed"),"success");
};

// ---------- Admin ----------
function loadAdmin(){
  db.collection("users").onSnapshot(s=>$("st-users").textContent=s.size);
  db.collection("cargo_ads").where("status","==","ACTIVE").onSnapshot(s=>$("st-cargo").textContent=s.size);
  db.collection("truck_ads").where("status","==","ACTIVE").onSnapshot(s=>$("st-trucks").textContent=s.size);
}
QA("[data-admin-tab]").forEach(b=>b.onclick=async()=>{
  QA("[data-admin-tab]").forEach(x=>x.classList.toggle("active",x===b));["stats","ads","users"].forEach(x=>$("admin-"+x).classList.toggle("hidden",x!==b.dataset.adminTab));
  if(b.dataset.adminTab==="ads"){const r=await Promise.all(["cargo","truck"].map(k=>db.collection(collOf(k)).orderBy("createdAt","desc").limit(100).get()));
    const all=r.flatMap((s,i)=>s.docs.map(d=>({id:d.id,collection:collOf(i?"truck":"cargo"),...d.data()})));
    $("admin-ads-list").innerHTML=all.map(a=>card(a,true)).join("")||`<div class="empty">${t("noAds")}</div>`;}
  if(b.dataset.adminTab==="users"){const s=await db.collection("users").orderBy("createdAt","desc").limit(200).get();
    $("admin-users-list").innerHTML=s.docs.map(d=>{const u=d.data();return `<tr><td>${esc(u.fullName)}</td><td>${esc(u.phone)}</td><td>${esc(u.role)}</td><td>${u.role!=="ADMIN"?`<button class="btn small danger" type="button" onclick="delUser('${d.id}')">×</button>`:""}</td></tr>`;}).join("");}
});
window.delUser=async id=>{if(me?.role!=="ADMIN"||!confirm("?"))return;try{await db.collection("users").doc(id).delete();toast(t("done"),"success");}catch(e){toast(t("noPerm"),"error");}};

// ---------- Naviqasiya ----------
function setHome(){$("profile-panel").classList.add("hidden");$("user-panel").classList.remove("hidden");QA("[data-bottom]").forEach(x=>x.classList.toggle("active",x.dataset.bottom==="home"));render();}
QA("[data-main-tab]").forEach(b=>b.onclick=()=>{tab=b.dataset.mainTab;QA("[data-main-tab]").forEach(x=>x.classList.toggle("active",x===b));render();});
QA("[data-bottom]").forEach(b=>b.onclick=()=>{if(b.dataset.bottom==="home")return setHome();if(!me)return showAuth("login");$("user-panel").classList.add("hidden");$("profile-panel").classList.remove("hidden");QA("[data-bottom]").forEach(x=>x.classList.toggle("active",x===b));renderProfile();});
["s-text"].forEach(i=>$(i).oninput=render);["s-from","s-to","s-truck","s-sort"].forEach(i=>$(i).onchange=render);
$("s-clear").onclick=()=>{["s-text","s-from","s-to","s-truck"].forEach(i=>$(i).value="");$("s-sort").value="new";render();};
$("language-select").value=lang;applyI18n();listen();
