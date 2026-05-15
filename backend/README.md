# 🌱 GreenLedger-System Backend

An intelligent backend system for optimizing urban tree plantation and simulating environmental impact using graph-based analysis and priority-driven allocation.

---

# 📌 Overview

GreenLedger-System is designed to identify high-priority urban zones for plantation and estimate the environmental improvement after planting.

The system evaluates multiple environmental parameters such as:

* NDVI (vegetation index)
* Population density
* Heat intensity
* Flood risk

Based on these metrics, the backend calculates priority scores, selects optimal plantation zones, and simulates the impact of plantation across nearby regions.

---

# 🚀 Tech Stack

## Backend Framework

* Python
* FastAPI
* Pydantic

## Algorithms & Concepts

* BFS (Breadth First Search)
* Heap / Priority Queue
* Graph-based zone propagation
* Environmental scoring logic

---

# 🧠 Core Features

## 📊 Zone Scoring System

Calculates environmental priority scores using:

* NDVI values
* Population density
* Heat index
* Flood risk

Higher scores indicate zones requiring urgent plantation.

---

## 🌳 Plantation Optimization Engine

Uses heap-based allocation logic to:

* Select top-priority zones
* Allocate saplings efficiently
* Maximize environmental improvement

---

## 🔁 Environmental Impact Simulation

Simulates plantation impact using BFS traversal across connected urban zones.

The simulation estimates:

* Heat reduction
* Environmental score improvement
* Neighboring zone influence

---

## 📉 Before vs After Analysis

Provides comparative environmental analysis before and after plantation.

Outputs include:

* Updated zone scores
* Overall environmental improvement
* Plantation effectiveness

---

# 🗂️ Project Structure

```bash
backend/
│
├── data/
│   └── zones.py
│
├── schemas/
│   └── api_models.py
│
├── services/
│   ├── bfs_service.py
│   ├── graph_service.py
│   ├── optimizer_service.py
│   ├── plant_service.py
│   ├── score_service.py
│   └── species_service.py
│
├── utils/
│   └── validator.py
│
├── main.py
├── requirements.txt
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/mk26-coder-sudo/GreenLedger-System.git
cd GreenLedger-System/backend
```

---

## 2️⃣ Create Virtual Environment (Recommended)

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### Linux / Mac

```bash
python3 -m venv venv
source venv/bin/activate
```

---

## 3️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 4️⃣ Start FastAPI Server

```bash
uvicorn main:app --reload
```

---

# 🌐 API Access

## Local Server

```bash
http://127.0.0.1:8000
```

## Swagger API Documentation

```bash
http://127.0.0.1:8000/docs
```

---

# 🔗 API Endpoints

| Method | Endpoint        | Description                       |
| ------ | --------------- | --------------------------------- |
| GET    | `/zones`        | Retrieve all urban zones          |
| GET    | `/optimize?k=3` | Get top-priority plantation zones |
| POST   | `/plant`        | Apply plantation simulation       |
| GET    | `/docs`         | Swagger API documentation         |

---

# 🧪 Example Workflow

1. Retrieve available urban zones
2. Calculate environmental priority scores
3. Select top zones for plantation
4. Allocate saplings using optimization logic
5. Simulate environmental impact using BFS
6. Compare before vs after environmental metrics

---

# 👨‍💻 My Contributions

* Designed backend architecture using FastAPI
* Developed environmental scoring algorithms
* Implemented heap-based optimization engine
* Built BFS-based impact propagation system
* Created REST APIs for zone analysis and plantation simulation
* Structured modular backend services for scalability

---

# 🤝 Team Collaboration

This project was developed collaboratively as part of a group project and later evolved with additional real-time data integration approaches.

---

# 🔮 Future Improvements

* Real-time environmental dataset integration
* GIS and map visualization support
* Machine learning-based prediction models
* Advanced environmental analytics dashboard
* Cloud deployment and scalability enhancements

---

# 📄 License

This project is intended for educational and research purposes.
