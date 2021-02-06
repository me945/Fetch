import './Title.css'

import React from 'react'

const Title = ({ userName, onChange, onClick }) => {
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
                            value={userName}
                            onChange={onChange}
                        ></input>
                        <button
                            className="ui primary button"
                            type="submit"
                            onClick={onClick}
                        >
                            <i class="github icon"></i>
                            {'Search'}
                        </button>
                    </div>
                </div>
            </li>
        </div>
    )
}
export default Title

{
    /* <img
src="https://clipart.info/images/ccovers/1499794873github-logo-png.png"
width="500"
height="200"
/> */
}
