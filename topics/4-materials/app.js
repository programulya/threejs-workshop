/**
 * Created by programulya on 6/16/16.
 */

var scene = (function () {
    "use strict";

    var scene = new THREE.Scene(),
        renderer = new THREE.WebGLRenderer({alpha: true}),
        light = new THREE.SpotLight(0x7D26CD),
        camera, monkey;

    function initScene() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMapEnabled = true;
        renderer.shadowMapSoft = true;

        light.castShadow = true;
        light.intensity = 2.8;
        light.position.y = 15;

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
            var material = new THREE.MeshPhongMaterial({
                color: 0xC91A58,
                ambient: 0xC93A58,
                specular: 0xC92A58,
                emissive: 0xC90A58,
                shininess: 60,
                shading: THREE.FlatShading,
                side: THREE.DoubleSide
            });

            monkey = new THREE.Mesh(geometry, material);

            scene.add(monkey);
            render();
        });

        render();
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