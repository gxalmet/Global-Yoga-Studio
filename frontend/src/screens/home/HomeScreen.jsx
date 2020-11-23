import React, {  useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { teachersListAction }  from '../../actions/teachersActions'
import MessageBox from '../../components/messagebox/MessageBox';
import LanguagesBox from '../../components/languages/LanguagesBox';
import YogaBox from '../../components/yoga/YogaBox';
import ImageBox from '../../components/image/ImageBox';

export default function HomeScreen(props){
  const dispatch = useDispatch();
  const teachersList = useSelector( (state) => state.teachersList) || {};
  const { teachers, loading, error } = teachersList;
  
  useEffect(() => {
    dispatch(teachersListAction());
  },[dispatch]);

  
  
  if(loading){
    return ( <MessageBox variant="info"><h3>Loading...</h3>.</MessageBox>)
  }else if (error){
  return ( <MessageBox variant="danger">{error}</MessageBox>)
  }else{
    return (
    <ul className="products">
    {
      teachers &&
      teachers.map((prod,h)=>{
        return (
        <li key={h}>
          <div className="product">
          <Link to={'/teacher/' + prod._id}><ImageBox
              imageID={prod.img}
              clas="product-image"
              alt="product"></ImageBox></Link>
            {/* <Link to={'/teacher/' + prod._id}><img className="product-image" src={prod.img} alt="product" /></Link> */}
            <div className="product-name"><Link to={'/teacher/' + prod._id}>{prod.name}</Link></div>
            <div className="product-place">{prod.country} {prod.place}</div>
            <LanguagesBox 
              class="product-list"
              classitem="product-list-li"
              languages={prod.languages}></LanguagesBox>
            {/* <div className="product-list">Languages:
            { prod.languages.length > 0 &&
              // eslint-disable-next-line array-callback-return
              
              prod.languages.map((lang, i)=>{
                const languagesItem = languagesList.find(item=> item.value === lang)
                if(languagesItem){
                  return ( <div key={i} className="product-list-li">{languagesItem.label}</div>);
                }
              })
            }</div> */}
            <YogaBox
              class="product-list"
              classitem="product-list-li"
              yoga={prod.type}></YogaBox>
            {/* <div className="product-list">Types of Yoga classes:
            { prod.type.length > 0 &&
              // eslint-disable-next-line array-callback-return
              prod.type.map((typ,i)=>{
                const yogaItem = yogaList.find(item=> item.value === typ)
                if(yogaItem){
                  return (<div key={i} className="product-list-li">{yogaItem.label}</div>)
                } 
              })
            }</div> */}
             <div className="product-type-li">{prod.remote}</div> 
          </div>
        </li>)
      
      })
    }
    </ul>
    )
  }
 
}
