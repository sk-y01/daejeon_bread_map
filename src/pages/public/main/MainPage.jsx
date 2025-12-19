import { useEffect, useState } from "react"
import { MdOutlineSearch, MdPersonOutline, MdArrowBackIosNew, MdArrowForwardIos, MdOutlineList } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { fetchBakeries } from "../../../apis/bakeryApi"
import BakeryMap from "../../../components/bakery/BakeryMap"
import BakeryList from "../../../components/bakery/BakeryList"        


const MainPage = () => {
  const [keyword, setKeyword] = useState('');
  const [bakeries, setBakeries] = useState([]);
  const [filterBakeries, setFilterBakeries] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isSectionVisible, setIsSectionVisible] = useState(true);
  
  const navigate = useNavigate();

  const onChangeSearch = (e) => {
    setKeyword(e.target.value);
  }

  const searchEnterHandler = (e) => {
    if(e.key === "Enter") {
      e.preventDefault()
      setSearchKeyword(keyword)
    }
  };

  // 로직 구성
  // 1. 최초 list 호출
  useEffect(() => {
    const getBakeries = async() => {
      const response = await fetchBakeries();
      const data = await response?.data || [];
      setBakeries(data);
    }
    
    getBakeries();
  }, []);
  // 2. 키워드가 입력 후, 엔터 키 누를 시 filter 적용
  useEffect(() => {
    // 데이터가 로드되지 않을 시
    if (bakeries.length === 0) return;

    if (searchKeyword.trim() === '') {
      // 검색 키워드가 없을 시 전체 목록 표시
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFilterBakeries(bakeries)
    } else {
      // 키워드 있으면 필터 적용
      const filtered = bakeries.filter(bakery => bakery.name.includes(searchKeyword))
      setFilterBakeries(filtered)
    }
  }, [bakeries, searchKeyword]);
  
  
  // 1. 더보기 닫기
  // 2. 닫기 버튼 클릭 시 section 영역 display:none 
  const toggleVisible = () => {
    setIsSectionVisible(!isSectionVisible); 
  }

  // Header active 클래스 추가/제거
  // isSetionVisivle 상태를 의존성 배열에 추가
  useEffect(() => {
    const header = document.querySelector('.header');
    if(!header) return;

    if(!isSectionVisible) {
      header.classList.add('active');
    } else {
      header.classList.remove('active');
    }
  }, [isSectionVisible]);

  return (
    <div className="main-page">
      <section className={isSectionVisible ? 'main-page__section' : 'main-page__section active'}>
        <div className="main-page__search">
          <div className="search__input"> 
            <MdOutlineSearch />
            <input 
              type="text" 
              name="searchInput" 
              id="searchInput" 
              value={keyword}
              onChange={onChangeSearch}
              onKeyDown={searchEnterHandler} 
              autoComplete="off" 
              placeholder="대전 빵집 찾기" 
            />
          </div>
          <div className="main-page__cate">
            <div className="Design__button">
              <button type="button" className="btn btn__sub--rounded">식빵</button>
              <button type="button" className="btn btn__light--rounded">케이크</button>
              <button type="button" className="btn btn__light--rounded">페스츄리</button>
              <button type="button" className="btn btn__light--rounded">휘낭시에</button>
              <button type="button" className="btn btn__light--rounded">치아바타</button>
            </div>
          </div>
        </div>
        <div className="main-page__content">
          <div className="main-page__content__inner">
            <BakeryList 
              filterBakeries={ filterBakeries } 
              searchKeyword={ searchKeyword }
            />
          </div>
        </div>
      </section>
      <div className="main-page__button">
        <button 
          type="button" 
          className="floatingBtn btn__loginBtn"
          onClick={() => navigate('/login')}
        >
          <MdPersonOutline />
          <span>로그인</span>
        </button>
        <button 
          type="button" 
          className="floatingBtn btn__mypageBtn"
          onClick={() => navigate('/')}
        >
          <MdOutlineList />
          <span>마이페이지</span>
        </button>
      </div>
      <div className={isSectionVisible ? 'main-page__more' : 'main-page__more active'}>
          <button 
            type="button" 
            className="btn btn__toggle"
            onClick={ toggleVisible }
          >
            {isSectionVisible ? <MdArrowBackIosNew />: <MdArrowForwardIos />}
          </button>
        </div>
      <div className="main-page__map">
        <BakeryMap />
      </div>
    </div>
  )
}

export default MainPage