import * as React from 'react';
import { createStyles, Theme, WithStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { StarDB } from './server/stars';
import { PlayerInfo } from './server/player';
import { Renderer } from './renderer';
import './style.css';
import { Point } from './2d';
import { StarsClient, Planet, PlanetMeta } from './client/stars';
import { PlayerClient } from './client/player';
import MessageList from './message_list';
import PlanetSummary from './planet_summary';
import Game from './server/game';

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
    ],
    planet: undefined as (Planet|undefined),
    planetMeta: undefined as (PlanetMeta|undefined),
    gravityRange: [0.22, 4.4] as [number, number],
    tempRange: [-140, 140] as [number, number],
    radiationRange: [15, 85] as [number, number],
}

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

            this._renderer = new Renderer(canvas, SECTOR_SIZE, this._starClient, this._playerClient, item => {
                console.log(item);
                if (item.type == 'Planet') {
                    rootData.planet = item.item;
                    rootData.planetMeta = this._starClient.getPlanetMeta(item.item.star.id, item.item.id);
                }
                this.forceUpdate();
            });

            this._renderer.transform.scale = 5;
            const homeworld = this._playerClient.homeworld;
            rootData.planet = homeworld;
            rootData.planetMeta = this._starClient.getPlanetMeta(homeworld.star.id, homeworld.id);
            console.log(homeworld);
            const { x, y } = this._renderer.transform.transform(new Point(homeworld.star.x, homeworld.star.y));
            this._renderer.transform.translateTo(-x + canvas.width / 2, -y + canvas.height / 3);
        }

        render() {
            const { classes } = this.props;
            window.requestAnimationFrame(() => this._renderer.render());
            
            let selectedSummary: JSX.Element|null = null;
            if (rootData.planet) {
                selectedSummary =
                    <PlanetSummary
                        planet={rootData.planet}
                        planetMeta={rootData.planetMeta}
                        gravityRange={Game.gravityRange}
                        tempRange={Game.temperatureRange}
                        radiationRange={Game.radiationRange} />
            }

            return (
                <div className={classes.footer}>
                    <Grid container spacing={3} style={{height: 'calc(100% + 24px)'}}>
                        <Grid item xs style={{height: '100%'}}>
                            <MessageList messages={rootData.messages} />
                        </Grid>
                        <Grid item xs style={{height: '100%'}}>
                            {selectedSummary}
                        </Grid>
                    </Grid>
                </div>
            );
        }
    });

export default App;