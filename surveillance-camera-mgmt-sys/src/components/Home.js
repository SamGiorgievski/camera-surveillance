import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css';
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage} from '../firebase-config';



export default function Home() {

  // Firebase
  const storageRef = ref(storage);
  const videosRef = ref(storage, 'cam-footage/');
  const testRef = ref(storage, 'cam-footage/VID_20230422_151149.mp4');

  // video state
  const [videoUrl, setVideoUrl] = useState('');

  
  // logout function
    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        navigate('/login')
    }

    let navigate = useNavigate();

    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        console.log(authToken)
        if (authToken) {
            navigate('/home')
        }

        if (!authToken) {
            navigate('/register')
        }
    }, [])

    useEffect(() => {

      listAll(videosRef);

      // Get the download URL of the video
      getDownloadURL(testRef).then((url) => {
        // Set the video URL in state
        console.log(url);
        setVideoUrl(url);
      }).catch((error) => {
        // Handle any errors
        console.error(error);
      });
    }, []);

    return (
        <div className="home">
          <h1> Home Page </h1>
            

          <button onClick={handleLogout}>Log out</button>
          <div className="video">
            <p> Video </p>
            {videoUrl && (
              <video src={videoUrl} controls autoPlay />
            )}
          </div>
        </div>
    )
}