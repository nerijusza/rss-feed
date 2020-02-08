import * as React from "react"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import LogOut from "./auth/LogOut";

const AppHeader = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Grid container>
                    <Grid item xs={9}>
                            <Typography variant="h6">Rss Feed React Application</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container alignItems="flex-start" justify="flex-end">
                            <LogOut/>
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
};

export default AppHeader;
