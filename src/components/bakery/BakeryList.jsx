import React, {Suspense, useEffect, useState } from 'react'
import LoadingSpinner from '../loading/LoadingSpinner'
import Pagination from '../common/Pagination/Pagination'
import { SlExclamation } from "react-icons/sl";

const BakeryItem = React.lazy(() => import('./BakeryItem'))

function BakeryList({ filterBakeries, searchKeyword }) {  
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // 프론트 기준 전체 페이지 수 계산
  const totalPages = Math.ceil(filterBakeries.length / limit);

  // 현재 페이지에 해당하는 목록만 slice
  const pagedBakeries = filterBakeries.slice(
    (page - 1) * limit,
    page * limit,
  );

  // 검색 시 페이지 리셋 수정
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [searchKeyword, filterBakeries.length]);

  return (
    <div className="bakeryList">
      <Suspense fallback={ <LoadingSpinner /> }>
        {
          // 검색 실행 및 결과가 없을 때만 "검색 결과가 없습니다" 표시
          searchKeyword && filterBakeries.length === 0
          ? (
            <div className="bakeryList__empty">
              <SlExclamation />
              <p>검색 결과가 없습니다</p>
            </div>
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
      </Suspense>
    </div>
    )
  }

export default BakeryList
