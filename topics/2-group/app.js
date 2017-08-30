var scene = (function () {
    "use strict";

    var scene = new THREE.Scene(),
        renderer = new THREE.WebGLRenderer({alpha: true}),
        camera, group;

    var mouseX = 0, mouseY = 0;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    function initScene() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("container").appendChild(renderer.domElement);

        camera = new THREE.PerspectiveCamera(
            35,
            window.innerWidth / window.innerHeight,
            1,
            1000
        );

        camera.position.x = -80;
        camera.position.z = 200;
        scene.add(camera);

        var geometry = new THREE.BoxGeometry(100, 100, 100);
        var material = new THREE.MeshNormalMaterial({overdraw: 0.5});

        group = new THREE.Group();

        for (var i = 0; i < 200; i++) {
            var mesh = new THREE.Mesh(geometry, material);

            mesh.position.x = Math.random() * 2000 - 1000;
            mesh.position.y = Math.random() * 2000 - 1000;
            mesh.position.z = Math.random() * 2000 - 1000;
            mesh.rotation.x = Math.random() * 2 * Math.PI;
            mesh.rotation.y = Math.random() * 2 * Math.PI;
            mesh.matrixAutoUpdate = false;

            mesh.updateMatrix();
            group.add(mesh);
        }

        scene.add(group);

        document.addEventListener('mousemove', onDocumentMouseMove, false);
        render();
    }

    function onDocumentMouseMove(event) {
        mouseX = (event.clientX - windowHalfX) * 10;
        mouseY = (event.clientY - windowHalfY) * 10;
    }

    function render() {
        camera.position.x += (mouseX - camera.position.x) * .05;
        camera.position.y += (-mouseY - camera.position.y) * .05;
        camera.lookAt(scene.position);

        var currentSeconds = Date.now();
        group.rotation.x = Math.sin(currentSeconds * 0.0007) * 0.5;
        group.rotation.y = Math.sin(currentSeconds * 0.0003) * 0.5;
        group.rotation.z = Math.sin(currentSeconds * 0.0002) * 0.5;

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    return {
        initScene: initScene
    }
})();