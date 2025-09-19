import React from 'react'
import { assets } from '../assets/assets'

const AppDownload = () => {
    return (
        <div className='container px-4 2xl:px-20 mx-auto my-20'>
            <div className='relative bg-gradient-to-r from-blue-200 to-violet-300 p-12 sm:p-24 lg:p-32 rounded-lg'>
                <div>
                    <h1 className='text-3xl sm:text-4xl font-bold mb-8 max-w-md'>Download Mobile App For Better Experience</h1>
                    <div className='flex gap-4'>
                        <a className='inline-block' href="https://play.google.com/store/apps/details?id=com.linkedin.android&hl=en-US&pli=1">
                            <img src={assets.play_store} className='h-12' />
                        </a>
                        <a href="https://apps.apple.com/us/app/linkedin-network-job-finder/id288429040" className='inline-block'>
                            <img src={assets.app_store} className='h-12' />
                        </a>
                    </div>
                </div>
                <img src={assets.app_main_img} className='absolute w-80 right-0 bottom-0 mr-32 max-lg:hidden' />
            </div>
        </div>
    )
}

export default AppDownload