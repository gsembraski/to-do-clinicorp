import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardActionArea, CardContent, Grid, Button, Box, Paper, Typography } from "@mui/material";
import { getWorkListById, updateWorkList } from "../../api/WorklistApi";
import { Add } from "@mui/icons-material";
import { v4 } from "uuid";
import WorkListTypes from "../workList/WorkListType"

import { SaveWorkItemDialogComponent } from "../workItem/WorkItemDatailsComponent";

export default function KanbanComponent() {
    const [workList, setWorkList] = useState(null);
    const [task, setTask] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const { id } = useParams();
    const stepTypes = WorkListTypes();

    useEffect(() => {
        if (!(workList || {}).id)
            loadWorkList();
    },);

    const loadWorkList = async () => {
        const items = await getWorkListById(id)

        setWorkList(items);
    };

    const updateStageItem = async (data) => {
        debugger
        if (!!data) {
            const { item } = data;
            const value = {
                ...workList,
                items: item.id ?
                    workList.items.map(task => {
                        return task.id === item.id ?
                            item :
                            task
                    }) :
                    [...(workList.items || []), { id: v4(), ...item }]
            };
            await updateWorkList(id, value);
            setWorkList(value);
            loadWorkList();
        }

        setTask(null);
        setOpenDialog(!openDialog);
    };

    const getStageTask = (stepName) => {
        return stepName ? (stepTypes.find(x => x.name === stepName) || {}).key : v4();
    };

    const handleAddTask = () => {
        setTask(null);
        setOpenDialog(!openDialog);
    };

    const handleUpdateTask = (item) => {
        setTask(item);
        setOpenDialog(!openDialog);
    };

    const getStageItems = (stepKey)=>{
        return (workList||{}).id ? (workList.items||[]).filter(x => x.step.key === stepKey) : []
    }

    return (
        <Box sx={{ flexGrow: 1, padding: "20px", margin: "30px 40px", backgroundColor: "#fff9", backgroundSize: "100%" }}>
            <Typography component={"h1"} variant="row" display={"flex"}>{(workList || {}).name}</Typography>
            <Grid container direction="row" justifyContent="flex-end">
                <Grid item justifyContent={"end"} marginX={0} marginY={2}>
                    <Button size="medium" onClick={handleAddTask} startIcon={<Add />}>
                        New Task
                    </Button>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                {stepTypes.map((step) => {
                        return (
                            <Grid key={step.key} item width={"100%"} sm={4}>
                                <Paper elevation={3}>
                                    <Typography component={"h4"} variant={"row"}>{step.name}</Typography>
                                    {getStageItems(step.key).map(item => (
                                        <Card key={item.id} onClick={() => handleUpdateTask(item, getStageTask(step.name))} style={{ marginBottom: '10px' }}>
                                            <CardActionArea>
                                                <CardContent>
                                                    <Typography variant="h6">{item.name}</Typography>
                                                    <Typography variant='subtitle1'>item.user.displayName</Typography>
                                                    <Typography variant='subtitle2'>item.user.email</Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    ))}
                                </Paper>
                            </Grid>
                        );
                })}
            </Grid>

            {!!openDialog && (<SaveWorkItemDialogComponent item={task} open={openDialog} onClose={updateStageItem} />)}
        </Box>
    );
};