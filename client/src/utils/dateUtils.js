import moment from 'moment';

const curYear = new Date().getFullYear();

export const dateUtils = {
  startJan: moment(`${curYear}-01-01`),
  endJan: moment(`${curYear}-01-31`),
  startFeb: moment(`${curYear}-02-01`),
  endFeb: moment(`${curYear}-02-28`),
  startMar: moment(`${curYear}-03-01`),
  endMar: moment(`${curYear}-03-31`),
  startApr: moment(`${curYear}-04-01`),
  endApr: moment(`${curYear}-04-30`),
  startMay: moment(`${curYear}-05-01`),
  endMay: moment(`${curYear}-05-31`),
  startJun: moment(`${curYear}-06-01`),
  endJun: moment(`${curYear}-06-30`),
  startJul: moment(`${curYear}-07-01`),
  endJul: moment(`${curYear}-07-31`),
  startAug: moment(`${curYear}-08-01`),
  endAug: moment(`${curYear}-08-31`),
  startSep: moment(`${curYear}-09-01`),
  endSep: moment(`${curYear}-09-30`),
  startOct: moment(`${curYear}-10-01`),
  endOct: moment(`${curYear}-10-31`),
  startNov: moment(`${curYear}-11-01`),
  endNov: moment(`${curYear}-11-30`),
  startDec: moment(`${curYear}-12-01`),
  endDec: moment(`${curYear}-12-31`),
};
