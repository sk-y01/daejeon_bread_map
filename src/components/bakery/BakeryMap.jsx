import React, { useEffect, useState } from 'react'

// 현재 위치 가져오기 
const BakeryMap = () => {
  const [map, setMap] = useState(null);

  // 환경변수 파일 가져오기
  const kakaoKey = import.meta.env.VITE_KAKAO_KEY;
  
  const getLocation = () => {

    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      
      // console.log('lat :', lat);
      // console.log('lon :', lon);

      const mapContainer = document.getElementById('map');

      const mapPosition = new window.kakao.maps.LatLng(lat, lon);

      const options = {
        center: mapPosition,
        level :2
      };

      const mapInstance = new window.kakao.maps.Map(mapContainer, options);
      setMap(mapInstance);

      const marker = new window.kakao.maps.Marker({
        position : mapPosition // 마커의 위치를 설정
      });

      // 지도에 마커를 표시
      marker.setMap(mapInstance);
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