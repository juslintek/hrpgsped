import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchMainMenu} from '../../actions';

class MainMenu extends Component {
    componentWillMount() {
        this.props.fetchMainMenu();
    }

    renderMenu(menu_items) {
        return menu_items.map(item => {
            return (
                <li key={item.object_id} className="nav-item">
                    <Link to={MainMenu.getRelativeUrl(item.url)}>{item.title}</Link>
                </li>
            );
        });
    }

    static getRelativeUrl(url) {
        if (url === window.location.origin) {
            return '/';
        }

        return url.substr(window.location.origin.length);
    }

    render() {
        return (
            <ul>
                {this.renderMenu(this.props.menus)}
            </ul>
        );
    }
}

function mapStateToProps({menus}) {
    return {menus};
}

export default connect(mapStateToProps, {fetchMainMenu})(MainMenu);