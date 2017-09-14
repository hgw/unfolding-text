/**
 *
 * Tlp
 * tpl 形式のデータをパースして表示する
 */
export default class TlpModel {

  /**
   *
   */
  constructor(json) {
    this.data = json;
    this._totalChildren = 0;

    this._setIDs(this.data, "");

  }

  /**
   * オブジェクトに id をふる
   * @param target_
   * @param level_
   * @private
   */
  _setIDs(target_, level_) {



    for (var i = 0; i < target_.length; i += 1) {
      let current = target_[i];
      let currentLevel = level_ + "" + i;
      current["id"] = currentLevel;


      // 子要素があれば ID を遡って付与
      if(current.children){
        this._totalChildren += 1;
        this._setIDs(current.children, currentLevel + "-");
      }
    }
  }

  totalChildren(){
    return this._totalChildren;
  }
}

