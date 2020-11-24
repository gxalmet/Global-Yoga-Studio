import React, {  useEffect} from 'react';
//import { Link } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { teachersListAction }  from '../../actions/teachersActions'
import MessageBox from '../../components/messagebox/MessageBox';
import CardBox from '../../components/cardbox/CardBox';
import {
  // Media, 
  // Card, 
  // Button, 
  // CardGroup, 
  CardColumns 
} from 'react-bootstrap';

export default function HomeScreen(props){
  const dispatch = useDispatch();
  const teachersList = useSelector( (state) => state.teachersList) || {};
  const { teachers, loading, error } = teachersList;

  // if(teachers){
  //   teachers.map(teach => {
  //     teach.imgURL = getImageUrl(teach.img)
  //     return teach;
  //   })
  // }
  
  
  useEffect(() => {
    dispatch(teachersListAction());

    
  },[dispatch]);


  
  
  if(loading){
    return ( <MessageBox variant="info"><h3>Loading...</h3>.</MessageBox>)
  }else if (error){
  return ( <MessageBox variant="danger">{error}</MessageBox>)
  }else{
    return (
    // <ul className="products">
    // {
    //   teachers &&
    //   teachers.map((prod,h)=>{
    //     return (
    //     <li key={h}>
    //       <div className="product">
    //       <Link to={'/teacher/' + prod._id}><ImageBox
    //           imageID={prod.img}
    //           clas="product-image"
    //           alt="product"></ImageBox></Link>
    //         <div className="product-name"><Link to={'/teacher/' + prod._id}>{prod.name}</Link></div>
    //         <div className="product-place">{prod.country} {prod.place}</div>
    //         <LanguagesBox 
    //           class="product-list"
    //           classitem="product-list-li"
    //           languages={prod.languages}></LanguagesBox>
    //         <YogaBox
    //           class="product-list"
    //           classitem="product-list-li"
    //           yoga={prod.type}></YogaBox>

    //          <div className="product-type-li">{prod.remote}</div> 
    //       </div>
    //     </li>)
      
    //   })
    // }
    // </ul>
    
    <CardColumns>
        { teachers &&
          teachers.map((teach,h)=>{
            return (
              <CardBox key={h} teacher ={teach}></CardBox>
            )
          })
        }
        
      </CardColumns>
      
    )
  }
 
}
