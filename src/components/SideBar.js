import React, {useState} from 'react'
import { connect } from 'react-redux';

import '../sass/sidebar.scss';

function DirectoryTree(props) {
    const { rootdir } = props;
    const dir = rootdir[Object.keys(rootdir)[0]];
    const dirChildren = Object.keys(dir.children || {});
    const isRoot = dir.name === 'Root';
   
    return (
        <ul className={`${isRoot?'root-dir-main':''} dir-main`} >
            <div>

            <li className={`${isRoot?'root-dir':''} sub-dir `}>
                <span title={dir.name} className={`${isRoot?'root-dir-name':'dir-name'}`} >{dir.name}</span>
                {dirChildren.length && !isRoot?<span className="arrow-down" ></span>:''}
            </li>
            {
                    dirChildren.length ?
                        dirChildren.map(childDirKey=>{
                            const childDirObj = {
                                [childDirKey]:dir.children[childDirKey]
                            }
                            return <DirectoryTree parent={dir.name} key={dir.children[childDirKey].id} rootdir={childDirObj}/>;
                        }):''
                }
            </div>

        </ul>
    );
}
function SideBar(props) {
    const { rootdir } = props;
    return (
        <div className="side-bar">

            <div className="directory-list">
                <DirectoryTree rootdir={rootdir} />
            </div>
        </div>
    );
}
const stateToProps = (state) => {
    return {
        rootdir: state.rootdir
    };
}
const SideBarCont = connect(stateToProps)(SideBar);

export default SideBarCont;