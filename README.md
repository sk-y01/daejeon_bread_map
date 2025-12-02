# 대전 빵 지도
## 기간
* **설계 :** 2025.11.27 ~ 


## 참여 인원
* 박수림
* 이정재
* 이하늘


## 기술 스택
* **Front-End**
  - React.js
  - SCSS
  - Axios

* **Back-End**
  - Java (Spring Boot) or Node.js (Express.js)

* **Database**
  - MongoDB


## 폴더 구조

> **반드시** 아래 폴더 구조를 지켜주세요 !

```javascript
public
src
ㄴ assets             // 정적 파일들 (ex... font, images 등)
ㄴ components         // 공통 컴포넌트 (화면 내 어디든 사용 될 때 ... 관리자든 사용자든)
ㄴ layouts            // 레이아웃 (일반, 관리자 레이아웃)
  ㄴ public           // ㄴ 일반
  ㄴ admin            // ㄴ 관리자
ㄴ pages              // 페이지들 (각 라우터 적용한 페이지들)
  ㄴ public           // ㄴ 일반
    ㄴ components     //  ㄴ 컴포넌트 (여긴 일반 화면 관련돤 컴포넌트들 정의)
  ㄴ admin            // ㄴ 관리자
    ㄴ components     //  ㄴ 컴포넌트 (여긴 관리자 화면 관련돤 컴포넌트들 정의)
ㄴ utils              // 유틸 (ex ... 날짜 변환 등)
ㄴ apis               // API
App.css
App.jsx
index.css
main.jsx
.gitignore
eslint.config.js
index.html
package-lock.json
package.json
README.md
vite.config.js
```


## 브랜치
* main
* develop (개발용)
* jjlee
* srpark
* hnlee


## 코딩 컨벤션
**CODING_CONVENSION.md** 파일 참조