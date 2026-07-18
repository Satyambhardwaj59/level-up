Array.prototype.myMap = function(callback, thisArg){

    if(typeof callback !== "function"){
        throw new TypeError(`${callback} is not a function`);
    }

    const array = this;
    const result = new Array(array.length);

    for(let i = 0; i < array.length; i++){
        if(i in array){
            result[i] = callback.call(thisArg, array[i], i, array);
        }
    }

    return result;
}

const arr = [2, 4, 6, 8];

const ans = arr.myMap((i) => i * i);
console.log(ans)