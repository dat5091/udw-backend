const ChucVuService = require("../services/chucVu.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");


// Create and Save a new Contact
exports.create = async (req, res, next) => {
    try {
        const chucvuService = new ChucVuService(MongoDB.client);
        const document = await chucvuService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const chucvuService = new ChucVuService(MongoDB.client);
        const { maCV } = req.query;
        if (maCV) {
            documents = await chucvuService.findByName(maCV);
        } else {
            documents = await chucvuService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occured while retrieving contacts")
        );
    }

    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const chucvuService = new ChucVuService(MongoDB.client);
        const document = await chucvuService.findByID(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving contact with id=${req.params.id}`
            )
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const chucvuService = new ChucVuService(MongoDB.client);
        const document = await chucvuService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Contact was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating contact with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const chucvuService = new ChucVuService(MongoDB.client);
        const document = await chucvuService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Contact was delete successfully" });
    } catch (error) {
        new ApiError(
            500,
            `Could not delete contact with id=${req.params.id}`
        );
    }
};

exports.deleteAll = async (_req, res, next) => {
    try {
        const chucvuService = new ChucVuService(MongoDB.client);
        const deletedCount = await chucvuService.deleteAll();
        return res.send({
            message: `${deletedCount} contacts were deleted successfully`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all contacts")
        );
    }
};

exports.findAllFavorite = async (_req, res, next) => {
    try {
        const chucvuService = new ChucVuService(MongoDB.client);
        const documents = await chucvuService.findFavorite();
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(
                500,
                "An error occured while retrieving favorite contacts"
            )
        );
    }
};


