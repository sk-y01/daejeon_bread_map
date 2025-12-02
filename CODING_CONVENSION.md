# 대전 빵 지도 - 코딩 컨벤션

이 문서는 **대전 빵 지도(Daejeon Bread Map)** 프로젝트에서 사용하는  
프론트엔드(React.js) / 백엔드(Spring Boot) 공통 코딩 컨벤션을 정의한다.

---

## 들어가기 전
### 코딩 컨벤션이란 ?
**“코드를 어떻게 쓸지에 대한 팀의 약속”**

### 왜 중요한가 ?
* 가독성 향상
  - 다른 사람이 봐도 “이 팀 코드 스타일이구나” 하고 바로 익숙해짐.

* 유지보수 쉬움
  - 사람마다 스타일이 제각각이면, 수정할 때 이해부터 시간이 오래 걸림.

* 협업 효율↑
  - 코드 리뷰에서 “들여쓰기”, “이름 이상함” 같은 얘기 줄어들고, 진짜 로직/설계에 집중할 수 있음.

* 버그 감소
  - 일관된 패턴, 에러 처리 방식 등을 정해두면 실수가 줄어듦.

---

## 0. 전체 원칙
- **일관성 > 개인 취향**
  - 한 번 정한 규칙은 프론트, 백엔드 모두 최대한 지킨다.
- **자동화 도구 적극 활용**
  - 프론트엔드: ESLint + Prettier
  - 백엔드: IDE Code Style + (선택) Checkstyle
- **네이밍은 영어 사용**
  - DB 필드, 변수, 함수, 클래스 등은 모두 영어로 작성한다.
  - 한글은 UI 텍스트/데이터 값에만 사용한다.

---

## 1. 공통 규칙
### 1.1 Git 브랜치 전략

- 기본 브랜치: `main`
- 기능 브랜치: `feature/기능명`
  - 예: `feature/bakery-list`, `feature/auth`, `feature/review-write`
- 버그 수정 브랜치: `fix/버그명`
  - 예: `fix/login-token-expire`

### 1.2 커밋 메시지 규칙

형식:

```text
<타입>: <간단 설명>

타입:
- feat     : 새로운 기능
- fix      : 버그 수정
- refactor : 리팩토링 (기능 변화 없음)
- docs     : 문서 변경
- style    : 코드 스타일 변경 (포맷, 세미콜론 등)
- chore    : 빌드/설정/기타 잡다한 작업

예시:
feat: 빵집 목록 검색 기능 추가
fix: 로그인 토큰 만료 처리 버그 수정
refactor: 리뷰 평균점수 계산 로직 정리
docs: 코딩 컨벤션 문서 추가
```

---

## 2. 프론트엔드 코딩 컨벤션 (React + Redux + SCSS + Axios, JS 기준)
### 2.1 디렉터리 & 파일 네이밍

* 컴포넌트 파일: PascalCase + .jsx
  - BakeryCard.jsx, BakeryListPage.jsx, Header.jsx

* 일반 JS 모듈(훅/유틸/API 등): camelCase + .js
  - useBakeryFilter.js, formatDate.js, storage.js, bakeryApi.js

* 스타일 파일(SCSS): kebab-case + .scss
  - _bakery-card.scss, _header.scss, _home.scss

예상 구조:

```text
src/
  api/
    axiosInstance.js
    bakeryApi.js
    authApi.js
    reviewApi.js
  components/
    common/
      Header.jsx
      Footer.jsx
      Layout.jsx
      Pagination.jsx
      Modal.jsx
      Spinner.jsx
    bakery/
      BakeryCard.jsx
      BakeryFilter.jsx
      BakeryList.jsx
      BakeryMap.jsx
      BakeryDetailInfo.jsx
      ReviewList.jsx
      ReviewForm.jsx
    user/
      LoginForm.jsx
      RegisterForm.jsx
      ProfileInfo.jsx
  pages/
    HomePage.jsx
    BakeryListPage.jsx
    BakeryDetailPage.jsx
    LoginPage.jsx
    RegisterPage.jsx
    MyPage.jsx
    NotFoundPage.jsx
  store/
    index.js
    slices/
      authSlice.js
      bakerySlice.js
      uiSlice.js
  styles/
    base/
      _reset.scss
      _variables.scss
      _mixins.scss
    components/
      _header.scss
      _bakery-card.scss
    pages/
      _home.scss
      _bakery-list.scss
    main.scss
  router/
    AppRouter.jsx
  utils/
    storage.js
    format.js
  App.jsx
  main.jsx
```

### 2.2 코드 스타일 (ESLint + Prettier)
* 세미콜론 `;` 사용
* 문자열은 기본적으로 작은따옴표 `'` 사용
* 들여쓰기: `2 spaces`
* JSX에서 prop 순서:
  - 기본 HTML 속성 (id, className, style 등)
  - 데이터 관련 prop (bakery, reviews, filters 등)
  - 이벤트 핸들러 (onClick, onChange 등)

### Prettier 예시 (.prettierrc)

```json
{
  "singleQuote": true,
  "semi": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 100,
  "arrowParens": "always"
}
```

### 2.3 React 컴포넌트 규칙
* **함수형 컴포넌트**만 사용 (Class 컴포넌트 사용 X)
* 파일당 대표 컴포넌트 1개를 export 한다.
* 컴포넌트 이름은 PascalCase 사용.
* props / state는 의미가 명확한 이름 사용.

```jsx
// ✅ Good
function BakeryCard({ bakery, isFavorite, onToggleFavorite }) {
  const handleFavoriteClick = () => {
    onToggleFavorite(bakery.id);
  };

  return (
    <article className="bakery-card">
      <h3 className="bakery-card__name">{bakery.name}</h3>
      <p className="bakery-card__address">{bakery.address}</p>
      <button
        type="button"
        className={`bakery-card__favorite ${isFavorite ? 'is-active' : ''}`}
        onClick={handleFavoriteClick}
      >
        {isFavorite ? '★' : '☆'}
      </button>
    </article>
  );
}

export default BakeryCard;
```

#### 핸들러 네이밍
* 내부 함수: handle + 동사/행위
* 상위에서 내려보낸 props: on + 동사/행위

```jsx
function BakeryFilter({ filters, onChangeFilters }) {
  const handleKeywordChange = (e) => {
    onChangeFilters({ ...filters, keyword: e.target.value });
  };

  // ...
}
```

#### 조건부 렌더링
* 삼항 연산자 중첩 X
  - 복잡해지면 미리 변수로 분리해서 사용.


### 2.4 Redux 컨벤션 (Redux Toolkit 기준)
* slice 파일 이름: 도메인명 + Slice.js
  - authSlice.js, bakerySlice.js, uiSlice.js

* slice 이름(name): 도메인 단수형
  - 'auth', 'bakery', 'ui'

#### state 예시 (bakerySlice)

```javascript
const initialState = {
  list: [],
  selectedBakery: null,
  filters: {
    keyword: '',
    district: 'ALL',
    type: 'ALL',
    minRating: 0,
    isOpen: false,
  },
  mapBounds: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};
```

##### 비동기 Thunk 네이밍
* `fetch/create/update/delete + 명사`

```javascript
export const fetchBakeries = createAsyncThunk(
  'bakery/fetchBakeries',
  async (params, thunkAPI) => {
    try {
      const response = await bakeryApi.fetchBakeries(params);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch bakeries');
    }
  },
);
```


### 2.5 Axios & API 컨벤션
* 공통 인스턴스: api/axiosInstance.js
* 모든 API 모듈은 이 인스턴스만 사용한다.

```javascript
// api/axiosInstance.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

#### API 함수 네이밍: 동사 + 명사

```javascript
// api/bakeryApi.js
import api from './axiosInstance';

export function fetchBakeries(params) {
  return api.get('/bakeries', { params });
}

export function fetchBakeryDetail(id) {
  return api.get(`/bakeries/${id}`);
}

export function toggleFavorite(id) {
  return api.post(`/bakeries/${id}/favorite`);
}
```

* API 모듈에서는 에러를 그대로 던지고(`throw`), UI단(페이지/컴포넌트)에서 처리한다.


### 2.6 SCSS / 스타일 컨벤션
* **BEM 네이밍 규칙** 사용

```scss
.bakery-card {
  padding: 16px;
  border-radius: 8px;
  background-color: #fff;

  &__name {
    font-weight: 700;
    margin-bottom: 4px;
  }

  &__address {
    font-size: 14px;
    color: #777;
  }

  &__favorite {
    border: none;
    background: transparent;
    cursor: pointer;

    &.is-active {
      color: #ff7e6b;
    }
  }
}
```

* 컬러, 폰트, 공통 값은 변수로 관리

```scss
// styles/base/_variables.scss
$color-primary: #ff7e6b;
$color-secondary: #ffbfa9;
$color-gray-700: #555;
$font-main: 'Pretendard', system-ui, -apple-system;
```

* 중첩은 **3단계 이내**로 제한한다.


### 2.7 주석/문서화
* “뭐 하는 코드인지”보다 “왜 이렇게 했는지” 위주로 주석 달기
* 함수/메소드에는 가능하면 짧은 설명:

```javascript
/**
 * 유저 목록을 서버에서 조회한다.
 * 실패 시 에러를 던진다.
 */
async function fetchUsers() { ... }
```

* TODO, FIXME 태그 사용:

```javascript
// TODO: 페이지네이션 추가
// FIXME: 임시로 하드코딩한 부분, API 완성되면 수정
```