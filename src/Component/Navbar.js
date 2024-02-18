import React, { createRef, useRef } from 'react'

// import Outlet for extra components
import { Outlet, Link } from 'react-router-dom';

function Navbar() {
    return (
        <div>
            <nav className="navbar " style={{ backgroundColor: "#e3f2fd", padding: "10px 20px" }}>

                <div className="container-fluid">
                    <Link to="/" className='album'>
                    {/* navbar heading */}
                        <span className="navbar-brand navbar-title" >Album List</span>
                    </Link>
                    <form className="d-flex" role="search">
                        <Link to="/add-album">
                        {/* add album form button */}
                            <button className='btn btn-outline-primary'>Add New</button>
                        </Link>

                    </form>
                </div>

            </nav>
            {/* outlet for show child component of navbar */}
            <Outlet />
        </div>
    )
}

export default Navbar
