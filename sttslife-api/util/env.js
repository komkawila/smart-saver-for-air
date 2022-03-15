const env = {
    database: 'saverair_db',
    username: 'komkawila',
    password: 'Kkomprwm20_1',
    host: 'dns.komkawila.com',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    port : 3007
  };
  
  module.exports = env;