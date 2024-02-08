import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";

function App() {
  return (
    <Canvas shadows>
      <color attach="background" args={["#ececec"]} />
      <Physics>
      <Suspense fallback={null}>
      <Experience />
      </Suspense> 
      </Physics>
    </Canvas>
  );
}

export default App;
