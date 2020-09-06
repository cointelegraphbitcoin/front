import React from "react";
import {Container, Card, Row, Col, CardTitle, CardBody, ListGroup, ListGroupItem} from 'reactstrap'
import NavBar from "components/Navbars/RTLNavbar";

export default function Faq() {
    return (
        <section>
            <div
				className="position-fixed bg-default"
				style={{ width: "100%", zIndex: 4 }}
			>
				<NavBar />
			</div>
            <Container className="pt-5">
				<Row className="align-items-center __h-screen">
                    <Col md="8" className="mx-auto">
                        <Card className="card-coin card-plain">
                           
                            <CardBody> 
                                <CardTitle tag="h2" className="py-3"> Frequently Asked Questions</CardTitle>
                                <ListGroup className="card-coin card-plain">
                                    <ListGroupItem>
                                    <h2>What is CointelegraphBitcoin? </h2>
                                    <p>This is a company that has been setup for a long term growth we provide you optimum returns. Such as crypto trading, mining of crypto currencies with the latest hardwares, and as well as trading of forex with our programmed EA.</p>
                                    <hr/>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                    <h2>How CointelegraphBitcoin works? </h2>
                                    <p>We provide services such as crypto trading,mining of crypto currencies with latest software's and hardware and we trade Forex with our programmed EA. </p>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                    <h2>How Do CointelegraphBitcoin Benefit? </h2>
                                    <p>When you invest and open trades we gain and as you trade if there's any left over gain or bonus it's ours and be rest assured you get paid instantly and complete as agreed. </p>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <h2>What is Our Motive? </h2>
                                        <p>Our motive is to promote financial stability and help with the spread of income throughout the world ,we want to help people gain during this pandemic from there homes and at there own convenience. </p>
                                    </ListGroupItem>
                                    {/* <ListGroupItem>
                                        <h2>Similarities and Difference between our Plans  </h2>
                                    </ListGroupItem> */}
                                </ListGroup>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}