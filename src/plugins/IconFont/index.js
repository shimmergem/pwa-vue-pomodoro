import IconFont from './IconFont.vue'

const cache = new Set()

const InconFontPlugin = {
  install(Vue, options) {
    const scriptUrl = formatScriptUrl(options)
    if (scriptUrl && !cache.has(scriptUrl)) {
      let script = document.createElement('script');
      script.setAttribute('src', scriptUrl);
      script.setAttribute('data-namespace', scriptUrl);
      cache.add(scriptUrl);
      document.body.appendChild(script);
      Vue.component(IconFont.name, IconFont)
    }
  }
}

const formatScriptUrl = ({scriptUrl=''}) => {
  if (scriptUrl.indexOf('https:') === 0) return scriptUrl
  if (scriptUrl.indexOf('//') === 0) return `https:${scriptUrl}`
  return ''
}

export default InconFontPlugin