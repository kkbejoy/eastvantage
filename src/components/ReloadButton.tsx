import { Button } from "@material-tailwind/react";
import _ from "lodash";

import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { usersDataFetchApi } from "../slices/usersDetail";
import { LOADING_STATES } from "../constants/constants";

const ReloadButton: React.FC = () => {
  const dispatch = useAppDispatch();
  //Loading State from Redux State
  const isLoading = useAppSelector((state) => state.userData.isLoading);

  //Debouncing Function

  const debouncedButtonClick = _.debounce(() => {
    console.log("debouncer in action");
    dispatch(usersDataFetchApi());
  }, 300);

  //Button Click Fucnciton
  const callNewUser = async () => {
    try {
      debouncedButtonClick();
    } catch (error) {
      console.error(error);
      throw new Error("Error Fetching Data");
    }
  };

  return (
    <div className="flex items-center gap-4 p-3">
      <Button
        placeholder={""}
        onClick={callNewUser}
        className="flex items-center gap-3"
        variant="gradient"
        size="lg"
        color="amber"
        loading={isLoading === LOADING_STATES.PENDING}
      >
        {" "}
        {isLoading === LOADING_STATES.PENDING ? "Loading" : "Reload"}{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </Button>
    </div>
  );
};

export default ReloadButton;
