import { React, useState } from 'react'
import './Nav.css'
import '../Project/Project.css'
import { Link } from 'react-router-dom'
const Nav = () => {
    //state that holds the user object
    const [username, setUserName] = useState('')
    
    //send username to the usestate
    const onChangeHandler = (name) => {
        setUserName(name.target.value)
    }

    return (
        <div>
            <nav>
                <i className="fas fa-bars"></i>
                <div className="nav-center">
                    <ul className="links">
                        <li>
                            <Link to="/">Home</Link>
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
                                    value={username}
                                    onChange={onChangeHandler}
                                ></input>
                                <Link
                                    to={{
                                        pathname: '/profile',
                                        search: `?user=${username}`,
                                        state:{fromDashboard: true}
                                    }}
                                >
                                    <button
                                        className="ui icon button"
                                        type="submit"
                            
                                    >
                                        <i className="search icon"></i>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </li>
                </div>
            </nav>
        </div>
    )
}

export default Nav
