/* eslint-disable no-use-before-define */
import React, {  useEffect, useState} from 'react';
//import { Link } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { teachersListAction }  from '../../actions/teachersActions'
import MessageBox from '../../components/messagebox/MessageBox';
import CardBox from '../../components/cardbox/CardBox';
import {
  // Media, 
  // Card, 
  Button, 
  // CardGroup, 
  // CardColumns ,
  // CardDeck,
  Form,
  Container,
  Row,
  Col
} from 'react-bootstrap';

import { yogaList } from '../../constants/yogaConstants';
import { languagesList } from '../../constants/languageConstants';

export default function HomeScreen(props){

  const chunk = (array,size) => {
    
    var R = [];
    
    var lon = array.length;
    
    for (var i = 0; i < lon; i += size)
      R.push(array.slice(i, i + size));
    return R;
  };

  const dispatch = useDispatch();
  const teachersList = useSelector( (state) => state.teachersList) || {};
  const { teachers, loading, error } = teachersList;
  const [colTeach, setColTeach] = useState([]);
  
  if(loading === false && teachers.length > 0 && colTeach.length === 0){
      const teach = chunk(teachers,3);
      setColTeach(teach);
      
  }
  
  
  useEffect(() => {
    dispatch(teachersListAction());
    // if(loading === false && teachers.length > 0 && colTeach.length === 0){
    //   const teach = chunk(teachers,3);
    //   setColTeach(teach);
    // }
    
  },[dispatch]);

  const submitHandler = async (e) => {
    e.preventDefault();
  }
  
  
  if(loading){
    return ( <MessageBox variant="info"><h3>Loading...</h3>.</MessageBox>)
  }else if (error){
  return ( <MessageBox variant="danger">{error}</MessageBox>)
  }else{
    return (

    <Container>
      
        <Row>
          
          <Col>
          <Form.Label htmlFor="languages">Languages</Form.Label>
                        
            <Form.Control as="select" multiple 
                // onChange={handleChangeLanguages} 
                // value={languages}
                >
                    { languagesList.map((langItem,j)=>{
                        return <option key ={j} value={langItem.value}>{langItem.label}</option>    
                    })}
                
            </Form.Control>
          </Col>
          <Col>
            <Form.Label htmlFor="type">Type</Form.Label>
            <Form.Control 
                as="select" 
                multiple
                // onChange={handleChangeTypes} 
                // value={type}
                >
                    {yogaList.map((yogaItem,i)=>{
                        return <option key ={i} value={yogaItem.value}>{yogaItem.label}</option>    
                    })}
                
            </Form.Control>
          </Col>
        </Row>
        <Row>
          <Col><Button className="primary" block onClick={submitHandler}>Search teachers</Button></Col>
        </Row>
    
        { teachers &&
          
          colTeach.map((teach,h)=>{
            
            return (
              <Row>
                { teach[0] !== undefined &&
                  <Col>
                    <CardBox key={teach[0]._id} teacher ={teach[0]}></CardBox>
                  </Col>
                }
                { teach[1] !== undefined &&
                  <Col>
                    <CardBox key={teach[1]._id} teacher ={teach[1]}></CardBox>
                  </Col>
                }
                { teach[2] !== undefined &&
                  <Col>
                    <CardBox key={teach[2]._id} teacher ={teach[2]}></CardBox>
                  </Col>
                }

              </Row>
              
            )
          })
        }
        
      
      </Container>
    )
  }
 
}
