import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

// import components
import Navbar from './Component/Navbar';
import Form from './Component/Form';
import AlbumList from './Component/AlbumList';
import { toast } from 'react-toastify';

function App() {
  // data for main album
  const [data, setData] = useState([]);
  // for checking is loading or not
  const [loading, setLoading] = useState(true);
  // state to manage album name
  const [albumName, setAlbumName] = useState('');
  // state to show the intention on of update album
  const [upAlbum, setUpAlbum] = useState(false);

  //fetching initialdata
  useEffect(() => {
    async function OnLoad() {
      let res = await fetch(' https://jsonplaceholder.typicode.com/albums');
      let data = await res.json();
      // console.log(data);
      setData(data);
      setLoading(false)
    }
    OnLoad();
  }, []);



  // add data to server
  async function addToList(val) {
    try {
      const newId = Date.now() + Math.floor(Math.random() * 1000);
      console.log(newId, "new Id")
      const res = await fetch(' https://jsonplaceholder.typicode.com/albums', {
        method: "POST",
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          userID: 10,
          id: newId,
          title: val
        })
      })
      const data1 = await res.json();
      const data2 = {
        userID: 10,
        id: Date.now(),
        title: val,
      }
      setData([data2, ...data]);
      console.log(data, "this data")
      toast.success("Album Add.")
      setAlbumName('');
    } catch (error) {
      toast.error(error);
    }
  }

  // state to store single album
  const [singleAlbum, setSingleAlbum] = useState([])

  // function to update album name
  function updateAlbum(id) {
    console.log("inside update function!!!")
    setUpAlbum(prevState => !prevState);
    console.log(upAlbum);
    const filteredName = data.find((data) => data.id === id);
    setSingleAlbum(filteredName);
    setAlbumName(filteredName.title);
    // console.log(singleAlbum, "this is single album");
  }

// updating data on server
  async function updateOnServer(title) {
    if (singleAlbum.id > 100) {
      const newData = data.map((album) => {
        if (album.id === singleAlbum.id) {
          return { ...album, title: albumName }; // Update the title property
        } else {
          return album;
        }
      });
      setData(newData);
      toast.success("Name Updated Successfully.");
      setAlbumName('');
      setUpAlbum(false);
    } else {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${singleAlbum.id}`, {
          method: "PUT",
          body: JSON.stringify({
            id: singleAlbum.id,
            title: title,
            userID: singleAlbum.userID,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          }
        });
        if (!res.ok) {
          throw new Error('Failed to update album');
        }
        const updatedData = await res.json();
        const newData = data.map((album) => {
          if (album.id === singleAlbum.id) {
            return { ...album, title: updatedData.title }; // Update the title property
          } else {
            return album;
          }
        });
        setData(newData);
        toast.success("Name Updated Successfully.");
        setAlbumName('');
        // console.log(albumName,"this is album name");

        setUpAlbum(false);

      } catch (error) {
        console.error('Error updating album:', error.message);
        toast.error('Failed to update album. Please try again later.');
      }
    }
  }



  // delete request
  async function handleDelete(id) {
    console.log('Deleting album with ID:', id);
    const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
      method: 'DELETE',
    });
    setData(data.filter(album => album.id !== id));
    toast.success('Album deleted successfully.');
  }

// creating router for navigation
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { index: true, element: <AlbumList data={data} loading={loading} handleDelete={handleDelete} updateAlbum={updateAlbum} /> },
        { path: "/add-album", element: <Form addToList={addToList} albumName={albumName} setAlbumName={setAlbumName} updateOnServer={updateOnServer} upAlbum={upAlbum} /> }
      ]
    }
  ])
  return (
    <>
      <div className='App'>
      {/* providing router for navigation */}
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
