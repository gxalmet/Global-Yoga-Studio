import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commentCreateAction, commentsListAction } from '../../actions/commentsActions';
import { 
    Form,
    Row, 
    Button,
    Container,
    Col 
} from 'react-bootstrap';

export default  function  CommentForm(props)  {

    const teacherID = props.teacherID;
    const parent = props.parentID;

    const dispacth = useDispatch();
    const userSignIn = useSelector((state)=>state.userSignIn);
    const { userInfo } = userSignIn;

    const [text, setText] = useState('');
    console.log(parent);

    const createComment = (e)=>{
        
        e.preventDefault();

        dispacth(commentCreateAction(teacherID, userInfo._id, text, parent));
        dispacth(commentsListAction(teacherID));
        setText('');
    }
    
    if(parent){
        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <Form  onSubmit={createComment}>
                            <Form.Group>
                                { parent ? (<Form.Label>Reply as {userInfo.name} {userInfo.surname}</Form.Label>): (<Form.Label>Share your comment as {userInfo.name} {userInfo.surname}</Form.Label>) }
                                <Form.Control type="text" size="lg" as= "input" placeholder="Comment..." onChange={(e)=>setText(e.target.value)}/>
                            </Form.Group>
                            <Button variant="primary" block type="submit" >Publish</Button>
                        </Form>
                    </Col>

                </Row>

            </React.Fragment> ) ;
    }else{
        return (
            <Container></Container>
        );
    }

}


