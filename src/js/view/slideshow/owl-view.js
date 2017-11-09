/**
 *
 */
export default class OwlView {

  /**
   *
   * @param collection_
   */
  constructor(collection_) {
    this._collection = collection_;
    this._$wrapper = $('.js-slide-box');
    this._$el = $('.js-slide');
    this._inited = false;
    this._totalItems = 0;
    this._owlOptions = {
      center: true,
      touchDrag: true,
      items: 1,
      nav: false,
      navRewind: false,
      smartSpeed: 500,
      dots: false,
      onChanged: this._onChanged
    };

    // スライドショーの準備
    let collection = this._collection.getCollection();
    for (let i = 0; i < collection.length; i += 1) {
      for (let j = 0; j < collection[i].images.length; j += 1) {
        let src_ = collection[i].images[j];
        this._$el.append(this._makeHtmlNode(src_));
      }
    }

    this.owl = this._$el.owlCarousel(this._owlOptions);
    this._$wrapper.hide();
  }


  /**
   * 初期化
   *
   * @param src_
   * @private
   */
  _init() {
    // this.owl.on('change.owl.carousel', (e)=> {
    //   this._totalItems = e.item.count;
    // });
    this._$el.addClass('active');
    this._$wrapper.fadeIn(1000, 'easeOutQuart').addClass('active');
    this._inited = true;
  }


  /**
   * スライド HTML 要素を作成
   * @param src_
   * @returns {string}
   * @private
   */
  _makeHtmlNode(src_) {
    return '<div class="js-owl-item-box"><div class="js-owl-item-box__fitbox"><div class="js-owl-item-box__table"><div class="js-owl-item-box__table-cell"><img src="/local-products/assets/img/no-image.jpg" data-src="' + src_ + '"></div></div></div></div>';
  }


  /**
   *
   * @param src_
   * @param position_
   */
  show(index) {

    if (this._inited == false) {
      this._init();
    }

    // 写真を差し替える
    // todo: lazy でロードしたい
    let img = this._$el.find('.js-owl-item-box img')[index];
    let src = $(img).data('src');
    $(img).attr('src', src);
  }


  /**
   *
   * @param position_
   */
  active(index) {
    this.owl.trigger('to.owl.carousel', index);
  }
}


