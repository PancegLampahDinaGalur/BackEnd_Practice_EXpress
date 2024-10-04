const {PrismaClient} = require('@prisma/client');
// const { skip } = require('@prisma/client/runtime/library');
// const { query } = require('express');
const prisma = new PrismaClient();


//calss abstract
class BaseModel {
    // #pass = "123456"; (private property) atau bisa juga menggunakan _pass = "123" (protected property) biasa di sebut encapsulation 
    constructor(model) {
        this.model = prisma[model];
    }

    get = async ({where, include, q ={}}) => {
        const {sortBy = "createdAt", sort = "desc", page = 1, limit = 10} = q;
        const query = {
            select : this.select,
            where,
            include,
            orderBy : {
                [sortBy] : sort
            },
            skip : (page - 1) * limit,
            take : limit,    
        };

        const [resources, count] = await Promise.$transaction([
            this.model.findMany(query),
            this.model.count(query)
        ]);

        return {
            resources, 
            count
        };
};

getone = async (query) => {
    return this.model.findUnique(query);
};

set = async (data) => {
    return this.model.create({data});
};

update = async (id, data) => {
    return this.model.update({
        where : {id},
        data
    });
};

delete = async (id) => {
    return this.model.delete({
        where : {id},
    });
};

count = async () => {
    return this.model.count({
        where : this.where,
    });
   }

};

module.exports = BaseModel;