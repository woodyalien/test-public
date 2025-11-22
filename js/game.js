// Rolling Sphere Game
// Main game module using Three.js and Cannon-ES

import { levels } from './levels.js';

// Game State
const gameState = {
    isPlaying: false,
    isPaused: false,
    currentLevel: 0,
    score: 0,
    startTime: 0,
    elapsedTime: 0,
    collectibles: 0,
    totalCollectibles: 0
};

// Three.js components
let scene, camera, renderer;
let sphere, sphereMesh;

// Cannon.js physics world
let world;
let sphereBody;
let groundBody;

// Game objects
let platforms = [];
let collectibles = [];
let obstacles = [];
let goalMesh, goalBody;

// Controls
const keys = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false
};

// Constants
const SPHERE_RADIUS = 0.5;
const MOVE_FORCE = 50;
const JUMP_FORCE = 8;
const MAX_VELOCITY = 15;

// DOM Elements
const canvas = document.getElementById('game-canvas');
const scoreValue = document.getElementById('score-value');
const levelValue = document.getElementById('level-value');
const timerValue = document.getElementById('timer-value');
const menuOverlay = document.getElementById('menu');
const pauseOverlay = document.getElementById('pause-menu');
const levelCompleteOverlay = document.getElementById('level-complete');
const gameOverOverlay = document.getElementById('game-over');

// Initialize the game
function init() {
    initThree();
    initPhysics();
    initControls();
    initEventListeners();
    animate();
}

// Initialize Three.js
function initThree() {
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    scene.fog = new THREE.Fog(0x1a1a2e, 20, 100);

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 10, 15);
    camera.lookAt(0, 0, 0);

    // Renderer
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 100;
    directionalLight.shadow.camera.left = -30;
    directionalLight.shadow.camera.right = 30;
    directionalLight.shadow.camera.top = 30;
    directionalLight.shadow.camera.bottom = -30;
    scene.add(directionalLight);

    // Point lights for atmosphere
    const pointLight1 = new THREE.PointLight(0x4fc3f7, 0.5, 50);
    pointLight1.position.set(-10, 10, -10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xe91e63, 0.3, 50);
    pointLight2.position.set(10, 5, 10);
    scene.add(pointLight2);

    // Handle window resize
    window.addEventListener('resize', onWindowResize);
}

// Initialize Cannon.js physics
function initPhysics() {
    world = new CANNON.World();
    world.gravity.set(0, -20, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;

    // Contact material for bouncy sphere
    const sphereMaterial = new CANNON.Material('sphere');
    const groundMaterial = new CANNON.Material('ground');
    const contactMaterial = new CANNON.ContactMaterial(sphereMaterial, groundMaterial, {
        friction: 0.5,
        restitution: 0.3
    });
    world.addContactMaterial(contactMaterial);
}

// Initialize controls
function initControls() {
    document.addEventListener('keydown', (e) => {
        switch(e.code) {
            case 'KeyW':
            case 'ArrowUp':
                keys.forward = true;
                break;
            case 'KeyS':
            case 'ArrowDown':
                keys.backward = true;
                break;
            case 'KeyA':
            case 'ArrowLeft':
                keys.left = true;
                break;
            case 'KeyD':
            case 'ArrowRight':
                keys.right = true;
                break;
            case 'Space':
                keys.jump = true;
                e.preventDefault();
                break;
            case 'KeyR':
                if (gameState.isPlaying) resetLevel();
                break;
            case 'Escape':
                if (gameState.isPlaying) togglePause();
                break;
        }
    });

    document.addEventListener('keyup', (e) => {
        switch(e.code) {
            case 'KeyW':
            case 'ArrowUp':
                keys.forward = false;
                break;
            case 'KeyS':
            case 'ArrowDown':
                keys.backward = false;
                break;
            case 'KeyA':
            case 'ArrowLeft':
                keys.left = false;
                break;
            case 'KeyD':
            case 'ArrowRight':
                keys.right = false;
                break;
            case 'Space':
                keys.jump = false;
                break;
        }
    });
}

// Initialize event listeners for UI
function initEventListeners() {
    document.getElementById('start-btn').addEventListener('click', startGame);
    document.getElementById('controls-btn').addEventListener('click', toggleControls);
    document.getElementById('resume-btn').addEventListener('click', togglePause);
    document.getElementById('restart-btn').addEventListener('click', () => {
        togglePause();
        resetLevel();
    });
    document.getElementById('main-menu-btn').addEventListener('click', showMainMenu);
    document.getElementById('next-level-btn').addEventListener('click', nextLevel);
    document.getElementById('retry-btn').addEventListener('click', () => {
        gameOverOverlay.classList.add('hidden');
        resetLevel();
        gameState.isPlaying = true;
    });
    document.getElementById('game-over-menu-btn').addEventListener('click', showMainMenu);
}

// Toggle controls visibility
function toggleControls() {
    const controlsInfo = document.getElementById('controls-info');
    controlsInfo.classList.toggle('hidden');
}

// Start the game
function startGame() {
    gameState.currentLevel = 0;
    gameState.score = 0;
    menuOverlay.classList.add('hidden');
    loadLevel(gameState.currentLevel);
    gameState.isPlaying = true;
    gameState.startTime = Date.now();
}

// Show main menu
function showMainMenu() {
    gameState.isPlaying = false;
    gameState.isPaused = false;
    pauseOverlay.classList.add('hidden');
    gameOverOverlay.classList.add('hidden');
    levelCompleteOverlay.classList.add('hidden');
    menuOverlay.classList.remove('hidden');
    clearLevel();
}

// Toggle pause
function togglePause() {
    if (!gameState.isPlaying) return;

    gameState.isPaused = !gameState.isPaused;

    if (gameState.isPaused) {
        pauseOverlay.classList.remove('hidden');
    } else {
        pauseOverlay.classList.add('hidden');
    }
}

// Load a level
function loadLevel(levelIndex) {
    clearLevel();

    const level = levels[levelIndex];
    if (!level) {
        showGameComplete();
        return;
    }

    gameState.collectibles = 0;
    gameState.totalCollectibles = level.collectibles ? level.collectibles.length : 0;
    gameState.startTime = Date.now();

    // Create sphere (player)
    createSphere(level.startPosition || { x: 0, y: 2, z: 0 });

    // Create ground/platforms
    level.platforms.forEach(platform => {
        createPlatform(platform);
    });

    // Create collectibles
    if (level.collectibles) {
        level.collectibles.forEach(collectible => {
            createCollectible(collectible);
        });
    }

    // Create obstacles
    if (level.obstacles) {
        level.obstacles.forEach(obstacle => {
            createObstacle(obstacle);
        });
    }

    // Create goal
    if (level.goalPosition) {
        createGoal(level.goalPosition);
    }

    // Update HUD
    levelValue.textContent = levelIndex + 1;
    updateScore();
}

// Clear current level
function clearLevel() {
    // Remove platforms
    platforms.forEach(p => {
        scene.remove(p.mesh);
        world.removeBody(p.body);
    });
    platforms = [];

    // Remove collectibles
    collectibles.forEach(c => {
        scene.remove(c.mesh);
    });
    collectibles = [];

    // Remove obstacles
    obstacles.forEach(o => {
        scene.remove(o.mesh);
        if (o.body) world.removeBody(o.body);
    });
    obstacles = [];

    // Remove sphere
    if (sphereMesh) {
        scene.remove(sphereMesh);
        world.removeBody(sphereBody);
        sphereMesh = null;
        sphereBody = null;
    }

    // Remove goal
    if (goalMesh) {
        scene.remove(goalMesh);
        if (goalBody) world.removeBody(goalBody);
        goalMesh = null;
        goalBody = null;
    }
}

// Create the player sphere
function createSphere(position) {
    // Three.js mesh
    const geometry = new THREE.SphereGeometry(SPHERE_RADIUS, 32, 32);
    const material = new THREE.MeshStandardMaterial({
        color: 0x4fc3f7,
        metalness: 0.3,
        roughness: 0.4,
        emissive: 0x4fc3f7,
        emissiveIntensity: 0.2
    });
    sphereMesh = new THREE.Mesh(geometry, material);
    sphereMesh.castShadow = true;
    sphereMesh.receiveShadow = true;
    scene.add(sphereMesh);

    // Cannon.js body
    const shape = new CANNON.Sphere(SPHERE_RADIUS);
    sphereBody = new CANNON.Body({
        mass: 1,
        material: new CANNON.Material('sphere'),
        linearDamping: 0.3,
        angularDamping: 0.3
    });
    sphereBody.addShape(shape);
    sphereBody.position.set(position.x, position.y, position.z);
    world.addBody(sphereBody);
}

// Create a platform
function createPlatform(config) {
    const { position, size, color = 0x2d2d44, isMoving = false, moveAxis = 'x', moveRange = 5, moveSpeed = 2 } = config;

    // Three.js mesh
    const geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
    const material = new THREE.MeshStandardMaterial({
        color: color,
        metalness: 0.1,
        roughness: 0.8
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(position.x, position.y, position.z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);

    // Cannon.js body
    const shape = new CANNON.Box(new CANNON.Vec3(size.x / 2, size.y / 2, size.z / 2));
    const body = new CANNON.Body({
        mass: 0,
        material: new CANNON.Material('ground')
    });
    body.addShape(shape);
    body.position.set(position.x, position.y, position.z);
    world.addBody(body);

    platforms.push({
        mesh,
        body,
        isMoving,
        moveAxis,
        moveRange,
        moveSpeed,
        startPos: { ...position },
        time: 0
    });
}

// Create a collectible
function createCollectible(config) {
    const { position, type = 'coin', value = 10 } = config;

    // Create collectible mesh (rotating coin/gem)
    let geometry, material;

    if (type === 'coin') {
        geometry = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 32);
        material = new THREE.MeshStandardMaterial({
            color: 0xffd700,
            metalness: 0.8,
            roughness: 0.2,
            emissive: 0xffd700,
            emissiveIntensity: 0.3
        });
    } else {
        geometry = new THREE.OctahedronGeometry(0.3);
        material = new THREE.MeshStandardMaterial({
            color: 0xe91e63,
            metalness: 0.5,
            roughness: 0.3,
            emissive: 0xe91e63,
            emissiveIntensity: 0.4
        });
    }

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(position.x, position.y, position.z);
    mesh.castShadow = true;
    scene.add(mesh);

    collectibles.push({
        mesh,
        position: { ...position },
        type,
        value,
        collected: false,
        rotationSpeed: 2 + Math.random()
    });
}

// Create an obstacle
function createObstacle(config) {
    const { position, size, type = 'static', color = 0xe91e63, moveAxis = 'x', moveRange = 3, moveSpeed = 2 } = config;

    const geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
    const material = new THREE.MeshStandardMaterial({
        color: color,
        metalness: 0.3,
        roughness: 0.6,
        emissive: color,
        emissiveIntensity: 0.2
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(position.x, position.y, position.z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);

    let body = null;
    if (type === 'static' || type === 'moving') {
        const shape = new CANNON.Box(new CANNON.Vec3(size.x / 2, size.y / 2, size.z / 2));
        body = new CANNON.Body({ mass: 0 });
        body.addShape(shape);
        body.position.set(position.x, position.y, position.z);
        world.addBody(body);
    }

    obstacles.push({
        mesh,
        body,
        type,
        moveAxis,
        moveRange,
        moveSpeed,
        startPos: { ...position },
        time: Math.random() * Math.PI * 2
    });
}

// Create goal
function createGoal(position) {
    // Create glowing goal platform
    const geometry = new THREE.CylinderGeometry(1, 1, 0.2, 32);
    const material = new THREE.MeshStandardMaterial({
        color: 0x00ff88,
        metalness: 0.5,
        roughness: 0.3,
        emissive: 0x00ff88,
        emissiveIntensity: 0.5
    });
    goalMesh = new THREE.Mesh(geometry, material);
    goalMesh.position.set(position.x, position.y, position.z);
    goalMesh.receiveShadow = true;
    scene.add(goalMesh);

    // Add a ring effect
    const ringGeometry = new THREE.TorusGeometry(1.2, 0.1, 16, 32);
    const ringMaterial = new THREE.MeshStandardMaterial({
        color: 0x00ff88,
        emissive: 0x00ff88,
        emissiveIntensity: 0.8
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.3;
    goalMesh.add(ring);
}

// Reset current level
function resetLevel() {
    loadLevel(gameState.currentLevel);
}

// Next level
function nextLevel() {
    levelCompleteOverlay.classList.add('hidden');
    gameState.currentLevel++;

    if (gameState.currentLevel >= levels.length) {
        showGameComplete();
    } else {
        loadLevel(gameState.currentLevel);
        gameState.isPlaying = true;
    }
}

// Show level complete
function showLevelComplete() {
    gameState.isPlaying = false;

    const time = formatTime(gameState.elapsedTime);
    document.getElementById('complete-time').textContent = time;
    document.getElementById('complete-score').textContent = gameState.score;

    levelCompleteOverlay.classList.remove('hidden');
}

// Show game complete (all levels finished)
function showGameComplete() {
    gameState.isPlaying = false;
    document.getElementById('final-score').textContent = gameState.score;

    // Modify game over to show completion message
    const gameOverContent = gameOverOverlay.querySelector('h2');
    gameOverContent.textContent = 'Congratulations!';

    gameOverOverlay.classList.remove('hidden');
}

// Show game over (fell off)
function showGameOver() {
    gameState.isPlaying = false;
    document.getElementById('final-score').textContent = gameState.score;

    const gameOverContent = gameOverOverlay.querySelector('h2');
    gameOverContent.textContent = 'Game Over';

    gameOverOverlay.classList.remove('hidden');
}

// Update score display
function updateScore() {
    scoreValue.textContent = gameState.score;
}

// Format time as M:SS
function formatTime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Update physics and game logic
function update(deltaTime) {
    if (!gameState.isPlaying || gameState.isPaused) return;

    // Update timer
    gameState.elapsedTime = Date.now() - gameState.startTime;
    timerValue.textContent = formatTime(gameState.elapsedTime);

    // Apply movement forces
    const force = new CANNON.Vec3(0, 0, 0);

    if (keys.forward) force.z -= MOVE_FORCE;
    if (keys.backward) force.z += MOVE_FORCE;
    if (keys.left) force.x -= MOVE_FORCE;
    if (keys.right) force.x += MOVE_FORCE;

    sphereBody.applyForce(force, sphereBody.position);

    // Limit velocity
    const velocity = sphereBody.velocity;
    const speed = Math.sqrt(velocity.x * velocity.x + velocity.z * velocity.z);
    if (speed > MAX_VELOCITY) {
        const scale = MAX_VELOCITY / speed;
        sphereBody.velocity.x *= scale;
        sphereBody.velocity.z *= scale;
    }

    // Jump (only if on ground)
    if (keys.jump && isOnGround()) {
        sphereBody.velocity.y = JUMP_FORCE;
        keys.jump = false;
    }

    // Step physics world
    world.step(1 / 60, deltaTime, 3);

    // Update sphere mesh position
    if (sphereMesh && sphereBody) {
        sphereMesh.position.copy(sphereBody.position);
        sphereMesh.quaternion.copy(sphereBody.quaternion);
    }

    // Update moving platforms
    platforms.forEach(platform => {
        if (platform.isMoving) {
            platform.time += deltaTime * platform.moveSpeed;
            const offset = Math.sin(platform.time) * platform.moveRange;

            if (platform.moveAxis === 'x') {
                platform.mesh.position.x = platform.startPos.x + offset;
                platform.body.position.x = platform.startPos.x + offset;
            } else if (platform.moveAxis === 'y') {
                platform.mesh.position.y = platform.startPos.y + offset;
                platform.body.position.y = platform.startPos.y + offset;
            } else {
                platform.mesh.position.z = platform.startPos.z + offset;
                platform.body.position.z = platform.startPos.z + offset;
            }
        }
    });

    // Update moving obstacles
    obstacles.forEach(obstacle => {
        if (obstacle.type === 'moving') {
            obstacle.time += deltaTime * obstacle.moveSpeed;
            const offset = Math.sin(obstacle.time) * obstacle.moveRange;

            if (obstacle.moveAxis === 'x') {
                obstacle.mesh.position.x = obstacle.startPos.x + offset;
                if (obstacle.body) obstacle.body.position.x = obstacle.startPos.x + offset;
            } else if (obstacle.moveAxis === 'y') {
                obstacle.mesh.position.y = obstacle.startPos.y + offset;
                if (obstacle.body) obstacle.body.position.y = obstacle.startPos.y + offset;
            } else {
                obstacle.mesh.position.z = obstacle.startPos.z + offset;
                if (obstacle.body) obstacle.body.position.z = obstacle.startPos.z + offset;
            }
        }
    });

    // Rotate collectibles
    collectibles.forEach(collectible => {
        if (!collectible.collected) {
            collectible.mesh.rotation.y += deltaTime * collectible.rotationSpeed;
            collectible.mesh.position.y = collectible.position.y + Math.sin(Date.now() * 0.003) * 0.2;
        }
    });

    // Rotate goal ring
    if (goalMesh) {
        goalMesh.rotation.y += deltaTime * 0.5;
    }

    // Check collectible collisions
    checkCollectibles();

    // Check goal reached
    checkGoal();

    // Check if fell off
    if (sphereBody && sphereBody.position.y < -10) {
        showGameOver();
    }

    // Update camera to follow sphere
    updateCamera();
}

// Check if sphere is on ground
function isOnGround() {
    if (!sphereBody) return false;

    // Simple ground check - ray cast down
    const start = new CANNON.Vec3(
        sphereBody.position.x,
        sphereBody.position.y,
        sphereBody.position.z
    );
    const end = new CANNON.Vec3(
        sphereBody.position.x,
        sphereBody.position.y - SPHERE_RADIUS - 0.1,
        sphereBody.position.z
    );

    const result = new CANNON.RaycastResult();
    world.raycastClosest(start, end, {}, result);

    return result.hasHit;
}

// Check collectible collisions
function checkCollectibles() {
    if (!sphereBody) return;

    collectibles.forEach(collectible => {
        if (collectible.collected) return;

        const dx = sphereBody.position.x - collectible.mesh.position.x;
        const dy = sphereBody.position.y - collectible.mesh.position.y;
        const dz = sphereBody.position.z - collectible.mesh.position.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < SPHERE_RADIUS + 0.4) {
            collectible.collected = true;
            scene.remove(collectible.mesh);
            gameState.score += collectible.value;
            gameState.collectibles++;
            updateScore();
        }
    });
}

// Check if goal reached
function checkGoal() {
    if (!sphereBody || !goalMesh) return;

    const dx = sphereBody.position.x - goalMesh.position.x;
    const dz = sphereBody.position.z - goalMesh.position.z;
    const distance = Math.sqrt(dx * dx + dz * dz);

    if (distance < 1.5 && Math.abs(sphereBody.position.y - goalMesh.position.y) < 2) {
        // Bonus for collecting all items
        if (gameState.collectibles === gameState.totalCollectibles && gameState.totalCollectibles > 0) {
            gameState.score += 100;
        }
        showLevelComplete();
    }
}

// Update camera position
function updateCamera() {
    if (!sphereMesh) return;

    const targetPosition = new THREE.Vector3(
        sphereMesh.position.x,
        sphereMesh.position.y + 8,
        sphereMesh.position.z + 12
    );

    camera.position.lerp(targetPosition, 0.05);
    camera.lookAt(sphereMesh.position);
}

// Animation loop
let lastTime = 0;
function animate(currentTime = 0) {
    requestAnimationFrame(animate);

    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    update(deltaTime);
    renderer.render(scene, camera);
}

// Start the game when page loads
init();
