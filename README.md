# BHCJobs — Bangladesh to Saudi Arabia Job Portal

A React Native mobile application that connects Bangladeshi job seekers with employment opportunities in Saudi Arabia.

---

## Screenshots

> Screen recording available upon request.

---

## Tech Stack

- **React Native** with **Expo**
- **TypeScript**
- **Redux Toolkit** + **RTK Query** (state management & API calls)
- **React Navigation** (stack + bottom tab navigation)
- **NativeWind** (Tailwind CSS for React Native)
- **Expo Linear Gradient**
- **React Native Render HTML**
- **React Native SVG**

---

## Features

- Onboarding screen
- User registration with OTP phone verification
- Login with phone & password
- Home screen with:
  - Popular Industries
  - Recommended Jobs
  - Popular Companies
- Job Detail screen with full job info, benefits, requirements
- Profile screen
- Bottom tab navigation

---

## Project Structure

```
src/
├── components/
│   └── shared/          # Reusable components (InputField, PrimaryButton, etc.)
├── redux/
│   ├── createdApi/      # Base API setup (RTK Query)
│   ├── features/
│   │   ├── auth/        # Auth slice + API (login, register, OTP)
│   │   └── home/        # Home API (industries, jobs, companies)
│   ├── store.ts
│   └── hooks.ts
├── routes/              # Navigation setup
├── screens/
│   ├── Auth/            # Login, SignUp, OTP screens
│   └── Home/            # HomeScreen, JobDetailScreen, ProfileScreen
│       └── components/  # HeroBanner, WaveAnimation, JobCard, etc.
├── types/               # TypeScript types
│   └── job.ts
└── constants/
    └── index.ts         # STORAGE_URL, etc.
```

---

## Setup Instructions

### Prerequisites

- Node.js >= 18
- Expo CLI
- Android Studio (for emulator) or physical Android device

### Installation

```bash
# 1. Clone the repository
git clone <your-github-link>
cd BhcJobs-tk

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root directory:

```dotenv
EXPO_PUBLIC_BASE_URL="https://dev.bhcjobs.com"
EXPO_PUBLIC_STORAGE_URL="https://api.bhcjobs.com/storage"
```

### Running the App

```bash
# Start development server
npx expo start

# Run on Android
npx expo run:android

# Run on iOS
npx expo run:ios
```

---

## API Integration

**Base URL:** `https://dev.bhcjobs.com`  
**Storage URL:** `https://api.bhcjobs.com/storage`

### Endpoints Used

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/industry/get` | Fetch popular industries |
| GET | `/api/job/get` | Fetch recommended jobs |
| GET | `/api/company/get` | Fetch popular companies |
| POST | `/api/job_seeker/register` | Register new user |
| POST | `/api/job_seeker/phone_verify` | Verify OTP |
| POST | `/api/job_seeker/login` | Login with phone & password |

### Image URL Format

```
{STORAGE_URL}/{folder}/{image_filename}

Examples:
https://api.bhcjobs.com/storage/industry-image/2362_1754539698.webp
https://api.bhcjobs.com/storage/company-image/5781_1771908244.webp
```

---

## Build APK

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build preview APK
eas build -p android --profile preview
```

APK download link will be provided after build completes on Expo's servers.

---

## Notes

- Profile screen displays N/A for all user fields. No dedicated profile API endpoint was provided, and the login API response returns only an access token with no user data. Therefore, user information cannot be displayed without a profile endpoint.
- OTP is returned directly in the register API response for development purposes.

---

## Author

Developed as part of a task assessment for BHC Jobs.