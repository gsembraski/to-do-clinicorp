import { Component } from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    TextField,
    FormControl,
    Switch,
    FormControlLabel,
    FormGroup,
    MenuItem
} from '@mui/material';
import { GetUserLogged } from "../../api/AuthApi";
import WorkListType from "../workList/WorkListType";

export class SaveWorkItemDialogComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            title: !!props.item ? "Update WorkList Infos" : "Create WorkList",
            name: (props.item || {}).name,
            description: (props.item || {}).description,
            step: (props.item || {}).step,
            isBlock: (props.item || {}).isBlock
        };
        GetUserLogged((authUser) => this.setState({ ...this.state, user: authUser }));
    }

    componentDidMount() {
    }

    handleClose = () => {
        this.setState({});
        this.props.onClose(false);
    };

    saveValue = async () => {
        this.props.onClose({ item: { ...this.props.item, name: this.state.name, description: this.state.description, isBlock: this.state.isBlock } });
        this.setState({});
    };

    render() {
        return (
            <Dialog onClose={this.handleClose} open={this.props.open} fullWidth>
                <DialogTitle>{this.state.title}</DialogTitle>

                <DialogContent>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1 },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <FormControl sx={{ m: 1 }} fullWidth>
                            <TextField
                                required
                                id="outlined-required"
                                label="Name"
                                value={this.state.name}
                                onChange={(e) => { this.setState({ ...this.state, name: e.target.value }) }}
                            />
                        </FormControl>

                        <FormControl sx={{ m: 1 }} fullWidth>
                            <TextField
                                id="outlined-multiline-static"
                                multiline
                                required
                                label="Description"
                                rows={3}
                                value={this.state.description}
                                onChange={(e) => { this.setState({ ...this.state, description: e.target.value }) }}
                            />
                        </FormControl>

                        <FormControl sx={{ m: 1 }} fullWidth>
                            <TextField
                                id="outlined-select-currency"
                                select
                                required
                                label="Step"
                                onChange={(e) => { this.setState({ ...this.state, step: e.target.value }) }}
                            >
                                {WorkListType().map((option) => (
                                    <MenuItem key={option.key} value={option.key}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>

                        <FormGroup sx={{ m: 1, float: "right" }}>
                            <FormControlLabel control={
                                <Switch
                                    value={this.state.isBlock}
                                    onChange={(e) => { this.setState({ ...this.state, isBlock: e.target.value }) }}
                                    inputProps={{ 'aria-label': 'Switch A' }}
                                />
                            } label="Block item" />

                        </FormGroup>
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={this.handleClose}>Close</Button>

                    <Button onClick={this.saveValue} autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}