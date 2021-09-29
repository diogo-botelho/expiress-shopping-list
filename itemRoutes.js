/** Routes for sample app. */

const express = require("express");
const { report } = require("superagent");
const app = require("./app");

const { items } = require("./fakeDb");
const router = new express.Router();

/** Get all items */

router.get(
    "/",
    // middleware.onlyAllowElie,
    function (req, res, next) {
        return res.json({ items });
    }
);
// end

router.post(
    "/",
    function (req, res, next) {
        const newItem = { "name": req.body.name, "price": req.body.price };
        items.push(newItem);
        return res.json({ added: newItem });
    }
)


router.get(
    "/:name",
    function (req, res, next) {
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
    function (req, res, next) {
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
    function(req,res,next) {
        const itemName = req.params.name;
        for (let i = 0; i< items.length; i++) {
            if (items[i].name === itemName) {
                items.splice(i,1);
                return res.json({message: "Deleted"});
            }
        }
    }
)

module.exports = router;