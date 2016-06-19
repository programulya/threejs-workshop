/**
 * Created by programulya on 6/16/19.
 */

var scene = (function () {
    "use strict";

    var scene = new THREE.Scene(),
        renderer = new THREE.WebGLRenderer({alpha: true}),
        light = new THREE.AmbientLight(0xffffff),
        camera, monster, controls, stats;

    function initScene() {
        var container = document.getElementById("container");
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        stats = new Stats();
        container.appendChild(stats.dom);

        scene.add(light);

        camera = new THREE.PerspectiveCamera(
            35,
            window.innerWidth / window.innerHeight,
            1,
            100000
        );

        camera.position.set(0, 0, 6000);
        scene.add(camera);

        controls = new THREE.TrackballControls(camera);

        var loader = new THREE.JSONLoader();

        loader.load("monster/monster.json", function (geometry, materials) {
            var material = new THREE.MeshFaceMaterial(materials);

            monster = new THREE.Mesh(geometry, material);

            var axisHelper = new THREE.AxisHelper(500);
            scene.add(axisHelper);

            scene.add(monster);
            render();
        });

        render();
    }

    function render() {
        stats.begin();
        renderer.render(scene, camera);
        stats.end();
        requestAnimationFrame(render);

        controls.update();
    }

    return {
        initScene: initScene
    }
})();