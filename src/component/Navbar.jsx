import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
    const state = useSelector((state)=> state.handleCart)
  return (
    <div>
       <nav className="navbar navbar-dark bg-dark">
        <div className="container">
              <NavLink className="navbar-brand" to="/">
                <img src="https://pnggrid.com/wp-content/uploads/2021/05/Black-and-white-Discord-Logo-768x588.png" id="logo"  className="d-inline-block align-top" alt=""/>
                <NavLink className="navbar-brand" to="/">  SHOPPING WEBSITE</NavLink>
              </NavLink>
              <div className="buttons" id="cartbtn">
                      <NavLink to="/cart" className="btn btn-light ms-2">
                        <i className="fa fa-shopping-cart me-1"></i> Cart ({state.length})</NavLink>
              </div>
        </div>
        
      </nav>
    </div>
  );
};

export default Navbar;
