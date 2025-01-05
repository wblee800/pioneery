# Pioneer

✨ **Pioneer**: Your guide to shaping opportunities and navigating challenges in studying abroad, immigration, and job hunting across North America.

---

## 📂 Project Structure

```
.
├── backend        # Django backend project folder
│   ├── board      # Board app
│   └── board_api  # Board API app
└── frontend       # React frontend project folder
    └── build
        └── static # Built static files for React
```

---

## 🚀 Getting Started

### Backend

1. **Run the server:**
   ```bash
   python manage.py runserver 0.0.0.0:8002
   ```

2. **Endpoints:**
   - **Home**: [http://127.0.0.1:8002/](http://127.0.0.1:8002/)
   - **Board**: [http://127.0.0.1:8002/board](http://127.0.0.1:8002/board)
   - **Board API**: [http://127.0.0.1:8002/board/api](http://127.0.0.1:8002/board/api)

3. **Environment Variables**:
   - Create a `.env_local` file in the `backend` directory based on `/backend/.env_local.example`.
   - Add your API keys and configurations:
     - **TAVILY_API_KEY**: Obtain from [Tavily](https://tavily.com/).
     - **GEMINI_API_KEY**: Obtain from [Google AI Studio](https://aistudio.google.com/apikey).

4. **Tavily Test API**:
   - Perform a simple search:
     ```
     GET http://127.0.0.1:8002/api/search/?q=카나다이민
     ```

### Frontend

1. **Navigate to the frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

---

## ⚙️ Initial Setup

### Python Installation

1. Install the Python version specified in `/.python-version`:
   ```bash
   pyenv install 3.11.9
   ```

2. Set up a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows, use .venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Database Migration

1. Generate migration files:
   ```bash
   python manage.py makemigrations
   ```

2. Apply migrations to the database:
   ```bash
   python manage.py migrate
   ```

---

## ⚙️ Features and Integrations

- **Tavily Integration**:
  - Use Tavily API for location-based insights and immigration-related searches.
- **Gemini Integration**:
  - Leverage Google Gemini for advanced AI-based recommendations.

---
