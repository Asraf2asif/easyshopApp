import {
  FIELD_LIST_REQUEST,
  FIELD_LIST_SUCCESS,
  FIELD_LIST_FAIL,
} from '../../../../redux/constants';

export const fieldListReducer = (state = { list: [] }, action) => {
  switch (action.type) {
    case FIELD_LIST_REQUEST:
      return { loading: true, list: [] };
    case FIELD_LIST_SUCCESS:
      return { loading: false, list: action.payload };
    case FIELD_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
