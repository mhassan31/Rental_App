const bcrypt = require('bcrypt');


async function hash_data(data_to_be_hashed){

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

var hashed_data = await bcrypt.hash(data_to_be_hashed.toString(), saltRounds)

return hashed_data;




}

module.exports = hash_data;
module.exports.hash_data = hash_data;
