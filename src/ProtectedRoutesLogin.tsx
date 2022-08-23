import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutesLogin = () => {
  const localstorage = localStorage.getItem("reduxState")
    ? JSON.parse(localStorage.getItem("reduxState") || "{}")
    : {
        cartmovie: {
          login: {
            success: false,
            user: "",
          },
          popular: {
            namemovie: "popular",
          },
          trending: {
            nameTrending: "day",
          },
          search: {
            searchName: "",
          },
        },
      };
  return localstorage.cartmovie.login.success ? (
    <Navigate to="/Home" />
  ) : (
    <Outlet />
  );
};

export default ProtectedRoutesLogin;
