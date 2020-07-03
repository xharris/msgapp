run:
	make -B android

android:
	npx react-native run-android

clean:
	cd android && gradlew.bat clean

firestore_local:
	firebase emulators:start --only firestore