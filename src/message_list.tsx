import * as React from 'react';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader, Divider, Switch, IconButton } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';
import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxHeight: '100%',
            backgroundColor: theme.palette.background.paper,
            position: 'relative',
            overflow: 'auto',
        },
        listSection: {
            backgroundColor: 'inherit',
        },
        ul: {
            backgroundColor: 'inherit',
            padding: 0,
        },
        secondaryAction: {
            paddingRight: 96
        }
    }),
);

interface Props {
    messages: string[]
}

export default function MessageList(props: Props) {
    const classes = useStyles();

    const messageItems = props.messages.map((message, i) => {
        return (
            <div key={i}>
                <ListItem className={classes.secondaryAction} alignItems="flex-start" dense button>
                    <ListItemIcon><EmailIcon /></ListItemIcon>
                    <ListItemText id="switch-list-label-wifi" primary={message} />
                    <ListItemSecondaryAction>
                        <IconButton>
                            <CenterFocusStrongIcon />
                        </IconButton>
                        <IconButton edge="end">
                            <VisibilityIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider variant="inset" />
            </div>
        );
    });

    return (
        <List subheader={<li />} className={classes.root}>
            <li className={classes.listSection}>
                <ul className={classes.ul}>
                    <ListSubheader>Messages</ListSubheader>
                    {messageItems}
                </ul>
            </li>
        </List>
    );
}