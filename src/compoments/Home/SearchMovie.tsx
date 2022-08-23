import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import axios from "axios";
import "./SearchMovie.css";
import { useEffect, useState } from "react";
import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
// import { Search } from "../../redux/actions";
import { useNavigate, Link } from "react-router-dom";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { searchAciton } from "./CartMovieSlice";

function SearchMovie() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [valueInput, setValueInput] = useState("");
  const [infoSearchMovie, setinfoSearchMovie] = useState([]);

  const [pageData, setpageData] = useState([]);

  // console.log(14, infoSearchMovie);
  // console.log(15, pageData);
  function test(page: number, pageSize: number) {
    const start = (page - 1) * pageSize;
    const end = page * pageSize;
    const newShow = infoSearchMovie.slice(start, end);
    setpageData(newShow);
  }
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
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?language=en-US&query=${localstorage.cartmovie.search.searchName}&page=1&include_adult=false&api_key=8827c7821b4ab2b478d40e975b4bcd60`,
      )
      .then((data) => {
        // console.log(38, data.data.results);
        setinfoSearchMovie(data.data.results);
        setpageData(() => {
          let show = data.data.results.slice(0, 5);
          return show;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [localstorage.cartmovie.search.searchName]);
  // console.log(388, infoSearchMovie);
  useEffect(() => {
    if (pageData.length === 0) {
      const classNullmovie = document.querySelector(
        ".info-null-movie",
      ) as HTMLElement;
      classNullmovie.style.display = "block";
      const infoMovieSearch = document.querySelector(
        ".infoMovieSearch",
      ) as HTMLElement;
      infoMovieSearch.style.display = "none";
    } else {
      const classNullmovie = document.querySelector(
        ".info-null-movie",
      ) as HTMLElement;
      classNullmovie.style.display = "none";
      const infoMovieSearch = document.querySelector(
        ".infoMovieSearch",
      ) as HTMLElement;
      infoMovieSearch.style.display = "block";
    }
  }, [pageData.length]);
  // const handleValueonChange = (e: React.FormEvent<HTMLInputElement>) => {
  //   setValueInput(e.currentTarget.value);
  //   console.log(900, valueInput);
  // };
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
  const handleOnkeypress = (e: any) => {
    let keycode = e.keyCode ? e.keyCode : e.which;
    if (keycode == "13") {
      if (valueInput === null || valueInput === "") {
        navigate(`/Home/search/query=`);
        dispatch(searchAciton({ searchName: valueInput }));
      } else {
        dispatch(searchAciton({ searchName: valueInput }));
        navigate(
          `/Home/search/query=${RemoveAccents(valueInput)
            .split(" " || "-")
            .join("")}`,
        );
      }
    }
  };
  const handleClickSeacrh = () => {
    if (valueInput === null || valueInput === "") {
      navigate(`/Home/search/query=`);
      dispatch(searchAciton({ searchName: valueInput }));
    } else {
      dispatch(searchAciton({ searchName: valueInput }));
      navigate(
        `/Home/search/query=${RemoveAccents(valueInput)
          .split(" " || "-")
          .join("")}`,
      );
    }
  };
  return (
    <div>
      <Header />
      <div className="container-title-search">
        <div className="search-title-header">
          <i
            className="fa-solid fa-magnifying-glass "
            onClick={handleClickSeacrh}
          ></i>
          <input
            type="text"
            name=""
            id=""
            onKeyPress={handleOnkeypress}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setValueInput(e.target.value);
            }}
          />
          <i className="fa-solid fa-xmark "></i>
        </div>
      </div>

      <div className="container_search">
        <div className="Results-Movie">
          <ul>
            <div className="title-search"> Search Results</div>
            <li>Movies</li>
            <li>TV Show</li>
            <li>Companies</li>
            <li>People</li>
            <li>Keywords</li>
            <li>Collections</li>
            <li>Networks</li>
          </ul>
        </div>
        <div className="infoMovieSearch">
          {pageData.map((value: any, i: any) => {
            // console.log(149, value.release_date.split("-").reverse().join("-"));
            return (
              <div className="cart-movie-search" key={i}>
                <div className="poster-img">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${value.poster_path}`}
                    alt="poster-img"
                  />
                </div>
                <div className="info-movie">
                  <div className="movie-title">{value.title}</div>
                  <div className="date-movie">
                    {String(value.release_date).split("-").reverse().join("-")}
                  </div>
                  <div className="overview-movie">{value.overview}</div>
                </div>
              </div>
            );
          })}
          <Pagination
            // Current={1}
            defaultCurrent={1}
            defaultPageSize={5}
            total={infoSearchMovie.length}
            onChange={test}
          />
        </div>
        <div className="info-null-movie">
          There are no movies that matched your query.
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SearchMovie;
