import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import "preline/preline";
import { IStaticMethods } from "preline/preline";
import { useEffect } from "react";
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

const App = () => {
  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return (
    <>
      <div className="">
        <NavBar />
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default App;
