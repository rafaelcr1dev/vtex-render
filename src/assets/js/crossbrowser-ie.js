import pkg from '../../../package.json';

const CrossBrowserIe = function(){

  var state = {};

  function insertScript (src) {

    var t = document.createElement("script");

    t.type = "text/javascript", t.async = !0, t.charset = "UTF-8", t.src = src;

    document.head.appendChild(t);

    return null;

  }

  function insertStyle (href) {

    var t = document.createElement("link");

    t.type = "text/css", t.async = !0, t.rel = "stylesheet", t.href = href;

    document.head.appendChild(t);

    return null;

  }

  function isIE () {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1 || myNav.indexOf('trident/') != -1) ? parseInt(myNav.split('msie')[1] || 99) : false;
  }

  state.init = function(){
    var IE = isIE ();

    if (IE) {
      setTimeout(function(){
        document.querySelector('body').innerHTML = '<center>Desculpe esse site não está disponível para a versão do seu Browser,<br /> por favor use o <a href="https://www.google.com/chrome">Google Chrome</a>, <a href="https://www.mozilla.org/pt-BR/firefox">Firefox</a> ou <a href=" https://www.microsoft.com/pt-br/edge">Edge</a>.<center>';
      });
      insertStyle('/arquivos/' + pkg.name + '-crossbrowser-ie.min.css');
    }

    // if (IE && IE > 10) {
    //   insertScript('https://cdnjs.cloudflare.com/ajax/libs/es6-shim/0.35.5/es6-shim.min.js');
    //   //insertScript('https://cdnjs.cloudflare.com/ajax/libs/js-polyfills/0.1.42/polyfill.min.js');
    // }
  };

  return state;
};

var cb = CrossBrowserIe();

setTimeout(function(){
  cb.init();    
}, 500)
