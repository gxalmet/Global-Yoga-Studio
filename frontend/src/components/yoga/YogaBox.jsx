import React from 'react';
import { yogaList } from '../../constants/yogaConstants';
//import {ListGroup } from 'react-bootstrap';
export default function YogaBox(props){
    return (
        // <ListGroup>
        //     <strong>Types of Yoga classes:</strong> 
        //     { props.yoga.length > 0 &&
        //     eslint-disable-next-line array-callback-return
        //     props.yoga.map((lang, i)=>{
        //         const yogaItem = yogaList.find(item=> item.value === lang)
        //         if(yogaItem){
        //             return ( <ListGroup.Item key={i} className={props.classitem}>{yogaItem.label}</ListGroup.Item>);
        //         }
        //     })
        //     }
        // </ListGroup>
        <ul>
        <strong>Types of Yoga classes:</strong> 
        { props.yoga.length > 0 &&
        // eslint-disable-next-line array-callback-return
        props.yoga.map((lang, i)=>{
            const yogaItem = yogaList.find(item=> item.value === lang)
            if(yogaItem){
                return ( <li key={i} className={props.classitem}>{yogaItem.label}</li> );
            }
        })
        }
    </ul>
    );
}