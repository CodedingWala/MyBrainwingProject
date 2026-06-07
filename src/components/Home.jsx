import React, { useRef } from 'react'
import { ScrollTrigger, SplitText } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMedia } from 'react-use'
import { Fortune } from "./Fortune.jsx"
import Fortune3D from './Fortune3D.jsx'
import { GetContext } from '../context/ContextProvider.jsx'
gsap.registerPlugin(ScrollTrigger, SplitText)

function Home() {
  const isMobile = useMedia('(max-width: 767px)')
  const hrefs = useRef([null, null, null, null, null, null])
  const cameraRef = useRef()
  const cameraZRef = useRef({ z: 200 })
  const rotationRef = useRef({ y: 0 })
  const { builRef } = GetContext()

  useGSAP(() => {
    const line1 = new SplitText(hrefs.current[0], { type: "chars" })
    const line2 = new SplitText(hrefs.current[1], { type: "chars" })
    const line3 = new SplitText(hrefs.current[2], { type: "chars" })
    const line4 = new SplitText(hrefs.current[3], { type: "chars" })
    const line5 = new SplitText(hrefs.current[4], { type: "chars" })
    const line6 = new SplitText(hrefs.current[5], { type: "chars" })

    if (isMobile) {
      // ==========================================
      // MOBILE LAYOUT — stacked vertical scroll
      // ==========================================
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#mobile-parent",
          pin: true,
          start: "top 0%",
          end: "+=4000",
          scrub: true,
        }
      })

      // text pairs animate in one by one
      tl.from(".pair1", { x: 200, opacity: 0, duration: 2, ease: "power1.inOut" })
      tl.from(".pair2", { x: 200, opacity: 0, duration: 2, ease: "power1.inOut" })
      tl.from(".pair3", { x: 200, opacity: 0, duration: 2, ease: "power1.inOut" })

      // fade out text
      tl.to("#mobile-child", { opacity: 0, duration: 0.5 })

      // h1 text animations
      tl.from([line1.chars, line2.chars], { opacity: 0, y: 60, stagger: 0.04, duration: 0.5, ease: "back.out(1.7)" })
      tl.to([line1.chars, line2.chars], { opacity: 0, y: -60, stagger: 0.02, duration: 0.4 })
      tl.from([line3.chars, line4.chars], { opacity: 0, x: -40, stagger: 0.04, duration: 0.5, ease: "power3.out" })
      tl.to([line3.chars, line4.chars], { opacity: 0, x: 40, stagger: 0.02, duration: 0.4 })
      tl.from([line5.chars, line6.chars], { opacity: 0, rotation: 90, scale: 0, stagger: 0.04, duration: 0.5, ease: "power2.out" })
      tl.to([line5.chars, line6.chars], { opacity: 0, rotation: -90, scale: 0, stagger: 0.02, duration: 0.4 })

      // camera zoom
      tl.to(cameraZRef.current, {
        z: 140,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: () => {
          if (cameraRef?.current) cameraRef.current.position.z = cameraZRef.current.z
        }
      })

      // building rotation
      tl.to(rotationRef.current, {
        y: Math.PI * 2,
        duration: 3,
        ease: "none",
        onUpdate: () => {
          if (builRef?.current) builRef.current.rotation.y = rotationRef.current.y
        }
      })

    } else {
      // ==========================================
      // DESKTOP LAYOUT — exactly as before
      // ==========================================
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#parent",
          pin: true,
          start: "top 10%",
          end: "+=5000",
          scrub: true,
        }
      })

      tl.from(".pair1", { x: 300, opacity: 0, duration: 2, ease: "power1.inOut" })
      tl.from(".pair2", { x: 300, opacity: 0, duration: 2, ease: "power1.inOut" })
      tl.from(".pair3", { x: 300, opacity: 0, duration: 2, ease: "power1.inOut" })
      tl.to("#child", { opacity: 0, duration: 0.5 })
      tl.to("#right", { x: "-50%", duration: 0.8, ease: "power1.inOut" })

      tl.from([line1.chars, line2.chars], { opacity: 0, y: 80, stagger: 0.04, duration: 0.5, ease: "back.out(1.7)" })
      tl.to([line1.chars, line2.chars], { opacity: 0, y: -80, stagger: 0.02, duration: 0.4 })
      tl.from([line3.chars, line4.chars], { opacity: 0, x: -60, stagger: 0.04, duration: 0.5, ease: "power3.out" })
      tl.to([line3.chars, line4.chars], { opacity: 0, x: 60, stagger: 0.02, duration: 0.4 })
      tl.from([line5.chars, line6.chars], { opacity: 0, rotation: 90, scale: 0, stagger: 0.04, duration: 0.5, ease: "power2.out" })
      tl.to([line5.chars, line6.chars], { opacity: 0, rotation: -90, scale: 0, stagger: 0.02, duration: 0.4 })

      tl.to(cameraZRef.current, {
        z: 160,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: () => {
          if (cameraRef?.current) cameraRef.current.position.z = cameraZRef.current.z
        }
      })

      tl.to(rotationRef.current, {
        y: Math.PI * 2,
        duration: 3,
        ease: "none",
        onUpdate: () => {
          if (builRef?.current) builRef.current.rotation.y = rotationRef.current.y
        }
      })
    }

  }, [isMobile])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500&display=swap');
        body { font-family: 'Outfit', sans-serif; }
        .pair1, .pair2, .pair3 {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          color: rgba(255,255,255,0.92);
          letter-spacing: -0.02em;
        }
        .right-h1 {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.15;
        }
        .noise::after {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.3;
        }
      `}</style>

      <main
        className='noise relative w-full min-h-[900%] overflow-y-auto flex flex-col md:flex-row md:items-start md:justify-between'
        style={{
          background: `
            radial-gradient(ellipse at top left, #c4b5fd 0%, transparent 50%),
            radial-gradient(ellipse at bottom right, #a78bfa 0%, transparent 50%),
            #1a0533
          `
        }}
      >

        {/* ===================== MOBILE LAYOUT ===================== */}
        {isMobile && (
          <div id="mobile-parent" className='w-full min-h-screen flex flex-col'>

            {/* building on top — visible immediately */}
            <div className='w-full h-[50vh] relative'>
              <Fortune3D builRef={builRef} cameraRef={cameraRef} />
            </div>

            {/* h1 text overlay on canvas */}
            <div className='absolute top-[5vh] left-0 w-full z-20 pointer-events-none'>
              <h1 className='right-h1 text-center text-2xl w-full px-5'>
                <span ref={(el) => hrefs.current[0] = el} className='block' style={{ color: '#ffffff' }}>We animate the web.</span>
                <span ref={(el) => hrefs.current[1] = el} className='block' style={{ color: '#c4b5fd' }}>So your brand breathes.</span>
              </h1>
              <h1 className='right-h1 text-center text-2xl w-full px-5 mt-4'>
                <span ref={(el) => hrefs.current[2] = el} className='block' style={{ color: '#ffffff' }}>Motion is our language.</span>
                <span ref={(el) => hrefs.current[3] = el} className='block' style={{ color: '#c4b5fd' }}>Design is our obsession.</span>
              </h1>
              <h1 className='right-h1 text-center text-2xl w-full px-5 mt-4'>
                <span ref={(el) => hrefs.current[4] = el} className='block' style={{ color: '#ffffff' }}>Every pixel, intentional.</span>
                <span ref={(el) => hrefs.current[5] = el} className='block' style={{ color: '#c4b5fd' }}>Every frame, unforgettable.</span>
              </h1>
            </div>

            {/* text pairs below building */}
            <div id="mobile-child" className='w-full flex flex-col items-center justify-center gap-4 px-5 pt-6 text-center'>
              <p className='pair1 text-lg'>We built trust first</p>
              <p className='pair1 text-lg' style={{ color: 'rgba(196,181,253,0.7)' }}>That built relation strong</p>
              <p className='pair2 text-lg'>Every second counts</p>
              <p className='pair2 text-lg' style={{ color: 'rgba(196,181,253,0.7)' }}>We never waste yours.</p>
              <p className='pair3 text-lg'>You're not a ticket.</p>
              <p className='pair3 text-lg' style={{ color: 'rgba(196,181,253,0.7)' }}>You're why we show up.</p>
            </div>

          </div>
        )}

        {/* ===================== DESKTOP LAYOUT ===================== */}
        {!isMobile && (
          <>
            <div id="parent" className='w-full h-full w-1/2 flex items-center justify-start px-10'>
              <div id="child" className='w-full flex flex-col items-start justify-between gap-3'>
                <p className='pair1 text-4xl'>We built trust first</p>
                <p className='pair1 text-4xl' style={{ color: 'rgba(196,181,253,0.7)' }}>That built relation strong</p>
                <p className='pair2 text-4xl'>Every second counts</p>
                <p className='pair2 text-4xl' style={{ color: 'rgba(196,181,253,0.7)' }}>We never waste yours.</p>
                <p className='pair3 text-4xl'>You're not a ticket.</p>
                <p className='pair3 text-4xl' style={{ color: 'rgba(196,181,253,0.7)' }}>You're why we show up.</p>
              </div>
            </div>

            <div
              id="right"
              className='w-1/2 h-screen fixed right-0 top-0'
              style={{ background: 'transparent' }}
            >
              <h1 className='right-h1 absolute z-20 text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl w-[80%]'>
                <span ref={(el) => hrefs.current[0] = el} className='block' style={{ color: '#ffffff' }}>We animate the web.</span>
                <span ref={(el) => hrefs.current[1] = el} className='block' style={{ color: '#c4b5fd' }}>So your brand breathes.</span>
              </h1>
              <h1 className='right-h1 absolute z-20 text-center top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl w-[80%]'>
                <span ref={(el) => hrefs.current[2] = el} className='block' style={{ color: '#ffffff' }}>Motion is our language.</span>
                <span ref={(el) => hrefs.current[3] = el} className='block' style={{ color: '#c4b5fd' }}>Design is our obsession.</span>
              </h1>
              <h1 className='right-h1 absolute z-20 text-center top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl w-[80%]'>
                <span ref={(el) => hrefs.current[4] = el} className='block' style={{ color: '#ffffff' }}>Every pixel, intentional.</span>
                <span ref={(el) => hrefs.current[5] = el} className='block' style={{ color: '#c4b5fd' }}>Every frame, unforgettable.</span>
              </h1>

              <Fortune3D builRef={builRef} cameraRef={cameraRef} />
            </div>
          </>
        )}

      </main>
    </>
  )
}

export default Home