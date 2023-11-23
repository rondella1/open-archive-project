import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

//create folders per Route 
//update .env file with Mongo credentials then test db

const App = () => {
    return (
        <Router>
            <nav>
                <ul>
                    <Link to="/">Home</Link>
                    <Link to="/institutions">Institutions</Link>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<h1>Home</h1>}/> 
                <Route path="/institutions" element={<h1>Institutions</h1>}/>
            </Routes>
        </Router>
    )
}

export default App;