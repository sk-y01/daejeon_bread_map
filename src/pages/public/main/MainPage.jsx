import { useEffect, useState } from "react"
import BakeryMap from "../../../components/bakery/BakeryMap"
import BakeryList from "../../../components/bakery/BakeryList"        
import { MdOutlineSearch, MdPersonOutline, MdArrowBackIosNew } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { fetchBakeries } from "../../../apis/bakeryApi"


const MainPage = () => {
  const [keyword, setKeyword] = useState('');
  const [bakeries, setBakeries] = useState([]);
  const [filterBakeries, setFilterBakeries] = useState([]);
  
  const navigate = useNavigate();

  const onChangeSearch = (e) => {
    setKeyword(e.target.value);
  }

  const searchEnterHandler = (e) => {
    if(e.key === "Enter") {
      const filterBakeries = bakeries.filter(bakery => bakery.name.includes(keyword)); 
      setFilterBakeries(filterBakeries);
    }
  };

  useEffect(() => {
    const getBakeries = async() => {
      const response = await fetchBakeries();
      const data = await response?.data || [];
      setBakeries(data);
    }
    getBakeries();
  }, []);


  return (
    <div className="main-page">
      <section className="main-page__section">
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
            <BakeryList filterBakeries={filterBakeries} />
          </div>
        </div>
        <div className="main-page__more">
          <button type="button" className="btn btn__close"><MdArrowBackIosNew /></button>
        </div>
        <div className="main-page__loginBtn">
          <button 
            type="button" 
            className="btn btn__loginBtn"
            onClick={() => navigate('/login')}
          >
            <MdPersonOutline />
            <span>로그인</span>
          </button>
        </div>
      </section>
      <div className="main-page__map">
        <BakeryMap />
      </div>
    </div>
  )
}

export default MainPage