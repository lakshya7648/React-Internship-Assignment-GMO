import { useState } from 'react'
import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './components/HomePage';
import Departments from "./components/Departments";
import AlertMessage from "./components/AlertMessage";
function App() {

  const [alert, setAlert] = useState<any>(null);
  const showAlert = (severity:any, message:any)=>{
    setAlert({severity:severity, message:message});
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  }
  return (
    <>
      <Router>
        <Navbar/>
        <AlertMessage alert={alert}/>
        <Routes>
          <Route path="/" element={<HomePage showAlert={showAlert}/>}></Route>
          <Route path="/main"  element={<Departments showAlert={showAlert}/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
