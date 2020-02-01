var C = {
// Properties
    previousDelta: 0,


// Methods
    start() {
        C.gameLoop();
    },

    gameLoop(currentDelta) {
        // Manage the game animation frame
        M.gameAnimationFrame = window.requestAnimationFrame(C.gameLoop);
        if(M.canPlayGameloop() === false) { return; }


        switch (M.gameState) {
            case M.INIT:
                V.init();
                M.init();
                C.calcObjectsToLoad();
                V.bindEvents();
                M.gameState = M.LOADING;
                break;

            case M.LOADING:
                if(M.objectsToLoad === 0) {
                    M.gameState = M.PLAYING;
                }
                console.log('Loading...');
                break;

            case M.PLAYING:
                M.update();
                C.render();
                break;

            case M.OVER:
                alert('La partie est terminée');
                cancelAnimationFrame(M.gameAnimationFrame);
                break;
        }


        C.previousDelta = currentDelta;
    },

    render() {
        // On efface le canvas
        V.clearView();

        // Rendu de l'arrière-plan
        V.drawObject(M.background);

        // Rendu du joueur
        V.drawAnimatedObject(M.player);

        // M.objects.forEach(V.drawImage);
    },

    calcObjectsToLoad() {
        // Equal to all the sounds (M.SOUNDS_SOURCES.length)
        M.objectsToLoad = Object.keys(M.SOUNDS_SOURCES).length;
    },

    objectLoaded() {
        M.objectsLoaded++;
        if(M.objectsLoaded === M.objectsToLoad) {
            M.gameState = M.PLAYING;
        }
    },

    // Events handler
    handler_keydown(event) {
        switch(event.key) {
            case "ArrowLeft":
                M.left = true;
                break;
            case 'ArrowRight':
                M.right = true;
                break;
            case 'ArrowUp':
                M.up = true;
                break;
            case 'ArrowDown':
                M.down = true;
                break;
        }
    },

    handler_keyup(event) {
        switch(event.key) {
            case "ArrowLeft":
                M.left = false;
                break;
            case 'ArrowRight':
                M.right = false;
                break;
            case 'ArrowUp':
                M.up = false;
                break;
            case 'ArrowDown':
                M.down = false;
                break;
        }
    },

    // Getters
    getGameSize() {
        return {
            WIDTH: M.GAME_WIDTH,
            HEIGHT: M.GAME_HEIGHT
        };
    }
};
