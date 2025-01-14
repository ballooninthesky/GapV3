import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Index from './components/Index';

function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/index' element={<Index/>}/>
      </Routes>
    </Router>
  )
}

export default App;