import React ,{useState}from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../store/actions';

import Browse from './Browse';
import AddFileModal from './AddFileModal';
import NavBar from './NavBar';

import ContextMenu , {GetInfo} from './ContextMenu';

function Explorer(props) {
    const [showInfo, setShowInfo] = useState(false);
    const data = props.currentRghtClickData;
    return (
        <div className="explorer">
            <NavBar searchValue={props.searchValue} setSearch={props.setSearch}/>
            <Browse {...props}/>
            {props.isAddFileModal && 
            <AddFileModal 
                onAdd={props.addFileOrFolder}
                showHideAddFileModal = {props.showHideAddFileModal}
            />}
            {
                props.isContextMenu &&
                <ContextMenu 
                    currentRghtClickData={props.currentRghtClickData} 
                    hideContextMenu={props.hideContextMenu}
                    updateCurrentFolder = {props.updateCurrentFolder}
                    deleteFileFolder = {props.deleteFileFolder}
                    setShowInfo = {setShowInfo}
                />
            }
            {showInfo && <GetInfo file={data.selectedFile} setShowInfo={setShowInfo} />}
        </div>
    );
}

const stateToProps = (state) => {
    return state;
}
const dispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch);
}
const ExplorerCont = connect(stateToProps, dispatchToProps)(Explorer);


export default ExplorerCont;