import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

const Logoutbtn = () => {
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    await authService.logout();
    dispatch(logout());
  };

  return (
    <button
      onClick={logoutHandler}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
    >
      Logout
    </button>
  );
};

export default Logoutbtn;
