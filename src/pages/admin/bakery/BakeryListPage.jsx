/**
 * BakeryListPage.jsx
 *
 * @description
 * 관리자용 빵집 목록 페이지.
 * 조회 / 검색 / 수정 / 삭제
 */

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchBakeries, deleteBakery } from '../../../apis/bakeryApi';
import { FaArrowUp } from 'react-icons/fa';
import { MdOutlineSearch } from 'react-icons/md';

function BakeryListPage() {
  const navigate = useNavigate();

  /**
   * @state bakeries
   * @description 조회된 빵집 목록 데이터
   */
  const [bakeries, setBakeries] = useState([]);

  /**
   * @state loading
   * @description 목록 로딩 여부
   */
  const [loading, setLoading] = useState(true);

  /**
   * @state keyword
   * @description 검색 키워드
   */
  const [keyword, setKeyword] = useState('');

  /**
   * @state showTopButton
   * @description Top 버튼 노출 여부
   */
  const [showTopButton, setShowTopButton] = useState(false);

  /**
   * 초기 목록 로드
   */
  useEffect(() => {
    loadList();
  }, []);

  /**
   * 스크롤 이벤트
   *
   * WHY?
   * - 일정 스크롤 이후 Top 버튼 노출
   */
  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * loadList
   *
   * @description 빵집 목록 조회
   */
  const loadList = async () => {
    try {
      setLoading(true);
      const res = await fetchBakeries();
      setBakeries(res.data || []);
    } catch (err) {
      console.error(err);
      alert('목록을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * handleDelete
   *
   * @description 빵집 삭제 처리
   */
  const handleDelete = async (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    const reason = window.prompt('삭제 사유를 입력해주세요.');
    if (!reason) return;

    try {
      await deleteBakery(id, reason);
      alert('삭제 완료!');
      loadList();
    } catch (err) {
      console.error(err);
      alert('삭제 실패');
    }
  };

  /**
   * handleScrollTop
   *
   * @description 화면 최상단 이동
   */
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  /**
   * filteredBakeries
   *
   * @description 검색 키워드 기반 필터링된 목록
   */
  const filteredBakeries = bakeries.filter((item) =>
    item.name.toLowerCase().includes(keyword.toLowerCase()),
  );

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

      {/* 로딩 & 리스트 */}
      {loading ? (
        <p>로딩 중...</p>
      ) : filteredBakeries.length === 0 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        <div className="BakeryList__cards">
          {filteredBakeries.map((item) => (
            <div className="BakeryCard" key={item._id}>
              {/* 이미지 */}
              <div className="BakeryCard__thumbnail">
                {item.image ? (
                  <img src={item.image} alt={item.name} />
                ) : (
                  <div className="thumbnail__placeholder">이미지 없음</div>
                )}
              </div>

              {/* 정보 */}
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
                <p className="info">
                  <strong>전화번호:</strong> {item.phone}
                </p>
                <p className="coords">
                  <strong>위도/경도:</strong> {item.latitude}, {item.longitude}
                </p>
              </div>

              {/* 버튼 */}
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
