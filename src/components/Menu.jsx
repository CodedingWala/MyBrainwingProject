import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef } from 'react'
import { GetContext } from '../context/ContextProvider'

function Menu() {
  const pRef = useRef([null, null, null, null])
  const ParentRef = useRef(null)
  const { isopen } = GetContext()

  useGSAP(() => {
    const tl = gsap.timeline()
    tl.from(ParentRef.current, {
      rotateY: -90,
      transformOrigin: "right center",
      opacity: 0,
      duration: 0.7,
      ease: "power2.inOut",
    })
    tl.from(".children", {
      opacity: 0,
      rotateY: -90,
      duration: 0.6,
      ease: "power1.inOut",
      stagger: 0.2
    })
  }, [isopen])

  const hoverOn = (id) => {
    gsap.fromTo(pRef.current[id],
      { x: 0, opacity: 1 },
      { x: -300, opacity: 1, duration: 4, repeat: -1, ease: "none" }
    )
  }

  const hoverOff = (id) => {
    gsap.killTweensOf(pRef.current[id])
    gsap.to(pRef.current[id], { opacity: 0, duration: 0.3 })
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500&display=swap');

        .menu-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: rgba(255,255,255,0.92);
          transition: all 0.3s ease;
        }

        .menu-name:hover {
          color: #c4b5fd;
        }

        .menu-ticker {
          font-family: 'Outfit', sans-serif;
          font-weight: 300;
          color: rgba(196,181,253,0.5);
          letter-spacing: 0.05em;
        }

        .menu-item-line {
          border-bottom: 1px solid rgba(196,181,253,0.1);
        }

        .menu-item-line:first-child {
          border-top: 1px solid rgba(196,181,253,0.1);
        }
      `}</style>

      <div
        ref={ParentRef}
        className='w-full h-screen overflow-x-hidden flex flex-col items-center justify-center md:justify-center md:items-start md:pt-0'
        style={{
          background: `
            radial-gradient(ellipse at top left, #c4b5fd 0%, transparent 50%),
            radial-gradient(ellipse at bottom right, #a78bfa 0%, transparent 50%),
            #1a0533
          `
        }}
      >
        <div className='w-screen flex flex-col items-center justify-center md:items-start md:px-16'>

          {[{ id: 0, name: "ORIGIN" }, { id: 1, name: "ABOUT" }, { id: 2, name: "HOME" }, { id: 3, name: "CONTACT" }].map((elem, idx) => (
            <div
              key={idx}
              onMouseEnter={() => hoverOn(elem.id)}
              onMouseLeave={() => hoverOff(elem.id)}
              className='children menu-item-line relative w-full cursor-pointer py-6 md:py-8 overflow-hidden'
            >
              {/* index number */}
              <span
                className='absolute top-1/2 -translate-y-1/2 right-5 md:right-10 text-sm'
                style={{ color: 'rgba(196,181,253,0.3)', fontFamily: 'Outfit, sans-serif' }}
              >
                0{idx + 1}
              </span>

              <h1 className='menu-name text-4xl md:text-7xl z-10 text-center md:text-left hover:[filter:blur(2px)]'>
                {elem.name}
              </h1>

              {/* ticker text */}
              <p
                ref={(el) => pRef.current[elem.id] = el}
                className='menu-ticker opacity-0 flex flex-row items-center gap-8 justify-around absolute z-0 top-[35%] w-screen text-sm'
              >
                <span>[View {elem.name.toLowerCase()}]</span>
                <span>[View {elem.name.toLowerCase()}]</span>
                <span>[View {elem.name.toLowerCase()}]</span>
                <span>[View {elem.name.toLowerCase()}]</span>
              </p>
            </div>
          ))}

        </div>
      </div>
    </>
  )
}

export default Menu