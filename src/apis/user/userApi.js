import { api } from "../axiosInstance"

/**
 * getUserList
 * 
 * @description 사용자 목록 조회
 * @method      GET
 * @returns 
 */
export const getUserList = () => {
  return api.get('/user')
}