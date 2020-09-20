import * as React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            height: '100%'
        },
        bgRing: {
            stroke: theme.palette.background.default
        }
    })
);

interface Props {
    min: number;
    max: number;
    low: number;
    high: number;
    value: number;
    unit: string;
    color: string;
}

export default function CircularGauge(props: Props) {
    const classes = useStyles();

    const r = 30;
    const minOuter = 0.1;
    const maxOuter = 0.9;
    const cOuter = 2 * Math.PI * r;
    const minOuterDist = minOuter * cOuter;
    const maxOuterDist = (maxOuter - minOuter) * cOuter;

    const toPct = (v: number) => (v - props.min) / (props.max - props.min);
    const lowPct = toPct(props.low);
    const highPct = toPct(props.high);
    const cInner = cOuter * 0.8;
    const lowDist = lowPct * cInner;
    const highDist = (highPct - lowPct) * cInner;

    const valuePct = toPct(props.value);
    const valX = 50 + r * Math.cos(2 * Math.PI * valuePct);
    const valY = 50 + r * Math.sin(2 * Math.PI * valuePct);

    return (
        <div className={classes.root}>
            <svg
                viewBox="0 0 100 100"
                style={{ width: '100%', height: '100%', transform: "rotate(90deg)" }}
            >
                <circle className={classes.bgRing}
                    cx="50"
                    cy="50"
                    r={r}
                    fill="none"
                    strokeWidth="14"
                    strokeDasharray={`${maxOuterDist}, ${cOuter - maxOuterDist}`}
                    strokeDashoffset={-minOuterDist}
                />
                <circle
                    cx="50"
                    cy="50"
                    r={r}
                    fill="none"
                    stroke={props.color}
                    strokeWidth="5"
                    strokeDasharray={`${highDist}, ${cOuter - highDist}`}
                    strokeDashoffset={-minOuterDist - lowDist}
                />
                <circle
                    cx={valX}
                    cy={valY}
                    r="3"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                />
            </svg>
        </div>
    );
}
