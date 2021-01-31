import React from 'react'
import './Profile.css'

const Profile = () => {
    return (
        <div>
            <section className="center">
                <article className="review">
                    <div className="img-container">
                        <img
                            src="https://github.com/me945.png"
                            id="person-img"
                            alt=" not found"
                        />
                    </div>
                    <h4 id="username">User Name</h4>
                    <p id="id">Id</p>
                </article>
            </section>
        </div>
    )
}

export default Profile
