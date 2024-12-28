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
```shell
python manage.py runserver
```

* Home: http://127.0.0.1:8000/
* 게시판: http://127.0.0.1:8000/board
* 게시판API: http://127.0.0.1:8000/board/api

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

### TODO DB 설정 방법
