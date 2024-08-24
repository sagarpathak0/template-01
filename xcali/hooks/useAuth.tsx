import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

interface RegisterParams {
  email: string;
  password: string;
  gender: string;
  username: string;
  name: string;
}

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const register = async ({
    email,
    password,
    gender,
    username,
    name,
  }: RegisterParams) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          email,
          password,
          gender,
          username,
          name,
        }
      );
      console.log(response.data);
      setIsAuthenticated(true);
      setUser(response.data);
      const { token, user } = response.data;
      localStorage.setItem("auth", JSON.stringify({ token, user }));
    } catch (err) {
      console.log("Register useAuth Error", err);
    }
  };

  // Function to handle regular login
  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });
      console.log(res.data);
      const { token, user } = res.data;
      localStorage.setItem("auth", JSON.stringify({ token, user }));
      setIsAuthenticated(true);
      setUser(user);
      router.push("/dashboard");
    } catch (err) {
      console.error("Login Error in useAuth:", err);
    }
  };

  // Function to handle Google login
  const googleLogin = async (idToken: string) => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/google", {
        token: idToken,
      });
      console.log(res.data);
      const { token, user } = res.data;
      localStorage.setItem("auth", JSON.stringify({ token, user }));
      setIsAuthenticated(true);
      setUser(user);
      router.push("/dashboard");
    } catch (err) {
      console.error("Google Login Error in useAuth:", err);
    }
  };

  // Function to handle GitHub login
  const githubLogin = async (idToken: string) => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/github", {
        token: idToken,
      });
      console.log(res.data);
      const { token, user } = res.data;
      localStorage.setItem("auth", JSON.stringify({ token, user }));
      setIsAuthenticated(true);
      setUser(user);
      router.push("/dashboard");
    } catch (err) {
      console.error("GitHub Login Error in useAuth:", err);
    }
  };

  // Function to handle logout
  const logout = async () => {
    localStorage.removeItem("auth");
    setIsAuthenticated(false);
    setUser(null);
    router.push("/auth/login");
  };

  useEffect(() => {
    // Check authentication status on initial load
    const checkAuth = () => {
      const authData = localStorage.getItem("auth");
      if (!authData) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      const { token, user } = JSON.parse(authData);
      // Optionally, you can validate the token format or expiry here

      setIsAuthenticated(true);
      setUser(user);
    };

    checkAuth();
  }, []);

  return {
    isAuthenticated,
    user,
    login,
    logout,
    googleLogin,
    githubLogin,
    register,
  };
};
