import axios from 'axios';
import {
  FIELD_LIST_REQUEST,
  FIELD_LIST_SUCCESS,
  FIELD_LIST_FAIL,
} from '../../../../redux/constants';

import { errDispatch, userTokenConfig } from '../../../../util/helperFunct';

const baseUrl = process.env.BASE_URL;

export const listField = (dbName, fields) => async (dispatch) => {
  try {
    dispatch({ type: FIELD_LIST_REQUEST });

    let datas = {};

    await Promise.all(
      fields.map(async function (field) {
        const { data } = await axios.get(
          `${baseUrl}/api/fieldList/?dbName=${dbName}&field=${field}`,
          userTokenConfig({ auth: 0 })
        );

        datas[field.replace('<.>', '.')] = data;
      })
    );

    dispatch({ type: FIELD_LIST_SUCCESS, payload: datas });
  } catch (error) {
    errDispatch(error, FIELD_LIST_FAIL, dispatch);
  }
};
