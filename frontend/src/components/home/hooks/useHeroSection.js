import {createSearchParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export default function useHeroSection({isCardVisible, onCardEnter, onCardLeave}) {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(null);
  const [rooms, setRooms] = useState(1);
  const [showGuestPopup, setShowGuestPopup] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  const backgroundImages = [
    "/images/hero-bg-1.jpg",
    "/images/hero-bg-2.jpg",
    "/images/hero-bg-3.jpg",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const handlePrevBackground = () => {
    setBackgroundIndex((prevIndex) => (prevIndex - 1 + backgroundImages.length) % backgroundImages.length);
  };

  const handleNextBackground = () => {
    setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
  };

  const handleSearch = () => {
    const params = {};
    if (destination) params.destination = destination;
    if (checkInDate && checkOutDate) {
      params.checkIn = checkInDate.toISOString().split("T")[0];
      params.checkOut = checkOutDate.toISOString().split("T")[0];
    }
    if (guests !== null) {
      params.guests = guests;
    }

    if (Object.keys(params).length === 0) {
      navigate("/search");
    } else {
      navigate({
        pathname: "/search",
        search: createSearchParams(params).toString(),
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleCounter = (type, operation) => {
    if (type === "rooms") {
      if (operation === "inc") setRooms((prev) => prev + 1);
      if (operation === "dec" && rooms > 1) setRooms((prev) => prev - 1);
    } else {
      if (operation === "inc") setGuests((prev) => (prev || 0) + 1);
      if (operation === "dec" && (guests || 1) > 1) setGuests((prev) => Math.max((prev || 1) - 1, 1));
    }
  };

  return {
    navigate,
    handlePrevBackground,
    handleNextBackground,
    handleCounter,
    handleKeyDown,
    destination,
    setDestination,
    setCheckInDate,
    setCheckOutDate,
    setGuests,
    setRooms,
    showGuestPopup,
    setShowGuestPopup,
    backgroundIndex,
    setBackgroundIndex,
    backgroundImages,
    handleSearch,
  }
}