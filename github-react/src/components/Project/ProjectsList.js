import './ProjectsList.css'
import Project from './Project.js'

const Projects = ({ userProjects, username }) => {
    return (
        <div>
            <br />
            <article className="review center-modified" id="example">
                <h4>List of Projects:</h4>
                {userProjects.map((project) => (
                    <Project
                        key={project.id}
                        projectName={project.name}
                        projetId={project.id}
                        userName={username}
                    />
                ))}
            </article>
        </div>
    )
}

export default Projects
