import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '50em'
    },
    paper: {
      width: '50em',
      margin: theme.spacing(8,4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  
  const NewPasswordScript = ({onSigninSubmit, code, onCodeChange}) => {
    const classes = useStyles();
  
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid  component={Paper}  square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Check your email
            </Typography>
            <form className={classes.form} onSubmit={onSigninSubmit} noValidate>
              <TextField
                margin="normal"
                fullWidth
                id="login"
                label="Code"
                name="code"
                autoComplete="code"
                autoFocus
                value={code}
                onChange={onCodeChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Confirm code
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/auth" variant="body2">
                    Back
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/auth/registration" variant="body2">
                    Sing up
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
  
  export default NewPasswordScript;