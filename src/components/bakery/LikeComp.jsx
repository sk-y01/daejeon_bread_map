import React, { useState } from 'react'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useToast } from '../../contexts/ToastContext';

const LikeComp = () => {
  const { showToast } = useToast();
  const [ isLikeActive, setIsLikeActive ] = useState(false);

  const handleLikeBtn = (e) => {
    // 이벤트 버블링 방지(부모 컴포넌트에서 이벤트 발생 방지)
    e.stopPropagation(); 

    // Error : LikeComp 렌더링 중 ToastProvider 상태를 업데이트 하고 있음. 
    // setIsLikeActive의 업데이트 함수 내부에서 showToast를 호출해, 
    // 렌더링 중 다른 컴포넌트(ToastProvider)의 상태를 변경하려고 함

    // setIsLikeActive(active => {
    //   const newState = !active;
    //   if(newState) {
    //     showToast('찜 목록이 추가 되었습니다.', 'success');
    //   } else {
    //     showToast('찜 목록이 취소 되었습니다.', 'info');
    //   }
    //   return newState
    // });

    // 현재 상태를 기반으로 새 상태 계산
    const newState = !isLikeActive;

    // 상태 업데이트만 수행
    setIsLikeActive(newState);

    // 상태 업데이트 후 토스트 메시지 표시(별도로 사이드 이펙트 실행)
    if(newState) {
      showToast('찜 목록이 추가 되었습니다.', 'success');
    } else {
      showToast('찜 목록이 취소 되었습니다.', 'info');
    }
  }

  return (
    <div>
      <button 
        type="button" 
        onClick={ handleLikeBtn }
        className="btn btn__heart"
      >
        {
          isLikeActive ? <FaHeart /> : <FaRegHeart /> 
        }
      </button>
    </div>
  )
}

export default LikeComp