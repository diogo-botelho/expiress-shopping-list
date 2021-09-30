"use strict";

const request = require("supertest");

const app = require("./app");
const { items } = require("./fakeDb");

beforeEach(function () {

    let testItem = {
        name: "testSnack",
        price: 1.50
    }

    items.push(testItem);
});

afterEach(function () {
    items.length = 0;
})


test("GET /items", async function () {
    const resp = await request(app).get("/items");
    console.log(resp.body)
    expect(resp.body.items[0]).toEqual({ name: "testSnack", price: 1.50 });
});


describe("POST /items", function () {
    test("valid", async function () {
        const testItem2 = { name: "testItem2", price: 2.50 }
        const resp = await request(app)
            .post("/items")
            .send(testItem2);

        expect(resp.body).toEqual({ added: testItem2 });
    });

    test("invalid name", async function () {
        const resp = await request(app)
            .post("/items")
            .send({ name: "", price: 2.50 });

        expect(resp.body).toEqual({ error: { message: "Bad Request", status: 400 } });
    });

    test("invalid price", async function () {

        const resp = await request(app)
            .post("/items")
            .send({ name: "testItem3", price: -2 });

        expect(resp.body).toEqual({ error: { message: "Bad Request", status: 400 } });
    });
});


describe("GET /items/:name", function () {

    test("valid", async function () {
        const resp = await request(app).get("/items/testSnack");
        expect(resp.body).toEqual({ name: "testSnack", price: 1.50 });
    });

    test("invalid", async function () {
        const resp = await request(app).get("/items/ghostSnack");
        expect(resp.body).toEqual({ error: { message: "Not Found", status: 404 } });
    });
});


describe("PATCH /items/:name", function () {
    test("valid", async function () {
        const updatedItem = { name: "updatedTestSnack", price: 2 }
        const resp = await request(app)
            .patch("/items/testSnack")
            .send( updatedItem );
        
        // console.log("resp_valid=",resp);
        expect(resp.body).toEqual({ updated: updatedItem });
    });

    test("item not found", async function () {
        const updatedItem = { name: "updatedTestSnack", price: 2.00 }
        const resp = await request(app)
            .patch("/items/ghostItem")
            .send(updatedItem);

        expect(resp.body).toEqual({ error: { message: "Not Found", status: 404 } });
    });

    test("invalid updated name", async function () {
        const updatedItem = { name: "", price: 2.00 }
        const resp = await request(app)
            .patch("/items/testSnack")
            .send({updatedItem});

        expect(resp.body).toEqual({ error: { message: "Bad Request", status: 400 } });
    });

    test("invalid price", async function () {
        const updatedItem = { name: "updatedTestSnack", price: -2 }

        const resp = await request(app)
            .patch("/items/testSnack")
            .send({updatedItem});

        expect(resp.body).toEqual({ error: { message: "Bad Request", status: 400 } });
    });
});


describe("DELETE /items", function () {
    test("valid", async function () {
        const resp = await request(app).delete("/items/testSnack");
        expect(resp.body).toEqual({ message: "Deleted" });
    });

    test("invalid", async function () {
        const resp = await request(app).delete("/items/ghostSnack");
        expect(resp.body).toEqual({ error: { message: "Not Found", status: 404 } });
    });
});