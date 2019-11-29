# lib implements Server

[https://github.com/ziponia/lib](https://github.com/ziponia/lib) 를 구현 한 예시 서비스 입니다.

example link [https://fe.ziponia.com/](https://fe.ziponia.com/)

utility-server
- Spring boot
- gradle

utility-web
- create-react-app

# Getting Start

이 저장소를 다운받으세요.

```
$ git clone https://github.com/ziponia/lib-server.git
```

이 저장소의 환경 변수를 알맞게 설정 하세요.

String boot 의 환경변수는 이 곳에 있습니다.

`utility-server/src/main/resources/application.yml`

FrontEnd 의 환경변수는 이 곳에 있습니다.

`utility-web/.example.env`

.example.env 파일을 .env 로 변경하세요.

```
$ cd utiliity-web
$ mv .example.env .env
```

이제 다 끝났습니다!

react 에 필요 한 패키지를 설치 한 다음 실행 해주세요.

```
$ yarn
$ yarn start
```

서버를 부팅 해주세요.

```
$ cd ../utility-server
$ gradle bootRun
```

http://localhost:3000 으로 접속 하면 모두 끝납니다!

Swagger 로 정리되어있는 문서를 [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html) 에서 볼 수 있습니다.
