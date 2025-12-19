/**
 * loginApi.js
 * 
 * @description 로그인 API 관련 메서드 정의
 */
import { api } from "../axiosInstance";

/**
 * 로그인
 * 
 * @method    POST
 * @param {*} data  로그인 데이터
 * @returns 
 */
export const login = (data) => {
  return api.post('/login', data)
}

/**
 * 회원가입
 * 
 * @method    POST
 * @param {*} data 
 * @returns 
 */
export const join = (data) => {
  return api.post('/join', data)
}