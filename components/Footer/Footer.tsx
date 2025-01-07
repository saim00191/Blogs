import React from 'react'

const Footer = () => {
  return (
    <div className='mt-5 bg-[#F6F6F7] text-center py-3'>
      <p className='text-black text-[18px]'>&copy; {new Date().getFullYear()} All Rights Reserved</p>
    </div>
  )
}

export default Footer
