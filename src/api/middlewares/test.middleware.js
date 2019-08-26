module.exports.sayHelloMiddleware = (req, res, next) => {
    console.log('Hello Kiet ^_^!!!');

    next();
}