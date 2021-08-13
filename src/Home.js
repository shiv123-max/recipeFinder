import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
    return (
        <div className="home">
          <h1 className="home__header">Get all your favorite recipes at one place!</h1>
          <Link className="home__link" to="/recipe">Enter Website</Link>
        </div>
    )
}

export default Home
