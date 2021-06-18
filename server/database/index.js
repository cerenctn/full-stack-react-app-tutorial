var { Pool } = require('pg');

const CONNECTION_STRING = process.env.DATABASE_URL || 'postgresql://ceren:postgres@localhost:5432/weather-db';
const SSL = process.env.NODE_ENV === 'production'; //evaluate to true in production

class Database {
    constructor () { //called when we create a new DB object. 
        this._pool = new Pool({ //creates a new pool and passes on the connection string and SSL settings.
            connectionString: CONNECTION_STRING,
            ssl:SSL
        });
        this._pool.on('error', (err, client) => { //error handling for connection errors 
            console.error('Unexpected error on idle PostgreSWL client', err);
        });
    }

    query(query, ...args) {
        this._pool.connect((err, client, done) => {
          if (err) throw err;
          const params = args.length === 2 ? args[0] : [];
          const callback = args.length === 1 ? args[0] : args[1];
    
          client.query(query, params, (err, res) => {
            done();
            if (err) {
              console.log(err.stack);
              return callback({ error: 'Database error.' }, null);
            }
            callback({}, res.rows);
          });
        });
    
      }
    

    end (){
        this._pool.end();
    }
}

module.exports = new Database();