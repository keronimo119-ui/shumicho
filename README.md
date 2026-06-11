# 趣味帳 - 推し活図鑑・なんでも番付・俳句手帳

「あなたの好き」をしまう帳面アプリ(Android / Capacitor)。

- 📚 **マイ図鑑** — 写真とメモでなんでもコレクション図鑑化。コンプ率表示つき
- 🏆 **なんでも番付** — 大相撲番付風ランキングを縦書き画像で生成・シェア
- 🖌️ **俳句・川柳手帳** — 今日の季語(約120語収録)と一日一句、縦書き清書画像

データはすべて端末内(IndexedDB)。サーバー・会員登録なし。収益はAdMobバナー(下部1本)のみ。

## 構成

| パス | 内容 |
|---|---|
| `www/index.html` | アプリ本体(単一HTML SPA) |
| `android/` | Capacitorが生成したAndroidプロジェクト |
| `assets/` | アイコン原版(1024px) |
| `docs/` | ストア掲載情報・プライバシーポリシー・リリース手順 |

## 開発

```powershell
npm install
npx cap sync android
$env:JAVA_HOME='C:\Program Files\Android\Android Studio\jbr'
cd android; .\gradlew.bat assembleDebug
```

リリース手順は [docs/RELEASE.md](docs/RELEASE.md) 参照。
