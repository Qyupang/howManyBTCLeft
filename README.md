# [howManyBTCLeft](https://Qyupang.github.io/howManyBTCLeft/)

> Open API를 활용한 비트코인 채굴량과 남은 수량을 차트를 이용하여 표현한 웹 사이트입니다

![구현한 화면](./how_many_btc_left/src/img/redPill.gif)
![구현한 화면](./how_many_btc_left/src/img/bluePill.gif)

## 목표

---

클론 코딩을 통해 학습한 프론트엔드 기술을 활용하여 Open API를 활용한 웹사이트 제작하기

## 구현한 내용

---

> coinpaprika와 EconDB의 api, chart.js api를 활용하여 페이지를 구성하였습니다.

1. canvas를 이용하여 메인페이지와 로딩 페이지를 구성하였습니다.

2. coinpaprika api를 이용하여 비트코인 전체 수량, 채굴된 수량에 대한 정보를 가져왔습니다.

3. EconDB api를 이용하여 지난 20년간 달러 본원통화 발행량에 대한 정보를 가져왔습니다.

4. chart.js api를 활용하여 채굴된 수량과 남은 수량을 파이 차트로 표현하였습니다. 또한 본원통화 발행량 또한 선 차트로 표현하였습니다.

## 학습한 내용

---

- Open api를 이용하여 데이터를 전송받아 처리하는 방법을 배울 수 있었습니다.
- canvas를 react에서 사용하는 방법을 배울 수 있었습니다.
- API를 통해 정보를 가져오기 위해 API문서를 읽어보며 필요한 정보만을 가져와 이용하는 경험을 할 수 있었습니다.

## 아쉬웠던 점

---

- Fred에서 정보를 가져오고자 노력하였으나 CORS 오류를 해결하지 못하고 결국 다른 사이트의 API를 활용하여 정보를 가져왔습니다.
