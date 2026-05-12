# AIRecommandation

FormPilot is a comprehensive, microservices-based fitness application designed to handle user management, activity tracking, and AI-driven recommendations.

The system utilizes a polyglot persistence architecture (PostgreSQL & MongoDB) and **event-driven architecture via Spring Cloud Stream and Apache Kafka** to ensure scalability and decoupling. It features a modern React frontend with Material-UI and secured access via OAuth2/OpenID Connect (Keycloak).

## 🚀 Tech Stack

### Backend

- **Language:** Java 21
- **Framework:** Spring Boot 4.0.1
- **Cloud Architecture:** Spring Cloud 2025.1.0 (**Spring Cloud Stream**)
- **Build Tool:** Maven
- **Databases:** PostgreSQL (User), MongoDB (Activity & AI)
- **Message Broker:** **Apache Kafka** (Dockerized)
- **AI Integration:** Google Gemini API

### Frontend

- **Framework:** React (Vite)
- **UI Library:** Material-UI (MUI)
- **State Management:** Redux Toolkit
- **Routing:** React Router
- **HTTP Client:** Axios (Interceptors for Auth)
- **Security:** OAuth2 PKCE (`react-oauth2-code-pkce`)

---

## 🏗 System Architecture

The backend follows a microservices architecture with the following components:

| Service              | Port   | Description                                       | DB/Tech              |
| :------------------- | :----- | :------------------------------------------------ | :------------------- |
| **Config Server**    | `8888` | Centralized configuration for all services.       | Local Classpath      |
| **Eureka Server**    | `8761` | Service Discovery Registry.                       | Netflix Eureka       |
| **API Gateway**      | `8080` | Entry point, routing, and OAuth2 Resource Server. | Spring Cloud Gateway |
| **User Service**     | `8081` | Manages user profiles.                            | PostgreSQL           |
| **Activity Service** | `8082` | Tracks fitness activities (Producer).             | MongoDB / Kafka      |
| **AI Service**       | `8083` | Generates AI recommendations (Consumer).          | MongoDB / Kafka      |

<img width="2487" height="1611" alt="FormPilot_Architecture_Diagram drawio" src="https://github.com/user-attachments/assets/78b8c42e-aa0c-4aa7-870b-a6e910fc1e0d" />


### Key Infrastructure Requirements

- **Apache Kafka:** Used for the `fitness-topic` to decouple Activity tracking from AI analysis.
- **Keycloak:** Runs on port `8181` handling Identity Management.
- **Docker Compose:** Orchestrates Kafka, Zookeeper, Kafka UI, and Keycloak containers.

---

## 🛠 Prerequisites

Before running the application, ensure the following are installed:

1.  **Java 21 SDK**
2.  **Node.js & npm**
3.  **Docker Desktop** (Required for Kafka & Keycloak)
4.  **PostgreSQL** (Port `5432` - _Running locally or via Docker_)
5.  **MongoDB** (Port `27017` - _Running locally or via Docker_)

---

## ⚙️ Configuration & Setup

### 1. Infrastructure Setup (Docker)

We use `docker-compose` to start the required infrastructure (Kafka, Zookeeper, Kafka UI, Keycloak).

1.  Open a terminal in the project root.
2.  Run the following command:
    ```bash
    docker-compose up -d
    ```
3.  Verify the services are running:
    - **Kafka UI:** [http://localhost:8090](http://localhost:8090)
    - **Keycloak:** [http://localhost:8181](http://localhost:8181)

### 2. Database Setup

Create the following databases before starting services:

- **Postgres:** `formpilot_user_db`
- **MongoDB:** `formpilot_activity_db`, `formpilot_ai_db`

### 3. Kafka Configuration

The application uses **Spring Cloud Stream** to abstract the message broker.

- **Topic:** `fitness-topic` (Auto-created by Spring Cloud Stream on first message).
- **Consumer Group:** `ai-service-group` (Ensures durability and load balancing).

### 4. Environment Variables

The **AI Service** requires access to the Google Gemini API.

| Service     | Variable         | Description                      |
| :---------- | :--------------- | :------------------------------- |
| `aiservice` | `GEMINI_API_URL` | URL for the Gemini API endpoint. |
| `aiservice` | `GEMINI_API_KEY` | Your Google Gemini API Key.      |

---

## 🏃‍♂️ How to Run

### Backend Startup Sequence

To ensure service discovery and configuration loading work correctly, start the microservices in this **exact order**:

1.  **Start Infrastructure:** Run `docker-compose up -d` (Kafka, Keycloak).
2.  **Config Server** (`configserver`)
3.  **Eureka Server** (`eureka`)
4.  _Ensure Postgres and Mongo are running._
5.  **Core Services:**
    - User Service (`userservice`)
    - Activity Service (`activityservice`)
    - AI Service (`aiservice`)
6.  **API Gateway** (`gateway`)

### Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Access the app at `http://localhost:5173` (default Vite port).

---

## 📂 Frontend Structure

- `src/main.jsx`: Entry point, Redux & AuthProvider setup.
- `src/store/`: Redux store and `authSlice` for token management.
- `src/services/api.js`: Centralized Axios instance with Auth interceptors.
- `src/authConfig.js`: OAuth2 PKCE config for Keycloak.
- `src/components/`:
  - `ActivityList.jsx`
  - `ActivityForm.jsx`
  - `ActivityDetail.jsx`

---

## 🔐 Security

- **Authentication:** The frontend uses **OAuth2 PKCE** flow to communicate with Keycloak (running on port `8181`).
- **Authorization:** The API Gateway validates JWTs via the JWK Set URI:
  - `http://localhost:8181/realms/{your-realm}/protocol/openid-connect/certs`
