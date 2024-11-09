# Java Currency Converter

A Java-based Currency Converter application that uses the ExchangeRate-API to provide real-time currency conversion rates. The backend is built using **Spring Boot**, while the frontend uses **React** (Vite).

## Features
- Converts between multiple currencies including USD, GBP, EUR, and more.
- Real-time exchange rates using [ExchangeRate-API](https://www.exchangerate-api.com/).
- A modern web-based UI.
- Backend API built with Java Spring Boot.
- Frontend built with React using Vite.
- Docker support.

## Installation

### Prerequisites
- **Java Development Kit (JDK) 17 or higher**.
- **Apache Maven 3.0 or higher**.
- **Node.js and npm**.
- An internet connection for fetching exchange rates.
- A (free) ExchangeRate API key in `api_key.txt` in the backend directory.

### Backend Setup
1. In the root folder, install the dependencies and compile the project:
   ```sh
   mvn clean install
   ```
2. Run the backend server:
   ```sh
   mvn spring-boot:run
   ```
   It will run on `http://localhost:8080` by default.

### Frontend Setup
1. Navigate to the `frontend` folder:
   ```sh
   cd frontend
   ```
2. Install the dependencies using npm:
   ```sh
   npm install
   ```
3. Run the dev server:
   ```sh
   npm run dev
   ```
   It will run on `http://localhost:3000` by default.

### Running Tests
- **Backend Tests**: From the root directory, run:
  ```sh
  mvn test
  ```
- **Frontend Tests**: From the `frontend` directory, run:
  ```sh
  npm test
  ```

## Docker Deployment

1. Make sure **Docker** is installed on your machine.
2. In the project root, use the provided `docker-compose.yml` file to build and run the entire stack:
   ```sh
   docker-compose up --build
   ```
   This will start both the backend (`http://localhost:8080`) and the frontend (`http://localhost:3000`).

## Notes
- Make sure to set up an `api_key.txt` file containing only your key in the root directory.

# Credits
- Icon: [Business and finance icons created by cah nggunung - Flaticon](https://www.flaticon.com/free-icons/business-and-finance).

# License
This project is licensed under the [MIT License](https://opensource.org/license/MIT).

![example picture](example.png)
