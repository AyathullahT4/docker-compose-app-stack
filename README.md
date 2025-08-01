# 🐳 docker-compose-app-stack

A multi-container application stack using **Docker Compose** with the following services:

- Node.js (Express) — connects to MongoDB and exposes data
- Python (Flask) — simple API endpoint
- MongoDB — with authentication and seeded data
- NGINX — reverse proxy for routing to Python and Node apps

---

## 📌 Project Overview

This stack simulates a local microservice architecture using Docker Compose. The Node.js app fetches data from a secured MongoDB instance, while the Python service offers a static response. An NGINX reverse proxy exposes both under clean URLs.

This setup is ideal for:
- Prototyping containerized microservices
- Practicing environment variable usage and secure Mongo connections
- Learning multi-service orchestration using Docker Compose

---

## 🧱 Tech Stack

| Layer         | Technology     |
|---------------|----------------|
| Backend API 1 | Node.js + Express |
| Backend API 2 | Python + Flask |
| Database      | MongoDB        |
| Reverse Proxy | NGINX          |
| Orchestration | Docker Compose |

---

## 🗂️ Folder Structure

```
docker-compose-app-stack/
├── docker-compose.yml
├── .env
│
├── node-app/
│ ├── app.js
│ ├── package.json
│ └── Dockerfile
│
├── python-app/
│ ├── app.py
│ └── Dockerfile
│
├── mongo/
│ └── init.js
│
└── nginx/
├── default.conf
└── Dockerfile
```

---

## 🚀 How to Run

```bash
# Clone the repo
git clone https://github.com/yourusername/docker-compose-app-stack.git
cd docker-compose-app-stack

# Create .env file
cp .env.example .env
# (Edit values if needed)

# Build and start all services
docker-compose up --build
```
---
🔗 Service Endpoints

| Service        | URL                                                                                  |
| -------------- | ------------------------------------------------------------------------------------ |
| Python (Flask) | [http://localhost:80/python/](http://localhost:80/python/)                           |
| Node.js (API)  | [http://localhost:80/node/](http://localhost:80/node/)                               |
| MongoDB (CLI)  | `docker exec -it mongo mongosh -u appuser -p apppass --authenticationDatabase appdb` |

---

🔒 MongoDB Auth
MongoDB is secured with a username & password, injected via .env. On startup, init.js seeds the appdb database with:

[
  { "text": "Hello from MongoDB!" },
  { "text": "Connected to Docker Compose stack." }
]

You can verify this via:
```
docker exec -it mongo mongosh -u appuser -p apppass --authenticationDatabase appdb
use appdb
db.messages.find()
```
---

🧪 Testing the Stack
After docker-compose up, test all services:
Python app via NGINX
```
curl http://localhost:80/python/
➜ Hello from Python Flask service!
```
Node.js app via NGINX
```
curl http://localhost:80/node/
➜ {"messages":[{...}, {...}]}
```
Direct ports (optional)
```
curl http://localhost:5000
curl http://localhost:3000
```
---


🌐 Architecture Diagram

                   ┌────────────┐
                   │   Client   │
                   └─────┬──────┘
                         │
                  ┌──────▼──────┐
                  │    NGINX    │
                  │ (Reverse Proxy)
                  └────┬───────┬┘
             ┌─────────▼─┐   ┌─▼────────┐
             │  Flask App│   │ Node App │
             └──────────┘   └────▲──────┘
                                │
                            ┌───▼────┐
                            │ Mongo  │
                            └────────┘

---

🧼 Cleanup

To stop and remove containers, networks, and volumes:
```
docker-compose down -v
```
---

🏷️ Tags

docker devops docker-compose nginx mongodb nodejs flask microservices

---
