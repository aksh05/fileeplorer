import { UPDATE_CURRENT_FOLDER } from "./actionTypes";

export const updateCurrentFolder = (id)=>{
    return {
        type: UPDATE_CURRENT_FOLDER,
        payload: id
    }
}