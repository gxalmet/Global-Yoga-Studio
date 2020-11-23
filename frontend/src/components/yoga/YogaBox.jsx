import React from 'react';
import { yogaList } from '../../constants/yogaConstants';

export default function YogaBox(props){
    return (
        <div className={props.class}>Types of Yoga classes:
            { props.yoga.length > 0 &&
            // eslint-disable-next-line array-callback-return
            props.yoga.map((lang, i)=>{
                const yogaItem = yogaList.find(item=> item.value === lang)
                if(yogaItem){
                    return ( <div key={i} className={props.classitem}>{yogaItem.label}</div>);
                }
            })
            }
        </div>
    );
}