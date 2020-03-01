# D'Evelyn 7th Hour app

Pardon the crappy code

## Getting started:
1. Install the React Native CLI (not the Expo CLI) using these instructions: https://reactnative.dev/docs/getting-started.html#content
2. Clone this repo ```git clone https://github.com/YOUR-USERNAME/DevelynSeventh.git```
3. Run ```npm install``` inside the root directory
4. Use ```react-native run-android``` or ```react-native run-ios``` inn the root directory for android and ios respectively.

## ToDo: 
### Teacher pages:
#### Important: 
- [ ] ***UPDATE ALL OF THE "VIET" TEACHER REFERENCES WITH WHOEVER'S SIGNED IN***
- [x] Fix "submit attendance" button
- [ ] Sort students alphabetically and by class (Reorganize firestore, I can't figure out a way to sort it in the code without checking every student's database entries :weary:)
- [ ] Notify teacher when they set their limit below the current amount of people already signed up
- [ ] Debug
#### Not so important:
- [ ] Seperate search bar into its own teacher component. Currently the Require and FindStudent screens are too interconnected to their respective search bars to seperate.
- [ ] Fix time display. On Android it's in army time but on Apple it's in 12-hour

### Student pages:
- [ ] Prevent students from signing in after 1:45
- [ ] Debug

### Admin:
- [ ] Reset teacher's max, plan, studentssignedup, and attendancesubmitted everyday (Find out more about how it currently works)
- [ ] Publish a full attendance report, in google sheets probably (Also find out more about this)
- [ ] More tools for database editing/creation

### App in general:
- [ ] ***MAKE SURE AN ACCOUNT CAN ONLY BE LOGGED ON TO ONE DEVICE AT A TIME!***
- [x] Provide instructions on how to clone repo and run app
- [ ] Publish to google play store
- [ ] Publish to app store
- [ ] Add Tran's loading art

### Web(not started):
- [ ] just do it
