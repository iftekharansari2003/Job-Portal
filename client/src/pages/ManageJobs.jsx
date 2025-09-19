import React, { useContext, useEffect, useState } from 'react'
import { manageJobsData } from '../assets/assets'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios';
import Loading from '../component/Loading'


const ManageJobs = () => {

  const [jobs, setJobs] = useState(false);
  const { backendUrl, companyToken } = useContext(AppContext);

  //Func to fetch company job Application data
  const fetchCompanyJobs = async () => {

    try {

      const { data } = await axios.get(`${backendUrl}/api/company/list-job`, { headers: { token: companyToken } })

      if (data.success) {
        setJobs(data.jobsData)
        console.log(data.jobsData.reverse());

      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  //Func to change job visibility
  const changeJobVisibility = async (id) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/company/change-visibility`, { id }, { headers: { token: companyToken } }
      )
      if (data.success) {
        toast.success(data.message)
        fetchCompanyJobs()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs()
    }
  }, [companyToken])

  const navigate = useNavigate();
  return jobs ? jobs.length === 0 ? (
    <div className='flex items-center justify-center h-[70vh]'>
      <p className='text-xl sm:text-2xl'>No Jobs Available or Posted Yet</p>
    </div>
  ) : (
    <div className='container b=4 max-w-5xl'>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200 max-sm:text-sm'>
          <thead>
            <tr>
              <th className='py-2 px-4 border-b text-left max-sm:hidden'>#</th>
              <th className='py-2 px-4 border-b text-left'>Job Title</th>
              <th className='py-2 px-4 border-b text-left max-sm:hidden'>Date</th>
              <th className='py-2 px-4 border-b text-left max-sm:hidden'>Location</th>
              <th className='py-2 px-4 border-b text-center '>Applicants</th>
              <th className='py-2 px-4 border-b text-left'>Visible</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((jobdata, idx) => (
              <tr key={idx} className='text-gray-700'>
                <td className='py-2 px-4 border-b max-sm:hidden'>{idx + 1}</td>
                <td className='py-2 px-4 border-b'>{jobdata.title}</td>
                <td className='py-2 px-4 border-b max-sm:hidden'>{moment(jobdata.date).format('ll')}</td>
                <td className='py-2 px-4 border-b max-sm:hidden'>{jobdata.location}</td>
                <td className='py-2 px-4 border-b text-center'>{jobdata.applicants}</td>
                <td className='py-2 px-4 border-b'>
                  <input onChange={() => changeJobVisibility(jobdata._id)} type="checkbox" className='scale-125 ml-4' checked={jobdata.visible} />
                </td>
              </tr>

            ))}
          </tbody>
        </table>
        <div className='mt-4 flex justify-end'>
          <button className='bg-black text-white px-4 py-2 rounded' onClick={e => navigate('/dashboard/add-job')}>Add new Job</button>
        </div>
      </div>
    </div>
  ) : <Loading />
}

export default ManageJobs