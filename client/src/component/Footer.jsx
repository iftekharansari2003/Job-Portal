import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate()
    const handleLogoClick = () => {
        navigate("/");          // go to homepage
        window.scrollTo({       // scroll to top smoothly
            top: 0,
            behavior: "smooth"
        });
    };
    return (
        <div className='container px-4 2xl:px-20 mx-auto flex items-center justify-between gap-4 py-3 mt-20'>
            <img onClick={handleLogoClick} className='cursor-pointer' src={assets.logo} width={160} />
            <p className='flex-1 border-1 border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>Copyright @Iftekhar Ansari | All right reserved.</p>
            <div className='flex gap-2.5'>
                <a href="https://www.facebook.com/LinkedIn/">
                    <img src={assets.facebook_icon} width={38} />
                </a>
                <a href="https://x.com/LinkedIn">
                    <img src={assets.twitter_icon} width={38} />
                </a>
                <a href="https://www.instagram.com/linkedin/">
                    <img src={assets.instagram_icon} width={38} />
                </a>
            </div>
        </div>
    )
}

export default Footer