import axios from 'axios';
import * as actions from './Constants.js';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export function getAllRecruiters() {
  return async (dispatch) => {
    const recruiters = await axios.get(`${BACKEND_URL}/recruiters`);
    dispatch({
      type: actions.GET_ALL_RECRUITERS,
      payload: recruiters.data,
    });
  };
}
