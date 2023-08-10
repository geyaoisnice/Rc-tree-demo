/*
  单个款式的展示页面
*/
import { List, WithListContext, useListContext, TextField, Datagrid, CreateButton, EditButton, useGetList, useDataProvider, useResourceContext, GetListParams, GetOneParams, Toolbar } from "react-admin"
import { useParams } from "react-router-dom";
import { Container, ListItem, ListItemText, AppBar, Tabs, NoSsr, Typography, Tab } from '@material-ui/core';
import { useEffect, useState } from "react";
import { MaterialTab } from "./MaterialTab";
import { MaterialStyleTitle } from "./MaterialStyleTitle";
interface IStyleTabber {
    category_id?: string,
    code?: string,
    create_date?: any,
    id?:string,
    style_name?:string,
    tenant_id?:string
}
function LinkTab(props: any) {
    return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}
const MaterialTabChange = (props: any) => {
    const { value } = props
    function TabContainer(props: any) {
        return (
            <Typography component="div" style={{ padding: 8 * 3 }}>
                {props.children}
            </Typography>
        );
    }
    return (
        <div>
            {value === 0 && <TabContainer>
                <MaterialTab></MaterialTab>
            </TabContainer>}
            {value === 1 && <TabContainer>工艺管理</TabContainer>}
        </div>
    )
}
const MaterialStyleList = () => {
    const { params: id } = useParams();
    const [styleRecord, setStyleRecord] = useState<any>({})
    const [value, setValue] = useState<Number>(0)
    const handleChange = (e: any, value: any) => {
        setValue(value)
    }
    const dataprovider = useDataProvider();
    useEffect(() => {
        const params: GetOneParams = { id: id } as GetOneParams;
        dataprovider.getOne("t_prod_style", params).then((res: any) => {
            console.log(res, "res is")
            setStyleRecord(res.data)
        })
    }, [])
    return (
        <div>
           <MaterialStyleTitle styleRecord={styleRecord}></MaterialStyleTitle>
            <NoSsr>
                <AppBar position="static" color="default">
                    <Tabs value={value} onChange={handleChange}>
                        <LinkTab label="物料管理" href="page1" />
                        <LinkTab label="工时管理" href="page2" />
                    </Tabs>
                </AppBar>
                <List hasCreate={true} filter={{ style_id: id }} exporter={false} hasEdit={true} resource="t_base_style_materiel">
                    <MaterialTabChange value={value}></MaterialTabChange>
                </List>
            </NoSsr>
        </div>

    )
}
export default MaterialStyleList;