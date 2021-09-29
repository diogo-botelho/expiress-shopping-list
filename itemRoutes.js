/** Routes for sample app. */

const express = require("express");

const { items } = require("./fakeDb");
const router = new express.Router();
const { validateQueryName, validateInputName, validateInputPrice } = require('./middleware');


/** Get all items */
router.get(
    "/",
    function (req, res) {
        return res.json({ items });
    }
)

router.post(
    "/",
    validateInputName,
    validateInputPrice,
    function (req, res) {
        const newItem = { "name": req.body.name, "price": req.body.price };
        items.push(newItem);
        return res.json({ added: newItem });
    }
)


router.get(
    "/:name",
    validateQueryName,
    function (req, res) {
        const itemName = req.params.name;
        for (let item of items) {
            if (item.name === itemName) {
                return res.json(item);
            }
        }
    }
)

router.patch(
    "/:name",
    validateQueryName,
    validateInputName,
    validateInputPrice,
    function (req, res) {
        const itemName = req.params.name;
        for (let item of items) {
            if (item.name === itemName) {
                item.name = req.body.name;
                item.price = req.body.price;
                return res.json({ udpated: item });
            }
        }
    }
)

router.delete(
    "/:name",
    validateQueryName,
    function (req, res) {
        const itemName = req.params.name;
        for (let i = 0; i < items.length; i++) {
            if (items[i].name === itemName) {
                items.splice(i, 1);
                return res.json({ message: "Deleted" });
            }
        }
    }
)

module.exports = router;