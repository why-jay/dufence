import lessVars from '!!less-interop!./App.less'
import appStateTree from './appStateTree';
import ScoreBoardContainer from './containers/ScoreBoardContainer';

import {branch} from 'baobab-react/decorators';
import qs from 'query-string';
import BSButton from 'react-bootstrap/lib/Button';
import BSButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import BSCol from 'react-bootstrap/lib/Col';
import BSRow from 'react-bootstrap/lib/Row';
import React from 'react';
import {Link} from 'react-router';

const teamChoiceRowHeight = 50;
const scoreBoardHeight = `calc(100vh - ${lessVars.navbarHeight}px` +
  ` - ${teamChoiceRowHeight}px)`;
const scoreBoardHolderCommonStyle = {
  height: scoreBoardHeight,
  minHeight: 530,
  maxHeight: 600
};

export default class Game extends React.Component {
  render() {
    const queryParams = qs.parse(location.search);

    const showMenInXs = queryParams.men && queryParams.men !== 'hide';

    return (
      <div>
        <XsScoreBoardHolder className='visible-xs'>
          <ScoreBoardContainer
            hideChangeTeam={true}
            id={showMenInXs ? queryParams.men : queryParams.women}
            showTeam={true}
            team={showMenInXs ? 'men' : 'women'} />
        </XsScoreBoardHolder>
        <BSRow className='hidden-xs'>
          <BSCol sm={10} smOffset={1}>
            {queryParams.men !== 'hide' &&
              <NonXsScoreBoardHolder
                lgOffset={queryParams.women === 'hide' ? 4 : 1}
                smOffset={queryParams.women === 'hide' ? 3 : 0}>
                <NonXsScoreBoardContainer
                  id={queryParams.men}
                  team="men" />
              </NonXsScoreBoardHolder>}
            {queryParams.women !== 'hide' &&
              <NonXsScoreBoardHolder
                lgOffset={queryParams.men === 'hide' ? 4 : 2}
                smOffset={queryParams.men === 'hide' ? 3 : 0}>
                <NonXsScoreBoardContainer
                  center={queryParams.men === 'hide'}
                  id={queryParams.women}
                  team="women" />
              </NonXsScoreBoardHolder>}
          </BSCol>
        </BSRow>
      </div>
    );
  }
}

class NonXsScoreBoardContainer extends React.Component {
  render() {
    return (
      <ScoreBoardContainer
        {...this.props}
        style={{
          boxShadow: `0 0 10px ${lessVars.gray}`,
          marginTop: 30
        }}
        showTeam={true} />
    );
  }
}

class XsScoreBoardHolder extends React.Component {
  render() {
    return (
      <div
        {...this.props}
        style={{
          ...scoreBoardHolderCommonStyle,
          width: '100vw'
        }}>
        {this.props.children}
      </div>
    );
  }
}

class NonXsScoreBoardHolder extends React.Component {
  render() {
    return (
      <BSCol
        {...this.props}
        sm={6}
        lg={4}
        style={scoreBoardHolderCommonStyle}>
        {this.props.children}
      </BSCol>
    );
  }
}
