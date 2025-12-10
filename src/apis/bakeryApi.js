/**
 * bakeryApi.js
 *
 * @description
 * 백엔드와 통신하는 빵집 관련 API 모음.
 * URL, 필드명은 백엔드에서 정의한 스펙에 따라 변경될 수 있으므로
 * 실제 API 연결 전 반드시 백엔드에게 확인해야 한다.
 *
 * WHY?
 * - 수정 방식(PUT/PATCH) 또한 백엔드 설계에 따라 달라진다.
 *
 * TODO:
 * - 백엔드에서 정확한 API URL 및 필드명 전달받으면 수정 필요.
 */

import { api } from "./axiosInstance";

/**
 * 빵집 등록 (POST)
 * FIXME: URL/필드명 백엔드 확인 필요
 */
export const createBakery = (data) => {
  return api.post("/admin/bakeries", data); 
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
export const updateBakery = (id, data) => {
  return api.put(`/admin/bakeries/${id}`, data); // FIXME: URL 및 메소드 확인
};

/**
 * ✔ 빵집 목록 조회 (GET)
 * 백엔드가 알려준 실제 URL에 맞게 수정해야 하는 부분
 *
 * 백엔드: GET http://jarryjeong.pe.kr/api/bakery
 */
export const fetchBakeries = () => {
  return api.get("/bakery");   // 여기 수정됨!
};

// 빵집 상세 조회
export const fetchBakeryDetail = (id) => {
  return api.get(`/admin/bakeries/${id}`); // FIXME: URL 확인
};

// 빵집 삭제 요청
export const deleteBakery = (id) => {
  return api.delete(`/admin/bakeries/${id}`); // FIXME: URL 확인
};
