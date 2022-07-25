import { useState } from 'react';

//Videos
import video_1 from '../assets/video1.mp4'; //Video by cottonbro: https://www.pexels.com/video/vegetables-hands-chef-kitchen-4252294/
import video_2 from '../assets/video2.mp4'; //Video by Pressmaster: https://www.pexels.com/video/pan-grilling-fried-rice-and-lamb-chops-3195884/
import video_3 from '../assets/video3.mp4'; //Video by  Anastasia  Shuraeva: https://www.pexels.com/video/easter-cooking-cake-curly-4122744/
import video_4 from '../assets/video4.mp4'; //Video by cottonbro: https://www.pexels.com/video/hands-kitchen-cooking-indoors-4253147/
import video_5 from '../assets/video5.mp4'; //Video by Los Muertos Crew: https://www.pexels.com/video/person-opening-avocado-7601357/
    
const HeaderDesktop = () => {

    const videos = [video_1, video_2, video_3, video_4, video_5];
    const randomNumber = Math.floor((Math.random() * 4));

    //States
    let [videoCounter, setVideoCounter] = useState(randomNumber);
    const [videoPlaying, setVideoPlaying] = useState(videos[videoCounter]);

    const videoEndHandler = (e) => {
        let newVideoCounter;
        if (videoCounter !== 4) {
            newVideoCounter = videoCounter + 1;
            setVideoCounter(newVideoCounter);
        } else {
            newVideoCounter = 0;
            setVideoCounter(newVideoCounter);
        }
        const newVideo = videos[newVideoCounter]; 
        setVideoPlaying(newVideo);
        e.target.source = newVideo;
        e.target.currentTime = 0;
        e.target.load();
        e.target.play();
    }
    return (
        <video autoPlay muted onEnded={videoEndHandler} className='headerBg'>
            <source src={videoPlaying} type='video/mp4'/>
        </video>
    );
}
export default HeaderDesktop;