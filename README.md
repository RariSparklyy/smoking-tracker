
# PUFFLESS

A React Native mobile application designed to help users track their smoking habits, monitor progress, and gradually work toward reducing or quitting.


## 1. Project Description

Smoking Tracker is a lightweight, user-friendly mobile application built with React Native.
It enables users to:

* Log each cigarette they smoke
* Track daily, weekly, and monthly habits
* View statistics and spending
* Adjust settings such as price-per-pack, daily goals, and cigarette count
* View a history of all smoke events
* Stay motivated through clear data visualisation

The app prioritises simplicity and accessibility, making it suitable for users who want a clean and distraction-free smoke-tracking experience.



## 2. Installation and Running the Project

### Prerequisites

Ensure the following are installed:

* Node.js
* React Native CLI or Expo CLI
* Android Studio or Xcode (for emulators)
* A physical device (optional)



### Cloning the Project

```bash
git clone https://github.com/RariSparklyy/smoking-tracker
cd smoking-tracker
```

### Install Dependencies

```bash
npm install
```

### Run on Android

```bash
npx react-native run-android
```

### Run on iOS

```bash
npx react-native run-ios
```

### If using Expo

```bash
npx expo start
```

---

## 3. Features

### Log Smoke

A single-tap button to instantly record a new smoke event using global context.

### Daily, Weekly, Monthly Statistics

Displays:

* Total smokes
* Averages
* Summaries
* Money spent

### History View

Shows all logged entries with timestamps.

### Settings Screen

Allows the user to configure:

* Cost per pack
* Cigarettes per pack
* Daily goal


### AsyncStorage

All logs and settings are saved locally to preserve data between sessions.

### Navigation Flow

Implemented using React Navigation with stack or tab navigation.


## 4. Screenshots

### Home Screen

`![Home Screen](./screenshots/home.jpg)`

### Navigation Flow

`![Navigation Flow](./screenshots/navigation.jpg)`

### History Screen

`![History Screen](./screenshots/history.jpg)`

### Statistics Screen

`![Statistics Screen](./screenshots/stats.jpg)`

### Settings Screen

`![Settings Screen](./screenshots/settings.jpg)`

---

## 5. Folder Structure and Component Breakdown

```
smoking-tracker/
│
├── App.js
│
└── src/
    ├── navigation/
    │   └── AppNavigator.js
    │
    ├── context/
    │   └── SmokeContext.js
    │
    ├── screens/
    │   ├── HomeScreen.js
    │   ├── HistoryScreen.js
    │   ├── StatisticsScreen.js
    │   ├── SettingsScreen.js
    │
    ├── utils/
    │   └── calculations.js
    │
    └── components/
        ├── GradientText.js
        └── Additional UI components
```
