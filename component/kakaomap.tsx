import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

interface markers {
    position: {
        lat: string;
        lng: string;
    };
    content: string;
}

const KakaoMap = (props : {place : string, food : string} ) => {
    const [info, setInfo] = useState()
    const [markers, setMarkers] = useState<Array<markers>>([])
    const [map, setMap] = useState()
  
    useEffect(() => {
      if (!map) return
      const ps = new kakao.maps.services.Places()
  
      ps.keywordSearch(`${props.place} ${props.food}`, (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          const bounds = new kakao.maps.LatLngBounds()
          let markers = []
  
          for (var i = 0; i < data.length; i++) {
            // @ts-ignore
            markers.push({
              position: {
                lat: data[i].y,
                lng: data[i].x,
              },
              content: data[i].place_name,
            })
            // @ts-ignore
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
          }
          setMarkers(markers)
  
          // @ts-ignore
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          map.setBounds(bounds)
        }
      })
    }, [map])
  
    return (
      <Map // 로드뷰를 표시할 Container
        center={{
          lat: 37.566826,
          lng: 126.9786567,
        }}
        style={{
          width: "100%",
          height: "350px",
        }}
        level={3}
        // @ts-ignore
        onCreate={setMap}
      >
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            // @ts-ignore
            position={marker.position}
            // @ts-ignore
            onClick={() => setInfo(marker)}
          >
            {   // @ts-ignore
                info &&info.content === marker.content && (
              <div style={{color:"#000"}}>{marker.content}</div>
            )}
          </MapMarker>
        ))}
      </Map>
    )

}

export default KakaoMap;