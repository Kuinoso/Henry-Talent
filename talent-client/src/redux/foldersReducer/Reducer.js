import * as actions from './Constants.js';

const initialState = {
  dossier: [],
  newFolder: [],
  allFolders: [],
  folderById: [],
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_DOSSIER:
      return {
        ...state,
        dossier: action.payload,
      };
    case actions.NEW_FOLDER:
      return {
        ...state,
        newFolder: action.payload,
      };
    case actions.GET_ALL_FOLDERS:
      return {
        ...state,
        allFolders: action.payload,
      };
    case actions.DELETE_FOLDER:
      return {
        ...state,
        allFolders: state.allFolders.filter(
          (folder) => folder.id !== action.payload
        ),
      };
    case actions.UPDATE_FOLDER:
      return {
        ...state,
        allFolders: state.allFolders
          .filter((folder) => folder.id !== action.payload.id)
          .concat(action.payload),
      };
    case actions.REMOVE_CANDIDATE_FROM_FOLDER:
      const findFolder = state.allFolders.find(
        (folder) => folder.id === action.payload.idFolder
      );
      const filterCandidatesFolder = findFolder.candidates.filter(
        (candidate) => candidate.id !== action.payload.idCandidate
      );
      findFolder.candidates = filterCandidatesFolder;
      return {
        ...state,
        allFolders: state.allFolders
          .filter((folder) => folder.id !== action.payload.idFolder)
          .concat(findFolder),
      };
    case actions.FOLDER_BY_ID:
      return {
        ...state,
        newFolder: action.payload,
      };
    default:
      return state;
  }
}
