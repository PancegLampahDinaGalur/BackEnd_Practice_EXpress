// req user --> role
// role  --> data access
const { equal } = require("joi");
const accessModel = require("../models/access");
const access = new accessModel();

function rbac(menuParam, accessParam) {
  return async (req, res, next) => {
    const roleId = req.user.role_id;
    console.log(roleId);
    if (roleId === 1) return next();
    // SELECT * FROM access a
    // JOIN menu m ON a.menu_id = m.id
    // where a.role_id = 1 and a.grant = {[$accessParam] : true} and m.menu = $menu
    const accessByrole = await access.getone({
      where: {
        role_id: roleId,
        grant: {
          path: [accessParam],
          equals: true,
        },
        menu: {
          is: {
            menu: menuParam,
          },
        },
      },
    });
    console.log(accessByrole);
    if (!accessByrole) return next(new ValidationError("Forbidden Access"));
    return next();
  };
}

module.exports = rbac;
