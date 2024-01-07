import React, {lazy, Suspense} from 'react';
import RequireAuth from './pages/ClientPages/RequireAuth';
import {Routes, Route} from 'react-router-dom'; 

//Public Imports
const LazyLogin = lazy(() => import('./pages/LoginPage/Login'));
const LazyForgotPassword = lazy(() => import('./pages/GeneralPages/ForgotPassword'));
const LazyNotFound = lazy(() => import('./pages/GeneralPages/NotFound/NotFound'));
const LazyUnauthorized = lazy(() => import('./pages/GeneralPages/Unauthorized/Unauthorized'));

//All User Imports
const LazyCreate = lazy(() => import('./pages/ClientPages/Create'));
const LazyAsk = lazy(() => import('./pages/GeneralPages/AskAI/Ask'));

//Admin & Manager Imports
const LazyDashboard = lazy(() => import('./pages/ClientPages/Dashboard'));
const LazyNotification = lazy(() => import('./pages/ClientPages/Notification'));
const LazyUser = lazy(() => import('./pages/ClientPages/User'));
const LazyScholar = lazy(() => import('./pages/ClientPages/Scholar'));
const LazyCategories = lazy(() => import('./pages/ClientPages/Categories'));
const LazySubmission = lazy(() => import('./pages/ClientPages/Submission'));
const LazyExport = lazy(() => import('./pages/ClientPages/Export'));
const LazyPartner = lazy(() => import('./pages/ClientPages/Partner'));
const LazyProfile = lazy(() => import('./pages/ClientPages/Profile'));
const LazyViewSubmission = lazy(() => import('./pages/ClientPages/ViewSubmission'))

//Scholar Imports
const LazyScholarDashboard = lazy(() => import('./pages/ScholarPages/ScholarDashboard/ScholarDashboard'));
const LazyScholarSubmission = lazy(() => import('./pages/ScholarPages/ScholarSubmission/ScholarSubmission'));
const LazyScholarProfile = lazy(() => import('./pages/ScholarPages/ScholarProfile/ScholarProfile'));

const ROLES = {
  'Admin': 1,
  'Manager': 2,
  'Scholar': 3
}

function App() {
  return (
    <Routes>
      {/* Public Route */}

      <Route 
        path="login" 
        element={
        <Suspense fallback="Scholarlink Loading...">
          <LazyLogin/>
        </Suspense>}
      />

      <Route 
        path='*' 
        element={
        <Suspense fallback="Scholarlink Loading...">
          <LazyNotFound/>
        </Suspense>
        }
      />

      <Route 
        path='unauthorized' 
        element={
        <Suspense fallback="Scholarlink Loading...">
          <LazyUnauthorized/>
        </Suspense>
        }
      />
      <Route 
        path='forgot-password' 
        element={
        <Suspense fallback="Scholarlink Loading...">
          <LazyForgotPassword/>
        </Suspense>
        }
      />



    {/* Protected Route */}
    
      <Route element={<RequireAuth allowedRoles={[ROLES.Admin]}/>}> 
        <Route path="user" 
          element={
          <Suspense fallback="Scholarlink Loading...">
            <LazyUser/>
          </Suspense>
          }
        />

        <Route 
          path="view" 
          element={
          <Suspense fallback="Scholarlink Loading...">
            <LazyViewSubmission/>
          </Suspense>
          }
        />

      </Route>

      {/* Scholar Route */}
      <Route element={<RequireAuth allowedRoles={[ROLES.Scholar]}/>}>

        <Route 
          path="scholar-dashboard" 
          element={
            <Suspense fallback="Scholarlink Loading...">
              <LazyScholarDashboard/>
            </Suspense>
          }
        />

        <Route 
          path="scholar-submission" 
          element={
            <Suspense fallback="Scholarlink Loading...">
              <LazyScholarSubmission/>
            </Suspense>
          }
        />

      </Route>


      {/* Admin and Manager Route */}
      <Route element={ <RequireAuth allowedRoles={[ROLES.Admin, ROLES.Manager]}/>}> 
        <Route 
          path="/" 
          element={
          <Suspense fallback="Scholarlink Loading...">
            <LazyDashboard/>
          </Suspense>
          }
        />
      
        <Route 
          path="notification" 
          element={
          <Suspense fallback="Scholarlink Loading...">
            <LazyNotification/>
          </Suspense>
          }
        />


        <Route 
          path="scholar" 
          element={
          <Suspense fallback="Scholarlink Loading...">
            <LazyScholar/>
          </Suspense>
          }
        />

        <Route 
          path="categories" 
          element={
          <Suspense fallback="Scholarlink Loading...">
            <LazyCategories/>
          </Suspense>
          }
        />

        <Route 
          path="export" 
          element={
          <Suspense fallback="Scholarlink Loading...">
            <LazyExport/>
          </Suspense>
          }
        />

        <Route 
          path='partner' 
          element={
          <Suspense fallback="Scholarlink Loading...">
            <LazyPartner/>
          </Suspense>
          }
        />

        <Route 
          path="submission" 
          element={
          <Suspense fallback="Scholarlink Loading...">
            <LazySubmission/>
          </Suspense>
          }
        />

        <Route 
          path="profile" 
          element={
          <Suspense fallback="Scholarlink Loading...">
            <LazyProfile/>
          </Suspense>
          }
        />
      

      </Route>

      {/* All Routes */}
      <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Manager, ROLES.Scholar]}/>}>


        <Route 
          path="create" 
          element={
          <Suspense fallback="Scholarlink Loading...">
            <LazyCreate/>
          </Suspense>
          }
        />

        <Route 
          path="ask" 
          element={
          <Suspense fallback="Scholarlink Loading...">
            <LazyAsk/>
          </Suspense>
          }
        />

<Route 
          path="scholar-profile" 
          element={
            <Suspense fallback="Scholarlink Loading...">
              <LazyScholarProfile/>
            </Suspense>
          }
        />
        
      </Route>
    </Routes>


  )
}

export default App
