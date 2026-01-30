"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ShaderBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    camera?: THREE.Camera;
    scene?: THREE.Scene;
    renderer?: THREE.WebGLRenderer;
    clock?: THREE.Clock;
    uniforms?: any;
    animationId?: number;
  }>({});

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const clock = new THREE.Clock();
    
    // Camera setup
    const camera = new THREE.Camera();
    camera.position.z = 1;

    // Scene setup
    const scene = new THREE.Scene();

    // Geometry
    const geometry = new THREE.PlaneGeometry(2, 2);

    // Uniforms
    const uniforms = {
      u_time: { type: "f", value: 1.0 },
      u_resolution: { type: "v2", value: new THREE.Vector2() },
    };

    // Vertex shader
    const vertexShader = `
      varying vec2 vUv;
      void main() { 
        gl_Position = vec4(position, 1.0);
        vUv = uv;
      }
    `;

    // Fragment shader
    const fragmentShader = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      varying vec2 vUv;
      
      const float PI = 3.1415926535897932384626433832795;
      const float TAU = PI * 2.;
      
      void coswarp(inout vec3 trip, float warpsScale ){
        trip.xyz += warpsScale * .1 * cos(3. * trip.yzx + (u_time * .25));
        trip.xyz += warpsScale * .05 * cos(11. * trip.yzx + (u_time * .25));
        trip.xyz += warpsScale * .025 * cos(17. * trip.yzx + (u_time * .25));
      }
      
      void main() {
        vec2 uv = (gl_FragCoord.xy - u_resolution * .5) / u_resolution.yy + 0.5;
        float t = (u_time *.2) + length(fract((uv-.5) *10.));
        float t2 = (u_time *.1) + length(fract((uv-.5) *20.));
        vec2 uv2 = uv;
        
        vec3 w = vec3(uv.x, uv.y, 1.);
        coswarp(w, 3.);
        uv.x+= w.r;
        uv.y+= w.g;
        
        vec3 color = vec3(0., .5, uv2.x);
        color.r = sin(u_time *.2) + sin(length(uv-.5) * 10.);
        color.g = sin(u_time *.3) + sin(length(uv-.5) * 20.);
        coswarp(color, 3.);
        color = vec3(smoothstep(color.r, sin(t2), sin(t)));
        
        gl_FragColor = vec4(vec3(color.r, color.g, color.b), 1.0);
      }
    `;

    // Material
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader
    });

    // Mesh
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Store references
    sceneRef.current = {
      camera,
      scene,
      renderer,
      clock,
      uniforms
    };

    // Resize handler
    const onWindowResize = () => {
      if (!renderer || !uniforms) return;
      
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      renderer.setSize(width, height);
      uniforms.u_resolution.value.x = renderer.domElement.width;
      uniforms.u_resolution.value.y = renderer.domElement.height;
    };

    // Initial resize
    onWindowResize();
    window.addEventListener("resize", onWindowResize);

    // Animation loop
    const animate = () => {
      if (!renderer || !scene || !camera || !uniforms || !clock) return;
      
      uniforms.u_time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      sceneRef.current.animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", onWindowResize);
      
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      
      if (sceneRef.current.renderer) {
        sceneRef.current.renderer.dispose();
        if (container.contains(sceneRef.current.renderer.domElement)) {
          container.removeChild(sceneRef.current.renderer.domElement);
        }
      }
      
      if (sceneRef.current.scene) {
        sceneRef.current.scene.clear();
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ 
        zIndex: 0, // Bring it above background but below content
        opacity: 0.3, // Reduced opacity for better text visibility
        background: 'transparent'
      }}
    />
  );
};

export default ShaderBackground;