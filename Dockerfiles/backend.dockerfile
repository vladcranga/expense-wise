# Build the application
FROM maven:3.8.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY ../pom.xml .
COPY ../src ./src
RUN mvn clean package -DskipTests

# Create the runtime image
FROM openjdk:17-jdk
WORKDIR /app
COPY ../api_key.txt /app/api_key.txt
COPY ../currency_codes.txt /app/currency_codes.txt
COPY --from=build /app/target/*.jar /app/java-currency.jar
ENTRYPOINT ["java", "-jar", "/app/java-currency.jar"]
