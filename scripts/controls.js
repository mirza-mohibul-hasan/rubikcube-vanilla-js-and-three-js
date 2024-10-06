import * as THREE from "three";

export const setupControls = (scene, camera, cubes, pivot, controls) => {
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const radStep = Math.PI / 2 / 50;

  const draggable = {
    isDragging: false,
    cube: null,
    direction: null,
    mouseX: 0,
    mouseY: 0,
  };

  const pan = {
    isPanning: false,
    mouseX: 0,
    mouseY: 0,
  };

  const onMouseDown = (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);

    const intersects = raycaster.intersectObjects(cubes, false);

    if (draggable.intersect == null) {
      draggable.intersect = intersects[0];
    }

    if (intersects.length > 0) {
      controls.enabled = false;

      draggable.isDragging = true;
      draggable.mouseX = event.clientX;
      draggable.mouseY = event.clientY;

      draggable.cube = intersects[0].object;

      const intersectPoint = new THREE.Vector3(
        ...intersects[0].point.toArray().map((c) => +c.toFixed(3))
      );
      const objPos = new THREE.Vector3(
        ...intersects[0].object.position.toArray().map((c) => +c.toFixed(3))
      );

      if (intersectPoint.z == objPos.z + 1) {
        draggable.direction = "front";
      } else if (intersectPoint.y == objPos.y + 1) {
        draggable.direction = "top";
      } else if (intersectPoint.x == objPos.x + 1) {
        draggable.direction = "side";
      }
    } else if (!controls.enabled) {
      pan.isPanning = true;
      pan.mouseX = event.clientX;
      pan.mouseY = event.clientY;
    }
  };

  const onMouseUp = () => {
    draggable.isDragging = false;
    pan.isPanning = false;
  };

  const onMouseMove = (event) => {
    if (draggable.isDragging) {
      if (
        event.clientY > draggable.mouseY + 50 ||
        event.clientY < draggable.mouseY - 50
      ) {
        if (draggable.direction == "side") {
          doRotation(
            "z",
            Math.sign(event.clientY - draggable.mouseY) * -1,
            draggable.cube,
            cubes,
            pivot,
            scene
          );
          draggable.isDragging = false;
        } else if (draggable.direction == "front") {
          doRotation(
            "x",
            Math.sign(event.clientY - draggable.mouseY),
            draggable.cube,
            cubes,
            pivot,
            scene
          );
          draggable.isDragging = false;
        }
      } else if (
        (event.clientX > draggable.mouseX + 20 &&
          event.clientY < draggable.mouseY - 20) ||
        (event.clientX < draggable.mouseX - 20 &&
          event.clientY > draggable.mouseY + 20)
      ) {
        if (draggable.direction == "top") {
          doRotation(
            "x",
            Math.sign(event.clientX - draggable.mouseX) * -1,
            draggable.cube,
            cubes,
            pivot,
            scene
          );
          draggable.isDragging = false;
        } else {
          doRotation(
            "y",
            Math.sign(event.clientX - draggable.mouseX),
            draggable.cube,
            cubes,
            pivot,
            scene
          );
          draggable.isDragging = false;
        }
      } else if (
        (event.clientX < draggable.mouseX - 20 &&
          event.clientY < draggable.mouseY - 20) ||
        (event.clientX > draggable.mouseX + 20 &&
          event.clientY > draggable.mouseY + 20)
      ) {
        if (draggable.direction == "top") {
          doRotation(
            "z",
            Math.sign(event.clientX - draggable.mouseX) * -1,
            draggable.cube,
            cubes,
            pivot,
            scene
          );
          draggable.isDragging = false;
        } else {
          doRotation(
            "y",
            Math.sign(event.clientY - draggable.mouseY),
            draggable.cube,
            cubes,
            pivot,
            scene
          );
          draggable.isDragging = false;
        }
      }
    } else if (pan.isPanning) {
      if (event.clientX > pan.mouseX + 20 || event.clientX < pan.mouseX - 20) {
        for (let i = 0; i < 27; i++) {
          pivot.attach(cubes[i]);
        }

        rotateOnAxis("y", Math.sign(event.clientX - pan.mouseX), pivot, scene);

        pan.isPanning = false;
      } else if (
        event.clientY > pan.mouseY + 20 ||
        event.clientY < pan.mouseY - 20
      ) {
        for (let i = 0; i < 27; i++) {
          pivot.attach(cubes[i]);
        }

        if (event.clientX > window.innerWidth / 2) {
          rotateOnAxis(
            "z",
            Math.sign(event.clientY - pan.mouseY) * -1,
            pivot,
            scene
          );
        } else {
          rotateOnAxis(
            "x",
            Math.sign(event.clientY - pan.mouseY),
            pivot,
            scene
          );
        }

        pan.isPanning = false;
      }
    }
  };

  window.addEventListener("pointerdown", onMouseDown);
  window.addEventListener("pointermove", onMouseMove);
  window.addEventListener("pointerup", onMouseUp);

  return { draggable, pan };
};

export const doRotation = (axis, direction, cube, cubes, pivot, scene) => {
  for (let i = 0; i < 27; i++) {
    if (Math.abs(cubes[i].position[axis] - cube.position[axis]) < 1) {
      pivot.attach(cubes[i]);
    }
  }
  rotateOnAxis(axis, direction, pivot, scene);
};

const rotateOnAxis = (
  axis,
  direction,
  pivot,
  scene,
  angle = Math.PI / 2,
  done = 0
) => {
  const radStep = Math.PI / 2 / 50;
  if (done >= angle) {
    let len = pivot.children.length;
    for (let i = 0; i < len; i++) {
      scene.attach(pivot.children[0]);
    }

    pivot.rotation.set(0, 0, 0);

    return;
  }

  done += radStep;

  switch (axis) {
    case "x":
      pivot.rotateX(radStep * direction);
      break;
    case "y":
      pivot.rotateY(radStep * direction);
      break;
    case "z":
      pivot.rotateZ(radStep * direction);
      break;
  }

  requestAnimationFrame(() =>
    rotateOnAxis(axis, direction, pivot, scene, angle, done)
  );
};
