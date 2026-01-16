import React, { createContext, useContext, useState } from 'react'
import ToastMessage from '../components/common/Toast/ToastMessage';

// 1. Context 생성
const ToastContext = createContext();

// 2. Provider 컴포넌트
export const ToastProvider = ({ children }) => {
  // 토스트 메시지들을 배열로 관리
  const [ toasts, setToasts ] = useState([]);
  // ex) [{ id:1, message: "찜목록 추가", type:"success" }]

  // 토스트 메시지 추가
  const showToast = (message, type='info', duration='3000') => {
    // 새로운 토스트 메시지 객체 생성
    const newToast = {
      id: Date.now(), // 고유 ID
      message : message, 
      type : type,
      duration : duration
    }

    // 기존 토스트 배열에 새 토스트 추가
    setToasts(prevToasts => [...prevToasts, newToast])
  }

  // 토스트 메시지 제거
  const removeToast = (id) => {
    setToasts(prevToasts => 
      prevToasts.filter(toast => toast.id !== id)
    )
  }

  // Context.Provider로 children을 감싸고 value 전달
  return (
    <ToastContext.Provider value={{ showToast, removeToast, toasts }}>
      {children}
      {/* ToastMessage 컴포넌트들 렌더링 */}
      <div className="toast-container">
        {toasts.map(toast => (
          <ToastMessage 
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)} 
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// 3. useToast 훅 
export const useToast = () => {
  const context = useContext(ToastContext)
  if(!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

export default ToastContext