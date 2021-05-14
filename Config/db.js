
const knex = require('knex')({
    client: 'mysql',
    version:'5.7',
    connection: {
        host : 'cupido-database.cmiihtpdrpfq.us-east-1.rds.amazonaws.com',
        user : 'admin',
        password : 'xxxx',
        database : 'cupido'
    }
});
module.exports = knex;