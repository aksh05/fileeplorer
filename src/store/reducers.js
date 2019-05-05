import { 
    UPDATE_CURRENT_FOLDER,  ADD_FILE_FOLDER, SHOW_HIDE_ADD_MODAL,
    SET_SEARCH_VALUE,
    SET_RIGHT_CLICK_DATA,
    HIDE_CONTEXT_MENU,
    DELETE_FILE_FOLDER
 } from "./actionTypes";
import { findCurrentDirectoy } from "../shared/helper";


export function appReducer (state, action){
    const {payload} = action;
    switch(action.type){
        case UPDATE_CURRENT_FOLDER:
            return{
                ...state,
                currentDir: payload
            }
        case SHOW_HIDE_ADD_MODAL:
            return {
                ...state,
                isAddFileModal: payload
            }
        case ADD_FILE_FOLDER:
            const newFileFolderId = Object.keys(payload['fileObj'])[0];
            const rootdir = {...state.rootdir}
            const currentDirObj = findCurrentDirectoy(payload.currentDirId,rootdir);
            currentDirObj.children[newFileFolderId] = payload['fileObj'][newFileFolderId];
            return{
                ...state,
                rootdir,
                currentDir: currentDirObj,
                isAddFileModal: false
            }
        case SET_SEARCH_VALUE:
            return {
                ...state,
                searchValue: payload
            }
        case SET_RIGHT_CLICK_DATA:
            return {
                ...state,
                isContextMenu: true,
                currentRghtClickData: payload
            }
        case HIDE_CONTEXT_MENU:
            return {
                ...state,
                isContextMenu: false,
            }
        case DELETE_FILE_FOLDER:
            const rootdir2 = {...state.rootdir}
            const currentDirObj2 = findCurrentDirectoy(payload.currDirId,rootdir2);
            delete currentDirObj2.children[payload.fileIdToDel];
            
            return{
                ...state,
                isContextMenu: false
            }
        default:
            return state;
    }


}
