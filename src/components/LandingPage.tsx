import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeFixed } from "../redux/slices/navbarSlice";
import { AppDispatch, RootState } from "../redux/store";
import LandingPageHeroSection from "./LandingPageHeroSection";
const LandingPage = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(makeFixed());
  }, [dispatch]);

  const isActive = useSelector((state: RootState) => state.persistedReducer.navbarFixed.value);
  console.log(isActive);
  return (
    <LandingPageHeroSection />
  );
};

export default LandingPage;
