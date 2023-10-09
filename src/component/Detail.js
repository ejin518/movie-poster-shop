import { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getInfo } from '../store';
import {
    Link
  } from "react-router-dom";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './Detail.css';

function Detail() {
    let item = useSelector((state)=>{ return state });
    const [movieInfo, setMovieInfo] = useState([]);
    // const [addCart, setAddCart] = useState([]);
    let {id} = useParams();
    let dispatch = useDispatch();

    const addToCart = () => {
        dispatch(getInfo(movieInfo));
    }
    const getMovie = async() => {
        const json = await(await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json();
        setMovieInfo(json.data.movie);
    }
    useEffect(() => {
        getMovie();
    },[]);
    // useEffect(() => {
    //     if(addCart && Object.keys(addCart).length > 0) {
    //         let get = localStorage.getItem('added');
    //         get = JSON.parse(get) || [];
    //         dispatch(getInfo(get));
    //         if(movieInfo && !get.includes(movieInfo.id)){
    //             get.push(movieInfo);
    //             localStorage.setItem('added', JSON.stringify(get));
    //         }
    //     }
    // },[addCart]);
    return(
        <>
            <div className="movie-detail-wrap">
                <div className="inner">
                    <div className="go-back">
                        <Link to='/products/'>&lt;Go to Products</Link>
                    </div>
                    <div className="movie-detail">
                        <div className="movie-img">
                            <img src={movieInfo.medium_cover_image} alt={movieInfo.title} />
                        </div>
                        <div className="movie-info">
                            <h3>{movieInfo.title}</h3>
                            <dl>
                                <dt>Year</dt>
                                <dd>{movieInfo.year}</dd>
                            </dl>
                            <dl>
                                <dt>Rating</dt>
                                <dd>{movieInfo.rating}</dd>
                            </dl>
                            <dl>
                                <dt>Runtime</dt>
                                <dd>{movieInfo.runtime}</dd>
                            </dl>
                            {/* <dl>
                                <dt>Rating</dt>
                                <dd>{movieInfo.genres.map((genre, index) => {
                                    return(
                                        <span key={index}>#{genre} </span>
                                    )
                                })}</dd>
                            </dl> */}
                            {
                                item.movies.find(obj => obj.id === movieInfo.id) ? <button>Added</button> : <button onClick={addToCart}>Add to Cart</button>
                            }
                        </div>
                    </div>
                    <div className="movie-tabs">
                        <Tabs
                            defaultActiveKey="summary"
                            id="uncontrolled-tab-example"
                            className="mb-3">
                            <Tab eventKey="summary" title="Summary">
                                {movieInfo.description_full}
                            </Tab>
                            <Tab eventKey="terms" title="Terms and Condition">
                                Terms and Condition
                            </Tab>
                            <Tab eventKey="contact" title="Contact">
                                Tab content for Contact
                            </Tab>
                        </Tabs>            
                    </div>
                </div>
            </div>
        </>
    )
}

export default Detail;