import React from 'react';
import { languagesList } from '../../constants/languageConstants';

export default function LanguagesBox(props){
    return (
        <div className={props.class}>Languages:
            { props.languages.length > 0 &&
            // eslint-disable-next-line array-callback-return
            props.languages.map((lang, i)=>{
                const languagesItem = languagesList.find(item=> item.value === lang)
                if(languagesItem){
                    return ( <div key={i} className={props.classitem}>{languagesItem.label}</div>);
                }
            })
            }
        </div>
    );
}


