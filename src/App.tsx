import React from "react";
import Router from "./router.tsx";
import { ToastContainer } from "react-toastify";
import ThemeProvider from "./core/providers/ThemeProvider.tsx";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="flex h-screen flex-col items-center justify-center overflow-hidden bg-gray-100 dark:bg-dark-secondary">
        <Router />
        <ToastContainer />
          
      </div>
    </ThemeProvider>
  );
};

export default App;
