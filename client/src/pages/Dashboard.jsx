import React, { useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';


const Dashboard = () => {

    const navigate = useNavigate();

    const { companyData, setCompanyData, setCompanyToken } = useContext(AppContext)

    //Func to logout
    const logout = () => {
        toast.success("Logout Successfully")
        setCompanyToken(null)
        localStorage.removeItem('companyToken')
        setCompanyData(null)
        navigate('/')
    }


    useEffect(() => {
        if (companyData) {
            navigate('/dashboard/add-job')
        }
    }, [, companyData])

    return (
        <div className='min-h-screen'>

            {/* Navbar for Recruiter Panel */}
            <div className='shadow py-4'>
                <div className='px-5 flex justify-between items-center'>
                    <img src={assets.logo} className='max-sm:w-32 cursor-pointer' onClick={e => navigate('/')} />

                    {companyData && (

                        <div className='flex items-center gap-3'>
                            <p className='max-sm:hidden'>Welcome , {companyData.name}</p>
                            <div className='relative group'>
                                <img src={companyData.image} className='w-8  border-full' />
                                <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                                    <ul className='list-noe m-0 p-2 bg-white rounded-md border text-sm'>
                                        <li className='py-1 px-2 cursor-pointer pr-10' onClick={logout}>Logout</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className='flex items-start'>
                {/* Left sidebar with option addjob , managejob and view application */}
                <div className='inline-block min-h-screen border-r-2'>
                    <ul className='flex flex-col items-start text-gray-800 pt-5'>
                        <NavLink to={'/dashboard/add-job'} className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`}>
                            <img className='min-w-4' src={assets.add_icon} alt="" />
                            <p className='max-sm:hidden'>Add Job</p>
                        </NavLink>

                        <NavLink to={'/dashboard/manage-jobs'} className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`}>
                            <img className='min-w-4' src={assets.home_icon} alt="" />
                            <p className='max-sm:hidden'>Manage Jobs</p>
                        </NavLink>

                        <NavLink to={'/dashboard/view-application'} className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`}>
                            <img className='min-w-4' src={assets.person_tick_icon} alt="" />
                            <p className='max-sm:hidden'>View Application</p>
                        </NavLink>
                    </ul>
                </div>

                <div className='flex-1 h-full p-2 sm:p-5'>
                    <Outlet />
                </div>
            </div>

        </div>
    )
}

export default Dashboard