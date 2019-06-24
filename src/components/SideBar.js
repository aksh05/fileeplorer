import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

import '../sass/sidebar.scss';
import {updateCurrentFolder} from '../store/actions';
//import { bindActionCreators } from 'redux';

function DirectoryTree(props) {
    const { rootdir } = props;
    const dir = rootdir[Object.keys(rootdir)[0]];
    const dirChildren = Object.keys(dir.children || {});
    const isRoot = dir.name === 'Root';
    const [childDisplay, setChildDisplay] = useState('block');

    const style = {
        display: childDisplay,
    } 
    
    function navigateToDir(){
        // console.log("Hello");
        // props.updateCurrentFolder(dir);
        
    }

    useEffect(() => {
        if (isRoot) {
            setChildDisplay('block');
        }
    }, [isRoot])

    return (
        <ul className={`${isRoot ? 'root-dir-main' : ''} dir-main`} >
            <div>

                <li className={`${isRoot ? 'root-dir' : ''} sub-dir `} onClick={() => setChildDisplay(childDisplay === 'none' ? 'block' : 'none')}>
                    <span title={dir.name} className={`${isRoot ? 'root-dir-name' : 'dir-name'}`} onClick={navigateToDir}>{dir.name}</span>
                    {dirChildren.length && !isRoot ? <span className="arrow-down" ></span> : ''}
                   
                </li>

                <div className={`${!isRoot?'dir-children':''}`} style={style}>
                    {
                        dirChildren.length ?
                            dirChildren.map(childDirKey=>{
                                const childDirObj = {
                                    [childDirKey]:dir.children[childDirKey]
                                }
                                return <DirectoryTree updateCurrentFolder={props.updateCurrentFolder} parent={dir} key={dir.children[childDirKey].id} rootdir={childDirObj}/>;
                            })
                        :''
                    }
                </div>



            </div>

        </ul>
    );
}
function SideBar(props) {
    const { rootdir } = props;
    return (
        <div className="side-bar">

            <div className="directory-list">
                <DirectoryTree updateCurrentFolder={props.updateCurrentFolder} rootdir={rootdir} parent="Root" />
            </div>
        </div>
    );
}
const stateToProps = (state) => {
    return {
        rootdir: state.rootdir
    };
}
const actionsToProps = (dispatch)=>{
    return {
        updateCurrentFolder: (file)=>{
                dispatch(updateCurrentFolder(file))
        }
    }
    
    //return bindActionCreators({updateCurrentFolder},dispatch)
}
const SideBarCont = connect(stateToProps,actionsToProps)(withRouter(SideBar));

export default SideBarCont;