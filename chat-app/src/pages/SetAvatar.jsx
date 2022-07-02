import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../assets/Loader.svg';
import { ToastContainer, toast } from 'react-toastify';
import { setAvatarRoute } from '../utils/APIRoutes';
import SetAvatarContainer from '../styled-components/SetAvatarContainer';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import toastOptions from '../utils/ToastOptions';
import { Buffer } from 'buffer';


const SetAvatar = () => {

    const api = "https://api.multiavatar.com/45678945";

    const navigate = useNavigate();

    const [avatars, setAvatars] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Please select an avatar", toastOptions);
        }
        else {
            const user = await JSON.parse(localStorage.getItem('user'));
            const { data } = await axios.put(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar]
            });
            if (data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem('user', JSON.stringify(user));
                navigate('/');
            }
            else {
                toast.error("Error setting avatar ! Please try it again !", toastOptions);
            }
        }
    };

    useEffect(() => {
        if (!localStorage.getItem('user'))
            navigate('/login');
    }, [navigate]);

    useEffect(() => {
        const getImages = async () => {
            const data = [];
            for (let i = 0; i < 4; i++) {
                const image = await axios.get(
                    `${api}/${Math.random() * 1000}`
                );
                const buffer = new Buffer(image.data);
                data.push(buffer.toString("base64"));
            }
            setAvatars(data);
            setIsLoading(false);
        };
        getImages();
    });


    return (
        <>
            {
                isLoading ?
                    (<SetAvatarContainer>
                        <img
                            src={Loader}
                            alt="Loading"
                            className='loader'
                        />
                    </SetAvatarContainer>) : (
                        <SetAvatarContainer>
                            <div className='title-container'>
                                <h1>
                                    Pick an avatar as your profile picture
                                </h1>
                            </div>
                            <div className="avatars">
                                {
                                    avatars.map((avatar, index) => (
                                        <div
                                            key={index}
                                            className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
                                        >
                                            <img
                                                src={`data:image/svg+xml;base64,${avatar}`}
                                                alt="Avatar"
                                                onClick={() => setSelectedAvatar(index)}
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                            <button
                                className="submit-btn"
                                onClick={setProfilePicture}
                            >
                                Set as Profile Picture</button>
                        </SetAvatarContainer>)
            }
            <ToastContainer />
        </>
    )
};

export default SetAvatar;