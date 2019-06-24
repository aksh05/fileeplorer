import { createStore } from 'redux';
import { appReducer } from './reducers';
import { rootdirectory } from './files';

const initialState = {
    rootdir: rootdirectory,
    parentDir: rootdirectory['rootid'],
    currentDir: rootdirectory['rootid'],
    isAddFileModal: false,
    searchValue:'',
    isContextMenu: false,
    currentRghtClickData:{
        X:0,
        Y:0,
        selectedFile:{}
    }
}
export default function configureStore(){
    return createStore(appReducer,initialState);
}