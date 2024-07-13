import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../redux/store";

const NavBar = () => {
  const isActive = useSelector((state: RootState) => state.persistedReducer.navbarFixed.value);
  const path = window.location.pathname
  const personalDetails = useSelector(
    (state: RootState) =>
      state.persistedReducer.personalDetailsSlice.personalDetails
  );
  return (
    <>
      <div className={`navbar ${isActive ? "fixed" : "sticky"} text-white`}>
        <div className="navbar-start">
          <NavLink to={"/"} className="btn btn-ghost text-xl">
            InstaCV
          </NavLink>
        </div>
        {(personalDetails.length>1 && path.substring(1)!=="dashboard") && (
          <div className="navbar-end">
            <NavLink className="btn" to={"/dashboard"}>
              My work!
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;
