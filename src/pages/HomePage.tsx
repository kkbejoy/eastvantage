import React from "react";
import UserDetails from "../components/UserDetails";
import ReloadButton from "../components/ReloadButton";
const HomePage: React.FC = () => {
  return (
    <div className="h-screen overflow-hidden ">
      {/* <h1 className="text-center font-semibold">Eastvantage</h1> */}
      <div className="md:flex flex-col-3 justify-center  h-screen my-32 ">
        <div className="w-1/3"></div>
        <div className="flex w-1/3 justify-center ">
          <UserDetails />{" "}
        </div>{" "}
        <div className="w-1/3 md:mt-44">
          <ReloadButton />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
