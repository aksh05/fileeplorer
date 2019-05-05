import { UPDATE_CURRENT_FOLDER, ADD_FILE_FOLDER,SHOW_HIDE_ADD_MODAL,SET_SEARCH_VALUE,
    SET_RIGHT_CLICK_DATA,
    HIDE_CONTEXT_MENU,
    DELETE_FILE_FOLDER
 } from "./actionTypes";

export const updateCurrentFolder = (folder)=>{
    return {
        type: UPDATE_CURRENT_FOLDER,
        payload: folder
    }
}

export const addFileOrFolder = function(fileObj, currentDirId){
    return {
        type: ADD_FILE_FOLDER,
        payload:{
            fileObj,
            currentDirId
        }
    }
}

export const showHideAddFileModal = (payload)=>{
    return {
        type: SHOW_HIDE_ADD_MODAL,
        payload
    }
}

export const setSearch = (payload)=>{
    return {
        type: SET_SEARCH_VALUE,
        payload
    }
}

export const setRightClickData = (X,Y,selectedFile)=>{
    return{
        type:SET_RIGHT_CLICK_DATA,
        payload:{X,Y,selectedFile}
    }
}

export const hideContextMenu = ()=>{
    return {
        type: HIDE_CONTEXT_MENU
    }
}
export const deleteFileFolder = (fileIdToDel,currDirId)=>{
    return {
        type: DELETE_FILE_FOLDER,
        payload: {
            fileIdToDel,
            currDirId
        }
    }
}