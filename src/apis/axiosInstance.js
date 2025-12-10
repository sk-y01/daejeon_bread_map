// src/apis/axiosInstance.js

import axios from "axios";

/**
 * api 정의
 * 
 * WHY?
 * - 모든 API 요청의 기본 URL을 한 곳에서 관리하기 위해 사용
 */
export const api = axios.create({
  baseURL: "http://jarryjeong.pe.kr/api",   // 여기 변경함!!
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
