export default class MyPromise {

    constructor(executor) {

        if(!(executor instanceof Function)) {
            throw new TypeError("given executor value is not a function");
        }

        this._state = "pending";
        this._onFulfilled = undefined;
        this._onRejected = undefined;
        this._result = undefined;

        const resolve = value => {
            
            if(this._state != "pending") {
                return;
            }

            if(value instanceof MyPromise) {
                value.then(this._onFulfilled, this._onRejected);
                return;
            }

            this._state = "fulfilled";
            this._result = value;

            if(this._onFulfilled) {
                let fulfilledResult = this._onFulfilled(value);
                if(this._resolver) {
                    this._resolver(fulfilledResult);
                }
            }
        }

        const reject = error => {

            if(this._state != "pending") {
                return;
            }

            if(value instanceof MyPromise) {
                value.then(this._onFulfilled, this._onRejected);
                return;
            }

            this._state = "rejected";
            this._result = error;

            if(this._onRejected) {
                let rejectedResult = this._onRejected(error);
                if(this._rejector) {
                    this._rejector(rejectedResult);
                }
            }

            console.log("Unhandled Promise Rejection!");
        }

        executor(resolve, reject);
    }

    then(onFulfilled, onRejected) {
        this._onFulfilled = onFulfilled;
        this._onRejected = onRejected;

        if(this._state != "pending") {
            switch(this._state) {
                case "fulfilled":
                    let fulfilledResut = this._onFulfilled(this._result);
                    if(fulfilledResut instanceof MyPromise) {
                        return fulfilledResut;
                    }
                    return MyPromise.resolve(fulfilledResut);

                case "rejected":
                    let rejectedResult = this._onRejected(this._result);
                    if(rejectedResult instanceof MyPromise) {
                        return rejectedResult;
                    }
                    return MyPromise.reject(rejectedResult);
            }
        }

        if(!this._returnablePromise) {
            this._returnablePromise = new MyPromise((resolve, reject) => {
                this._resolver = resolve;
                this._rejector = reject;
            });
        }

        return this._returnablePromise;
    }

    finally() {

    }
    static resolve(value = undefined) {
        return new MyPromise(resolve => resolve(value));
    }
    static reject(reason = undefined) {
        return new MyPromise(null, reject => reject(value));
    }
    catch(errorHandler) {
        this._onRejected = errorHandler;
    }
}