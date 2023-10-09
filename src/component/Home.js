import { useState, useEffect } from "react";
import {
    Link
  } from "react-router-dom";
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Home.css';

function Home() {
    const [movies, setMovies] = useState([]);
    const [number, setNumber] = useState(0);
    const getMovies = async() => {
        const json = await(
            await fetch('https://yts.mx/api/v2/list_movies.json')
        ).json();
        setMovies(json.data.movies);
        console.log(json.data.movies);
    }
    const onClickBtn = () => {
        setNumber(1);
    }
    const onCloseBtn = () => {
        setNumber(0);
    }
    useEffect(()=> {
        getMovies();
    }, []);
    return (
        <>
            <Swiper
                // install Swiper modules
                modules={[ Autoplay ]}
                slidesPerView={1}
                loop={true}
                // navigation
                // // pagination={{ clickable: true }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                className="mySwiper"
                >
                <SwiperSlide>
                    <div className="banner ban01">
                        <div className="inner">
                            <div className="ban-tit">
                                <h2>Original Movie Posters</h2>
                                <p>Printed by a film studio in limited quantity, for display in movie theaters to promote the film. These posters can become highly valued, prized art and collector items.</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="banner ban02">
                        <div className="inner">
                            <div className="ban-tit">
                                <h2>A great investment</h2>
                                <p>Original movie posters can become highly valued, prized collector items. This can take years or sometimes days. </p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
            <div className="section01 section">
                <div className="inner">
                    <ul className="movie-list">
                    {movies.slice(0, 3).map((movie, index) => {
                        return (
                            <MovieInfo key={index} movie={movie} index={index}/>
                        )
                    })}
                    { number === 1 ? movies.slice(3).map((movie, index) => {
                        return (
                            <MovieInfo key={index} movie={movie} index={index}/>
                        )
                    }) : null}
                    </ul>
                    <div className="sec-btn">
                        {number === 1 ? <button onClick={onCloseBtn}>Close</button> : (number === 0 ? <button onClick={onClickBtn}>See More</button> : null)}
                    </div>  
                </div>
            </div>
        </>
    )
}

function MovieInfo({movie, index}) {
    return (
        <li key={index}>
            <Link to={`/products/${movie.id}`}>
                <div className="movie-img">
                    <img src={movie.medium_cover_image} alt={movie.title} />
                </div>
                <div className="movie-tit">{movie.title}</div>
                <div className="movie-year">({movie.year})</div>
                {/* {movie.genres.map(genre => {
                    return(
                        genre.length > 1 ? <span>#{genre}</span> : <span>{genre}</span>
                    )
                })} */}
            </Link>
        </li>
    )
}
export default Home;