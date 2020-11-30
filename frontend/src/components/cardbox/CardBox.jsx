/* eslint-disable react/jsx-pascal-case */
import React, { useState } from 'react';
import LanguagesBox from '../../components/languages/LanguagesBox';
import YogaBox from '../../components/yoga/YogaBox';
//import { Link } from 'react-router-dom';
import { 
    Card,
    // Row,
    // Col 
//    Button 
} from 'react-bootstrap';
import Axios from 'axios';
import { useEffect } from 'react';
//import ImageBox from '../../components/image/ImageBox';
import './cardbox.css';

export default function CardBox(props)  {

    const [imgURL, setImgURL] = useState('');

    const teach = props.teacher;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect( async () => {
        if(!imgURL){
            try {
                const { data } = await Axios.get(`/api/files/getfile${teach.img}`);
                
                setImgURL(data.file.imgurl); 
            } catch (error) {

            }
        }
        
    }, [imgURL, teach.img]);
    
    return (

        <Card  border="light">
            
                {/* <ImageBox
            imageID={teach.img}
            clas="product-image"
            alt="product"></ImageBox> */}
            { imgURL.length > 0 &&
                <Card.Img variant="top" src={imgURL}></Card.Img>
            }   
            
            <Card.ImgOverlay>       
            <Card.Body>
            <Card.Title>{teach.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{teach.country} {teach.place}</Card.Subtitle>
            <LanguagesBox 
                class="product-list"
                classitem="product-list-li"
                languages={teach.languages}></LanguagesBox>
            <YogaBox
                class="product-list"
                classitem="product-list-li"
                yoga={teach.type}>
            </YogaBox> 
            
            <Card.Text>
                

            </Card.Text>
            

            <Card.Link href={'/teacher/' + teach._id}>More...</Card.Link>
            </Card.Body>
            </Card.ImgOverlay> 
        </Card>

    );
}


