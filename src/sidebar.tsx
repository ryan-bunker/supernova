import * as React from 'react';
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Card, Accordion, AccordionSummary, Typography, AccordionDetails, Tooltip, TableContainer, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Pagination, PaginationItem, PaginationRenderItemParams } from '@material-ui/lab';
import { Planet, PlanetMeta } from './client/stars';
import { useState } from 'react';
import PlanetPanel from './planet_panel';
import * as _ from 'lodash';

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
    planets: { p: Planet, m: PlanetMeta }[]
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
                <Tooltip title={props.planets[item.page - 1].p.name}>
                    {child}
                </Tooltip>
            );
        }
        return child;
    }

    return (
        <div>
            <Pagination count={props.planets.length} renderItem={(item) => (
                wrapWithTooltip(item, <PaginationItem {...item} />)
            )} onChange={handleChange} />
            <PlanetPanel planet={planet.p} meta={planet.m} />
        </div>
    );
}