import Header from "../../components/common/Header";
import HeroSection from "../../components/home/HeroSection";
import PopularDestinations from "../../components/home/PopularDestinations";
import "../../styles/pages/home/HomePage.scss";
import useHomePage from "./hooks/useHomePage.js";

const HomePage = () => {
  const {
    isCardVisible,
    handleMouseEnter,
    handleMouseLeave,
  } = useHomePage();

  return (
    <div className="home-page top-container">
      <Header 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave} 
      />

      <HeroSection 
        isCardVisible={isCardVisible}
        onCardEnter={handleMouseEnter}
        onCardLeave={handleMouseLeave}
      />
      
      <PopularDestinations />
    </div>
  );
};

export default HomePage;