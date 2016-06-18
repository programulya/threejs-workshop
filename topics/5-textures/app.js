/**
 * Created by programulya on 6/16/16.
 */

var scene = (function () {
    "use strict";

    var scene = new THREE.Scene(),
        renderer = new THREE.WebGLRenderer({alpha: true}),
        light = new THREE.AmbientLight(0xffffff),
        camera, earth;

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

        camera.position.z = 150;
        camera.rotation.z = -40;

        scene.add(camera);

        var loader = new THREE.TextureLoader();
        loader.load('earth.jpg', function (texture) {
            var geometry = new THREE.SphereGeometry(30, 30, 30);
            var material = new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5});
            earth = new THREE.Mesh(geometry, material);

            scene.add(earth);
            render();
        });
    }

    function render() {
        earth.rotation.y += 0.002;

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    return {
        initScene: initScene
    }
})();