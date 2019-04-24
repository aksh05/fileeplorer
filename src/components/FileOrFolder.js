import React from 'react';
import { Route, withRouter, Link } from 'react-router-dom'
import '../sass/filefolder.scss';


function FileOrFolder({ match ,currentSelected}) {
    const files = currentSelected.children;
    console.log("matched with this routing", match)
    const onFolderClick = ({name, children, id})=>{
       // console.log(history.push)
        /* history.push('/'+id,{params:{
            files:children,
            id:id
        }}); */
    }
    return (
        <React.Fragment>
            {
                Object.keys(files).map(key => {
                    const file = files[key];
                    return (
                        <div className='file-cont' key={file.id}>
                            {
                                file.isFolder ? (
                                    <React.Fragment>
                                        <Link to={`${match.url}/${file.id}`} href="javascript:void(0)" className="folder-icon" onClick={()=>{onFolderClick(file)}}>
                                            <div  tabIndex="-1"  className="folder-disp"> 
                                            </div>
                                        </Link>

                                        

                                    </React.Fragment>
                                ) : (
                                        <a href="javascript:void(0)" className="file-icon">
                                            <div tabIndex="-1" className="file-disp">
                                                <span className="file-desc">{file.name.slice(file.name.lastIndexOf('.'))}</span>
                                            </div>
                                        </a>

                                    )
                            }
                            <div className="file-name">{file.name}</div>
                        </div>
                    )
                })
            }
            <Route path={`${match.url}/:id`} render={() => <FileOrFolder />} />

        </React.Fragment>
    );
}

export default (FileOrFolder)