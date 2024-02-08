import { useRef, useState} from "react";
import { Kart } from "./models/Racing_kart_concept";
import { PerspectiveCamera } from "@react-three/drei";
import { useGamepad } from "./useGamepad";
import { BallCollider, RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";


export const KartController = () => {
  const kart = useRef();
  const body = useRef();
  const damping = 0.1;

  const { buttonA, RB, LB, joystick } = useGamepad();

  const [currentSpeed, setCurrentSpeed] = useState(0);

  const maxSpeed = 30;
  const accelerationFactor = 5;
  const decceleration = 10;

  const maxSteeringSpeed = 0.02;
  const [currentSteeringSpeed, setCurrentSteeringSpeed] = useState(0);
  const [isOnGround, setIsOnGround] = useState(false);

  const driftDirection = useRef(0);
  const driftForce = useRef(0);
  const driftLeft = useRef(false);
  const driftRight = useRef(false);
  const RBisHeld = useRef(false);
  let steeringAngle = 0;

  useFrame((state, delta) => {
    if (!kart.current || !body.current) return;

    const kartRotation = kart.current.rotation.y + steeringAngle + driftDirection.current * driftForce.current;
    const forwardDirection = new Vector3(
      -Math.sin(kartRotation),
      0,
      -Math.cos(kartRotation)
    );

    if (buttonA && currentSpeed < maxSpeed) {
      setCurrentSpeed(Math.min(currentSpeed + accelerationFactor * delta, maxSpeed));
    } else if (!buttonA && currentSpeed > 0) {
      setCurrentSpeed(Math.max(currentSpeed - decceleration * delta, 0));
    }

    if(buttonA && currentSteeringSpeed < maxSteeringSpeed) {
      setCurrentSteeringSpeed(Math.min(currentSteeringSpeed + 0.01 * delta, maxSteeringSpeed));
    } else if (!buttonA && currentSteeringSpeed > 0) {
      setCurrentSteeringSpeed(Math.max(currentSteeringSpeed - 0.01 * delta, 0));
    }


    if (RB) {
      driftForce.current = 0.4;
      RBisHeld.current = true;
    } else if (RBisHeld.current) {
      driftForce.current = 0;
      RBisHeld.current = false;
      driftLeft.current = false;
      driftRight.current = false;
      driftDirection.current = 0;
    }

    if (RBisHeld.current && joystick[0] > 0 && !driftLeft.current) {
      driftRight.current = true;
    } else if (RBisHeld.current && joystick[0] < 0 && !driftRight.current) {
      driftLeft.current = true;
    } 

    if(!driftLeft.current && !driftRight.current) {
      steeringAngle = joystick[0] * currentSteeringSpeed;
    }
    if (driftLeft.current) {
      driftDirection.current = -1; // Correct direction for left drift
      steeringAngle = -(1 - joystick[0]) * currentSteeringSpeed; // Adjusted calculation
    }
    if (driftRight.current) {
      driftDirection.current = 1;
      steeringAngle = (joystick[0] + 1) * currentSteeringSpeed;
    }

    console.log(steeringAngle)
    kart.current.rotation.y -= steeringAngle * delta * 60; 




    body.current.applyImpulse(
      {
        x: forwardDirection.x * currentSpeed * delta * 60 - body.current.linvel().x * damping,
        y: 0,
        z: forwardDirection.z * currentSpeed * delta * 60 - body.current.linvel().z * damping,
      },
      true
    );

    kart.current.position.set(
      body.current.translation().x,
      body.current.translation().y,
      body.current.translation().z
    );
  });

  return (
    <>
      <RigidBody
        type="Dynamic"
        ref={body}
        position={[0, 2, 0]}
        rotation={[0, 0, 0]}
        colliders={false}
        ccd={true}
        name={"player"}
        onCollisionEnter={
          (event) => {
            setIsOnGround(true);
          }
        }
      >
        <BallCollider args={[0.5]} />
      </RigidBody>
      <group>
          <group ref={kart}>
            <Kart />
            <PerspectiveCamera makeDefault position={[0, 2, 6]} />
          </group>
        </group>
    </>
  );
};
