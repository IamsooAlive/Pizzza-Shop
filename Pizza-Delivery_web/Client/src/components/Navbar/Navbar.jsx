import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems } from '../../redux/slices/cartSlice';
import { getUserDetails } from '../../redux/slices/userSlice';
import { fetchProductsBelow20 } from '../../redux/slices/productsBelow20Slice';

const token = localStorage.getItem("token");


const Menu = () => {



    return (
        <>
            <p>
                <Link to="/" >HomePage</Link>
            </p>
            <p>
                <Link to="/about">About Us</Link>
            </p>
        </>
    );
};

const UserMenu = ({ handleClick, display }) => {
    return (
        <div className='user-account-menu  navbar-menu_account_container poppins-medium' style={{ display: `${display}` }}>

            {token ? (
                <>
                    <p onClick={handleClick}>
                        <Link to="/profile_dashboard">My Account</Link>
                    </p>

                    <p>
                        <button
                            className="navbar-logout-btn"
                            onClick={() => {
                                localStorage.removeItem("token");
                                window.location.reload();
                                handleClick();
                            }}>
                            Log Out
                        </button>
                    </p>
                </>
            ) : (
                <>

                    <p onClick={handleClick}>
                        <Link to="/signup" >Sign Up</Link>
                    </p>
                    <p onClick={handleClick}>
                        <Link to="/login" >Log In</Link>
                    </p>
                </>
            )}

        </div>
    )
}

const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { data: products, totalPrice, totalItems, status } = useSelector((state) => state.cart);

    const { data: user, sTs } = useSelector((state) => state.user);



    const { data: productsBelow20, sts } = useSelector((state) => state.productsBelow20);



    useEffect(() => {
        if (!token) {
            navigate("/login")
        } else {
            dispatch(getUserDetails());
            dispatch(fetchCartItems());
            dispatch(fetchProductsBelow20());

        }
    }, [])




    const [toggleMenu, setToggleMenu] = useState(false);
    const [openUserMenu, setOpenUserMenu] = useState(false);
    const handleOpenUserMenu = () => {
        if (openUserMenu == true) {
            setOpenUserMenu(false);
        } else {
            setOpenUserMenu(true);
        }
    }
    let display;
    if (openUserMenu == true) {
        display = "block"
    } else {
        display = "none"
    }



    return (
        <div className="navbar">
            <div className="navbar-content">
                <div className="navbar-logo-container">
                    <Link to="/" className='navbar-logo poppins-semibold'>
                        <i className="fa-solid fa-pizza-slice pizza-icon" aria-hidden="true"></i> PizzaLand
                    </Link>
                </div>
                <div className="navbar-links_container">
                    <Menu />
                </div>
            </div>
            <div className="navbar-user-actions">
                <button className="navbar-icon-btn" aria-label="Account menu" onClick={handleOpenUserMenu}>
                    <i className="fa-solid fa-circle-user user-icon" aria-hidden="true"></i>
                </button>
                <UserMenu display={display} handleClick={() => { setOpenUserMenu(false) }} />
                {!token && (
                    <Link to="/login" aria-label="Cart"><i className="fa-solid fa-cart-shopping cart-icon" aria-hidden="true"></i></Link>
                )}
                {token && (
                    <>
                        <Link to="/profile_dashboard/cart" aria-label="Cart"><i className="fa-solid fa-cart-shopping cart-icon" aria-hidden="true"></i><span className='tooltip' aria-hidden="true">{totalItems}</span></Link>
                        &nbsp;
                        {user.isAdmin === true && (
                            <Link to="/profile_dashboard/notifications" aria-label="Notifications"><i className="fa-solid fa-bell bell-icon" style={{ fontSize: "1.3rem" }} aria-hidden="true"></i>{productsBelow20.length !== 0 && (<span className='tooltip' aria-hidden="true">{productsBelow20.length}</span>)}</Link>
                        )}
                    </>
                )}
            </div>
            <div className="navbar-menu">
                {toggleMenu ? (
                    <button className="navbar-icon-btn" aria-label="Close menu" onClick={() => setToggleMenu(false)}>
                        <i className="fa-solid fa-xmark cross-icon" aria-hidden="true"></i>
                    </button>
                ) : (
                    <button className="navbar-icon-btn" aria-label="Open menu" onClick={() => setToggleMenu(true)}>
                        <i className="fa-solid fa-bars menu-bar" aria-hidden="true"></i>
                    </button>
                )}
                {toggleMenu && (
                    <div className="navbar-menu_container">
                        <div className="navbar-menu_container-links">
                            <Menu />
                            <div className="navbar-menu_container-links-user-actions">
                                <button className="navbar-icon-btn" aria-label="Account menu" onClick={handleOpenUserMenu}>
                                    <i className="fa-solid fa-circle-user user-icon" aria-hidden="true"></i>
                                </button>
                                <UserMenu display={display} handleClick={() => { setOpenUserMenu(false) }} />
                                {!token && (
                                    <Link to="/login" aria-label="Cart"><i className="fa-solid fa-cart-shopping cart-icon" aria-hidden="true"></i></Link>
                                )}
                                {token && (
                                    <Link to="/profile_dashboard/cart" aria-label="Cart"><i className="fa-solid fa-cart-shopping cart-icon" aria-hidden="true"></i><span className='tooltip' aria-hidden="true">{totalItems}</span></Link>
                                )}
                                &nbsp;
                                {token && user.isAdmin === true && (
                                    <Link to="/profile_dashboard/notifications" aria-label="Notifications"><i className="fa-solid fa-bell bell-icon" style={{ fontSize: "1.3rem" }} aria-hidden="true"></i>{productsBelow20.length !== 0 && (<span className='tooltip prdct-tooltip' aria-hidden="true">{productsBelow20.length}</span>)}</Link>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;