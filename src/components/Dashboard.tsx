import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeSticky } from "../redux/slices/navbarSlice";
import { AppDispatch } from "../redux/store";
import TabularDashboard from "./TabularDashboard";

const Dashboard = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(makeSticky());
  }, [dispatch]);
  return (
    <>
      <div>
        <TabularDashboard />
      </div>
    </>
  );
};

export default Dashboard;
