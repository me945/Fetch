import React from 'react'
import './Nav.css'
import '../Project/Project.css'
const Nav = ({ onChange, onClick, userName }) => {
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
                            <a
                                href="https://www.google.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                projects
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.google.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                contact
                            </a>
                        </li>
                    </ul>
                    <li
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <div>
                            <div className="ui action input">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={userName}
                                    onChange={onChange}
                                ></input>
                                <button
                                    className="ui icon button"
                                    type="submit"
                                    onClick={onClick}
                                >
                                    <i className="search icon"></i>
                                </button>
                            </div>
                        </div>
                    </li>
                </div>
            </nav>
        </div>
    )

    function Home() {
        const myURL = new URL(window.location.href)
        myURL.pathname = 'home'
        window.location.href = myURL
    }
}

export default Nav
