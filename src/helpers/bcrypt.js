const bcrypt = require('bcryptjs');
const salt = 10;

async function encryptPassword(password) {
    const result = await bcrypt.hash(password, bcrypt.genSaltSync(salt));
    return result;
}

async function chekPassword(password, encryptPassword) {
    const result = await bcrypt.compare(password, encryptPassword);
    return result;
}

module.exports = {
    encryptPassword,
    chekPassword
};