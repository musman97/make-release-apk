cd android && gradlew clean && cd .. && npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res && cd android && gradlew assembleRelease -x bundleReleaseJsAndAssets && cd .. && cp android\app\build\outputs\apk\release/app-release.apk %USERPROFILE%\Desktop
