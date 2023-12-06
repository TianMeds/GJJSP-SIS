import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard';
import Notification from './pages/Notification/Notification';
import User from './pages/Users/User';
import Scholar from './pages/Scholars/Scholar';
import Scholarship from './pages/Scholarship/Scholarship'
import Submission from './pages/Submission/Submission';
import Report from './pages/Reports/Report';
import Export from './pages/Export/Export';
import Create from './pages/Create/Create';
import Profile from './pages/Profile/Profile';
import Ask from './pages/AskAI/Ask';
import School from './pages/School/School';
import RequireAuth from './pages/RequireAuth';
import {Routes, Route} from 'react-router-dom'; 

function App() {

  return (
    <Routes>
      {/* Public Route */}
      <Route path="login" element={<Login/>}/>
      <Route path="user" element={<User/>}/>
      <Route path="scholar" element={<Scholar/>}/>
      <Route path="scholarship" element={<Scholarship/>}/>
      <Route path="submission" element={<Submission/>}/>
      <Route path="report" element={<Report/>}/>
      <Route path="export" element={<Export/>}/>
      <Route path="create" element={<Create/>}/>
      <Route path="profile" element={<Profile/>}/>
      <Route path="ask" element={<Ask/>}/>
      <Route path="school" element={<School/>}/>


      {/* Protected Route */}

      {/* <Route element={<RequireAuth/>}> */}
      <Route path="/" element={<Dashboard/>}/>
      <Route  path="notification" element={<Notification/>}/>
      {/* </Route> */}
      
    </Routes>
  )
}

export default App
