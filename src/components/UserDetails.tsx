import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { usersDataFetchApi } from "../slices/usersDetail";

const UserDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userData?.users[0]) || {
    name: { first: "unknown", last: "user" },
  };
  const { name } = user as { name: { first: string; last: string } };
  const { first, last } = name;
  console.log("User details from redux", first, last);
  useEffect(() => {
    dispatch(usersDataFetchApi());
  }, []);
  return <div>name:{first}</div>;
};

export default UserDetails;
