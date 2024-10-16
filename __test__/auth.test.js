const request = require("supertest");
const server = require("../index");
const { PrismaClient } = require("@prisma/client");
const e = require("express");
const prisma = new PrismaClient();

const testUser = {
  email: "test@test.com",
  password: "Password111!",
};

const authRoute = "/api/v1/auth";
const signupRoute = `${authRoute}/signup`;
const logInRoute = `${authRoute}/signin`;

describe(`POST ${signupRoute}`, () => {
  it("should return 201 if the request is valid", (done) => {
    request(server)
      .post("/api/v1/auth/Signup")
      .send(testUser)
      .set("Accept", "application/json")
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(
          expect.objectContaining({
            code: 201,
            status: "success",
            message: "Signup success",
            data: expect.objectContaining({
              user: {
                email: testUser.email,
                password: expect.not.stringContaining(testUser.password),
                addres: null,
                avatar: null,
                driver_license: null,
                gender: null,
                phone_number: null,
                full_name: null,
                role_id: 3,
                birthdate: null,
                create_by: null,
                create_dt: expect.any(String),
                update_by: null,
                update_dt: expect.any(String),
              },
            }),
          })
        );
        done();
      })
      .catch((e) => {
        console.log(e);
        done(e);
      });
  });
});
