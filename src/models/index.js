const { PrismaClient } = require("@prisma/client");
const { query } = require("express");
// const { skip } = require('@prisma/client/runtime/library');
// const { query } = require('express');
const prisma = new PrismaClient({ log: ["query"] }); // log query untuk melihat query yang dijalankan... contoh hasil (prisma:query SELECT "public"."users"."id", "public"."users"."full_name", "public"."users"."email", "public"."users"."addres", "public"."users"."password", "public"."users"."gender", "public"."users"."avatar", "public"."users"."phone_number", "public"."users"."driver_license", "public"."users"."birthdate", "public"."users"."role_id", "public"."users"."create_by", "public"."users"."update_by", "public"."users"."create_dt", "public"."users"."update_dt" FROM "public"."users" WHERE "public"."users"."email" = $1 LIMIT $2 OFFSET $3
//prisma:query SELECT "public"."users"."id", "public"."users"."full_name", "public"."users"."email", "public"."users"."addres", "public"."users"."password", "public"."users"."gender", "public"."users"."avatar", "public"."users"."phone_number", "public"."users"."driver_license", "public"."users"."birthdate", "public"."users"."role_id", "public"."users"."create_by", "public"."users"."update_by", "public"."users"."create_dt", "public"."users"."update_dt" FROM "public"."users" WHERE ("public"."users"."id" = $1 AND 1=1) LIMIT $2 OFFSET $3
//3
//prisma:query SELECT "public"."access"."id", "public"."access"."role_id", "public"."access"."menu_id", "public"."access"."visible", "public"."access"."grant", "public"."access"."create_by", "public"."access"."update_by", "public"."access"."create_dt", "public"."access"."update_dt" FROM "public"."access" LEFT JOIN "public"."menus" AS "j1" ON ("j1"."id") = ("public"."access"."menu_id") WHERE ("public"."access"."role_id" = $1 AND "public"."access"."grant"::jsonb = $2 AND ("j1"."menu" = $3 AND ("j1"."id" IS NOT NULL))) LIMIT $4 OFFSET $5
//null)

//calss abstract
class BaseModel {
  // #pass = "123456"; (private property) atau bisa juga menggunakan _pass = "123" (protected property) biasa di sebut encapsulation
  constructor(model) {
    this.model = prisma[model];
  }

  get = async ({ where, include, q = {} }) => {
    const { sortBy = "create_dt", sort = "desc", page = 1, limit = 10 } = q;
    const query = {
      select: this.select,
      where,
      include,
      orderBy: {
        [sortBy]: sort,
      },
      skip: (page - 1) * limit,
      take: limit,
    };

    const [resources, count] = await prisma.$transaction([
      this.model.findMany(query),
      this.model.count(query),
    ]);

    return {
      resources,
      count,
    };
  };
  getById = async (id, select) => {
    return this.model.findUnique({ where: { id: Number(id) }, select });
  };

  getone = async (query) => {
    return this.model.findFirst(query);
  };

  set = (data) => {
    return this.model.create({ data });
  };

  update = (id, data) => {
    return this.model.update({
      where: { id: Number(id) },
      data,
    });
  };

  setMany = (data) => {
    return this.model.createMany({ data });
  };

  delete = async (id) => {
    return this.model.delete({
      where: { id: Number(id) },
    });
  };

  count = async (where) => {
    return this.model.count({
      where,
    });
  };

  transaction = async (query) => {
    return prisma.$transaction(query);
  };
}

module.exports = BaseModel;
