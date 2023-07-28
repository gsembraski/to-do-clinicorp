
import { getAllWorkLists } from "../../api/WorklistApi";
import { Component } from "react";
import { AddWorkListComponent, ChangeWorkListComponent } from "./WorkListDatailsComponent";
import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { ViewKanban } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';

function WorkListCard({ item, onUpdate }) {
    const navigate = useNavigate();

    function goTo() {
        navigate(`/kanban/${item.id}`);
    }

    return (
        <Grid
            item
            md={3}
            sm={4}
        >
            <Card>
                <CardContent>
                    <Typography component={"h3"}> {item.name}</Typography>
                </CardContent>

                <CardActions>
                    <ChangeWorkListComponent item={item}
                        onSave={onUpdate} />
                    <Button onClick={goTo} color="primary" startIcon={<ViewKanban />}>
                        Kanban
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default class WorkListComponent extends Component {
    constructor() {
        super()
        this.state = { workList: [] }
    }

    async componentDidMount() {
        await this.loadWorkList();
    }

    async loadWorkList() {
        var workList = await getAllWorkLists();
        this.setState({ workList: workList });
    }

    render() {
        return (
            <Box sx={{ flexGrow: 1, padding: "20px", margin: "75px 40px 20px", backgroundColor: "#fff9", backgroundSize: "100%" }}>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                >
                    <Grid
                        item
                        justifyContent={"end"}
                        marginX={0}
                        marginY={2}
                    >
                        <AddWorkListComponent onSave={this.loadWorkList} />
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction="row"
                    spacing={4}
                >
                    {this.state.workList.map((item) => (<WorkListCard key={item.id} item={item} onUpdate={this.loadWorkList} />))}

                </Grid>
            </Box>
        )
    }
};