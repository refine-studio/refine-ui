import type { ComponentProps } from 'react';

import { useEffect, useRef, useState } from 'react';
import {
  AmbientLight,
  Color,
  CylinderGeometry,
  DirectionalLight,
  InstancedMesh,
  MeshStandardMaterial,
  NeutralToneMapping,
  Object3D,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';

import { HexField } from '../../components/hex-field/hex-field';
import { cn } from '../../lib/cn';

// Every value below is copied from refine.studio's hero, so the banner moves exactly like the website.
const CELL_SPACING = 0.58 * Math.sqrt(3);
const ROW_SPACING = 0.87;
const ROW_COUNT = 23;
const COLUMN_COUNT = 39;
const PRISM_RADIUS = 0.5655;
const PRISM_DEPTH = 0.35;
const WAVE_HEIGHT = 0.25;
const SEED = 1688;
const MAX_PIXEL_RATIO = 2;
const CAMERA_DISTANCE = 15;
const WEBSITE_FIELD_OF_VIEW = 42;
const WEBSITE_HERO_HEIGHT = 900;

const SCENE_BY_MODE = {
  dark: {
    ambientIntensity: 0.7,
    background: '#101113',
    fillColor: '#7c7e82',
    keyIntensity: 3.6,
    peakShadeGain: 0.8,
    surface: '#3a3c3f',
    tones: [0.85, 0.62, 0.42],
  },
  light: {
    ambientIntensity: 1.8,
    background: '#f2f3f5',
    fillColor: '#e8e9eb',
    keyIntensity: 1.4,
    peakShadeGain: 0.14,
    surface: '#ffffff',
    tones: [1, 0.88, 0.76],
  },
} as const;

type SceneMode = keyof typeof SCENE_BY_MODE;

interface HexCell {
  phaseJitter: number;
  toneIndex: number;
  x: number;
  y: number;
}

/**
 * Lays out the website's offset hex grid, giving each cell a seeded phase jitter and one of three tones no neighbour shares.
 */
const buildCells = () => {
  let state = SEED;
  /**
   * Returns the next value of the website's seeded generator, between 0 and 1.
   */
  const random = () => {
    state = (1_664_525 * state + 1_013_904_223) % 4_294_967_296;

    return state / 4_294_967_296;
  };
  const cells: HexCell[] = [];

  for (let row = 0; row < ROW_COUNT; row += 1) {
    for (let column = 0; column < COLUMN_COUNT; column += 1) {
      const axialQ = column - (row - (row & 1)) / 2;
      cells.push({
        phaseJitter: (random() - 0.5) * 0.7,
        toneIndex: (((axialQ - row) % 3) + 3) % 3,
        x: column * CELL_SPACING - ((COLUMN_COUNT - 1) * CELL_SPACING) / 2 + (row % 2 === 1 ? CELL_SPACING / 2 : 0),
        y: row * ROW_SPACING - ((ROW_COUNT - 1) * ROW_SPACING) / 2,
      });
    }
  }

  return cells;
};

/**
 * Reads the mode the theme runtime last wrote onto `<html>`.
 */
const readMode = (): SceneMode => {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
};

/**
 * Reports whether this browser can open a WebGL context, releasing the probe context straight away.
 */
const hasWebGL = () => {
  const context = document.createElement('canvas').getContext('webgl2');
  context?.getExtension('WEBGL_lose_context')?.loseContext();

  return context !== null;
};

/**
 * Tracks the `<html>` mode class, so the scene relights when the toolbar switches between light and dark.
 */
const useDocumentMode = () => {
  const [mode, setMode] = useState(readMode);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setMode(readMode());
    });
    observer.observe(document.documentElement, {
      attributeFilter: ['class'],
      attributes: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return mode;
};

/**
 * Renders refine.studio's 3D hero: a field of grey hexagon prisms that ripples in a slow wave, lit for the current mode.
 */
export const HexRipple = ({ className, ...props }: Omit<ComponentProps<'div'>, 'children'>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mode = useDocumentMode();
  const [isSupported] = useState(hasWebGL);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isSupported) return;

    const renderer = new WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });

    const settings = SCENE_BY_MODE[mode];
    const cells = buildCells();
    const isReducedMotion = globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches;

    renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio, MAX_PIXEL_RATIO));
    renderer.toneMapping = NeutralToneMapping;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    renderer.domElement.classList.add('block', 'size-full');
    container.append(renderer.domElement);

    const scene = new Scene();
    scene.background = new Color(settings.background);

    const camera = new PerspectiveCamera(WEBSITE_FIELD_OF_VIEW, 1, 0.1, 1000);
    camera.position.set(0, -1.6, CAMERA_DISTANCE);
    camera.lookAt(0, 0, 0);

    const keyLight = new DirectionalLight('#ffffff', settings.keyIntensity);
    keyLight.position.set(-8, 10, 12);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(2048, 2048);
    Object.assign(keyLight.shadow.camera, {
      bottom: -14,
      far: 40,
      left: -22,
      near: 1,
      right: 22,
      top: 14,
    });
    keyLight.shadow.bias = -0.0004;
    const fillLight = new DirectionalLight(settings.fillColor, 0.25);
    fillLight.position.set(6, -6, 8);
    scene.add(keyLight, fillLight, new AmbientLight('#ffffff', settings.ambientIntensity));

    const geometry = new CylinderGeometry(PRISM_RADIUS, PRISM_RADIUS, PRISM_DEPTH, 6);
    geometry.rotateX(Math.PI / 2);
    const material = new MeshStandardMaterial({
      color: settings.surface,
      flatShading: true,
      metalness: 0,
      roughness: 1,
    });
    const prisms = new InstancedMesh(geometry, material, cells.length);
    prisms.castShadow = true;
    prisms.receiveShadow = true;
    scene.add(prisms);

    const placement = new Object3D();
    const shade = new Color();

    /**
     * Lifts every prism to its point on the wave at `seconds` and shades the raised ones brighter.
     */
    const placePrisms = (seconds: number) => {
      for (const [index, cell] of cells.entries()) {
        const wave = Math.sin(0.42 * cell.x - 0.75 * seconds + 0.22 * cell.y + cell.phaseJitter);
        const lift = wave * Math.abs(wave) * WAVE_HEIGHT;
        placement.position.set(cell.x, cell.y, lift);
        placement.updateMatrix();
        prisms.setMatrixAt(index, placement.matrix);
        prisms.setColorAt(
          index,
          shade.setScalar((settings.tones[cell.toneIndex] ?? 1) + (lift / WAVE_HEIGHT) * settings.peakShadeGain),
        );
      }
      prisms.instanceMatrix.needsUpdate = true;
      if (prisms.instanceColor) prisms.instanceColor.needsUpdate = true;
    };

    /**
     * Matches the canvas and the camera to the container's current size.
     */
    const resize = () => {
      const { height, width } = container.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      // The website frames its 900px hero at 42 degrees. Narrowing the view for a shorter banner keeps each prism the website's size.
      const halfAngle = ((WEBSITE_FIELD_OF_VIEW / 2) * Math.PI) / 180;
      camera.fov = ((2 * Math.atan((height / WEBSITE_HERO_HEIGHT) * Math.tan(halfAngle))) * 180) / Math.PI;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };

    placePrisms(0);
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const startTime = performance.now();
    if (!isReducedMotion) {
      renderer.setAnimationLoop(() => {
        placePrisms((performance.now() - startTime) / 1000);
        renderer.render(scene, camera);
      });
    }

    return () => {
      resizeObserver.disconnect();
      renderer.setAnimationLoop(null);
      geometry.dispose();
      material.dispose();
      prisms.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [isSupported, mode]);

  // A browser without WebGL gets the flat hex field instead of an empty banner.
  if (!isSupported) {
    return <HexField animated={false} className={className} fade="bottom" />;
  }

  return (
    <div
      aria-hidden
      className={cn('pointer-events-none', className)}
      ref={containerRef}
      role="presentation"
      {...props}
    />
  );
};
