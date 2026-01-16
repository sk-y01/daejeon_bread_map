import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchBakeries } from '../../apis/bakeryApi'
import './BakeryMap.style.scss'

const BakeryMap = ({ onBakeryClick }) => {
  const [map, setMap] = useState(null)
  const [bakeries, setBakeries] = useState([])

  const navigate = useNavigate()
  const kakaoKey = import.meta.env.VITE_KAKAO_KEY
  console.log('kakaoKey : ', kakaoKey)

  // 마커/오버레이를 ref로 관리 (렌더링에 영향 X)
  const markersRef = useRef([])
  const overlayRef = useRef(null)

  const getBakeries = useCallback(async () => {
    try {
      const response = await fetchBakeries()
      setBakeries(response?.data || [])
    } catch (error) {
      console.error('빵집 데이터를 가져올 수 없습니다. ', error)
    }
  }, [])

  // 오버레이 DOM 생성 (React JSX가 아니라 “문자열/DOM”로 넣어야 안정적)
  const createOverlayContent = (bakery) => {
    const img = bakery.imageUrl || ''
    const safeName = bakery.name || '빵집'
    const safeAddr = bakery.address || ''

    return `
      <div class="overlay">
        <div class="overlay__top">
          <strong class="overlay__title">${safeName}</strong>
          <button class="overlay__close" type="button" aria-label="close">×</button>
        </div>

        ${img ? `<img class="overlay__img" src="${img}" alt="${safeName}" />` : ''}

        <div class="overlay__addr">${safeAddr}</div>

        <button class="overlay__btn" type="button">
          상세보기
        </button>
      </div>
    `
  }

  // 기존 마커 제거
  const clearMarkers = () => {
    markersRef.current.forEach((markers) => markers.setMap(null))
    markersRef.current = []
  }

  // CustomOverlay를 “하나만 생성해서 재사용”
  const ensureOverlay = (mapInstance) => {
    const { kakao } = window
    if (overlayRef.current) return overlayRef.current

    const overlay = new kakao.maps.CustomOverlay({
      content: '<div />',
      position: mapInstance.getCenter(),
      yAnchor: 1,
      zIndex: 999,
    })

    overlayRef.current = overlay

    return overlay
  }

  // 오버레이 열기
  const openOverlay = (mapInstance, bakery, position) => {
    const overlay = ensureOverlay(mapInstance)

    // 기존 오버레이가 열려있으면 먼저 닫기 (선택사항)
    // overlay.setMap(null)

    overlay.setContent(createOverlayContent(bakery))
    overlay.setPosition(position)
    overlay.setMap(mapInstance)

    // content는 DOM으로 렌더된 뒤에 querySelector 가능
    // overlay.getContent()는 문자열일 수도 있어서, map 컨테이너에서 찾는 방식이 안전
    setTimeout(() => {
      const container = document.querySelector('.overlay')
      if (!container) return

      const closeBtn = container.querySelector('.overlay__close')
      closeBtn?.addEventListener('click', () => overlay.setMap(null), { once: true })

      // 상세 보기
      // 이벤트 위임 방식으로 컨테이너에 이벤트 리스너 등록 
      const handleContainerClick = (e) => {
        const detailBtn = container.querySelector('.overlay__btn');

        if(detailBtn){
          // 이벤트 전파 차단
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();

          overlay.setMap(null);
          if(onBakeryClick) {
            onBakeryClick(bakery);
          }

          // 이벤트 리스너 제거
          container.removeEventListener('click', handleContainerClick);
          container.removeEventListener('mousedown', handleContainerClick);
        }
      };

      // 컨테이너에 이벤트 위임으로 등록
      container.addEventListener('click', handleContainerClick, { capture: true });
      container.addEventListener('mousedown', handleContainerClick, { capture: true });
      

      // 이미지 깨지면 숨김 처리
      const img = container.querySelector('.overlay__img')
      if (img) {
        img.addEventListener('error', () => {
            img.style.display = 'none'
          },
          // once는 이벤트 리스너 옵션 .. 한 번 실행되면 자동 제거
          { once: true }
        )
      }
    }, 0)
  }

  /**
   * displayBakeryMarkers
   * 
   * @description marker 보이기
   * @param {*} mapInstance 
   * @returns 
   */
  const displayBakeryMarkers = (mapInstance) => {
    const { kakao } = window
    if (!mapInstance || !bakeries || bakeries.length === 0) return

    // 중복 마커 방지
    clearMarkers()

    bakeries.forEach((bakery) => {
      if (bakery.latitude && bakery.longitude) {
        const bakeryPosition = new kakao.maps.LatLng(
          Number(bakery.latitude),
          Number(bakery.longitude)
        )

        const bakeryMarker = new kakao.maps.Marker({
          position: bakeryPosition,
          map: mapInstance,
        })

        markersRef.current.push(bakeryMarker)

        // 마커 클릭 시 CustomOverlay 열기
        kakao.maps.event.addListener(bakeryMarker, 'click', () => {
          openOverlay(mapInstance, bakery, bakeryPosition)
        })
      }
    })

    // 지도 클릭하면 오버레이 닫기(선택 UX)
    kakao.maps.event.addListener(mapInstance, 'click', () => {
      overlayRef.current?.setMap(null)
    })
  }

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude

        const mapContainer = document.getElementById('map')
        const mapPosition = new window.kakao.maps.LatLng(lat, lon)

        const options = { center: mapPosition, level: 5 }
        const mapInstance = new window.kakao.maps.Map(mapContainer, options)
        setMap(mapInstance)

        // 현재 위치 마커
        const marker = new window.kakao.maps.Marker({ position: mapPosition })
        marker.setMap(mapInstance)

        if (bakeries.length > 0) displayBakeryMarkers(mapInstance)
      },
      (error) => {
        console.error('Error Code : ', error.code)
      }
    )
  }

  const loadScript = () => {
    const script = document.createElement('script')
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false`
    script.onload = () => window.kakao.maps.load(getLocation)

    console.log('1 ::: loadScript !!!!!!!!!!!')

    document.head.appendChild(script)
  }

  useEffect(() => {
    getBakeries()
  }, [getBakeries])

  useEffect(() => {
    console.log('2 :: map..... ', map)
    if (map && bakeries.length > 0) displayBakeryMarkers(map)
  }, [map, bakeries])

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      getLocation()
    } else {
      loadScript()
    }

    // cleanup (컴포넌트 언마운트 시)
    return () => {
      clearMarkers()
      overlayRef.current?.setMap(null)
      overlayRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="bakeryMap">
      <div className="bakeryMap__inner">
        <div id="map">{map && <p>Map is loaded</p>}</div>
      </div>
    </div>
  )
}

export default BakeryMap