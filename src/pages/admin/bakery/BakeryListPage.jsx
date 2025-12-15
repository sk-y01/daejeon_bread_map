/**
 * BakeryListPage.jsx
 *
 * 관리자용 빵집 목록 페이지
 * - 목록 조회
 * - 검색 (서버 연동, debounce)
 * - 페이지네이션 (page / limit 전달)
 * - 수정 / 삭제
 */

import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { fetchBakeries, deleteBakery } from '../../../apis/bakeryApi';
import { FaArrowUp } from 'react-icons/fa';
import { MdOutlineSearch } from 'react-icons/md';

const LIMIT = 10;

function BakeryListPage() {
  const navigate = useNavigate();
  const debounceRef = useRef(null);

  const [bakeries, setBakeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [showTopButton, setShowTopButton] = useState(false);

  /**
   * 빵집 목록 조회
   * - 검색, 페이지 정보는 서버로 전달
   */
  const loadList = async () => {
    try {
      setLoading(true);

      const res = await fetchBakeries({
        keyword,
        page,
        limit: LIMIT,
      });

      setBakeries(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error(error);
      alert('목록을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 페이지 변경 시 목록 재조회
   */
  useEffect(() => {
    loadList();
  }, [page]);

  /**
   * 검색 debounce 처리
   * - 검색어 변경 시 page를 1로 초기화
   */
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setPage(1);
      loadList();
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [keyword]);

  /**
   * 스크롤 위치에 따라 Top 버튼 노출
   */
  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * 빵집 삭제 처리
   */
  const handleDelete = async (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    const reason = window.prompt('삭제 사유를 입력해주세요.');
    if (!reason) return;

    try {
      await deleteBakery(id, reason);
      alert('삭제 완료!');
      loadList();
    } catch (error) {
      console.error(error);
      alert('삭제 실패');
    }
  };

  /**
   * 화면 최상단으로 스크롤
   */
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* 프론트 임시 페이지네이션 */
  const totalPages = Math.ceil(bakeries.length / LIMIT);
  const pagedBakeries = bakeries.slice(
    (page - 1) * LIMIT,
    page * LIMIT,
  );

  return (
    <div className="BakeryList">
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

      {loading ? (
        <p>로딩 중...</p>
      ) : pagedBakeries.length === 0 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        <div className="BakeryList__cards">
          {pagedBakeries.map((item) => (
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
                <p><strong>카테고리:</strong> {Array.isArray(item.category) ? item.category.join(' / ') : item.category}</p>
                <p><strong>대표 메뉴:</strong> {item.menu}</p>
                <p><strong>주소:</strong> {item.address}</p>
                <p><strong>전화번호:</strong> {item.phone}</p>
                <p><strong>위도/경도:</strong> {item.latitude}, {item.longitude}</p>
              </div>

              <div className="BakeryCard__buttons">
                <button
                  type="button"
                  className="btn btn__light"
                  onClick={() => navigate(`/admin/bakery/form/${item._id}`)}
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

      {totalPages > 1 && (
        <div className="BakeryList__pagination">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            이전
          </button>
          <span>{page} / {totalPages}</span>
          <button
            type="button"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            다음
          </button>
        </div>
      )}

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
