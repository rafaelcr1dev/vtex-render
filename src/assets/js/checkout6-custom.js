(function ($, window) {
  var $win = $(window);

  function checkout() {
    return {
      cart: function () {
        return {
          hasButtonCloseOrder: function () {
            return $('.body-cart .cart-template a#cart-to-orderform').length;
          },
          hasChekoutActions: function () {
            return $('.body-cart .cart-template div.checkout-actions').length;
          },
          addActionsButtons: function () {
            if (!this.hasButtonCloseOrder() || this.hasChekoutActions()) return;

            $('.body-cart .cart-template .cart-totalizers .coupon-column + div').append(
              '<div class="checkout-actions"><a class="btn-custom-cart-to-orderform" href="/checkout#/orderform">Continuar</a><a class="custom-cart-choose-more-products" href="/checkout#/orderform">Comprar mais produtos</a></div>'
            );
          },
          leaveOpenBlockPostalCodeAndVoucher: function () {
            $('.body-cart #shipping-calculate-link').click();
            $('.body-cart .link-coupon-add').click();
          },
          init: function () {
            var _this = this;

            setTimeout(function () {
              _this.addActionsButtons();
              _this.leaveOpenBlockPostalCodeAndVoucher();
            });
          },
        };
      },
    };
  }

  $win.load(function () {
    checkout().cart().init();

    $win.on('orderFormUpdated.vtex', function () {
      checkout().cart().init();
    });
  });

  $win.on('hashchange', function () {
    checkout().cart().init();
  });
})(jQuery, window);
