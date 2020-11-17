import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar,Nav, NavbarBrand, Jumbotron, NavItem, Collapse, NavbarToggler, Modal, ModalHeader, ModalBody,Button, Form, FormGroup, Label, Input} from 'reactstrap'
class HeaderComponent extends Component {

  state={
    isNavOpen: false,
    isModalOpen: false
  }

  toggleNavbar(){
    this.setState({
      isNavOpen:!this.state.isNavOpen
    })
  }

  toggleModal(){
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }
  
  handleLogin(event){
    this.toggleModal();
    alert("Username : "+this.username.value + " Password : " + this.password.value + " Remember : " + this.remember.checked);
    event.preventdefault()
  }

  render() {
    return(
    <React.Fragment>
      <Navbar dark expand="md">
        <div className="container">
            <NavbarToggler onClick={this.toggleNavbar.bind(this)}/>
            <NavbarBrand className="mr-auto" href="/"><img src="/assets/images/logo.png" height="30" width="41" alt="Ristorante Con Fusion" /></NavbarBrand>
            <Collapse isOpen={this.state.isNavOpen} navbar>
                <Nav navbar>
                    <NavItem>
                        <NavLink className="nav-link" to="/home">
                          <span className="fa fa-home fa-lg"></span> Home
                        </NavLink>
                      </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to="/aboutus">
                          <span className="fa fa-info fa-lg"></span> About Us
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to="/menu">
                          <span className="fa fa-list fa-lg"></span> Menu
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to="/contactus">
                          <span className="fa fa-address-card fa-lg"></span> Contact Us
                        </NavLink>
                    </NavItem>
                </Nav>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <Button outline onClick={this.toggleModal.bind(this)}>
                      <span className="fa fa-sign-in fa-lg"></span> Login
                    </Button>
                  </NavItem>
                </Nav>
            </Collapse>
        </div>
      </Navbar>
      <Jumbotron className="jumbotron-blue"> 
        <div className="container">
          <div className="row row-header">
              <div className="col-12 col-sm-6">
                <h1>Ristorante con Fusion</h1>
                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
              </div>
          </div>
        </div>
       </Jumbotron> 
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal.bind(this)}>
          <ModalHeader toggle={this.toggleModal.bind(this)} >Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin.bind(this)}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" name="username" 
                innerRef={(input)=> this.username=input } />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password" 
                innerRef={(input)=> this.password=input} />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" name="rememberme" 
                  innerRef={(input)=> this.remember= input} /> Remember Me
                </Label>
              </FormGroup>
              <Button type="submit" value="submit" color="primary" className="mt-3">Login</Button>
            </Form>
          </ModalBody>
        </Modal>
    </React.Fragment>
    );
  }
}

export default HeaderComponent;