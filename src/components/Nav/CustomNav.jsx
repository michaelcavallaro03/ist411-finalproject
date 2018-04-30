import React, { Component } from 'react';
import { Navbar, NavDropdown, MenuItem, Nav, NavItem } from 'react-bootstrap';
import {withRouter, Redirect} from 'react-router-dom';
import Palette from '../Palette/Palette';
import '../../assets/css/CustomNav.css'
import undoIcon from '../../assets/img/undo.png';
import redoIcon from '../../assets/img/redo.png';
import profileIcon from '../../assets/img/profile.png';
import trashIcon from '../../assets/img/trash.png';
import {getUserByEmail} from '../../utils/PaintifyApi';
import TrashModal from '../Modals/TrashModal';

class CustomNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mongoUserId: "",
            paintingIDList: [],
            paintingList: [],
            isAuthenticated: false,
            showTrashModal: false
        }
    }

    _paletteCallback = (color) => {
        this.props.paletteCallback(color);
    }

    _navCallback = () => {
        this.setState({showTrashModal:false});
        this.props.trashCallback();
    }


    onSelect = (eventKey, syntheticEvent) => {
        if (eventKey === 5.1) {
        } else if (eventKey === 5.2) {

        } else if (eventKey === 5.3) {
            this.props.auth.logout();
        } else if (Math.trunc(eventKey) === 7) {
            var paintId = (eventKey % 1).toFixed(1) * 10;
            this.props.loadCallback(paintId);
        } else if (eventKey === 8) {

        }
        this.props.toolCallback(eventKey);
    }

    trash = () => {
        this.setState({showTrashModal: true});
    }



    render() {
        const { isAuthenticated } = this.props.auth;
        const showLoginButton = (!isAuthenticated() ? (<NavItem eventKey={1} onClick={() => {this.props.auth.login()}}>Login/Sign up</NavItem>) : 
        (<NavDropdown onSelect={this.onSelect} eventKey={5} title={<span><img alt="Profile" className="nav-icon" title="Profile" src={profileIcon}></img>  {this.props.profile.name}</span>} id="basic-nav-dropdown">
            <MenuItem eventKey={5.1} href="/user">My Profile</MenuItem>
            <MenuItem eventKey={5.2}>My Paintings</MenuItem>
            <MenuItem eventKey={5.3}>Logout</MenuItem>
        </NavDropdown>))

        return (
            <div>
                {this.state.showTrashModal && <TrashModal show={true} navCallback={this._navCallback} />}
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/app">Paintify</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavDropdown eventKey={3} title="Colors" id="basic-nav-dropdown">
                                <Palette paletteCallback={this._paletteCallback} />
                            </NavDropdown>
                            <NavDropdown onSelect={this.onSelect} eventKey={4} title="Tools" id="basic-nav-dropdown">
                                <MenuItem eventKey={4.1}>Select</MenuItem>
                                <MenuItem eventKey={4.2}>Pencil</MenuItem>
                                <MenuItem eventKey={4.3}>Line</MenuItem>
                                <MenuItem eventKey={4.4}>Rectangle</MenuItem>
                                <MenuItem eventKey={4.5}>Circle</MenuItem>
                                <MenuItem eventKey={4.6}>Pan</MenuItem>
                            </NavDropdown>
                            <NavItem onClick={this.props.undoCallback}>
                                <img src={undoIcon} alt="Undo" className="nav-icon" title="Undo" />
                            </NavItem>
                            <NavItem onClick={this.props.redoCallback}>
                                <img src={redoIcon} alt="Redo" className="nav-icon" title="Redo" />
                            </NavItem>
                            <NavItem eventKey={6} onClick={this.props.saveCallback}>Save</NavItem>
                            <NavDropdown onSelect={this.onSelect} eventKey={7} title="Load" id="basic-nav-dropdown">
                            </NavDropdown>
                            <NavItem onClick={this.trash}>
                                <img src={trashIcon} alt="Trash" className="nav-icon" title="Trash" />
                            </NavItem>
                        </Nav>
                        <Nav pullRight>
                            {showLoginButton}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar >
            </div>
        );

    }
}

export default withRouter(CustomNav);