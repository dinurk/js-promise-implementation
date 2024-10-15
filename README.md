# Собственная реализация промисов 

Попытка реализовать функциональность встроенного в JS класса Promise. 
Реализация представлена классом *MyPromise*.  

На текущий момент в классе реализованы след. возможности:
* создание промиса: 
> *let promise = new MyPromise((resolve, reject) => { ... });*
* добавление обработчиков через метод then:
> *promise.then(result => console.log(result), error => console.log(error));*
* создание цепочек промисов:
> *promise.then(result => result)  
.then(result => result)  
.then(result => result)  
.then(result => console.log(result))* 
