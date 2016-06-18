/**
 * Created by programulya on 6/18/16.
 */

var scene = (function () {
    "use strict";

    var scene = new THREE.Scene(),
        renderer = window.WebGLRenderingContext ?
            new THREE.WebGLRenderer() :
            new THREE.CanvasRenderer(),
        light = new THREE.PointLight(0xffffff),
        camera,
        box;

    function initScene() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("container").appendChild(renderer.domElement);

        //scene.add(light);

        camera = new THREE.PerspectiveCamera(
            35,
            window.innerWidth / window.innerHeight,
            1,
            1000);

        camera.position.x = 10;
        camera.position.y = 5;
        camera.position.z = 100;

        scene.add(camera);

        box = new THREE.Mesh(
            new THREE.BoxGeometry(10, 10, 10),
            new THREE.MeshLambertMaterial({
                color: 0xC91A58,
                ambient: 0xC93A58,
                specular: 0xC92A58,
                emissive: 0xC90A58,
                shininess: 60,
                shading: THREE.FlatShading,
                side: THREE.DoubleSide
            })
        );

        scene.add(box);

        var axisHelper = new THREE.AxisHelper(500);
        scene.add(axisHelper);

        render();
    }

    function render() {
        box.rotation.x += 0.01;
        box.rotation.y += 0.01;
        box.rotation.z += 0.01;

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    return {
        initScene: initScene
    }
})();