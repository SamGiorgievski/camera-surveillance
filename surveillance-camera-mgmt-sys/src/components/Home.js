import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css';

export default function Home() {

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

    return (
        <div className="home">
          <h1> Home Page </h1>
            

          <button onClick={handleLogout}>Log out</button>
          <div className="video">
            <p> Video </p>
          </div>
        </div>
    )
}