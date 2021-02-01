import './Project.css'

const Project = ({ userProjects, getProjectName }) => {
    return (
        <>
            {userProjects.map((userProjects) => (
                <div
                    style={{ marginBottom: '1px' }}
                    className="card-header project-title project"
                    key={userProjects.text}
                >
                    <span>{userProjects.text} </span>
                    <button
                        key={userProjects.id}
                        style={{ cursor: 'pointer' }}
                        className="btn btn-primary"
                        onClick={() => getProjectName(userProjects.name)}
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
