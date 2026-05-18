# Stage 1: Build Spring Boot app
FROM eclipse-temurin:21-jdk-alpine AS builder

WORKDIR /app

COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

RUN chmod +x mvnw

# Download dependencies first (better caching)
RUN ./mvnw dependency:go-offline

COPY src src

RUN ./mvnw clean package -DskipTests

# Stage 2: Run app
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

ENV PORT=8080

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java -Dserver.port=$PORT -jar app.jar"]
