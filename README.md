# Test

## 프로젝트 구조
```
.
ㄴ backend # django
  ㄴ board # 게시판앱
  ㄴ board_api # 게시판 API앱
ㄴ frontend # react
  ㄴ build/static/ # react build 파일
```

## 로컬 실행 방법
```shell
python manage.py runserver
```

Home: http://127.0.0.1:8000/
게시판: http://127.0.0.1:8000/board
게시판API: http://127.0.0.1:8000/board/api

## 초기 설정 방법

### python 가상환경 설정
```shell
python -m venv .venv
source .venv/bin/activate
```

### TODO DB 설정 방법
