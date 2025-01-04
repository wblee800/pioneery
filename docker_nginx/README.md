# docker nginx
react server 에서 django server 로 proxy 설정 하는 경우 streaming 처리가 제대로 동작하지 않아서 (처리 완료 후 한번에 response 됨) nginx 를 사용하여 proxy 설정

## 빌드 및 실행
```shell
docker-compose up --build
```

## 백그라운드 실행
```shell
docker-compose up -d
```

http://localhost

## 중지
```shell
docker-compose down
```