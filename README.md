# ExpenseWise - Personal Budget Tracker

A full-stack expense tracking application built with Spring Boot and React. Track expenses, analyse spending patterns, and manage international transactions with a real-time currency converter.

![ExpenseWise Main Page](/frontend/public/index_page.png)

## Features

### 📊 Comprehensive Expense Tracking
- **Expense Visualisation**: Pie chart showing expense distribution across categories
![Pie Chart](/frontend/public/chart.png)
- **Expense Categories**: Pre-defined categories for common expenses (Food, Transport, Bills, etc.)
![Categories](/frontend/public/categories.png)
- **Monthly Analysis**: Track and compare expenses across months
![Monthly Analysis](/frontend/public/monthly_expenses.png)

### 💰 Multi-Currency Support
- **Currency Conversion**: Built-in converter for international expenses
- **Base Currency Preference**: Set your preferred currency for consistent tracking
- **Live Exchange Rates**: Powered by the [ExchangeRate API](https://www.exchangerate-api.com/) for accurate conversions, with the rates updated daily
![Currency Converter](/frontend/public/converter.png)

### 🧮 Built-in Calculator
- Basic arithmetic operations
- Calculation history
![Calculator](/frontend/public/calculator.png)

### 📱 Modern User Experience
- **Real-time Updates**: Instant reflection of changes in charts and lists
- **Intuitive Interface**: Clean UI with smooth interactions
![Expense List](/frontend/public/expenses_list.png)

## Architecture

### Microservices
- **Core Expense Service**: Main application service managing expense tracking
- **Currency Converter Service**: Real-time currency conversion microservice
- **Calculator Service**: Serverless calculator using AWS Lambda

## Technical Stack

### Frontend
- **React 18** with TypeScript, including **React Router** and **React-Toastify**
- **Tailwind CSS** for modern styling
- **Axios** for API communication
- **Chart.js** for data visualisation

### Backend
- **Spring Boot 3.0**
- **Spring Security** for authentication
- **Spring Data JPA** with PostgreSQL
- **Maven** for dependency management
- **JUnit** for testing

### DevOps & Tools
- **Docker** & Docker Compose for containerization
- **GitHub Actions** for CI/CD
- **PostgreSQL** for user data storage

## Getting Started

### Prerequisites
- **JDK 17 or higher**
- **Apache Maven 3.0 or higher**
- **Node.js and npm**
- **PostgreSQL**, including a currencydb database
```
psql -U postgres
CREATE DATABASE currencydb;
```
The schema.sql file can be found in `src/main/java/com/vladcranga/currencyconverter/database/schema.sql`. Run the following command to import it into your database, keeping in mind to replace `path_to_schema.sql` with your actual path to the file:
```
psql -U postgres -d currencydb -f path_to_schema.sql
```

- An internet connection for fetching exchange rates
- A (free) [ExchangeRate API](https://www.exchangerate-api.com/) key in `api_key.txt` in the root directory
- An AWS Lambda API URL in .env in the frontend directory
```
VITE_CALC_APP_API_URL=your_lambda_api_url
```

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/vladcranga/expense-wise.git
cd expense-wise
```

2. **Backend Setup**
```bash
# Install the dependencies and compile
mvn clean install

# Start the Spring Boot application
mvn spring-boot:run
```

3. **Frontend Setup**
```bash
# Navigate to the frontend directory
cd frontend

# Install the dependencies
npm install

# Start the development server
npm run dev
```

4. **Access the Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080

### Docker Setup
```bash
# Build and run with Docker Compose
docker-compose up --build
```

## Running Tests

### Backend Tests
```bash
# Run all the tests
mvn test
```

### Frontend Tests
```bash
# Navigate to the frontend directory
cd frontend

# Run all the tests
npm test
```

## API Documentation

### Authentication Endpoints
- `POST /api/v1/users/register` - Register a new user
- `POST /api/v1/users/login` - User login
- `POST /api/v1/users/logout` - User logout

### Expense Endpoints
- `GET /api/v1/expenses/{userId}` - Get user's expenses
- `POST /api/v1/expenses` - Add new expense
- `PUT /api/v1/expenses/{id}` - Update expense
- `DELETE /api/v1/expenses/{id}` - Delete expense

### Currency Endpoints
- `GET /api/v1/currency/convert` - Convert amount between currencies
- `GET /api/v1/currency/rates` - Get latest exchange rates

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## Credits
- Icon: [Business and finance icons created by Freepik - Flaticon](https://www.flaticon.com/free-icons/business-and-finance)

## License
This project is licensed under the [MIT License](https://opensource.org/license/MIT).
