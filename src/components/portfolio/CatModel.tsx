// Type-only: erased at compile time, so it adds nothing to the bundle. The
// runtime copy of three arrives through the dynamic import below.

import { useEffect, useRef } from "react";
import type * as THREE from "three";

type Props = {
  className?: string;
};

/**
 * Renders `public/cat.glb` with plain three.js — no react-three-fiber, since a
 * single static model does not need a reconciler. Everything is behind a
 * dynamic import and an IntersectionObserver, so the ~150 KB of three never
 * touches the initial page load and the render loop only runs while visible.
 */
export default function CatModel({ className }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let teardown = () => {};

    const start = async () => {
      const [three, { GLTFLoader }, { MeshoptDecoder }] = await Promise.all([
        import("three"),
        import("three/examples/jsm/loaders/GLTFLoader.js"),
        import("three/examples/jsm/libs/meshopt_decoder.module.js"),
      ]);
      if (disposed || !hostRef.current) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const scene = new three.Scene();
      const camera = new three.PerspectiveCamera(32, 1, 0.01, 100);

      const renderer = new three.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = three.SRGBColorSpace;
      renderer.toneMapping = three.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      host.appendChild(renderer.domElement);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";

      scene.add(new three.HemisphereLight(0xffffff, 0xb0b0b0, 2.4));
      const key = new three.DirectionalLight(0xffffff, 2.6);
      key.position.set(3, 5, 4);
      scene.add(key);
      const rim = new three.DirectionalLight(0xffffff, 1.1);
      rim.position.set(-4, 2, -3);
      scene.add(rim);

      const pivot = new three.Group();
      scene.add(pivot);

      const loader = new GLTFLoader();
      loader.setMeshoptDecoder(MeshoptDecoder);

      const gltf = await loader.loadAsync("/cat.glb").catch(() => null);
      if (disposed || !gltf) return;

      // Recentre on the origin so rotation spins around the model, not a corner.
      const box = new three.Box3().setFromObject(gltf.scene);
      const center = box.getCenter(new three.Vector3());
      const size = box.getSize(new three.Vector3());
      gltf.scene.position.sub(center);
      pivot.add(gltf.scene);

      const extent = Math.max(size.x, size.y, size.z);
      camera.position.set(0, 0, extent * 2.4);
      camera.lookAt(0, 0, 0);

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = host;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(host);

      // Pointer parallax, eased towards the target each frame.
      let targetX = 0;
      let targetY = 0;
      const onPointer = (event: PointerEvent) => {
        targetX = (event.clientX / window.innerWidth - 0.5) * 0.9;
        targetY = (event.clientY / window.innerHeight - 0.5) * 0.5;
      };
      if (!reduced) window.addEventListener("pointermove", onPointer, { passive: true });

      let frame = 0;
      let visible = true;
      let entered = 0;
      const started = performance.now();

      const tick = () => {
        frame = requestAnimationFrame(tick);
        if (!visible) return;

        const t = (performance.now() - started) / 1000;
        entered = Math.min(entered + 0.02, 1);
        const ease = 1 - (1 - entered) ** 3;
        pivot.scale.setScalar(ease);

        if (reduced) {
          pivot.rotation.set(0, 0.5, 0);
        } else {
          // Idle sway plus a gentle lean toward the cursor.
          pivot.rotation.y += (targetX + Math.sin(t * 0.35) * 0.28 - pivot.rotation.y) * 0.05;
          pivot.rotation.x += (targetY * 0.4 - pivot.rotation.x) * 0.05;
          pivot.position.y = Math.sin(t * 0.8) * extent * 0.02;
        }

        renderer.render(scene, camera);
      };
      tick();

      // Idle when off-screen so an unseen canvas never burns a frame budget.
      const io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
        },
        { rootMargin: "120px" },
      );
      io.observe(host);

      teardown = () => {
        cancelAnimationFrame(frame);
        io.disconnect();
        ro.disconnect();
        window.removeEventListener("pointermove", onPointer);
        scene.traverse((obj) => {
          const mesh = obj as THREE.Mesh;
          if (!mesh.isMesh) return;
          mesh.geometry?.dispose();
          const mat = mesh.material;
          for (const m of Array.isArray(mat) ? mat : [mat]) {
            for (const value of Object.values(m)) {
              if (value && (value as THREE.Texture).isTexture) (value as THREE.Texture).dispose();
            }
            m.dispose();
          }
        });
        renderer.dispose();
        renderer.domElement.remove();
      };
    };

    // Wait until it is nearly on screen before pulling three.js down at all.
    const gate = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        gate.disconnect();
        start();
      },
      { rootMargin: "300px" },
    );
    gate.observe(host);

    return () => {
      disposed = true;
      gate.disconnect();
      teardown();
    };
  }, []);

  return <div ref={hostRef} aria-hidden="true" className={className} />;
}
