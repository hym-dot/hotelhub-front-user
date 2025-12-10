import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/components/home/HeroSearchWrap.scss'

const HeroSearchWrap = () => {
  const navigate = useNavigate()
  const [destination, setDestination] = useState('')
  const [checkIn, setCheckIn] = useState('2024-01-22')
  const [checkOut, setCheckOut] = useState('2024-01-24')
  const [rooms, setRooms] = useState('1')
  const [guests, setGuests] = useState('2')

  const handleSearch = (e) => {
    e.preventDefault()
    
    // 검색 페이지로 이동하면서 쿼리 파라미터 전달
    const searchParams = new URLSearchParams({
      destination: destination,
      checkIn: checkIn,
      checkOut: checkOut,
      rooms: rooms,
      guests: guests,
    })
    
    navigate(`/search?${searchParams.toString()}`)
  }

  return (
    <div className='container'>

     <div className="search-form">
      <h3>Where are you staying?</h3>
      <form className="form-container" onSubmit={handleSearch}>
       <div className="form-group">
        <label>Enter Destination</label>
        <input
         type="text"
         placeholder="예) 서울, 부산, 제주"
         className="destination-input"
         value={destination}
         onChange={(e) => setDestination(e.target.value)}
        />
       </div>

       <div className="form-group">
        <label>Check In</label>
        <input 
          type="date" 
          value={checkIn} 
          onChange={(e) => setCheckIn(e.target.value)}
          className="date-input" 
        />
       </div>

       <div className="form-group">
        <label>Check Out</label>
        <input 
          type="date" 
          value={checkOut} 
          onChange={(e) => setCheckOut(e.target.value)}
          className="date-input" 
        />
       </div>

       <div className="form-group">
        <label>Rooms & Guests</label>
        <select 
          className="guests-select"
          value={`${rooms},${guests}`}
          onChange={(e) => {
            const [r, g] = e.target.value.split(',')
            setRooms(r)
            setGuests(g)
          }}
        >
         <option value="1,1">1 room, 1 guest</option>
         <option value="1,2">1 room, 2 guests</option>
         <option value="1,3">1 room, 3 guests</option>
         <option value="2,2">2 rooms, 2 guests</option>
         <option value="2,4">2 rooms, 4 guests</option>
         <option value="3,6">3 rooms, 6 guests</option>
        </select>
       </div>

       <button type="submit" className="btn-search" style={{
         padding: '1rem 2rem',
         backgroundColor: '#8DD3BB',
         color: '#112211',
         border: 'none',
         borderRadius: '0.5rem',
         fontSize: '1rem',
         fontWeight: 'bold',
         cursor: 'pointer',
         marginTop: '1rem',
         width: '100%'
       }}>
         Search
       </button>
      </form>
     </div>

    <div className="user-menu">
     <div className="user-info">
      <div className="avatar">T</div>
      <div className="user-details">
       <span className="username">Tomhoon</span>
       <span className="status">Online</span>
      </div>
     </div>
     <div className="menu-items">
      <div className="menu-item">위시</div>
      <div className="menu-item">출연내역</div>
      <div className="menu-item">설정</div>
      <div className="menu-item">로그아웃</div>
     </div>
    </div>
    </div>
  )
}

export default HeroSearchWrap