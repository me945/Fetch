import './Project.css'

const Project = ({ projectName, projectId, getProjectName }) => {
    return (
        <>
            <div
                style={{ marginBottom: '1px' }}
                className="card-header project-title project"
                key={projectId}
            >
                <span>{projectName}</span>
                <button
                    style={{ cursor: 'pointer', color: 'black' }}
                    className="btn btn-secondary"
                    onClick={() => getProjectName(projectName)}
                >
                    {' '}
                    View
                </button>
            </div>
        </>
    )
}

export default Project
