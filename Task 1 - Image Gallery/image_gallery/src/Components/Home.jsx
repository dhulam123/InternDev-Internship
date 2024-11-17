import { useEffect, useState } from 'react';
import './HomeCss.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {

    const navigate = useNavigate()

    const getUsername = () => {
        const username = localStorage.getItem('username');
        if (username) {
            document.getElementById('username-display').textContent = `Hi, ${username}, Welcome to image gallery`;
        }
    };

    const logout = () => {
        localStorage.removeItem('username');
        navigate('/')
    }

    const category = ['Nature Photography', 'Portrait Photography', 'Astro Photography', 'Pet Photography', 'Macro Photography', 'Strom Photography']

    const [imageData, setImagedata] = useState([])

    useEffect(() => {
        setTimeout(() => {
            getImages()
            getUsername()
        }, 500);
    }, []);

    const getImages = async () => {
        const res = await fetch('http://localhost:3200/api/getImages')
        const data = await res.json()
        if (data.status) {
            setImagedata(data.message)
        } else {
            toast.error(data.message)
        }
    }

    const getImageWithCategory = async (category) => {
        const res = await fetch('http://localhost:3200/api/getImageWithCategory/' + category)
        const data = await res.json()
        if (data.status) {
            setImagedata(data.message)
        } else {
            toast.error(data.message)
        }
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
            <div className="username-container">
                <span id="username-display"></span>
                <button onClick={logout}>Logout</button>
            </div>
            <div className="category-actions">
                {
                    category.length > 0 && category.map((item, index) => {
                        return (
                            <button onClick={() => getImageWithCategory(item)} key={index}>{item}</button>
                        );
                    })

                }
            </div>
            <div className="image-container">
                {
                    imageData.length > 0 ? (
                        imageData.map((item, index) => {
                            return (
                                <div className="card">
                                    <div className="card-img">
                                        <img src={'http://localhost:3200/uploads/' + item.Image} alt="" />
                                    </div>
                                    <p className='title'>{item.Title}</p>
                                    <div className="category">
                                        <h2>{item.Category}</h2>
                                    </div>
                                    <p className='desc'>{item.Description}</p>
                                </div>
                            );
                        })
                    ) : (
                        <img id='noFound' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTau9__InKsiZcSth8GXEMMxiThiwDFQpPDzg&s' alt='NO RECORDS FOUND'></img>
                    )
                }
            </div>
        </>
    )
}