import React, { useState } from 'react'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useToast } from '../../contexts/ToastContext';

const LikeComp = () => {
  const { showToast } = useToast();
  const [ isLikeActive, setIsLikeActive ] = useState(false);

  const handleLikeBtn = (e) => {
    // 이벤트 버블링 방지(부모 컴포넌트에서 이벤트 발생 방지)
    e.stopPropagation(); 

    setIsLikeActive(active => {
      const newState = !active;
      if(newState) {
        showToast('찜 목록이 추가 되었습니다.', 'success');
      } else {
        showToast('찜 목록이 취소 되었습니다.', 'info');
      }
      return newState
    });

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