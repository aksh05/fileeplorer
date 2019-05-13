import React from 'react'
import { withRouter, Route } from 'react-router-dom'

import addFileScr from '../images/addFile.png'
import '../sass/browse.scss';

import {findCurrentDirectoy} from '../shared/helper';
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
   
    const { currentDir } = location.pathname == "/"?{ currentDir: "rootid" }:location.state;
    const currentDirObject = findCurrentDirectoy(currentDir, rootdir) || { children: {} };
    let { children: files } = currentDirObject;
    files = props.searchValue ? filterFiles(files, props.searchValue) : files;
    function addFolder() {
        props.showHideAddFileModal(true);
    }

    const onFolderClick = (file) => {
        if(document.selection && document.selection.empty) {
            document.selection.empty();
        } else if(window.getSelection) {
            window.getSelection().removeAllRanges();
        }
        props.updateCurrentFolder(file);
        const pathname = location.pathname.length > 1 ? location.pathname : "";
        props.history.push({
            pathname: pathname + "/" + file.name,
            state: {
                currentDir: file.id,
            }
        });

    }

    function getFileOptions(e,file){
        e.preventDefault();
        props.setRightClickData(e.clientX,e.clientY,file)
    }
    return (
        <div className="browse-cont">
            <div className="browse">
                {
                    Object.keys(files).length && (match.params.id === currentDir || !match.params.id) ? Object.keys(files).map(key => {
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