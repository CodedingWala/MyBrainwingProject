import React, { Suspense ,lazy } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Camera } from 'three'
import { reference } from 'three/tsl'
import Fallback from './Fallback.jsx'
const Fortune = lazy(() => import('./Fortune.jsx').then(m => ({ default: m.Fortune })))

function Fortune3D({ builRef, cameraRef }) {
    return (
        <Canvas style={{
            width: '100%', height: '100%', display: "flex", flex: "row", alignItems: "center", justifyContent: "center"
        }} camera={{
            position: [0, 20, 200],   // x, y, z
            fov: 45,
        }} onCreated={({ camera }) => {
            cameraRef.current = camera   // ✅ store built-in camera in ref
        }}>

            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <OrbitControls enableZoom={false}      // ✅ disables scroll zoom
                enableRotate={true}    // ✅ disables mouse drag rotation
                enablePan={true}
                autoRotate={false} />
            <Suspense fallback={null}>
                <Fortune ref={builRef} scale={[1, 1, 1]} position={[10, -55, 0]} />
            </Suspense>
        </Canvas>
    )
}

export default Fortune3D
