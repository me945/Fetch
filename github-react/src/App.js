import Nav from './components/Nav/Nav.js'
import Title from './components/Title/Title.js'
import Profile from './components/Profile/Profile.js'
import ProjectInfo from './components/ProjectInfo/ProjectInfo.js'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
    return (
        <Router>
            <div className="App">
                <Nav />
                <Route path="/" exact component={Title} />
                <Route path="/profile" component={Profile} />
                <Route path="/projectinfo" component={ProjectInfo} />
            </div>
        </Router>
    )
}
export default App
