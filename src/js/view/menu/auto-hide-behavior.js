export default class AutoHideBehavior {


  /**
   *
   */
  constructor($el) {
    this._$body = $('body');
    this._$window = $(window);
    this._$el = $el;
    this._intervalId = 0;
    this._isShow = true;
    this._id = new Date().time;
  }


  /**
   *
   */
  stop() {
    this._$window.off(`mousemove.AutoHideBehavior--${this._id}`);
    this._show();
    clearTimeout(this._intervalId);
  }


  /**
   *
   */
  resume() {
    this._$window.on(`mousemove.AutoHideBehavior--${this._id}`, ()=> {
      clearInterval(this._intervalId);
      if (!this._isShow) {
        this._show();
      }
      this._check();
    });
    this._check();
  }

  _check() {
    this._intervalId = setTimeout(()=> {
      this._hide();
    }, 2000);
  }


  /**
   *
   * @private
   */
  _hide() {
    this._isShow = false;
    this._$el.stop().fadeOut(300, 'easeOutQuart');

  }


  /**
   *
   * @private
   */
  _show() {
    this._isShow = true;
    this._$el.stop().fadeIn(300, 'easeOutQuart');
  }

}
