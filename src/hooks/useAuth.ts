import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { LoginCredentials, SignupCredentials } from "@/types/Credentials";

const signupMutation = async (credentials: SignupCredentials) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/auth/signup`,
    credentials
  );
  return data.data.token;
};

const loginMutation = async (credentials: LoginCredentials) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/auth/login`,
    credentials
  );
  return data.data.token;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export const useSignup = () => {
  const { setToken } = useAuth();

  return useMutation(signupMutation, {
    onSuccess: (token) => {
      setToken(token);
      localStorage.setItem("token", token);
    },
    onError: (error) => {
      console.error("Signup Error: ", error);
      // TODO: Change to something useful to the user
    },
  });
};

export const useLogin = () => {
  const { setToken } = useAuth();
  return useMutation(loginMutation, {
    onSuccess: (token) => {
      setToken(token);
      localStorage.setItem("token", token);
    },
    onError: (error) => {
      console.error("Login Error: ", error);
      // TODO: Change to something useful to the user
    },
  });
};
