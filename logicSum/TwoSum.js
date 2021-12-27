/**
 * Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to the target.
 * You may assume that each input would have exactly one solution, and you may not use the same elemnt twice. You can return the answer in any order
 */

const twoSum = (input, target) => {
  if (!input.length || !target) {
    return "input or target must exist";
  }

  let obj = {};
  for (let i = 0; i < input.length; i++) {
    if (obj.hasOwnProperty(input[i])) {
      return `[${obj[input[i]]},${i}]`;
    }
    obj[target - input[i]] = i;
  }

  return `No pair on the input that will matches the target`;
};

console.log(twoSum([3, 2, 4], 6)); // [1,2]
console.log(twoSum([3, 2, 0, 5, 9, 4, 1], 6)); // [1,5]
console.log(twoSum([2, 7, 11, 15], 13)); // [0,2]
console.log(twoSum([3, 3], 6)); // [0,1]
console.log(twoSum([3], 6));
console.log(twoSum([], 0));
