// the set of combos in each level
const levelCombos = [
    // Normal Level - 110 difference in coordinates
    [
        { arrow: "→", startPos: { x: 100, y: 50 }, hitPos: { x: 210, y: 160 }, velocity: 1 },
    ],
    [
        { arrow: "→", startPos: { x: 100, y: 50 }, hitPos: { x: 210, y: 160 }, velocity: 1 },
        { arrow: "↑", startPos: { x: 360, y: 270 }, hitPos: { x: 250, y: 160 }, velocity: -1 },
    ],
    [
        { arrow: "→", startPos: { x: 100, y: 50 }, hitPos: { x: 210, y: 160 }, velocity: 1 },
        { arrow: "↑", startPos: { x: 180, y: 50 }, hitPos: { x: 290, y: 160 }, velocity: 1 },
        { arrow: "←", startPos: { x: 100, y: 50 }, hitPos: { x: 210, y: 160 }, velocity: 1 },
    ],
    [
        { arrow: "→", startPos: { x: 210, y: 180 }, hitPos: { x: 100, y: 70 }, velocity: -1 },
        { arrow: "→", startPos: { x: 250, y: 180 }, hitPos: { x: 140, y: 70 }, velocity: -1 },
        { arrow: "↑", startPos: { x: 290, y: 180 }, hitPos: { x: 180, y: 70 }, velocity: -1 },
        { arrow: "↓", startPos: { x: 320, y: 180 }, hitPos: { x: 210, y: 70 }, velocity: -1 },
    ],
    [
        { arrow: "↑", startPos: { x: 140, y: 90 }, hitPos: { x: 250, y: 200 }, velocity: 1 },
        { arrow: "→", startPos: { x: 100, y: 90 }, hitPos: { x: 210, y: 200 }, velocity: 1 },
        { arrow: "↓", startPos: { x: 160, y: 90 }, hitPos: { x: 270, y: 200 }, velocity: 1 },
        { arrow: "←", startPos: { x: 120, y: 90 }, hitPos: { x: 230, y: 200 }, velocity: 1 },
    ],
    [
        { arrow: "↑", startPos: { x: 140, y: 20 }, hitPos: { x: 250, y: 130 }, velocity: 1 },
        { arrow: "→", startPos: { x: 100, y: 20 }, hitPos: { x: 210, y: 130 }, velocity: 1 },
        { arrow: "↓", startPos: { x: 160, y: 20 }, hitPos: { x: 270, y: 130 }, velocity: 1 },
        { arrow: "→", startPos: { x: 120, y: 20 }, hitPos: { x: 230, y: 130 }, velocity: 1 },
    ],
    [
        { arrow: "→", startPos: { x: 350, y: 110 }, hitPos: { x: 460, y: 220 }, velocity: 1 },
        { arrow: "↓", startPos: { x: 170, y: 330 }, hitPos: { x: 60, y: 220 }, velocity: -1 },
        { arrow: "↑", startPos: { x: 170, y: 180 }, hitPos: { x: 60, y: 70 }, velocity: -1 },
        { arrow: "→", startPos: { x: 350, y: -40 }, hitPos: { x: 460, y: 70 }, velocity: 1 },
    ],
    [
        { arrow: "↑", startPos: { x: 390, y: 20 }, hitPos: { x: 500, y: 130 }, velocity: 1 },
        { arrow: "→", startPos: { x: 350, y: 40 }, hitPos: { x: 460, y: 150 }, velocity: 1 },
        { arrow: "↓", startPos: { x: 310, y: 20 }, hitPos: { x: 420, y: 130 }, velocity: 1 },
        { arrow: "→", startPos: { x: 270, y: 40 }, hitPos: { x: 380, y: 150 }, velocity: 1 },
    ],
    [
        { arrow: "↓", startPos: { x: 320, y: 270 }, hitPos: { x: 210, y: 160 }, velocity: -1 },
        { arrow: "↑", startPos: { x: 180, y: 50 }, hitPos: { x: 290, y: 160 }, velocity: 1 },
        { arrow: "↑", startPos: { x: 320, y: 270 }, hitPos: { x: 210, y: 160 }, velocity: -1 },
        { arrow: "↓", startPos: { x: 400, y: 270 }, hitPos: { x: 290, y: 160 }, velocity: -1 },
        { arrow: "↑", startPos: { x: 100, y: 50 }, hitPos: { x: 210, y: 160 }, velocity: 1 },
    ],
    [
        { arrow: "↑", startPos: { x: 400, y: 270 }, hitPos: { x: 290, y: 160 }, velocity: -1 },
        { arrow: "↓", startPos: { x: 320, y: 270 }, hitPos: { x: 210, y: 160 }, velocity: -1 },
        { arrow: "↑", startPos: { x: 180, y: 50 }, hitPos: { x: 290, y: 160 }, velocity: 1 },
        { arrow: "↑", startPos: { x: 320, y: 270 }, hitPos: { x: 210, y: 160 }, velocity: -1 },
    ],
    [
        { arrow: "↑", startPos: { x: 390, y: 20 }, hitPos: { x: 500, y: 130 }, velocity: 1 },
        { arrow: "→", startPos: { x: 350, y: 40 }, hitPos: { x: 460, y: 150 }, velocity: 1 },
        { arrow: "↓", startPos: { x: 310, y: 20 }, hitPos: { x: 420, y: 130 }, velocity: 1 },
        { arrow: "→", startPos: { x: 320, y: 260 }, hitPos: { x: 210, y: 150 }, velocity: -1 },
        { arrow: "↓", startPos: { x: 280, y: 240 }, hitPos: { x: 170, y: 130 }, velocity: -1 },
        { arrow: "→", startPos: { x: 240, y: 260 }, hitPos: { x: 130, y: 150 }, velocity: -1 },
    ],
    [
        { arrow: "→", startPos: { x: 100, y: 50 }, hitPos: { x: 210, y: 160 }, velocity: 1 },
        { arrow: "→", startPos: { x: 140, y: 50 }, hitPos: { x: 250, y: 160 }, velocity: 1 },
        { arrow: "↑", startPos: { x: 180, y: 50 }, hitPos: { x: 290, y: 160 }, velocity: 1 },
        { arrow: "↓", startPos: { x: 210, y: 50 }, hitPos: { x: 320, y: 160 }, velocity: 1 },
    ],
    [
        { arrow: "↑", startPos: { x: 180, y: 50 }, hitPos: { x: 290, y: 160 }, velocity: 1 },
        { arrow: "↓", startPos: { x: 210, y: 50 }, hitPos: { x: 320, y: 160 }, velocity: 1 },
        { arrow: "←", startPos: { x: 140, y: 50 }, hitPos: { x: 250, y: 160 }, velocity: 1 },
        { arrow: "←", startPos: { x: 100, y: 50 }, hitPos: { x: 210, y: 160 }, velocity: 1 },
    ],
    [
        { arrow: "↑", startPos: { x: 360, y: 260 }, hitPos: { x: 250, y: 150 }, velocity: -1 },
        { arrow: "→", startPos: { x: 130, y: 40 }, hitPos: { x: 240, y: 150 }, velocity: 1 },
        { arrow: "↓", startPos: { x: 140, y: 40 }, hitPos: { x: 250, y: 150 }, velocity: 1 },
        { arrow: "←", startPos: { x: 350, y: 260 }, hitPos: { x: 240, y: 150 }, velocity: -1 },
    ],
    [
        { arrow: "↑", startPos: { x: 360, y: 260 }, hitPos: { x: 250, y: 150 }, velocity: -1 },
        { arrow: "→", startPos: { x: 130, y: 40 }, hitPos: { x: 240, y: 150 }, velocity: 1 },
        { arrow: "↓", startPos: { x: 140, y: 40 }, hitPos: { x: 250, y: 150 }, velocity: 1 },
        { arrow: "←", startPos: { x: 350, y: 260 }, hitPos: { x: 240, y: 150 }, velocity: -1 }
    ],
    [
        { arrow: "←", startPos: { x: 350, y: 260 }, hitPos: { x: 240, y: 150 }, velocity: -1 },
        { arrow: "↓", startPos: { x: 140, y: 40 }, hitPos: { x: 250, y: 150 }, velocity: 1 },
        { arrow: "→", startPos: { x: 130, y: 40 }, hitPos: { x: 240, y: 150 }, velocity: 1 },
        { arrow: "↑", startPos: { x: 360, y: 260 }, hitPos: { x: 250, y: 150 }, velocity: -1 },

    ],

    // Hard Level - 175 difference in coordinates
    [
        { arrow: "→", startPos: { x: 275, y: 245 }, hitPos: { x: 100, y: 70 }, velocity: -1 },
        { arrow: "←", startPos: { x: 315, y: 245 }, hitPos: { x: 140, y: 70 }, velocity: -1 },
        { arrow: "↑", startPos: { x: 355, y: 245 }, hitPos: { x: 180, y: 70 }, velocity: -1 },
        { arrow: "↓", startPos: { x: 385, y: 245 }, hitPos: { x: 210, y: 70 }, velocity: -1 },
    ],
    [
        { arrow: "→", startPos: { x: 275, y: 245 }, hitPos: { x: 100, y: 70 }, velocity: -1 },
        { arrow: "←", startPos: { x: 315, y: 245 }, hitPos: { x: 140, y: 70 }, velocity: -1 },
        { arrow: "↑", startPos: { x: 355, y: 245 }, hitPos: { x: 180, y: 70 }, velocity: -1 },
        { arrow: "↓", startPos: { x: 385, y: 245 }, hitPos: { x: 210, y: 70 }, velocity: -1 },
    ],
    [
        { arrow: "↑", startPos: { x: 315, y: 375 }, hitPos: { x: 140, y: 200 }, velocity: -1 },
        { arrow: "←", startPos: { x: -35, y: -5 }, hitPos: { x: 140, y: 170 }, velocity: 1 },
        { arrow: "→", startPos: { x: -35, y: -35 }, hitPos: { x: 140, y: 140 }, velocity: 1 },
        { arrow: "→", startPos: { x: 315, y: 285 }, hitPos: { x: 140, y: 110 }, velocity: -1 },
    ],
    [
        { arrow: "↑", startPos: { x: 635, y: 245 }, hitPos: { x: 460, y: 70 }, velocity: -1 },
        { arrow: "→", startPos: { x: 605, y: 245 }, hitPos: { x: 430, y: 70 }, velocity: -1 },
        { arrow: "↑", startPos: { x: 225, y: -105 }, hitPos: { x: 400, y: 70 }, velocity: 1 },
        { arrow: "→", startPos: { x: 195, y: -105 }, hitPos: { x: 370, y: 70 }, velocity: 1 },
    ],
    [
        { arrow: "←", startPos: { x: 75, y: -25 }, hitPos: { x: 250, y: 150 }, velocity: 1 },
        { arrow: "↑", startPos: { x: 425, y: 325 }, hitPos: { x: 250, y: 150 }, velocity: -1 },
        { arrow: "↓", startPos: { x: 425, y: 325 }, hitPos: { x: 250, y: 150 }, velocity: -1 },
        { arrow: "→", startPos: { x: 75, y: -25 }, hitPos: { x: 250, y: 150 }, velocity: 1 },
    ],
    [
        { arrow: "↓", startPos: { x: 250, y: 40 }, hitPos: { x: 425, y: 215 }, velocity: 1 },
        { arrow: "↓", startPos: { x: 250, y: 40 }, hitPos: { x: 425, y: 215 }, velocity: 1 },
        { arrow: "↓", startPos: { x: 250, y: 40 }, hitPos: { x: 425, y: 215 }, velocity: 1 },
        { arrow: "↓", startPos: { x: 250, y: 40 }, hitPos: { x: 425, y: 215 }, velocity: 1 },
    ],
    [
        { arrow: "↑", startPos: { x: 425, y: 245 }, hitPos: { x: 250, y: 70 }, velocity: -1 },
        { arrow: "↑", startPos: { x: 425, y: 245 }, hitPos: { x: 250, y: 70 }, velocity: -1 },
        { arrow: "↑", startPos: { x: 425, y: 245 }, hitPos: { x: 250, y: 70 }, velocity: -1 },
        { arrow: "↑", startPos: { x: 425, y: 245 }, hitPos: { x: 250, y: 70 }, velocity: -1 },
    ],
    [
        { arrow: "←", startPos: { x: -75, y: -75 }, hitPos: { x: 100, y: 100 }, velocity: 1 },
        { arrow: "←", startPos: { x: -35, y: -85 }, hitPos: { x: 140, y: 90 }, velocity: 1 },
        { arrow: "→", startPos: { x: 355, y: 255 }, hitPos: { x: 180, y: 80 }, velocity: -1 },
        { arrow: "→", startPos: { x: 35, y: -105 }, hitPos: { x: 210, y: 70 }, velocity: 1 },
    ],
    [
        { arrow: "→", startPos: { x: 375, y: 245 }, hitPos: { x: 200, y: 70 }, velocity: -1 },
        { arrow: "←", startPos: { x: 455, y: 255 }, hitPos: { x: 280, y: 80 }, velocity: -1 },
        { arrow: "←", startPos: { x: 185, y: -85 }, hitPos: { x: 360, y: 90 }, velocity: 1 },
        { arrow: "→", startPos: { x: 245, y: -75 }, hitPos: { x: 420, y: 100 }, velocity: 1 },
    ],
    [
        { arrow: "→", startPos: { x: 195, y: -105 }, hitPos: { x: 370, y: 70 }, velocity: 1 },
        { arrow: "↑", startPos: { x: 225, y: -105 }, hitPos: { x: 400, y: 70 }, velocity: 1 },
        { arrow: "→", startPos: { x: 605, y: 245 }, hitPos: { x: 430, y: 70 }, velocity: -1 },
        { arrow: "↑", startPos: { x: 635, y: 245 }, hitPos: { x: 460, y: 70 }, velocity: -1 },
    ],
    [
        { arrow: "→", startPos: { x: 315, y: 285 }, hitPos: { x: 140, y: 110 }, velocity: -1 },
        { arrow: "→", startPos: { x: -35, y: -35 }, hitPos: { x: 140, y: 140 }, velocity: 1 },
        { arrow: "←", startPos: { x: -35, y: -5 }, hitPos: { x: 140, y: 170 }, velocity: 1 },
        { arrow: "↑", startPos: { x: 315, y: 375 }, hitPos: { x: 140, y: 200 }, velocity: -1 },
    ],
    [
        { arrow: "→", startPos: { x: 425, y: 275 }, hitPos: { x: 250, y: 100 }, velocity: -1 },
        { arrow: "←", startPos: { x: 425, y: 305 }, hitPos: { x: 250, y: 130 }, velocity: -1 },
        { arrow: "↓", startPos: { x: 435, y: 335 }, hitPos: { x: 260, y: 160 }, velocity: -1 },
        { arrow: "↑", startPos: { x: 435, y: 365 }, hitPos: { x: 260, y: 190 }, velocity: -1 },
    ],
    [
        { arrow: "→", startPos: { x: 335, y: 325 }, hitPos: { x: 160, y: 150 }, velocity: -1 },
        { arrow: "←", startPos: { x: 365, y: 335 }, hitPos: { x: 190, y: 160 }, velocity: -1 },
        { arrow: "↑", startPos: { x: 385, y: 345 }, hitPos: { x: 210, y: 170 }, velocity: -1 },
        { arrow: "↓", startPos: { x: 65, y: 5 }, hitPos: { x: 240, y: 180 }, velocity: 1 },
        { arrow: "↑", startPos: { x: 95, y: 15 }, hitPos: { x: 270, y: 190 }, velocity: 1 },
        { arrow: "↓", startPos: { x: 125, y: 25 }, hitPos: { x: 300, y: 200 }, velocity: 1 },
    ],
    [
        { arrow: "↑", startPos: { x: 275, y: 245 }, hitPos: { x: 100, y: 70 }, velocity: -1 },
        { arrow: "↓", startPos: { x: 310, y: 285 }, hitPos: { x: 140, y: 110 }, velocity: -1 },
        { arrow: "↑", startPos: { x: 355, y: 325 }, hitPos: { x: 180, y: 150 }, velocity: -1 },
        { arrow: "←", startPos: { x: 395, y: 365 }, hitPos: { x: 220, y: 190 }, velocity: -1 },
    ],
    [
        { arrow: "→", startPos: { x: 435, y: 405 }, hitPos: { x: 260, y: 230 }, velocity: -1 },
        { arrow: "←", startPos: { x: 475, y: 365 }, hitPos: { x: 300, y: 190 }, velocity: -1 },
        { arrow: "↑", startPos: { x: 515, y: 325 }, hitPos: { x: 340, y: 150 }, velocity: -1 },
        { arrow: "↓", startPos: { x: 205, y: -65 }, hitPos: { x: 380, y: 110 }, velocity: 1 },
    ],
    [
        { arrow: "←", startPos: { x: 245, y: -105 }, hitPos: { x: 420, y: 70 }, velocity: 1 },
        { arrow: "→", startPos: { x: 285, y: -65 }, hitPos: { x: 460, y: 110 }, velocity: 1 },
        { arrow: "↓", startPos: { x: 325, y: -25 }, hitPos: { x: 500, y: 150 }, velocity: 1 },
        { arrow: "→", startPos: { x: 285, y: 15 }, hitPos: { x: 460, y: 190 }, velocity: 1 },
    ],
    [
        { arrow: "→", startPos: { x: 275, y: 55 }, hitPos: { x: 450, y: 230 }, velocity: 1 },
        { arrow: "←", startPos: { x: 205, y: 245 }, hitPos: { x: 30, y: 70 }, velocity: -1 },
        { arrow: "→", startPos: { x: 245, y: 55 }, hitPos: { x: 420, y: 230 }, velocity: 1 },
        { arrow: "←", startPos: { x: 235, y: 245 }, hitPos: { x: 60, y: 70 }, velocity: -1 },
    ],
    [
        { arrow: "→", startPos: { x: 215, y: 55 }, hitPos: { x: 390, y: 230 }, velocity: 1 },
        { arrow: "←", startPos: { x: 265, y: 245 }, hitPos: { x: 90, y: 70 }, velocity: -1 },
        { arrow: "→", startPos: { x: 185, y: 55 }, hitPos: { x: 360, y: 230 }, velocity: 1 },
        { arrow: "←", startPos: { x: 295, y: 245 }, hitPos: { x: 120, y: 70 }, velocity: -1 },
    ],
    [
        { arrow: "←", startPos: { x: 295, y: 245 }, hitPos: { x: 120, y: 70 }, velocity: -1 },
        { arrow: "→", startPos: { x: 185, y: 55 }, hitPos: { x: 360, y: 230 }, velocity: 1 },
        { arrow: "←", startPos: { x: 265, y: 245 }, hitPos: { x: 90, y: 70 }, velocity: -1 },
        { arrow: "→", startPos: { x: 215, y: 55 }, hitPos: { x: 390, y: 230 }, velocity: 1 },
    ],
    [
        { arrow: "←", startPos: { x: 235, y: 245 }, hitPos: { x: 60, y: 70 }, velocity: -1 },
        { arrow: "→", startPos: { x: 245, y: 55 }, hitPos: { x: 420, y: 230 }, velocity: 1 },
        { arrow: "←", startPos: { x: 205, y: 245 }, hitPos: { x: 30, y: 70 }, velocity: -1 },
        { arrow: "→", startPos: { x: 275, y: 55 }, hitPos: { x: 450, y: 230 }, velocity: 1 },
    ],
]