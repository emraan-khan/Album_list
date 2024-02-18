import React from 'react'
// link from react-router to navigate
import { Link } from 'react-router-dom';
function Album(props) {

  // props getting from albumList
  const { data, handleDelete, updateAlbum } = props;

  return (
    <div className='card border border-primary border-1 mb-3 d' style={{
      width: "15rem", height: "15rem",
    }}>
      <div className='head mx-3'>
        {/* title tah */}
        <h5 className="card-title mt-2">{data.title}</h5>
      </div>
      <div className='d-flex justify-content-evenly button'>
        {/* button to update album data */}
        <Link to="/add-album">
          <button type="button" className="btn btn-outline-primary w-30 align-self-center mb-3 btn fs-6" onClick={() => updateAlbum(data.id)}>Update</button>
        </Link>
        {/* button to delete album */}
        <button type="button" className="btn btn-outline-danger w-30 align-self-center mb-3 btn fs-6" onClick={() => handleDelete(data.id)}>Delete</button>
      </div>
    </div>
  )
}

export default Album
