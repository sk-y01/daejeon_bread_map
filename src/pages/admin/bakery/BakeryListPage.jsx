/**
 * BakeryListPage.jsx
 *
 * @description
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
import Pagination from '../../../components/common/Pagination/Pagination';

const LIMIT = 10;

function BakeryListPage() {
  const navigate = useNavigate();
  const debounceRef = useRef(null);

  /**
   * @state bakeries
   * @description 서버에서 조회된 빵집 목록
   */
  const [bakeries, setBakeries] = useState([]);

  /**
   * @state loading
   * @description 목록 로딩 상태
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
   * @state showTopButton
   * @description Top 버튼 노출 여부
   */
  const [showTopButton, setShowTopButton] = useState(false);

  /**
   * loadList
   *
   * @description
   * 빵집 목록 조회
   * - 검색어(keyword), 페이지(page), 개수(limit)를 서버로 전달
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
   *
   * @description
   * - 검색어 입력 후 300ms 뒤 서버 재요청
   * - 검색 시 페이지를 1로 초기화
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
   * handleDelete
   *
   * @description
   * 빵집 삭제 처리 (삭제 사유 필수)
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
   * handleScrollTop
   *
   * @description
   * 화면 최상단으로 스크롤 이동
   */
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * 임시 totalPages 계산
   *
   * TODO:
   * - 서버에서 totalPages 내려주면 해당 값으로 교체
   */
  const totalPages = Math.ceil(bakeries.length / LIMIT);

  return (
    <div className="BakeryList">
      {/* 헤더 */}
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

      {/* 목록 영역 */}
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
                <p>
                  <strong>카테고리:</strong>{' '}
                  {Array.isArray(item.category)
                    ? item.category.join(' / ')
                    : item.category}
                </p>
                <p><strong>대표 메뉴:</strong> {item.menu}</p>
                <p><strong>주소:</strong> {item.address}</p>
                <p><strong>전화번호:</strong> {item.phone}</p>
                <p>
                  <strong>위도/경도:</strong> {item.latitude}, {item.longitude}
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

      {/* 페이지네이션 */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={setPage}
      />

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
