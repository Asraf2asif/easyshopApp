import { isInvalidOrEmpty } from './isInvalidOrEmpty';

export const getRedirectData = (frmData, tags) => {
  const { conditionTag, subFieldTag, subFieldSeperator, dateRangeTag } = tags;
  let queryVals = [];
  let queryFields = [];
  let errMsg = [];

  Object.keys(frmData).forEach(function (field) {
    if (/_condition|_to/.test(field) === false) {
      const cleanedField = field.replace(/_.+/, '');

      let invalidOrEmpty = isInvalidOrEmpty(
        frmData,
        field,
        cleanedField,
        errMsg
      );

      const conditionVAl = frmData[`${cleanedField}_condition`];

      if (invalidOrEmpty === false) {
        if (conditionVAl) {
          if (conditionVAl === 'range') {
            const formDate = frmData[`${cleanedField}_from`];
            const toDate = frmData[`${cleanedField}_to`];
            queryVals.push(
              ['eq', conditionTag, formDate, dateRangeTag, toDate].join('')
            );
          } else {
            queryVals.push(
              [conditionVAl, conditionTag, frmData[field]].join('')
            );
          }
        } else {
          queryVals.push(`${frmData[field]}`);
        }

        queryFields.push(
          cleanedField.replaceAll(subFieldSeperator, subFieldTag)
        );
      }
    }
  });

  return { queryFields, queryVals, errMsg };
};
