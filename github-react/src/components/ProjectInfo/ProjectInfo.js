import './ProjectInfo.css'
import { useState, useEffect, useRef } from 'react'

function ProjectInfo(props) {
    //get username & project from the url
    //const url = new URL(window.location.href)
    //let userURL = url.searchParams.get('user').toString()
    //let projectURL = url.searchParams.get('project').toString()

    //get username & project from the url
    let userURL = useRef(props.location.search.split(/[=,&]+/)[1])
    let projectURL = useRef(props.location.search.split(/[=,&]+/)[3])

    //state that holds the project's infromation
    const [project, setProject] = useState([])
    const [contributors, setContributors] = useState([])

    useEffect(() => {
        const getProjectInfo = async () => {
            const infoFromServer = await fetchProject()
            setProject(infoFromServer)
            setContributors(infoFromServer.contributors)
        }

        const fetchProject = async () => {
            const fetchInfo = await fetch(
                `http://localhost:3000/projects/${userURL.current}/${projectURL.current}`
            )
            const data = await fetchInfo.json()

            return data
        }
        getProjectInfo()
    }, [])

    return (
        <div style={{ textAlign: 'center' }}>
            <h4>Description: </h4>
            <span>{project.description}</span>
            <h4>Project Title: </h4>
            <span>{project.title}</span>
            <h4>Commits: </h4> <span>{project.commits}</span>
            <h4>Contributors: </h4>
            <div>
                {contributors.map((con) => (
                    <div>
                        <span>{con.name}</span>
                        <br />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProjectInfo
