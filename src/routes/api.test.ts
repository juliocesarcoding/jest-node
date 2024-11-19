import request from "supertest";
import app from "../app";
import { User } from "../models/User";

let email = "test@jest.com";
let password = "123456";

describe("Test api routes", () => {
 beforeAll(async () => {
  await User.sync({ force: true });
 });
 it("should return pong", (done) => {
  request(app)
   .get("/ping")
   .then((response) => {
    expect(response.body.pong).toBeTruthy();
    return done();
   });
 });

 it("should register a new user ", (done) => {
  request(app)
   .post("/register")
   .send(`email=${email}&password=${password}`)
   .then((response) => {
    expect(response.body.error).toBeUndefined();
    expect(response.body).toHaveProperty("id");
    return done();
   });
 });

 it("should not register with existing e-mail ", (done) => {
  request(app)
   .post("/register")
   .send(`email=${email}&password=${password}`)
   .then((response) => {
    expect(response.body.error).not.toBeUndefined();
    return done();
   });
 });
 it("should not allow to register without password mail ", (done) => {
  request(app)
   .post("/register")
   .send(`email=${email}`)
   .then((response) => {
    expect(response.body.error).not.toBeUndefined();
    return done();
   });
 });
 it("should not allow to register without  mail ", (done) => {
  request(app)
   .post("/register")
   .send(`password=${password}`)
   .then((response) => {
    expect(response.body.error).not.toBeUndefined();
    return done();
   });
 });
 it("should not allow to register without  any data ", (done) => {
  request(app)
   .post("/register")
   .send(``)
   .then((response) => {
    expect(response.body.error).not.toBeUndefined();
    return done();
   });
 });

 it("should login correctly ", (done) => {
  request(app)
   .post("/login")
   .send(`email=${email}&password=${password}`)
   .then((response) => {
    expect(response.body.error).toBeUndefined();
    expect(response.body.status).toBeTruthy();
    return done();
   });
 });
 it("should not with incorrect data ", (done) => {
  request(app)
   .post("/login")
   .send(`email=${email}&password=invalid`)
   .then((response) => {
    expect(response.body.error).toBeUndefined();
    expect(response.body.status).toBeFalsy();
    return done();
   });
 });
 it("should not with incorrect data ", (done) => {
  request(app)
   .get("/list")
   .then((response) => {
    expect(response.body.error).toBeUndefined();
    expect(response.body.list.length).toBeGreaterThanOrEqual(1);
    expect(response.body.list).toContain(email);
    return done();
   });
 });
});
