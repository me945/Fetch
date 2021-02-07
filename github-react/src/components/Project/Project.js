import './Project.css'
import { useState, useRef } from 'react'
import { useAnimation } from 'react-rebound'
import { Link } from 'react-router-dom'

const Project = ({ projectName, projectId, userName }) => {
    //state for the animation
    const [clicked, setClicked] = useState(false)
    const ref = useRef()

    // A little “pop” on hover
    useAnimation(ref, { scaleX: clicked ? 1.1 : 1, scaleY: clicked ? 1.1 : 1 })

    return (
        <>
            <div
                style={{ marginBottom: '1px' }}
                className="card-header project-title project"
                key={projectId}
            >
                <span>{projectName}</span>
                <Link
                    to={{
                        pathname: '/projectinfo',
                        search: `?user=${userName}&project=${projectName}`,
                        state: { fromDashboard: true },
                    }}
                >
                    <button
                        style={{ cursor: 'pointer', color: 'white' }}
                        className="btn btn-primary"
                        onClick={() => {
                            setClicked(true)
                        }}
                        onMouseEnter={() => setClicked(true)}
                        onMouseLeave={() => setClicked(false)}
                        ref={ref}
                    >
                        {' '}
                        View
                    </button>
                </Link>
            </div>
        </>
    )
}

export default Project
