import DotNavView from './dot-nav-view';
import OwlView from './owl-view';
import SlideCollection from './slide-collection';

/**
 *
 */
export default class SlideView {

  constructor() {
    this._collection = null;
    this._$buttons = $('.js-modal-slide--push');
    this._makeCollection();

    // view を作る
    this._dotView = new DotNavView(this._collection);
    this._owlView = new OwlView(this._collection);

    this.addEvents();
  }

  /**
   *
   * @private
   */
  _makeCollection() {
    this._collection = new SlideCollection();

    for (let i = 0; i < this._$buttons.length; i += 1) {
      this._collection.push(this._collection.makeObjectWithButton(this._$buttons[i]));
    }
  }


  /**
   *
   * @param btn
   * @private
   */
  _doClick(btn) {
    let obj = this._collection.getObjectWithButton(btn);

    // 画像の追加
    if (obj.active == false) {
      $(btn).addClass('active');
      this._collection.active(obj.index);
      this._dotView.show(obj.index);
      this._owlView.show(obj.index);
    }

    // 画像の表示
    this._collection.show(obj.index);
    this._owlView.active(obj.index);
    this._dotView.active(obj.index);
  }

  /**
   *
   */
  addEvents() {
    this._$buttons.on('click.SlideView', (e)=> {
      this._doClick(e.target);
      e.preventDefault();
      return false;
    });

    // スライドが移動した
    this._owlView.owl.on('changed.owl.carousel', (e)=> {
      this._dotView.active(e.item.index);
      this._collection.show(e.item.index);
    });

    // スライド下の丸ポチナビがクリックされた
    $(this._dotView).on('selected', (e, obj)=> {
      // todo: 上記と重複するコード
      this._collection.show(obj.index);
      this._owlView.active(obj.index);
      this._dotView.active(obj.index);
    });
  }

}

