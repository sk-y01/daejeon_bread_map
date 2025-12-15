/**
 * bakeryApi.js
 *
 * @description
 * 백엔드와 통신하는 빵집 관련 API 모음.
 * URL, 필드명은 백엔드에서 정의한 스펙에 따라 변경될 수 있으므로
 * 실제 API 연결 전 반드시 백엔드에게 확인해야 한다.
 */
import { api } from './axiosInstance';

/**
 * ✔ createBakery
 *
 * @author        hnlee
 * @method        POST
 * @description   빵집 등록 (multipart/form-data)
 * @param {*}     data  FormData
 */
export const createBakery = (data) => {
  return api.post('/bakeries/add', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

/**
 * ✔ updateBakery
 *
 * @author        hnlee
 * @method        PUT
 * @description   빵집 수정 요청 (multipart/form-data)
 * @param {*}     id
 * @param {*}     data  FormData
 */
export const updateBakery = (id, data) => {
  return api.put(`/bakeries/update/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

/**
 * ✔ fetchBakeries
 *
 * @author        hnlee
 * @modifier      jjlee
 * @method        GET
 * @description   빵집 목록 조회 (검색 / 페이지네이션 대응)
 *
 * @param {Object} params
 * @param {string} params.keyword   검색 키워드
 * @param {number} params.page      페이지 번호
 * @param {number} params.limit     페이지당 개수
 */
export const fetchBakeries = (params = {}) => {
  return api.get('/bakeries', { params });
};

/**
 * ✔ fetchBakeryDetail
 *
 * @author        hnlee
 * @modifier      jjlee
 * @method        GET
 * @description   빵집 상세 조회
 * @param {*}     id
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
 * @description   빵집 삭제 요청 (reason 필수)
 * @param {*}     id
 * @param {*}     reason
 */
export const deleteBakery = (id, reason) => {
  return api.delete(`/bakeries/delete/${id}`, {
    data: { reason },
  });
};
