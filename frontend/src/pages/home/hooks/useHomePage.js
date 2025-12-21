import {useRef, useState} from "react";

export default function useHomePage() {
  const [isCardVisible, setIsCardVisible] = useState(false);
  const timeoutRef = useRef(null); // 딜레이 타이머 저장용

  // ✅ 마우스가 들어오면: 닫히려는 타이머 취소하고 보여주기
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsCardVisible(true);
  };

  // ✅ 마우스가 나가면: 0.2초 뒤에 닫기 (바로 닫지 않음!)
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsCardVisible(false);
    }, 200); // 0.2초 딜레이
  };

  return {
    isCardVisible,
    timeoutRef,
    handleMouseEnter,
    handleMouseLeave,
  }
}