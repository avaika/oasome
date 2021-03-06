import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { push } from 'gatsby';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import Location from '@material-ui/icons/LocationOn';
import DateIcon from '@material-ui/icons/DateRange';
import Timer from '@material-ui/icons/Timer';
import Menu from '@material-ui/core/Menu';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import TagCloud from './tagCloud';
import Share from './share';
import { capitalize } from './tools';

const chipStyle = theme => (
  {
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
      marginLeft: 'auto',
    },
    header: {
      ...theme.typography.subtitle1,
    },
    actions: {
      display: 'flex',
    },
    spacer: {
      margin: theme.spacing.unit,
    },
    headerIcon: {
      paddingLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      display: 'inline-flex',
      alignSelf: 'center',
      height: '1.25em',
      width: '1.25em',
      position: 'relative',
      top: '0.3em',
    },
  }
);

class CardPost extends Component {
  static createChip(classes, tag) {
    return (
      <Chip
        className={classes.chip}
        label={tag}
      />
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      shareOpen: false,
      anchorEl: null,
    };
  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget, shareOpen: true });
  }

  handleClose() {
    this.setState({ anchorEl: null, shareOpen: false });
  }

  gotoPrevLightboxImage() {
    const { photo } = this.state;
    this.setState({ photo: photo - 1 });
  }

  gotoNextLightboxImage() {
    const { photo } = this.state;
    this.setState({ photo: photo + 1 });
  }

  renderCard() {
    const {
      classes,
      title,
      date,
      cover,
      expand,
      timeToRead,
      country,
      path,
    } = this.props;
    const { shareOpen, anchorEl } = this.state;

    return [
      <CardHeader
        key={`${title}-header`}
        title={title}
        classes={{ title: classes.header }}
        titleTypographyProps={{ variant: expand ? 'subtitle1' : 'h4' }}
        subheader={(
          <div>
            {!expand && <DateIcon className={classes.headerIcon} />}
            {!expand && `${date}`}
            <Location className={classes.headerIcon} />
            {`${capitalize(country)}`}
            <Timer className={classes.headerIcon} />
            {`${timeToRead} min read`}
          </div>
        )}
        action={!expand && (
          <div>
            <IconButton
              aria-label="Share"
              aria-owns={shareOpen ? 'share-menu' : null}
              aria-haspopup="true"
              onClick={evt => this.handleClick(evt)}
            >
              <ShareIcon title={title} path={path} />
            </IconButton>
            <Menu
              id="share-menu"
              anchorEl={anchorEl}
              open={shareOpen}
              onClose={() => this.handleClose()}
            >
              <Share title={title} path={path} />
            </Menu>
          </div>
        )}
      />,
      <CardMedia key={`${title}-media`} title={title}>
        <Img fluid={cover.childImageSharp.fluid} />
      </CardMedia>,
    ];
  }

  render() {
    const {
      classes,
      tags,
      expand,
      path,
      content,
    } = this.props;

    return (
      <div>
        <Card className={classes.spacer}>
          {expand
            ? (
              <CardActionArea onClick={() => push(path)}>
                {this.renderCard()}
              </CardActionArea>)
            : this.renderCard()
          }
          {!expand && (
            <CardContent component="article">
              {content}
            </CardContent>
          )}
          <CardActions className={classes.actions} disableActionSpacing>
            <TagCloud tags={expand ? tags.slice(0, 3) : tags} />
            {expand && (
              <IconButton
                className={classes.expand}
                onClick={() => push(path)}
                aria-label="Read"
              >
                <ExpandMoreIcon />
              </IconButton>
            )}
          </CardActions>
        </Card>
      </div>
    );
  }
}

CardPost.propTypes = {
  classes: PropTypes.shape().isRequired,
  title: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  date: PropTypes.string.isRequired,
  path: PropTypes.string,
  content: PropTypes.node.isRequired,
  expand: PropTypes.bool.isRequired,
  cover: PropTypes.shape(),
  country: PropTypes.string.isRequired,
  timeToRead: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

CardPost.defaultProps = {
  cover: {},
  path: null,
};


export default withStyles(chipStyle, { withTheme: true })(CardPost);
