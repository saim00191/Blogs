import React from 'react'

interface Props{
    children: React.ReactNode;
    className?: string;
}

const Container = ({children , className} : Props) => {
  return (
      <div className={`${className} max-w-[1220px] mx-auto px-2`}>
          {children}
    </div>
  )
}

export default Container