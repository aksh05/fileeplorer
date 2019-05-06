import React, { useState } from 'react'
import '../sass/addFile.scss';
import { formatDate } from '../shared/helper';
import { withRouter } from 'react-router-dom';

function AddFileModal(props) {
    const [tab, setTab] = useState('file');
    const [name, setName] = useState('');
    const [createdBy, setCreatedBy] = useState('');
    const [createdOn, formattedDate] = formatDate(new Date());
    const [size, setSize] = useState('');

    const { location } = props;
    function create() {
        const id = name + createdOn;
        const { currentDir } = location.state || { currentDir: "rootid" };
        const fileObj = {
            name,
            size,
            createdBy,
            createdOn,
            id
        }
        if (tab === "folder") {
            fileObj['isFolder'] = true;
            fileObj['children'] = {};
        } else {
            fileObj['filetype'] = name.lastIndexOf(".") === -1 ? 'txt' : name.slice(name.lastIndexOf(".") + 1);
        }
        props.onAdd({
            [id]: fileObj
        }, currentDir);
    }
    return <div className="add-directory">
        <div className="add-header">
            <label>Create New</label>
            <span onClick={() => { props.showHideAddFileModal(false) }}>&#x2715;</span>
        </div>
        <div className="tabs-cont">
            <div className="tabs">
                <span className={`${tab === "file" ? 'selected' : ''}`} onClick={() => setTab('file')}>File</span>
                <span className={`folder-tab ${tab === "folder" ? 'selected' : ''}`} onClick={() => setTab('folder')}>Folder</span>
            </div>
        </div>
        <div className="add-form">
            <form name="addForm">
                <div className="form-row">
                    <input value={name} onChange={(e) => { setName(e.target.value) }} type="text" placeholder="Name" />
                </div>
                <div className="form-row">
                    <input value={createdBy} onChange={(e) => { setCreatedBy(e.target.value) }} type="text" placeholder="Creator" />
                </div>
                <div className="form-row">
                    <input value={size} onChange={(e) => { setSize(e.target.value) }} type="number" placeholder="Size" />
                </div>
                <div className="form-row">
                    <input readOnly defaultValue={formattedDate} type="text" placeholder="Date" />
                </div>
                <div className="form-row">
                    <input type="button" value="Create" onClick={create} />
                </div>
            </form>
        </div>

    </div>
}

export default withRouter(AddFileModal);