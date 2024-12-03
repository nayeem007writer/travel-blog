/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Home from './pages/Home/Home';
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/dashboard' exact element={<Home/>}/>
          <Route path='/signup' exact element={<Signup/>}/>
          <Route path='/signin' exact element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
