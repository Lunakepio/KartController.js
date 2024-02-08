import { Environment, OrbitControls } from "@react-three/drei";
import { Kart } from "./models/Racing_kart_concept";
import { KartController } from "./KartController";
import { RigidBody } from "@react-three/rapier";
import { EffectComposer, Bloom, DepthOfField, Noise } from "@react-three/postprocessing";

export const Experience = () => {
  return (
    <>
    <Environment preset="warehouse" background ground/>
    <RigidBody type="fixed" position={[0, 0, 0]} rotation={[0, 0, 0]}>
    <mesh  rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial transparent={true} opacity={0}/>
    </mesh>
    </RigidBody>
    <KartController />

    <EffectComposer>
      <Bloom luminanceThreshold={0} luminanceSmoothing={0.8} height={300} mipmapBlur intensity={0.5} />
      <Noise opacity={0.02} />
      <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={300} />
    </EffectComposer>
    </>
  );
};
