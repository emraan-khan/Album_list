import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
function Form(props) {

    // state for setting focus after completing action
    const [shouldFocus, setShouldFocus] = useState(false);
    // getting data from props app.js
    const { addToList, albumName, setAlbumName, updateOnServer, upAlbum } = props;
    // navigate to home after updating
    const navigate = useNavigate();

    // function of adding album and updating album name
    function handleAdd() {
        // if want to update album
        if (upAlbum) {
            // function for updating album name
            updateOnServer(albumName)
                .then(() => {
                    navigate('/')
                });
        }
        // else want to add album
        else {
            // functin to add new album
            addToList(albumName);
        }
        setShouldFocus(true);
    }

    // function to set albumName
    function handleInputChange(e) {
        
        setAlbumName(e.target.value);
    }

    useEffect(() => {
        if (shouldFocus) {
            // Focus the input field if shouldFocus is true
            document.getElementById("albumNameInput").focus();
            setShouldFocus(false); // Reset shouldFocus after focusing
        }
    }, [shouldFocus]);

    return (
        <div className='w-100 d-flex justify-content-center'>
            {/* oouter form container */}
            <div className='bg-primary d-flex flex-column ' style={{
                width: "35rem",
                height: "15rem",
                marginTop: "50px",
                borderRadius: "20px",
                padding: "10px 20px"
            }}>
                {/* label of form */}
                <label className='fs-1 text-light'>{upAlbum ? "Update album name" : "Add Album"}</label>
                {/* input for album name */}
                <input className='w-100 ' type="text" id="albumNameInput" placeholder="Album Name" aria-label=".form-control-lg example" style={{
                    margin: "25px 0",
                    height: "40px"
                    , borderRadius: "20px",
                    outline: "none",
                    border: "none",
                    padding: "0 20px",
                    fontSize: "1.2rem"
                }} value={albumName} onChange={handleInputChange} autoFocus={shouldFocus} />

                {/* button for submit */}
                <button className='btn btn-outline-light' onClick={handleAdd} >{upAlbum ? "Update" : "Add"}</button>

            </div>
        </div>
    )
}

export default Form;
