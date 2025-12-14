import { Suspense } from "react"
import LoadingSpinner from "../../../components/loading/LoadingSpinner"
import BakeryMap from "../../../components/bakery/BakeryMap"
import { MdOutlineSearch } from "react-icons/md"
import BakeryList from "../../../components/bakery/BakeryList"

const MainPage = () => {
  return (
    <div className="main-page">
      <section className="main-page__section">
        <div className="main-page__search">
          <div className="search__input"> 
            <MdOutlineSearch />
            <input type="text" name="searchInput" id="searchInput" autoComplete="none" placeholder="대전 빵집 찾기" />
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
            <BakeryList />
          </div>
        </div>
      </section>
      <div className="main-page__map">
        <BakeryMap />
      </div>
    </div>
  )
}

export default MainPage