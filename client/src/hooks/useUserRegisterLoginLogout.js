import { toast } from "react-toastify";
import { setCookie } from "./useSetCookie";
import { useAuthContext } from "../context/authContext";
import { registerUser, loginUser, logoutUser } from "../api/userApi";

const validateRegistration = ({ email, username, password, profilePhoto }) => {
  if (!email || !username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    toast.error("Invalid email format");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long");
    return false;
  }

  if (!profilePhoto) {
    toast.error("Please choose your profile image");
    return false;
  }

  if (username.length < 3) {
    toast.error("Username must be at least 4 characters long");
    return false;
  }

  return true;
};

const validateLogin = ({ username, password }) => {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
};

export const useRegisterUser = () => {
  const registerHandler = async (formData) => {
    const isValid = validateRegistration({
      email: formData.get("email"),
      username: formData.get("username"),
      password: formData.get("password"),
      profilePhoto: formData.get("profilePhoto"),
    });
    if (!isValid) return;

    try {
      await registerUser(formData);
      toast.success("Registration complete! Please login in");
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  return { registerHandler };
};

export const useLoginUser = () => {
  const { login } = useAuthContext();

  const loginHandler = async (username, password) => {
    const isValid = validateLogin({ username, password });
    if (!isValid) return;

    try {
      const data = await loginUser(username, password);
      login(data);
      setCookie("token", data.token, 30);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { loginHandler };
};

export const useLogoutUser = () => {
  const { logout } = useAuthContext();

  const logoutHandler = async () => {
    try {
      await logoutUser();
      logout();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { logoutHandler };
};
