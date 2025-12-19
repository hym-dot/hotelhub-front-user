import React, { useState, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faCheck, faUsers } from '@fortawesome/free-solid-svg-icons';
import { hotelApi } from '../../api/hotelApi';
import '../../styles/pages/booking/BookingStepRoom.scss';

const BookingStepRoom = () => {
  const { hotelId } = useParams();
  const { bookingData, setBookingData, navigate } = useOutletContext();
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRooms = async () => {
      setLoading(true);
      try {
        const params = {};
        if (bookingData?.checkIn) params.checkIn = bookingData.checkIn;
        if (bookingData?.checkOut) params.checkOut = bookingData.checkOut;
        if (bookingData?.guests) params.guests = bookingData.guests;

        const data = await hotelApi.getHotelRooms(hotelId, params);
        setRooms(data || []);
      } catch (error) {
        console.error('객실 목록 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    if (hotelId) {
      loadRooms();
    }
  }, [hotelId, bookingData?.checkIn, bookingData?.checkOut, bookingData?.guests]);

  const handleRoomSelect = (roomId) => {
    setSelectedRoomType(roomId);
  };

  const handleNext = () => {
    if (!selectedRoomType) {
      alert('객실을 선택해주세요.');
      return;
    }
    const selectedRoom = rooms.find((r) => (r._id || r.id) === selectedRoomType);
    const nights = bookingData?.nights || 1;
    const pricePerNight = selectedRoom?.price || bookingData?.pricePerNight || 0;
    setBookingData((prev) => ({
      ...prev,
      roomType: selectedRoom,
      roomId: selectedRoom?._id || selectedRoom?.id,
      pricePerNight,
      totalPrice: nights * pricePerNight,
    }));
    navigate(`/booking/${hotelId}/extras`);
  };

  const handleBack = () => {
    navigate(`/booking/${hotelId}`);
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>객실 정보를 불러오는 중...</div>;
  if (rooms.length === 0) return <div style={{ padding: '2rem', textAlign: 'center' }}>조건에 맞는 객실이 없습니다.</div>;

  return (
    <div className="booking-step-room">
      <h2>투숙할 객실을 선택하세요</h2>

      <div className="room-grid">
        {rooms.map((room) => {
          const roomId = room._id || room.id;
          return (
            <div
              key={roomId}
              className={`room-card ${selectedRoomType === roomId ? 'selected' : ''}`}
              onClick={() => handleRoomSelect(roomId)}
            >
              {selectedRoomType === roomId && (
                <div className="selected-badge">
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              )}

              <div className="room-image">
                <img src={room.images?.[0] || room.image || '/images/room-placeholder.jpg'} alt={room.name || room.type} />
                {room.available && <span className="available-badge">잔여 {room.available}개</span>}
              </div>

              <div className="room-details">
                <h3>{room.name || room.type}</h3>
                <p className="description">{room.description || ''}</p>

                <div className="room-specs">
                  <span className="spec">
                    <strong>{room.size || '객실 크기'}</strong>
                  </span>
                  <span className="spec">
                    <FontAwesomeIcon icon={faUsers} /> {room.capacity || room.guests || 2}명
                  </span>
                </div>

                <div className="amenities-list">
                  {(room.amenities || []).map((amenity, index) => (
                    <span key={index} className="amenity-tag">
                      {amenity}
                    </span>
                  ))}
                </div>

                <div className="room-footer">
                  <div className="price">
                    <span className="label">1박 요금</span>
                    <span className="value">₩{(room.price || 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="navigation-buttons">
        <button className="btn-back" onClick={handleBack}>
          <FontAwesomeIcon icon={faChevronLeft} />
          이전 단계
        </button>
        <button
          className="btn-next"
          onClick={handleNext}
          disabled={!selectedRoomType}
        >
          추가 옵션 선택
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default BookingStepRoom;
