import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import SportsSoccerOutlined from '@material-ui/icons/SportsSoccerOutlined';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';

const data = [
    {
        name: 'January', actual: 4000, predicted: 5500, amt: 2400,
    },
    {
        name: 'February', actual: 3000, predicted: 3500, amt: 2210,
    },
    {
        name: 'March', actual: 2000, predicted: 3000, amt: 2290,
    },
    {
        name: 'April', actual: 2780, predicted: 3908, amt: 2000,
    },
    {
        name: 'May', actual: 1890, predicted: 3000, amt: 2181,
    },
    {
        name: 'June', actual: 2390, predicted: 3800, amt: 2500,
    },
    {
        name: 'July', actual: 3490, predicted: 4300, amt: 2100,
    },
    {
        name: 'Auguest', actual: 3490, predicted: 4300, amt: 2100,
    },
    {
        name: 'September', predicted: 4300, amt: 2100,
    },
];

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/Siddharth-Chandran/cpi-dashboard">
                Straw Hats
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const styles = theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6, 0, 6),
    },
    chartBody: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        marginLeft: theme.spacing(2),
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    dateLayout: {
        width: 'auto',
        marginRight: theme.spacing(3),
        marginLeft: theme.spacing(12),
        marginTop: theme.spacing(3),
        paddingTop: theme.spacing(1)
    },
    button: {
        marginLeft: theme.spacing(2),
    },
});


class Dashboard extends React.Component {

    state = {
        selectedDate: new Date(),
    }

    handleDateChange = date => {
        this.setState({ selectedDate: date })
    }

    handleCPISubmit = () => {
        var date = this.state.selectedDate.toISOString()
        date = date.substr(0, date.indexOf("T"))
        /** Uncomment below when the API is ready */
        // fetch('url')
        //     .then(response => response.json())
        //     .then(data => {
        //         /** Do whatever we want to create the graphs */
        //         return data
        //     })
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <CssBaseline />
                <AppBar position="relative">
                    <Toolbar variant="dense">
                        <SportsSoccerOutlined className={classes.icon} />
                        <Typography variant="h6" color="inherit" noWrap>
                            CPI - StrawHats
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main>
                    <div className={classes.heroContent}>
                        <Container maxWidth="sm">
                            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                CPI Prediction
                            </Typography>
                            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                                A group of lawless pirates trying to predict the cpi index of India.
                            </Typography>
                        </Container>
                    </div>
                    <div className={classes.dateLayout}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                clearable
                                value={this.state.selectedDate}
                                placeholder="10/10/2018"
                                onChange={date => this.handleDateChange(date)}
                                format="dd-MMM-yyyy"
                            />
                        </MuiPickersUtilsProvider>
                        <Button variant="contained" color="primary" className={classes.button} onClick={() => this.handleCPISubmit()}>Calcuate CPI</Button>
                    </div>
                    <Container className={classes.chartBody} maxWidth="md">
                        <LineChart
                            width={550}
                            height={300}
                            data={data}
                            margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                            }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="actual" stroke="#8884d8" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="predicted" stroke="#82ca9d" />
                        </LineChart>
                    </Container>
                </main>

                {/* Footer */}
                <footer className={classes.footer}>
                    <Typography variant="h6" align="center" gutterBottom>
                        Monkey D Luffy
        </Typography>
                    <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                        Gomu gomu no mi !
        </Typography>
                    <Copyright />
                </footer>
                {/* End footer */}
            </React.Fragment>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);