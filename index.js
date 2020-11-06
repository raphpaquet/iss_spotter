// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');


const PrintPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`)
  }
}


nextISSTimesForMyLocation((error, passTimes) => {
  if(error) {
    console.log('It didn\'t work! :', error)
  } 
  PrintPassTimes(passTimes);

});

