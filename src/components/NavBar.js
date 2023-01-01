import classes from "./NavBar.module.css";
import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const NavBar = (props) => {
  const history = useHistory();

  const changeHandler = () => {
    props.handler();
    localStorage.removeItem('loggedIn')
    history.push("/AdminLogin");
  };


  return (
      <nav
        className={`${classes.navbar} navbar navbar-expand-lg navbar-light bg-light`}
      >
        <div className="text-center m-3">
          <h3 className="navbar-brand>">Welcome to AC services</h3>
        </div>
        <button
          className="navbar-toggler m-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link m-2" to="/">
                <strong>Home</strong>
              </Link>
            </li>
            {!props.isLoggedIn && (
              <li className="nav-item active">
                <Link className="nav-link m-2" to="/AdminLogin">
                  <strong>Admin</strong>
                </Link>
              </li>
            )}
            {props.isLoggedIn && (
              <li className="nav-item">
                <button
                  className="btn btn-danger m-3"
                  type="button"
                  onClick={changeHandler}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
  );
};

export default NavBar;
