import logo from './logo.svg'
import './App.css'
import Nav from './components/Nav/Nav'
// jsx allows u to return html
// it needs to be compiled to normal js
// react people do that for you
function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Nav />
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    )
}

export default App
