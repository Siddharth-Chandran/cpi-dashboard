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

/** Needs to be removed after completing backend API */
const data = [
    {
        month: 'January', actual: 4000, predicted: 5500,
    },
    {
        month: 'February', actual: 3000, predicted: 3500,
    },
    {
        month: 'March', actual: 2000, predicted: 3000,
    },
    {
        month: 'April', actual: 2780, predicted: 3908,
    },
    {
        month: 'May', actual: 1890, predicted: 3000,
    },
    {
        month: 'June', actual: 2390, predicted: 3800,
    },
    {
        month: 'July', actual: 3490, predicted: 4300,
    },
    {
        month: 'Auguest', actual: 3490, predicted: 4300,
    },
    {
        month: 'September', predicted: 4300,
    },
];

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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

    /** Initializing data with default data, will replace once handleCPISubmit function is called */
    state = {
        selectedDate: new Date(),
        cpi: 20,
    }

    handleDateChange = date => {
        this.setState({ selectedDate: date })
    }

    /** After fetching from backend, will re-render the data value of the page state */
    handleCPISubmit = () => {
        var date = this.state.selectedDate
        date = `${date.getFullYear()}-${date.getMonth() + 1}-01`
        fetch(`url/${date}`)
            .then(response => response.json())
            .then(data => this.setState({ cpi: data.value }))
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <CssBaseline />
                {/* NavBar - start */}
                <AppBar position="relative">
                    <Toolbar variant="dense">
                        <SportsSoccerOutlined className={classes.icon} />
                        <Typography variant="h6" color="inherit" noWrap>
                            CPI - StrawHats
                        </Typography>
                    </Toolbar>
                </AppBar>
                {/* NavBar - end */}
                <main>
                    {/* CPI header part */}
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
                    {/* CPI header end */}
                    {/* Div to collect date and submit to fetch CPI values */}
                    <div className={classes.dateLayout}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                clearable
                                openTo="year"
                                views={["year", "month"]}
                                value={this.state.selectedDate}
                                onChange={date => this.handleDateChange(date)}
                            />
                        </MuiPickersUtilsProvider>
                        <Button variant="contained" color="primary" className={classes.button} onClick={() => this.handleCPISubmit()}>Calcuate CPI</Button>
                        <Typography variant="subtitle1" >
                            CPI for {`${months[this.state.selectedDate.getMonth()]} ${this.state.selectedDate.getFullYear()}`} is {this.state.cpi}
                        </Typography>
                    </div>
                    {/* Div to collect date - End */}
                    {/* Chart container - Start */}
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
                    {/* Chart container - End */}
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