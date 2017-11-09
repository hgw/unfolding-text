/**
 * メニュー (パソコン版) の挙動
 */
export default class MenuPCBehavior {

  constructor($el_, $btn_) {
    this._$el = $el_;
    this._$btnOpen = $btn_;
  }

  sleep() {
    this._removeEvents();
    this._$el.removeClass('active').removeAttr('style');
  }

  resume() {
    this._$btnOpen.hide(); // CSS で消しても良いかも？
    this._removeEvents();
    this._addEvents();
  }


  _removeEvents() {
    this._$el.off('mouseenter.ExternalMenu');
    this._$el.off('mouseleave.ExternalMenu');
  }


  _addEvents() {
    this._removeEvents();

    this._$el.on('mouseenter.ExternalMenu', (e)=> {
      this._show();
    });

    this._$el.on('mouseleave.ExternalMenu', (e)=> {
      this._hide();
    });
    this._hide();
  }

  _hide() {
    this._$el.removeClass('active');
    let sizeHideBar = 9; //隠れている時のサイズ
    let disabledTopPosition = -(this._$el.height() - sizeHideBar);
    this._$el.css('top', disabledTopPosition);
  }

  _show() {
    this._$el.addClass('active').css('top', 0);
  }
}
