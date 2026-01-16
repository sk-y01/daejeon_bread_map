import React, { useEffect, useState } from 'react'
import './ToastMessage.scss'
import { IoMdCheckmarkCircle } from "react-icons/io";

const ToastMessage = ({ message, type='info', duration = 3000, onClose }) => {

  // 토스트 메시지 표시/숨김 상태관리
  const [ isVisible, setIsVisivble ] = useState(false);

  // 마운트 상태관리
  const [ isMouting, setIsMounting ] = useState(true);

  // 자동 사라짐 기능 (일정 시간 후 자동 닫기)
  useEffect(() => {
    // 컴포넌트가 마운트되면 즉시 보이게
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisivble(true);

    // duration 시간 후 자동 닫기 
    // 1. 3초 기다림림
    const timer = setTimeout(() => {
      // 2. 숨기기 시작(페이드 아웃 애니메이션 시작)
      setIsVisivble(false);

      // 3. 0.3초 더 기다림(애니메이션 완료 대기)
      setTimeout(() => {
        // 4. 완전히 제거
        setIsMounting(false);
        if(onClose) onClose();
      }, 300);
    }, duration);  

    // duration = 3000ms (3초)일 때
    // 0ms: 토스트 메시지 나타남 (isVisible = true)
    // 3000ms: 숨기기 시작 (isVisible = false, 페이드아웃 시작)
    // 3300ms: 완전히 제거 (isMounting = false, 컴포넌트 사라짐)
    
    // clearTimeout 
    return() => {
      clearTimeout(timer);
    }
  }, [ duration, onClose ]);

  // 컴포넌트가 마운트되지 않았으면 아무것도 렌더링하지 않음
  if(!isMouting) {
    return null;
  }

  return (
    <div className={ 
      `
      toast-message 
      toast-message--${ type } 
      ${ isVisible ? 'toast-message--show' : 'toast-message--hide'}
      `
      }>
      <div className="toast-message__content">
        <span className="toast-message__icon">
          <IoMdCheckmarkCircle />
        </span>
        <span className="toast-message__text">{ message }</span>
      </div>
      
    </div>
  )
}

export default ToastMessage