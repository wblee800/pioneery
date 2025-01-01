# Test

## 프로젝트 구조
```
.
├── backend        # Django 백엔드 프로젝트 폴더
│   ├── board      # 게시판 앱
│   └── board_api  # 게시판 API 앱
└── frontend       # React 프론트엔드 프로젝트 폴더
    └── build
        └── static # React 빌드된 정적 파일
```

## 로컬 실행 방법

### backend
```shell
python manage.py runserver 0.0.0.0:8002
```

* Home: http://127.0.0.1:8002/
* 게시판: http://127.0.0.1:8002/board
* 게시판API: http://127.0.0.1:8002/board/api

#### backend/.env_local 설정
`/backend/.env_local.example` 참고해서 `/backend/.env_local` 파일 만들어서 apikey 등 설정

##### tavily 설정
https://tavily.com/ 에서 apikey 발급 받고, `/backend/.env_local` 파일에 TAVILY_API_KEY 설정

단순한 tavily 검색 테스트 API
```
GET http://127.0.0.1:8002/api/search/?q=캐나다이민
```

#### gemini 설정

https://aistudio.google.com/apikey 에서 gemini apikey 발급 받고, `/backend/.env_local` 파일에 GEMINI_API_KEY 설정


### frontend
```shell
cd frontend
npm install
npm start
```

## 초기 설정 방법

### python 설치
> /.python-version 파일에 명시된 버전으로 설치
> 3.11.9 버전으로 설치 예시

```shell
pyenv install 3.11.9
```

### python 가상환경 설정
```shell
python -m venv .venv
source .venv/bin/activate
```

### 의존성 설치
```shell
pip install -r requirements.txt
```

### migration 적용
모델 변경사항을 감지하고 데이터베이스에 적용할 수 있는 마이그레이션 파일 생성 후 마이그레이션 파일을 실제 데이터베이스에 적용
```shell
python manage.py makemigrations
python manage.py migrate
```
