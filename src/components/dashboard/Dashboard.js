import React, { forwardRef } from 'react';
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
import MaterialTable from 'material-table'
import { AddBox, ArrowUpward, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline, Edit, FilterList } from '@material-ui/icons';
import { FirstPage, LastPage, Remove, SaveAlt, Search, ViewColumn } from '@material-ui/icons';
import LinearProgress from '@material-ui/core/LinearProgress';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

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
        padding: theme.spacing(4, 0, 6),
    },
    chartBody: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        marginLeft: theme.spacing(0),
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    bodyLayout: {
        width: 'auto',
        margin: theme.spacing(3),
        padding: theme.spacing(2)
    },
    dateLayout: {
        marginLeft: theme.spacing(5),
        marginTop: theme.spacing(2)
    },
    button: {
        marginLeft: theme.spacing(4),
        marginTop: theme.spacing(0)
    },
    progress: {
        margin: theme.spacing(2),
    },
});


class Dashboard extends React.Component {

    /** Initializing data with default data, will replace once handleCPISubmit function is called */
    state = {
        selectedDate: new Date(),
        cpi: '',
        columnData: [],
        rawCPIData: undefined,
        trainedCpiData: undefined,
        loading: false
    }

    componentDidMount() {
        this.getRawCPIData()
        this.getTrainedCPIData()
    }

    handleDateChange = date => {
        this.setState({ selectedDate: date })
    }

    /** After fetching from backend, will re-render the data value of the page state */
    handleCPISubmit = () => {
        this.setState({ cpi: '' })
        var date = this.state.selectedDate
        date = `${date.getFullYear()}-${date.getMonth() + 1}-01`
        fetch(`http://localhost:5000/time/${date}`)
            .then(response => response.json())
            .then(data => this.setState({ cpi: data }))
    }

    /** Function to be called when we want to re-train with the edited data */
    handReTrain = () => {
        this.setState({ loading: true })
        fetch('http://localhost:5000/train')
            .then(response => response.json())
            .then(data => this.setState({ trainedCpiData: data, loading: false }))
            .catch(error => {
                alert("ERROR: SVD failed to converge")
                this.setState({ loading: false })
            })
    }

    /** Get past CPI values in JSON format from back-end */
    getRawCPIData = () => {
        fetch('http://localhost:5000/getjson')
            .then(response => response.json())
            .then(data => {
                let columnData = data.reduce((keys, obj) => (
                    keys.concat(Object.keys(obj).filter(key => (
                        keys.indexOf(key) === -1
                    )))
                ), [])
                this.setState({ rawCPIData: data, columnData: columnData })
            })
    }

    getTrainedCPIData = () => {
        fetch('http://localhost:5000/trainedCpiData')
            .then(response => response.json())
            .then(data => this.setState({ trainedCpiData: data }))
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
                    <br /><br />
                    <div className={classes.bodyLayout}>
                        {/* Table for all CPI past data with edit option */}
                        <MaterialTable
                            title="CPI historical data"
                            columns={
                                this.state.columnData === [] ?
                                    { title: 'Year', field: 'Year' } :
                                    this.state.columnData.map(data => {
                                        if (data === "Group") return { title: data, field: data, defaultGroupOrder: 0 }
                                        else if (data === "Sub Group") return { title: data, field: data, defaultGroupOrder: 1 }
                                        else return { title: data, field: data }
                                    })
                            }
                            data={this.state.rawCPIData}
                            icons={tableIcons}
                            options={{
                                search: true,
                                exportButton: true,
                                exportAllData: true,
                                grouping: true,
                                headerStyle: {
                                    backgroundColor: '#01579b',
                                    color: '#FFF'
                                }
                            }}
                            editable={{
                                onRowUpdate: (newData, oldData) =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            {
                                                const data = this.state.rawCPIData;
                                                const index = data.indexOf(oldData);
                                                data[index] = newData;
                                                fetch('http://localhost:5000/changecpi', {
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                    },
                                                    body: JSON.stringify(newData),
                                                })
                                                    .then(response => response.text())
                                                    .then(data => console.log(data))
                                                this.setState({ rawCPIData: data }, () => resolve());
                                            }
                                            resolve()
                                        }, 1000)
                                    })
                            }}
                        />
                        <br /><br />

                        {/* div to collect date and submit to fetch CPI values */}
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
                            <Button variant="contained" color="secondary" className={classes.button} onClick={() => this.handReTrain()}>Train Model</Button>
                            {
                                this.state.cpi !== undefined &&
                                <Typography variant="subtitle1" >
                                    CPI for {`${months[this.state.selectedDate.getMonth()]} ${this.state.selectedDate.getFullYear()}`} is {this.state.cpi}
                                </Typography>
                            }
                            {
                                this.state.loading &&
                                <LinearProgress color="secondary" />
                            }
                        </div>
                    </div>
                    {/* Div to collect date - End */}
                    {/* Chart container - Start */}
                    {
                        this.state.trainedCpiData !== undefined &&
                        <Container className={classes.chartBody} maxWidth="md">
                            <LineChart
                                width={900}
                                height={400}
                                data={this.state.trainedCpiData}
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 5,
                                }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="actual" stroke="#ff0000" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="predicted" stroke="#82ca9d" />
                            </LineChart>
                        </Container>
                    }
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
