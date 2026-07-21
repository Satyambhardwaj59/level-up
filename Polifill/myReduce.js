Array.prototype.myReduce = function(callback , initialValue) {

    if(typeof callback !== "function"){
        throw new TypeError(`${callback}, not a function`)
    }

    let array = this;

    if(array.length === 0 && initialValue === undefined){
       throw new TypeError("Reduce of empty array with no initial value");
    }

    let accumulator;
    let startingIndex;

    if(initialValue !== undefined){
        accumulator = initialValue;
        startingIndex = 0;
    } else {
        accumulator = array[0];
        startingIndex = 1;
    }

    for(let i = startingIndex; i < array.length; i++){
        accumulator = callback(accumulator, array[i], i, array)
    }

    return accumulator;

}

const numbers = [1, 2, 3, 4];

const result = numbers.myReduce((acc, curr) => acc + curr, 0);
console.log(result)