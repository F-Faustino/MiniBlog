import React from 'react'
import styles from './Post.module.css'
import { useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument'

const Post = () => {

    const {id} = useParams()
    const {document, loading} = useFetchDocument("posts", id)

    return (
        <div className={styles.post_container}>
            {loading && <p>Loading Post...</p>}
            {document && (
                <>
                    <h1>{document.title}</h1>
                    <img src={document.image} alt={document.title} />
                    <p>{document.body}</p>
                    <h3>This post is about:</h3>
                    <div className={styles.tags}>
                        {document.tagsArray.map((tag) => (
                            <p key={tag}>
                                <span>#</span>
                                {tag}
                            </p>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default Post