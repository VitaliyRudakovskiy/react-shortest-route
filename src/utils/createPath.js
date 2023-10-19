import now from "performance-now";

const createPath = (matrix) => {
  const startTime = now(); // Запускаем таймер начала выполнения функции

  let start = null; // Начальная точка (значение 2)
  let finish = null; // Конечная точка (значение 3)

  const queue = []; // Очередь для обхода
  const distances = []; // Матрица расстояний от начальной точки
  const visited = []; // Матрица для отслеживания посещенных точек
  const path = []; // Матрица для восстановления пути

  // Инициализация матриц расстояний и посещений
  for (let i = 0; i < matrix.length; i++) {
    distances[i] = new Array(matrix[0].length).fill(Infinity);
    visited[i] = new Array(matrix[0].length).fill(false);
    path[i] = new Array(matrix[0].length);
  }

  const directions = [
    [-1, 0], // Вверх
    [1, 0], // Вниз
    [0, -1], // Влево
    [0, 1], // Вправо
  ];

  // Находим начальную и конечную точки
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 2) {
        start = [i, j];
        distances[i][j] = 0; // Расстояние до начальной точки равно 0
      } else if (matrix[i][j] === 3) {
        finish = [i, j];
      }
    }
  }

  // Если не удалось найти начальную и конечную точки, возвращаем -1
  if (!start || !finish) {
    return { path: [], length: -1, time: 0 };
  }

  // Добавление стартовой точки в очередь
  queue.push(start);

  // Пока очередь не пуста
  while (queue.length > 0) {
    const current = queue.shift();

    // Если текущая точка равна конечной точке, восстанавливаем путь
    if (current[0] === finish[0] && current[1] === finish[1]) {
      const resultPath = [];
      let currentCell = finish;

      // Восстанавливаем путь от конечной точки к начальной
      while (currentCell !== start) {
        resultPath.push(currentCell);
        currentCell = path[currentCell[0]][currentCell[1]];
      }

      resultPath.push(start);
      resultPath.reverse(); // Реверсируем, чтобы получить путь от start до finish

      const pathLength = resultPath.length - 1; // Длина пути

      const endTime = now(); // Завершаем таймер по выполнению функции
      const executionTime = endTime - startTime; // Вычисляем разницу времени для измерения времени выполнения

      return { path: resultPath, length: pathLength, time: executionTime };
    }

    // Поиск соседних точек
    for (let i = 0; i < directions.length; i++) {
      const neighbor = [
        current[0] + directions[i][0],
        current[1] + directions[i][1],
      ];

      // Проверка на выход за границы матрицы
      if (
        neighbor[0] >= 0 &&
        neighbor[0] < matrix.length &&
        neighbor[1] >= 0 &&
        neighbor[1] < matrix[0].length
      ) {
        // Проверка на проходимость точки и её посещение
        if (
          (matrix[neighbor[0]][neighbor[1]] === 0 ||
            matrix[neighbor[0]][neighbor[1]] === 3) &&
          !visited[neighbor[0]][neighbor[1]]
        ) {
          queue.push(neighbor);
          distances[neighbor[0]][neighbor[1]] =
            distances[current[0]][current[1]] + 1;
          visited[neighbor[0]][neighbor[1]] = true;
          path[neighbor[0]][neighbor[1]] = current; // Сохраняем информацию о пути
        }
      }
    }
  }

  const endTime = now(); // Завершаем таймер по выполнению функции
  const executionTime = endTime - startTime; // Вычисляем разницу времени для измерения времени выполнения

  // Возвращаем объект с пустым путем, -1 в длине и временем выполнения
  return { path: [], length: -1, time: executionTime };
};

export default createPath;
