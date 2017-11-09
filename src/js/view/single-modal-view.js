import $ from 'jquery';
import ElementResize from './element-resize-executer';
import HgwCarousel from './slideshow/hgw-carousel';
import HgwCover from './slideshow/hgw-cover';
import AutoHideBehavior from './menu/auto-hide-behavior';
import BleackpointCheck from '../hgw/utils/breakpoint-check';


/**
 * todo: 要リファクタリング
 * todo: url に #product のハッシュを残して初期化できるようにしたほうがいいかも？
 * todo: Esc で Close するようにしたい
 */
export default class SingleModalView {

  /**
   *
   */
  constructor(trigger) {

    this._animation = {
      easing: 'easeOutQuart',
      duration: 750
    };


    this._cacheScrollTop = 0;
    this.$body = $('body');
    this._$trigger = $(trigger);
    this._$modal = $(this._$trigger.attr('href'));
    this._$close = $(this._$modal.find('.js-modal-close'));
    this._$modalCarousel = $(this._$modal.find('.hgw-carousel'));

    console.log('SingleModalView.Init ------');
    console.log('trigger is ', this._$trigger);
    console.log('modal is   ', this._$modal);
    console.log('close is   ', this._$close);

    this._autoHideCloseButton = new AutoHideBehavior(this._$close);

    this._$modalCarousel.hide();
    this._init();
  }

  /**
   *
   * @private
   */
  _init() {
    this._addEvents();
  }


  /**
   *
   * @private
   */
  _addEvents() {
    this._$trigger.on('click.SingleModalView', (e)=> {
      this.open();
      e.preventDefault();
      return false;
    });
  }


  /**
   * モーダルを開く
   */
  open() {
    // アーティスティックリサーチの Carousel はまず隠す
    this._$modalCarousel.hide();
    this._$modal.addClass('active');
    this._$modal.fadeIn({
      duration: this._animation.duration,
      easing: this._animation.easing,
      complete: ()=> {

        // 下のレイヤーを固定
        this._cacheScrollTop = $(window).scrollTop();
        console.log('スクロール位置を記録', this._cacheScrollTop);
        this.$body.addClass('js-modal-active');


        this._startCarousel();
      }
    });

    this._$close.on('click.ModalView', (e)=> {
      this._$close.off('click.ModalView');
      this.close();
      e.preventDefault();
      return false;
    });


  }


  /**
   *
   * @private
   */
  _startCarousel() {


    if (this._$modalCarousel.length >= 1) {

      if (BleackpointCheck.check() !== 'smartphone') {
        this._autoHideCloseButton.resume();
      }

      this._slides = [];
      for (let i = 0; i < this._$modalCarousel.length; i += 1) {
        this._slides.push(
          new HgwCarousel({
            $el: $(this._$modalCarousel[i]),
            autoplay: true,
            autoplayTimeout: 4250,
            autoplayDuration: 50,
            easing: this._animation.easing,
            complete: ()=> {
              this.close();
            }
          })
        );
      }
    }
  }


  /**
   *
   */
  close() {
    this._autoHideCloseButton.stop();

    if (this._slides) {
      for (let i = 0; i < this._slides.length; i += 1) {
        let hgwc = this._slides[i];
        hgwc.destroy();
      }
      this._slides = null;
    }


    this._$modal.stop().fadeOut({
      duration: this._animation.duration,
      easing: this._animation.easing,
      complete: ()=> {
        this._$modal.removeClass('active');
      }
    });

    this.$body.removeClass('js-modal-active');
    $('html,body').animate({scrollTop: this._cacheScrollTop}, 0);
    console.log('スクロール位置を復旧', this._cacheScrollTop);

  }
}
