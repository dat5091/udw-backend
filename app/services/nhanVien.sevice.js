const { ObjectId } = require("mongodb");

class nhanvienService {
    constructor(client) {
        this.nhanvien = client.db().collection("nhanVien");
    }

    async create(payload) {
        const result = await this.nhanvien.findOneAndUpdate(
            payload,
            { $set: {} },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.nhanvien.find(filter);
        return await cursor.toArray();
    }

    async findByHoTen(hoten) {
        return await this.nhanvien.find({
            hoten: {hoten},
        });
    }

    async findByID(id) {
        return await this.nhanvien.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id): null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const result = await this.nhanvien.findOneAndUpdate(
            filter,
            { $set: payload },
            { returnDocument: "after" }
        );
        return result.value;
    }
    
    async delete(id) {
        const result = await this.nhanvien.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async deleteAll() {
        const result = await this.nhanvien.deleteMany({});
        return result.deletedCount;
    }

    async findFavorite() {
        return await this.find({ favorite: true });
    }
}

module.exports = nhanvienService;