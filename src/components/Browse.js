import React from 'react'
import { withRouter, Route } from 'react-router-dom'

import addFileScr from '../images/addFile.png'
import '../sass/browse.scss';

import { findCurrentDirectoryByName} from '../shared/helper';
function filterFiles(files, fileName) {
    return Object.keys(files).reduce((acc, filekey) => {
        const currName = files[filekey].name.toLowerCase();
        if (currName.indexOf(fileName.toLowerCase()) > -1) {
            acc[filekey] = files[filekey];
        }
        return acc;
    }, {})
}
function Browse({ match, rootdir, location, ...props }) {
    let currentDirObject, directoryPath = location.pathname.slice(1);
    if(location.pathname === '/'){
        currentDirObject = rootdir[Object.keys(rootdir)[0]];
    }else{
        // if(!futureCurrDir){
            currentDirObject = findCurrentDirectoryByName(directoryPath, rootdir);
        // }else{
        //     // directoryPath = directoryPath.split("/").pop();
        //     // currentDirObject = findCurrentDirectoryByName(directoryPath, {[props.parentDir.id]:props.parentDir});
        //     /*
        //      * This code can be discarded as it uses folder ids for routing, which does not work if
        //      * user manually enters the directory name on the address bar
        //      */
        //     //currentDirObject = findCurrentDirectoy(currentDir, rootdir) || { children: {} };
        // }
    }
    
    
    let { children: files } = currentDirObject;
    files = props.searchValue ? filterFiles(files, props.searchValue) : files;
    function addFolder() {
        props.showHideAddFileModal(true);
    }

    const onFolderClick = (file) => {
        /**
         * Remove any selection caused by double click, 
         * so as to improve the experience while navigating
         */
        if(document.selection && document.selection.empty) {
            document.selection.empty();
        } else if(window.getSelection) {
            window.getSelection().removeAllRanges();
        }
        
        const pathname = location.pathname.length > 1 ? location.pathname : "";
        props.history.push({
            pathname: pathname + "/" + file.name,
            state: {
                currentDir: file.name,
            }
        });
        props.updateCurrentFolder(file);

    }

    function getFileOptions(e,file){
        e.preventDefault();
        props.setRightClickData(e.clientX,e.clientY,file)
    }
    return (
        <div className="browse-cont">
            <div className="browse">
                {
                    Object.keys(files).length  ? Object.keys(files).map(key => {
                        const file = files[key];
                        const { name } = file;
                        return (
                            <div tabIndex="-1" onContextMenu={(e)=>{getFileOptions(e,file)}} className={`file-cont ${!file.isFolder ? 'file-wrapper' : 'folder-wrapper'}`} key={file.id}>
                                {
                                    file.isFolder ?
                                        <a to={`${match.url}/${name}`} onDoubleClick={() => { onFolderClick(file) }} className="folder-icon">
                                            <span className="folder-disp">
                                            </span>
                                        </a> :
                                        <a className="file-icon">
                                            <span className="file-disp">{'.' + file.filetype}</span>
                                        </a>
                                }
                                <div className="file-name" title={name}>{name}</div>
                            </div>
                        );
                    }) :
                        <div className="no-files">
                            No files found for current route and search.
                </div>
                }
                
            </div>
            <div className="add-file" onClick={addFolder}><img src={addFileScr} alt="Add a folder" /></div>
            <Route path={`${match.url}/:id`} component={BrowseContainer} />
        </div>

    );
}


const BrowseContainer = withRouter(Browse);


export default BrowseContainer;