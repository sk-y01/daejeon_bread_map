/**
 * BakeryListPage.jsx
 *
 * @description
 * 관리자용 빵집 목록 페이지
 * - 빵집 목록 조회
 * - 엔터 / 돋보기 클릭 기반 검색
 * - 프론트 기준 페이지네이션
 * - 수정 / 삭제 기능 제공
 */

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchBakeries, deleteBakery } from '../../../apis/bakeryApi';
import { FaArrowUp } from 'react-icons/fa';
import { MdOutlineSearch } from 'react-icons/md';
import Pagination from '../../../components/common/Pagination/Pagination';
import { toImageUrl } from '../../../utils/imageUrl';

function BakeryListPage() {
  const navigate = useNavigate();

  const [bakeries, setBakeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [showTopButton, setShowTopButton] = useState(false);

  /**
   * 빵집 목록 조회
   * - 페이지 / limit / 검색 공용 로직
   */
  const loadList = async () => {
    try {
      setLoading(true);
      const res = await fetchBakeries({ keyword, limit });
      setBakeries(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error(error);
      alert('목록을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 페이지 / limit 변경 시 재조회
   */
  useEffect(() => {
    loadList();
  }, [page, limit]);

  /**
   * Top 버튼 스크롤 처리
   */
  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * 검색 실행
   * - 엔터 / 돋보기 클릭 시만 호출
   */
  const handleSearch = () => {
    setPage(1);
    loadList();
  };

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
      loadList();
    } catch (error) {
      console.error(error);
      alert('삭제 실패');
    }
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(bakeries.length / limit);
  const pagedBakeries = bakeries.slice((page - 1) * limit, page * limit);

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

      {/* 검색 + 페이지당 개수 */}
      <div className="BakeryList__search-row">
        <div className="icon__input">
          {/* 돋보기 클릭 시 검색 */}
          <MdOutlineSearch
            role="button"
            tabIndex={0}
            aria-label="검색"
            onClick={handleSearch}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
          />

          <input
            type="text"
            placeholder="빵집 이름 검색"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
          />
        </div>

        <select
          className="BakeryList__select"
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
        >
          <option value={10}>10개씩</option>
          <option value={20}>20개씩</option>
          <option value={50}>50개씩</option>
        </select>
      </div>

      {/* 목록 */}
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
                  <img src={toImageUrl(item.image)} alt={item.name} />
                ) : (
                  <div className="thumbnail__placeholder">이미지 없음</div>
                )}
              </div>

              <div className="BakeryCard__content">
                <h3 title={item.name}>{item.name}</h3>
                <p>
                  <strong>카테고리:</strong>{' '}
                  {Array.isArray(item.category)
                    ? item.category.join(' / ')
                    : item.category}
                </p>
                <p><strong>대표 메뉴:</strong> {item.menu}</p>
                <p><strong>주소:</strong> {item.address}</p>
                <p><strong>전화번호:</strong> {item.phone}</p>
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

      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={setPage}
      />

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
