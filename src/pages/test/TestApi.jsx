import React, { useRef } from 'react'
import { fetchBakeries } from '../../apis/bakeryApi'
import axios from 'axios';
import './TestApi.style.scss'

/**
 * API 테스트 영역
 * 
 * @returns 
 */
const TestApi = () => {
  const wrapRef = useRef()
      , detailRef = useRef()
  const LOCAL_URL = import.meta.env.VITE_LOCAL_URL + '/api';

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

  /**
   * 빵집 상세 조회
   */
  const testFetchDetailBakery = async () => {
    const frm = document.forms[0]
        , search = frm[0].value
    const response = await axios.get(LOCAL_URL + `/bakeries/${search}`)
        , data = await response?.data || {}

    detailRef.current.textContent = JSON.stringify(data)
  }

  const clickDetailHandler = (e) => {
    e.preventDefault();

    testFetchDetailBakery();
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
          <h2>빵집 상세 조회</h2>
          <div className="TestApi__frm">
            <form action="">
              <div className="">
                <input 
                  type="text" 
                  name="testId" 
                  id="testId"
                  placeholder="_id를 입력하세요"
                />
                <button
                  type="submit" 
                  className="btn btn__sub"
                  onClick={ clickDetailHandler }
                >
                  API 호출
                </button>
              </div>
            </form>
          </div>
          <div className="TestApi__item-result">
            <div className="btn__box">
              <p className="result__api" ref={ detailRef }></p>
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
              <p className="result__api"></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TestApi