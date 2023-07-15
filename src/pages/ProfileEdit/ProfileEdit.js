import ProfileCardEdit from "../../components/common/profile/profile-card-edit/profile-card-edit";
import FormProfileEdit from "../../components/forms/profile-edit/profile-edit";
import { Container, Row, Col } from "react-bootstrap";


const ProfileEdit = (props) => {

    return (
        <>
            <ProfileCardEdit id='0'/>
            <Container fluid>
                <Row>
                    <Col className="anim-f1 d-flex justify-content-center my-3">
                        <FormProfileEdit title="Nickname" />
                    </Col>
                    <Col className="anim-f2 d-flex justify-content-center my-3">
                        <FormProfileEdit title="Description" current="aaaaaaaa" />
                    </Col>
                    <Col className="anim-f4 d-flex justify-content-center my-3">
                        <FormProfileEdit title="Password" />
                    </Col>
                    <Col className="anim-f3 d-flex justify-content-center my-3">
                        <FormProfileEdit title="Email" current="Current email" />
                    </Col>
                </Row> 
            </Container>
        </>
    );
}


export default ProfileEdit;
