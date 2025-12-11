import React from 'react'
import { NavBar } from '../components/Navbar.jsx'
import { FlowCard } from '../components/FlowCard.jsx'
import { FlowFooter } from '../components/FlowFooter.jsx'

const FlowPage = () => {
    return (
        <>
            <NavBar />
            <div className='flex gap-5 justify-center mt-25'>
                <FlowCard />
                <FlowCard />
                <FlowCard />
                <FlowCard />
                <FlowCard />
            </div>
            <div className=' w-screen absolute bottom-0'>
                <FlowFooter />
            </div>

        </>
    )
}

export default FlowPage