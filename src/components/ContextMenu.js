import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import '../sass/contextMenu.scss';
import { formatDate } from '../shared/helper';

export function GetInfo(props) {
    const { file } = props;
    return <div className="show-info">
        <div className="show-info-header">
            <label>File Info</label>
            <span onClick={() => { props.setShowInfo(false) }}>&#x2715;</span>
        </div>
        <div className="file-icon-cont">
            {
                file.isFolder ?
                    <a className="icon folder-icon">
                        <span className="file-disp"></span>
                    </a> :
                    <a className="icon">
                        <span className="file-disp">{'.' + file.filetype}</span>
                    </a>
            }
        </div>
        <div className="show-info-form">
            <form name="showInfoForm">
                <div className="form-row">
                    <label>Name:</label>
                    <label title={file.name}>{file.name}</label>
                </div>
                <div className="form-row">
                    <label>Size:</label>
                    <label>{file.size}KB</label>
                </div>
                <div className="form-row">
                    <label>Creator Name:</label>
                    <label title={file.createdBy}>{file.createdBy}</label>
                </div>
                <div className="form-row">
                    <label>Created Date:</label>
                    <label >{formatDate(new Date(file.createdOn))[1]}</label>
                </div>

            </form>
        </div>

    </div>
}
function ContextMenu(props) {
    const { currentRghtClickData: data } = props;
    const { location, history } = props;
    const { currentDir } = location.state || { currentDir: "rootid" };

    const cmStyle = {
        top: data.Y,
        left: data.X
    };
    useEffect(() => {
        const listener = () => {
            props.hideContextMenu();
        }
        document.addEventListener("click", listener);
        const ctMenu = document.getElementById("contextMenu");
        ctMenu.addEventListener("click", selectOption);
        return () => {
            document.removeEventListener("click", listener);
            ctMenu.removeEventListener("click", selectOption);
        }
    }, [1]);

    function selectOption(e) {
        const currOption = e.target.getAttribute("value");
        const { selectedFile } = data;
        switch (currOption) {
            case "open":
                props.hideContextMenu();
                props.updateCurrentFolder(selectedFile);
                const pathname = location.pathname.length > 1 ? location.pathname : "";
                console.log(pathname + "/" + selectedFile.name);
                history.push({
                    pathname: pathname + "/" + selectedFile.name,
                    state: {
                        currentDir: selectedFile.id,
                    }
                });
                break;
            case "showInfo":
                props.hideContextMenu();
                props.setShowInfo(true);
                break;
            case "delete":
                props.deleteFileFolder(selectedFile.id,currentDir)
                break;
        }
        e.stopPropagation();
    }
    return (
        <div>
            <div className="context-menu-cont" style={cmStyle}>
                <ul className="context-menu" id="contextMenu">
                    {data.selectedFile.isFolder && <li value="open">Open</li>}
                    <li value="showInfo">Get Info</li>
                    <li value="delete" className="del">Delete</li>
                </ul>
            </div>

        </div>
    );
}

export default withRouter(ContextMenu)