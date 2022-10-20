import { isDateStr, unCamelCase } from '../../../util/helperFunct';
export const isInvalidOrEmpty = (frmData, field, cleanedField, errMsg) => {
  let invalidOrEmpty = false;

  if (frmData[field] === '') {
    invalidOrEmpty = true;
  } else if (/_num/.test(field)) {
    if (isNaN(frmData[field])) {
      invalidOrEmpty = true;
      errMsg.push(
        `${errMsg.length + 1}. ${unCamelCase(
          cleanedField
        )} input is not a number`
      );
    }
  } else if (/_date/.test(field)) {
    if (!isDateStr(frmData[field])) {
      invalidOrEmpty = true;
      errMsg.push(
        `${errMsg.length + 1}. ${unCamelCase(
          cleanedField
        )} input is not a valid date`
      );
    }
  } else if (/_from/.test(field)) {
    if (
      !isDateStr(frmData[`${cleanedField}_from`]) ||
      !isDateStr(frmData[`${cleanedField}_to`])
    ) {
      invalidOrEmpty = true;
      errMsg.push(
        `${errMsg.length + 1}. ${unCamelCase(
          cleanedField
        )} input is not a valid date range`
      );
    }
  }
  return invalidOrEmpty;
};
