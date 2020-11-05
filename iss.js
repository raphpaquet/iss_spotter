const request = require('request');

const fetchMyIP = function(callback) {

  request(`https://api.ipify.org?format=json`, (error, response, body) => {
    if (error) return callback(error, null);

    if(response.statusCode !== 200) {
    callback(Error(`status Code ${response.statusCode} when fetching IP: ${body}`), null);
    return;
  }

    const ip = JSON.parse(body).ip;
    return callback(null, ip)
  });
};




module.exports = { fetchMyIP };