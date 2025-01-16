import customFetch from "../utils/customFetch";
interface GenericString{
  [key: string]: string
}
// /users
const signup = async (data: GenericString) => await customFetch.post("/users/signup", data);

const login = async (data: GenericString) => await customFetch.post("/users/login", data);

const getCurrentUser = async () => await customFetch.get("/users/me");

const logout = async () => await customFetch.post("/users/logout", {});

const apiAuth = {
  signup,
  login,
  getCurrentUser,
  logout,
};

export default apiAuth;
