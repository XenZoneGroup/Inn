(window as any)._paq = (window as any)._paq || [];

const initPiwik = () => {
  /* disabled for dummy codebase */
};

const track = (
  category: string,
  action: string,
  name?: string,
  value?: string | number
) => {
  const _paq = (window as any)._paq;
  console.log(`DUMMY TRACKING EVENT: ${category} ${action} ${name} ${value}`);
  _paq.push(['trackEvent', category, action, name, value]);
};

const impress = (location: string, previousLocation?: string) => {
  const _paq = (window as any)._paq;
  console.log(
    `DUMMY NAVIGATION TRACKING: to: ${location} from: ${previousLocation}`
  );

  _paq.push(['deleteCustomVariables', 'page']);
  _paq.push(['setCustomUrl', location]);
  _paq.push(['setDocumentTitle', document.title]);
  if (previousLocation) {
    _paq.push(['setReferrerUrl', previousLocation]);
  }
  _paq.push(['trackPageView']);
};

export { track, impress, initPiwik };
