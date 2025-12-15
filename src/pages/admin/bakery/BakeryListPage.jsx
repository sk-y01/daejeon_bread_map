/**
 * BakeryListPage.jsx
 *
 * @description
 * 관리자용 빵집 목록 페이지.
 * 조회 / 검색 / 수정 / 삭제
 *
 * NOTE:
 * - 검색은 서버 기준으로 처리
 * - 페이지네이션은 UI만 선구현 상태
 * - 서버 페이지네이션 적용 시 page / limit 연동 예정
 */

import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { fetchBakeries, deleteBakery } from '../../../apis/bakeryApi';
import { FaArrowUp } from 'react-icons/fa';
import { MdOutlineSearch } from 'react-icons/md';

function BakeryListPage() {
  const navigate = useNavigate();
  const debounceRef = useRef(null);

  /** 조회된 빵집 목록 */
  const [bakeries, setBakeries] = useState([]);

  /** 로딩 여부 */
  const [loading, setLoading] = useState(true);

  /** 검색 키워드 */
  const [keyword, setKeyword] = useState('');

  /** Top 버튼 */
  const [showTopButton, setShowTopButton] = useState(false);

  /**
   * 빵집 목록 조회
   *
   * WHY?
   * - 검색은 서버에서 처리
   * - 현재는 전체 배열 반환
   */
  const loadList = async (params = {}) => {
    try {
      setLoading(true);
      const res = await fetchBakeries(params);
      setBakeries(res.data || []);
    } catch (err) {
      console.error(err);
      alert('목록을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 초기 목록 로드
   */
  useEffect(() => {
    loadList();
  }, []);

  /**
   * 검색 debounce 처리
   *
   * WHY?
   * - 타이핑 중 과도한 API 호출 방지
   */
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      loadList({ keyword });
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [keyword]);

  /**
   * 스크롤 이벤트
   */
  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * 빵집 삭제
   */
  const handleDelete = async (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    const reason = window.prompt('삭제 사유를 입력해주세요.');
    if (!reason) return;

    try {
      await deleteBakery(id, reason);
      alert('삭제 완료!');
      loadList({ keyword });
    } catch (err) {
      console.error(err);
      alert('삭제 실패');
    }
  };

  /**
   * 최상단 이동
   */
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="BakeryList">
      {/* 상단 헤더 */}
      <div className="BakeryList__header">
        <h1>빵집 리스트</h1>
        <button
          type="button"
          className="btn btn__sub"
          onClick={() => navigate('/admin/bakery/form')}
        >
          새 빵집 등록
        </button>
      </div>

      {/* 검색 영역 */}
      <div className="BakeryList__search">
        <div className="icon__input">
          <MdOutlineSearch />
          <input
            type="text"
            placeholder="빵집 이름 검색"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </div>

      {/* 리스트 */}
      {loading ? (
        <p>로딩 중...</p>
      ) : bakeries.length === 0 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        <div className="BakeryList__cards">
          {bakeries.map((item) => (
            <div className="BakeryCard" key={item._id}>
              <div className="BakeryCard__thumbnail">
                {item.image ? (
                  <img src={item.image} alt={item.name} />
                ) : (
                  <div className="thumbnail__placeholder">이미지 없음</div>
                )}
              </div>

              <div className="BakeryCard__content">
                <h3>{item.name}</h3>
                <p className="info">
                  <strong>카테고리:</strong>{' '}
                  {Array.isArray(item.category)
                    ? item.category.join(' / ')
                    : item.category}
                </p>
                <p className="info">
                  <strong>대표 메뉴:</strong> {item.menu}
                </p>
                <p className="info">
                  <strong>주소:</strong> {item.address}
                </p>
                <p className="coords">
                  {item.latitude}, {item.longitude}
                </p>
              </div>

              <div className="BakeryCard__buttons">
                <button
                  type="button"
                  className="btn btn__light"
                  onClick={() =>
                    navigate(`/admin/bakery/form/${item._id}`)
                  }
                >
                  수정
                </button>
                <button
                  type="button"
                  className="btn btn__sub"
                  onClick={() => handleDelete(item._id)}
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 페이지네이션 UI (선구현) */}
      <div className="BakeryList__pagination">
        <button type="button" disabled>
          이전
        </button>
        <span>1</span>
        <button type="button" disabled>
          다음
        </button>
      </div>

      {/* Top 버튼 */}
      {showTopButton && (
        <button
          type="button"
          className="TopButton"
          onClick={handleScrollTop}
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
}

export default BakeryListPage;
