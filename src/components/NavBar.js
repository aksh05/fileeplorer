import React from 'react';
import {withRouter} from 'react-router-dom';
import '../sass/navbar.scss';
import arrowUp from '../images/arrow-up.png';
import searchIcon from '../images/search.svg';
function NavBar(props){
   
    const {location:{pathname}} = props;
    return <div className="nav-bar">
            <div className="route">
                <span className={`go-back ${pathname==='/'?'disabled':''}`} onClick={()=>{props.history.goBack()}}>
                    <img src={arrowUp} alt="go back"/>
                </span>
                <label className="current-route">
                    /root{pathname.length>1&& pathname}
                </label>
            </div>
            <div className="search">
                <img src={searchIcon} alt="" />
                <input type="text" value={props.searchValue} onChange={(e)=>props.setSearch(e.target.value)} placeholder="Search in this folder"/>
            </div>
    </div>
}

export default withRouter(NavBar);