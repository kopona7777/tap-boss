# Босс-тапалка (TapBoss)

Оффлайн-игра для Android: тапаешь по боссу, отнимаешь HP, убиваешь — получаешь награду.

## Сборка
Actions -> Build APK -> скачать артефакт `tap-boss-apk` -> установить на телефон.

## Структура
- `android/app/src/main/assets/index.html` — вся игра (HTML/CSS/JS, без зависимостей)
- `android/app/src/main/java/com/tapboss/app/MainActivity.java` — WebView-обёртка
- `.github/workflows/build-apk.yml` — сборка APK
