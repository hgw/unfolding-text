import '../hgw/extends/array'; // includes が使えるように拡張

/**
 *
 *
 */
export default class AppRouter {

  /**
   *
   */
  constructor() {
    this._prefix = '#child-tlp-';
  }


  /**
   *
   * @param hash
   * @returns {Array}
   */
  restoreIdsFromHash() {
    let hash = window.location.hash.replace('#', '');
    if (hash === '') {
      return [];
    }

    hash = this._stringNormalization(hash);
    // hash = this._toFullString(hash);
    let array = hash.split(',');
    let hashList = [];
    for (let i = 0; i < array.length; i += 1) {
      hashList.push(this._prefix + array[i]);
    }
    return hashList;
  }


  /**
   *
   * @param id
   */
  add(id) {
    let ids = this.restoreIdsFromHash();
    ids.push(id);
    ids.sort();

    let array = [];
    for (let i = 0; i < ids.length; i += 1) {
      let id = ids[i].replace(this._prefix, '');
      array.push(id);
    }
    // window.location.hash = this._toTinyString(array.join());
    window.location.hash = array.join();
  }

  /**
   *
   * @param id
   */
  remove(id) {
    let ids = this.restoreIdsFromHash();
    for (let i = 0; i < ids.length; i += 1) {
      if (id === ids[i]) {
        console.log(id + 'を削除します');
        ids.splice(i, 1);
      }
    }
    let array = [];
    for (let i = 0; i < ids.length; i += 1) {
      let id = ids[i].replace(this._prefix, '');
      array.push(id);
    }
    // window.location.hash = this._toTinyString(array.join());
    window.location.hash = array.join();
  }



  /**
   * (使用停止) 折りたたみ処理をいれると内部の状態を保持できないので使用停止
   * @param fullStr
   * @returns {string}
   * @private
   */
  _toTinyString(fullStr) {

    let result = [];
    let list = fullStr.split(',').sort();

    for (let i = 0; i < list.length; i += 1) {
      let id = list[i];
      let lastId = "";
      if (result.length > 0) {
        lastId = result[result.length - 1];
        if (id.indexOf(lastId) > -1) {
          result.pop();
        }
      }
      result.push(id);
    }
    return result.join();
  }



  /**
   * (使用停止) 折りたたみ処理をいれると内部の状態を保持できないので使用停止
   * @param tinyStr
   * @returns {string}
   * @private
   */
  _toFullString(tinyStr) {

    let list = tinyStr.split(',').sort();
    let result = [];

    for (let i = 0; i < list.length; i += 1) {
      let $currentBranch = list[i];
      let $currentBranchArray = $currentBranch.split('-');

      let str = '';
      for (let j = 0; j <= $currentBranchArray.length - 1; j += 1) {
        str += $currentBranchArray[j];

        if (result.includes(str) === false && str !== "") {
          result.push(str);
        }

        if (j !== $currentBranchArray.length) {
          str += '-';
        }
      }
    }

    return result.join();
  }

  _stringNormalization(str) {
    return str.replace(/[^0-9\-\,]/g, '');
  }

}
