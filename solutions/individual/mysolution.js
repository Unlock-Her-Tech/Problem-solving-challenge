function counPairs(values, target) {
    let count = 0;

    for (let j = i + 1; j < values.length; j++) {

        if (values[i] + values[j] === target) {
            count++;
        }
    }
    return count;
}

console.log((countPairs([1,5,7,-1,5],6));
console.log(counPairs([3,3,3],6));
console.log(counPairs([],6));