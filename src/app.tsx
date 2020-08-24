import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { StarDB } from './server/stars';
import { PlayerInfo } from './server/player';
import { Renderer } from './renderer';
import './style.css';
import { Point } from './2d';

const MAP_SIZE = 1000,
      SECTOR_SIZE = 1000,
      STAR_DENSITY = 10;

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
            bottom: 50
        }
    });

interface Props extends WithStyles<typeof styles> {
}

const App = withStyles(styles)(
    class extends React.Component<Props> {
        private readonly _renderer: Renderer;
        private readonly _db = StarDB.generateUniverse('stars! is awesome', MAP_SIZE, SECTOR_SIZE, STAR_DENSITY);
        private readonly _player = PlayerInfo.generatePlayer(this._db);

        constructor(props: Props) {
            super(props);
            const canvas = document.getElementById('canvas') as HTMLCanvasElement;
            this._renderer = new Renderer(canvas, SECTOR_SIZE, this._db, this._player);

            this._renderer.transform.scale = 5;
            const homeworld = this._player.homeworld;
            console.log(homeworld);
            const { x, y } = this._renderer.transform.transform(new Point(homeworld.star.x, homeworld.star.y));
            this._renderer.transform.translateTo(-x + canvas.width / 2, -y + canvas.height / 3);
        }

        render() {
            const { classes } = this.props;
            this._renderer.render();
            return (
                <Grid container spacing={3} className={classes.footer}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>xs=12</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>xs=6</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>xs=6</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>xs=3</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>xs=3</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>xs=3</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>xs=3</Paper>
                    </Grid>
                </Grid>
            );
        }
    });

let domContainer = document.querySelector('#app-root');
ReactDOM.render(<App />, domContainer);