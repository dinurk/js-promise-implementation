import MyPromise from "./MyPromise.js";

// example of using MyPromise class:

new MyPromise(resolve => { //resolve with timeout
    setTimeout(() => {
        resolve("some_result1");
    }, 2000);
})
.then(result => { // return value from fulfilled handler
    console.log(result);
    return "some_result2";
})
.then(result => {
    console.log(result);
    return new MyPromise(resolve => { //return promise from fulfilled handler
        setTimeout(() => {
            resolve("some_result3");
        }, 2000);
    })
})
.then(result => {
    console.log(result);
})