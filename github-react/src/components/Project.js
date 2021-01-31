import './Project.css'

const Project = ({ projects, getProjectName }) => {
    return (
        <>
            {projects.map((projects) => (
                <div
                    style={{ marginBottom: '1px' }}
                    className="card-header project-title project"
                    key={projects.text}
                >
                    <span>{projects.text} </span>
                    <button
                        key={projects.id}
                        style={{ cursor: 'pointer' }}
                        className="btn btn-primary"
                        onClick={() => getProjectName(projects.text)}
                    >
                        {' '}
                        View
                    </button>
                </div>
            ))}
        </>
    )
}

// var  button = document.createElement('button')
// button.setAttribute('onclick','displayInfo(this)')
// button.setAttribute('value',idNum)
// button.classList.add("btn","btn-primary")
// button.appendChild(document.createTextNode("View"))

export default Project
