Unfolding Text Format
============

リンクをクリックすることで折りたたまれた文章を開閉できるテキスト形式。

<img src="https://user-images.githubusercontent.com/333662/32610290-ab9b13ba-c5a5-11e7-9c13-0514ba673eff.gif">

## Example

https://store.tsite.jp/local-products/

## Install

1. Repository をチェックアウト
2. `npm install` 
3. モジュールがインストールされたら `npm start` を実行し gulp を走らせる
4. gulp が `watch` 状態の時に `src/text-src/index.yml` を編集する
5. `./dist/` 以下に開閉式の機能をもった html, css, js が生成される 

## ファイル構成

- `./src/` ... ソースディレクトリ
    - `.cache/` ... キャッシュ
    - `handlebars/` ... テンプレートファイル用ディレクトリ
    - `.js/` ... Javascript のソースコード
    - `.scss/` ... sass のソースコード
    - `.text-src/` ... yml 形式の原稿ファイル用ディレクトリ 
- `./dist/` ... 出力ディレクトリ

## 原稿の書き方

原稿は YAML 形式で書かれます。

### 1. 親子関係

以下のように書くことで親子関係を表現できる。

```yaml
body: 
  - text: わたしは
  - text: 東京都
    children:
      - text: 世田谷区
  - text: 出身だ
  
```

この場合の挙動は以下のように、親の「東京都」をクリックすると子供である「世田谷区」が表示される。

「わたしは <u>東京都</u> 出身だ」 👉 「わたしは 東京都 世田谷区 出身だ」

### 2. 入れ子の親子関係

親子関係は無制限に入れ子にすることができる

```yaml
body: 
  - text: まんまるの
  - text: 月
    children:
      - text: の浮かぶ秋の
      - text: 夜
        children:
          - text: の澄んだ空気
  - text: が美しい
```

この場合の挙動は以下のように、「月」と「夜」のそれぞれが子供を持つことになる。

「まんまるの<u>月</u>が美しい」 👉 「まんまるの 月 の浮かぶ秋の<u>夜</u>が美しい」 👉 「まんまるの 月 の浮かぶ秋の 夜 の澄んだ空気が美しい」
 

### 3. クラスの追加

`class` 属性を追加するには以下のように `class:` を利用する

```yaml
body: 
  - text: わたしは
  - text: 東京都
    class: `bold-text`
  - text: 出身だ
```

このようにすると、「東京都」の HTML タグに対して `class="bold-text"` が追加される。

「わたしは __東京都__ 出身だ」

### 4. 子要素を親要素の手前に表示する

親要素をクリックした時に子要素を親の手前に表示したい場合、 `children:` の替わりに `before:` を利用する

```yaml
body: 
  - text: わたしは
  - text: 東京都
    before: 
      - text: 日本の首都、
  - text: 出身だ
```

この場合の挙動は以下のように、親の「東京都」をクリックすると子供である「日本の首都、」が手前に表示される。

「わたしは <u>東京都</u> 出身だ」 👉 「わたしは 日本の首都、 東京都 出身だ」

## 実装済みのものの整理が必要な機能 / 実装予定機能

- html タグ入力
- 画像挿入
- リンク挿入
- 特定の JS スクリプト実行



## Browser support

Unfolding text works on IE11+ in addition to other modern browsers such as Chrome, Firefox, and Safari.

## Dependencies

jQuery 1.7

## License

Copyright (c) 2017 Shunya Hagiwara

Licensed under the MIT license.
