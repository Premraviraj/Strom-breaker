"use client";

import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const RoomScene = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer?: THREE.WebGLRenderer;
    animationId?: number;
    controls?: OrbitControls;
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
  }>({});

  useEffect(() => {
    if (!canvasRef.current || !loaderRef.current) return;

    const canvas = canvasRef.current;
    const loading = loaderRef.current;
    
    // Scene setup
    const scene = new THREE.Scene();
    const textureLoader = new THREE.TextureLoader();
    
    const sizes = {
      width: canvas.clientWidth,
      height: canvas.clientHeight
    };

    // Camera setup
    const camera = new THREE.PerspectiveCamera(15, sizes.width / sizes.height, 0.1, 100); // Increased FOV from 10 to 15
    camera.position.x = 6; // Moved camera closer
    camera.position.y = 3; // Lowered camera slightly
    camera.position.z = 12; // Moved camera closer
    scene.add(camera);

    // Controls setup
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.minDistance = 18; // Reduced from 21 to allow closer view
    controls.maxDistance = 45; // Reduced from 50 to keep room in frame
    controls.minPolarAngle = Math.PI / 6; // Slightly more restrictive
    controls.maxPolarAngle = Math.PI / 2.2; // Slightly more restrictive
    controls.maxAzimuthAngle = Math.PI * 0.8; // Limit horizontal rotation
    controls.minAzimuthAngle = -Math.PI * 0.8; // Limit horizontal rotation

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace; // Updated from outputEncoding

    // Materials
    const bakedTexture = textureLoader.load(
      'https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room13/47b05e2db4e49eec33d63729e920894a906cb693/static/baked.jpg'
    );
    bakedTexture.flipY = false;
    bakedTexture.colorSpace = THREE.SRGBColorSpace; // Updated from encoding
    
    const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture });

    // GLTF Loader
    const loader = new GLTFLoader();
    loader.load(
      'https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room13/47b05e2db4e49eec33d63729e920894a906cb693/static/model.glb',
      (gltf) => {
        const model = gltf.scene;
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = bakedMaterial;
          }
        });
        scene.add(model);
        scene.position.set(0, 0.1, 0); // Slightly adjusted position
        
        // Set initial camera target to center of room
        controls.target.set(0, 0, 0);
        controls.update();
        
        loading.style.display = 'none';
      },
      (xhr) => {
        if (xhr.lengthComputable) {
          const percentComplete = (xhr.loaded / xhr.total) * 100;
          console.log(percentComplete + '% loaded');
        }
      },
      (error) => {
        console.error('Error loading model:', error);
        loading.style.display = 'none';
      }
    );

    // Resize handler
    const handleResize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    // Animation loop
    const minPan = new THREE.Vector3(-1.5, -0.3, -1.5); // Reduced pan limits
    const maxPan = new THREE.Vector3(1.5, 0.3, 1.5); // Reduced pan limits

    const tick = () => {
      const animationId = requestAnimationFrame(tick);
      sceneRef.current.animationId = animationId;

      controls.update();
      controls.target.clamp(minPan, maxPan);
      renderer.render(scene, camera);
    };

    // Store references
    sceneRef.current = {
      renderer,
      controls,
      scene,
      camera
    };

    // Add event listeners
    window.addEventListener('resize', handleResize);

    // Start animation
    tick();

    // Cleanup
    return () => {
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      window.removeEventListener('resize', handleResize);
      
      // Dispose of Three.js resources
      renderer.dispose();
      bakedTexture.dispose();
      bakedMaterial.dispose();
      
      // Dispose geometries and materials from the loaded model
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach(material => material.dispose());
            } else {
              child.material.dispose();
            }
          }
        }
      });
    };
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{ 
          background: 'transparent',
          touchAction: 'none' // Prevent scrolling on touch devices
        }}
      />
      <div 
        ref={loaderRef}
        className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-400 via-yellow-300 to-green-400 z-10"
        style={{ display: 'grid', placeContent: 'center' }}
      >
        <div className="text-center">
          <h1 className="text-2xl sm:text-4xl font-black uppercase text-black mb-4 animate-pulse">
            Loading Room...
          </h1>
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-black font-bold mt-4 text-sm sm:text-base">
            Preparing your extrovert experience!
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoomScene;