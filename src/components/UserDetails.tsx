import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { usersDataFetchApi } from "../slices/usersDetail";
import { LOADING_STATES } from "../constants/constants";

const UserDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const isDataLoading = useAppSelector((state) => state.userData?.isLoading);
  const user = useAppSelector((state) => state.userData?.users[0]) || {
    name: { first: "unknown", last: "user" },
    email: "unknown",
    picture: {
      large:
        "https://res.cloudinary.com/dlcsyyk7z/image/upload/v1698830239/mentors/mentor/images_2_d4e6fp_siwirt_a7fcrt.jpg",
    },
  };
  const { name, email, picture } = user as {
    name: { first: string; last: string };
    email: string;
    picture: { large: string };
  };
  const { first: firstName, last: lastName } = name;
  const { large: profileImageUrl } = picture;
  useEffect(() => {
    dispatch(usersDataFetchApi());
  }, []);
  return (
    <div className="p-3 h-96 w-72 bg-gray-200 overflow-hidden text-center rounded-lg shadow-2xl">
      <div
        className={`${
          isDataLoading === LOADING_STATES.PENDING
            ? "bg-gradient-to-r from-gray-900 via-gray-500 to-gray-100 animate-pulse"
            : ""
        }  relative h-40 w-40 mx-auto overflow-hidden rounded-full `}
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        {isDataLoading === LOADING_STATES.SUCCESS && (
          <img
            className="rounded-full my-auto mx-auto h-fit w-fit  p-3 object-fill "
            src={profileImageUrl}
            alt=""
            loading="lazy"
          />
        )}
      </div>
      <div className=" p-3 mt-4 rounded-md">
        <h5
          className={`${
            isDataLoading === LOADING_STATES.PENDING
              ? "bg-gradient-to-r from-gray-900 via-gray-500 to-gray-100 animate-pulse"
              : ""
          } mb-2 rounded-lg text-xl font-semibold leading-tight text-neutral-800 dark:text-black`}
        >
          {isDataLoading === LOADING_STATES.SUCCESS ? firstName : ""} &nbsp;
          {isDataLoading === LOADING_STATES.SUCCESS ? lastName : ""}
        </h5>
      </div>
      <div
        className={`${
          isDataLoading === LOADING_STATES.PENDING
            ? "bg-gradient-to-r from-gray-900 via-gray-500 to-gray-100 animate-pulse"
            : ""
        } rounded-md p-1`}
      >
        <p className=" mb-2 text-neutral-600 truncate">
          {isDataLoading === LOADING_STATES.SUCCESS ? email : ""}
        </p>
      </div>
    </div>
  );
};

export default UserDetails;
