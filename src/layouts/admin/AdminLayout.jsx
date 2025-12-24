import { Outlet } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import Sidebar from '../../components/admin/Sidebar';

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  /**
   * ESC 키 입력 시 사이드바 닫기
   */
  useEffect(() => {
    if (!isSidebarOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSidebarOpen]);

  /**
   * 사이드바 열림 상태에서 body 스크롤 방지
   */
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen]);

  /**
   * 사이드바 내부 포커스 트랩
   */
  useEffect(() => {
    if (!isSidebarOpen || !sidebarRef.current) return;

    const focusableElements =
      sidebarRef.current.querySelectorAll('a, button');

    if (focusableElements.length === 0) return;

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    const handleTrap = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }

      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    first.focus();
    document.addEventListener('keydown', handleTrap);

    return () => document.removeEventListener('keydown', handleTrap);
  }, [isSidebarOpen]);

  /**
   * 화면 리사이즈 시 모바일 사이드바 상태 초기화
   * - 모바일에서 열어둔 dim이 PC로 전환 시 남는 문제 방지
   */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="AdminLayout">
      {/* 모바일 햄버거 버튼 */}
      <button
        type="button"
        className="AdminLayout__menu-btn"
        onClick={() => setIsSidebarOpen(true)}
        aria-label="관리자 메뉴 열기"
      >
        <FaBars />
      </button>

      {/* dim 영역 */}
      {isSidebarOpen && (
        <div
          className="AdminLayout__dim"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar
        ref={sidebarRef}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="AdminLayout__content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
