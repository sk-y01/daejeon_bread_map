/**
 * bakeryApi.js
 *
 * @description
 * 백엔드와 통신하는 빵집 관련 API 모음.
 * URL, 필드명은 백엔드에서 정의한 스펙에 따라 변경될 수 있으므로
 * 실제 API 연결 전 반드시 백엔드에게 확인해야 한다.
 */
import { api } from "./axiosInstance";

/**
 * ✔ createBakery
 * 
 * @author        hnlee
 * @modifier      jjlee
 * @method        POST
 * @description   빵집 등록
 * @param {*}     data 
 * @returns 
 */
export const createBakery = (data) => {
  return api.post("/bakeries/add", data); 
};

/**
 * 빵집 수정 요청
 *
 * WHY?
 * - PUT인지 PATCH인지는 백엔드 정책을 따라야 한다.
 * - 현재는 임시로 PUT 사용 중.
 *
 * FIXME:
 * - 실제 수정 방식 확인 후 put → patch 변경 가능.
 */
/**
 * ✔ updateBakery
 * 
 * @author        hnlee
 * @modifier      jjlee
 * @method        PUT
 * @description   빵집 수정 요청
 * @param {*}     id 
 * @param {*}     data 
 * @returns 
 */
export const updateBakery = (id, data) => {
  return api.put(`/bakeries/update/${id}`, data); // FIXME: URL 및 메소드 확인
};

/**
 * ✔ fetchBakeries
 * 
 * @author        hnlee
 * @modifier      jjlee
 * @method        GET
 * @description   빵집 목록 조회
 * @param 
 * @returns 
 */
export const fetchBakeries = () => {
  return api.get("/bakeries"); 
};

/**
 * ✔ fetchBakeryDetail
 * 
 * @author        hnlee
 * @modifier      jjlee
 * @method        GET
 * @description   빵집 상세 조회
 * @param {*}     id 
 * @returns 
 */
// TODO : 아직 backend logic 만들지 않음.
export const fetchBakeryDetail = (id) => {
  return api.get(`/bakeries/${id}`);
};

/**
 * ✔ deleteBakery
 * 
 * @author        hnlee
 * @modifier      jjlee
 * @method        DELETE
 * @description   빵집 삭제 요청 (기존 데이터는 삭제되고, 삭제 테이블에 백업 저장)
 * @param         id
 * @returns
 */
export const deleteBakery = (id) => {
  return api.delete(`/bakeries/delet/${id}`);
};