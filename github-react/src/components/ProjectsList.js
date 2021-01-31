import './ProjectsList.css'
import Project from './Project.js'


const Projects = ({ projects,getProjectName }) => {
    return (
        <div>
            <br />
            <article className="review center-modified" id="example">
                <h4>List of Projects:</h4>
                <Project projects={projects} getProjectName={getProjectName} />
            </article>
        </div>
    )
}

export default Projects
