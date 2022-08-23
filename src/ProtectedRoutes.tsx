import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
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
  // console.log(localstorage.cartmovie.login.success);

  return localstorage.cartmovie.login.success ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutes;
