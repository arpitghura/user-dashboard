import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <header className="text-gray-600 body-font bg-slate-100">
            <div className="container mx-auto flex flex-wrap px-5 flex-col md:flex-row items-center">
                <Link className="flex title-font font-medium items-center text-gray-900 md:mb-0 py-4" href="/">
                    <span className="ml-3 text-xl font-bold leading-none tracking-normal">User Management Dashboard</span>
                </Link>
                <nav className="md:ml-auto h-100 flex flex-wrap items-center text-base justify-center">
                    <Link className="mr-5 font-medium transition-all ease-in-out cursor-pointer hover:text-gray-900 hover:font-semibold border-b-2 border-transparent hover:border-b-black py-5" href="/dashboard">User Details</Link>
                    <Link className="mr-5 font-medium transition-all ease-in-out cursor-pointer h-full hover:text-gray-900 hover:font-semibold border-b-2 border-transparent hover:border-b-black py-5" href="/login">Account Creation</Link>
                </nav>
            </div>
        </header>
    )
}

export default Navbar