# Build APK Instructions

Due to disk space limitations in this environment, the Android APK cannot be built directly here. However, all necessary files have been prepared. Follow these steps on your local machine with sufficient disk space (at least 2GB free):

## Prerequisites
- Node.js 18+ installed
- Android Studio with Android SDK installed
- Java JDK 17+
- At least 2GB free disk space

## Step-by-Step Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/pavanvzm/Free-Podcast-Maker-.git
cd Free-Podcast-Maker-
```

### 2. Install Dependencies
```bash
npm install
npm install --save-dev @capacitor/core @capacitor/cli @capacitor/android
```

### 3. Initialize Capacitor (if not already done)
```bash
npx cap init "DeepDive AI Podcast" com.deepdive.podcast --web-dir dist
```

### 4. Build the Web App
```bash
npm run build
```

### 5. Add Android Platform
```bash
npx cap add android
```

### 6. Sync and Build APK
```bash
npx cap sync android
cd android
./gradlew assembleDebug
```

### 7. Locate Your APK
The APK will be generated at:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

### 8. Install on Your Device
Transfer the APK to your Android device and install it, or use ADB:
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

## Alternative: Build Release APK (for distribution)

### Generate Keystore (first time only)
```bash
keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-alias
```

### Update `android/app/build.gradle`
Add signing configuration:
```gradle
android {
    ...
    signingConfigs {
        release {
            storeFile file("my-release-key.jks")
            storePassword "your-store-password"
            keyAlias "my-alias"
            keyPassword "your-key-password"
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

### Build Release APK
```bash
./gradlew assembleRelease
```

The release APK will be at:
```
android/app/build/outputs/apk/release/app-release.apk
```

## Troubleshooting

### "No space left on device"
- Clean Gradle cache: `./gradlew clean`
- Remove unused Android SDK components via Android Studio SDK Manager
- Ensure at least 2GB free space

### "SDK location not found"
- Create `android/local.properties` with:
  ```
  sdk.dir=/path/to/your/Android/Sdk
  ```

### Build fails with Java errors
- Ensure JAVA_HOME is set correctly
- Use Java 17: `export JAVA_HOME=/usr/lib/jvm/java-17-openjdk`

## Quick Test Without Building APK

For quick testing without building an APK, you can use Capacitor's live reload:

```bash
npm run dev
# In another terminal
npx cap run android -l --external
```

This will deploy the app to a connected device/emulator with live reloading.
