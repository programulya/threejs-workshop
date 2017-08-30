var scene = (function () {
    "use strict";

    var scene = new THREE.Scene(),
        renderer = new THREE.WebGLRenderer({alpha: true}),
        camera, monkey;

    function initScene() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("container").appendChild(renderer.domElement);

        camera = new THREE.PerspectiveCamera(
            35,
            window.innerWidth / window.innerHeight,
            1,
            1000
        );

        camera.position.set(0, 0, 5);
        scene.add(camera);

        var loader = new THREE.JSONLoader();

        loader.load("monkey.json", function (geometry) {
            var material = new THREE.MeshBasicMaterial({
                color: 0xC91A58,
                wireframe: true
            });

            monkey = new THREE.Mesh(geometry, material);

            scene.add(monkey);
            render();
        });

        render();
    }

    function render() {
        monkey.rotation.y += 0.02;

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    return {
        initScene: initScene
    }
})();