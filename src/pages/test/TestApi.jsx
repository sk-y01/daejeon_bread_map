import React, { useRef } from 'react'
import { 
  testFetchBakeries, 
  testFetchDetailBakery,
  testFetchUserList,
  testFetchDeleteBakeryList
} from '../../utils/test/testApiList'
import './TestApi.style.scss'
import { useNavigate } from 'react-router-dom'

/**
 * API 테스트 영역
 * 
 * @returns 
 */
const TestApi = () => {
  const wrapRef = useRef()
      , detailRef = useRef()
      , userListRef = useRef()
      , removeRef = useRef()
  const navigate = useNavigate()

  /**
   * 빵집 전체 목록 조회 이벤트 핸들러
   */
  const clickSelectListHandler = async () => {
    const result = await testFetchBakeries();

    wrapRef.current.textContent = JSON.stringify(result);
  }
  /**
   * 빵집 상세 조회 이벤트 핸들러
   */
  const clickDetailHandler = async (e) => {
    e.preventDefault();

    const result = await testFetchDetailBakery()

    detailRef.current.textContent = JSON.stringify(result);
  }
  /**
   * 사용자 목록 조회 이벤트 핸들러
   */
  const clickFetchUserListHandler = async () => {
    const result = await testFetchUserList();

    userListRef.current.textContent = JSON.stringify(result);
  }

  /**
   * 빵집 삭제 이력 조회 이벤트 핸들러
   */
  const clickRemoveHistoryHandler = async () => {
    const result = await testFetchDeleteBakeryList();

    removeRef.current.textContent = JSON.stringify(result);
  }

  return (
    <>
      <div className="TestApi">
        <h1 onClick={ () => navigate('/') }>API 테스트 영역</h1>
        {/* 빵집 전체 목록 조회 */}
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
        {/* 빵집 상세 조회 */}
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
                  autoComplete='none'
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
        {/* 빵집 삭제 이력 조회 */}
        <div className="TestApi__item">
          <h2>빵집 삭제 이력 조회</h2>
          <div className="TestApi__item-result">
            <div className="btn__box">
              <button
                type="button" 
                className="btn btn__sub"
                onClick={ clickRemoveHistoryHandler }
              >
                API 호출
              </button>
              <p className="result__api" ref={ removeRef }></p>
            </div>
          </div>
        </div>
        {/* 유저 목록 조회 */}
        <div className="TestApi__item">
          <h2>사용자 전체 목록 조회</h2>
          <div className="TestApi__item-result">
            <div className="btn__box">
              <button
                type="button" 
                className="btn btn__sub"
                onClick={ clickFetchUserListHandler }
              >
                API 호출
              </button>
              <p className="result__api" ref={ userListRef }></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TestApi