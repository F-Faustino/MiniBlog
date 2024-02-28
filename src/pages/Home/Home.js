import React, { useState } from 'react'
import styles from './Home.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import PostDetail from '../../components/PostDetail/PostDetail'

const Home = () => {
    const [query, setQuery] = useState("")
    const {documents: posts, loading} = useFetchDocuments("posts")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        if(query){
            return navigate(`/search?q=${query}`)
        }
    }
    return (
        <div className={styles.home}>
            <h1>Checkout the most recent posts</h1>
            <form onSubmit={handleSubmit} className={styles.search_form}>
                <input type="text" placeholder="Search by tags" onChange={(e) => setQuery(e.target.value)} />
                <button className="btn btn-dark">Search</button>
            </form>
            <div>
                {loading && <p>Loading...</p>}
                {posts && posts.map((post) => (
                    <PostDetail key={post.id} post={post} />
                ))}
                {posts && posts.length === 0 && (
                    <div className='noposts'>
                        <p>No posts found</p>
                        <Link to="/posts/create" className='btn'>Create the first post</Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home