import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStyles, Theme, WithStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { StarDB } from './server/stars';
import { PlayerInfo } from './server/player';
import { Renderer } from './renderer';
import './style.css';
import { Point } from './2d';
import { StarsClient } from './client/stars';
import { PlayerClient } from './client/player';
import { Card, MuiThemeProvider } from '@material-ui/core';
import MessageList from './message_list';
import CssBaseline from '@material-ui/core/CssBaseline';

const MAP_SIZE = 1000,
      SECTOR_SIZE = 1000,
      STAR_DENSITY = 10;

const rootData = {
    messages: [
        "Tip: You can hide unimportant messages by clicking the checkmark in the messages titlebar. You can reshow these messages at any time by clicking on the magnifying glass in the titlebar.",
        "Tip: To add waypoints, select a ship, then click on the desired destination while holding down the Shift key. You can also drag existing waypoints to move them to a new location.",
        "Tip: To design your own ships, press 'F4', select 'Available Hull Types', pick one from the dropdown, and hit the 'Copy' button.",
        "Tip: Popup help is available over many of the displayed statistics. For example you can click on planet statistics in the summary window to get additional details.",
        "Your home planet is Crabby. Your people are ready to leave the nest and explore the universe. Good luck.",
        "More",
        "Messages",
        "To",
        "Test",
        "With"
    ]
}

const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        footer: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            padding: theme.spacing(2),
            height: '33%',
        }
    });

interface Props extends WithStyles<typeof styles> {
}

const App = withStyles(styles)(
    class extends React.Component<Props> {
        private readonly _renderer: Renderer;
        // server instances
        private readonly _db = StarDB.generateUniverse('stars! is awesome', MAP_SIZE, SECTOR_SIZE, STAR_DENSITY);
        private readonly _playerDb = PlayerInfo.generatePlayer(this._db);
        // client instances
        private readonly _starClient = new StarsClient(this._db);
        private readonly _playerClient = new PlayerClient(this._starClient, this._playerDb);

        constructor(props: Props) {
            super(props);
            const canvas = document.getElementById('canvas') as HTMLCanvasElement;

            this._renderer = new Renderer(canvas, SECTOR_SIZE, this._starClient, this._playerClient);

            this._renderer.transform.scale = 5;
            const homeworld = this._playerClient.homeworld;
            console.log(homeworld);
            const { x, y } = this._renderer.transform.transform(new Point(homeworld.star.x, homeworld.star.y));
            this._renderer.transform.translateTo(-x + canvas.width / 2, -y + canvas.height / 3);
        }

        render() {
            const { classes } = this.props;
            window.requestAnimationFrame(() => this._renderer.render());
            return (
                <div className={classes.footer}>
                    <Grid container spacing={3} style={{height: 'calc(100% + 24px)'}}>
                        <Grid item xs={4} style={{height: '100%'}}>
                            <MessageList messages={rootData.messages} />
                        </Grid>
                        <Grid item xs={4}>
                            <Card className={classes.paper}>xs=3</Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card className={classes.paper}>xs=3</Card>
                        </Grid>
                    </Grid>
                </div>
            );
        }
    });

let domContainer = document.querySelector('#app-root');
ReactDOM.render(
    <MuiThemeProvider theme={darkTheme}>
        <CssBaseline />
        <App />
    </MuiThemeProvider>, domContainer);