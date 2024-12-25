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

### python 가상환경 설정
```shell
python -m venv .venv
source .venv/bin/activate
```

### TODO DB 설정 방법
