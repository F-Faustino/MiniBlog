import React, { useState, useEffect } from 'react'
import styles from './EditPost.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'
import { useFetchDocument } from '../../hooks/useFetchDocument'

const EditPost = () => {
    const {id} = useParams()
    const {document: post} = useFetchDocument("posts", id)


    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState([])
    const [formError, setFormError] = useState("")

    useEffect(() => {
        if(post){
            setTitle(post.title)
            setBody(post.body)
            setImage(post.image)

            const textTags = post.tagsArray.join(", ")
            setTags(textTags)
        }
    }, [post])

    const {user} = useAuthValue()

    const { updateDocument, response } = useUpdateDocument("posts")

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormError("");

        // validate image URL
        try {
            new URL(image)
        } catch (error) {
            setFormError("The image needs to be a URL.")
        }

        // Create Tags Array
        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

        if(!title || !image || !tags || !body) {
            setFormError("Please, fill all fields.")
        }

        if(formError) return;

        const data = {
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        }

        updateDocument(id,data)

        navigate('/dashboard')
    }

    return (
        <div className={styles.edit_post}>
            {post && (
                <>
                    <h2>Edit Post</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <span>Title:</span>
                            <input type="text" name="title" required placeholder="Think about a title" onChange={(e) => setTitle(e.target.value)} value={title} />
                        </label>
                        <label>
                            <span>Image:</span>
                            <input type="text" name="image" required placeholder="Select an image" onChange={(e) => setImage(e.target.value)} value={image} />
                        </label>
                        <p className={styles.preview_title}>Image preview:</p>
                        {image && <img className={styles.image_preview} src={image} alt={post.title} />}
                        <label>
                            <span>Body:</span>
                            <textarea name="body" required placeholder="" onChange={(e) => setBody(e.target.value)} value={body} />
                        </label>
                        <label>
                            <span>Tags:</span>
                            <input type="text" name="tags" required placeholder="Type the tags seperated by ," onChange={(e) => setTags(e.target.value)} value={tags} />
                        </label>
                        {!response.loading && <button className="btn">Edit</button>}
                        {response.loading && <button className="btn" disabled>Processing...</button>}
                        {response.error && <p className='error'>{response.error}</p>}
                        {formError && <p className='error'>{formError}</p>}
                    </form>
                </>
            )}
        </div>
    );
};

export default EditPost;