const request = require("supertest");

const app = require("./app");
const db = require("./fakeDb");

beforeAll(function () {
  db.User.add({
    id: 1,
    name: "elie",
  });
});