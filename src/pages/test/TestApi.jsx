import React, { useRef } from 'react'
import { fetchBakeries } from '../../apis/bakeryApi'
import './TestApi.style.scss'

/**
 * API 테스트 영역
 * 
 * @returns 
 */
const TestApi = () => {
  const wrapRef = useRef();

  /**
   * 빵집 목록 조회
   */
  const testFetchBakeries = async () => {
    const response = await fetchBakeries()
        , data = await response?.data;

    wrapRef.current.textContent = JSON.stringify(data);
  }
  
  const clickSelectListHandler = () => {
    testFetchBakeries();
  }

  return (
    <>
      <div className="TestApi">
        <h1>API 테스트 영역</h1>
        <div className="TestApi__item">
          <h2>빵집 전체 목록 조회</h2>
          <div className="TestApi__item-result">
            <div className="btn__box">
              <button
                type="button" 
                className="btn btn__sub"
                onClick={ clickSelectListHandler }
              >
                API 호출
              </button>
              <p className="result__api" ref={ wrapRef }></p>
            </div>
          </div>
        </div>
        <div className="TestApi__item">
          <h2>빵집 추가</h2>
          <div className="TestApi__item-result">
            <div className="btn__box">
              <button
                type="button" 
                className="btn btn__sub"
              >
                API 호출
              </button>
              <p className="result__api" ref={ wrapRef }></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TestApi