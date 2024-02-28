import React from 'react'
import styles from './About.module.css'
import { Link } from 'react-router-dom'

const About = () => {
    return (
        <div className={styles.about}>
            <h2>About Mini <span>Blog</span></h2>
            <p>This Blog is a project using React on Front-end and Firebase as the Back-end.</p>
            <Link to="/posts/create" className='btn'>
                Create Post 
            </Link>
        </div>
    )
}

export default About