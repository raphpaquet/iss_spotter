const request = require('request');

const fetchMyIP = function(callback) {

  request(`https://api.ipify.org?format=json`, (error, response, body) => {
    if (error) return callback(error, null);

    if(response.statusCode !== 200) {
    callback(Error(`status Code ${response.statusCode} when fetching IP: ${body}`), null);
    return;
  }

    const ip = JSON.parse(body).ip;

    callback(null, ip)
  });
};



const fetchCoordsByIP = function(ip , callback) {
  request(`http://ip-api.com/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if(response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching coords ${body}`), null);
      return;
    }
    
  const coords = { 
  latitude: JSON.parse(body).lat,
  longitude: JSON.parse(body).lon
  };

  return callback(null, coords );
  
  })
};


const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if(response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching fly over time: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  })
}



const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
      return callback(error, null);
    }

    fetchISSFlyOverTimes(coords, (error, passes) => {
      if (error) {
        return callback(error, null)
      }
      callback(null, passes)
      });
    });
  });
};




module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation};