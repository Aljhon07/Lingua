# Lingua - Travel & Language Learning Platform

Lingua is a comprehensive mobile application that combines travel booking with language learning, designed to help users explore the world while mastering new languages. Built with React Native and Expo, the app provides an integrated experience for discovering travel packages, booking flights, and learning languages through interactive lessons.

## 🌟 Features

### 🧳 Travel Package Management
- **Explore Packages**: Browse curated travel packages with detailed itineraries
- **Package Details**: View comprehensive information including features, destinations, and pricing
- **Country Filtering**: Filter packages by destination countries
- **Search Functionality**: Find packages using text search

### ✈️ Flight Booking System
- **Ticket Selection**: Choose from available flight tickets for travel packages
- **Passenger Information**: Collect and manage passenger details
- **Booking Management**: Track booking history and status
- **Payment Integration**: Secure payment processing with Stripe

### 🎓 Language Learning
- **Interactive Lessons**: Structured language learning modules
- **Vocabulary Lists**: Comprehensive word lists for each lesson
- **Quiz System**: Test knowledge with interactive quizzes
- **Progress Tracking**: Monitor learning progress

### 🎤 Real-time Translation
- **Voice Translation**: Real-time speech-to-text and translation
- **WebSocket Integration**: Live audio streaming for translation services
- **Microphone Support**: Record and process audio for translation

### 👤 User Management
- **Authentication**: Secure sign-in and sign-up with JWT tokens
- **Profile Management**: User profile and preferences
- **Booking History**: Complete booking and payment history
- **Theme Support**: Dark and light mode themes

## 🏗️ System Architecture

### Frontend (React Native/Expo)
- **Framework**: React Native with Expo SDK 52
- **Navigation**: React Navigation v7 with stack and tab navigators
- **State Management**: React Context API for global state
- **UI Components**: React Native Paper with custom theming
- **Styling**: StyleSheet with responsive design patterns

### Backend Services
- **CMS**: Directus 11.5.1 for content and data management
- **Database**: MySQL 8.0 for data persistence
- **Payment Processing**: Express.js server with Stripe integration
- **File Storage**: Cloudinary for image and media management

### Infrastructure
- **Containerization**: Docker Compose for local development
- **Database**: MySQL with automated backups
- **API**: RESTful API through Directus
- **WebSocket**: Real-time communication for translation services

## 📱 App Structure

### Main Navigation Tabs
1. **Explore** - Travel package discovery and browsing
2. **Bookings** - Booking history and management
3. **Translator** - Real-time voice translation
4. **Learn** - Language learning lessons and quizzes
5. **Profile** - User account and settings

### Key Screens
- **Authentication**: Sign-in and sign-up flows
- **Package Details**: Comprehensive travel package information
- **Booking Flow**: Multi-step booking process with passenger details
- **Checkout**: Payment processing with Stripe integration
- **Lesson List**: Language learning curriculum
- **Quiz Interface**: Interactive learning assessments

## 🛠️ Technology Stack

### Mobile App
- React Native 0.76.3
- Expo SDK 52
- React Navigation 7
- React Native Paper 5
- Axios for API communication
- Expo Secure Store for token management
- Stripe React Native SDK

### Backend & Database
- Directus 11.5.1 (Headless CMS)
- MySQL 8.0
- Express.js (Payment server)
- Stripe API
- Cloudinary (Media storage)

### Development Tools
- Docker & Docker Compose
- Babel for code transformation
- Metro bundler
- EAS Build for deployment

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Docker and Docker Compose
- Expo CLI
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Lingua
   ```

2. **Set up the database and CMS**
   ```bash
   cd directus
   docker-compose up -d
   ```

3. **Install mobile app dependencies**
   ```bash
   cd Lingua
   npm install
   ```

4. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

5. **Configure environment variables**
   - Set up Directus admin credentials
   - Configure Stripe keys
   - Update API endpoints

6. **Start the mobile app**
   ```bash
   cd Lingua
   npm run dev
   ```

7. **Start the payment server**
   ```bash
   cd server
   npm start
   ```

## 📊 Database Management

### Backup Commands
```bash
# Create backup
docker exec {container-name} sh -c 'exec mysqldump -u{} -p{} {db-name}' > backup.sql

# Restore backup
Get-Content backup.sql | docker exec -i {container-name} mysql -u {} -p {} {db-name}
```

### Character Encoding
```bash
# Convert UTF-16LE to UTF-8
iconv -f UTF-16LE -t UTF-8 backup/backup_v2-bookings.sql -o backup_v2-bookings_utf8.sql
```

## 🔧 Configuration

### API Configuration
- Update `Lingua/src/constants/api.js` with your server IP
- Configure Directus instance URL
- Set up Cloudinary credentials

### Payment Configuration
- Add Stripe keys to server environment variables
- Configure webhook endpoints for payment processing

## 📱 Supported Platforms
- Android (Primary)
- iOS (Compatible)
- Web (Limited functionality)

## 🔒 Security Features
- JWT-based authentication
- Secure token storage with Expo Secure Store
- Input validation and sanitization
- HTTPS API communication
- PCI-compliant payment processing

## 📈 Future Enhancements
- Push notifications for booking updates
- Offline mode for lessons
- Social features and user reviews
- Advanced analytics and progress tracking
- Multi-language support for the app interface

---

*Lingua - Where travel meets language learning* 🌍📚
