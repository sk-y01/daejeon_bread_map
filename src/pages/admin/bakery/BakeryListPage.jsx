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

  /**
   * @state bakeries
   * @description 서버에서 조회한 전체 빵집 목록
   */
  const [bakeries, setBakeries] = useState([]);

  /**
   * @state loading
   * @description 목록 로딩 상태 제어
   */
  const [loading, setLoading] = useState(true);

  /**
   * @state keyword
   * @description 검색 키워드
   */
  const [keyword, setKeyword] = useState('');

  /**
   * @state page
   * @description 현재 페이지 번호
   */
  const [page, setPage] = useState(1);

  /**
   * @state limit
   * @description 페이지당 목록 개수
   */
  const [limit, setLimit] = useState(10);

  /**
   * @state showTopButton
   * @description 스크롤 위치에 따른 Top 버튼 노출 여부
   */
  const [showTopButton, setShowTopButton] = useState(false);

  /**
   * loadList
   * 빵집 목록 조회
   * 
   * - 검색/페이지/limit 변경 시 동일한 조회 로직 재사용
   */
  const loadList = async () => {
    try {
      setLoading(true);

      const res = await fetchBakeries({
        keyword,
        limit,
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
   * 페이지 또는 limit 변경 시 목록 재조회
   *
   * WHY?
   * - 페이지 이동은 즉각적인 목록 갱신이 필요
   */
  useEffect(() => {
    loadList();
  }, [page, limit]);

  // 스크롤 이벤트 처리(Top 버튼)

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * handleSearch
   *
   * 검색 실행
   * WHY?
   * - 자동 검색으로 인한 서버 부하 방지
   * - 엔터 / 검색 버튼 클릭 시에만 호출
   */
  const handleSearch = () => {
    setPage(1);
    loadList();
  };

  /**
   * handleDelete
   *
   * @description
   * 빵집 삭제 처리
   * 
   * - 삭제 사유를 함께 전달
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

  // 화면 최상단으로 스크롤 이동
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 전체 페이지 수 (프론트 기준 계산)
  const totalPages = Math.ceil(bakeries.length / limit);

  // 현재 페이지에 해당하는 빵집 목록
  const pagedBakeries = bakeries.slice(
    (page - 1) * limit,
    page * limit,
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

      <div className="BakeryList__search-row">
        <div
          className="icon__input"
          onClick={handleSearch}
          role="button"
          tabIndex={0}
        >
          <MdOutlineSearch />
          <input
            type="text"
            placeholder="빵집 이름 검색"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
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
