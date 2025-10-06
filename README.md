# 🏠 Propertiez

A modern React Native property rental app built with Expo, featuring Google OAuth authentication, property browsing, and detailed property information.

## ✨ Features

- **🔐 Authentication**: Secure Google OAuth login with Appwrite
- **🏘️ Property Browsing**: Browse featured and recommended properties
- **🔍 Search & Filter**: Advanced search with filtering capabilities  
- **📱 Property Details**: Comprehensive property information including:
  - Image galleries
  - Facilities and amenities
  - Agent contact information
  - User reviews and ratings
  - Interactive location maps
- **⭐ Reviews**: View property ratings and user comments
- **📲 Responsive Design**: Optimized for both iOS and Android
- **🎨 Modern UI**: Clean interface built with NativeWind (Tailwind CSS)

## 🛠️ Tech Stack

- **Framework**: [Expo](https://expo.dev) with React Native
- **Routing**: Expo Router with file-based routing
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- **Backend**: [Appwrite](https://appwrite.io/) for authentication and database
- **TypeScript**: Full type safety throughout the application
- **Authentication**: Google OAuth via Appwrite
- **Navigation**: Bottom tabs with nested stack navigation

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Emulator
- Expo Go app (for testing on physical device)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tgutfreund/Propertiez.git
   cd Propertiez
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   EXPO_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
   EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
   EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID=your_galleries_collection_id
   EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID=your_reviews_collection_id
   EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID=your_agents_collection_id
   EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID=your_properties_collection_id
   ```

4. **Start the development server**
   ```bash
   npx expo start
   ```

5. **Run the app**
   - Use Expo Go app to scan the QR code
   - Press `i` for iOS simulator
   - Press `a` for Android emulator

## 📁 Project Structure

```
Propertiez/
├── app/                    # Main application code (Expo Router)
│   ├── (root)/            # Protected routes
│   │   ├── (tabs)/        # Tab navigation
│   │   │   ├── index.tsx  # Home screen
│   │   │   ├── explore.tsx # Property search
│   │   │   └── profile.tsx # User profile
│   │   └── properties/    # Property details
│   │       └── [id].tsx   # Dynamic property page
│   ├── _layout.tsx        # Root layout
│   ├── sign-in.tsx        # Authentication screen
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── Cards.tsx         # Property cards
│   ├── Comment.tsx       # Review component
│   ├── Filters.tsx       # Search filters
│   ├── NoResults.tsx     # Empty state
│   └── Search.tsx        # Search component
├── lib/                  # Utilities and services
│   ├── appwrite.ts       # Appwrite configuration
│   ├── global-provider.tsx # Global state management
│   ├── useAppwrite.ts    # Custom hook for API calls
│   └── data.ts          # Mock data and constants
├── constants/           # App constants
│   ├── data.ts         # Static data
│   ├── icons.ts        # Icon imports
│   └── images.ts       # Image imports
├── assets/             # Static assets
│   ├── fonts/          # Custom fonts
│   ├── icons/          # Icon files
│   └── images/         # Image files
└── package.json
```

## 🔧 Configuration

### Appwrite Setup

1. Create an Appwrite project
2. Set up Google OAuth provider
3. Create database collections for:
   - Properties
   - Agents
   - Reviews
   - Galleries
4. Configure your environment variables

### Google OAuth

1. Configure Google OAuth in your Appwrite console
2. Add your app's scheme to allowed redirect URIs
3. Update `app.json` with your app scheme

## 🎨 Styling

This project uses NativeWind for styling, which allows you to use Tailwind CSS classes in React Native components.

Example:
```tsx
<View className="flex-1 bg-white px-5">
  <Text className="text-2xl font-rubik-bold text-black-300">
    Welcome to Propertiez
  </Text>
</View>
```

## 📋 Available Scripts

```bash
npm start          # Start the Expo development server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on web
npm run lint       # Run ESLint
npm run reset-project # Reset to blank project
```

## 👤 Author

**tgutfreund**
- GitHub: [@tgutfreund](https://github.com/tgutfreund)

## 🙏 Acknowledgments

- [Expo](https://expo.dev/) for the amazing React Native framework
- [Appwrite](https://appwrite.io/) for backend services
- [NativeWind](https://www.nativewind.dev/) for Tailwind CSS integration
- [React Navigation](https://reactnavigation.org/) for navigation

---

**Happy Coding! 🚀**
