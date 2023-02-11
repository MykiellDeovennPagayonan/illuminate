let arr = [1, 2, 3, 4, 5];

// Generate a random index within the current length of the array
let randomIndex = Math.floor(Math.random() * arr.length + 1);

// Insert the new element at the random index
arr.splice(randomIndex, 0, "hello");

console.log(arr);