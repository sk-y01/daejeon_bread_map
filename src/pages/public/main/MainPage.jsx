import { useEffect, useState } from "react"
import { MdOutlineSearch, MdPersonOutline, MdArrowBackIosNew, MdArrowForwardIos, MdOutlineList, MdClose } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { fetchBakeries } from "../../../apis/bakeryApi"
import BakeryMap from "../../../components/bakery/BakeryMap"
import BakeryList from "../../../components/bakery/BakeryList"        
import BakeryDetail from "../../../components/bakery/BakeryDetail"


const MainPage = () => {
  const [keyword, setKeyword] = useState('');
  const [bakeries, setBakeries] = useState([]);
  const [filterBakeries, setFilterBakeries] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isSectionVisible, setIsSectionVisible] = useState(true);
  const [selectedBakeryId, setSelectedBakeryId] = useState(null);
  const [selectedBakery, setSelectedBakery] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
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

  const pageEnterHandler = () => {
    // TODO : 현재 서버 쪽 로그인 기능 오류로 인한 주석 처리 (테스트 완료 후 주석 해제 예정)
    // const item = localStorage.getItem('user')

    // if (!item) {
    //   navigate('/login')
    // } else {
    //   navigate('/admin')
    // }
    navigate('/admin')
  }

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

  // Search Close 버튼 검색 초기화
  const handleResetSearch = () => {
    setKeyword('');
    setSearchKeyword('');
  };
  
  // BakeryItem Click Handler 정의 
  // BakeryList prop로 전달
  // BakeryItem prop로 전달 
  const handleBakeryClick = (bakery) => {
    setSelectedBakery(bakery);
    setSelectedBakeryId(bakery._id);
    setIsDetailOpen(true);
  };
  
  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedBakeryId(null);
    setSelectedBakery(null);
  }

  return (
    <div className="main-page">
      <section className={ isSectionVisible ? 'main-page__section' : 'main-page__section active' }>
        <div className="main-page__section__inner">
          <div className="main-page__search">
            <div className="search__input"> 
              <MdOutlineSearch />
              <input 
                type="text" 
                name="searchInput" 
                id="searchInput" 
                value={ keyword }
                onChange={ onChangeSearch }
                onKeyDown={ searchEnterHandler } 
                autoComplete="off" 
                placeholder="대전 빵집 찾기" 
              />
              <button 
                type="button"
                onClick={ handleResetSearch }
              >
                <MdClose />
              </button>
            </div>
            {/* <div className="main-page__cate">
              <div className="Design__button">
                <button type="button" className="btn btn__sub--rounded">식빵</button>
                <button type="button" className="btn btn__light--rounded">케이크</button>
                <button type="button" className="btn btn__light--rounded">페스츄리</button>
                <button type="button" className="btn btn__light--rounded">휘낭시에</button>
                <button type="button" className="btn btn__light--rounded">치아바타</button>
              </div>
            </div> */}
          </div>
          <div className={ isDetailOpen ? 'main-page__content hidden' : 'main-page__content' }> 
            <div className="main-page__content__inner">
              <BakeryList 
                key={searchKeyword} // searchKeyword 변경 시 컴포넌트 리마운트로 페이지 자동 리셋
                filterBakeries={ filterBakeries } 
                searchKeyword={ searchKeyword }
                onBakeryClick={ handleBakeryClick }
              />
            </div>
          </div>
        </div>
      </section>
      { 
        isDetailOpen && (
          <BakeryDetail 
            bakery={ selectedBakery }
            onClose={ handleCloseDetail }
            isSectionVisible={ isSectionVisible }
          />
        )
      }
      <div className={ 
        'main-page__more' + ' ' +
        (isSectionVisible ? '' : 'active') + ' ' +
        (isDetailOpen ? 'main-page__more--detail-open' : '') 
        }
      >
        <button 
          type="button" 
          className="btn btn__toggle"
          onClick={ toggleVisible }
        >
          {isSectionVisible ? <MdArrowBackIosNew />: <MdArrowForwardIos />}
        </button>
      </div>
      
      <div className="main-page__button">
        <button 
          type="button" 
          className="floatingBtn btn__loginBtn"
          onClick={ pageEnterHandler }
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
      
      <div className="main-page__map">
        <BakeryMap 
          onBakeryClick={ handleBakeryClick }
        />
      </div>
    </div>
  )
}

export default MainPage