import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../store/actions';
import { withRouter, Link,Route } from 'react-router-dom'

import '../sass/browse.scss';

function findCurrentDirectoy(idToFind, rootdir) {
    const dirId = Object.keys(rootdir)[0];
    if (dirId == idToFind) {
        return rootdir[idToFind];
    }
    const children = rootdir[dirId].children || {};
    for (const key in children) {
        const dir = findCurrentDirectoy(idToFind, { [key]: children[key] });
        if (dir) {
            return dir;
        }
    }
}
function Browse({ match, currentDir, rootdir,location, ...props }) {
    console.log("browse in directory", location,currentDir)
    const {children:files} = findCurrentDirectoy(currentDir, rootdir) || {children:{}};
    const onFolderClick = ({ name, id}) => {
        props.updateCurrentFolder(id);
        props.history.push("/"+match.url+name);
    }
    return (
        <div className="browse">
            {
              match.params.id===currentDir || !match.params.id && Object.keys(files).map(key=>{
                    const file = files[key];
                    const {name} = file;
                    return (
                        <div className="file-cont" key={file.id}>
                            {
                                file.isFolder?
                                <a to={`${match.url}/${name}`} onClick={()=>{onFolderClick(file)}} className="folder-icon">
                                    <span className="folder-disp">
                                    </span>
                                </a>:
                                <a className="file-icon">
                                    <span className="file-disp">{name.slice(name.lastIndexOf("."))}</span>
                                </a>
                            }
                            <div className="file-name">{name}</div>
                        </div>
                    );
                })
            }
            <Route path={`${match.url}/:id`} component={BrowseContainer} />

        </div>
    );
}

const stateToProps = (state) => {
    return state;
}
const dispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch);
}
const BrowseContainer = withRouter(connect(stateToProps, dispatchToProps)(Browse));


export default BrowseContainer;