import * as actions from './Constants.js';

const initialState = {
  allRecruiters: [],
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_ALL_RECRUITERS:
      return {
        ...state,
        allRecruiters: action.payload,
      };
    default:
      return state;
  }
}
