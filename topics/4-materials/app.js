/**
 * Created by programulya on 6/16/16.
 */

var scene = (function () {
    "use strict";

    var scene = new THREE.Scene(),
        renderer = new THREE.WebGLRenderer(),
        light = new THREE.AmbientLight(0xffffff),
        camera, monkey;

    function initScene() {
        renderer.setSize(window.innerWidth, window.innerHeight);

        document.getElementById("container").appendChild(renderer.domElement);

        scene.add(light);

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
            var g = geometry;

                var material = new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5});
                monkey = new THREE.Mesh(g, material);

                scene.add(monkey);
                render();
            });
        }
    }

    function render() {
        monkey.rotation.x += 0.02;
        monkey.rotation.y += 0.02;
        monkey.rotation.z += 0.02;

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    return {
        initScene: initScene
    }
})();