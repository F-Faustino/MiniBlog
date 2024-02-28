import React from 'react'
import styles from './Search.module.css'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'
import PostDetail from '../../components/PostDetail/PostDetail'
import { Link } from 'react-router-dom'

const Search = () => {

    const query = useQuery()
    const search = query.get("q")

    const {documents: posts} = useFetchDocuments("posts", search)

    return (
        <div className={styles.search_container}>
            <h2>Search</h2>
            <div>
                {posts && posts.length === 0 && (
                    <div className='noposts'>
                        <p>There was no posts found based on your search.</p>
                        <Link to="/" className="btn btn-dark">
                            Back
                        </Link>
                    </div>
                )}
                {posts && posts.map((post) => (
                    <PostDetail key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}

export default Search