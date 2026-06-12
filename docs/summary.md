# 趣味帳(Shumicho) 引き継ぎ書

最終更新: 2026-06-12 / 作成PC: s-mini2（06-12にs-sigpcでも環境構築済み）

---

## 1. 最終目的

**AdMobバナー広告による収益**。BISUKE・手値(Tene)に続く3つ目の収益アプリとして、
製品版公開→長期的に安定収益を得るのがゴール。広告は邪魔にならないことが絶対条件。

- 戦略: 「個人データで楽しむ器」型 = アプリは著作物を持たず、ユーザーが自分の記録で楽しむ
- ターゲット: 推し活層・コレクター・俳句愛好層(毎日開く習慣 = バナー表示回数の最大化)
- 費用ゼロ運用: サーバーなし・外部API なし・完全オフライン

## 2. アプリ概要

**趣味帳 - 推し活図鑑・なんでも番付・俳句手帳**(io.github.keronimo119ui.shumicho)

| 機能 | 内容 |
|---|---|
| 📚 マイ図鑑 | 写真+メモのコレクション帳。目標数→コンプ率バー。未入手リスト兼用 |
| 📖 軌跡(図鑑の中) | デコページ: 写真ステッカー/ピンチ拡縮回転/角丸・丸・星切抜/白背景透過/テキスト/手描きペン/2色グラデ背景+書き込み枠(日記/格言・名言/プロフィール/歌詞/分析/想い・コメント・感謝/妄想/エピソード/自由メモ) |
| 🏆 なんでも番付 | 大相撲番付風の縦書き画像生成・共有 |
| 🖌️ 俳句手帳 | 今日の季語(月別120語内蔵)・一日一句・写真背景の清書画像(フォト俳句)・カメラ連動 |
| 📅 趣味ごよみ | 全機能連動カレンダー(記録ごとに載せる/載せない選択)。祝日対応(春分秋分近似式・ハッピーマンデー・振替・国民の休日)。日付タップ→**完成手帳プレビュー**(コレクター向けの肝機能) |
| その他 | タブ並び順カスタム/ダークモード/バックアップ書き出し・読み込み/俳号設定 |

本体は `www/index.html` の単一HTML SPA(約2900行)。データはIndexedDB(DB名shumicho v2、
stores: books/items/banzuke/haiku/deco)。Capacitor 8 + @capacitor-community/admob 8。

## 3. ユーザー(発注者)の重要方針 ※必ず守る

1. **UI内で「推し」という言葉を使わない**(受け付けない人がいるため)。宣伝文句(ストア説明文)ではOK
2. **広告はバナー1本のみ・邪魔にならないこと最優先**。モーダル(入力画面)中は自動非表示→閉じたら復帰(hideBanner/resumeBanner)。「ホームだけ表示」案は収益減のため不採用と説明済み(バナーは表示中30-60秒ごとにリフレッシュ収益が発生する)
3. 軌跡(デコ)編集中は**ステージが上部固定(sticky)**でツールだけスクロール(画像を見ながら編集)
4. ペンの「戻る(アンドゥ)」は不要とユーザー判断済み
5. 俳句の季節は期間表記つき: 春(2/4〜5/5)/夏(5/6〜8/7)/秋(8/8〜11/6)/冬(11/7〜2/3)/新年
6. 全表示日本語(セッション名・ファイル名等も)

## 4. 現在の状態(2026-06-11時点)

- 実装・実機(XQ-CC44)確認すべて完了。GitHub mainに全コミット済み
- **署名済みAAB作成実績あり**: `android\app\build\outputs\bundle\release\app-release.aab`(v1.0.0 / versionCode 1)
  ※ただしその後の大型アップデートが入ったので、**提出前に再ビルド推奨**
- **AdMobは全部テストID**のまま(Manifest=サンプルアプリID / index.html=サンプルバナー / isTesting:true)
- Play Console未登録(アプリ未作成)
- プライバシーポリシー公開済み: https://keronimo119-ui.github.io/shumicho-privacy.html

## 5. 今後の作業予定

### 短期(出品まで)
1. ユーザーの実機確認→フィードバック反映
2. AdMobコンソールで「趣味帳」アプリ+バナーユニット発行(ユーザー作業)
3. 本番ID差し替え(手順は docs/RELEASE.md の1節) → versionCode 2 → bundleRelease
4. Play Consoleにアプリ作成→クローズドテストへAABアップロード
   (掲載文=docs/store-listing.md、データセーフティ=docs/data-safety.md、画像=docs/play-icon-512.png, feature-graphic-1024x500.png)
5. ストア用スクリーンショット撮影(本番ID化後。テスト広告が写らない状態で)

### 次回の大物: カレンダーウィジェット(ユーザー指定・仕様は次回詰める)
- ホーム画面ウィジェット(Java AppWidget+RemoteViews。WebViewからは@capacitor/preferencesでSharedPreferencesに書いて連携)
- **背景に好きな画像をセット可能**
- **図鑑・番付・俳句との連動を選択式**: 連動なし / 3つとも連動 / 選択したもののみ連動
- BISUKEの wip/widget-plus-button ブランチに類似実装の経験あり

### 提案済み・採否待ちのアイデア
- 手帳プレビューの画像書き出し(SNSシェア) ←推奨
- 俳句の連続記録バッジ(○日連続) ←推奨
- 図鑑「未入手だけ表示」フィルタ / 図鑑表紙写真 / 図鑑写真を軌跡のステッカーに呼び出す
- 番付の2色カラー連動 / 月場所アーカイブ(番付史)
- 記念日カウントダウン / 年間句集書き出し

## 6. 別PCでのセットアップ手順

**s-sigpc は 2026-06-12 にセットアップ完了**: clone先 `C:\Users\s-sigpc\Desktop\AI\shumicho`、
npm install・local.properties作成・デバッグビルド・実機(XQ-CC44, ワイヤレスadb)へのインストール起動まで確認済み。
※実機の旧版(s-mini2署名)は署名不一致のためユーザー了承の上アンインストールして入れ替えた(テストデータは消去済み)。
リリースビルドのみ署名鍵の持参が必要(下記)。

```powershell
git clone https://github.com/keronimo119-ui/shumicho.git
cd shumicho
npm install
npx cap sync android
# android/local.properties を作成(そのPCのSDKパスに合わせる):
#   sdk.dir=C:\\Users\\<ユーザー名>\\AppData\\Local\\Android\\Sdk
# デバッグビルド:
$env:JAVA_HOME='C:\Program Files\Android\Android Studio\jbr'  # そのPCのJDKパス
cd android; .\gradlew.bat assembleDebug
```

**リリースビルドに必要な持ち物(リポジトリに入っていない・意図的)**:
1. 署名鍵 `shumicho-release.jks`(s-mini2では `C:\Users\s-mini2\` 直下) — USB等で持参
2. `android/keystore.properties` — 中にストア/鍵パスワード記載(s-mini2の同ファイル参照、または下記で再作成)
   ```
   storeFile=C:/Users/<ユーザー名>/shumicho-release.jks
   storePassword=<パスワード>
   keyAlias=shumicho
   keyPassword=<パスワード>
   ```
   パスワードはパスワードマネージャ保管(ストア/鍵同一・20文字英数字)。鍵SHA1=CB:C0:2F:9E:3B:48:71:C7:CE:7F:1E:D9:4F:CD:6C:E6:5C:8D:01:77

## 7. 経緯ダイジェスト

- 2026-06-12: **軌跡の重大バグ修正**(ユーザー実機報告「文字が打てない・背景が選べない」)。
  原因=sticky固定ステージ(z-index30)が下の操作パネルを覆いタップを吸っていた。
  対策=パネルを開いている間はステージを52%幅に縮小表示(`#deco-stage-wrap.compact`、`decoUpdateCompact()`)。
  あわせてユーザー要望の**「✅決定/✏️編集」ボタン**を追加: 決定でレイアウト固定(タップ・ドラッグ無効、
  touch-action:pan-yでスクロール可、編集系ボタン非表示=`.edit-only`)。固定状態はページごとに保存(`decoObj.locked`)。
  実機(CDP)で 文字入力反映・背景色変更・固定/解除・永続化 まで検証済み。
- 2026-06-12: **文字編集の操作感改善**(ユーザー報告「キーボードで入力欄が押し上げられ画像の裏に隠れる」)。
  ①文字入力欄(`#deco-text-row`)を sticky の `#deco-stage-wrap` 内・ステージ直下へ移動=キーボードが出ても
  画像と入力欄が常にセットで見える ②「🅰️文字」で即フォーカス+全選択(すぐ打ち替え可、初期文字は「文字」)
  ③AndroidManifestに `android:windowSoftInputMode="adjustResize"` を明示(画面を縮める方式に固定)。
- 2026-06-12: **手帳プレビューに観覧モード追加**(ユーザー要望「完成手帳をパラパラめくって眺めたい」)。
  「◀前の記録日/次の記録日▶」ボタン+左右スワイプで、記録のある日だけを順にめくれる(`diaryMove`/`diaryInitSwipe`)。
  位置表示「n/全ページ」、端で停止、めくると後ろのカレンダー選択日も追従。実機検証済み。
- 検証ツール: `tools/cdp.mjs`(デバッグビルドのWebViewへChrome DevTools Protocolで接続しJS実行。
  使い方: adb forward tcp:9222 localabstract:webview_devtools_remote_<pid> → `node tools/cdp.mjs "<JS式>"`)

- 2026-06-11: 企画決定(ユーザー要望「毎日開く・審査安全・個人出品の強み・ライバルが出にくい・斬新」→俳句手帳+マイ図鑑+マイ番付の3機能合体で「趣味帳」)→実装→署名済みAAB→GitHub登録→実機検証
- 同日: 広告がモーダルの保存ボタンに重なる問題→モーダル中自動非表示で解決
- 同日: 大型アップデート(デコ帳・趣味ごよみ・タブ並び替え・俳句写真)
- 同日: デコ帳→「軌跡」改名・「推し」中立化・2色背景・書き込み枠・sticky・手帳プレビュー

## 8. 関連リポジトリ・URL

| 用途 | URL |
|---|---|
| 本体(Private) | https://github.com/keronimo119-ui/shumicho |
| ポリシー公開(Public Pages) | https://github.com/keronimo119-ui/keronimo119-ui.github.io |
| Play Console | https://play.google.com/console/u/0/developers/6635198125421268304/ (デベロッパーID: 6635198125421268304) |
| AdMob | https://apps.admob.com (アカウント: pub-5082973443766226) |
