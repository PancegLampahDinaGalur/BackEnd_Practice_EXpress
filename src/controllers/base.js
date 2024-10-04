// abstract class
class BaseController {
    constructor(model) {
        this.model = model;
    }
    getAll = async(req, res) => {
        try {
            const {
                sortBy = "createdAt",
                sort = "desc",
                page = 1,
                limit = 10
            } = req.query;
            const { resources, count } = await this.model.get({
                sortBy,
                sort,
                page,
                limit
            });
            return res.status(200).json(
                this.apiSend({
                    code: 200,
                    status: "success",
                    message: "Data fetched successfully",
                    data: resources,
                    pagination: {
                        page,
                        limit,
                        total: count,
                        totalPages: Math.ceil(count / limit)
                    }
                })
            )  
        } catch (error) {
            console.log(error);
        }
    };
   
    get = async(req, res) => {
        try {
            const resource = await this.model.getById(req.params.id);
            return res.status(200).json(
                this.apiSend({
                    status: "success",
                    message: "Data fetched successfully",
                    data: resource
                })
            )
        } catch (error) {
            console.log(error);
    
        }
    }
 
    create = async(req, res) => {
        try {
            const resource = await this.model.set(req.body);
            return res.status(201).json(
                this.apiSend({
                    status: "success",
                    message: "Data created successfully",
                    data: resource
                })
            )
        } catch (error) {
            console.log(error);
        }
    }

    update = async(req, res) => {
        try {
            const resource = await this.model.update(req.params.id, req.body);
            return res.status(200).json(
                this.apiSend({
                    status: "success",
                    message: "Data updated successfully",
                    data: resource
                })
            )
        } catch (error) {
            console.log(error);
        }
    }
    delete = async(req, res) => {
        try {
            const resource = await this.model.delete(req.params.id);
            return res.status(200).json(
                this.apiSend({
                    status: "success",
                    message: `Data with id ${req.params.id} deleted successfully`,
                    data : resource,
                })
            )
        } catch (error) {
            console.log(error);
        }
    }

    apiSend({ code , status , message , data , pagination }) {
        return {
            code,
            status,
            message,
            data,
            ...(pagination && pagination)
        };
    }

}

module.exports = BaseController;