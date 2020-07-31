const convertFirebaseCollection = (data) => {
  const objectCollection = data;
  const arrayCollection = [];

  if (objectCollection) {
    Object.keys(objectCollection).forEach((itemId) => {
      objectCollection[itemId].id = itemId;
      arrayCollection.push(objectCollection[itemId]);
    });
  }

  return arrayCollection;
};

const searchFirebaseCollection = (convertedData, phrase) => {
  const searchResults = convertedData.filter((item) => {
    let matchFound = false;
    Object.keys(item).forEach((k) => {
      if (k !== 'id') {
        const regex = new RegExp(phrase, 'ig');
        if (item[k].match(regex) !== null) matchFound = true;
        // console.log('value', item[k]);
        // console.log('regex', regex);
        // console.log('match?', item[k].match(regex));
        // console.log('---------------');
      }
    });
    return matchFound;
  });

  return searchResults;
};

export default {
  convertFirebaseCollection,
  searchFirebaseCollection,
};
