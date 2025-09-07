import React from 'react'
import Navbar from '../component/Navbar'
import Hero from '../component/hero'
import JobListing from '../component/JobListing'
import AppDownload from '../component/AppDownload'
import Footer from '../component/Footer'

function Home() {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <JobListing/>
        <AppDownload/>
        <Footer/>
    </div>
  )
}

export default Home