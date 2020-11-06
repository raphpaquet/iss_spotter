const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');


fetchMyIP( (error, ip) => {
  if (error) {
    console.log('It didn\'t work!', error);
    return;
  }
  console.log('It worked! Returned IP :', ip)
});



fetchCoordsByIP('162.245.144.188', (error, coords) => {
  if (error) {
    console.log('It didn\'t work! :', error);
    return;
  }
  console.log('It worked! Returned coords :', coords)
});


const exampleCoords = { latitude: '45.5457', longitude: '-73.5805' };


fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
  if(error) {
    console.log('It didn\'t work! :', error);
  } else {
    console.log('It worked! Returned flyover times :', passTimes)
  }
});
