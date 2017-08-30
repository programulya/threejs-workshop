var scene = (function () {
    "use strict";

    var scene = new THREE.Scene(),
        renderer = new THREE.WebGLRenderer({alpha: true}),
        light = new THREE.AmbientLight(0xffffff),
        mouse = new THREE.Vector2(),
        raycaster = new THREE.Raycaster(),
        camera,
        objects = [],
        sphere,
        sphere2;

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
        scene.add(camera);

        sphere = new THREE.Mesh(new THREE.SphereGeometry(20, 16, 16),
            new THREE.MeshBasicMaterial({
                color: 0xff0000, wireframe: true
            }));

        sphere.position.set(-25, 0, 0);

        objects.push(sphere);

        sphere2 = new THREE.Mesh(new THREE.SphereGeometry(20, 16, 16), new THREE.MeshBasicMaterial({
            color: 0x00ff00, wireframe: true
        }));

        sphere2.position.set(25, 0, 0);

        objects.push(sphere2);

        scene.add(sphere);
        scene.add(sphere2);

        window.addEventListener('mousedown', onDocumentMouseDown, false);
        render();
    }

    function onDocumentMouseDown(event) {
        mouse.x = (event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
        mouse.y = -(event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        var intersects = raycaster.intersectObjects(objects);

        if (intersects.length > 0) {
            intersects[0].object.material.color.setHex(Math.random() * 0xffffff);
        }
    }

    function render() {
        sphere.rotation.x += 0.02;
        sphere2.rotation.y += 0.02;

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    return {
        initScene: initScene
    }
})();