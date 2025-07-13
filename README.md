# 📊 Sentiment Analyzer Chrome Extension with Spring Boot & Stanford CoreNLP

A Chrome Extension integrated with a **Java Spring Boot backend** that performs real-time **sentiment analysis** on product reviews using **Stanford CoreNLP**.

---

## 🚀 Features
- Analyze product reviews or any text directly from the Chrome extension
- Backend powered by **Stanford CoreNLP** for deep learning-based sentiment analysis
- Returns sentiment as **Positive**, **Negative**, or **Neutral**
- Lightweight Chrome UI with instant feedback
- CORS-enabled API for secure communication between extension and backend
- Scalable architecture to integrate advanced NLP models in future

---

## 🛠️ Tech Stack
| Layer      | Technology              |
|------------|-------------------------|
| Frontend   | HTML, CSS, JavaScript (Chrome Extension) |
| Backend    | Java, Spring Boot, REST APIs |
| NLP        | Stanford CoreNLP (Java NLP library) |
| Build Tool | Maven |

---

## 📂 Project Structure
/sentiment-analyzer-extension # Chrome Extension (Frontend)
popup.html
popup.js
manifest.json
/sentiment-analyzer-backend # Spring Boot Backend
/controller
/service
/entity
pom.xml


---

## ⚙️ Setup Instructions

### 🔸 Backend (Spring Boot)
1. Clone the repository
2. Navigate to `/sentiment-analyzer-backend`
3. Run `mvn clean install`
4. Run the Spring Boot app on port `8090`

### 🔸 Frontend (Chrome Extension)
1. Navigate to `chrome://extensions/`
2. Enable **Developer Mode**
3. Load the `/sentiment-analyzer-extension` folder as an **Unpacked Extension**
4. Use the extension to analyze text sentiment

---

## 📌 API Endpoint
| Method | Endpoint             | Description             |
|--------|----------------------|-------------------------|
| POST   | `/api/sentiment`      | Returns sentiment label |

**Request Example:**
```json
{ "sentiment": "This is a great product!" }

**Response Example:**
{ "sentiment": "Positive" }
