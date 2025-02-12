import axios from 'axios';
import * as actions from './Constants.js';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export function getAllFolders() {
  return async (dispatch) => {
    const folders = await axios.get(`${BACKEND_URL}/folders`);
    dispatch({
      type: actions.GET_ALL_FOLDERS,
      payload: folders.data,
    });
  };
}

export function deleteFolder(id) {
  return async (dispatch) => {
    await axios.delete(`${BACKEND_URL}/folders/${id}`);
    dispatch({
      type: actions.DELETE_FOLDER,
      payload: id,
    });
  };
}

export function updateFolder(idFolder, idDatas) {
  let URL = `${BACKEND_URL}/folders/${idFolder}`;
  if (idDatas.recruiterId && idDatas.userId)
    URL = URL.concat(
      `?recruiterId=${idDatas.recruiterId}&userId=${idDatas.userId}`
    );
  if (idDatas.recruiterId && !idDatas.userId)
    URL = URL.concat(`?recruiterId=${idDatas.recruiterId}`);
  if (!idDatas.recruiterId && idDatas.userId)
    URL = URL.concat(`?userId=${idDatas.userId}`);
  return async (dispatch) => {
    const updatedFolder = await axios.put(URL);
    dispatch({
      type: actions.UPDATE_FOLDER,
      payload: updatedFolder.data,
    });
  };
}

export function addToFolder() {
  return;
}

export function getFolderById(id) {
  return async (dispatch) => {
    const folder = await axios.get(`${BACKEND_URL}/folders/${id}`);
    dispatch({
      type: actions.FOLDER_BY_ID,
      payload: folder.data,
    });
  };
}
export function newFolder(newFolder) {
  return {
    type: actions.NEW_FOLDER,
    payload: newFolder,
  };
}

export function confirmFolder() {
  return async (dispatch) => {};
}

export function getDossierByUuid(uuid) {
  return async (dispatch) => {
    const dossier = await axios.get(`${BACKEND_URL}/folders/dossier/${uuid}`);
    dispatch({
      type: actions.GET_DOSSIER,
      payload: dossier.data,
    });
  };
}

export function removeCandidateFromFolder(idFolder, idCandidate) {
  return async (dispatch) => {
    await axios.delete(
      `${BACKEND_URL}/candidates/${idFolder}/removeCandidate/${idCandidate}`
    );
    dispatch({
      type: actions.REMOVE_CANDIDATE_FROM_FOLDER,
      payload: { idFolder: idFolder, idCandidate: idCandidate },
    });
  };
}
