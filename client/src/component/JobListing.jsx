import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocations } from '../assets/assets';
import JobCard from './JobCard';

const JobListing = () => {

    const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext);

    const [showFilter, setShowFilter] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);

    const [selectedCategories, setSelectedCategories] = useState([]);

    const [selectedLocation, setSelectedLocation] = useState([]);

    const [filteredJobs, setFilteredJobs] = useState(jobs);

    //It will toggle the Category Array List like [cloud,Network,...]
    const handleCategoryChange = (category) => {
        setSelectedCategories(
            prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        )
    }

    //It will toggle the Location Array List like [cloud,Network,...]
    const handleLocationChange = (location) => {
        setSelectedLocation(
            prev => prev.includes(location) ? prev.filter(c => c !== location) : [...prev, location]
        )
    }


    //Using UseEffect we create several boolean variable to get Filtered data On the basis on selectedCategories,location,searchFilter

    useEffect(() => {

        //Use Or Operation to check the current job of jobs is give true for matchesCategory,matchesLocation,matchesTitle,matechesSearchLocation then only we add the current job to the filtered job

        const matchesCategory = job => selectedCategories.length === 0 || selectedCategories.includes(job.category);

        const matchesLocation = job => selectedLocation.length === 0 || selectedLocation.includes(job.location);

        const matchesTitle = job => searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase());

        const matechesSearchLocation = job => searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

        const newFilteredJobs = jobs.slice().reverse().filter(
            job => matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matechesSearchLocation(job)
        )

        setFilteredJobs(newFilteredJobs)
        setCurrentPage(1);

    }, [jobs, selectedCategories, selectedLocation, searchFilter])

    return (
        <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'>

            {/* Side Bar */}

            <div className='w-full lg:w-1/4 bg-white px-4'>

                {/* Search Filter from Hero Component */}

                {
                    isSearched && (searchFilter.title !== "" || searchFilter.location !== "") && (

                        <>
                            <h3 className='font-medium text-lg mb-4'>Current Search</h3>
                            <div className='mb-4 text-gray-600'>
                                {searchFilter.title && (
                                    <span className='inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>
                                        {searchFilter.title}
                                        <img onClick={(e) => setSearchFilter(prev => ({ ...prev, title: "" }))} className="cursor-pointer"
                                            src={assets.cross_icon} alt="" />
                                    </span>
                                )}

                                {searchFilter.location && (
                                    <span className='ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded'>
                                        {searchFilter.location}
                                        <img className='cursor-pointer' onClick={(e) => setSearchFilter(prev => ({ ...prev, location: "" }))}
                                            src={assets.cross_icon} alt="" />
                                    </span>
                                )}
                            </div>
                        </>
                    )
                }

                <button onClick={e => setShowFilter(prev => !prev)} className='px-6 py-1.5 rounded border border-gray-400 lg:hidden hover:bg-gray-100'>
                    {showFilter ? "Close" : "Search by Filters"}
                </button>

                {/* Search By Category */}

                <div className={showFilter ? "" : "max-lg:hidden"}>
                    <h3 className='font-medium text-lg py-4'>Search by Categories</h3>
                    <ul className='space-y-4 text-gray-600'>
                        {
                            JobCategories.map((Category, index) => (
                                <li key={index} className='flex gap-3 items-center'>
                                    <input type="checkbox" className='scale-125' onChange={() => handleCategoryChange(Category)} checked={selectedCategories.includes(Category)} />
                                    {Category}
                                </li>
                            ))
                        }
                    </ul>
                </div>

                {/* Search By Location */}

                <div className={showFilter ? "" : "max-lg:hidden"}>
                    <h3 className='font-medium text-lg py-4 pt-14'>Search by Location</h3>
                    <ul className='space-y-4 text-gray-600'>
                        {
                            JobLocations.map((Location, index) => (
                                <li key={index} className='flex gap-3 items-center'>
                                    <input type="checkbox" className='scale-125' onChange={() => handleLocationChange(Location)} checked={selectedLocation.includes(Location)} />
                                    {Location}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>

            {/* JOb Listing */}

            <section className='w-full lg:w-3/4 text-gray-800 max-lg:px-4'>
                <h3 className='font-medium text-3xl py-2' id='job-list'>Latest Jobs</h3>
                <p className='mb-8'>Get your desired job from top companies</p>
                <div className='grid grid-cols-1 sm:grid-cols-1 sm:grid-cols2 xl:grid-cols-3 gap-4'>
                    {filteredJobs.slice((currentPage - 1) * 6, currentPage * 6).map((job, index) =>
                        <JobCard key={index} job={job} />
                    )}
                </div>


                {/* pagination */}
                {filteredJobs.length > 0 && (
                    <div className='flex items-center justify-center space-x-2 mt-10'>
                        <a href="#job-list">
                            <img onClick={() => setCurrentPage(Math.max(currentPage - 1), 1)} src={assets.left_arrow_icon} />
                        </a>
                        {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
                            <a key={index} href="#job-list">
                                <button onClick={() => setCurrentPage(index + 1)} className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currentPage === index + 1 ? 'bg-blue-100 text-blue-500' : "text-gray-500"}`}>{index + 1}</button>
                            </a>
                        ))}
                        <a href="#job-list">
                            <img onClick={() => setCurrentPage(Math.min(currentPage + 1, Math.ceil(filteredJobs.length / 6)))} src={assets.right_arrow_icon} />
                        </a>
                    </div>
                )}

            </section>

        </div>
    )
}

export default JobListing