import { MdOutlineSearch } from "react-icons/md"

const DesignPage = () => {
  return (
    <div className="Design">
      <div className="inner">
        <h1>이 페이지는 디자인 페이지입니다.</h1>
        <p>아래의 디자인은 공통 디자인이므로 반드시 아래의 클래스와 요소들을 사용해주시길 바랍니다.</p>
        <hr />
        <h2>Input</h2>
        {/* input 요소들 */}
        <div className="Design__input" style={{ padding: '2rem 0' }}>
          <div style={{ marginTop: '1rem' }}>
            <input 
              type="text" 
              name="textInput" 
              id="textInput" 
              placeholder="텍스트 입력" 
              autoComplete="none" 
            />
          </div>
          <div style={{ marginTop: '1rem' }}>
            <input type="password" name="passwordInput" id="passwordInput" placeholder="비밀번호 입력" />
          </div>
          <div style={{ marginTop: '1rem' }}>
            <div className="icon__input">
              <MdOutlineSearch />
              <input type="text" name="searchInput" id="searchInput" autoComplete="none" placeholder="검색 시 사용" />
            </div>
          </div>
        </div>
        <hr />
        <h2>Button</h2>
        <div className="Design__button" style={{ padding: '2rem 0' }}>
          <div>
            <button type="button" className="btn btn__sub--rounded">식빵</button>
            <button type="button" className="btn btn__sub">식빵</button>
            <button type="button" className="btn btn__light--rounded">식빵</button>
            <button type="button" className="btn btn__light">식빵</button>
          </div>
        </div>
        <hr />
      </div>
    </div>
  )
}

export default DesignPage