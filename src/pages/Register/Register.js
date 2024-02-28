import React, { useState, useEffect } from 'react'
import styles from './Register.module.css'
import { useAuthentication } from '../../hooks/useAuthentication'

const Register = () => {

    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    const {createUser, error: authError, loading} = useAuthentication();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        const user = {
            displayName,
            email,
            password
        }

        if(password !== confirmPassword){
            setError("Passwords need to match.")
            return
        }

        const res = await createUser(user)

        console.log(res)
    }

    useEffect(() => {
        if(authError) {
            setError(authError)
        }
    }, [authError])

    return (
        <div className={styles.register}>
            <h1>Register</h1>
            <p>Create your account and share your stories.</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Username:</span>
                    <input type="text" name="displayName" required placeholder="User name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                </label>
                <label>
                    <span>E-mail:</span>
                    <input type="email" name="email" required placeholder="User E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    <span>Password:</span>
                    <input type="password" name="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <label>
                    <span>Password confirmation:</span>
                    <input type="password" name="confirmPassword" required placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </label>
                {!loading && <button className="btn">Create</button>}
                {loading && <button className="btn" disabled>Processing...</button>}
                {error && <p className='error'>{error}</p>}
            </form>
        </div>
    )
}

export default Register