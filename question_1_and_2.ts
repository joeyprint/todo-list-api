// Question 1 find prefix word

const findPrefixWord = (words) => {
  const numberOfWords = words.length;

  if (numberOfWords === 0) return '';
  if (numberOfWords === 1) return words[0];

  words.sort();

  const minWordLength = Math.min(
    words[0].length,
    words[numberOfWords - 1].length,
  );

  let indexOfLastSameChar = 0;
  for (let index = 0; index < minWordLength; index++) {
    if (words[0].charAt(index) === words[numberOfWords - 1].charAt(index)) {
      indexOfLastSameChar = index + 1;
    } else {
      break;
    }
  }

  const prefix = words[0].substring(0, indexOfLastSameChar);
  return prefix;
};

console.log('--------------------- QUESTION 1 --------------------------');
console.log(
  'prefix of (flower, flow, flight) >>',
  findPrefixWord(['flower', 'flow', 'flight']),
);
console.log(
  'prefix of (dog, racecar, car) >>',
  findPrefixWord(['dog', 'racecar', 'car']),
);

// Question 2 Count interest time (1 digit or 2 digits)

const interestingTime = (startTime, endTime) => {
  const startTimeSplit = startTime.split(':');
  const endTimeSplit = endTime.split(':');

  const _startDateTime = new Date().setHours(
    parseInt(startTimeSplit[0]),
    parseInt(startTimeSplit[1]),
    parseInt(startTimeSplit[2]),
  );

  const _endDateTime = new Date().setHours(
    parseInt(endTimeSplit[0]),
    parseInt(endTimeSplit[1]),
    parseInt(endTimeSplit[2]),
  );

  let countInterestTime = 0;
  for (let time = _startDateTime; time <= _endDateTime; time = time + 1000) {
    const timeFormat = Intl.DateTimeFormat('th', {
      timeStyle: 'medium',
    }).format(time);

    const timeString = timeFormat.replaceAll(':', '');
    const duplicateNumberSet = new Set(timeString).size;

    if (duplicateNumberSet > 0 && duplicateNumberSet <= 2) countInterestTime++;
  }

  return countInterestTime;
};

console.log('--------------------- QUESTION 2 --------------------------');

console.log(
  'Count interest time between 15:15:00 to 15:15:12',
  interestingTime('15:15:00', '15:15:12'),
);
console.log(
  'Count interest time between 22:22:21 to 22:22:23',
  interestingTime('22:22:21', '22:22:23'),
);
console.log(
  'Count interest time between 00:00:00 to 23:59:59',
  interestingTime('00:00:00', '23:59:59'),
);

console.log('-----------------------------------------------------------');
