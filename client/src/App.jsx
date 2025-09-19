import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Applications from './pages/Applications';
import ApplyJob from './pages/ApplyJob';
import RecruiterLogin from './component/RecruiterLogin';
import { AppContext } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import AddJob from './pages/AddJob';
import ManageJobs from './pages/ManageJobs';
import ViewApplication from './pages/ViewApplication';
import 'quill/dist/quill.snow.css'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {

  const { showRecruiterLogin, companyToken } = useContext(AppContext);

  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin />}
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/apply-job/:id' element={<ApplyJob />}></Route>
        <Route path='/applications' element={<Applications />}></Route>
        <Route path='/dashboard' element={<Dashboard />}>
          {companyToken ?
            <>

              <Route path='add-job' element={<AddJob />}></Route>
              <Route path='manage-jobs' element={<ManageJobs />}></Route>
              <Route path='view-application' element={<ViewApplication />}></Route>
            </> : null
          }

        </Route>
      </Routes>

    </div>
  )
}

export default App