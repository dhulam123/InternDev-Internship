import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ViewImageCss.css';

export default function ViewImage() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch('http://localhost:3200/images');
                if (!response.ok) {
                    throw new Error('Failed to fetch image details');
                }
                const data = await response.json();
                setImages(data);
            } catch (error) {
                toast.error('Error fetching image details');
            }
        };

        fetchImages();
    }, []);

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
            <div className="viewImage-title">
                <p>View Image</p>
            </div>
            <div className="image-details">
                <table>
                    <thead>
                        <th>Image Title</th>
                        <th>Image Category</th>
                        <th>Image description</th>
                        <th>Image</th>
                    </thead>
                    <tbody>
                        {images.length === 0 ? (
                            <tr>
                                <td colSpan="4">No images to display</td>
                            </tr>
                        ) : (
                            images.map((image) => (
                                <tr key={image.id}>
                                    <td>{image.Title}</td>
                                    <td>{image.Category}</td>
                                    <td>{image.Description}</td>
                                    <td>
                                        <img
                                            src={`http://localhost:3200/uploads/${image.Image}`}
                                            alt={image.Title}
                                            className="image"
                                        />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>
            </div>
        </>
    );
}
