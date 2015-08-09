require('./App.less');

require('babel/polyfill');

import AllGames from './AllGames'
import lessVars from '!!less-interop!./App.less'
import appStateTree from './appStateTree';
import Game from './Game';

import {root} from 'baobab-react/decorators';
import fastclick from 'fastclick';
import BSNav from 'react-bootstrap/lib/Nav';
import BSNavbar from 'react-bootstrap/lib/Navbar';
import BSNavItem from 'react-bootstrap/lib/NavItem';
import React from 'react';
import DocumentTitle from 'react-document-title';
import {Link, Route, Router} from 'react-router';
import {history} from 'react-router/lib/HashHistory';
import style from 'stilr-classnames';
import StylesheetHotLoad from 'chcokr-webpack/StylesheetHotLoad';

export class AppTemplate extends React.Component {
  render() {
    return (
      <DocumentTitle title="Dufence">
        <StylesheetHotLoad>
          <div>
            <BSNavbar>
              <BSNav navbar right>
                <NavItem to="/all-games/new">
                  + New game
                </NavItem>
                <NavItem to="/all-games">
                  <span {...style({color: lessVars.brandPrimary})}>
                    See all games
                  </span>
                </NavItem>
              </BSNav>
            </BSNavbar>
            {this.props.children || <AllGames />}
          </div>
        </StylesheetHotLoad>
      </DocumentTitle>
    );
  }
}

class NavItem extends React.Component {
  render() {
    return (
      <BSNavItem>
        <Link to={this.props.to}>
          {this.props.children}
        </Link>
      </BSNavItem>
    );
  }
}

@root(appStateTree)
export default class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Route path="/" component={AppTemplate}>
          <Route path="all-games" component={AllGames} />
          <Route path="all-games/:addNew" component={AllGames} />
          <Route path="game/:id/:team" component={Game} />
        </Route>
      </Router>
    );
  }
}

fastclick.attach(document.body);
