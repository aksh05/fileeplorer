import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';

import '../sass/sidebar.scss';

function DirectoryTree(props) {
    const { rootdir } = props;
    const dir = rootdir[Object.keys(rootdir)[0]];
    const dirChildren = Object.keys(dir.children || {});
    const isRoot = dir.name === 'Root';
    const [childDisplay, setChildDisplay] = useState('none');

    const style = {
        display: childDisplay
    }

    useEffect(() => {
        if (isRoot) {
            setChildDisplay('block');
        }
    }, [isRoot])

    return (
        <ul className={`${isRoot ? 'root-dir-main' : ''} dir-main`} >
            <div>

                <li className={`${isRoot ? 'root-dir' : ''} sub-dir `}>
                    <span title={dir.name} className={`${isRoot ? 'root-dir-name' : 'dir-name'}`} >{dir.name}</span>
                    {dirChildren.length && !isRoot ? <span className="arrow-down" onClick={() => setChildDisplay(childDisplay === 'none' ? 'block' : 'none')}></span> : ''}
                </li>

                <div className={`${!isRoot?'dir-children':''}`} style={style}>
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



            </div>

        </ul>
    );
}
function SideBar(props) {
    const { rootdir } = props;
    return (
        <div className="side-bar">

            <div className="directory-list">
                <DirectoryTree rootdir={rootdir} parent="Root" />
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