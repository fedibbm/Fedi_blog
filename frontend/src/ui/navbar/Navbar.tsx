"use client"
import {  IoMenuOutline } from "react-icons/io5";
import { useState } from "react";
import Link from "next/link";

export default function Navbar(){
    const [menuIsOpen, setMenuIsOpen ] = useState<boolean>(false);

    const handleMenuOpen = ()=>{
        setMenuIsOpen(prev => !prev);
    }

    return(

        <nav className="fixed top-0 z-10 w-full h-18  flex items-center px-4 lg:px-8 border-b border-gray-200 bg-white justify-between text-black select-none"> 
            {/* logo */}
            <Link href="/"><h1 className="cursor-pointer text-4xl font-extrabold uppercase">&lt;fedi/&gt;</h1></Link>

            {/* hamburger icon */}
            <IoMenuOutline  className="text-4xl md:hidden" onClick={handleMenuOpen}/>
            {/*  nav links desktop*/}
            <ul className="md:flex gap-4 text-lg font-semibold  hidden">
                <li ><Link href="/" className="p-4 hover:bg-gray-200 cursor-pointer block">Home</Link></li>
                <li><Link href="/articles/latest/1" className="p-4 hover:bg-gray-200 cursor-pointer block">Latest</Link></li>
                <li><Link href="/about" className="p-4 hover:bg-gray-200 cursor-pointer block">About</Link></li>
                <li className="p-4 hover:bg-gray-200 cursor-pointer ">Contact</li>
            </ul>
             {/*  nav links mobile*/}
            <div className={`fixed h-[calc(100vh-72px)] transition-all duration-300 md:hidden block top-18 w-screen bg-white ${menuIsOpen? "right-0" : "-right-[100vw]"} pt-10`}>
                <ul className="gap-4 text-lg font-semibold  flex flex-col w-full ">
                    <li className="w-full " onClick={handleMenuOpen}><Link href="/" className="block w-full text-center py-4 active:bg-gray-200">Home</Link></li>
                    <li className="w-full " onClick={handleMenuOpen}><Link href="/articles/latest/1" className="block w-full text-center py-4 active:bg-gray-200">Latest</Link></li>
                    <li className="w-full " onClick={handleMenuOpen}><Link href="/about" className="block w-full text-center py-4 active:bg-gray-200">About</Link></li>
                    <li className="block w-full text-center py-4 active:bg-gray-200 " onClick={handleMenuOpen}>Contact</li>
                </ul>
            </div>

        </nav>
    )
}
