import * as React from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    TextField,
    FormControl,
} from '@mui/material';
import { addWorkList, updateWorkList } from '../../api/WorklistApi';
import { useState } from 'react';
import { DashboardCustomize, Edit } from '@mui/icons-material';

function SaveWorkListDialog(props) {
    const { onClose, selectedValue, open, item } = props;
    const title = !!selectedValue ? "Update WorkList Infos" : "Create WorkList";
    const [name, setName] = useState((item || {}).name || '');

    const handleClose = () => {
        setName("");
        onClose(false);
    };

    const saveValue = async () => {
        if (!!selectedValue) await updateWorkList(selectedValue, { ...item, name: name });
        else await addWorkList({
            name: name,
            items: []
        });

        setName("");
        onClose(true);
    };

    return (
        <Dialog onClose={handleClose} open={open} fullWidth>
            <DialogTitle>{title}</DialogTitle>

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
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                    </FormControl>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Close</Button>

                <Button onSubmitCapture={saveValue} onClick={saveValue} autoFocus>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export function AddWorkListComponent({ onSave }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        onSave();
    };

    return (
        <div>
            <Button size="medium" onClick={handleClickOpen} startIcon={<DashboardCustomize />}>
                New WorkList
            </Button>

            <SaveWorkListDialog
                open={open}
                onClose={handleClose}
            />
        </div>
    );
}

export function ChangeWorkListComponent({item, onSave}) {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(item.id);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
        onSave();
    };

    return (
        <div>
            <Button size="medium" onClick={handleClickOpen} startIcon={<Edit />}>
                Update
            </Button>

            <SaveWorkListDialog
                selectedValue={selectedValue}
                item={item}
                open={open}
                onClose={handleClose}
            />
        </div>
    );
}