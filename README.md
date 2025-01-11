# Pioneer

✨ **[Pioneer](https://katechackers.com)**: Your polaris to shaping opportunities and navigating challenges in studying abroad, immigration, and job hunting across North America.

<br></br>

## 🍽️ Features
3 Main Features are:
- 🏠 **Home**: The face of Pioneer
  ![home](https://github.com/user-attachments/assets/4f173461-1003-47b1-8491-0712b9e2af14)
- ✉️ **Form** : User info page
  ![form](https://github.com/user-attachments/assets/394e9eea-d0f4-43e2-b852-9dc8f70bf487)
- 📜 **Sum** : Provide customized immigration programs, match jobs to your skills, help with social networking, match your skills with North American companies, provide a % indication if your skills are not sufficient, and provide explanations to help you understand the North American job hunting process.
    - Customized immigration programs.
    - Skill-matching for North American job opportunities.
    - Social networking assistance.
    - Feedback on skill gaps with actionable advice.
    - Educational resources on the North American job hunting process.
    ![sum](https://github.com/user-attachments/assets/d3c38bb2-1113-4f0d-91ee-3a85176adbfd)

<br></br>

## 📂 Project Structure

```
.
├── backend        # Django backend project folder
│   ├── search_api # Search API app
│
├── docker_nginx   # Docker NginX folder
│   └── Dockerfile # Base image is Alpine Linux
│
└── frontend       # React frontend project folder
    └── build
        └── static # Built static files for React
```

<br></br>

## 🚀 Getting Started

### Prerequisites
- **Backend**: Python 3.11+ installed on your system.
- **Frontend**: Node.js v18+ and npm installed.
- **Global**: Docker and Docker Compose installed.

### Backend

1. **Navigate to the backend folder**:
   ```bash
   cd backend
   ```

2. **Install dependencies**: Installed via requirements.txt:
    ```bash
    pip install -r requirements.txt
    ```
    - Django~=5.1.4
    - djangorestframework~=3.15.2
    - python-dotenv~=1.0.1
    - requests~=2.32.3
    - openai~=1.58.1

3. **Set environment variables**:
   - Create a `.env_local` file in the `backend` directory based on `/backend/.env_local.example`.
   - Add your API keys and configurations:
     - **TAVILY_API_KEY**: Obtain from [Tavily](https://tavily.com/).
     - **GEMINI_API_KEY**: Obtain from [Google AI Studio](https://aistudio.google.com/apikey).

4. **Run the server:**
   ```bash
   python manage.py runserver 0.0.0.0:8002
   ```

5. **Endpoints:**
   - **Home**: [http://127.0.0.1:8002/](http://127.0.0.1:8002/)
   - **Search API**: [http://127.0.0.1:8002/api/search](http://127.0.0.1:8002/api/search)

### Frontend

1. **Navigate to the frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set environment variables:**
    - Copy .env.example to .env.
      ```bash
       cp .env.example .env
       ```
    - Open .env and replace placeholder values with actual API keys:
      ```bash
      REACT_APP_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
      ```

4. **Start the development server:**
   ```bash
   npm start
   ```

### 🌀 Dockerized Deployment

1. **Navigate to the docker_nginx folder:**
    ```bash
    cd docker_nginx
    ```
2. **Build and run the services:**
    ```bash
    docker-compose up --build
    ```
3. **Access the app at http://localhost**
4. **Stop the services:**
   ```bash
   docker-compose down
   ```

<br></br>

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

<br></br>

## 🤖 Integrations

- **Tavily API**:
  - Use Tavily API for location-based insights and immigration-related searches.
- **Gemini 2.0 API**:
  - Use Google Gemini 2.0 for advanced AI-based recommendations.
- **Google Map Platform API**:
  - Use Google Maps API for location-based services.

