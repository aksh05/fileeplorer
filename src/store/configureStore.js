import { createStore } from 'redux';
import { appReducer } from './reducers';
import { rootdirectory } from './files';

export default function configureStore(){
    return createStore(appReducer,{rootdir:rootdirectory,currentDir:'rootid'});
}