export const getFrmDataInit = (keyNames, keyWords, srchFields, tags) => {
  let initObj = {};
  const {
    conditionTag,
    subFieldTag,
    subFieldSeperator,
    groupTag,
    dateRangeTag,
  } = tags;
  if (keyNames !== '' && keyWords !== '') {
    keyNames.split(groupTag).forEach(function (keyName, idx) {
      const cleanKey = keyName.replaceAll(subFieldTag, subFieldSeperator);

      if (srchFields[cleanKey]) {
        const { type: fieldType } = srchFields[cleanKey];
        const keyWord = keyWords.split(groupTag)[idx];

        if (new RegExp(conditionTag).test(keyWord)) {
          var [conditionVal, keyVal] = keyWord.split(conditionTag);
          initObj[`${cleanKey}_condition`] = conditionVal;
        } else {
          var keyVal = keyWord;
        }

        if (fieldType === 'num') {
          initObj[`${cleanKey}_${fieldType}`] = keyVal;
        } else if (fieldType === 'date') {
          if (new RegExp(dateRangeTag).test(keyVal)) {
            initObj[`${cleanKey}_from`] = keyVal.split(dateRangeTag)[0];
            initObj[`${cleanKey}_to`] = keyVal.split(dateRangeTag)[1];
          } else {
            initObj[`${cleanKey}_${fieldType}`] = keyVal;
          }
        } else {
          initObj[`${cleanKey}`] = keyVal;
        }
      }
    });
  }
  return initObj;
};
