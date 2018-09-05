import {AppBar, Button, Toolbar, Typography} from '@material-ui/core/';
import * as React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.StatelessComponent<{}> = () => {
    return (
        <AppBar position="static" color="default">
            <Toolbar>
                <Typography variant="display2">
                    <Link style={{color: "Black", textDecoration: 'none'}} to="/"><Button style={{fontSize:20}}> Rates </Button></Link>
                    <Link style={{color: "Black", textDecoration: 'none'}} to="/Conversion"> <Button style={{fontSize:20}}> Conversion </Button></Link>
                </Typography>
            </Toolbar>
        </AppBar>
    );
}