import { Html } from '@react-three/drei'
import React from 'react'

function Fallback() {
  return (
    <Html fullscreen>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');

        .loader-wrap {
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: radial-gradient(ellipse at top left, #c4b5fd 0%, transparent 50%),
                      radial-gradient(ellipse at bottom right, #a78bfa 0%, transparent 50%),
                      #1a0533;
        }

        .loader-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(1.5rem, 4vw, 3rem);
          color: #ffffff;
          letter-spacing: -0.03em;
          margin-bottom: 2rem;
          opacity: 0;
          animation: fadeUp 0.8s ease forwards;
        }

        .loader-title span {
          color: #c4b5fd;
        }

        .loader-bar-wrap {
          width: 200px;
          height: 2px;
          background: rgba(255,255,255,0.1);
          border-radius: 999px;
          overflow: hidden;
        }

        .loader-bar {
          height: 100%;
          width: 0%;
          background: linear-gradient(90deg, #c4b5fd, #a78bfa);
          border-radius: 999px;
          animation: loadBar 2s ease-in-out infinite;
        }

        .loader-dots {
          display: flex;
          gap: 8px;
          margin-top: 2rem;
        }

        .loader-dots span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #c4b5fd;
          animation: dotPulse 1.2s ease-in-out infinite;
        }

        .loader-dots span:nth-child(2) { animation-delay: 0.2s; }
        .loader-dots span:nth-child(3) { animation-delay: 0.4s; }

        .loader-sub {
          font-family: 'Syne', sans-serif;
          font-size: 0.85rem;
          color: rgba(196,181,253,0.5);
          margin-top: 1.5rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          animation: fadeUp 0.8s 0.3s ease forwards;
          opacity: 0;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes loadBar {
          0%   { width: 0%;   margin-left: 0; }
          50%  { width: 100%; margin-left: 0; }
          100% { width: 0%;   margin-left: 100%; }
        }

        @keyframes dotPulse {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50%       { opacity: 1;   transform: scale(1.2); }
        }
      `}</style>

      <div className='loader-wrap'>
        <h1 className='loader-title'>
          Brain<span>Wing</span>
        </h1>

        <div className='loader-bar-wrap'>
          <div className='loader-bar' />
        </div>

        <div className='loader-dots'>
          <span /><span /><span />
        </div>

        <p className='loader-sub'>Building the experience</p>
      </div>
    </Html>
  )
}

export default Fallback