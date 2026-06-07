import { forwardRef } from 'react'
import { useGLTF } from '@react-three/drei'

export const Fortune = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF('/model/Fortune-transformed.glb')
  return (
    <group ref={ref} {...props} dispose={null}>   // ✅ ref on group
      <mesh geometry={nodes.Floor_015_m_ROAD_1218935.geometry} material={nodes.Floor_015_m_ROAD_1218935.material} scale={0.305} />
      <mesh geometry={nodes.Mass_1_Mass_1_1290931.geometry} material={materials['Material.001']} scale={0.305} />
      <mesh geometry={nodes.Floors_1_Floors_1_1329853.geometry} material={materials['Material.002']} scale={0.305} />
    </group>
  )
})

useGLTF.preload('/model/Fortune-transformed.glb')