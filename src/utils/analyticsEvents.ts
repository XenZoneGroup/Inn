(window as any)._paq = (window as any)._paq || [];

const initPiwik = () => {
  const _paq = (window as any)._paq;
  const u = "https://analytics.kooth.com/";
  _paq.push(['setTrackerUrl', u+'matomo.php']);
  _paq.push(['setSiteId', '21']);
  var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
  g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
};

const track = (category : string, action : string, name? : string, value? : string | number) => {
  const _paq = (window as any)._paq;
  _paq.push(['trackEvent', category, action, name, value]);
};

const impress = (location : string, previousLocation? : string) => {
  const _paq = (window as any)._paq;

  _paq.push(['deleteCustomVariables', 'page']);
  _paq.push(['setCustomUrl', location]);
  _paq.push(['setDocumentTitle', document.title]);
  if (previousLocation) { _paq.push(['setReferrerUrl', previousLocation]); }
  _paq.push(['trackPageView']);
};

export {
  track,
  impress,
  initPiwik
}
