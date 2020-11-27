import 
    React, { useState } 
from 'react';

//import Register from '../../components/register/register';
import { Card, Nav, Container } from 'react-bootstrap';
import RegisterUserScreen from './RegisterUserScreen';
import RegisterTeacherScreen from './RegisterTeacherScreen';



export default function RegisterScreen(props) {

    const [screen, setScreen] = useState('1');

    const handleSelect = (eventKey) => {
        
        setScreen(eventKey);
    }

    console.log(screen)
    return (
        <Container>
            <Card>
                <Card.Header>
                    <Nav justify  variant="tabs" eventKey={screen} onSelect={handleSelect} >
                        <Nav.Item>
                            <Nav.Link eventKey="1" ><h3>Register as a teacher</h3></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="2"><h3>Register as a Yogini</h3></Nav.Link>
                        </Nav.Item>
                        { screen &&
                            <Container>
                                <Card.Body>
                                    { screen === '1' &&
                                        ( <RegisterTeacherScreen></RegisterTeacherScreen> )
                                    }
                                    { screen === '2' &&
                                        ( <RegisterUserScreen></RegisterUserScreen> )
                                    }
                                </Card.Body>
                            </Container>
                        }

                    </Nav>
                </Card.Header>
            </Card>
        </Container>
    );
}