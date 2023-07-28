import { Box, Stack } from '@mui/system';
import { Container } from '@mui/material';
import './App.css';
import RouteConfig from './routes';
import { GetUserLogged } from './api/AuthApi';
import { Component } from 'react';

export default class App extends Component {
  constructor() {
    super();
    this.state = { user: null };
  }

  componentDidMount() {
    GetUserLogged((result) => {
      if (result) this.setState({ user: result })
    })
  }

  render() {
    return (
      <div className="App">
        <Container maxWidth={false} disableGutters
          className='app-container'
          sx={{
            backgroundImage: "url(./login.png)",
            minHeight: "100vh",
            backgroundRepeat: "no-repeat",
            WebkitBackgroundSize: "100%"
          }}
        >
          <Box sx={{
            position: "absolute",
            height: "100vh",
            width: "100vw",
            backgroundColor: "#fff9",
          }} />

          <Stack
            justifyContent="center"
            direction="row"
            sx={{
              position: "relative",
              height: "100vh",
              width: "100vw"
            }}
          >
            <RouteConfig />
          </Stack>
        </Container>
      </div>
    );
  }
}
