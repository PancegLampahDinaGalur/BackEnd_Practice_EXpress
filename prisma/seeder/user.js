const { PrismaClient } = require("@prisma/client");
const { encryptPassword } = require("../../src/helpers/bcrypt");

const prisma = new PrismaClient();

async function userSeed() {
  return await prisma.users.upsert({
    /// upsert is a combination of update and create dan di gunakan untuk mengecek apakah data sudah ada atau belum
    where: { email: "superadmin@mail.com" },
    update: {},
    create: {
      email: "superadmin@mail.com",
      full_name: "Super Duper Admin",
      password: await encryptPassword("123456"),
      role_id: 1,
    },
  });
}

module.exports = userSeed;
