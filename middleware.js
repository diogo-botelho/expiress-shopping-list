/** Example middleware. */

const { NotFoundError, BadRequestError } = require("./expressError");
const { items } = require("./fakeDb");

/** function that checks if name in params exists in database*/
function validateQueryName(req, res, next) {
    for (let item of items) {
        if (item.name === req.params.name) {
            return next();
        }
    }
    throw new NotFoundError();
}

/** function that checks if name in body input is valid*/
function validateInputName(req, res, next) {
    const name = req.body.name;
    if (!name) {
        throw new BadRequestError();
    } else {
        return next();
    }
}

/** function that checks if price in body input is a positive number*/
function validateInputPrice(req, res, next) {
    const price = req.body.price;
    if (!Number(price)) {
        throw new BadRequestError();
    } else if (Number(price) < 0) {
        throw new BadRequestError();
    } else {
        return next();
    }
}

module.exports = {
    validateQueryName,
    validateInputName,
    validateInputPrice
}