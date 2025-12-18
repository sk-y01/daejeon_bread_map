# addEventListener 옵션 `once` 정리
## 🤔 왜 `once`를 쓰는가?

아래 코드를 예로 보자.

```js
closeBtn?.addEventListener(
  'click',
  () => overlay.setMap(null),
  { once: true }
);
```

이 코드는 **마커 클릭 → 커스텀 오버레이 열릴 때마다 실행**된다.

---

## ❌ `once`를 쓰지 않았을 때 발생하는 문제

### 실행 흐름
1. 마커 클릭 → 오버레이 열림  
   → `addEventListener` 등록  
2. 다시 마커 클릭 → 오버레이 다시 열림  
   → `addEventListener` 또 등록  
3. 닫기 버튼 클릭  

### 결과
- 클릭 한 번에 이벤트 핸들러가 **여러 번 실행**
- `overlay.setMap(null)` 또는 `navigate()`가 중복 호출
- 이벤트 리스너가 계속 쌓여 **메모리 누수**
- 예기치 않은 동작 발생 가능

```js
// ❌ 나쁜 예
marker 클릭 → overlay open
→ addEventListener
marker 클릭 → overlay open
→ addEventListener (중복)
```

---

## ✅ `once: true`를 사용하면?

```js
element.addEventListener('click', handler, { once: true });
```

### 의미
- 이벤트가 **한 번 실행되면**
- 브라우저가 **자동으로 removeEventListener 처리**
- 다음에 오버레이가 열릴 때는 **새 이벤트 리스너 1개만 다시 등록**

### 실행 흐름
1. 마커 클릭 → 오버레이 열림 → 이벤트 등록
2. 닫기 버튼 클릭 → 이벤트 실행
3. 이벤트 리스너 **자동 제거**
4. 다시 오버레이 열림 → 새 리스너 1개 등록

---

## 🧠 addEventListener 옵션 정리

| 옵션 | 의미 |
|----|----|
| `{ once: true }` | 이벤트를 **1회 실행 후 자동 제거** |
| `{ passive: true }` | `preventDefault()` 사용 불가 (스크롤 성능 최적화) |
| `{ capture: true }` | 캡처 단계에서 이벤트 수신 |

---

## ✅ `once`를 쓰기 좋은 대표적인 경우

아래 상황에서는 **거의 필수**에 가깝다.

- 모달 닫기 버튼
- 커스텀 오버레이 닫기 버튼
- 임시 DOM에 이벤트 바인딩
- “열릴 때마다 새로 생성되는 UI”
- 지도 마커 클릭 후 표시되는 팝업/오버레이

---

## ✨ 한 줄 요약

`once: true`는

> **“이 이벤트는 딱 한 번만 실행하고, 실행 후 자동으로 제거해라”**

라는 의미이며,

> **커스텀 오버레이처럼 DOM이 반복 생성되는 구조에서는  
이벤트 중복과 메모리 누수를 막기 위한 핵심 옵션**이다.