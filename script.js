let towers = [[5, 4, 3, 2, 1], [], []];
let positions = ["p1", "p2", "p3", "p4", "p5", "p0", "t1", "t2", "t3"];

let movements = [];

function Render() {
  towers.forEach((tower, id) => {
    tower.forEach((disk, position) => {
      let diskClass = document.querySelector(".d" + disk);

      positions.forEach((position) => {
        diskClass.classList.remove(position);
      });

      diskClass.classList.add("t" + (id + 1));
      diskClass.classList.add("p" + (position + 1));
    });
  });
}

function Move(fromTower, toTower) {
  if (!towers[fromTower].length) return;

  let disk = towers[fromTower].pop();

  if (towers[toTower].length) {
    if (towers[toTower][towers[toTower].length - 1] < disk) {
      return towers[fromTower].push(disk);
    }
  }

  let diskClass = document.querySelector(".d" + disk);
  diskClass.classList.add("p0");
  towers[toTower].push(disk);
  setTimeout(Render, 400);
}

function ClickTower(n) {
  if (movements.length && movements[0].length === 1) {
    movements[0].push(n);
  } else {
    movements.unshift([n]);
  }
}

setInterval(() => {
  if (movements.length && movements[movements.length - 1].length === 2) {
    let movement = movements.pop();
    Move(movement[0], movement[1]);
  }
}, 600);

Render();

function Solve(size, fromTower, toTower) {
  if (size === 1) {
    return movements.unshift([fromTower, toTower]);
  }

  let other = 3 - fromTower - toTower;
  Solve(size - 1, fromTower, other);
  movements.unshift([fromTower, toTower]);
  Solve(size - 1, other, toTower);
}

setTimeout(() => {
  Solve(5, 0, 1);
}, 2000);
