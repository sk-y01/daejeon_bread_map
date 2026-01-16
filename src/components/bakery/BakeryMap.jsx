/*
 * NOTE:
 * 기존 BakeryMap 로직은
 * SDK를 컴포넌트에서 동적으로 로드하던 구조였음.
 * 로딩 타이밍 이슈로 인해 index.html에서 SDK를 1회 로드하는
 * 방식으로 변경함.
 * 
 * 배포 확인 후 문제 없으면 수정 예정
 */

// import React, { useCallback, useEffect, useRef, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { fetchBakeries } from '../../apis/bakeryApi'
// import './BakeryMap.style.scss'

// const BakeryMap = ({ onBakeryClick }) => {
//   const [map, setMap] = useState(null)
//   const [bakeries, setBakeries] = useState([])

//   const navigate = useNavigate()
//   const kakaoKey = import.meta.env.VITE_KAKAO_KEY

//   // 마커/오버레이를 ref로 관리 (렌더링에 영향 X)
//   const markersRef = useRef([])
//   const overlayRef = useRef(null)

//   const getBakeries = useCallback(async () => {
//     try {
//       const response = await fetchBakeries()
//       setBakeries(response?.data || [])
//     } catch (error) {
//       console.error('빵집 데이터를 가져올 수 없습니다. ', error)
//     }
//   }, [])

//   // 오버레이 DOM 생성 (React JSX가 아니라 “문자열/DOM”로 넣어야 안정적)
//   const createOverlayContent = (bakery) => {
//     const img = bakery.imageUrl || ''
//     const safeName = bakery.name || '빵집'
//     const safeAddr = bakery.address || ''

//     return `
//       <div class="overlay">
//         <div class="overlay__top">
//           <strong class="overlay__title">${safeName}</strong>
//           <button class="overlay__close" type="button" aria-label="close">×</button>
//         </div>

//         ${img ? `<img class="overlay__img" src="${img}" alt="${safeName}" />` : ''}

//         <div class="overlay__addr">${safeAddr}</div>

//         <button class="overlay__btn" type="button">
//           상세보기
//         </button>
//       </div>
//     `
//   }

//   // 기존 마커 제거
//   const clearMarkers = () => {
//     markersRef.current.forEach((markers) => markers.setMap(null))
//     markersRef.current = []
//   }

//   // CustomOverlay를 “하나만 생성해서 재사용”
//   const ensureOverlay = (mapInstance) => {
//     const { kakao } = window
//     if (overlayRef.current) return overlayRef.current

//     const overlay = new kakao.maps.CustomOverlay({
//       content: '<div />',
//       position: mapInstance.getCenter(),
//       yAnchor: 1,
//       zIndex: 999,
//     })

//     overlayRef.current = overlay

//     return overlay
//   }

//   // 오버레이 열기
//   const openOverlay = (mapInstance, bakery, position) => {
//     const overlay = ensureOverlay(mapInstance)

//     // 기존 오버레이가 열려있으면 먼저 닫기 (선택사항)
//     // overlay.setMap(null)

//     overlay.setContent(createOverlayContent(bakery))
//     overlay.setPosition(position)
//     overlay.setMap(mapInstance)

//     // content는 DOM으로 렌더된 뒤에 querySelector 가능
//     // overlay.getContent()는 문자열일 수도 있어서, map 컨테이너에서 찾는 방식이 안전
//     setTimeout(() => {
//       const container = document.querySelector('.overlay')
//       if (!container) return

//       const closeBtn = container.querySelector('.overlay__close')
//       closeBtn?.addEventListener('click', () => overlay.setMap(null), { once: true })

//       // 상세 보기
//       // 이벤트 위임 방식으로 컨테이너에 이벤트 리스너 등록 
//       const handleContainerClick = (e) => {
//         const detailBtn = container.querySelector('.overlay__btn');

//         if(detailBtn){
//           // 이벤트 전파 차단
//           e.preventDefault();
//           e.stopPropagation();
//           e.stopImmediatePropagation();

//           overlay.setMap(null);
//           if(onBakeryClick) {
//             onBakeryClick(bakery);
//           }

//           // 이벤트 리스너 제거
//           container.removeEventListener('click', handleContainerClick);
//           container.removeEventListener('mousedown', handleContainerClick);
//         }
//       };

//       // 컨테이너에 이벤트 위임으로 등록
//       container.addEventListener('click', handleContainerClick, { capture: true });
//       container.addEventListener('mousedown', handleContainerClick, { capture: true });
      

//       // 이미지 깨지면 숨김 처리
//       const img = container.querySelector('.overlay__img')
//       if (img) {
//         img.addEventListener('error', () => {
//             img.style.display = 'none'
//           },
//           // once는 이벤트 리스너 옵션 .. 한 번 실행되면 자동 제거
//           { once: true }
//         )
//       }
//     }, 0)
//   }

//   /**
//    * displayBakeryMarkers
//    * 
//    * @description marker 보이기
//    * @param {*} mapInstance 
//    * @returns 
//    */
//   const displayBakeryMarkers = (mapInstance) => {
//     const { kakao } = window
//     if (!mapInstance || !bakeries || bakeries.length === 0) return

//     // 중복 마커 방지
//     clearMarkers()

//     bakeries.forEach((bakery) => {
//       if (bakery.latitude && bakery.longitude) {
//         const bakeryPosition = new kakao.maps.LatLng(
//           Number(bakery.latitude),
//           Number(bakery.longitude)
//         )

//         const bakeryMarker = new kakao.maps.Marker({
//           position: bakeryPosition,
//           map: mapInstance,
//         })

//         markersRef.current.push(bakeryMarker)

//         // 마커 클릭 시 CustomOverlay 열기
//         kakao.maps.event.addListener(bakeryMarker, 'click', () => {
//           openOverlay(mapInstance, bakery, bakeryPosition)
//         })
//       }
//     })

//     // 지도 클릭하면 오버레이 닫기(선택 UX)
//     kakao.maps.event.addListener(mapInstance, 'click', () => {
//       overlayRef.current?.setMap(null)
//     })
//   }

//   const getLocation = () => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const lat = position.coords.latitude
//         const lon = position.coords.longitude

//         const mapContainer = document.getElementById('map')
//         const mapPosition = new window.kakao.maps.LatLng(lat, lon)

//         const options = { center: mapPosition, level: 5 }
//         const mapInstance = new window.kakao.maps.Map(mapContainer, options)
//         setMap(mapInstance)

//         // 현재 위치 마커
//         const marker = new window.kakao.maps.Marker({ position: mapPosition })
//         marker.setMap(mapInstance)

//         if (bakeries.length > 0) displayBakeryMarkers(mapInstance)
//       },
//       (error) => {
//         console.error('Error Code : ', error.code)
//       }
//     )
//   }

//   const loadScript = () => {
//     const script = document.createElement('script')
//     script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false`
//     script.onload = () => window.kakao.maps.load(getLocation)
//     document.head.appendChild(script)
//   }

//   useEffect(() => {
//     getBakeries()
//   }, [getBakeries])

//   useEffect(() => {
//     if (map && bakeries.length > 0) displayBakeryMarkers(map)
//   }, [map, bakeries])

//   useEffect(() => {
//     if (window.kakao && window.kakao.maps) {
//       getLocation()
//     } else {
//       loadScript()
//     }

//     // cleanup (컴포넌트 언마운트 시)
//     return () => {
//       clearMarkers()
//       overlayRef.current?.setMap(null)
//       overlayRef.current = null
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   return (
//     <div className="bakeryMap">
//       <div className="bakeryMap__inner">
//         <div id="map">{map && <p>Map is loaded</p>}</div>
//       </div>
//     </div>
//   )
// }

// export default BakeryMap

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { fetchBakeries } from '../../apis/bakeryApi'
import './BakeryMap.style.scss'

const BakeryMap = ({ onBakeryClick }) => {
  const [map, setMap] = useState(null)
  const [bakeries, setBakeries] = useState([])

  // 마커 / 오버레이는 ref로 관리 (리렌더 방지)
  const markersRef = useRef([])
  const overlayRef = useRef(null)

  /* =========================
   * 데이터 로드
   ========================= */
  const getBakeries = useCallback(async () => {
    try {
      const response = await fetchBakeries()
      setBakeries(response?.data || [])
    } catch (error) {
      console.error('빵집 데이터를 가져올 수 없습니다.', error)
    }
  }, [])

  /* =========================
   * 유틸
   ========================= */
  const clearMarkers = () => {
    markersRef.current.forEach((marker) => marker.setMap(null))
    markersRef.current = []
  }

  /* =========================
   * 오버레이
   ========================= */
  const createOverlayContent = (bakery) => {
    const img = bakery.imageUrl || ''
    const name = bakery.name || '빵집'
    const addr = bakery.address || ''

    return `
      <div class="overlay">
        <div class="overlay__top">
          <strong class="overlay__title">${name}</strong>
          <button class="overlay__close" type="button">×</button>
        </div>
        ${img ? `<img class="overlay__img" src="${img}" alt="${name}" />` : ''}
        <div class="overlay__addr">${addr}</div>
        <button class="overlay__btn" type="button">상세보기</button>
      </div>
    `
  }

  const ensureOverlay = (mapInstance) => {
    if (overlayRef.current) return overlayRef.current

    const overlay = new window.kakao.maps.CustomOverlay({
      content: '<div />',
      position: mapInstance.getCenter(),
      yAnchor: 1,
      zIndex: 999,
    })

    overlayRef.current = overlay
    return overlay
  }

  const openOverlay = (mapInstance, bakery, position) => {
    const overlay = ensureOverlay(mapInstance)

    overlay.setContent(createOverlayContent(bakery))
    overlay.setPosition(position)
    overlay.setMap(mapInstance)

    setTimeout(() => {
      const container = document.querySelector('.overlay')
      if (!container) return

      container
        .querySelector('.overlay__close')
        ?.addEventListener('click', () => overlay.setMap(null), { once: true })

      container
        .querySelector('.overlay__btn')
        ?.addEventListener('click', (e) => {
          e.preventDefault()
          e.stopPropagation()
          overlay.setMap(null)
          onBakeryClick?.(bakery)
        })
    }, 0)
  }

  /* =========================
   * 마커 표시
   ========================= */
  const displayBakeryMarkers = (mapInstance) => {
    if (!mapInstance || bakeries.length === 0) return

    clearMarkers()

    bakeries.forEach((bakery) => {
      if (!bakery.latitude || !bakery.longitude) return

      const position = new window.kakao.maps.LatLng(
        Number(bakery.latitude),
        Number(bakery.longitude)
      )

      const marker = new window.kakao.maps.Marker({
        position,
        map: mapInstance,
      })

      markersRef.current.push(marker)

      window.kakao.maps.event.addListener(marker, 'click', () => {
        openOverlay(mapInstance, bakery, position)
      })
    })

    window.kakao.maps.event.addListener(mapInstance, 'click', () => {
      overlayRef.current?.setMap(null)
    })
  }

  /* =========================
   * 지도 초기화 (내 위치 기반)
   ========================= */
  const initMap = () => {
    const container = document.getElementById('map')
    if (!container) return

    // 위치 권한 거부 / 실패 대비 fallback (대전)
    const fallbackCenter = new window.kakao.maps.LatLng(36.3504, 127.3845)

    const createMap = (center) => {
      const mapInstance = new window.kakao.maps.Map(container, {
        center,
        level: 5,
      })

      setMap(mapInstance)

      // 현재 위치 마커
      const myMarker = new window.kakao.maps.Marker({ position: center })
      myMarker.setMap(mapInstance)
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          const myPosition = new window.kakao.maps.LatLng(lat, lng)
          createMap(myPosition)
        },
        () => {
          // 위치 권한 거부 시 fallback
          createMap(fallbackCenter)
        }
      )
    } else {
      createMap(fallbackCenter)
    }
  }

  /* =========================
   * Effects
   ========================= */
  // 빵집 데이터 로드
  useEffect(() => {
    getBakeries()
  }, [getBakeries])

  // SDK 로드 후 지도 생성
  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) return

    // autoload=false 이므로 반드시 load 사용
    window.kakao.maps.load(() => {
      initMap()
    })

    return () => {
      clearMarkers()
      overlayRef.current?.setMap(null)
      overlayRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 지도 + 데이터 준비되면 마커 표시
  useEffect(() => {
    if (map && bakeries.length > 0) {
      displayBakeryMarkers(map)
    }
  }, [map, bakeries])

  return (
    <div className="bakeryMap">
      <div className="bakeryMap__inner">
        <div id="map" />
      </div>
    </div>
  )
}

export default BakeryMap
