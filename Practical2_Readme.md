# Practical 2: RESTful Weather API Application

## Project Overview
A weather application that combines:
- **OpenWeatherMap API** (GET requests for live weather)
- **JSONPlaceholder API** (CRUD operations for saved locations)
- Interactive UI with tabbed interface

## Features
**Weather Data**
- Real-time weather by city
- Temperature, humidity, and conditions
- Error handling for invalid locations

**Saved Locations**
- Add/remove favorite places
- Edit location details
- Persistent storage via mock API

**Technical Highlights**
- Axios for HTTP requests
- Modular JavaScript architecture
- Responsive design

## Setup Instructions

### 1. Get API Keys
- Sign up at [OpenWeatherMap](https://openweathermap.org/) for a free API key
- No key needed for JSONPlaceholder

### 2. Configure Application
```bash
git clone [your-repo-url]
cd weather-api-app
```
Edit script.js:
```javascript
const OPENWEATHER_API_KEY = 'your_api_key_here'; // Line 3
```

### 3. Run the App
Open index.html in any modern browser

## Project Structure
weather-api-app/
├── index.html      # Main interface
├── script.js       # All application logic
├── styles/         # CSS files
└── README.md

## Usage Guide
**Weather Tab (GET)**
1. Enter city name
2. Click "Get Weather"
3. View results:
    - Temperature (converted to Celsius)
    - Weather conditions
    - Humidity and wind speed

**Saved Locations (CRUD)**
1. Add: Fill form → "Save Location"
2. Edit: Click edit → Modify → "Update"
3. Delete: Click trash icon → Confirm

**Dependencies**
- Axios (CDN)
- Font Awesome (icons)
- OpenWeatherMap API
- JSONPlaceholder API