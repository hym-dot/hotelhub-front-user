import React from "react";
import AppRouter from "./AppRouter";
import { WishlistProvider } from "./context/WishlistContext";

const App = () => {
  return (
    <WishlistProvider>
      <AppRouter />
    </WishlistProvider>
  );
};

export default App;