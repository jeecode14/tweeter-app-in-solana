import React, { SVGProps } from 'react'

interface Props {
    Icon: (props: SVGProps<SVGSVGElement>)  => JSX.Element
    title: string
}

function SidebarRow({Icon, title}: Props) {
  return (
    <div className='group flex ax-w-fit cursor-pointer items-center space-x-2 rounded-full px-4 py-3
    transition-all duration-200 hover:bg-gray-100 '>
        <Icon className="h-2 w-2"/>
        <p className='hidden md:inline-flex'>{title}</p> 
    </div>
  )
}

export default SidebarRow