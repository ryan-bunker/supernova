import * as React from 'react';
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Card, Accordion, AccordionSummary, Typography, AccordionDetails, Tooltip, TableContainer, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Pagination, PaginationItem, PaginationRenderItemParams } from '@material-ui/lab';
import {Planet, PlanetMeta, StarsClient} from './client/stars';
import {useEffect, useState} from 'react';
import PlanetPanel from './planet_panel';
import * as _ from 'lodash';
import { PlanetWithMeta } from './client/player';
import { ApolloClient } from 'apollo-boost';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
    }));

interface Props {
    planets: Readonly<PlanetWithMeta[]>;
    client: StarsClient;
}

export default function Sidebar(props: Props) {
    const classes = useStyles();
    const [planet, setPlanet] = useState(props.planets[0]);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPlanet(props.planets[value - 1]);
    };
    const wrapWithTooltip = (item: PaginationRenderItemParams, child: JSX.Element) => {
        if (item.type == "page") {
            return (
                <Tooltip title={props.planets[item.page - 1].name}>
                    {child}
                </Tooltip>
            );
        }
        return child;
    }
    useEffect(() => {
        if (!planet) {
            setPlanet(props.planets[0]);
        }
    });
    useEffect(() => {
        console.log(planet);
        if (!planet) return;
        const planetId = planet.id;
        const interval = setInterval(() => {
            props.client.getPlanet(planetId).then(p => {
                const p2 = p!;
                props.client.getPlanetMeta(planetId).then(pm => {
                    const meta = pm!;
                    setPlanet(Object.assign(new PlanetWithMeta(), {...p2, meta}));
                })
            })
        }, 1000);
        return () => clearInterval(interval);
    });
    
    return (
        <div>
            <Pagination count={props.planets.length} renderItem={(item) => (
                wrapWithTooltip(item, <PaginationItem {...item} />)
            )} onChange={handleChange} />
            {planet && planet.meta &&
                <PlanetPanel planet={planet} meta={planet.meta}/>
            }
        </div>
    );
}