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
import { Delete } from "@mui/icons-material";

export class SaveWorkItemDialogComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            title: !!props.item ? "Update WorkList Infos" : "Create WorkList",
            name: (props.item || {}).name || "",
            description: (props.item || {}).description || "",
            step: (props.item || {}).step || "",
            isBlock: (props.item || {}).isBlock || false
        };
    }

    componentDidMount() {
        GetUserLogged((authUser) => this.setState({ ...this.state, user: authUser }));
    }

    disabledFields() {
        return !this.state.user || (this.props.item && (this.props.item || {}).user && (this.props.item || {}).isBlock && ((this.props.item || {}).user || {}).id !== this.state.user.uid);
    }

    handleClose = () => {
        this.setState({ user: null });
        this.props.onClose(false);
    };

    saveValue = async () => {
        this.props.onClose({
            item: {
                ...this.props.item,
                user: (this.props.item || {}).id ? this.props.item.user : { id: this.state.user.uid, email: this.state.user.email, displayName: this.state.user.displayName },
                name: this.state.name,
                description: this.state.description,
                isBlock: this.state.isBlock,
                step: this.state.step
            }
        });
        this.setState({ user: null });
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
                                disabled={this.disabledFields()}
                                required
                                id="outlined-required"
                                label="Name"
                                value={this.state.name}
                                onChange={(e) => { this.setState({ ...this.state, name: e.target.value }) }}
                            />
                        </FormControl>

                        <FormControl sx={{ m: 1 }} fullWidth>
                            <TextField
                                disabled={this.disabledFields()}
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
                                disabled={this.disabledFields()}
                                id="outlined-select-currency"
                                select
                                required
                                label="Step"
                                value={this.state.step}
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
                                    disabled={this.disabledFields()}
                                    checked={this.state.isBlock}
                                    onChange={(e) => { debugger; this.setState({ ...this.state, isBlock: e.target.checked }) }}
                                />
                            } label="Block item" />

                        </FormGroup>
                    </Box>

                    <Box sx={{ mt: 2, ml: 2, p: 1 }}>
                        {
                            !!this.props.item && !this.disabledFields() ? <Button variant="outlined" fullWidth color="error" startIcon={<Delete />}>Delete Item</Button> : null
                        }
                    </Box>
                </DialogContent>

                {
                    this.disabledFields() ? null :
                        <DialogActions>
                            <Button onClick={this.handleClose}>Close</Button>

                            <Button onClick={this.saveValue} autoFocus>
                                Save
                            </Button>
                        </DialogActions>
                }
            </Dialog>
        );
    }
}