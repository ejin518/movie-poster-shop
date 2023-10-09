import { useState } from 'react';
import {
    Link
  } from "react-router-dom";
import './Header.css';
import '../App.css';


  function Header() {
    const [showClass, setShowClass] = useState('');
    // const [dropdown, setDropdown] = useState(false);
    const onClickBar = () => {
        setShowClass('show');
    }
    const onClickClose = () => {
        setShowClass('hide');
    }
    // const onMouseEnter = () => {
    //   setDropdown((current) => (!current));
    // }
    // const onMouseLeave = () => {
    //   setDropdown((current) => (!current));
    // }
    return (
      <>
        <div className="header">
            <div className="inner">
                <div className="logo"><Link to='/'><span>Movie Posters</span></Link></div>
                <div className="nav-menu-wrap">
                    <ul className='nav-menu'>
                        <li><Link to='/'>Home</Link></li>
                        <li>
                        {/* <li onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}> */}
                          <Link to='/products'>Products</Link>
                          {/* {dropdown && 
                            <ul className="dropdown">
                              <li><Link to='/products/genres'>Genres</Link></li>
                            </ul>
                          } */}
                        </li>
                        <li><Link to='/about'>About</Link></li>
                        <li><Link to='/cart'>Cart</Link></li>
                    </ul>
                    <div className="hamburger" onClick={onClickBar}>
                        <span></span>
                    </div>
                </div>
            </div> 
            <div className={'mobile-nav-wrap ' + showClass}>
                <ul className="mobile-nav">
                    <li><Link to='/' onClick={onClickClose}>Home</Link></li>
                    <li><Link to='/products' onClick={onClickClose}>Products</Link></li>
                    <li><Link to='/about' onClick={onClickClose}>About</Link></li>
                    <li><Link to='/cart' onClick={onClickClose}>Cart</Link></li>
                </ul>
                <div className="close" onClick={onClickClose}></div>
            </div>
        </div>
      </>
    );
  }

export default Header;