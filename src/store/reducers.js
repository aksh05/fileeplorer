import { UPDATE_CURRENT_FOLDER } from "./actionTypes";

const initialState = {
    rootdir: {},
    currentDir: {},
}
export function appReducer (state, action){

    switch(action.type){
        case UPDATE_CURRENT_FOLDER:
            return{
                ...state,
                currentDir: action.payload
            }
        default:
            return state;
    }


}
