import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { StarDB } from './server/stars';
import { Renderer } from './renderer';
import './style.css';

const MAP_SIZE = 1000,
      SECTOR_SIZE = 1000,
      STAR_DENSITY = 10;
const db = StarDB.generateUniverse('stars! is awesome', MAP_SIZE, SECTOR_SIZE, STAR_DENSITY);

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

        constructor(props: Props) {
            super(props);
            const canvas = document.getElementById('canvas') as HTMLCanvasElement;
            this._renderer = new Renderer(canvas, SECTOR_SIZE, db);
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