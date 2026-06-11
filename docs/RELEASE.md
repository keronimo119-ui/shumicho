# 趣味帳 リリース手順

## 0. 前提

- このPC(s-mini2)にビルド環境一式あり: JDK21 = `C:\Program Files\Android\Android Studio\jbr`、SDK = `C:\Users\s-mini2\AppData\Local\Android\Sdk`
- 署名鍵: `C:\Users\s-mini2\shumicho-release.jks`(リポジトリ外・gitignore済み)
  - alias: `shumicho` / パスワードはパスワードマネージャ参照
- 署名配線: `android/keystore.properties`(gitignore済み)を build.gradle が読む

## 1. AdMob本番IDへの差し替え(製品版公開の前に)

現在は **Google公式テストID** で動いている。AdMobコンソール(https://apps.admob.com)で
「趣味帳」アプリを新規追加 → バナー広告ユニットを作成し、以下の2か所を差し替える。

1. `android/app/src/main/AndroidManifest.xml`
   - `com.google.android.gms.ads.APPLICATION_ID` の value を本番**アプリID**(`ca-app-pub-xxxx~xxxx`)に
2. `www/index.html` の `initAdMob()` 内
   - `adId` を本番**バナーユニットID**(`ca-app-pub-xxxx/xxxx`)に
   - `initializeForTesting: true` → `false`
   - `isTesting: true` → `false`

差し替え後は必ず `npx cap sync android` を実行(wwwの変更をandroidに反映)。

## 2. バージョン更新

`android/app/build.gradle` の `versionCode`(整数を+1)と `versionName` を更新。

## 3. AABビルド

```powershell
cd C:\Users\s-mini2\Desktop\AI\shumicho
npx cap sync android
$env:JAVA_HOME='C:\Program Files\Android\Android Studio\jbr'
cd android
.\gradlew.bat bundleRelease
```

成果物: `android\app\build\outputs\bundle\release\app-release.aab`

## 4. Play Consoleへアップロード

1. https://play.google.com/console → 趣味帳 → テスト → 内部テスト(またはクローズドテスト)
2. 新しいリリースを作成 → AABをアップロード → リリースノート記入 → 公開
3. 掲載情報は `docs/store-listing.md`、データセーフティは `docs/data-safety.md` を参照

## 5. 公開後のチェック

- 実機で広告バナーが表示されること(本番広告は反映に時間がかかることがある)
- バナーがタブバーの下に出て、タブバーが持ち上がること(--ad-h連動)
