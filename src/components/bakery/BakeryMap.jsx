import React, { useCallback, useEffect, useState } from 'react'
import { fetchBakeries } from '../../apis/bakeryApi'

const BakeryMap = () => {
  const [map, setMap] = useState(null);
  const [bakeries, setBakeries] = useState([]);
  // 환경변수 파일 가져오기
  const kakaoKey = import.meta.env.VITE_KAKAO_KEY;

  // bakery 데이터 조회
  // 함수 재사용성 및 의존성 관리를 위해 useCallback 사용
  const getBakeries = useCallback(async () => {
    try {
      const response = await fetchBakeries()
      setBakeries(await response?.data)
    } catch (error) {
      console.error('빵집 데이터를 가져올 수 없습니다. ', error)
    }
  }, [])

  // 빵집 마커를 지도에 표시하는 함수
  const displayBakeryMarkers = (mapInstance) => {
    const { kakao } = window
    if (!mapInstance || !bakeries || bakeries.length === 0) return;

    bakeries.forEach((bakery) => {
      // latitude, longitude가 유효한 경우
      if (bakery.latitude && bakery.longitude) {
        const bakeryPosition = new kakao.maps.LatLng(
          parseFloat(bakery.latitude),
          parseFloat(bakery.longitude)
        )

        const bakeryMarker = new kakao.maps.Marker({
          position: bakeryPosition,
          map: mapInstance
        })

        // 마커 클릭 시 정보창 표시
        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px;font-size:12px;">${bakery.name || '빵집'}</div>`
        });

        kakao.maps.event.addListener(bakeryMarker, 'click', () => {
          infowindow.open(mapInstance, bakeryMarker)
        })
      }
    })
  }

  // 위치 정보
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const mapContainer = document.getElementById('map');

      const mapPosition = new window.kakao.maps.LatLng(lat, lon);

      const options = {
        center: mapPosition,
        level: 2
      };

      const mapInstance = new window.kakao.maps.Map(mapContainer, options);
      setMap(mapInstance);

      // 현재 위치 표시
      const marker = new window.kakao.maps.Marker({
        position : mapPosition 
      });

      // 지도에 마커를 표시
      marker.setMap(mapInstance);

      // 빵집 데이터가 이미 로드되어 있다면 마커 표시
      if (bakeries.length > 0) {
        displayBakeryMarkers(mapInstance)
      }
    }, (error) => {
      console.error('Error Code : ', error.code);
    });
  }

  // loadScript
  const loadScript = () => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false`;
    script.onload = () => window.kakao.maps.load(getLocation);
    document.head.appendChild(script);
  }

  // 빵집 데이터 가져오기
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getBakeries()
  }, [getBakeries])

  // 지도와 빵집 데이터 모두 준비되면 마커 표시
  useEffect(() => {
    if (map && bakeries.length > 0) {
      displayBakeryMarkers(map)
    }
  }, [map, bakeries])

  // 카카오맵 스크립트
  useEffect(() => {
    if(window.kakao && window.kakao.maps) {
      getLocation();
    } else {
      loadScript();
    }
  }, []);

  return (
    <div className="bakeryMap">
      <div className="bakeryMap__inner">
        <div id="map">
          { map && <p>Map is loaded</p>}
        </div>
      </div>
    </div>
  )
}

export default BakeryMap