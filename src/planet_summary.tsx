import * as React from 'react';
import { Card, CardContent, Typography, Grid, Tooltip, Box, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import { Planet, PlanetMeta } from "./client/stars";
import CircularGauge from './circular_gauge';

const planetMonikers = [
    "Alpha",
    "Beta",
    "Gamma",
    "Delta",
    "Epsilon",
    "Zeta",
    "Eta",
    "Theta",
    "Iota",
    "Kappa"
];

interface Props {
    planet: Planet;
    planetMeta?: PlanetMeta;
    gravityRange: { min: number, max: number };
    tempRange: { min: number, max: number };
    radiationRange: { min: number, max: number };
}
// Gravity: 0.12g to 8.00g
// Temp: -200*C to 200*C
// Rad: 0mr to 100mr

export default function PlanetSummary(props: Props) {
    let content: JSX.Element;
    if (props.planetMeta) {
        content = (
            <>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Typography align="center">Gravity - {props.planetMeta.gravity}g</Typography>
                    <Tooltip placement="top" title={`Gravity is ${props.planetMeta.gravity}g - Habitable Range is ${props.gravityRange.min}g to ${props.gravityRange.max}g`}>
                        <Box style={{height: 100}}>
                            <CircularGauge min={0.12} max={8} low={0.22} high={4.4} value={props.planetMeta.gravity} unit="g" color={"#0000cc"} />
                        </Box>
                    </Tooltip>
                </Grid>
                <Grid item xs={4}>
                    <Typography align="center">Temp - {props.planetMeta.temperature}°C</Typography>
                    <Tooltip placement="top" title={`Temperature is ${props.planetMeta.temperature}°C - Habitable Range is ${props.tempRange.min}°C to ${props.tempRange.max}°C`}>
                        <Box style={{height: 100}}>
                            <CircularGauge min={-200} max={200} low={-140} high={140} value={props.planetMeta.temperature} unit="°C" color={"#cc0000"} />
                        </Box>
                    </Tooltip>
                </Grid>
                <Grid item xs={4}>
                    <Typography align="center">Radiation - {props.planetMeta.radiation}mr</Typography>
                    <Tooltip placement="top" title={`Radiation is ${props.planetMeta.radiation}mr - Habitable Range is ${props.radiationRange.min}mr to ${props.radiationRange.max}mr`}>
                        <Box style={{height: 100}}>
                            <CircularGauge min={0} max={100} low={15} high={85} value={props.planetMeta.radiation} unit="mr" color={"#00cc00"} />
                        </Box>
                    </Tooltip>
                </Grid>
            </Grid>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell align="right">Surface</TableCell>
                            <TableCell align="right">Concentration</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">Ironium</TableCell>
                            <TableCell align="right">{props.planetMeta.surface.ironium} kT</TableCell>
                            <TableCell align="right">{(props.planetMeta.concentration.ironium * 100).toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">Boranium</TableCell>
                            <TableCell align="right">{props.planetMeta.surface.boranium} kT</TableCell>
                            <TableCell align="right">{(props.planetMeta.concentration.boranium * 100).toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">Germanium</TableCell>
                            <TableCell align="right">{props.planetMeta.surface.germanium} kT</TableCell>
                            <TableCell align="right">{(props.planetMeta.concentration.germanium * 100).toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            </>
        )
    } else {
        content = (
            <Typography>No information known</Typography>
        );
    }

    return (
        <Card style={{ height: '100%', overflow: 'auto' }}>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>{props.planet.name} Summary</Typography>
                {content}
            </CardContent>
        </Card>
    );
}