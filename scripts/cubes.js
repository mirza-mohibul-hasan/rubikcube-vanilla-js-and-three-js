import * as THREE from "three";

export const createCubes = (scene, pivot) => {
  const cubes = [];
  const cubesColors = [
    [
      [
        [0x000000, 0xffd500, 0x000000, 0x0045ad, 0x000000, 0x009b48],
        [0x000000, 0xffd500, 0x000000, 0x0045ad, 0x000000, 0x000000],
        [0x000000, 0xffd500, 0x000000, 0x0045ad, 0xff5900, 0x000000],
      ],
      [
        [0x000000, 0xffd500, 0x000000, 0x000000, 0x000000, 0x009b48],
        [0x000000, 0xffd500, 0x000000, 0x000000, 0x000000, 0x000000],
        [0x000000, 0xffd500, 0x000000, 0x000000, 0xff5900, 0x000000],
      ],
      [
        [0x000000, 0xffd500, 0xb90000, 0x000000, 0x000000, 0x009b48],
        [0x000000, 0xffd500, 0xb90000, 0x000000, 0x000000, 0x000000],
        [0x000000, 0xffd500, 0xb90000, 0x000000, 0xff5900, 0x000000],
      ],
    ],
    [
      [
        [0x000000, 0x000000, 0x000000, 0x0045ad, 0x000000, 0x009b48],
        [0x000000, 0x000000, 0x000000, 0x0045ad, 0x000000, 0x000000],
        [0x000000, 0x000000, 0x000000, 0x0045ad, 0xff5900, 0x000000],
      ],
      [
        [0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x009b48],
        [0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000],
        [0x000000, 0x000000, 0x000000, 0x000000, 0xff5900, 0x000000],
      ],
      [
        [0x000000, 0x000000, 0xb90000, 0x000000, 0x000000, 0x009b48],
        [0x000000, 0x000000, 0xb90000, 0x000000, 0x000000, 0x000000],
        [0x000000, 0x000000, 0xb90000, 0x000000, 0xff5900, 0x000000],
      ],
    ],
    [
      [
        [0xffffff, 0x000000, 0x000000, 0x0045ad, 0x000000, 0x009b48],
        [0xffffff, 0x000000, 0x000000, 0x0045ad, 0x000000, 0x000000],
        [0xffffff, 0x000000, 0x000000, 0x0045ad, 0xff5900, 0x000000],
      ],
      [
        [0xffffff, 0x000000, 0x000000, 0x000000, 0x000000, 0x009b48],
        [0xffffff, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000],
        [0xffffff, 0x000000, 0x000000, 0x000000, 0xff5900, 0x000000],
      ],
      [
        [0xffffff, 0x000000, 0xb90000, 0x000000, 0x000000, 0x009b48],
        [0xffffff, 0x000000, 0xb90000, 0x000000, 0x000000, 0x000000],
        [0xffffff, 0x000000, 0xb90000, 0x000000, 0xff5900, 0x000000],
      ],
    ],
  ];

  const geometry = new THREE.BoxGeometry(2, 2, 2);

  const getMaterial = (colors) => {
    const materials = [];
    for (let i = 0; i < 6; i++) {
      materials.push(new THREE.MeshStandardMaterial({ color: colors[i] }));
    }
    return materials;
  };

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        const cube = new THREE.Mesh(
          geometry,
          getMaterial(cubesColors[x + 1][y + 1][z + 1])
        );
        cube.position.set(x * 2.1, y * 2.1, z * 2.1);
        cubes.push(cube);
        scene.add(cube);
      }
    }
  }

  return cubes;
};
