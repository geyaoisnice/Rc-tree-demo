import { AppBar, Container, ListItem, ListItemText, Toolbar, Typography } from '@material-ui/core';
interface IItem{
    style_name?:string,
    code?:string,
    create_date?:string
}
interface IMaterialStyleTitle{
    styleRecord?:IItem
}
export const MaterialStyleTitle = (props: IMaterialStyleTitle) => {
    const {styleRecord}=props
    return (
        <div>
            <AppBar position="static" color="default">
                <Toolbar>
                    款式信息
                </Toolbar>
            </AppBar>
            <Container>
                <ListItem >
                    <ListItemText primary={`款式:${styleRecord?.style_name}`} />
                </ListItem>
                <ListItem >
                    <ListItemText primary={`编号:${styleRecord?.code}`} />
                </ListItem>
                <ListItem >
                    <ListItemText primary={`创建日期:${styleRecord?.create_date}`} />
                </ListItem>
            </Container >
        </div>
    )

}