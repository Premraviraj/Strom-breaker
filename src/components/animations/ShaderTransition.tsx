"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";

interface ShaderTransitionProps {
  isVisible: boolean;
  onComplete: () => void;
}

const ShaderTransition = ({ isVisible, onComplete }: ShaderTransitionProps) => {
  const { currentTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);

  useEffect(() => {
    if (isVisible && containerRef.current) {
      // Dynamically import Three.js and GSAP
      Promise.all([
        import('three'),
        import('gsap')
      ]).then(([THREE, { gsap }]) => {
        const isMinimalist = currentTheme === 'minimalist';

        // Shader code
        const vertexShader = `
          varying vec2 vUv;
          varying vec3 v_color;
          varying vec3 v_normal;
          uniform float u_time;
          uniform float u_progress;

          vec3 hsv2rgb(vec3 c){
            vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
            vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
            return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
          }

          vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
          vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

          float snoise(vec3 v) {
            const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
            const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
            vec3 i = floor(v + dot(v, C.yyy));
            vec3 x0 = v - i + dot(i, C.xxx);
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min(g.xyz, l.zxy);
            vec3 i2 = max(g.xyz, l.zxy);
            vec3 x1 = x0 - i1 + 1.0 * C.xxx;
            vec3 x2 = x0 - i2 + 2.0 * C.xxx;
            vec3 x3 = x0 - 1. + 3.0 * C.xxx;
            i = mod(i, 289.0);
            vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));
            float n_ = 1.0 / 7.0;
            vec3 ns = n_ * D.wyz - D.xzx;
            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_);
            vec4 x = x_ * ns.x + ns.yyyy;
            vec4 y = y_ * ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);
            vec4 b0 = vec4(x.xy, y.xy);
            vec4 b1 = vec4(x.zw, y.zw);
            vec4 s0 = floor(b0) * 2.0 + 1.0;
            vec4 s1 = floor(b1) * 2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));
            vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
            vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
            vec3 p0 = vec3(a0.xy, h.x);
            vec3 p1 = vec3(a0.zw, h.y);
            vec3 p2 = vec3(a1.xy, h.z);
            vec3 p3 = vec3(a1.zw, h.w);
            vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
            p0 *= norm.x;
            p1 *= norm.y;
            p2 *= norm.z;
            p3 *= norm.w;
            vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
            m = m * m;
            return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
          }

          void main() {
            vUv = uv;
            float noise = snoise(position * u_progress + u_time / 10.0);
            vec3 newPos = position * (noise + 0.7);
            ${isMinimalist 
              ? 'v_color = vec3(0.9, 0.9, 0.9);' // White/gray for minimalist
              : 'v_color = hsv2rgb(vec3(noise * 0.3 + 0.1, 0.8, 0.9));' // Colorful for extrovert
            }
            v_normal = normal;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
          }
        `;

        const fragmentShader = `
          varying vec2 vUv;
          varying vec3 v_color;
          varying vec3 v_normal;

          void main() {
            vec3 light = vec3(0.0);
            ${isMinimalist 
              ? `
                vec3 skyColor = vec3(1.0, 1.0, 1.0);
                vec3 groundColor = vec3(0.7, 0.7, 0.7);
              `
              : `
                vec3 skyColor = vec3(1.0, 0.5, 0.8);
                vec3 groundColor = vec3(0.2, 0.8, 1.0);
              `
            }
            vec3 lightDirection = normalize(vec3(0.0, -1.0, -1.0));
            light += dot(lightDirection, v_normal);
            light = mix(skyColor, groundColor, dot(lightDirection, v_normal));
            gl_FragColor = vec4(light * v_color, 1.0);
          }
        `;

        const particleVertexShader = `
          uniform float u_time;
          void main() {
            vec3 p = position;
            p.y += 0.25*(sin(p.y * 5.0 + u_time) * 0.5 + 0.5);
            p.z += 0.05*(sin(p.y * 10.0 + u_time) * 0.5 + 0.5);
            vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
            gl_PointSize = 8.0 * (1.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `;

        const particleFragmentShader = `
          uniform float u_progress;
          void main() {
            ${isMinimalist 
              ? 'gl_FragColor = vec4(0.6, 0.6, 0.6, u_progress);'
              : 'gl_FragColor = vec4(1.0, 0.6, 0.8, u_progress);'
            }
          }
        `;

        const backgroundVertexShader = `
          varying vec2 vUv;
          uniform float u_time;
          void main() {
            vec3 p = position;
            vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
            gl_PointSize = 10.0 * (1.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
            vUv = uv;
          }
        `;

        const backgroundFragmentShader = `
          float hash(vec2 p) { 
            return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); 
          }
          
          varying vec2 vUv;
          uniform float u_progress;
          uniform float u_time;
          
          void main() {
            float val = hash(vUv + u_time);
            ${isMinimalist 
              ? 'vec3 color = vec3(0.05, 0.05, 0.05);'
              : 'vec3 color = vec3(0.1, 0.05, 0.15);'
            }
            gl_FragColor = vec4(color + vec3(val / 30.), 1.0);
          }
        `;

        class THREEScene {
          container: HTMLElement;
          scene: any;
          renderer: any;
          camera: any;
          material: any;
          pointsMaterial: any;
          backgroundMaterial: any;
          geometry: any;
          particleGeometry: any;
          particles: any;
          points: any;
          clock: any;
          animationId: number | null = null;

          constructor(container: HTMLElement) {
            this.container = container;
            this.init();
          }

          init() {
            this.setup();
            this.setupCamera();
            this.addToScene();
            this.createParticles();
            this.createBackground();
            this.render();
            this.animate();
          }

          setup() {
            this.scene = new THREE.Scene();
            this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            this.renderer.setSize(this.viewport.width, this.viewport.height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            this.container.appendChild(this.renderer.domElement);

            this.material = new THREE.ShaderMaterial({
              vertexShader,
              fragmentShader,
              wireframe: false,
              uniforms: {
                u_time: { value: 0 },
                u_progress: { value: 0 }
              }
            });

            this.pointsMaterial = new THREE.ShaderMaterial({
              vertexShader: particleVertexShader,
              fragmentShader: particleFragmentShader,
              wireframe: false,
              side: THREE.DoubleSide,
              transparent: true,
              uniforms: {
                u_time: { value: 0 },
                u_progress: { value: 0 }
              }
            });

            this.clock = new THREE.Clock();
          }

          setupCamera() {
            const fov = 40;
            const near = 0.1;
            const far = 10000;
            const aspectRatio = this.viewport.aspectRatio;
            this.camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);
            this.camera.position.set(0, 0, 10);
          }

          addToScene() {
            this.geometry = new THREE.SphereGeometry(1, 64, 64);
            const sphere = new THREE.Mesh(this.geometry, this.material);
            this.scene.add(sphere);
          }

          createParticles() {
            const N = 15000; // Reduced for performance
            const position = new Float32Array(N * 3);
            this.particleGeometry = new THREE.BufferGeometry();
            let inc = Math.PI * (3 - Math.sqrt(5));
            let offset = 2 / N;
            let radius = 2;

            for (let i = 0; i < N; i++) {
              let y = i * offset - 1 + offset / 2;
              let r = Math.sqrt(1 - y * y);
              let phi = i * inc;
              position[3 * i] = radius * Math.cos(phi) * r;
              position[3 * i + 1] = radius * y;
              position[3 * i + 2] = radius * Math.sin(phi) * r;
            }

            this.particleGeometry.setAttribute("position", new THREE.BufferAttribute(position, 3));
            this.points = new THREE.Points(this.particleGeometry, this.pointsMaterial);
            this.scene.add(this.points);
          }

          createBackground() {
            const geometry = new THREE.PlaneGeometry(50, 15, 16);
            this.backgroundMaterial = new THREE.ShaderMaterial({
              vertexShader: backgroundVertexShader,
              fragmentShader: backgroundFragmentShader,
              wireframe: false,
              uniforms: {
                u_time: { value: 0 },
                u_progress: { value: 0 }
              }
            });
            const mesh = new THREE.Mesh(geometry, this.backgroundMaterial);
            mesh.position.z = -2;
            this.scene.add(mesh);
          }

          render() {
            if (!this.renderer || !this.scene || !this.camera) return;
            
            this.camera.lookAt(this.scene.position);
            this.renderer.render(this.scene, this.camera);
            
            const time = this.clock.getElapsedTime();
            this.material.uniforms.u_time.value = time;
            this.pointsMaterial.uniforms.u_time.value = time;
            this.backgroundMaterial.uniforms.u_time.value = time;
            
            if (this.points) {
              this.points.rotation.y += 0.005;
            }
            
            this.animationId = requestAnimationFrame(() => this.render());
          }

          animate() {
            gsap.timeline({
              repeat: -1,
              yoyo: true
            })
            .to(this.material.uniforms.u_progress, {
              value: 3,
              duration: 3,
              ease: "power2.inOut"
            })
            .to(this.material.uniforms.u_progress, {
              value: 1,
              duration: 3,
              ease: "power2.inOut"
            });

            gsap.to(this.pointsMaterial.uniforms.u_progress, {
              value: 0.6,
              duration: 3,
              ease: "power2.inOut"
            });
          }

          destroy() {
            if (this.animationId) {
              cancelAnimationFrame(this.animationId);
            }
            if (this.renderer) {
              this.renderer.dispose();
              if (this.container && this.renderer.domElement) {
                this.container.removeChild(this.renderer.domElement);
              }
            }
            if (this.geometry) this.geometry.dispose();
            if (this.particleGeometry) this.particleGeometry.dispose();
            if (this.material) this.material.dispose();
            if (this.pointsMaterial) this.pointsMaterial.dispose();
            if (this.backgroundMaterial) this.backgroundMaterial.dispose();
          }

          get viewport() {
            const width = this.container.clientWidth;
            const height = this.container.clientHeight;
            const aspectRatio = width / height;
            return { width, height, aspectRatio };
          }
        }

        // Create the scene
        if (containerRef.current) {
          sceneRef.current = new THREEScene(containerRef.current);
        }

        // Complete after 4 seconds
        setTimeout(() => {
          onComplete();
        }, 4000);
      }).catch(console.error);
    }

    return () => {
      if (sceneRef.current) {
        sceneRef.current.destroy();
        sceneRef.current = null;
      }
    };
  }, [isVisible, currentTheme, onComplete]);

  const isMinimalist = currentTheme === 'minimalist';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{
            background: isMinimalist 
              ? 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
              : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)'
          }}
        >
          {/* 3D Scene Container */}
          <div 
            ref={containerRef}
            className="absolute inset-0 w-full h-full"
            style={{ 
              background: 'transparent',
              pointerEvents: 'none'
            }}
          />

          {/* Overlay Content */}
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h1 
                className={`text-4xl mb-4 ${
                  isMinimalist ? 'font-light' : 'font-bold'
                }`}
                style={{ 
                  color: isMinimalist ? '#1e293b' : '#ffffff',
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: isMinimalist ? '0.05em' : '-0.01em'
                }}
              >
                {isMinimalist ? 'Minimalist Experience' : 'Extrovert Experience'}
              </h1>
              <p 
                className="text-lg opacity-80"
                style={{ 
                  color: isMinimalist ? '#64748b' : 'rgba(255,255,255,0.9)',
                  fontFamily: 'Space Grotesk, monospace'
                }}
              >
                {isMinimalist ? 'Clean • Focused • Elegant' : 'Bold • Vibrant • Dynamic'}
              </p>
            </motion.div>
          </div>

          {/* Loading Indicator */}
          <motion.div
            className="absolute bottom-16 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center space-x-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: isMinimalist ? '#94a3b8' : 'rgba(255,255,255,0.8)'
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShaderTransition;