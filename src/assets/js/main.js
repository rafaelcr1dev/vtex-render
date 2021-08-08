// import '@babel/polyfill';

(function (document, window, $) {
  console.log('Version > 0.1.0');

  const $doc = $(document);
  const $win = $(window);

  $doc.ready(function () {
    $('.helperComplement').remove();
  });

  $win.load(function () {});
})(document, window, jQuery);
