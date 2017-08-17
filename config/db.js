module.exports = {
    getMongoConnection: function() {
        // return "mongodb://rangga:ragunan37a@localhost:27017/learn";
        return "mongodb://localhost:27017/learn";
    },

    getMySQLConnection: function () {
        return {
            host     : '192.168.10.11',
            user     : 'homestead',
            password : 'secret',
            database : 'hotel',
            connectionLimit: 50
        }
    }
}
