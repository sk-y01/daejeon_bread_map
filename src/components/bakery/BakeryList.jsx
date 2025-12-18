import React, {useEffect, useState } from 'react'
import BakeryItem from './BakeryItem'
import { fetchBakeries } from '../../apis/bakeryApi'
import LoadingSpinner from '../loading/LoadingSpinner'
import Pagination from '../common/Pagination/Pagination'

function BakeryList({keyword = ''}) {  

  const [loading, setLoading] = useState(true);
  const [bakeries, setBakeries] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const loadList = async({keyword = ''}) => {
    try {
      setLoading(true);

      const res = await fetchBakeries({
        keyword,
      });

      setBakeries(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error(error);
      alert('목록을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadList({keyword});
  }, [keyword, page]);

  useEffect(() => {
    // data 불러오기
    const getBakeries = async() => {
      try {
        setLoading(true);

        const response = await fetchBakeries();
        const data = await response.data;
    
        setBakeries(Array.isArray(data) ? data : []);
        setLoading(false);

      } catch (error) {
        console.log('빵집 목록 조회 실패 :', error);
        setBakeries([]);
        setLoading(false);
      }
    }
    getBakeries();
  }, []);

  // 프론트 기준 전체 페이지 수 계산
  const totalPages = Math.ceil(bakeries.length / limit);

  // 현재 페이지에 해당하는 목록만 slice
  const pagedBakeries = bakeries.slice(
    (page - 1) * limit,
    page * limit,
  );

  return (
    <div className="bakeryList">
      {
        loading ? (
          <LoadingSpinner loading={loading} />
        ) : (
          <>
            {pagedBakeries.map(bakery => (
              <BakeryItem key={bakery._id} bakery={bakery} />
            ))}
            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={setPage}
            />
          </>
        )
      }
    </div>
  )
}

export default BakeryList
