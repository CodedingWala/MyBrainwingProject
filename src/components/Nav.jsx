import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { GetContext } from '../context/ContextProvider'

function Nav() {
  const meRef = useRef()
  const BackRef = useRef()
  const dotRef = useRef()
  const {isOpen,setisOpen,mtRef}=GetContext()
  useGSAP(() => {
      const tl = gsap.timeline()
      tl.to(meRef.current, {
        opacity: isOpen? 0: 1,
        duration: 0.5,
        display: isOpen? "none":"block",
        ease: "power1.inOut"
      })
      tl.to(dotRef.current, {
        x: isOpen?-10:0,
        duration: 0.5,
        ease: "power1.inout"
      },isOpen?"-=0.3" : "-=0.7")
      tl.to(BackRef.current, {
        opacity: isOpen? 1:0,
        duration: 0.5,
        display: isOpen? "block":"none",
        ease: "power1.inOut"
      },isOpen?"-=0.3" : "-=1.2")
  }, [isOpen])
  return (
    <header className='w-full min-h-10 flex items-center fixed left-0 top-0 z-20'>
      <nav className='w-full h-full flex flex-row items-center justify-between px-5 md:px-10 py-3'>
        <div>
          <h1 className='font-medium text-xl md:text-4xl'>BrainWing</h1>
        </div>
        <Link onClick={() => {
          setisOpen(!isOpen)
        }} to={isOpen? "/" : "/menu"} className=' overflow-hidden flex items-center justify-center gap-5 w-[30%] md:w-[10%]  backdrop-blur-md bg-white/30 rounded-lg px-5 py-2 cursor-pointer'>
          <span ref={meRef} className='font-normal text-xl'>menu</span>
          <span ref={dotRef} className={`text-4xl font-light `}>• </span>
          <span ref={BackRef} className={`opacity-0 hidden font-normal text-xl` } >Back</span>
        </Link>
      </nav>
    </header>
  )
}

export default Nav
