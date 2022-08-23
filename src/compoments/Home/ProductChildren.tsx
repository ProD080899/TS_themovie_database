import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import "./ProductChildren.css";
import axios from "axios";
import YouTube from "react-youtube";
function ProductChildren(props: any) {
  interface Trailer {
    key: string;
  }
  const [trailer, setTrailer] = useState<Trailer>({ key: "" });
  const [keyTrailer, setKeyTrailer] = useState<string>("");
  const [infoNameMovie1, setinfoNameMovie1] = useState([]);
  const [infoNameMovie2, setinfoNameMovie2] = useState([]);
  const [infoNameMovie3, setinfoNameMovie3] = useState([]);
  const [infotimeMovie, setinfotimeMovie] = useState([]);
  const [infotimeMovietotal, setinfotimeMovietotal] = useState([]);
  const [cast, setCast] = useState([]);
  // console.log(20, keyTrailer);

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
        console.log(14, data.data.results[0]);
        setTrailer(data.data.results[0]);
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
  }, [props.value]);
  const runtime = (e: number) => {
    if (e > 60) {
      return (e / 60).toFixed(0) + "h" + " " + (e % 60) + "m";
    }
  };

  const handlePlaytrailer = () => {
    const classYoutube = document.querySelector(
      `.youtube-trailer`,
    ) as HTMLElement;
    classYoutube.style.display = "block";
    const closeyoutube = document.querySelector(
      `.close-youtube`,
    ) as HTMLElement;
    closeyoutube.style.display = "block";
    const classbtn = document.querySelector(`.btn-play-trailer`) as HTMLElement;
    classbtn.style.display = "none";

    setKeyTrailer(trailer.key);
  };
  const handleclosetrailer = () => {
    const classYoutube = document.querySelector(
      `.youtube-trailer`,
    ) as HTMLElement;
    classYoutube.style.display = "none";
    const classclose = document.querySelector(`.close-youtube`) as HTMLElement;
    classclose.style.display = "none";
    const classplay = document.querySelector(
      `.btn-play-trailer`,
    ) as HTMLElement;
    classplay.style.display = "block";
    setKeyTrailer("");
  };
  return (
    <div>
      <Header />
      <div key={props.chimuc}>
        <div
          className="backgound-path-child"
          style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/w500${
              props.cartDataMovieTV[props.chimuc].backdrop_path
            }')`,
          }}
        ></div>
        <div className="single_column_backgound">
          <div className="poster-img">
            <img
              src={`https://image.tmdb.org/t/p/w500${
                props.cartDataMovieTV[props.chimuc].poster_path
              }`}
              alt="alt"
            />
            {/* {props.CartDataMovieTV[props.chimuc].title} */}
          </div>
          <div className="OverVeiw">
            <div className="Title-name">
              {props.cartDataMovieTV[props.chimuc].title}
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
                    {props.cartDataMovieTV[props.chimuc].vote_average.toFixed(
                      1,
                    )}
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
              {props.cartDataMovieTV[props.chimuc].overview}
              <br />
              <button className="btn-play-trailer" onClick={handlePlaytrailer}>
                <i className="fa-solid fa-play"></i> Play Trailer
              </button>
            </div>

            <div className="youtube-trailer">
              <YouTube
                className="youtube"
                videoId={keyTrailer}
                opts={{
                  width: "100%",
                  height: "460px",
                  playerVars: {
                    autoplay: 1,
                    controls: 1,
                  },
                }}
              />
            </div>
            <div className="close-youtube" onClick={handleclosetrailer}>
              X
            </div>
          </div>
        </div>
        <div className="title-cast">
          <h2>Series Cast</h2>
          <div className="cast-single-movie">
            {cast.map((value: any, i: any) => {
              return (
                <div key={i} className="cast-item-movie">
                  <div className="poster_img">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${value.profile_path}`}
                      alt="alt"
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
