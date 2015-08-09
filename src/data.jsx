import md5 from 'md5';

// TODO: not sure why this is necessary here, but it is, for Safari
require('babel/polyfill');

export function getNewGame(otherSchoolName, dateInstance) {
  return {
    date: dateInstance,
    id: md5(otherSchoolName + dateInstance.toUTCString()),
    men: getNewScoreBoardState(otherSchoolName),
    otherSchoolName,
    women: getNewScoreBoardState(otherSchoolName)
  };
}

function getNewScoreBoardState(otherSchoolName) {
  return {
    otherSchoolName,
    scores: {
      foil: [0, 0],
      epee: [0, 0],
      saber: [0, 0]
    }
  };
}