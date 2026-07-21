Array.prototype.myForEach = function(callback, thisArg){
    if(typeof callback !== "function"){
        throw new TypeError(`${callback}, not a function`)
    }

    const array = this;

    for(let i =0; i < array.length; i++){
        if(i in array){
            callback.call(thisArg, array[i], i, array);
        }
    }
}

const  array = [1, 2, 3, 4];

array.myForEach((i) => console.log(i*2));