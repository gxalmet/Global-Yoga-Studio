

import Axios from 'axios';
import React, { useEffect, useState } from 'react';


export default function ImageBox(props){
    var imgID = props.imageID;
    const [img, setImg] = useState('');
    

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async function () {
            if(img.length===0) {
                if(imgID){
                    try {
                        const { data } = await Axios.get(`/api/files/getfile${imgID}`);
                        setImg(data.file.imgurl);
                    } catch (error) {
                        // setErrorUpload(error.message);
                        // setLoadingUpload(false);
                    }
                }
            }

        }, [img, imgID]);

    if(props.imageID){
        return (
            <div className={props.clas}>
                {/* <div className="teacher-detail-img"> */}
                <img src={img} alt={props.alt} ></img>       
                {/* <img src={props.destImg} alt="teacher" ></img>   */}
            </div>
    
        );
    }else{
        return(
            <div></div>
        );
    }

}