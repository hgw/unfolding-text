import $ from 'jquery';

require('jquery.easing');

/**
 * todo: 要 リファクタリング
 * 6:4 比率に固定
 *
 */
export default class EntranceSlide {

  /**
   *
   */
  constructor() {
    this._$elBtn = $(".js-entrance-view .js-enter");
    this.$el = $('#entrance');
    this.$el.show();

    this._$elBtn.on('click', (e)=> {
      this._$elBtn.off('click');
      this.$el.delay(250).fadeOut(300, ()=> {
        setTimeout(()=> {
          $(this).trigger('complete');
        }, 700, 'easeOutQuart');
      });

      e.preventDefault();
      return false;
    });
  }


}

