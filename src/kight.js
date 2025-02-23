// This function returns an array of legal moves of a given position.
function possibleMoves(current) {
  //The legal moves a knight is allowed to make
  const validMoves = [
    [1, 2],
    [2, 1],

    [-1, 2],
    [-2, 1],

    [1, -2],
    [2, -1],

    [-1, -2],
    [-2, -1]
  ]
  
  let possibilities = []
  
  // Calculates the moves, and add to possibilities:
  // making sure it's not out of the bounds of a chess board
  validMoves.forEach((move) => {
    let possibleMove = [current[0] + move[0], current[1] + move[1]];

    if (possibleMove[0] <= 7 && possibleMove[0] >= 0 && possibleMove[1] <= 7 && possibleMove[1] >= 0) {
      possibilities.push(possibleMove)
    }
  })
  
  return possibilities;
}

// This function takes 2 arrays as arguments: current location of the knight and it's target.
// It returns an object of:
// the number of steps, the actual moves and the visisted nodes during the BFS.
function knight(current, target) {
  let queue = []; //Is for keeping track of the next to visit
  let visited = new Set(); // Is to avoid not going through the same node twice
  let parentPointer = new Map(); //Is for backtracking to the initial node when the desired node is found
  queue.push(current);

  let count = 0; //Is for keeeping track of the steps

  while (queue.length > 0) {
    let levelSize = queue.length;
    for (let i = 0; i < levelSize; i++) {

      let currentPosition = queue.shift()
      if (currentPosition.toString() === target.toString()) {
        let backtrack = []; // When find the target node we backtrack to finding it's parent until the initial node
        let pointer = currentPosition; 
        while (pointer.toString() !== current.toString()) {
          console.log
          backtrack.push(pointer.toString());
          let key = pointer.toString()
          pointer = parentPointer.get(key)

        }
        return {
          "Steps": count, 
          "Moves": backtrack,
          "From": current.toString(),
          "Visited": visited
        }; //Then just return the results. 
      }
      if (currentPosition.toString() !== target.toString()) visited.add(currentPosition.toString());

      const legalMovesOfCP = possibleMoves(currentPosition);
      for (let i of legalMovesOfCP) {
        if (!visited.has(i.toString())) {
          queue.push(i) // If it's not been checked yet then it's added to the queue to be checked
          visited.add(i.toString()); // Then it's added to the visited set so we don't use it again.
          parentPointer.set(i.toString(), currentPosition.toString()); //Adds a parent pointer to the node.
        }
      }
    }
    count++ 
  }
}

console.log(knight([1,2],[6,6]))
