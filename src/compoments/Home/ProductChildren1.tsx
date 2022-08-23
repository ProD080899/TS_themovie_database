import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import "./ProductChildren.css";
// import YouTube from "react-youtube";
import axios from "axios";
function ProductChildren(props: any) {
  const [trailer, setTrailer] = useState("");
  const [keyTrailer, setKeyTrailer] = useState("");
  const [infoNameMovie1, setinfoNameMovie1] = useState([]);
  const [infoNameMovie2, setinfoNameMovie2] = useState([]);
  const [infoNameMovie3, setinfoNameMovie3] = useState([]);
  const [infotimeMovie, setinfotimeMovie] = useState([]);
  const [infotimeMovietotal, setinfotimeMovietotal] = useState([]);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${props.value.id}?api_key=8827c7821b4ab2b478d40e975b4bcd60&language=en-US`,
      )
      .then((data) => {
        // console.log(18, data.data);
        setinfoNameMovie1(data.data.genres[0].name);
        setinfoNameMovie2(data.data.genres[1].name);
        setinfoNameMovie3(data.data.genres[2].name);
        setinfotimeMovie(data.data.release_date);
        setinfotimeMovietotal(data.data.runtime);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${props.value.id}/videos?api_key=8827c7821b4ab2b478d40e975b4bcd60&language=en-US`,
      )
      .then((data) => {
        // console.log(14, data.data.results[1]);
        setTrailer(data.data.results);
      });
    axios
      .get(
        `http://api.themoviedb.org/3/movie/${props.value.id}/casts?api_key=8827c7821b4ab2b478d40e975b4bcd60`,
      )
      .then((data) => {
        // console.log(data.data.cast);
        setCast(data.data.cast);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const runtime = (e: number) => {
    if (e > 60) {
      return (e / 60).toFixed(0) + "h" + " " + (e % 60) + "m";
    }
  };

  // console.log(58, reveserTime("200-25-211"));
  // console.log(49, infoNameMovie1, infoNameMovie2, infoNameMovie3);
  // console.log(45, infoNameMovie[1], infoNameMovie[2], infoNameMovie[0]);
  // const handlePlaytrailer = () => {
  //   document.querySelector(`.youtube-trailer`).style.display = "block";
  //   document.querySelector(`.close-youtube`).style.display = "block";
  //   document.querySelector(`.btn-play-trailer`).style.display = "none";
  //   setKeyTrailer(trailer[0].key);
  // };
  // const handleclosetrailer = () => {
  //   document.querySelector(`.youtube-trailer`).style.display = "none";
  //   document.querySelector(`.close-youtube`).style.display = "none";
  //   document.querySelector(`.btn-play-trailer`).style.display = "block";
  //   setKeyTrailer("");
  // };
  // console.log(65, infotimeMovie.split("-").reverse().join("-"));
  return (
    <div>
      <Header />
      <div>
        <div
          className="backgound-path-child"
          style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/w500${
              props.cartTrending[props.chimuc].backdrop_path
            }')`,
          }}
        ></div>
        <div className="single_column_backgound">
          <div className="poster-img">
            <img
              src={`https://image.tmdb.org/t/p/w500${
                props.cartTrending[props.chimuc].poster_path
              }`}
              alt=""
            />
          </div>
          <div className="OverVeiw">
            <div className="Title-name">
              {props.cartTrending[props.chimuc].title}
            </div>
            <div className="title1-movie-review">
              <div className="C13-review-movie">C13</div>
              <div className="info-time-movie">
                {String(infotimeMovie).split("-").reverse().join("-")}
              </div>
              <ul>
                <li>
                  {infoNameMovie1}, {infoNameMovie2}, {infoNameMovie3}
                </li>
                {/* <li>{runtime(infotimeMovietotal)}</li> */}
              </ul>
            </div>

            <div className="info-item-Cart">
              <div className="hover-percent">
                <div className="percent-cart-item1">
                  <span>
                    {props.cartTrending[props.chimuc].vote_average.toFixed(1)}
                  </span>
                </div>
              </div>
              <span>User Score</span>
              <ul>
                <li>
                  <i className="fa-solid fa-list icon-large"></i>
                </li>
                <li>
                  <i className="fa-solid fa-heart icon-large"></i>
                </li>
                <li>
                  <i className="fa-solid fa-file-lines icon-large"></i>{" "}
                </li>
                <li>
                  <i className="fa-solid fa-star icon-large"></i>
                </li>
              </ul>
            </div>
            <div className="info-overView">
              <h3>
                <b>Overview</b>
              </h3>
              {props.cartTrending[props.chimuc].overview}
              <br />
              <button className="btn-play-trailer">
                <i className="fa-solid fa-play"></i> Play Trailer
              </button>
            </div>
            <div className="youtube-trailer">
              {/* <YouTube
                className="youtube"
                videoId={keyTrailer}
                // style={{
                //   "background-image": `url('https://image.tmdb.org/t/p/w500${
                //     props.CartDataMovieTV[props.chimuc].backdrop_path
                //   }')`,
                //   "background-size": "cover",
                //   width: "100%",
                // }}
                opts={{
                  width: "100%",
                  height: "460px",
                  playerVars: {
                    autoplay: 1,
                    playerVars: {
                      autoplay: 1,
                      controls: 0,
                      autohide: 1,
                      wmode: "opaque",
                      origin: "http://localhost:3000",
                    },
                  },
                }}
                loop={true}
                onPause={true}
              /> */}
            </div>
            <div className="close-youtube">X</div>
          </div>
        </div>
        <div className="title-cast">
          <h2>Series Cast</h2>
          <div className="cast-single-movie">
            {cast.map((value: any, i: any) => {
              return (
                <div className="cast-item-movie">
                  <div key={i} className="poster_img">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${value.profile_path}`}
                      alt=""
                    />
                  </div>
                  <div className="name-cast-movie">{value.name}</div>
                  <div className="character-cast-movie">
                    {value.character || value.known_for_department}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductChildren;
