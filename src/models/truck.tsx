import React, { useState, useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three';
import { GroupProps, useLoader } from '@react-three/fiber';

interface IModel extends GroupProps {
  Image3D?: string
  images?: {
    left: string;
    right: string;
    doorLeft: string;
    doorRight: string;
  }
}

export default function Model(props: IModel) {
  const { images,Image3D, ...rest } = props

  const leftSideMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(`/_next/image?url=${encodeURI(images?.left + '&w=1200&q=75'||'')}`),
    side: THREE.DoubleSide
  })
  
  const rightSideMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(`/_next/image?url=${encodeURI(images?.right + '&w=1200&q=75'||'')}`),
    side: THREE.DoubleSide
  })
  const rightBackDoorMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(`/_next/image?url=${encodeURI(images?.doorRight + '&w=1200&q=75'||'')}`),
    side: THREE.DoubleSide,
  })
  const leftBackDoorMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(`/_next/image?url=${encodeURI(images?.doorLeft + '&w=1200&q=75'||'')}`),
    side: THREE.DoubleSide,
  })
  const imageURL = Image3D ? Image3D : '/3ds/3dtruck.glb';
  // @ts-ignore
  const { nodes, materials } = useGLTF('/3ds/3dtruck.glb');

  return (
    <group {...rest} dispose={null}>
      <group scale={0.01}>
        <mesh geometry={nodes.Mesh.geometry} material={materials.MediumTruck01} />
        <mesh geometry={nodes.Mesh_1.geometry} material={materials.MediumTruck01Glass} />
        <mesh geometry={nodes.WheelBL.geometry} material={materials.MediumTruck01} position={[87.28, 34.76, -154.87]} />
        <mesh geometry={nodes.WheelBR.geometry} material={materials.MediumTruck01} position={[-87.28, 34.76, -154.87]} />
        <mesh geometry={nodes.WheelFL.geometry} material={materials.MediumTruck01} position={[93.29, 36.34, 274.28]} />
        <mesh geometry={nodes.WheelFR.geometry} material={materials.MediumTruck01} position={[-93.29, 36.34, 274.28]} />
      </group>
      <mesh geometry={nodes.LeftSide.geometry} material={leftSideMaterial} position={[1.3, 2.2, -0.84]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} scale={[2.96, 1, 1.2]} />
      <mesh geometry={nodes.RightSide.geometry} material={rightSideMaterial} position={[-1.29, 2.2, -0.84]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} scale={[2.96, 1, 1.2]} />
      <mesh geometry={nodes.RightDoor.geometry} material={rightBackDoorMaterial} position={[-0.6, 2.2, -3.91]} rotation={[-Math.PI / 2, 0, Math.PI]} scale={[0.58, 0, 1.24]} />
      <mesh geometry={nodes.LeftDoor.geometry} material={leftBackDoorMaterial} position={[0.6, 2.2, -3.91]} rotation={[-Math.PI / 2, 0, Math.PI]} scale={[0.58, 0, 1.24]} />
    </group>
  )
}

useGLTF.preload('/3ds/3dtruck.glb')

