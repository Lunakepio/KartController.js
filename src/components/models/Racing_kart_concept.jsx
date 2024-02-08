/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 .\racing_kart_concept.glb --transform --shadows 
Files: .\racing_kart_concept.glb [16.98MB] > C:\Users\mouli\r3f-vite-starter\public\models\racing_kart_concept-transformed.glb [931.71KB] (95%)
Author: macomix (https://sketchfab.com/macomix)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/racing-kart-concept-56a94a5776ee4ed185f68c16f7394b5d
Title: Racing Kart Concept
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Kart(props) {
  const { nodes, materials } = useGLTF('./models/racing_kart_concept-transformed.glb')
  return (
    <group {...props} dispose={null} rotation={[0,0 , 0]}>
      <mesh castShadow receiveShadow geometry={nodes['body-concept-1_Paint-Red_0'].geometry} material={materials.PaletteMaterial001} position={[0, 0.538, -0.97]} rotation={[-Math.PI / 2, 0, 0]} scale={1.53} />
      <mesh castShadow receiveShadow geometry={nodes['chair_Rubber-2_0'].geometry} material={materials.PaletteMaterial002} position={[0, 0, -0.009]} rotation={[-Math.PI / 2, 0, 0]} scale={1.53} />
      <mesh castShadow receiveShadow geometry={nodes['steering-wheel-torus_Material-1_0'].geometry} material={materials.PaletteMaterial003} position={[0, 0.597, -0.306]} rotation={[-0.489, 0, 0]} scale={1.53} />
    </group>
  )
}

useGLTF.preload('./models/racing_kart_concept-transformed.glb')