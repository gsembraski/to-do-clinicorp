import { Button, Card, CardActions, CardContent } from "@mui/material";
import { SignInWithGoogle, GetUserLogged } from "../../api/AuthApi";
import Typography from '@mui/material/Typography';
import { Navigate, redirect } from "react-router-dom";
import { Component } from "react";

function loginGoogle() {
    SignInWithGoogle()
        .then(result => {
            if (result) redirect("/");
        });
}

export default class LoginComponent extends Component {
    constructor() {
        super()
        this.state = { user: null }
    }

    componentDidMount() {
        GetUserLogged((authUser) => this.setState({ user: authUser }));
    }

    render() {
        if(!!this.state.user)
        return <Navigate to="/" />;

        return (
            <Card sx={{ minWidth: 400, minHeight: 250, position: "relative", alignSelf: "center" }}>
                <CardContent>
                    <Typography component="h2" fontWeight={600} variant="row">
                        Login
                    </Typography>
                </CardContent>

                <CardActions sx={{
                    position: "absolute",
                    justifyContent: "center",
                    width: "100%",
                    bottom: 0,
                    left: "50%",
                    transform: "translate(-50%)"
                }}>
                    <img src={"./google-logo.svg"} alt="" />
                    <Button onClick={loginGoogle}>
                        Entrar com o Google
                    </Button>
                </CardActions>
            </Card>
        );
    }
};