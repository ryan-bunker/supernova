import * as React from 'react';
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Card, Accordion, AccordionSummary, Typography, AccordionDetails, Tooltip, TableContainer, Table, TableBody, TableRow, TableCell, IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Planet, PlanetMeta } from './client/stars';

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
    planet: Planet;
    meta: PlanetMeta;
}

export default function PlanetPanel(props: Props) {
    const classes = useStyles();

    return (
        <div>
            <Card>
                <Typography align="center" variant="h6">{props.planet.name}</Typography>
            </Card>
            <Accordion defaultExpanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Status</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TableContainer>
                        <Table size="small">
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">Ironium</TableCell>
                                    <TableCell align="right">{props.meta.surface.ironium} kT</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Boranium</TableCell>
                                    <TableCell align="right">{props.meta.surface.boranium} kT</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Germanium</TableCell>
                                    <TableCell align="right">{props.meta.surface.germanium} kT</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Mines</TableCell>
                                    <TableCell align="right">{props.meta.mines.count} of {props.meta.mines.max}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Factories</TableCell>
                                    <TableCell align="right">{props.meta.factories.count} of {props.meta.factories.max}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Population</TableCell>
                                    <TableCell align="right">{props.meta.population}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Resources/Year</TableCell>
                                    <TableCell align="right">--</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Scanner Type</TableCell>
                                    <TableCell align="right">--</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Scanner Range</TableCell>
                                    <TableCell align="right">--</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>Fleets in Orbit</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
</Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography className={classes.heading}>Disabled Accordion</Typography>
                </AccordionSummary>
            </Accordion>
        </div>
    );
}