import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type CoreProps = { hue?: number; density?: number };

function toColor(hue: number, sat = 0.35, light = 0.72) {
  return new THREE.Color().setHSL(hue / 360, sat, light);
}

/** Slow, purposeful pointer easing shared by every layer of the core. */
function usePointerTarget() {
  const target = useRef(new THREE.Vector2(0, 0));
  const { size } = useThree();
  useFrame((state) => {
    const p = state.pointer;
    target.current.lerp(new THREE.Vector2(p.x, p.y), 0.045);
    void size;
  });
  return target;
}

function Shell({ hue = 205 }: { hue?: number }) {
  const outer = useRef<THREE.LineSegments>(null);
  const inner = useRef<THREE.Mesh>(null);
  const pointer = usePointerTarget();

  const geometry = useMemo(() => {
    const base = new THREE.IcosahedronGeometry(1.62, 3);
    return new THREE.WireframeGeometry(base);
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (outer.current) {
      outer.current.rotation.y += delta * 0.05;
      outer.current.rotation.x = THREE.MathUtils.lerp(
        outer.current.rotation.x,
        pointer.current.y * 0.35,
        0.04,
      );
      outer.current.rotation.z = THREE.MathUtils.lerp(
        outer.current.rotation.z,
        pointer.current.x * -0.25,
        0.04,
      );
    }
    if (inner.current) {
      const s = 1 + Math.sin(t * 0.55) * 0.035;
      inner.current.scale.setScalar(s);
      inner.current.rotation.y -= delta * 0.08;
    }
  });

  return (
    <group>
      <lineSegments ref={outer} geometry={geometry}>
        <lineBasicMaterial
          color={toColor(hue, 0.4, 0.78)}
          transparent
          opacity={0.22}
          depthWrite={false}
        />
      </lineSegments>
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.05, 6]} />
        <meshPhysicalMaterial
          color={toColor(hue, 0.25, 0.55)}
          roughness={0.12}
          metalness={0.1}
          transmission={0.92}
          thickness={1.6}
          ior={1.35}
          clearcoat={1}
          clearcoatRoughness={0.15}
          transparent
          opacity={0.95}
        />
      </mesh>
      <mesh scale={0.42}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial color={toColor(hue, 0.6, 0.85)} transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

function Constellation({ hue = 205, density = 1 }: CoreProps) {
  const points = useRef<THREE.Points>(null);
  const pointer = usePointerTarget();
  const count = Math.round(1400 * density);

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 2.1 + Math.pow(Math.random(), 1.6) * 2.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi) * 0.55;
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      seeds[i] = Math.random();
    }
    return { positions, seeds };
  }, [count]);

  useFrame((state, delta) => {
    const p = points.current;
    if (!p) return;
    p.rotation.y += delta * 0.028;
    p.rotation.x = THREE.MathUtils.lerp(p.rotation.x, pointer.current.y * 0.2, 0.03);
    const attr = p.geometry.getAttribute("position") as THREE.BufferAttribute;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i += 1) {
      const y0 = positions[i * 3 + 1]!;
      attr.setY(i, y0 + Math.sin(t * 0.5 + seeds[i]! * 12) * 0.09);
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        sizeAttenuation
        color={toColor(hue, 0.3, 0.9)}
        transparent
        opacity={0.65}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Orbits({ hue = 205 }: { hue?: number }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.06;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.16;
  });
  const rings = [2.35, 2.95, 3.55];
  return (
    <group ref={group}>
      {rings.map((r, i) => (
        <mesh key={r} rotation={[Math.PI / 2 + i * 0.42, i * 0.6, 0]}>
          <torusGeometry args={[r, 0.0035, 8, 220]} />
          <meshBasicMaterial
            color={toColor(hue, 0.35, 0.85)}
            transparent
            opacity={0.3 - i * 0.06}
          />
        </mesh>
      ))}
    </group>
  );
}

function Rig() {
  const { camera } = useThree();
  const pointer = usePointerTarget();
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.current.x * 0.9, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.3 + pointer.current.y * 0.6, 0.03);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function IntelligenceCore({
  hue = 205,
  density = 1,
  compact = false,
}: CoreProps & { compact?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.3, compact ? 7.4 : 6.2], fov: 42 }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 4]} intensity={1.4} color={toColor(hue, 0.3, 0.9)} />
      <directionalLight position={[-5, -3, -2]} intensity={0.7} color={toColor(hue + 60, 0.4, 0.7)} />
      <Shell hue={hue} />
      <Orbits hue={hue} />
      <Constellation hue={hue} density={density} />
      <Rig />
    </Canvas>
  );
}
