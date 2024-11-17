import { useState } from 'react';
import './DashboardCss.css';
import { useNavigate } from 'react-router-dom';
import AddImage from './AddImage';
import ViewImage from './ViewImage';

export default function Dahboard() {

    const navigate = useNavigate()

    const [actionElements, setActionElements] = useState([
        {
            name: 'Add Image',
            class: '',
            isVisible: false
        },
        {
            name: 'View Image',
            class: '',
            isVisible: false
        },
        {
            name: 'Logout',
            class: '',
            isVisible: false
        }
    ])

    const buttonClick = (index, action) => {
        setActionElements(() => {
            const temp = [...actionElements]
            for (let i = 0; i < actionElements.length; i++) {
                if (i === index) {
                    temp[i].class = 'active'
                    temp[i].isVisible = true
                } else {
                    temp[i].class = ''
                    temp[i].isVisible = false
                }
            }
            return temp
        })
    }

    return (
        <>
            <div className="dashboard">
                <div className='control-panel'>
                    <div className="title">
                        <h2><i class="fa-solid fa-mountain-sun"></i> Image Gallery.</h2>
                    </div>
                    <div className="actions">
                        {
                            actionElements.map((item, index) => {
                                return (
                                    <button key={index} className={item.class} onClick={() => buttonClick(index, item.name)}>{item.name}</button>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="content">
                    {
                        actionElements[0].isVisible &&
                        <AddImage />
                    }
                    {
                        actionElements[1].isVisible &&
                        <ViewImage />
                    }
                    {
                        actionElements[2].isVisible &&
                        navigate('/admin')
                    }

                </div>
            </div>
        </>
    )
}