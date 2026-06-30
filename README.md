# 🚀 RAG AI System (Node.js + React + Qdrant + Redis + MongoDB)

A full-stack **Retrieval-Augmented Generation (RAG)** system using:
- Node.js (Express) Backend
- React.js Frontend
- MongoDB (File metadata storage)
- Qdrant (Vector Database)
- Redis (Caching layer)
- OpenAI API (LLM responses)
- Docker + Docker Compose (Containerized deployment)

---

# 🧠 Architecture

```

User
│
React Frontend
│
Node.js Backend
│
├── MongoDB → File metadata
├── Qdrant → Vector embeddings + search
├── Redis → Cache layer
└── OpenAI → Response generation

````

---

# ⚙️ Features

- 📄 Upload PDF documents
- ✂️ Chunking + Embedding generation
- 🔍 Semantic search using Qdrant
- ⚡ Redis caching for fast responses
- 🤖 AI-powered Q\&A system
- 🐳 Fully Dockerized system

---

# 📦 Tech Stack

- Node.js + Express
- React.js (Vite)
- MongoDB
- Qdrant Vector DB
- Redis
- OpenAI API
- Docker + Docker Compose

---

# 📁 Project Structure

```

project-root/
│
├── server/        # Backend (Node.js)
├── client/        # Frontend (React)
├── docker-compose.yml
└── README.md

````

---

# 🐳 Docker Setup

## 1. Build Backend Image

```bash
docker build -t dipronil1998/ai-rag-app:backend-v1 ./server
```

---

## 2. Build Frontend Image

```bash
docker build -t dipronil1998/ai-rag-app:frontend-v1 ./client
```

---

## 3. Login to Docker Hub

```bash
docker login
```

---

## 4. Push Images to Docker Hub

```bash
docker push dipronil1998/ai-rag-app:backend-v1
docker push dipronil1998/ai-rag-app:frontend-v1
```

---

# 🐳 Docker Compose (Production)

```yaml
version: "3.9"

services:
  redis:
    image: redis:7-alpine
    container_name: ai_redis
    ports:
      - "6379:6379"

  qdrant:
    image: qdrant/qdrant:latest
    container_name: ai_qdrant
    ports:
      - "6333:6333"

  backend:
    image: dipronil1998/ai-rag-app:backend-v1
    container_name: ai_backend
    ports:
      - "9000:9000"
    depends_on:
      - redis
      - qdrant
    env_file:
      - ./server/.env

  frontend:
    image: dipronil1998/ai-rag-app:frontend-v1
    container_name: ai_frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend
```

---

# ⚙️ Environment Variables (`server/.env`)

```env
PORT=9000

MONGO_URI=mongodb://mongodb:27017/rag_db

REDIS_HOST=redis
REDIS_PORT=6379

QDRANT_URL=http://qdrant:6333

OPENAI_API_KEY=your_openai_key
```

---

# 🚀 Run Project

```bash
docker compose up -d
```

Stop:

```bash
docker compose down
```

---

# 🧪 API Flow

## 1. Upload PDF

```
POST /api/upload
```

* Extract PDF text
* Chunk text
* Generate embeddings
* Store in Qdrant

---

## 2. Ask Question

```
POST /api/ask
```

Flow:

```
Question → Embedding → Qdrant Search → Redis Cache → OpenAI → Answer
```

---

# ⚡ Performance Optimizations

* Redis caching for repeated queries
* Vector search via Qdrant
* Chunk-based embedding strategy
* Reduced OpenAI token usage

---

# 🧠 Key Concepts Used

* RAG (Retrieval Augmented Generation)
* Vector similarity search
* Embedding-based retrieval
* Caching layer (Redis)
* Microservices with Docker

---

# 📌 Author

👤 Dipronil Das
💻 Full Stack Developer

---

# 🚀 Docker Hub Images

* Backend:

```

dipronil1998/ai-rag-app:backend-v1

```

* Frontend:

```

dipronil1998/ai-rag-app:frontend-v1

```

---
নিচে short `.md` version 👇

---

# 📥 Pull from Docker Hub (Short Guide)

## 🔐 Login (optional)

```bash
docker login
```

---

## 🐳 Pull Backend

```bash
docker pull dipronil1998/ai-rag-app:backend-latest
```

---

## 🎨 Pull Frontend

```bash
docker pull dipronil1998/ai-rag-app:frontend-latest
```

---

## 🏃 Run Backend

```bash
docker run -p 9000:9000 dipronil1998/ai-rag-app:backend-latest
```

---

## 🏃 Run Frontend

```bash
docker run -p 5173:5173 dipronil1998/ai-rag-app:frontend-latest
```

---

## 🐳 Compose (Recommended)

```bash
docker compose up -d
```

---
