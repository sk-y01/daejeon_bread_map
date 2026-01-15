import React, { createContext, useContext, useState } from 'react'
import ToastMessage from '../components/common/Toast/ToastMessage';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  // 토스트 메시지들을 배열로 관리
  const [toasts, setToasts] = useState([]);
  
  const showToast = ( message, type='info', duration = 3000) => {
    const newToast = {
      id: Date.now(), // 고유 ID (현재 시간 밀리초로)
      message : message, // 표시할 메세지
      type : type, // 타입(success, error, info, warning)
      duration : duration // 표시 시간
    }

    // 기존 토스트 배열에 새 토스트 추가가
    setToasts(prevToasts => [...prevToasts, newToast]);
  }

  // 자동 제거 함수 
  const removeToast = (id) => {
    setToasts(prevToasts => 
      prevToasts.filter(toast => toast.id !== id)
    )
  }

  // Context.Provider로 children을 감싸고 value 전달 
  return (
    <ToastContext.Provider value={{ showToast, removeToast, toasts}}>
      { children }
      {/* 여기에 ToastMessage 컴포넌트들을 렌더링 */}
      <div className="toast-container">
        {toasts.map(toast => (
          <ToastMessage 
            key={ toast.id }
            message={ toast.message }
            type={ toast.type }
            duration={ toast.duration }
            onClose={ () => removeToast(toast.id) }
          />
        ))
        }
      </div>
    </ToastContext.Provider>
  )
}

// useToast 훅
export const useToast = () => {
  const context = useContext(ToastContext)
  if(!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

export default ToastContext