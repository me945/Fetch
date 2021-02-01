import './GetName.css'

const AddName = ({ onPress }) => {
    return (
        <div className="form-container">
            <div className="form-control ">
                <label>Username:</label>
                <input type="text" placeholder="Enter Username"></input>
                <button
                    className="btn btn-primary btn-align"
                    onClick={() => onPress()}
                >
                    {' '}
                    Fetch Data
                </button>
            </div>
        </div>
    )
}

export default AddName
