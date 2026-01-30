"use client";

import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { useTheme } from "../../contexts/ThemeContext";

const ShockwaveScene = () => {
  const { currentTheme } = useTheme();
  const isExtrovert = currentTheme === 'extrovert';
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    renderer?: THREE.WebGLRenderer;
    composer?: EffectComposer;
    ripples?: Array<{ center: THREE.Vector2; startTime: number }>;
    ripplePass?: ShaderPass;
    animationId?: number;
    rotatingGroup?: THREE.Group;
    controls?: OrbitControls;
    colorTime?: number;
    particles?: THREE.Points;
    stars?: THREE.Points;
    innerMesh?: THREE.Mesh;
    wireframeMesh?: THREE.Mesh;
  }>({});

  const handleClick = useCallback((event: MouseEvent) => {
    if (!canvasRef.current || !sceneRef.current.ripples) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    const center = new THREE.Vector2((mouseX + 1) / 2, (mouseY + 1) / 2);
    const startTime = performance.now() / 1000;
    
    sceneRef.current.ripples.push({ center, startTime });
    if (sceneRef.current.ripples.length > 5) { // Reduced from 10 to 5 for better performance
      sceneRef.current.ripples.shift();
    }
  }, []);

  const updateRippleUniforms = useCallback(() => {
    if (!sceneRef.current.ripplePass || !sceneRef.current.ripples) return;

    const ripplePass = sceneRef.current.ripplePass;
    const ripples = sceneRef.current.ripples;
    const centers = ripplePass.uniforms.centers.value;
    const times = ripplePass.uniforms.times.value;
    const active = ripplePass.uniforms.rippleActive.value;
    const maxRipples = 5;
    const rippleDuration = 15; // Reduced duration for better performance

    for (let i = 0; i < maxRipples; i++) {
      if (i < ripples.length) {
        centers[i].copy(ripples[i].center);
        times[i] = performance.now() / 1000 - ripples[i].startTime;
        active[i] = times[i] < rippleDuration ? 1.0 : 0.0;
      } else {
        active[i] = 0.0;
      }
    }

    // Clean up old ripples
    sceneRef.current.ripples = ripples.filter(ripple => 
      (performance.now() / 1000 - ripple.startTime) < rippleDuration
    );
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      alpha: true,
      antialias: false,
      powerPreference: "high-performance"
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 50);
    camera.position.z = 5;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = isExtrovert ? 1.2 : 0.3; // Faster rotation for extrovert

    // Dynamic lighting based on theme
    const light = new THREE.PointLight(isExtrovert ? 0xff0080 : 0xffffff, isExtrovert ? 1.5 : 0.8);
    light.position.set(3, 3, 3);
    scene.add(light);

    // Add additional colored lights for extrovert theme
    if (isExtrovert) {
      const light2 = new THREE.PointLight(0x00ff80, 1.0);
      light2.position.set(-3, -3, 3);
      scene.add(light2);
      
      const light3 = new THREE.PointLight(0xffff00, 0.8);
      light3.position.set(0, 3, -3);
      scene.add(light3);
    }

    const rotatingGroup = new THREE.Group();
    scene.add(rotatingGroup);

    // Dynamic stars based on theme
    const starGeometry = new THREE.BufferGeometry();
    const starCount = isExtrovert ? 400 : 200; // More stars for extrovert
    const starsPositions = new Float32Array(starCount * 3);
    const starsColors = new Float32Array(starCount * 3); // Add colors for extrovert
    
    for (let i = 0; i < starCount * 3; i += 3) {
      starsPositions[i] = (Math.random() - 0.5) * 60;
      starsPositions[i + 1] = (Math.random() - 0.5) * 60;
      starsPositions[i + 2] = (Math.random() - 0.5) * 60;
      
      if (isExtrovert) {
        // Random bright colors for extrovert theme
        const colorChoice = Math.random();
        if (colorChoice < 0.33) {
          starsColors[i] = 1.0; starsColors[i + 1] = 0.0; starsColors[i + 2] = 0.5; // Pink
        } else if (colorChoice < 0.66) {
          starsColors[i] = 0.0; starsColors[i + 1] = 1.0; starsColors[i + 2] = 0.5; // Green
        } else {
          starsColors[i] = 1.0; starsColors[i + 1] = 1.0; starsColors[i + 2] = 0.0; // Yellow
        }
      } else {
        starsColors[i] = 1.0; starsColors[i + 1] = 1.0; starsColors[i + 2] = 1.0; // White
      }
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starsColors, 3));
    
    const starMaterial = new THREE.PointsMaterial({
      size: isExtrovert ? 0.15 : 0.08, // Bigger stars for extrovert
      sizeAttenuation: true,
      vertexColors: true, // Enable vertex colors
      transparent: true,
      opacity: isExtrovert ? 0.9 : 0.7
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Dynamic inner mesh based on theme
    const innerGeometry = new THREE.IcosahedronGeometry(isExtrovert ? 1 : 1.5, 2); // Bigger for minimalist
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: isExtrovert ? 0xff0080 : 0x333333,
      roughness: isExtrovert ? 0.3 : 0.6,
      metalness: isExtrovert ? 1.0 : 0.8,
      flatShading: true,
      transparent: true,
      opacity: isExtrovert ? 0.8 : 0.6,
      emissive: isExtrovert ? 0x330020 : 0x000000 // Glowing effect for extrovert
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    rotatingGroup.add(innerMesh);

    // Dynamic wireframe mesh
    const outerGeometry = new THREE.IcosahedronGeometry(isExtrovert ? 1.15 : 1.65, 2); // Bigger for minimalist
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: isExtrovert ? 0x00ff80 : 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: isExtrovert ? 0.4 : 0.15
    });
    const wireframeMesh = new THREE.Mesh(outerGeometry, wireframeMaterial);
    rotatingGroup.add(wireframeMesh);

    // Dynamic particles
    const positions: number[] = [];
    const colors: number[] = [];
    const posAttr = outerGeometry.attributes.position;
    
    for (let i = 0; i < posAttr.count; i += isExtrovert ? 2 : 3) { // More particles for extrovert
      positions.push(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i));
      
      if (isExtrovert) {
        // Random bright colors
        const colorChoice = Math.random();
        if (colorChoice < 0.33) {
          colors.push(1.0, 0.0, 0.5); // Pink
        } else if (colorChoice < 0.66) {
          colors.push(0.0, 1.0, 0.5); // Green
        } else {
          colors.push(1.0, 1.0, 0.0); // Yellow
        }
      } else {
        colors.push(1.0, 1.0, 1.0); // White
      }
    }
    
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      size: isExtrovert ? 0.06 : 0.03,
      vertexColors: true,
      transparent: true,
      opacity: isExtrovert ? 0.9 : 0.7
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    rotatingGroup.add(particles);

    // Enhanced post-processing for extrovert theme
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(canvas.clientWidth, canvas.clientHeight),
      isExtrovert ? 2.5 : 1.2, // Much stronger bloom for extrovert
      isExtrovert ? 0.8 : 0.3, // Larger radius for extrovert
      isExtrovert ? 0.05 : 0.1  // Lower threshold for extrovert (more glow)
    );
    composer.addPass(bloomPass);

    // Enhanced ripple shader with theme-based effects
    const maxRipples = isExtrovert ? 8 : 5; // More ripples for extrovert
    const RippleShader = {
      uniforms: {
        tDiffuse: { value: null },
        centers: { value: Array(maxRipples).fill(null).map(() => new THREE.Vector2(0.5, 0.5)) },
        times: { value: Array(maxRipples).fill(0.0) },
        rippleActive: { value: Array(maxRipples).fill(0.0) },
        maxRadius: { value: isExtrovert ? 1.2 : 0.8 }, // Larger ripples for extrovert
        amplitude: { value: isExtrovert ? 0.05 : 0.025 }, // Stronger ripples for extrovert
        secondaryAmplitude: { value: isExtrovert ? 0.02 : 0.008 },
        speed: { value: isExtrovert ? 0.8 : 0.4 }, // Faster ripples for extrovert
        frequency: { value: isExtrovert ? 12.0 : 8.0 }, // Higher frequency for extrovert
        aspect: { value: canvas.clientWidth / canvas.clientHeight },
        smoothing: { value: 0.9 },
        sigma: { value: 0.5 },
        fadeDuration: { value: isExtrovert ? 6.0 : 4.0 }, // Longer lasting ripples for extrovert
        isExtrovert: { value: isExtrovert ? 1.0 : 0.0 },
        time: { value: 0.0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        #define PI 3.14159265359
        #define MAX_RIPPLES ${maxRipples}
        uniform sampler2D tDiffuse;
        uniform vec2 centers[MAX_RIPPLES];
        uniform float times[MAX_RIPPLES];
        uniform float rippleActive[MAX_RIPPLES];
        uniform float maxRadius;
        uniform float amplitude;
        uniform float secondaryAmplitude;
        uniform float speed;
        uniform float frequency;
        uniform float aspect;
        uniform float smoothing;
        uniform float sigma;
        uniform float fadeDuration;
        uniform float isExtrovert;
        uniform float time;
        varying vec2 vUv;

        vec3 hsv2rgb(vec3 c) {
          vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
          vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
          return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
        }

        void main() {
          vec2 uv = vUv;
          vec2 totalWave = vec2(0.0);
          vec3 colorShift = vec3(0.0);
          
          for (int i = 0; i < MAX_RIPPLES; i++) {
            if (rippleActive[i] > 0.0) {
              vec2 aspectUV = vec2((uv.x - centers[i].x) * aspect, uv.y - centers[i].y);
              float dist = length(aspectUV);
              float t = times[i] * speed;
              
              if (dist < t && dist > 0.0) {
                float normDist = dist / maxRadius;
                float decay = 1.0 / (1.0 + sigma * normDist * normDist);
                float timeFade = smoothstep(fadeDuration, 0.0, times[i]);
                float smoothFactor = smoothstep(1.0 - smoothing, 1.0, normDist);
                
                float primaryWave = amplitude * sin(frequency * (t - dist)) * decay * (1.0 - smoothFactor) * timeFade;
                float secondaryWave = secondaryAmplitude * sin(0.5 * frequency * (t - dist) + PI) * decay * (1.0 - smoothFactor) * timeFade;
                
                if (length(aspectUV) > 0.0) {
                  totalWave += normalize(aspectUV) * (primaryWave + secondaryWave);
                }
                
                // Add color effects for extrovert theme
                if (isExtrovert > 0.5) {
                  float colorIntensity = decay * timeFade * 0.3;
                  float hue = fract(time * 0.1 + float(i) * 0.2 + dist * 2.0);
                  vec3 rippleColor = hsv2rgb(vec3(hue, 0.8, 1.0));
                  colorShift += rippleColor * colorIntensity;
                }
              }
            }
          }
          
          uv += totalWave;
          vec4 texColor = texture2D(tDiffuse, clamp(uv, 0.0, 1.0));
          
          // Apply color shift for extrovert theme
          if (isExtrovert > 0.5) {
            texColor.rgb += colorShift;
            texColor.rgb = mix(texColor.rgb, texColor.rgb * 1.2, 0.3); // Increase saturation
          }
          
          gl_FragColor = texColor;
        }
      `
    };

    const ripplePass = new ShaderPass(RippleShader);
    ripplePass.renderToScreen = true;
    composer.addPass(ripplePass);

    let ripples: Array<{ center: THREE.Vector2; startTime: number }> = [];
    let colorTime = 0;

    // Enhanced animation loop with theme-based effects
    let lastTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      const animationId = requestAnimationFrame(animate);
      sceneRef.current.animationId = animationId;

      if (currentTime - lastTime < frameInterval) {
        return;
      }
      lastTime = currentTime;

      controls.update();
      colorTime += 0.016; // Roughly 60fps timing
      
      // Theme-based rotation speeds
      if (rotatingGroup) {
        if (isExtrovert) {
          // More chaotic, faster rotation for extrovert
          rotatingGroup.rotation.x += 0.005 + Math.sin(colorTime * 0.5) * 0.002;
          rotatingGroup.rotation.y += 0.008 + Math.cos(colorTime * 0.3) * 0.003;
          rotatingGroup.rotation.z += 0.003 + Math.sin(colorTime * 0.7) * 0.001;
        } else {
          // Smooth, slow rotation for minimalist
          rotatingGroup.rotation.x += 0.001;
          rotatingGroup.rotation.y += 0.002;
        }
      }

      // Dynamic color changes for extrovert theme
      if (isExtrovert && sceneRef.current.innerMesh && sceneRef.current.wireframeMesh) {
        const hue1 = (colorTime * 0.1) % 1;
        const hue2 = (colorTime * 0.15 + 0.33) % 1;
        
        // Convert HSV to RGB for inner mesh
        const color1 = new THREE.Color().setHSL(hue1, 0.8, 0.5);
        const color2 = new THREE.Color().setHSL(hue2, 0.9, 0.6);
        
        (sceneRef.current.innerMesh.material as THREE.MeshStandardMaterial).color = color1;
        (sceneRef.current.innerMesh.material as THREE.MeshStandardMaterial).emissive = color1.clone().multiplyScalar(0.2);
        (sceneRef.current.wireframeMesh.material as THREE.MeshBasicMaterial).color = color2;
      }

      // Update ripple shader time uniform for color effects
      if (sceneRef.current.ripplePass) {
        sceneRef.current.ripplePass.uniforms.time.value = colorTime;
      }

      if (ripples.length > 0) {
        updateRippleUniforms();
      }

      composer.render();
    };

    const handleResize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      composer.setSize(width, height);
      bloomPass.setSize(width, height);
      ripplePass.uniforms.aspect.value = width / height;
    };

    // Store references for cleanup
    sceneRef.current = {
      renderer,
      composer,
      ripples,
      ripplePass,
      rotatingGroup,
      controls,
      colorTime,
      particles,
      stars,
      innerMesh,
      wireframeMesh
    };

    // Add event listeners
    canvas.addEventListener('click', handleClick, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Start animation
    animate(0);

    // Cleanup
    return () => {
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      canvas.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      
      // Dispose of Three.js resources
      renderer.dispose();
      composer.dispose();
      innerGeometry.dispose();
      outerGeometry.dispose();
      starGeometry.dispose();
      particleGeometry.dispose();
      innerMaterial.dispose();
      wireframeMaterial.dispose();
      starMaterial.dispose();
      particleMaterial.dispose();
    };
  }, [handleClick, updateRippleUniforms, isExtrovert]); // Add isExtrovert to dependencies

  return (
    <div className="w-full h-full relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-pointer"
        style={{ background: 'transparent' }}
      />
      <div className="absolute bottom-2 right-2 text-xs text-muted-foreground opacity-30 pointer-events-none">
        Click for ripples
      </div>
    </div>
  );
};

export default ShockwaveScene;