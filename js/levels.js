// Level definitions for Rolling Sphere Game

const levels = [
    // Level 1: Introduction
    {
        name: "Getting Started",
        startPosition: { x: 0, y: 2, z: 8 },
        goalPosition: { x: 0, y: 0.6, z: -15 },
        platforms: [
            // Main starting platform
            { position: { x: 0, y: 0, z: 8 }, size: { x: 8, y: 1, z: 8 }, color: 0x2d2d44 },
            // Bridge
            { position: { x: 0, y: 0, z: 0 }, size: { x: 4, y: 1, z: 8 }, color: 0x3d3d54 },
            // End platform
            { position: { x: 0, y: 0, z: -10 }, size: { x: 10, y: 1, z: 12 }, color: 0x2d2d44 },
        ],
        collectibles: [
            { position: { x: 0, y: 2, z: 4 }, type: 'coin', value: 10 },
            { position: { x: 0, y: 2, z: 0 }, type: 'coin', value: 10 },
            { position: { x: 0, y: 2, z: -4 }, type: 'coin', value: 10 },
            { position: { x: -3, y: 2, z: -10 }, type: 'gem', value: 25 },
            { position: { x: 3, y: 2, z: -10 }, type: 'gem', value: 25 },
        ],
        obstacles: []
    },

    // Level 2: Platforms
    {
        name: "Platform Hopping",
        startPosition: { x: -10, y: 2, z: 0 },
        goalPosition: { x: 10, y: 0.6, z: 0 },
        platforms: [
            // Start
            { position: { x: -10, y: 0, z: 0 }, size: { x: 6, y: 1, z: 6 }, color: 0x2d2d44 },
            // Stepping stones
            { position: { x: -5, y: 0, z: 0 }, size: { x: 3, y: 1, z: 3 }, color: 0x3d3d54 },
            { position: { x: -1, y: 0.5, z: 2 }, size: { x: 3, y: 1, z: 3 }, color: 0x3d3d54 },
            { position: { x: 3, y: 1, z: 0 }, size: { x: 3, y: 1, z: 3 }, color: 0x3d3d54 },
            { position: { x: 6, y: 0.5, z: -2 }, size: { x: 3, y: 1, z: 3 }, color: 0x3d3d54 },
            // End
            { position: { x: 10, y: 0, z: 0 }, size: { x: 6, y: 1, z: 6 }, color: 0x2d2d44 },
        ],
        collectibles: [
            { position: { x: -5, y: 2, z: 0 }, type: 'coin', value: 10 },
            { position: { x: -1, y: 2.5, z: 2 }, type: 'coin', value: 10 },
            { position: { x: 3, y: 3, z: 0 }, type: 'gem', value: 25 },
            { position: { x: 6, y: 2.5, z: -2 }, type: 'coin', value: 10 },
        ],
        obstacles: []
    },

    // Level 3: Moving Platforms
    {
        name: "Moving Platforms",
        startPosition: { x: 0, y: 2, z: 12 },
        goalPosition: { x: 0, y: 0.6, z: -15 },
        platforms: [
            // Start
            { position: { x: 0, y: 0, z: 12 }, size: { x: 6, y: 1, z: 6 }, color: 0x2d2d44 },
            // Moving platform 1
            {
                position: { x: 0, y: 0, z: 6 },
                size: { x: 4, y: 1, z: 4 },
                color: 0x4a4a6a,
                isMoving: true,
                moveAxis: 'x',
                moveRange: 3,
                moveSpeed: 1
            },
            // Static middle
            { position: { x: 0, y: 0, z: 0 }, size: { x: 5, y: 1, z: 5 }, color: 0x2d2d44 },
            // Moving platform 2
            {
                position: { x: 0, y: 0, z: -6 },
                size: { x: 4, y: 1, z: 4 },
                color: 0x4a4a6a,
                isMoving: true,
                moveAxis: 'x',
                moveRange: 4,
                moveSpeed: 1.5
            },
            // End
            { position: { x: 0, y: 0, z: -12 }, size: { x: 8, y: 1, z: 8 }, color: 0x2d2d44 },
        ],
        collectibles: [
            { position: { x: 0, y: 2, z: 6 }, type: 'coin', value: 10 },
            { position: { x: -2, y: 2, z: 0 }, type: 'coin', value: 10 },
            { position: { x: 2, y: 2, z: 0 }, type: 'coin', value: 10 },
            { position: { x: 0, y: 2, z: -6 }, type: 'gem', value: 25 },
            { position: { x: 0, y: 2, z: -12 }, type: 'gem', value: 25 },
        ],
        obstacles: []
    },

    // Level 4: Obstacles
    {
        name: "Obstacle Course",
        startPosition: { x: -12, y: 2, z: 0 },
        goalPosition: { x: 12, y: 0.6, z: 0 },
        platforms: [
            // Long corridor
            { position: { x: 0, y: 0, z: 0 }, size: { x: 30, y: 1, z: 8 }, color: 0x2d2d44 },
        ],
        collectibles: [
            { position: { x: -8, y: 2, z: 0 }, type: 'coin', value: 10 },
            { position: { x: -4, y: 2, z: 2 }, type: 'coin', value: 10 },
            { position: { x: 0, y: 2, z: -2 }, type: 'gem', value: 25 },
            { position: { x: 4, y: 2, z: 2 }, type: 'coin', value: 10 },
            { position: { x: 8, y: 2, z: 0 }, type: 'coin', value: 10 },
        ],
        obstacles: [
            { position: { x: -6, y: 1.5, z: 0 }, size: { x: 1, y: 2, z: 6 }, type: 'static', color: 0xe91e63 },
            { position: { x: -2, y: 1.5, z: -2 }, size: { x: 1, y: 2, z: 4 }, type: 'static', color: 0xe91e63 },
            { position: { x: 2, y: 1.5, z: 2 }, size: { x: 1, y: 2, z: 4 }, type: 'static', color: 0xe91e63 },
            { position: { x: 6, y: 1.5, z: 0 }, size: { x: 1, y: 2, z: 6 }, type: 'static', color: 0xe91e63 },
        ]
    },

    // Level 5: Moving Obstacles
    {
        name: "Danger Zone",
        startPosition: { x: 0, y: 2, z: 15 },
        goalPosition: { x: 0, y: 0.6, z: -18 },
        platforms: [
            // Main path
            { position: { x: 0, y: 0, z: 15 }, size: { x: 6, y: 1, z: 6 }, color: 0x2d2d44 },
            { position: { x: 0, y: 0, z: 7 }, size: { x: 8, y: 1, z: 10 }, color: 0x3d3d54 },
            { position: { x: 0, y: 0, z: -3 }, size: { x: 8, y: 1, z: 10 }, color: 0x3d3d54 },
            { position: { x: 0, y: 0, z: -13 }, size: { x: 8, y: 1, z: 10 }, color: 0x3d3d54 },
        ],
        collectibles: [
            { position: { x: -2, y: 2, z: 7 }, type: 'coin', value: 10 },
            { position: { x: 2, y: 2, z: 7 }, type: 'coin', value: 10 },
            { position: { x: 0, y: 2, z: -3 }, type: 'gem', value: 25 },
            { position: { x: -2, y: 2, z: -13 }, type: 'coin', value: 10 },
            { position: { x: 2, y: 2, z: -13 }, type: 'coin', value: 10 },
        ],
        obstacles: [
            {
                position: { x: 0, y: 1.5, z: 7 },
                size: { x: 6, y: 1.5, z: 1 },
                type: 'moving',
                color: 0xff5722,
                moveAxis: 'x',
                moveRange: 2,
                moveSpeed: 2
            },
            {
                position: { x: 0, y: 1.5, z: -3 },
                size: { x: 6, y: 1.5, z: 1 },
                type: 'moving',
                color: 0xff5722,
                moveAxis: 'x',
                moveRange: 2,
                moveSpeed: 2.5
            },
            {
                position: { x: 0, y: 1.5, z: -13 },
                size: { x: 6, y: 1.5, z: 1 },
                type: 'moving',
                color: 0xff5722,
                moveAxis: 'x',
                moveRange: 2,
                moveSpeed: 3
            },
        ]
    },

    // Level 6: The Maze
    {
        name: "The Maze",
        startPosition: { x: -8, y: 2, z: 8 },
        goalPosition: { x: 8, y: 0.6, z: -8 },
        platforms: [
            // Large floor
            { position: { x: 0, y: 0, z: 0 }, size: { x: 24, y: 1, z: 24 }, color: 0x2d2d44 },
        ],
        collectibles: [
            { position: { x: -4, y: 2, z: 4 }, type: 'coin', value: 10 },
            { position: { x: 4, y: 2, z: 4 }, type: 'coin', value: 10 },
            { position: { x: 0, y: 2, z: 0 }, type: 'gem', value: 50 },
            { position: { x: -4, y: 2, z: -4 }, type: 'coin', value: 10 },
            { position: { x: 4, y: 2, z: -4 }, type: 'coin', value: 10 },
        ],
        obstacles: [
            // Outer walls
            { position: { x: 0, y: 1.5, z: 10 }, size: { x: 20, y: 2, z: 1 }, type: 'static', color: 0x4a4a6a },
            { position: { x: 0, y: 1.5, z: -10 }, size: { x: 20, y: 2, z: 1 }, type: 'static', color: 0x4a4a6a },
            { position: { x: 10, y: 1.5, z: 0 }, size: { x: 1, y: 2, z: 20 }, type: 'static', color: 0x4a4a6a },
            { position: { x: -10, y: 1.5, z: 0 }, size: { x: 1, y: 2, z: 20 }, type: 'static', color: 0x4a4a6a },
            // Inner maze walls
            { position: { x: -5, y: 1.5, z: 5 }, size: { x: 8, y: 2, z: 1 }, type: 'static', color: 0x5a5a7a },
            { position: { x: 5, y: 1.5, z: 5 }, size: { x: 1, y: 2, z: 8 }, type: 'static', color: 0x5a5a7a },
            { position: { x: -2, y: 1.5, z: 0 }, size: { x: 1, y: 2, z: 8 }, type: 'static', color: 0x5a5a7a },
            { position: { x: 3, y: 1.5, z: -2 }, size: { x: 8, y: 2, z: 1 }, type: 'static', color: 0x5a5a7a },
            { position: { x: -5, y: 1.5, z: -5 }, size: { x: 1, y: 2, z: 8 }, type: 'static', color: 0x5a5a7a },
            { position: { x: 0, y: 1.5, z: -7 }, size: { x: 8, y: 2, z: 1 }, type: 'static', color: 0x5a5a7a },
        ]
    },

    // Level 7: Sky Platforms
    {
        name: "Sky High",
        startPosition: { x: 0, y: 2, z: 0 },
        goalPosition: { x: 0, y: 8.6, z: -20 },
        platforms: [
            // Ascending platforms
            { position: { x: 0, y: 0, z: 0 }, size: { x: 6, y: 1, z: 6 }, color: 0x2d2d44 },
            { position: { x: 4, y: 1.5, z: -4 }, size: { x: 4, y: 1, z: 4 }, color: 0x3d3d54 },
            { position: { x: 0, y: 3, z: -8 }, size: { x: 4, y: 1, z: 4 }, color: 0x3d3d54 },
            { position: { x: -4, y: 4.5, z: -12 }, size: { x: 4, y: 1, z: 4 }, color: 0x3d3d54 },
            { position: { x: 0, y: 6, z: -16 }, size: { x: 4, y: 1, z: 4 }, color: 0x3d3d54 },
            { position: { x: 0, y: 8, z: -20 }, size: { x: 6, y: 1, z: 6 }, color: 0x2d2d44 },
        ],
        collectibles: [
            { position: { x: 4, y: 3.5, z: -4 }, type: 'coin', value: 10 },
            { position: { x: 0, y: 5, z: -8 }, type: 'coin', value: 10 },
            { position: { x: -4, y: 6.5, z: -12 }, type: 'gem', value: 25 },
            { position: { x: 0, y: 8, z: -16 }, type: 'gem', value: 25 },
        ],
        obstacles: []
    },

    // Level 8: The Gauntlet
    {
        name: "The Gauntlet",
        startPosition: { x: 0, y: 2, z: 20 },
        goalPosition: { x: 0, y: 0.6, z: -25 },
        platforms: [
            // Start
            { position: { x: 0, y: 0, z: 20 }, size: { x: 6, y: 1, z: 6 }, color: 0x2d2d44 },
            // Section 1: Moving platforms
            {
                position: { x: 0, y: 0, z: 13 },
                size: { x: 4, y: 1, z: 4 },
                color: 0x4a4a6a,
                isMoving: true,
                moveAxis: 'x',
                moveRange: 4,
                moveSpeed: 1.5
            },
            { position: { x: 0, y: 0, z: 6 }, size: { x: 6, y: 1, z: 6 }, color: 0x2d2d44 },
            // Section 2: Narrow path with obstacles
            { position: { x: 0, y: 0, z: -2 }, size: { x: 4, y: 1, z: 12 }, color: 0x3d3d54 },
            // Section 3: Moving obstacle zone
            { position: { x: 0, y: 0, z: -12 }, size: { x: 10, y: 1, z: 8 }, color: 0x3d3d54 },
            // Section 4: Final stretch
            {
                position: { x: 0, y: 0, z: -19 },
                size: { x: 4, y: 1, z: 4 },
                color: 0x4a4a6a,
                isMoving: true,
                moveAxis: 'y',
                moveRange: 2,
                moveSpeed: 1
            },
            // End
            { position: { x: 0, y: 0, z: -25 }, size: { x: 8, y: 1, z: 6 }, color: 0x2d2d44 },
        ],
        collectibles: [
            { position: { x: 0, y: 2, z: 13 }, type: 'coin', value: 10 },
            { position: { x: 0, y: 2, z: 6 }, type: 'coin', value: 10 },
            { position: { x: 0, y: 2, z: 0 }, type: 'coin', value: 10 },
            { position: { x: -3, y: 2, z: -12 }, type: 'gem', value: 25 },
            { position: { x: 3, y: 2, z: -12 }, type: 'gem', value: 25 },
            { position: { x: 0, y: 2, z: -19 }, type: 'gem', value: 50 },
        ],
        obstacles: [
            // Narrow path obstacles
            { position: { x: 1.2, y: 1.5, z: -1 }, size: { x: 0.5, y: 2, z: 0.5 }, type: 'static', color: 0xe91e63 },
            { position: { x: -1.2, y: 1.5, z: -3 }, size: { x: 0.5, y: 2, z: 0.5 }, type: 'static', color: 0xe91e63 },
            // Moving obstacle zone
            {
                position: { x: -3, y: 1.5, z: -12 },
                size: { x: 1, y: 2, z: 6 },
                type: 'moving',
                color: 0xff5722,
                moveAxis: 'x',
                moveRange: 2,
                moveSpeed: 2
            },
            {
                position: { x: 3, y: 1.5, z: -12 },
                size: { x: 1, y: 2, z: 6 },
                type: 'moving',
                color: 0xff5722,
                moveAxis: 'x',
                moveRange: 2,
                moveSpeed: 2
            },
        ]
    },

    // Level 9: Precision
    {
        name: "Precision",
        startPosition: { x: -15, y: 2, z: 0 },
        goalPosition: { x: 15, y: 0.6, z: 0 },
        platforms: [
            // Start
            { position: { x: -15, y: 0, z: 0 }, size: { x: 4, y: 1, z: 4 }, color: 0x2d2d44 },
            // Tiny stepping stones
            { position: { x: -11, y: 0, z: 0 }, size: { x: 2, y: 1, z: 2 }, color: 0x4a4a6a },
            { position: { x: -7, y: 0.5, z: 2 }, size: { x: 2, y: 1, z: 2 }, color: 0x4a4a6a },
            { position: { x: -3, y: 1, z: 0 }, size: { x: 2, y: 1, z: 2 }, color: 0x4a4a6a },
            { position: { x: 1, y: 1.5, z: -2 }, size: { x: 2, y: 1, z: 2 }, color: 0x4a4a6a },
            { position: { x: 5, y: 1, z: 0 }, size: { x: 2, y: 1, z: 2 }, color: 0x4a4a6a },
            { position: { x: 9, y: 0.5, z: 2 }, size: { x: 2, y: 1, z: 2 }, color: 0x4a4a6a },
            { position: { x: 12, y: 0, z: 0 }, size: { x: 2, y: 1, z: 2 }, color: 0x4a4a6a },
            // End
            { position: { x: 15, y: 0, z: 0 }, size: { x: 4, y: 1, z: 4 }, color: 0x2d2d44 },
        ],
        collectibles: [
            { position: { x: -11, y: 2, z: 0 }, type: 'coin', value: 15 },
            { position: { x: -3, y: 3, z: 0 }, type: 'coin', value: 15 },
            { position: { x: 1, y: 3.5, z: -2 }, type: 'gem', value: 50 },
            { position: { x: 5, y: 3, z: 0 }, type: 'coin', value: 15 },
            { position: { x: 12, y: 2, z: 0 }, type: 'coin', value: 15 },
        ],
        obstacles: []
    },

    // Level 10: Final Challenge
    {
        name: "Final Challenge",
        startPosition: { x: 0, y: 2, z: 25 },
        goalPosition: { x: 0, y: 6.6, z: -30 },
        platforms: [
            // Start
            { position: { x: 0, y: 0, z: 25 }, size: { x: 8, y: 1, z: 8 }, color: 0x2d2d44 },
            // Moving platform section
            {
                position: { x: 0, y: 0, z: 17 },
                size: { x: 5, y: 1, z: 5 },
                color: 0x4a4a6a,
                isMoving: true,
                moveAxis: 'x',
                moveRange: 5,
                moveSpeed: 1.5
            },
            // Middle platform with obstacles
            { position: { x: 0, y: 0, z: 8 }, size: { x: 12, y: 1, z: 10 }, color: 0x3d3d54 },
            // Ascending section
            { position: { x: -5, y: 1.5, z: 0 }, size: { x: 4, y: 1, z: 4 }, color: 0x3d3d54 },
            { position: { x: 0, y: 3, z: -5 }, size: { x: 4, y: 1, z: 4 }, color: 0x3d3d54 },
            { position: { x: 5, y: 4.5, z: -10 }, size: { x: 4, y: 1, z: 4 }, color: 0x3d3d54 },
            // Moving vertical platform
            {
                position: { x: 0, y: 4, z: -16 },
                size: { x: 5, y: 1, z: 5 },
                color: 0x4a4a6a,
                isMoving: true,
                moveAxis: 'y',
                moveRange: 2,
                moveSpeed: 1
            },
            // Narrow bridge
            { position: { x: 0, y: 5, z: -23 }, size: { x: 3, y: 1, z: 10 }, color: 0x5a5a7a },
            // End platform
            { position: { x: 0, y: 6, z: -30 }, size: { x: 10, y: 1, z: 8 }, color: 0x2d2d44 },
        ],
        collectibles: [
            { position: { x: 0, y: 2, z: 17 }, type: 'coin', value: 10 },
            { position: { x: -4, y: 2, z: 8 }, type: 'coin', value: 10 },
            { position: { x: 4, y: 2, z: 8 }, type: 'coin', value: 10 },
            { position: { x: -5, y: 3.5, z: 0 }, type: 'gem', value: 25 },
            { position: { x: 0, y: 5, z: -5 }, type: 'gem', value: 25 },
            { position: { x: 5, y: 6.5, z: -10 }, type: 'gem', value: 25 },
            { position: { x: 0, y: 6, z: -16 }, type: 'gem', value: 50 },
            { position: { x: 0, y: 7, z: -23 }, type: 'gem', value: 50 },
            { position: { x: 0, y: 8, z: -30 }, type: 'gem', value: 100 },
        ],
        obstacles: [
            // Middle platform obstacles
            {
                position: { x: -3, y: 1.5, z: 8 },
                size: { x: 1, y: 2, z: 8 },
                type: 'moving',
                color: 0xe91e63,
                moveAxis: 'z',
                moveRange: 2,
                moveSpeed: 2
            },
            {
                position: { x: 3, y: 1.5, z: 8 },
                size: { x: 1, y: 2, z: 8 },
                type: 'moving',
                color: 0xe91e63,
                moveAxis: 'z',
                moveRange: 2,
                moveSpeed: 2
            },
            // Narrow bridge obstacles
            {
                position: { x: 0, y: 6.5, z: -21 },
                size: { x: 2, y: 1, z: 0.5 },
                type: 'moving',
                color: 0xff5722,
                moveAxis: 'x',
                moveRange: 0.5,
                moveSpeed: 3
            },
            {
                position: { x: 0, y: 6.5, z: -25 },
                size: { x: 2, y: 1, z: 0.5 },
                type: 'moving',
                color: 0xff5722,
                moveAxis: 'x',
                moveRange: 0.5,
                moveSpeed: 3
            },
        ]
    }
];
