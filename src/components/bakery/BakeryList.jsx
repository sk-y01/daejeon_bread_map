import React, { useEffect, useState } from 'react'
import BakeryItem from './BakeryItem'
import { fetchBakeries } from '../../apis/bakeryApi'
import LoadingSpinner from '../loading/LoadingSpinner'
import Pagination from '../common/Pagination/Pagination'

function BakeryList() {
  const [isLoading, setIsLoading] = useState(false);
  const [bakeries, setBakeries] = useState([]);

  useEffect(() => {
    // data 불러오기
    const getBakeries = async() => {
      try {
        // 성공할 시
        setIsLoading(true);

        const response = await fetchBakeries();
        const data = response.data;
    
        setBakeries(data);
        setIsLoading(false);

      } catch (error) {
        console.log('빵집 목록 조회 실패 :', error);
        setIsLoading(false);
      }
    }
    getBakeries();
  }, []);

  return (
    <div className="bakeryList">
      {
        isLoading ?
        (
          <LoadingSpinner loading={isLoading} />
        ) : (
          bakeries && bakeries.map(bakery => (
            <BakeryItem key={bakery._id} bakery={bakery} />
          ))
        )
      }
    </div>
  )
}

export default BakeryList
