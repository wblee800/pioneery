import React, { useState, useCallback } from 'react';
import { Star, MapPin, Image as ImageIcon } from 'lucide-react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import '../index.css';

// 지도 컨테이너 스타일
const mapContainerStyle = {
  width: '100%',
  height: '500px'
};

// 캐나다 중심 좌표
const center = {
  lat: 56.1304,
  lng: -106.3468
};

// 구글 맵스 기본 옵션
const options = {
  disableDefaultUI: false,
  zoomControl: true,
};

// 캐나다 IT 회사들의 임시 데이터
const companiesData = [
  {
    id: 1,
    name: "Shopify",
    location: "150 Elgin Street, Ottawa, ON",
    coordinates: { lat: 45.4215, lng: -75.6972 },
    rating: 4.8,
    reviews: 156,
    images: ["/api/placeholder/400/300"],
    description: "캐나다의 대표적인 이커머스 플랫폼 기업"
  },
  {
    id: 2,
    name: "OpenText",
    location: "275 Frank Tompa Drive, Waterloo, ON",
    coordinates: { lat: 43.4867, lng: -80.5369 },
    rating: 4.2,
    reviews: 89,
    images: ["/api/placeholder/400/300"],
    description: "엔터프라이즈 정보 관리 솔루션 기업"
  },
  {
    id: 3,
    name: "Hootsuite",
    location: "5 East 8th Avenue, Vancouver, BC",
    coordinates: { lat: 49.2634, lng: -123.1016 },
    rating: 3.9,
    reviews: 112,
    images: ["/api/placeholder/400/300"],
    description: "소셜 미디어 관리 플랫폼"
  },
  {
    id: 4,
    name: "D2L",
    location: "151 Charles Street West, Kitchener, ON",
    coordinates: { lat: 43.4516, lng: -80.4925 },
    rating: 4.5,
    reviews: 78,
    images: ["/api/placeholder/400/300"],
    description: "교육용 소프트웨어 개발 기업"
  },
  {
    id: 5,
    name: "Lightspeed",
    location: "700 Saint-Antoine Street East, Montreal, QC",
    coordinates: { lat: 45.5088, lng: -73.5549 },
    rating: 4.6,
    reviews: 93,
    images: ["/api/placeholder/400/300"],
    description: "POS 및 이커머스 솔루션 제공 기업"
  }
];

const MapViewer = () => {
  const [showHighRated, setShowHighRated] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [map, setMap] = useState(null);
  const [infoWindowCompany, setInfoWindowCompany] = useState(null);

  // 4점 이상 필터링
  const filteredCompanies = showHighRated
    ? companiesData.filter(company => company.rating >= 4.0)
    : companiesData;

  // 회사 선택 시 지도 중심 이동 및 상세 정보 표시
  const handleCompanyClick = useCallback((company) => {
    setSelectedCompany(company);
    if (map) {
      map.panTo(company.coordinates);
      map.setZoom(15);
    }
  }, [map]);

  // 지도 로드 완료 시 호출
  const onLoad = useCallback((map) => {
    setMap(map);

    // 모든 마커가 보이도록 지도 범위 조정
    const bounds = new window.google.maps.LatLngBounds();
    companiesData.forEach(company => {
      bounds.extend(company.coordinates);
    });
    map.fitBounds(bounds);
  }, []);

  // 마커 클릭 시 정보창 표시
  const handleMarkerClick = (company) => {
    setInfoWindowCompany(company);
    setSelectedCompany(company);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col gap-4">
        {/* 필터 토글 */}
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showHighRated}
              onChange={() => setShowHighRated(!showHighRated)}
              className="w-4 h-4"
            />
            <span>4점 이상만 보기</span>
          </label>
        </div>

        {/* 구글 맵스 */}
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={4}
            options={options}
            onLoad={onLoad}
          >
            {filteredCompanies.map(company => (
              <Marker
                key={company.id}
                position={company.coordinates}
                onClick={() => handleMarkerClick(company)}
              />
            ))}

            {infoWindowCompany && (
              <InfoWindow
                position={infoWindowCompany.coordinates}
                onCloseClick={() => setInfoWindowCompany(null)}
              >
                <div className="p-2">
                  <h3 className="font-bold">{infoWindowCompany.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>{infoWindowCompany.rating}</span>
                    <span className="text-sm text-gray-500">
                      ({infoWindowCompany.reviews} 리뷰)
                    </span>
                  </div>
                  <p className="text-sm mt-1">{infoWindowCompany.location}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>

        {/* 회사 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCompanies.map(company => (
            <div
              key={company.id}
              className={`bg-white rounded-lg shadow cursor-pointer transition-shadow hover:shadow-lg p-4 ${
                selectedCompany?.id === company.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handleCompanyClick(company)}
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold">{company.name}</h3>

                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{company.location}</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="ml-1">{company.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({company.reviews} 리뷰)
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <ImageIcon className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {company.images.length}장의 사진
                  </span>
                </div>

                <p className="text-sm text-gray-600 mt-2">
                  {company.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 선택된 회사 상세 정보 */}
        {selectedCompany && (
          <div className="bg-white rounded-lg shadow-lg mt-4 p-4">
            <h2 className="text-xl font-bold mb-4">{selectedCompany.name} 상세 정보</h2>
            <div className="flex flex-col gap-4">
              <img
                src={selectedCompany.images[0]}
                alt={selectedCompany.name}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">위치</h3>
                  <p className="text-gray-600">{selectedCompany.location}</p>
                </div>
                <div>
                  <h3 className="font-semibold">평점</h3>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span>{selectedCompany.rating}</span>
                    <span className="text-gray-500">
                      ({selectedCompany.reviews} 리뷰)
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold">설명</h3>
                <p className="text-gray-600">{selectedCompany.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapViewer;