import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Helmet from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArchiveIcon from '@material-ui/icons/Archive';
import HomeIcon from '@material-ui/icons/Home';
import PhotoIcon from '@material-ui/icons/PhotoCamera';
import AirplaneIcon from '@material-ui/icons/AirplanemodeActive';
import PeopleIcon from '@material-ui/icons/People';
import ContactIcon from '@material-ui/icons/Mail';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import grey from '@material-ui/core/colors/grey';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Collapse from '@material-ui/core/Collapse';
import {
  Twitter,
  Email,
  Instagram,
  GithubCircle,
} from 'mdi-material-ui';


import Destinations from './destinations';
import CCSvg from '../static/license.svg';

const drawerWidth = 230;

const styles = theme => ({
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  toolbar: {
    ...theme.mixins.toolbar,
    paddingLeft: (theme.spacing.unit * 6) + 42,
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  toolbarIe11: {
    display: 'flex',
  },
  root: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    minHeight: '100%',
    backgroundColor: grey['50'],
  },
  content: {
    height: '100%',
    paddingLeft: drawerWidth,
    padding: theme.spacing.unit * 6,
  },
  wrapper: {
    height: '100%',
  },
  fullWidth: {
    width: '100%',
    display: 'flex',
    flexFlow: 'column',
    maxWidth: 1200,
    flex: 1,
  },
  appBar: {
    flex: 'none',
    flexWrap: 'wrap',
    zIndex: 100,
    flexDirection: 'row',
  },
  titleToolbar: {
    justifyContent: 'space-between',
    display: 'flex',
    flex: 1,
  },
  'content-left': {
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
  hide: {
    display: 'none',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    paddingLeft: drawerWidth + theme.spacing.unit,
    padding: theme.spacing.unit * 6,
    width: '100%',
  },
  list: {
    margin: 0,
    paddingLeft: 0,
    listStyle: 'none',
    display: 'inline',
  },
  icon: {
    margin: theme.spacing.unit / 2,
  },
});


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      expandDestinations: false,
    };
  }

  toggleDrawer(state) {
    this.setState({ open: state });
  }

  toggleList(item) {
    const { [item]: currentState } = this.state;
    this.setState({ [item]: !currentState });
  }

  render() {
    const {
      classes,
      title,
      children,
    } = this.props;
    const { open, expandDestinations } = this.state;

    return (
      <div className={classes.wrapper}>
        <Helmet titleTemplate="OAsome - %s" defaultTitle="OAsome Blog">
          <meta name="description" content="OAsome secrets is a travel blog of couple. We detail out unique experiences and adventures around the world." />
          <html lang="en" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta name="HandheldFriendly" content="True" />
        </Helmet>
        <AppBar
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
            [classes['appBarShift-left']]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={() => this.toggleDrawer(true)}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography style={{ padding: '0.5rem' }} variant="title" color="inherit" noWrap>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="persistent"
          classes={{ paper: classes.drawerPaper }}
          anchor="left"
          open={open}
        >
          <div className={classes.toolbarIe11}>
            <div className={classes.toolbar}>
              <div className={classes.drawerHeader}>
                <IconButton onClick={() => this.toggleDrawer(false)}>
                  <MenuIcon />
                </IconButton>
              </div>
              <Typography variant="title" color="inherit">
                OAsome
              </Typography>
              <Typography variant="caption">
                { /* eslint-disable-next-line react/jsx-one-expression-per-line */ }
                secrets
              </Typography>
            </div>
          </div>
          <Divider />
          <List component="nav">
            <div>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <ListItem button>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>
              </Link>
              <Link to="/archive/" style={{ textDecoration: 'none' }}>
                <ListItem button>
                  <ListItemIcon>
                    <ArchiveIcon />
                  </ListItemIcon>
                  <ListItemText primary="Archive" />
                </ListItem>
              </Link>
              <Link to="/photos/" style={{ textDecoration: 'none' }}>
                <ListItem button>
                  <ListItemIcon>
                    <PhotoIcon />
                  </ListItemIcon>
                  <ListItemText primary="Photos" />
                </ListItem>
              </Link>
              <ListItem button onClick={() => this.toggleList('expandDestinations')}>
                <ListItemIcon>
                  <AirplaneIcon />
                </ListItemIcon>
                <ListItemText primary="Destinations" />
              </ListItem>
              <Collapse in={expandDestinations} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Destinations />
                </List>
              </Collapse>
              <ListItem button>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="About us" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <ContactIcon />
                </ListItemIcon>
                <ListItemText primary="Reach us" />
              </ListItem>
            </div>
          </List>
        </Drawer>
        <div className={classNames(
          classes.content, classes['content-left'],
          {
            [classes.contentShift]: open,
            [classes['contentShift-left']]: open,
          },
        )}
        >
          <div className={classes.root}>
            <div className={classes.fullWidth}>
              { children }
            </div>
          </div>
        </div>
        <footer className={classes.footer}>
          <Grid container>
            <Grid item xs={12}>
              <ul className={classes.list}>
                  <Instagram className={classes.icon} />
                  <Twitter className={classes.icon} />
                  <GithubCircle className={classes.icon} />
                  <Email className={classes.icon} />
                  <img className={classes.icon} height="20" src={CCSvg} alt="Creative Common Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)" />
              </ul>
            </Grid>
            <Typography align="center">
              {'Both the texts and the photos are released under the '}
              <a rel="noopener noreferrer" target="_blank" href="https://creativecommons.org/licenses/by-nc-sa/4.0/" style={{ color: 'black' }}>
                Creative Commons License
              </a>
              {'. '}
            </Typography>
          </Grid>
        </footer>
      </div>
    );
  }
}


App.propTypes = {
  classes: PropTypes.shape().isRequired,
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};

App.defaultProps = {
  children: null,
};

export default withStyles(styles)(App);
