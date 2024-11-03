import { useState } from "react";
import useAxios from "../utils/useAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
const useLogout = () => {
  const api = useAxios();
  const { setUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const logout = async () => {
    try {
      setLoading(true);
      await api.post("users/logout");
      setUser(null);
      localStorage.removeItem("accessToken");
      Swal.fire({
        title: "Logged Out",
        text: "You have successfully logged out!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response.data.error,
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setLoading(false);
    }
  };
  return { logout, loading };
};

export default useLogout;
