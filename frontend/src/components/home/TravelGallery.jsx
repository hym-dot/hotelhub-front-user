import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../../styles/components/home/TravelGallery.scss';

const TravelGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    {
      id: 1,
      src: '/images/gallery-1.jpg',
      alt: '제주도 해변',
      title: '제주도',
      description: '아름다운 해변과 자연경관',
    },
    {
      id: 2,
      src: '/images/gallery-2.jpg',
      alt: '발리 휴양지',
      title: '발리',
      description: '신비로운 열대 낙원',
    },
    {
      id: 3,
      src: '/images/gallery-3.jpg',
      alt: '방콕 야경',
      title: '방콕',
      description: '동남아 여행의 중심',
    },
    {
      id: 4,
      src: '/images/gallery-4.jpg',
      alt: '푸켓 비치',
      title: '푸켓',
      description: '세계 최고의 비치 리조트',
    },
    {
      id: 5,
      src: '/images/hotel1.jpg',
      alt: '산리조트',
      title: '산리조트',
      description: '고급스러운 산악 휴양지',
    },
    {
      id: 6,
      src: '/images/hotel2.jpg',
      alt: '도시호텔',
      title: '도시호텔',
      description: '도심 속 프리미엄 숙소',
    },
  ];

  return (
    <div className="travel-gallery-section">
      <div className="container">
        <div className="gallery-header">
          <h2>여행 아이디어</h2>
          <p>전 세계의 아름다운 여행지를 구경해보세요</p>
        </div>

        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className={`gallery-item ${index === 0 ? 'large' : index === 1 ? 'tall' : ''}`}
              onClick={() => setSelectedImage(image)}
            >
              <img src={image.src} alt={image.alt} loading="lazy" />
              <div className="gallery-overlay">
                <div className="gallery-info">
                  <h3>{image.title}</h3>
                  <p>{image.description}</p>
                </div>
                <button className="btn-explore">
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 이미지 모달 */}
      {selectedImage && (
        <div className="gallery-modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="btn-close" onClick={() => setSelectedImage(null)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <img src={selectedImage.src} alt={selectedImage.alt} />
            <div className="modal-info">
              <h2>{selectedImage.title}</h2>
              <p>{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelGallery;