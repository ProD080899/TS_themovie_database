import React from "react";
import { useEffect, useState } from "react";
import "./index.css";
import Login from "./compoments/Login/Login";
import Home from "./compoments/Home/Home";
import NotFound from "./compoments/layout/NotFound";
import ProductChildren from "./compoments/Home/ProductChildren";
import ProductChildren1 from "./compoments/Home/ProductChildren1";
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SearchMovie from "./compoments/Home/SearchMovie";
import PageUser from "./compoments/Home/PageUser";
import { useAppSelector } from "./app/hooks";
import {
  selectIntheater,
  selectSearch,
  selectTrending,
} from "./compoments/Home/CartMovieSlice";
import ProtectedRoutes from "./ProtectedRoutes";
import ProtectedRoutesLogin from "./ProtectedRoutesLogin";
import Popular from "./compoments/ListHeader/Movies/Popular";
import NowPlaying from "./compoments/ListHeader/Movies/NowPlaying";
import Upcoming from "./compoments/ListHeader/Movies/Upcoming";
import TopRate from "./compoments/ListHeader/Movies/TopRate";
function App() {
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
  // console.log(3541, localstorage);

  const [cartDataMovieTV, setCartDataMovieTV] = useState([]);
  const [cartTrending, setCartTrending] = useState([]);
  const namemovie = useAppSelector(selectIntheater);
  // console.log(399, namemovie);

  const nameTrending = useAppSelector(selectTrending);
  // console.log(37, nameTrending);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${namemovie.namemovie}?api_key=8827c7821b4ab2b478d40e975b4bcd60&language=en-US&page=1`,
      )
      .then((data) => {
        // console.log(22, data.data.results);
        setCartDataMovieTV(data.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [namemovie.namemovie]);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/all/${nameTrending.nameTrending}?api_key=8827c7821b4ab2b478d40e975b4bcd60`,
      )
      .then((data) => {
        // console.log(27, data.data.results);
        setCartTrending(data.data.results);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [nameTrending.nameTrending]);
  function RemoveAccents(str: string) {
    var AccentsMap = [
      "aàảãáạăằẳẵắặâầẩẫấậ",
      "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
      "dđ",
      "DĐ",
      "eèẻẽéẹêềểễếệ",
      "EÈẺẼÉẸÊỀỂỄẾỆ",
      "iìỉĩíị",
      "IÌỈĨÍỊ",
      "oòỏõóọôồổỗốộơờởỡớợ",
      "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
      "uùủũúụưừửữứự",
      "UÙỦŨÚỤƯỪỬỮỨỰ",
      "yỳỷỹýỵ",
      "YỲỶỸÝỴ",
    ];
    for (var i = 0; i < AccentsMap.length; i++) {
      var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
      var char = AccentsMap[i][0];
      str = str.replace(re, char);
    }
    return str;
  }
  const [pathSearch, setPathSearch] = useState("");
  const namesearch = useAppSelector(selectSearch);

  useEffect(() => {
    if (namesearch.searchName === "") {
      setPathSearch(`Home/search/query=`);
    } else {
      setPathSearch(
        `Home/search/query=${RemoveAccents(
          localstorage.cartmovie.search.searchName,
        )
          .split(" " || "-")
          .join("")}`,
      );
    }
  }, [namesearch.searchName]);

  return (
    <div>
      <div className="App">
        <Routes>
          <Route element={<ProtectedRoutesLogin />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Navigate to="/Home" />} />
            <Route path="/Home" element={<Home />} />
            <Route path={pathSearch} element={<SearchMovie />} />
            <Route
              path={`User/${localstorage.cartmovie.login.user}`}
              element={<PageUser />}
            />
            <Route path="Home/Movies/Popular" element={<Popular />} />
            <Route path="Home/Movies/NowPlaying" element={<NowPlaying />} />
            <Route path="Home/Movies/Upcoming" element={<Upcoming />} />
            <Route path="Home/Movies/TopRate" element={<TopRate />} />
            {cartDataMovieTV.map((value: any, i: any) => {
              return (
                <Route
                  key={i}
                  path={`Home/theMovie/Cart/${RemoveAccents(
                    value.title || value.name,
                  )
                    .split(" ")
                    .join("")}`}
                  element={
                    <ProductChildren
                      cartDataMovieTV={cartDataMovieTV}
                      chimuc={i}
                      value={value}
                    />
                  }
                />
              );
            })}
            {cartTrending.map((value: any, i: any) => {
              return (
                <Route
                  key={i}
                  path={`Home/theMovie/Cart/${RemoveAccents(
                    value.title || value.name,
                  )
                    .split(" ")
                    .join("")}`}
                  element={
                    <ProductChildren1
                      cartTrending={cartTrending}
                      chimuc={i}
                      value={value}
                    />
                  }
                />
              );
            })}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
