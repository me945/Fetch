import './Title.css'
import React from 'react'
import { useState } from 'react'
import { useAnimation } from 'react-rebound'
import { Link } from 'react-router-dom'

const Title = () => {
    //state that holds the user object
    const [username, setUserName] = useState('')

    //state for the animation
    const [clicked, setClicked] = React.useState(false)
    const ref = React.useRef()

    //send username to the usestate
    const onChangeHandler = (name) => {
        setUserName(name.target.value)
    }

    // A little “pop” on hover
    useAnimation(ref, { scaleX: clicked ? 1.1 : 1, scaleY: clicked ? 1.1 : 1 })

    return (
        <div className="title">
            <br />
            <h2>GitHub API</h2>
            <div className="underline"></div>
            <br />
            <li
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <div>
                    <div className="ui action input">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={username}
                            onChange={onChangeHandler}
                        ></input>{' '}
                        <Link
                            to={{
                                pathname: '/profile',
                                search: `?user=${username}`,
                                state: { fromDashboard: true },
                            }}
                        >
                            {' '}
                            <button
                                className="ui primary button"
                                type="submit"
                                onClick={() => {
                                    // onClickHandler(a)
                                    setClicked(true)
                                }}
                                onMouseEnter={() => setClicked(true)}
                                onMouseLeave={() => setClicked(false)}
                                ref={ref}
                            >
                                <i className="github icon"></i>
                                {'Search'}
                            </button>
                        </Link>
                    </div>
                </div>
            </li>
        </div>
    )
}
export default Title
