import React from 'react'
import Album from './Album';
import { Hearts } from 'react-loader-spinner';
import { useEffect, useState } from 'react';

function AlbumList(props) {
    // props from app.js for data
    const { data, loading, handleDelete, updateAlbum } = props;

    return (
        <>
            {/* heart loader will until data is loaded */}
            {loading ? <Hearts
                height="120"
                width="120"
                color="#0d6efd"
                ariaLabel="heart-loading"
                radius="12.5"
                wrapperClass="loader-style"
                visible={true} /> :
                <div className='album-home container h-100' >
                    <div className='album-list d-flex justify-content-evenly flex-wrap gap-6 my-3'>
                        {/* sending data  to album  */}
                        {data && data.map((data, i) => <Album data={data} key={i} handleDelete={handleDelete} updateAlbum={updateAlbum} />)}

                    </div>
                </div>
            }
        </>
    )
}

export default AlbumList
