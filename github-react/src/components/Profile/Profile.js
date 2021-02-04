import React from 'react'
import { useState, useEffect } from 'react'
import './Profile.css'
import ProjectsList from '../Project/ProjectsList.js'

const Profile = () => {
    //state to save the fetched data
    const [projectInfo, setProjectInfo] = useState([])
    const [userInfo, setUserInfo] = useState([])

    //get username from the url
    const url = new URL(window.location.href)
    let userURL = url.searchParams.get('user').toString()

    useEffect(() => {
        //pass object values to the state
        const getUserInfo = async () => {
            const infoFromServer = await fetchUser()
            setProjectInfo(infoFromServer.projects)
            setUserInfo({
                name: infoFromServer.name,
                id: infoFromServer.id,
            })
        }

        //Fetch user information from the server
        const fetchUser = async () => {
            const fetchData = await fetch(
                `http://localhost:3000/projects/${userURL}`
            )
            const data = await fetchData.json()

            console.log(data)
            return data
        }

        getUserInfo()
    }, [userURL])

    //button funtion
    const getProjectName = async (projectName) => {
        
        const myURL = new URL(window.location.href)
        myURL.pathname = 'projectinfo'
        myURL.search = `user=${userURL}&project=${projectName}`

        window.location.href = myURL
    }

    return (
        <div>
            <section className="center">
                <article className="review">
                    <div className="img-container">
                        <img
                            src={`https://github.com/${userURL}.png`}
                            id="person-img"
                            alt=" not found"
                        />
                    </div>
                    <h4 id="name">{userInfo.name}</h4>
                    <h4 id="username">{userURL}</h4>
                    <p id="id">{userInfo.id}</p>
                </article>
            </section>

            <ProjectsList
                userProjects={projectInfo}
                getProjectName={getProjectName}
            />
        </div>
    )
}

export default Profile
