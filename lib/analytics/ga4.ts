// GA4 속성 contextvoca-web(555732607). 측정 ID는 페이지 HTML에 그대로 노출되는 공개 값이다.
export const GA4_MEASUREMENT_ID = "G-84VJ7FSZTZ";

// 관제탑 측정(measure.js)과 같은 기준으로 구글 공식 비활성 플래그(window['ga-disable-<ID>'])를 켠다.
// measure.js는 afterInteractive로 늦게 쿠키를 쓰므로 첫 방문의 ?analytics= 값도 여기서 직접 읽는다.
export function ga4InitScript(id: string) {
  return `(function(){
var q=typeof location==="undefined"?null:new URLSearchParams(location.search).get("analytics"),c=document.cookie.split(";").map(function(v){return v.trim()}),has=function(n){return c.includes(n+"=1")},fromTower=false;
try{fromTower=new URL(document.referrer).hostname==="growth-control-tower.resonace-zorba.workers.dev"}catch(e){}
var internal=q==="internal"||(q!=="external"&&(has("orbit_internal")||has("fn_internal")||fromTower));
if(internal)document.cookie="orbit_internal=1; Path=/; Max-Age=31536000; SameSite=Lax; Secure";
if(q==="off")document.cookie="orbit_off=1; Path=/; Max-Age=31536000; SameSite=Lax; Secure";
if(q==="external")document.cookie="orbit_internal=; Path=/; Max-Age=0; SameSite=Lax; Secure";
var blocked=internal||q==="off"||has("orbit_off")||has("fn_measurement_off")||has("fn_automation")||c.some(function(v){return v.startsWith("fishing_admin_session=")})||navigator.doNotTrack==="1"||navigator.globalPrivacyControl===true||navigator.webdriver===true||/bot|crawler|spider|headless|playwright|puppeteer|selenium|curl|wget|lighthouse|pagespeed|OrbitControlTower/i.test(navigator.userAgent||"")||(typeof location!=="undefined"&&!!location.hostname&&!["contextvoca.app","www.contextvoca.app"].includes(location.hostname))||(typeof location!=="undefined"&&/(?:^|\\/)(admin|login|auth|account|settings|reset|verify)(?:\\/|$)/i.test(location.pathname||""));
window.__orbitTrafficExcluded=blocked;
window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};
window["ga-disable-${id}"]=true;
if(!blocked){var policy=window.__orbitTrafficPolicy||(window.__orbitTrafficPolicy=fetch("https://growth-control-tower.resonace-zorba.workers.dev/traffic-status",{credentials:"omit",cache:"no-store"}).then(function(r){if(!r.ok)throw new Error("traffic policy unavailable");return r.json()}));policy.then(function(p){if(p.excluded===false){window["ga-disable-${id}"]=false;window.gtag("js",new Date());window.gtag("config","${id}")}else{window.__orbitTrafficExcluded=true;document.cookie="orbit_internal=1; Path=/; Max-Age=31536000; SameSite=Lax; Secure"}}).catch(function(){window.__orbitTrafficExcluded=true})}})();`;
}
