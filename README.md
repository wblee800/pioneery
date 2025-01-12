# Pioneer

✨ **[Pioneer](https://katechackers.com)**: Your polaris to shaping opportunities and navigating challenges in studying abroad, immigration, and job hunting across North America.

<br></br>

## 🍽️ Features
3 Main Features are:
- 🏠 **Home**: The face of Pioneer
  ![home](https://github.com/user-attachments/assets/4f173461-1003-47b1-8491-0712b9e2af14)
- ✉️ **Form** : User info page
  ![form](https://github.com/user-attachments/assets/394e9eea-d0f4-43e2-b852-9dc8f70bf487)
- 📜 **Sum** : A service offering immigration guidance, skill-based job matching, networking support, skill evaluation, and insights into North American job hunting.
    - **Customized immigration programs.**
    - **Skill-matching for North American job opportunities.**
    - **Social networking assistance.**
    - **Feedback on skill gaps with actionable advice.**
    - **Educational resources on the North American job hunting process.**
    ![sum](https://github.com/user-attachments/assets/d3c38bb2-1113-4f0d-91ee-3a85176adbfd)

<br></br>

## 📂 Project Structure

```
.
├── backend        # Django backend project folder
│   └── search_api # Search API app
│
├── docker_nginx   # Docker Nginx folder
│   └── Dockerfile # An OS image
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

## Backend

### Python Installation

1. **Install the Python version specified in `/.python-version`:**
   ```bash
   pyenv install 3.11.9
   ```

2. **Set up a virtual environment:**
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows, use .venv\Scripts\activate
   ```

3. **Install dependencies**: Installed via requirements.txt:
    ```bash
    pip install -r requirements.txt
    ```
    - Django~=5.1.4
    - djangorestframework~=3.15.2
    - python-dotenv~=1.0.1
    - requests~=2.32.3
    - openai~=1.58.1

### Run


1. **Navigate to the backend folder**:
   ```bash
   cd backend
   ```

2. **Set environment variables**:
   **1. Create a .env file to manage sensitive data and configurations:**
     ```bash
     cp .env.example .env
     ```
   **2. Open the .env file and add the following:**
      ```bash
      # Create an .env_local file using the following as a guide
      TAVILY_API_KEY=your-api-key-here
      OPENAI_API_KEY=your-api-key-here
      OPENAI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai/
      OPENAI_LLM_MODEL=gemini-2.0-flash-exp
      ```
   **3. Add your API keys and configurations:**
     - **TAVILY_API_KEY**: Obtain from [Tavily](https://tavily.com/).
     - **OPENAI_API_KEY**: Obtain from [Google AI Studio](https://aistudio.google.com/apikey).

3. **Run the server:**
   ```bash
   python manage.py runserver 0.0.0.0:8002
   ```

4. **Endpoints:**
   - **Home**: [http://127.0.0.1:8002/](http://127.0.0.1:8002/)
   - **Search API**: [http://127.0.0.1:8002/api/search](http://127.0.0.1:8002/api/search)

### 🐋 Dockerized Nginx Deployment

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

## Frontend

1. **Navigate to the frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set environment variables:**
    **1. Copy .env.example to .env.**
      ```bash
       cp .env.example .env
      ```
      
    **2. Open .env and replace placeholder values with actual API keys:**
      ```bash
      REACT_APP_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
      ```

4. **Start the development server:**
   ```bash
   npm start
   ```

<br></br>

## 🤖 Integrations

- **Tavily API**:
  - Use Tavily API for location-based insights and immigration-related searches.
- **Gemini 2.0 API**:
  - Use Google Gemini 2.0 for advanced AI-based recommendations.
- **Google Map Platform API**:
  - Use Google Maps API for location-based services.

<br></br>

## 📐 Pioneer Architecture
![image](https://github.com/user-attachments/assets/969540ce-5102-4edb-b7be-516bfee6641a)
