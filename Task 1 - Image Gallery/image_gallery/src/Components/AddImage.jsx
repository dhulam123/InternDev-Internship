import { useRef, useState } from 'react';
import './AddImageCss.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddImage() {

    const [formData, setFormdata] = useState({
        title: '',
        category: '',
        description: '',
        img: null
    })

    const fileInputRef = useRef(null);

    const onAdd = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('img', formData.img);

        try {
            const response = await fetch('http://localhost:3200/add', {
                method: 'POST',
                body: formDataToSend,
            });

            const result = await response.json();
            if (response.ok) {
                toast.success('Image added successfully!');
                setFormdata({
                    title: '',
                    category: '',
                    description: '',
                    img: null
                })
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            } else {
                toast.error(result.message || 'Failed to add image');
            }
        } catch (error) {
            toast.error('Error: ' + error.message);
        }
    };

    const handleChange = (e) => {
        setFormdata({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleFileChange = (e) => {
        setFormdata({
            ...formData,
            img: e.target.files[0]
        })
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
            <div className="addImage-title">
                <p>Add Image</p>
            </div>
            <div className="addImage-form">
                <form onSubmit={onAdd}>
                    <div className="inputField">
                        <input type="text" placeholder='Title'
                            name='title'
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="inputField">
                        <select name='category' value={formData.category} onChange={handleChange}>
                            <option value="">Select Image Category</option>
                            <option value="Nature Photography">Nature Photography</option>
                            <option value="Portrait Photography">Portrait Photography</option>
                            <option value="Astro Photography">Astro Photography</option>
                            <option value="Pet Photography">Pet Photography</option>
                            <option value="Macro Photography">Macro Photography</option>
                            <option value="Strom Photography">Strom Photography</option>
                        </select>
                    </div>
                    <div className="inputField">
                        <textarea placeholder='Description' rows='2'
                            name='description'
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="inputField">
                        <input type='file' className='fileStyle'
                            name='img' ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="action">
                        <button type='submit'>Add</button>
                    </div>
                </form>
            </div>
        </>
    )
}

