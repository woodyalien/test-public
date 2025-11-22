# Rolling Sphere Game

A 3D rolling sphere game built with Three.js and Cannon-ES physics engine. Navigate your sphere through challenging levels, collect coins and gems, avoid obstacles, and reach the goal!

## Features

- **3D Physics-Based Gameplay**: Realistic rolling ball physics powered by Cannon-ES
- **10 Unique Levels**: Progressive difficulty with varied challenges
- **Moving Platforms**: Time your jumps on platforms that move in different directions
- **Obstacles**: Static and moving obstacles to avoid
- **Collectibles**: Coins and gems to boost your score
- **Score System**: Track your points across all levels
- **Timer**: Race against time to complete levels
- **Beautiful Graphics**: Modern 3D visuals with shadows and lighting effects

## How to Play

### Controls

| Key | Action |
|-----|--------|
| W / Arrow Up | Move Forward |
| S / Arrow Down | Move Backward |
| A / Arrow Left | Move Left |
| D / Arrow Right | Move Right |
| Space | Jump |
| R | Reset Level |
| Escape | Pause Game |

### Objective

1. Navigate your sphere from the starting point to the glowing green goal
2. Collect coins (gold) and gems (pink) for bonus points
3. Avoid falling off platforms
4. Dodge moving obstacles
5. Complete all 10 levels!

## Running the Game

### Option 1: Local Server (Recommended)

Since the game uses ES6 modules, you need to run it on a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (with http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

### Option 2: VS Code Live Server

If you're using VS Code, install the "Live Server" extension and click "Go Live" in the status bar.

## Project Structure

```
rolling-sphere-game/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Game styles and UI
├── js/
│   ├── game.js         # Main game logic
│   └── levels.js       # Level definitions
└── README.md           # This file
```

## Technologies Used

- **Three.js** (r128) - 3D graphics rendering
- **Cannon-ES** (0.20.0) - Physics engine
- **Vanilla JavaScript** - Game logic with ES6 modules
- **CSS3** - Styling and animations

## Level Overview

1. **Getting Started** - Introduction to basic controls
2. **Platform Hopping** - Learn to jump between platforms
3. **Moving Platforms** - Platforms that move side to side
4. **Obstacle Course** - Navigate around static obstacles
5. **Danger Zone** - Avoid moving obstacles
6. **The Maze** - Find your way through walls
7. **Sky High** - Ascending platform challenge
8. **The Gauntlet** - Combination of all challenges
9. **Precision** - Tiny platforms requiring careful control
10. **Final Challenge** - The ultimate test of skill

## Customization

### Adding New Levels

Edit `js/levels.js` to add new levels. Each level object contains:

```javascript
{
    name: "Level Name",
    startPosition: { x: 0, y: 2, z: 0 },
    goalPosition: { x: 0, y: 0.6, z: -10 },
    platforms: [
        { position: {...}, size: {...}, color: 0x2d2d44 }
    ],
    collectibles: [
        { position: {...}, type: 'coin', value: 10 }
    ],
    obstacles: [
        { position: {...}, size: {...}, type: 'static' }
    ]
}
```

### Platform Options

- `isMoving`: Enable platform movement
- `moveAxis`: 'x', 'y', or 'z'
- `moveRange`: Distance of movement
- `moveSpeed`: Speed of movement

### Obstacle Types

- `static`: Stationary obstacle
- `moving`: Moving obstacle (uses same movement options as platforms)

## Browser Support

Works best in modern browsers with WebGL support:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

MIT License - Feel free to use and modify!
