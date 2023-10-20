const {JSDOM} = require('jsdom')

function getUrlFromHtml(htmlBody,baseUrl){
    const url = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for(const linkElement of linkElements){
        if(linkElement.href.slice(0,1) === '/'){
            try{
                const tst = new URL(baseUrl+linkElement.href)
                url.push(tst.href)
            }catch(err){
            }
        }else{
            try{
                const tst = new URL(linkElement.href)
                url.push(tst.href)
            }catch(err){
            }
        }
    }
    return url
}

function normalizeUrl(urlstring) {
  const url = new URL(urlstring);
  const hostpath = `${url.hostname}${url.pathname}`
  if (hostpath.length >= 0 & hostpath.slice(-1) === "/") {
    return hostpath.slice(0, -1);
  }
  return hostpath
};

module.exports = {
    normalizeUrl,
    getUrlFromHtml
}
