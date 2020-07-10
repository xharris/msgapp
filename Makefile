run:
	npm run android

android:
	npx react-native run-android

emulator:
	powershell -command '& "$${env:LOCALAPPDATA}\Android\Sdk\emulator\emulator.exe" -avd PIXEL_2_API_30'

clean:
	cd android && gradlew.bat clean

firestore_local:
	firebase emulators:start --only firestore