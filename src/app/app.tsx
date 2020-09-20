import * as React from 'react';
import { createStyles, Theme, WithStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Renderer } from './renderer';
import './style.css';
import { Point } from './2d';
import { StarsClient, Planet, PlanetMeta, Star } from './client/stars';
import { PlayerClient, PlanetWithMeta, Ship } from './client/player';
import MessageList from './message_list';
import PlanetSummary from './planet_summary';
import Game from './server/game';
import Sidebar from './sidebar';
import * as _ from 'lodash';
import { ApolloClient } from 'apollo-client';
import { gql } from 'apollo-boost';
import { SectorCache } from './sector_cache';

const MAP_SIZE = 1000,
    SECTOR_SIZE = 30_860_000_000_000_000,
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
            bottom: 0,
            left: 0,
            //right: 0,
            padding: theme.spacing(2),
            width: '75%',
            height: '33%',
        },
        sidebar: {
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            padding: theme.spacing(2),
            width: '25%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
    });

interface Props extends WithStyles<typeof styles> {
    serverWorker: Worker;
    graphClient: ApolloClient<any>;
}

interface State {
    messages: string[];
    planet?: Planet;
    planetMeta?: PlanetMeta;
    planets: Readonly<PlanetWithMeta[]>;
}

const App = withStyles(styles)(
    class extends React.Component<Props, State> {
        private readonly _renderer: Renderer;
        // client instances
        private readonly _starClient: StarsClient;
        private readonly _playerClient: PlayerClient;

        constructor(props: Props) {
            super(props);
            const canvas = document.getElementById('canvas') as HTMLCanvasElement;

            this.state = {
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
                planets: []
            };

            this._starClient = new StarsClient(props.graphClient);
            this._playerClient = new PlayerClient(1, this._starClient, props.serverWorker, props.graphClient);
            const sectorCache = new SectorCache(this._starClient);
            
            let playerHomeworld: Planet|undefined = undefined;
            const getHomeworld = (): Readonly<Planet> => {
                return playerHomeworld!;
            }
            
            let playerShips: Readonly<Ship[]>|undefined = undefined;
            const getShips = (): Readonly<Ship[]> => {
                if (playerShips) {
                    return playerShips;
                }
                this._playerClient.getShips().then(ships => {
                    playerShips = ships;
                });
                return [];
            }

            this._renderer = new Renderer(canvas, SECTOR_SIZE, sectorCache, { getHomeworld, getShips }, item => {
                console.log(item);

                if (item === undefined) {
                    this.setState({ planet: undefined, planetMeta: undefined });
                } else if (item.type == 'Planet') {
                    this._starClient.getPlanetMeta(item.item.id).then(
                        meta => this.setState({ planet: item.item, planetMeta: meta }));
                } else {
                    this.setState({ planet: undefined, planetMeta: undefined });
                }
            });

            // this._renderer.transform.scale = 5;
            this._playerClient.getHomeworld().then(
                homeworld => {
                    playerHomeworld = homeworld;
                    this._renderer.selectedItem = { type: "Planet", item: homeworld };
                    //const { x, y } = this._renderer.transform.transform(new Point(homeworld.star.x, homeworld.star.y));
                    //this._renderer.transform.translateTo(-x + canvas.width / 2, -y + canvas.height / 3);

                    this._renderer.render();
                });

            this._playerClient.getPlanets().then(planets => this.setState({ planets }))
        }

        render() {
            const { classes } = this.props;

            let selectedSummary: JSX.Element | null = null;
            if (this.state.planet) {
                selectedSummary =
                    <PlanetSummary
                        planet={this.state.planet}
                        planetMeta={this.state.planetMeta}
                        gravityRange={Game.gravityRange}
                        tempRange={Game.temperatureRange}
                        radiationRange={Game.radiationRange} />
            }

            return (
                <>
                    {/*<div className={classes.footer}>*/}
                    {/*    <Grid container spacing={3} style={{ height: 'calc(100% + 24px)' }}>*/}
                    {/*        <Grid item xs style={{ height: '100%' }}>*/}
                    {/*            <MessageList messages={this.state.messages} />*/}
                    {/*        </Grid>*/}
                    {/*        <Grid item xs style={{ height: '100%' }}>*/}
                    {/*            {selectedSummary}*/}
                    {/*        </Grid>*/}
                    {/*    </Grid>*/}
                    {/*</div>*/}
                    {/*<div className={classes.sidebar}>*/}
                    {/*    <Sidebar planets={this.state.planets} />*/}
                    {/*</div>*/}
                </>
            );
        }
    });

export default App;