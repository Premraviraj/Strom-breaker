"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface LionAnimationProps {
  className?: string;
}

const LionAnimation = ({ className = "" }: LionAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    renderer?: THREE.WebGLRenderer;
    lion?: any;
    fan?: any;
    animationId?: number;
    clock?: THREE.Clock;
    mousePos?: { x: number; y: number };
    isBlowing?: boolean;
    windowHalfX?: number;
    windowHalfY?: number;
  }>({});

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = sceneRef.current;

    // Initialize Three.js scene
    const initScene = () => {
      // Scene setup
      scene.scene = new THREE.Scene();
      const HEIGHT = container.clientHeight;
      const WIDTH = container.clientWidth;
      const aspectRatio = WIDTH / HEIGHT;
      const fieldOfView = 60;
      const nearPlane = 1;
      const farPlane = 2000;

      scene.camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
      scene.camera.position.z = 800;
      scene.camera.position.y = 0;
      scene.camera.lookAt(new THREE.Vector3(0, 0, 0));

      scene.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      scene.renderer.setPixelRatio(window.devicePixelRatio);
      scene.renderer.setSize(WIDTH, HEIGHT);
      scene.renderer.shadowMap.enabled = true;
      scene.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      container.appendChild(scene.renderer.domElement);

      scene.windowHalfX = WIDTH / 2;
      scene.windowHalfY = HEIGHT / 2;
      scene.mousePos = { x: 0, y: 0 };
      scene.isBlowing = false;
      scene.clock = new THREE.Clock();

      // Create lights
      createLights();
      // Create floor
      createFloor();
      // Create lion
      createLion();
      // Create fan
      createFan();

      // Start animation loop
      animate();
    };

    const createLights = () => {
      if (!scene.scene) return;

      const light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);
      const shadowLight = new THREE.DirectionalLight(0xffffff, 0.8);
      shadowLight.position.set(200, 200, 200);
      shadowLight.castShadow = true;
      shadowLight.shadow.mapSize.width = 2048;
      shadowLight.shadow.mapSize.height = 2048;

      const backLight = new THREE.DirectionalLight(0xffffff, 0.4);
      backLight.position.set(-100, 200, 50);
      backLight.castShadow = true;

      scene.scene.add(backLight);
      scene.scene.add(light);
      scene.scene.add(shadowLight);
    };

    const createFloor = () => {
      if (!scene.scene) return;

      const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(1000, 500),
        new THREE.MeshBasicMaterial({ color: 0xebe5e7 })
      );
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -100;
      floor.receiveShadow = true;
      scene.scene.add(floor);
    };

    // Lion class implementation
    class Lion {
      windTime: number = 0;
      bodyInitPositions: any[] = [];
      maneParts: any[] = [];
      threegroup: THREE.Group;
      yellowMat: THREE.MeshLambertMaterial;
      redMat: THREE.MeshLambertMaterial;
      pinkMat: THREE.MeshLambertMaterial;
      whiteMat: THREE.MeshLambertMaterial;
      purpleMat: THREE.MeshLambertMaterial;
      greyMat: THREE.MeshLambertMaterial;
      blackMat: THREE.MeshLambertMaterial;
      body!: THREE.Mesh;
      head!: THREE.Group;
      mane!: THREE.Group;
      leftEye!: THREE.Mesh;
      rightEye!: THREE.Mesh;
      leftIris!: THREE.Mesh;
      rightIris!: THREE.Mesh;
      leftKnee!: THREE.Mesh;
      rightKnee!: THREE.Mesh;
      mustaches: THREE.Mesh[] = [];
      bodyVertices: number[] = [];
      leftEar!: THREE.Mesh;
      rightEar!: THREE.Mesh;
      mouth!: THREE.Mesh;
      smile!: THREE.Mesh;
      lips!: THREE.Mesh;
      tHeagRotY: number = 0;
      tHeadRotX: number = 0;
      tHeadPosX: number = 0;
      tHeadPosY: number = 0;
      tHeadPosZ: number = 0;
      tEyeScale: number = 1;
      tIrisYScale: number = 1;
      tIrisZScale: number = 1;
      tIrisPosY: number = 0;
      tLeftIrisPosZ: number = 0;
      tRightIrisPosZ: number = 0;
      tRightKneeRotZ: number = 0;
      tLeftKneeRotZ: number = 0;
      tLipsPosX: number = 0;
      tLipsPosY: number = 0;
      tSmilePosX: number = 0;
      tMouthPosZ: number = 0;
      tSmilePosZ: number = 0;
      tSmilePosY: number = 0;
      tSmileRotZ: number = 0;

      constructor() {
        this.threegroup = new THREE.Group();
        
        // Materials
        this.yellowMat = new THREE.MeshLambertMaterial({ color: 0xfdd276 });
        this.redMat = new THREE.MeshLambertMaterial({ color: 0xad3525 });
        this.pinkMat = new THREE.MeshLambertMaterial({ color: 0xe55d2b });
        this.whiteMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
        this.purpleMat = new THREE.MeshLambertMaterial({ color: 0x451954 });
        this.greyMat = new THREE.MeshLambertMaterial({ color: 0x653f4c });
        this.blackMat = new THREE.MeshLambertMaterial({ color: 0x302925 });

        this.createBody();
        this.createHead();
        this.setupShadows();
      }

      createBody() {
        const bodyGeom = new THREE.CylinderGeometry(30, 80, 140, 4);
        const kneeGeom = new THREE.BoxGeometry(25, 80, 80);
        kneeGeom.translate(0, 50, 0);
        const footGeom = new THREE.BoxGeometry(40, 20, 20);

        // Body
        this.body = new THREE.Mesh(bodyGeom, this.yellowMat);
        this.body.position.z = -60;
        this.body.position.y = -30;

        // Store body vertices for animation
        this.bodyVertices = [0, 1, 2, 3, 4, 10];
        for (let i = 0; i < this.bodyVertices.length; i++) {
          const tv = this.body.geometry.attributes.position.array;
          this.bodyInitPositions.push({ x: 0, y: 0, z: 70 });
        }

        // Knees
        this.leftKnee = new THREE.Mesh(kneeGeom, this.yellowMat);
        this.leftKnee.position.set(65, -110, -20);
        this.leftKnee.rotation.z = -0.3;

        this.rightKnee = new THREE.Mesh(kneeGeom, this.yellowMat);
        this.rightKnee.position.set(-65, -110, -20);
        this.rightKnee.rotation.z = 0.3;

        // Feet
        const backLeftFoot = new THREE.Mesh(footGeom, this.yellowMat);
        backLeftFoot.position.set(75, -90, 30);
        const backRightFoot = new THREE.Mesh(footGeom, this.yellowMat);
        backRightFoot.position.set(-75, -90, 30);
        const frontRightFoot = new THREE.Mesh(footGeom, this.yellowMat);
        frontRightFoot.position.set(-22, -90, 40);
        const frontLeftFoot = new THREE.Mesh(footGeom, this.yellowMat);
        frontLeftFoot.position.set(22, -90, 40);

        this.threegroup.add(this.body);
        this.threegroup.add(this.leftKnee);
        this.threegroup.add(this.rightKnee);
        this.threegroup.add(backLeftFoot);
        this.threegroup.add(backRightFoot);
        this.threegroup.add(frontRightFoot);
        this.threegroup.add(frontLeftFoot);
      }

      createHead() {
        const faceGeom = new THREE.BoxGeometry(80, 80, 80);
        const maneGeom = new THREE.BoxGeometry(40, 40, 15);
        const earGeom = new THREE.BoxGeometry(20, 20, 20);
        const eyeGeom = new THREE.BoxGeometry(5, 30, 30);
        const irisGeom = new THREE.BoxGeometry(4, 10, 10);
        const noseGeom = new THREE.BoxGeometry(40, 40, 20);
        const mouthGeom = new THREE.BoxGeometry(20, 20, 10);
        const smileGeom = new THREE.TorusGeometry(12, 4, 2, 10, Math.PI);
        const lipsGeom = new THREE.BoxGeometry(40, 15, 20);
        const mustacheGeom = new THREE.BoxGeometry(30, 2, 1);
        mustacheGeom.translate(15, 0, 0);

        // Face
        const face = new THREE.Mesh(faceGeom, this.yellowMat);
        face.position.z = 135;

        // Mane
        this.mane = new THREE.Group();
        for (let j = 0; j < 4; j++) {
          for (let k = 0; k < 4; k++) {
            const manePart = new THREE.Mesh(maneGeom, this.redMat);
            manePart.position.x = (j * 40) - 60;
            manePart.position.y = (k * 40) - 60;
            
            let amp, zOffset;
            const periodOffset = Math.random() * Math.PI * 2;
            
            if ((j === 0 && k === 0) || (j === 0 && k === 3) || (j === 3 && k === 0) || (j === 3 && k === 3)) {
              amp = -10 - Math.floor(Math.random() * 5);
              zOffset = -5;
            } else if (j === 0 || k === 0 || j === 3 || k === 3) {
              amp = -5 - Math.floor(Math.random() * 5);
              zOffset = 0;
            } else {
              amp = 0;
              zOffset = 0;
            }

            this.maneParts.push({
              mesh: manePart,
              amp: amp,
              zOffset: zOffset,
              periodOffset: periodOffset,
              xInit: manePart.position.x,
              yInit: manePart.position.y
            });
            this.mane.add(manePart);
          }
        }
        this.mane.position.y = -10;
        this.mane.position.z = 80;

        // Eyes
        this.leftEye = new THREE.Mesh(eyeGeom, this.whiteMat);
        this.leftEye.position.set(40, 25, 120);
        this.rightEye = new THREE.Mesh(eyeGeom, this.whiteMat);
        this.rightEye.position.set(-40, 25, 120);

        // Iris
        this.leftIris = new THREE.Mesh(irisGeom, this.purpleMat);
        this.leftIris.position.set(42, 25, 120);
        this.rightIris = new THREE.Mesh(irisGeom, this.purpleMat);
        this.rightIris.position.set(-42, 25, 120);

        // Ears
        this.leftEar = new THREE.Mesh(earGeom, this.yellowMat);
        this.leftEar.position.set(50, 50, 105);
        this.rightEar = new THREE.Mesh(earGeom, this.yellowMat);
        this.rightEar.position.set(-50, 50, 105);

        // Nose
        const nose = new THREE.Mesh(noseGeom, this.greyMat);
        nose.position.set(0, 25, 170);

        // Mouth
        this.mouth = new THREE.Mesh(mouthGeom, this.blackMat);
        this.mouth.position.set(0, -30, 171);
        this.mouth.scale.set(0.5, 0.5, 1);

        // Smile
        this.smile = new THREE.Mesh(smileGeom, this.greyMat);
        this.smile.position.set(0, -15, 173);
        this.smile.rotation.z = -Math.PI;

        // Lips
        this.lips = new THREE.Mesh(lipsGeom, this.yellowMat);
        this.lips.position.set(0, -45, 165);

        // Mustaches
        for (let i = 0; i < 6; i++) {
          const mustache = new THREE.Mesh(mustacheGeom, i < 3 ? this.greyMat : this.blackMat);
          const side = i < 3 ? 1 : -1;
          const yOffset = (i % 3) * -7 - 5;
          const xOffset = i === 1 || i === 4 ? 5 : 0;
          
          mustache.position.set(side * (30 + xOffset), yOffset, 175);
          if (side === -1) mustache.rotation.z = Math.PI;
          
          this.mustaches.push(mustache);
        }

        // Head group
        this.head = new THREE.Group();
        this.head.add(face);
        this.head.add(this.mane);
        this.head.add(this.leftEar);
        this.head.add(this.rightEar);
        this.head.add(nose);
        this.head.add(this.leftEye);
        this.head.add(this.rightEye);
        this.head.add(this.leftIris);
        this.head.add(this.rightIris);
        this.head.add(this.mouth);
        this.head.add(this.smile);
        this.head.add(this.lips);
        this.mustaches.forEach(m => this.head.add(m));

        this.head.position.y = 60;
        this.threegroup.add(this.head);
      }

      setupShadows() {
        this.threegroup.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.castShadow = true;
            object.receiveShadow = true;
          }
        });
      }

      updateBody(speed: number) {
        this.head.rotation.y += (this.tHeagRotY - this.head.rotation.y) / speed;
        this.head.rotation.x += (this.tHeadRotX - this.head.rotation.x) / speed;
        this.head.position.x += (this.tHeadPosX - this.head.position.x) / speed;
        this.head.position.y += (this.tHeadPosY - this.head.position.y) / speed;
        this.head.position.z += (this.tHeadPosZ - this.head.position.z) / speed;

        this.leftEye.scale.y += (this.tEyeScale - this.leftEye.scale.y) / (speed * 2);
        this.rightEye.scale.y = this.leftEye.scale.y;

        this.leftIris.scale.y += (this.tIrisYScale - this.leftIris.scale.y) / (speed * 2);
        this.rightIris.scale.y = this.leftIris.scale.y;
        this.leftIris.scale.z += (this.tIrisZScale - this.leftIris.scale.z) / (speed * 2);
        this.rightIris.scale.z = this.leftIris.scale.z;

        this.leftIris.position.y += (this.tIrisPosY - this.leftIris.position.y) / speed;
        this.rightIris.position.y = this.leftIris.position.y;
        this.leftIris.position.z += (this.tLeftIrisPosZ - this.leftIris.position.z) / speed;
        this.rightIris.position.z += (this.tRightIrisPosZ - this.rightIris.position.z) / speed;

        this.rightKnee.rotation.z += (this.tRightKneeRotZ - this.rightKnee.rotation.z) / speed;
        this.leftKnee.rotation.z += (this.tLeftKneeRotZ - this.leftKnee.rotation.z) / speed;

        this.lips.position.x += (this.tLipsPosX - this.lips.position.x) / speed;
        this.lips.position.y += (this.tLipsPosY - this.lips.position.y) / speed;
        this.smile.position.x += (this.tSmilePosX - this.smile.position.x) / speed;
        this.mouth.position.z += (this.tMouthPosZ - this.mouth.position.z) / speed;
        this.smile.position.z += (this.tSmilePosZ - this.smile.position.z) / speed;
        this.smile.position.y += (this.tSmilePosY - this.smile.position.y) / speed;
        this.smile.rotation.z += (this.tSmileRotZ - this.smile.rotation.z) / speed;
      }

      look(xTarget: number, yTarget: number) {
        const rule3 = (v: number, vmin: number, vmax: number, tmin: number, tmax: number) => {
          const nv = Math.max(Math.min(v, vmax), vmin);
          const dv = vmax - vmin;
          const pc = (nv - vmin) / dv;
          const dt = tmax - tmin;
          return tmin + (pc * dt);
        };

        this.tHeagRotY = rule3(xTarget, -200, 200, -Math.PI / 4, Math.PI / 4);
        this.tHeadRotX = rule3(yTarget, -200, 200, -Math.PI / 4, Math.PI / 4);
        this.tHeadPosX = rule3(xTarget, -200, 200, 70, -70);
        this.tHeadPosY = rule3(yTarget, -140, 260, 20, 100);
        this.tHeadPosZ = 0;
        this.tEyeScale = 1;
        this.tIrisYScale = 1;
        this.tIrisZScale = 1;
        this.tIrisPosY = rule3(yTarget, -200, 200, 35, 15);
        this.tLeftIrisPosZ = rule3(xTarget, -200, 200, 130, 110);
        this.tRightIrisPosZ = rule3(xTarget, -200, 200, 110, 130);
        this.tLipsPosX = 0;
        this.tLipsPosY = -45;
        this.tSmilePosX = 0;
        this.tMouthPosZ = 174;
        this.tSmilePosZ = 173;
        this.tSmilePosY = -15;
        this.tSmileRotZ = -Math.PI;
        this.tRightKneeRotZ = rule3(xTarget, -200, 200, 0.3 - Math.PI / 8, 0.3 + Math.PI / 8);
        this.tLeftKneeRotZ = rule3(xTarget, -200, 200, -0.3 - Math.PI / 8, -0.3 + Math.PI / 8);

        this.updateBody(10);

        this.mane.rotation.y = 0;
        this.mane.rotation.x = 0;
        for (let i = 0; i < this.maneParts.length; i++) {
          const m = this.maneParts[i].mesh;
          m.position.z = 0;
          m.rotation.y = 0;
        }
        for (let i = 0; i < this.mustaches.length; i++) {
          this.mustaches[i].rotation.y = 0;
        }
      }

      cool(xTarget: number, yTarget: number, deltaTime: number) {
        const rule3 = (v: number, vmin: number, vmax: number, tmin: number, tmax: number) => {
          const nv = Math.max(Math.min(v, vmax), vmin);
          const dv = vmax - vmin;
          const pc = (nv - vmin) / dv;
          const dt = tmax - tmin;
          return tmin + (pc * dt);
        };

        this.tHeagRotY = rule3(xTarget, -200, 200, Math.PI / 4, -Math.PI / 4);
        this.tHeadRotX = rule3(yTarget, -200, 200, Math.PI / 4, -Math.PI / 4);
        this.tHeadPosX = rule3(xTarget, -200, 200, -70, 70);
        this.tHeadPosY = rule3(yTarget, -140, 260, 100, 20);
        this.tHeadPosZ = 100;
        this.tEyeScale = 0.1;
        this.tIrisYScale = 0.1;
        this.tIrisZScale = 3;
        this.tIrisPosY = 20;
        this.tLeftIrisPosZ = 120;
        this.tRightIrisPosZ = 120;
        this.tLipsPosX = rule3(xTarget, -200, 200, -15, 15);
        this.tLipsPosY = rule3(yTarget, -200, 200, -45, -40);
        this.tMouthPosZ = 168;
        this.tSmilePosX = rule3(xTarget, -200, 200, -15, 15);
        this.tSmilePosY = rule3(yTarget, -200, 200, -20, -8);
        this.tSmilePosZ = 176;
        this.tSmileRotZ = rule3(xTarget, -200, 200, -Math.PI - 0.3, -Math.PI + 0.3);
        this.tRightKneeRotZ = rule3(xTarget, -200, 200, 0.3 + Math.PI / 8, 0.3 - Math.PI / 8);
        this.tLeftKneeRotZ = rule3(xTarget, -200, 200, -0.3 + Math.PI / 8, -0.3 - Math.PI / 8);

        this.updateBody(10);

        this.mane.rotation.y = -0.8 * this.head.rotation.y;
        this.mane.rotation.x = -0.8 * this.head.rotation.x;

        const dt = Math.max(Math.min(20000 / (xTarget * xTarget + yTarget * yTarget), 1), 0.5);
        this.windTime += dt * deltaTime * 40;

        for (let i = 0; i < this.maneParts.length; i++) {
          const m = this.maneParts[i].mesh;
          const amp = this.maneParts[i].amp;
          const zOffset = this.maneParts[i].zOffset;
          const periodOffset = this.maneParts[i].periodOffset;
          m.position.z = zOffset + Math.sin(this.windTime + periodOffset) * amp * dt * 2;
        }

        this.leftEar.rotation.x = Math.cos(this.windTime) * Math.PI / 16 * dt;
        this.rightEar.rotation.x = -Math.cos(this.windTime) * Math.PI / 16 * dt;

        for (let i = 0; i < this.mustaches.length; i++) {
          const m = this.mustaches[i];
          const amp = (i < 3) ? -Math.PI / 8 : Math.PI / 8;
          m.rotation.y = amp + Math.cos(this.windTime + i) * dt * amp;
        }
      }
    }

    // Fan class implementation
    class Fan {
      isBlowing: boolean = false;
      speed: number = 0;
      acc: number = 0;
      threegroup: THREE.Group;
      propeller: THREE.Group;
      targetSpeed: number = 0;
      tPosX: number = 0;
      tPosY: number = 0;

      constructor() {
        const redMat = new THREE.MeshLambertMaterial({ color: 0xad3525 });
        const greyMat = new THREE.MeshLambertMaterial({ color: 0x653f4c });
        const yellowMat = new THREE.MeshLambertMaterial({ color: 0xfdd276 });

        const coreGeom = new THREE.BoxGeometry(10, 10, 20);
        const sphereGeom = new THREE.BoxGeometry(10, 10, 3);
        const propGeom = new THREE.BoxGeometry(10, 30, 2);
        propGeom.translate(0, 25, 0);

        const core = new THREE.Mesh(coreGeom, greyMat);

        // Propellers
        const prop1 = new THREE.Mesh(propGeom, redMat);
        prop1.position.z = 15;
        const prop2 = prop1.clone();
        prop2.rotation.z = Math.PI / 2;
        const prop3 = prop1.clone();
        prop3.rotation.z = Math.PI;
        const prop4 = prop1.clone();
        prop4.rotation.z = -Math.PI / 2;

        const sphere = new THREE.Mesh(sphereGeom, yellowMat);
        sphere.position.z = 15;

        this.propeller = new THREE.Group();
        this.propeller.add(prop1);
        this.propeller.add(prop2);
        this.propeller.add(prop3);
        this.propeller.add(prop4);

        this.threegroup = new THREE.Group();
        this.threegroup.add(core);
        this.threegroup.add(this.propeller);
        this.threegroup.add(sphere);
      }

      update(xTarget: number, yTarget: number, deltaTime: number) {
        const rule3 = (v: number, vmin: number, vmax: number, tmin: number, tmax: number) => {
          const nv = Math.max(Math.min(v, vmax), vmin);
          const dv = vmax - vmin;
          const pc = (nv - vmin) / dv;
          const dt = tmax - tmin;
          return tmin + (pc * dt);
        };

        this.threegroup.lookAt(new THREE.Vector3(0, 80, 60));
        this.tPosX = rule3(xTarget, -200, 200, -250, 250);
        this.tPosY = rule3(yTarget, -200, 200, 250, -250);
        this.threegroup.position.x += (this.tPosX - this.threegroup.position.x) * deltaTime * 4;
        this.threegroup.position.y += (this.tPosY - this.threegroup.position.y) * deltaTime * 4;

        this.targetSpeed = (this.isBlowing) ? 15 * deltaTime : 5 * deltaTime;
        if (this.isBlowing && this.speed < this.targetSpeed) {
          this.acc += 0.01 * deltaTime;
          this.speed += this.acc;
        } else if (!this.isBlowing) {
          this.acc = 0;
          this.speed *= Math.pow(0.4, deltaTime);
        }
        this.propeller.rotation.z += this.speed;
      }
    }

    const createLion = () => {
      if (!scene.scene) return;
      scene.lion = new Lion();
      scene.scene.add(scene.lion.threegroup);
    };

    const createFan = () => {
      if (!scene.scene) return;
      scene.fan = new Fan();
      scene.fan.threegroup.position.z = 350;
      scene.scene.add(scene.fan.threegroup);
    };

    const animate = () => {
      if (!scene.clock || !scene.renderer || !scene.scene || !scene.camera) return;

      const deltaTime = scene.clock.getDelta();
      const xTarget = (scene.mousePos!.x - scene.windowHalfX!);
      const yTarget = (scene.mousePos!.y - scene.windowHalfY!);

      if (scene.fan) {
        scene.fan.isBlowing = scene.isBlowing!;
        scene.fan.update(xTarget, yTarget, deltaTime);
      }

      if (scene.lion) {
        if (scene.isBlowing) {
          scene.lion.cool(xTarget, yTarget, deltaTime);
        } else {
          scene.lion.look(xTarget, yTarget);
        }
      }

      scene.renderer.render(scene.scene, scene.camera);
      scene.animationId = requestAnimationFrame(animate);
    };

    // Event handlers
    const handleMouseMove = (event: MouseEvent) => {
      if (scene.mousePos) {
        const rect = container.getBoundingClientRect();
        scene.mousePos.x = event.clientX - rect.left;
        scene.mousePos.y = event.clientY - rect.top;
      }
    };

    const handleMouseDown = () => {
      scene.isBlowing = true;
    };

    const handleMouseUp = () => {
      scene.isBlowing = false;
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        event.preventDefault();
        const rect = container.getBoundingClientRect();
        if (scene.mousePos) {
          scene.mousePos.x = event.touches[0].clientX - rect.left;
          scene.mousePos.y = event.touches[0].clientY - rect.top;
        }
        scene.isBlowing = true;
      }
    };

    const handleTouchEnd = () => {
      scene.isBlowing = false;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        event.preventDefault();
        const rect = container.getBoundingClientRect();
        if (scene.mousePos) {
          scene.mousePos.x = event.touches[0].clientX - rect.left;
          scene.mousePos.y = event.touches[0].clientY - rect.top;
        }
        scene.isBlowing = true;
      }
    };

    const handleResize = () => {
      if (!scene.camera || !scene.renderer) return;
      
      const HEIGHT = container.clientHeight;
      const WIDTH = container.clientWidth;
      scene.windowHalfX = WIDTH / 2;
      scene.windowHalfY = HEIGHT / 2;
      scene.renderer.setSize(WIDTH, HEIGHT);
      scene.camera.aspect = WIDTH / HEIGHT;
      scene.camera.updateProjectionMatrix();
    };

    // Add event listeners
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);
    container.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('resize', handleResize);

    // Initialize the scene
    initScene();

    // Cleanup function
    return () => {
      if (scene.animationId) {
        cancelAnimationFrame(scene.animationId);
      }
      
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);

      if (scene.renderer && container.contains(scene.renderer.domElement)) {
        container.removeChild(scene.renderer.domElement);
      }
      
      if (scene.renderer) {
        scene.renderer.dispose();
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full ${className}`}
      style={{ 
        background: '#ebe5e7',
        cursor: 'pointer'
      }}
    />
  );
};

export default LionAnimation;