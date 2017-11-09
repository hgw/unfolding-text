/**
 * メニュー (パソコン版) の挙動
 */
export default class MenuSpBehavior {

  constructor($el_, $btn_) {
    this._$el = $el_;
    this._$btnOpen = $btn_;
    this._$btnClose = $(this._$el.find('.js-sp-menu-button--close'));
  }

  sleep() {
    this._removeEvents();
    this._$el.removeClass('active').removeAttr('style');
  }

  resume() {
    this._$el.hide();
    this._$btnOpen.show(); // CSS でつけても良いかも？
    this._removeEvents();
    this._addEvents();
  }


  _removeEvents() {
  }


  _addEvents() {
    // 念のためイベント削除
    this._removeEvents();


    // スマホ用のボタンを表示
    this._$btnOpen.on('click', ()=> {
      this._doOpenMenu();
    });

    this._$btnClose.on('click', ()=> {
      this._doCloseMenu();
    });
  }

  _doOpenMenu() {
    this._$el.addClass('active');
    this._$el.fadeIn(300, 'easeOutQuart');
  }

  _doCloseMenu() {
    this._$el.removeClass('active');
    this._$el.fadeOut(300, 'easeOutQuart');
  }
}
