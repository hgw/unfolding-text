/**
 *
 */
export default class SlideCollection {

  constructor() {
    this._map = [];
  }

  push(obj) {
    this._map.push(obj);
  }

  /**
   * ボタン要素からスライドに必要なオブジェクトを作成する
   *
   *  @param btn
   * @returns {{$btn: (jQuery|HTMLElement), images: Array, active: boolean, show: boolean}}
   */
  makeObjectWithButton(btn) {
    let $btn = $(btn);
    let imagesArray = [];

    let $images = $($($btn.attr('href')).find('img'));
    for (let i = 0; i < $images.length; i += 1) {
      let $img = $($images[i]);
      imagesArray.push($img.data('src'));
    }

    let obj = {
      $btn: $btn,
      images: imagesArray,
      active: false,
      show: false,
      index: this._map.length
    };

    return obj;
  }

  /**
   * ボタンからモデルを探す
   * @param btn
   */
  getObjectWithButton(btn) {
    let id = $(btn).attr('id');
    for (let i = 0; i < this._map.length; i += 1) {
      let checkId = this._map[i].$btn.attr('id');
      if (checkId == id) {
        return this._map[i];
      }
    }
    return null;
  }

  getCollection() {
    return this._map;
  }

  active(index) {
    this._map[index].active = true;
  }

  show(index) {
    for (let i = 0; i < this._map.length; i += 1) {
      this._map[i].show = false;
    }

    this._map[index].show = true;
  }

  /**
   * スライドに表示するモードになっているオブジェクトの中での順番を返す
   * @param obj
   */
  getSlidePosition(obj) {
    let position = 0;

    for (let i = 0; i < this._map.length; i += 1) {
      let checkTarget = this._map[i];
      if (obj.index == checkTarget.index) {
        break;
      }

      if (checkTarget.active) {
        position += 1;
      }

    }
    return position;
  }

}


