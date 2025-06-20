
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Form1 from './components/Form1'
import Home from './components/Home'
import Quiz from './components/Quiz1'
import AssessmentPage from './components/AssesmentPage'


function App() {

  return (
    <>
      {/* <Quiz/> */}
      {/* <Home/> */}
      <Routes>
        {/* <Route path = '/' element={<Home/>}/> */}
        <Route path = '/' element={<AssessmentPage/>}/> 
      </Routes>
    </>
  )
}

export default App
