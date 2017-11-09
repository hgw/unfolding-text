export default class HgwCover {


  /**
   *
   */
  constructor(opt) {

    this._opt = opt;
    this.$el = opt.$el;

    this.$el.css('background-image', 'url(' + this.$el.data('background-image') + ')').fadeIn({
      duration: this._opt.duration,
      easing: this._opt.easing,
      complete: ()=> {
        this._wait();
      }
    });
  }

  _wait() {
    this._timeout = setTimeout(()=> {
      this._fadeOut();
    }, this._opt.timeout);
  }

  _fadeOut() {
    this.$el.fadeOut({
      duration: this._opt.duration,
      easing: this._opt.easing,
      start: ()=> {
        this._opt.fadeOutStart && this._opt.fadeOutStart();
      },
      complete: ()=> {
        this._opt.fadeOutComplete && this._opt.fadeOutComplete();
      }
    });
  }


  /**
   *
   */
  /**
   *
   */
  destroy() {
    if (this.$el) {
      this.$el.stop().hide();
      this.$el = null;
    }
    this._opt = null;
    clearInterval(this._timeout);
  }

}
