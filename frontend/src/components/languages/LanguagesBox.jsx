import React from 'react';
import { languagesList } from '../../constants/languageConstants';
//import {ListGroup } from 'react-bootstrap';

export default function LanguagesBox(props){
    return (
        <ul>
            <strong>Languages:</strong> 
            { props.languages.length > 0 &&
            // eslint-disable-next-line array-callback-return
            props.languages.map((lang, i)=>{
                const languagesItem = languagesList.find(item=> item.value === lang)
                if(languagesItem){
                    return ( <li key={i} >{languagesItem.label}</li> );
                }
            })
            }
        </ul>
    );
}


