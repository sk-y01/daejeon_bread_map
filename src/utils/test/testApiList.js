import { fetchBakeries } from '../../apis/bakeryApi'
import axios from 'axios'


/**
 * testApiList.js
 * 
 * @description   API 테스트 페이지 내 각 함수 정의
 * @author        jjlee
 */
// 개인 로컬 서버에서 API 테스트 시 사용 (주석 해제 / 사용 안 할 시 주석)
const LOCAL_URL = import.meta.env.VITE_LOCAL_URL + '/api';

// 실제 backend 서버 데이터로 테스트 시 사용 (주석 해제 / 사용 안 할 시 주석)
// const DEVEL_URL = import.meta.env.VITE_API_URL + '/api';

/**
 * 빵집 목록 조회
 */
export const testFetchBakeries = async () => {
  const response = await fetchBakeries()
      , data = await response?.data;

  return data;
}

/**
 * 빵집 상세 조회
 */
export const testFetchDetailBakery = async () => {
  const frm = document.forms[0]
      , search = frm[0].value
  const response = await axios.get(LOCAL_URL + `/bakeries/${search}`)
      , data = await response?.data || {}

  return data;
}

/**
 * 사용자 목록 조회
 * 
 * @returns data
 */
export const testFetchUserList = async () => {
  const response = await axios.get(LOCAL_URL + `/user`)
      , data = await response?.data || {}

  return data;
}

/**
 * 빵집 삭제 이력 조회
 * 
 * @returns data
 */
export const testFetchDeleteBakeryList = async () => {
  const response = await axios.get(LOCAL_URL + `/bakeries/remove/history`)
      , data = await response?.data || {}

  return data;
}