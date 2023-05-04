const { ObjectId } = require("mongodb");

class chucvuService {
    constructor(client) {
        this.chucvu = client.db().collection("chucVu");
    }

    async create(payload) {
        const result = await this.chucvu.findOneAndUpdate(
            payload,
            { $set: {} },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.chucvu.find(filter);
        return await cursor.toArray();
    }

    async findByName(maCV) {
        return await this.find({
            maCV: { $regex: new RegExp(maCV), $options: "i" },
        });
    }

    async findByID(id) {
        return await this.chucvu.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id): null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractChucVuData(payload);
        const result = await this.chucvu.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }
    
    async delete(id) {
        const result = await this.chucvu.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async deleteAll() {
        const result = await this.chucvu.deleteMany({});
        return result.deletedCount;
    }

    async findFavorite() {
        return await this.find({ favorite: true });
    }
}

module.exports = chucvuService;