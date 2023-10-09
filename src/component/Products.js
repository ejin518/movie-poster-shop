import { useState, useEffect } from "react";
import {
    Link
  } from "react-router-dom";
import '../App.css';
import './Products.css';
import { TabList } from './TabList';

function Products() {
    const [products, setProducts] = useState([]);
    const [tab, setTab] = useState([]);
    const [clickedTab, setClickedTab] = useState('all');
    const [selected, setSelected] = useState('all');
    const getProducts = async() => {
        const json = await(await fetch('https://yts.mx/api/v2/list_movies.json')).json();
        setProducts(json.data.movies);
    }
    const onClickTab = (event) => {
        setClickedTab(event.target.className);
        setSelected(event.target.className);
    }
    useEffect(() => {
        getProducts();
    },[]);
    useEffect(() => {
        const getTab = async() => {
            const json = await(await fetch(`https://yts.mx/api/v2/list_movies.json?genre=${clickedTab}`)).json();
            setTab(json.data.movies);
        }
        getTab();
    },[clickedTab]);
    return(
        <>
        <div className="section pro-sec">
                {clickedTab === 'all' ?
                <div className="inner">
                <ul className="product-tab">
                    {TabList.map((item, index) => {
                        return (
                        <li className={item.cName} id={`${item.cName === 'all' ? 'selected' : ''}`} key={index} onClick={onClickTab}>
                            {item.title}
                        </li>
                        )    
                    })}
                </ul>
                <ul className='products-list-wrap'>
                {products.map((item, index) => {
                    return(
                        <li key={index}>
                        <Link to={`/products/${item.id}`}>
                            <div className="movie-img">
                                <img src={item.medium_cover_image} alt={item.title} />
                            </div>
                            <div className="movie-tit">{item.title}</div>
                            <div className="movie-year">({item.year})</div>
                            {/* {item.genres.map(genre => {
                                return(
                                    genre.length > 1 ? <span>#{genre}</span> : <span>{genre}</span>
                                )
                            })} */}
                        </Link>
                    </li>
                    ) 
                })}
            </ul>
            </div> 
            :
            <div className="inner">
                <ul className="product-tab">
                    {TabList.map((item, index) => {
                        return (
                        <li className={item.cName} id={`${selected === item.cName ? 'selected' : ''}`} key={index} onClick={onClickTab}>
                            {item.title}
                        </li>
                        )
                    })}
                </ul>
            <ul className='products-list-wrap'>
                    {tab.map((item, index) => {
                        return(
                            <li key={index}>
                            <Link to={`/products/${item.id}`}>
                                <div className="movie-img">
                                    <img src={item.medium_cover_image} alt={item.title} />
                                </div>
                                <div className="movie-tit">{item.title}</div>
                                <div className="movie-year">({item.year})</div>
                                {item.genres.map(genre => {
                                    return(
                                        genre.length > 1 ? <span>#{genre}</span> : <span>{genre}</span>
                                    )
                                })}
                            </Link>
                        </li>
                        ) 
                    })}
                </ul>
            </div>
            }    
        </div>       
        </>
    )
}

export default Products