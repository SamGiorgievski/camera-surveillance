import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css';
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage} from '../firebase-config';



export default function Home() {

  // Audio
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  const audioContext = new AudioContext();
  console.log(audioContext);

  const videoRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserNodeRef = useRef(null);
  const frequencyDataRef = useRef(null);


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

      // Get the download URL of the video
      getDownloadURL(testRef).then((url) => {
        // Set the video URL in state
        console.log(url);
        setVideoUrl(url);

        // Audio
        const video = videoRef.current;
        console.log(video);

        audioContextRef.current = audioContext;

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
            <p> Camera 1 </p>
            {videoUrl && (
              <video controls autoPlay="" className="cam1" src={videoUrl} type="video/mp4" ref={videoRef}>
                cam 1
              </video>
              
            )}
            {/* <p>Volume: {volume}</p> */}
          </div>
        </div>
    )
}