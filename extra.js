// ===== GruzNet v2.1: səhifələr, tema, PWA, paylaşma =====
Object.assign(L.az,{heroT:"Yük və tır — bir yerdə",heroP:"Tez elan ver, düzgün tırı və ya yükü tap.",install:"📲 Quraşdır",help:"Kömək",contact:"Əlaqə",legal:"Qaydalar",writeUs:"Bizə yazın",message:"Mesaj",send:"Göndər",sent:"Mesajınız göndərildi. Tezliklə cavab verəcəyik.",copied:"Elan mətni kopyalandı."});
Object.assign(L.ru,{heroT:"Грузы и машины — в одном месте",heroP:"Быстро размещайте объявления и находите нужную машину или груз.",install:"📲 Установить",help:"Помощь",contact:"Контакты",legal:"Правила",writeUs:"Напишите нам",message:"Сообщение",send:"Отправить",sent:"Сообщение отправлено. Мы скоро ответим.",copied:"Текст объявления скопирован."});
const FAQ={az:[["Elan necə əlavə olunur?","Qeydiyyatdan keçin, ortadakı + düyməsinə basın. WhatsApp qrupundakı mətni yapışdırıb «Avto-doldur» düyməsi ilə sahələri tez doldura bilərsiniz."],
["Əlaqə üçün niyə giriş lazımdır?","Zəng və WhatsApp düymələri yalnız qeydiyyatdan keçmiş istifadəçilərə açıqdır. Bu, spamın qarşısını alır."],
["Elan nə qədər aktiv qalır?","Son tarixə qədər. Vaxtı bitən elanlar avtomatik gizlənir; «Yenilə (+3 gün)» düyməsi ilə uzada bilərsiniz."],
["Eyni elanı təkrar yerləşdirə bilərəmmi?","Eyni marşrut və yük üçün aktiv elan varsa, yenisi qəbul edilmir. Köhnəni yeniləyin."],
["Tır tipləri nə deməkdir?","Tent — örtülü, Ref — soyuducu, Mega — yüksək həcmli (96–105 m³), Platforma — açıq, Konteyner və Tandem də seçilə bilər."],
["Şifrəmi unutdum, nə edim?","«Əlaqə» səhifəsindən bizə yazın, nömrənizi təsdiqləyib kömək edək."]],
ru:[["Как добавить объявление?","Зарегистрируйтесь и нажмите + в центре. Вставьте текст из WhatsApp и нажмите «Автозаполнение»."],
["Зачем вход для связи?","Кнопки звонка и WhatsApp доступны только зарегистрированным пользователям — это защищает от спама."],
["Сколько живёт объявление?","До указанной даты. Просроченные скрываются автоматически; продлить можно кнопкой «Обновить (+3 дня)»."],
["Можно ли дублировать объявление?","Если по этому маршруту и грузу уже есть активное объявление, новое не принимается. Обновите старое."],
["Что значат типы машин?","Тент — закрытый, Реф — рефрижератор, Мега — большой объём (96–105 м³), Площадка — открытая, также Контейнер и Тандем."],
["Забыли пароль?","Напишите нам на странице «Контакты» — мы подтвердим номер и поможем."]]};
const LEGAL={az:"<h3>GruzNet haqqında</h3><p>GruzNet yük sahibləri, dispetçerlər və daşıyıcıları bir araya gətirən logistika birjasıdır. Platforma vasitəçidir və daşımaların icrasına cavabdeh deyil.</p><h3>İstifadə qaydaları</h3><ul><li>Elanlar düzgün və aktual olmalıdır.</li><li>Saxta və təkrarlanan elanlar silinə bilər.</li><li>Sövdələşmələr tərəflərin öz məsuliyyətidir; avans verməzdən əvvəl tərəfi yoxlayın.</li></ul><h3>Məxfilik</h3><p>Ad, telefon və elan məlumatları yalnız platformanın işləməsi üçün saxlanılır və üçüncü şəxslərə satılmır. Silinmə üçün «Əlaqə» səhifəsindən müraciət edin.</p>",
ru:"<h3>О GruzNet</h3><p>GruzNet — логистическая биржа, объединяющая грузовладельцев, диспетчеров и перевозчиков. Платформа является посредником и не отвечает за исполнение перевозок.</p><h3>Правила</h3><ul><li>Объявления должны быть точными и актуальными.</li><li>Ложные и дублирующиеся объявления могут быть удалены.</li><li>Сделки — ответственность сторон; проверяйте контрагента перед авансом.</li></ul><h3>Конфиденциальность</h3><p>Имя, телефон и данные объявлений хранятся только для работы платформы и не продаются третьим лицам. Для удаления данных напишите через «Контакты».</p>"};
function fillPages(){
  $("faq").innerHTML=FAQ[lang].map(([q,a])=>`<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("");
  $("legal-body").innerHTML=LEGAL[lang];
}
function showPage(n){
  ["user-panel","profile-panel","admin-panel"].forEach(i=>$(i).classList.add("hidden"));
  QA(".page").forEach(p=>p.classList.toggle("hidden",p.id!=="page-"+n));
  QA(".nav-side").forEach(x=>x.classList.toggle("active",x.dataset.page===n));
  if(n==="contact"&&me){$("c-name").value=me.fullName||"";$("c-phone").value=me.phone||"";}
  scrollTo({top:0,behavior:"smooth"});
}
QA("[data-page]").forEach(b=>b.addEventListener("click",()=>showPage(b.dataset.page)));
QA("[data-bottom]").forEach(b=>b.addEventListener("click",()=>{QA(".page").forEach(p=>p.classList.add("hidden"));if(me?.role==="ADMIN"&&b.dataset.bottom==="home")$("admin-panel").classList.remove("hidden");}));
$("c-wa").href="https://wa.me/994702538945?text="+encodeURIComponent("Salam, GruzNet haqqında yazıram.");
$("contact-form").addEventListener("submit",async e=>{
  e.preventDefault();const b=$("c-send");busy(b,true);
  try{await db.collection("messages").add({text:$("c-msg").value.trim(),name:$("c-name").value.trim(),phone:$("c-phone").value.trim(),uid:me?.id||null,createdAt:FV.serverTimestamp()});
    $("c-msg").value="";toast(t("sent"),"success");}catch(err){toast(t("err"),"error");}finally{busy(b,false);}
});
// Tema
function setTheme(m){document.documentElement.dataset.theme=m;localStorage.setItem("theme",m);$("theme-btn").textContent=m==="dark"?"☀️":"🌙";}
setTheme(localStorage.getItem("theme")||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"));
$("theme-btn").onclick=()=>setTheme(document.documentElement.dataset.theme==="dark"?"light":"dark");
// Hero düymələri
$("h-cargo").onclick=()=>openAd("cargo");$("h-truck").onclick=()=>openAd("truck");
// Paylaş
window.shareAd=async(id,k)=>{
  const a=(cache[k].find(x=>x.id===id))||mine.find(x=>x.id===id);if(!a)return;
  const txt=`🚛 GruzNet\n${COUNTRIES[a.fromCountry]?.[0]||""} ${a.from} → ${COUNTRIES[a.toCountry]?.[0]||""} ${a.to}\n${k==="cargo"?"📦 "+a.productName+" · "+(a.weight||"")+" "+t("ton")+"\n":""}🚚 ${a.truckType||""}\n💰 ${payText(a)}\n${location.href.split("#")[0]}`;
  try{if(navigator.share)await navigator.share({text:txt});else{await navigator.clipboard.writeText(txt);toast(t("copied"),"success");}}catch(_){}
};
// PWA
let dip=null;addEventListener("beforeinstallprompt",e=>{e.preventDefault();dip=e;$("install-btn").classList.remove("hidden");});
$("install-btn").onclick=async()=>{if(!dip)return;dip.prompt();await dip.userChoice;dip=null;$("install-btn").classList.add("hidden");};
if("serviceWorker"in navigator&&location.protocol.startsWith("http"))navigator.serviceWorker.register("sw.js").catch(()=>{});
// Dil dəyişəndə yenidən çək
$("language-select").addEventListener("change",fillPages);
applyI18n();fillPages();
