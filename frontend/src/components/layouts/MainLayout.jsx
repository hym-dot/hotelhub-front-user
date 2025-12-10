import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../common/Footer';
import Header from '../common/Header'

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Header /> 
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;