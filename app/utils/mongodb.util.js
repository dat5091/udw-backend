const { MongoClient } = require("mongodb");

class MongoDB {
    static connec = async (uri) => {
        if (this.client) return this.client;
        this.client = await MongoClient.connec(uri);
        return this.client;
    };
}

module.exports = MongoDB;