import React from 'react'
import './Nav.css'
const Nav = () => {
    return (
        <div>
            <nav>
                <i className="fas fa-bars"></i>
                <div className="nav-center">
                    <ul className="links">
                        <li>
                            <a
                                href="https://www.google.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                home
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.freecodecamp.org/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                about
                            </a>
                        </li>
                        <li>
                            <a href="projects.html">projects</a>
                        </li>
                        <li>
                            <a href="contact.html">contact</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Nav
