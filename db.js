const { connection } = require('./config');

function query(query, params) {
    return new Promise(async (resolve, reject) => {
        try {
            // query database
            const db = await connection();
            const [results,] = await db.execute(query, params);
    
            resolve(results);
        } catch(err) {
            console.log('QUERY ERROR: ', err);
            reject();
        }
    })
}

module.exports = { query };