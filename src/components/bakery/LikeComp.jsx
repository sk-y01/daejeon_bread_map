import { useState } from 'react';
import { useToast } from '../../contexts/ToastContext';
import { FaHeart, FaRegHeart } from "react-icons/fa";

const LikeComp = () => {
  const { showToast } = useToast();
  const [ isLikeActive, setIsLikeActive ] = useState(true);

  const handleLikeBtn = (e) => {
    e.stopPropagation();  // 이벤트 버블링 방지(부모 컴포넌트에서 이벤트 발생 방지)
    
    const currentState = isLikeActive;
    const newState = !currentState;

    setIsLikeActive(newState);

    if (newState) {
      showToast('찜목록이 취소 되었습니다.', 'info');
    } else {
      showToast('찜목록에 추가 되었습니다.', 'success');
    }
    
  }

  return (
    <div>
      <button type="button" onClick={ handleLikeBtn } className="btn btn__heart">
        {
          isLikeActive ? <FaRegHeart /> : <FaHeart /> 
        }
      </button>
    </div>
  )
}

export default LikeComp