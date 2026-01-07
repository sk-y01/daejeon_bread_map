/**
 * MyFavoritePage.jsx
 *
 * @description
 * 사용자 마이페이지 - 찜한 빵집 목록
 * - bakery API 재사용
 * - 구(지역) 필터는 프론트에서 처리
 * - PC 우선 / 모바일 반응형
 */

import { useEffect, useState } from "react";
import { FiMenu, FiMapPin } from "react-icons/fi";
import { fetchBakeries } from "../../apis/bakeryApi";
import FilterChips from "../../components/common/FilterChips";
import FavoriteCard from "./FavoriteCard";
import "./MyFavoritePage.scss";

// 구(지역) 필터 목록
const DISTRICTS = ["서구", "중구", "동구", "대덕구", "유성구"];

const MyFavoritePage = () => {
  const [bakeries, setBakeries] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("중구");

  // 빵집 데이터 조회
  useEffect(() => {
    const loadBakeries = async () => {
      try {
        const res = await fetchBakeries();
        setBakeries(res?.data || []);
      } catch (error) {
        console.error("빵집 조회 실패", error);
      }
    };

    loadBakeries();
  }, []);

  // 구 기준 필터링
  const filteredBakeries = bakeries.filter((bakery) =>
    bakery.address?.includes(selectedDistrict)
  );

  return (
    <div className="my-favorite">
      {/* ===== 마이페이지 전용 헤더 ===== */}
      <header className="my-favorite__header">
        <div className="my-favorite__logo">
          <img
            src="/src/assets/images/common/logo.svg"
            alt="대전빵지도"
          />
          <span>내 빵집</span>
        </div>

        <button className="my-favorite__menu" aria-label="menu">
          <FiMenu />
        </button>
      </header>

      {/* ===== 컨텐츠 ===== */}
      <div className="my-favorite__container">
        <h2 className="my-favorite__title">찜한 빵집</h2>

        {/* 구 필터 */}
        <FilterChips
          items={DISTRICTS}
          active={selectedDistrict}
          onChange={setSelectedDistrict}
        />

        {/* 카드 리스트 */}
        <div className="my-favorite__list">
          {filteredBakeries.map((bakery) => (
            <FavoriteCard
              key={bakery._id}
              bakery={bakery}
              memo="여기 빵 진짜 맛있음 👍"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyFavoritePage;
