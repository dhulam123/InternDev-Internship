import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import Home from './Components/Home';
import Dashboard from './Components/Dashboard';
import AdminLogin from './Components/AdminLogin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' Component={Login}></Route>
        <Route path='/home' Component={Home}></Route>
        <Route path='/dashboard' Component={Dashboard}></Route>
        <Route path='/admin' Component={AdminLogin}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
