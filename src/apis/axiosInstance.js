// src/apis/axiosInstance.js

import axios from "axios";

// API URL은 반드시 .env 파일로 관리할 것
const BAKERIES_API_URL = import.meta.env.VITE_API_URL + '/api';
// const BAKERIES_API_URL = import.meta.env.VITE_LOCAL_URL + '/api';

/**
 * api 정의
 * 
 * WHY?
 * - 모든 API 요청의 기본 URL을 한 곳에서 관리하기 위해 사용
 */
export const api = axios.create({
  baseURL: BAKERIES_API_URL,   // 여기 변경함!!
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});