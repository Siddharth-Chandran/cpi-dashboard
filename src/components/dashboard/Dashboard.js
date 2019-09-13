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
{'month': '2017-08-01', 'actual': 129.8, 'predicted': 129.45809104557068},
{'month': '2017-09-01', 'actual': 131.0, 'predicted': 130.10434840701507},
{'month': '2017-10-01', 'actual': 132.2, 'predicted': 131.69835331432338},
{'month': '2017-11-01', 'actual': 135.3, 'predicted': 132.7570800400743},
{'month': '2017-12-01', 'actual': 136.6, 'predicted': 136.78161568245736},
{'month': '2018-01-01', 'actual': 136.6, 'predicted': 137.17576719906998},
{'month': '2018-02-01', 'actual': 136.7, 'predicted': 136.57877863161767},
{'month': '2018-03-01', 'actual': 136.5, 'predicted': 136.58011318951367},
{'month': '2018-04-01', 'actual': 136.5, 'predicted': 136.14127745386108},
{'month': '2018-05-01', 'actual': 136.9, 'predicted': 136.2531466498307},
{'month': '2018-06-01', 'actual': 138.1, 'predicted': 138.15065128154185},
{'month': '2018-07-01', 'actual': 139.7, 'predicted': 139.29279728178417},
{'month': '2018-08-01', 'actual': 140.9, 'predicted': 140.72929358881444},
{'month': '2018-09-01', 'actual': 142.3, 'predicted': 141.691090115265},
{'month': '2018-10-01', 'actual': 143.5, 'predicted': 142.96817538683968},
{'month': '2018-11-01', 'actual': 145.1, 'predicted': 143.92684655276898},
{'month': '2018-12-01', 'actual': 142.7, 'predicted': 145.75087096050996},
{'month': '2019-01-01', 'actual': 139.5, 'predicted': 142.09819529313359},
{'month': '2019-02-01', 'actual': 138.4, 'predicted': 138.40226895094136},
{'month': '2019-03-01', 'actual': 139.7, 'predicted': 138.81392328042222},
{'month': '2019-04-01', 'actual': 140.0, 'predicted': 141.30510011820704},
{'month': '2019-05-01', 'actual': 140.3, 'predicted': 140.85413362852753},
{'month': '2019-06-01', 'actual': 141.2, 'predicted': 142.65377211532015},
{'month': '2019-07-01', 'actual': 139.2, 'predicted': 142.92884259303975}
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
        cpi: undefined,
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
                        {
                            this.state.cpi !== undefined &&
                            <Typography variant="subtitle1" >
                                CPI for {`${months[this.state.selectedDate.getMonth()]} ${this.state.selectedDate.getFullYear()}`} is {this.state.cpi}
                            </Typography>
                        }
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
                            <XAxis dataKey="month" />
                            <YAxis domain={[125, 148]} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="actual" stroke="#ff0000" activeDot={{ r: 8 }} />
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
