import React, { useEffect, useState } from 'react'
import './ToastMessage.scss'
import { IoMdCheckmarkCircle } from "react-icons/io";

const ToastMessage = ( { message, type = 'info', duration = 3000, onClose } ) => {

  const [isVisible, setIsVisible] = useState(false); // 표시/숨김
  const [isMounting, setIsMounting] = useState(true); // 컴포넌트 마운트

  // 자동 닫기
  useEffect(() => {

    setIsVisible(true);

    // duration 시간 후 자동 닫기
    const timer = setTimeout(() => {
      setIsVisible(false);

      // fadeout 300ms 후 완전히 제거
      setTimeout(() => {
        setIsMounting(false);
        if (onClose) onClose(); // 콜백 호출
      }, 300);
    }, duration);

    // 컴포넌트가 언마운트되면 타이머 정리(메모리 누수 방지)
    return() => {
      clearTimeout(timer);
    };
  }, [duration, onClose]);
  
  if(!isMounting) {
    return null;
  };

  return (
    <div className=
      {
      `toast-message 
        toast-message--${type} 
        ${ isVisible ? 'toast-message--show' : 'toast-message--hide' }`
      }
    >
      <div className="toast-message__content">
        <span className="toast-message__icon">
          <IoMdCheckmarkCircle />
        </span>
        <span className="toast-message__text">
          { message }
        </span>
        {/* 닫기 버튼 */}
      </div>
    </div>
  )
}

export default ToastMessage