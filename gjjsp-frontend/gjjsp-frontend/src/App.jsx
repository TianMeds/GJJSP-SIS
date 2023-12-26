import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard';
import Notification from './pages/Notification/Notification';
import User from './pages/Users/User';
import Scholar from './pages/Scholars/Scholar';
import Scholarship from './pages/Scholarship/Scholarship'
import Submission from './pages/Submission/Submission';
import Export from './pages/Export/Export';
import Create from './pages/Create/Create';
import Ask from './pages/AskAI/Ask';
import School from './pages/School/School';
import RequireAuth from './pages/RequireAuth';
import {Routes, Route} from 'react-router-dom'; 
import ViewSubmission from './pages/Submission/ViewSubmission';
import NotFound from './pages/NotFound/NotFound';
import Unauthorized from './pages/Unauthorized/Unauthorized';
import ScholarDashboard from './pages/ScholarRole/ScholarDashboard/ScholarDashboard';
import ScholarSubmission from './pages/ScholarRole/ScholarSubmission/ScholarSubmission';
import ScholarProfile from './pages/ScholarRole/ScholarProfile/ScholarProfile';


const ROLES = {
  'Admin': 1,
  'Manager': 2,
  'Scholar': 3
}

function App() {

  return (
    <Routes>
      {/* Public Route */}
      <Route path="login" element={<Login/>}/>
      <Route path='*' element={<NotFound/>}/>
      <Route path='unauthorized' element={<Unauthorized/>}/>
      <Route path="create" element={<Create/>}/>
      <Route path="ask" element={<Ask/>}/>


      {/* Protected Route */}
      
      <Route element={<RequireAuth allowedRoles={[ROLES.Admin]}/>}> 
        <Route  path="notification" element={<Notification/>}/>
        <Route path="user" element={<User/>}/>
        <Route path="scholar" element={<Scholar/>}/>
        <Route path="scholarship" element={<Scholarship/>}/>
        <Route path="submission" element={<Submission/>}/>
        <Route path="export" element={<Export/>}/>
        <Route path="school" element={<School/>}/>
        <Route path="view" element={<ViewSubmission/>}/>
      </Route> 

      {/* Manager Route */}
      <Route element={<RequireAuth allowedRoles={[ROLES.Manager]}/>}>
        <Route path="scholar" element={<Scholar/>}/>
      </Route>

      {/* Scholar Route */}
      <Route element={<RequireAuth allowedRoles={[ROLES.Scholar]}/>}>
        <Route path="scholar-dashboard" element={<ScholarDashboard/>}/>
        <Route path="scholar-submission" element={<ScholarSubmission/>}/>
        <Route path="scholar-profile" element={<ScholarProfile/>}/>
      </Route>

      {/* Admin and Manager Route */}
      <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Manager]}/>}> 
        <Route path="/" element={<Dashboard/>}/>
      </Route>
    </Routes>


  )
}

export default App
