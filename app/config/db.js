const mongoClient = require('mongodb').MongoClient
const state = {
    db: null
}
module.exports.connect = function(done) {
    const url = process.env.MONGODB_URI || 'mongodb://localhost:27017'
    const dbname = process.env.DB_NAME  || 'AZINOVA'


    mongoClient.connect(url, (err, data) => {
        if (err) return done(err)
        state.db = data.db(dbname)
        done()

    })

}

module.exports.get = function() {
    return state.db
}