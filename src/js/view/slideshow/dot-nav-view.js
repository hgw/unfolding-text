/**
 *
 */
export default class DotNavView {

  /**
   *
   * @param collection_
   */
  constructor(collection_) {
    this._collection = collection_;
    this._$el = $('.js-slide-nav');

    this._inited = false;
    this._$el.hide();

    // make dots
    this._makeDots();
  }


  /**
   *
   * @private
   */
  _makeDots() {
    let html = '';
    for (let i = 0; i < this._collection.getCollection().length; i += 1) {
      html += '<li><a href="#" id="js-slide-nav--id-' + i + '" data-index="' + i + '" class="js-slide-nav__link"><span class="js-slide-nav__icon"></span></a></li>';
    }

    this._$el.append(html);

    // スライドショー下のボタンをクリックすると
    // 該当の画像へスライドが移動するようイベント追加
    let $btns = $(this._$el.find('.js-slide-nav__link'));
    $btns.on('click', (e)=> {
      let index = Number($(e.currentTarget).data('index'));
      let myData = this._collection.getCollection()[index];
      $(this).trigger('selected', myData);

      e.preventDefault();
      return false;
    });
  }


  /**
   *
   * @private
   */
  _init() {
    this._$el.addClass('active');
    this._$el.show();
    this._inited = true;
  }


  /**
   * 色濃くさせる
   */
  show(index) {
    if (!this._inited) {
      this._init();
    }

    let $hit = $(this._$el.find('.js-slide-nav__icon')[index]);
    $hit.addClass('show');
  }

  // 点滅させる
  active(index) {
    let $icons = $(this._$el.find('.js-slide-nav__icon'));
    $icons.removeClass('active');
    $($icons[index]).addClass('active');
  }

}

