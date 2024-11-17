import { useNavigate } from 'react-router-dom';
import './AdminLoginCss.css';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';

export default function AdminLogin() {

    const navigate = useNavigate()

    const onLogin = async (e) => {
        e.preventDefault()
        if (loginForm.username === '' || loginForm.password === '') {
            toast.error('Enter credentials to login !!')
            return
        } else if (loginForm.username === 'admin' && loginForm.password === 'admin') {
            navigate('/dashboard');
        } else {
            toast.error('Invalid Credential!')
        }
    }

    const [loginForm, setLoginForm] = useState({
        emailAddress: '',
        password: ''
    })

    const handleEdit = (e) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        })
    }

    const back = () => {    
        navigate('/')
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="overlay">
                <form onSubmit={onLogin}>
                    <div className='form-container'>
                        <h1>Admin Login</h1>
                        <div className='input-field'>
                            <label>Username <span>*</span></label>
                            <input type='text' name='username' value={loginForm.username} onChange={handleEdit}></input>
                        </div>
                        <div className='input-field'>
                            <label>Password <span>*</span></label>
                            <input type='password' name='password' value={loginForm.password} onChange={handleEdit}></input>
                        </div>
                        <div className='action-button'>
                            <input type='submit' value='Login'></input>
                        </div>
                        <p onClick={back}>&#10229; Back</p>
                    </div>
                </form>
            </div>
        </>
    )
}