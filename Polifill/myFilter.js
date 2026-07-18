Array.prototype.myFilter = function(callback, thisArg){
    if(typeof callback !== "function"){
        throw new TypeError(`${callback} must be a function`);
    }

    const array = this;
    const result = [];

    for(let i = 0; i< array.length; i++){
        if(i in array){
            if(callback.call(thisArg, array[i], i, array)){
                result.push(array[i]);
            }
        }
    }

    return result;
}

const arr = [1, 2,3,4,5,6];

const oddArr = arr.myFilter((i) => i % 2 !== 0);
console.log(oddArr)
const evenArr = arr.myFilter((i) => i % 2 === 0);
console.log(evenArr)