// GA4 속성 contextvoca-web(555732607). 측정 ID는 페이지 HTML에 그대로 노출되는 공개 값이다.
export const GA4_MEASUREMENT_ID = "G-84VJ7FSZTZ";

// 관제탑 측정(measure.js)과 같은 기준으로 구글 공식 비활성 플래그(window['ga-disable-<ID>'])를 켠다.
// measure.js는 afterInteractive로 늦게 쿠키를 쓰므로 첫 방문의 ?analytics= 값도 여기서 직접 읽는다.
export function ga4InitScript(id: string) {
  return `(function(){var c=document.cookie,q=new URLSearchParams(location.search).get("analytics"),has=function(n){return new RegExp("(?:^|;\\\\s*)"+n+"=1(?:;|$)").test(c)};
window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments);};
window["ga-disable-${id}"]=q==="off"||q==="internal"||has("orbit_off")||(has("orbit_internal")&&q!=="external")||navigator.doNotTrack==="1"||navigator.globalPrivacyControl===true;
window.gtag("js",new Date());window.gtag("config","${id}");})();`;
}
