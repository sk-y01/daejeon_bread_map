import React, {Suspense, useState } from 'react'
import BakeryItem from './BakeryItem'
import LoadingSpinner from '../loading/LoadingSpinner'
import Pagination from '../common/Pagination/Pagination'

function BakeryList({ filterBakeries }) {  
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // 프론트 기준 전체 페이지 수 계산
  const totalPages = Math.ceil(filterBakeries.length / limit);

  // 현재 페이지에 해당하는 목록만 slice
  const pagedBakeries = filterBakeries.slice(
    (page - 1) * limit,
    page * limit,
  );

  return (
    <div className="bakeryList">
      <Suspense fallback={ <LoadingSpinner /> }>
        {
          filterBakeries.length === 0
          ? (
            <div className="bakeryList__empty">
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
