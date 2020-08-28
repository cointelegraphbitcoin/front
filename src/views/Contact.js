import React from "react";
import NavBar from "components/Navbars/RTLNavbar";

import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";








export default class Contact extends React.Component {
  state = { name: "", email: "", message: "" }
 


  render() {

    const {name , email , message} = this.state
    const encode = (data) => {
      return Object.keys(data)
          .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
          .join("&");
    }    

    const handleSubmit = e => {
      e.preventDefault()
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", name , email, message })
      })
        .then(() => alert("Success!"))
        .catch(error => alert(error));
  
      e.preventDefault();
    };
    return (
      <div className="section section-signup">
        <div
          className="position-fixed bg-default"
          style={{ width: "100%", zIndex: 4 }}
        >
          <NavBar />
        </div>
        <Container>
          <Row
            xs="1"
            sm="1"
            className=" justify-content-center align-items-center __h-screen"
          >
            <Col lg="6" className="">
              <h3 className="display-3 text-white">Send Us a Message</h3>
              <p className="text-white mb-3">
                The Design System comes with four pre-built pages to help you
                get started faster. You can change the text and images and.
              </p>
              <p className="title text-white">
                <b> Email: support@telegraphBTC.com </b>
              </p>
              <p className="title text-white">
                <b> Phone: {"+1 (330) 595-4683"} </b>
              </p>
              <p className="title text-white">
                <b> Phone: {"+1 (786) 250-1232"} </b>
              </p>
            </Col>
            <Col className="" lg="6">
              <Card className="card-register">
                <CardHeader>
                  <CardTitle tag="h4">Contact Us</CardTitle>
                </CardHeader>
                <CardBody>
                  <form className="form" onSubmit={handleSubmit}>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": this.state.fullNameFocus,
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Full Name"
                        type="text"
                        onInput={(e) => this.setState({ name: e.target.value })}
                        onFocus={(e) => this.setState({ fullNameFocus: true })}
                        onBlur={(e) => this.setState({ fullNameFocus: false })}
                      />
                    </InputGroup>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": this.state.emailFocus,
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-email-85" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="text"
                        onInput={(e) => this.setState({ email: e.target.value })}
                        onFocus={(e) => this.setState({ emailFocus: true })}
                        onBlur={(e) => this.setState({ emailFocus: false })}
                      />
                    </InputGroup>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": this.state.textFocus,
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-align-left-2" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Text"
                        type="textarea"
                        onInput={(e) => this.setState({ message: e.target.value })}
                        onFocus={(e) => this.setState({ textFocus: true })}
                        onBlur={(e) => this.setState({ textFocus: false })}
                      />
                    </InputGroup>
                  </form>
                  <Button className="" color="primary">
                    Send
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
