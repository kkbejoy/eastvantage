import React, { Suspense, lazy } from "react";
// import UserDetails from "../components/UserDetails";
// import ReloadButton from "../components/ReloadButton";
import Loader from "../components/Loader";
//lazy loaded Componenets
const UserDetails = lazy(() => import("../components/UserDetails"));
const ReloadButton = lazy(() => import("../components/ReloadButton"));

const HomePage: React.FC = () => {
  return (
    <div className="h-screen overflow-hidden ">
      {/* <h1 className="text-center font-semibold">Eastvantage</h1> */}
      <div className="md:flex flex-col-3 justify-center  h-screen my-32 ">
        <div className="md:w-1/3"></div>
        <div className="flex md:w-1/3 justify-center ">
          <Suspense fallback={<Loader />}>
            <UserDetails />
          </Suspense>
        </div>{" "}
        <div className="w-1/3 md:mt-44">
          <Suspense fallback={<Loader />}>
            <ReloadButton />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
