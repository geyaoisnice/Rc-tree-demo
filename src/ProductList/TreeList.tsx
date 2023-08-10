

import React, { useState } from "react"
import { List as ListM, fetchUtils } from "react-admin";
import postgrestRestProvider, { IDataProviderConfig, defaultPrimaryKeys, defaultSchema } from '@raphiniert/ra-data-postgrest';
import { Collapse, Grid, ListItem, ListItemText, Paper, List } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { ITreeDataList, IChildren } from "./common";

import Tree from 'rc-tree';
import "rc-tree/assets/index.css"
export interface ICategoryList {
    id: number,
    category_name: string
    t_prod_style: IProdList[]
}
export interface IProdList {
    id: number,
    style_name: string
}
export interface ICategory {
    categoryId: number,
}
interface ITreeList {
    TreeDataList?: any,
    handleNavigate: (data: any) => void
}
const STYLE = `
.rc-tree-child-tree {
  display: block;
}

.node-motion {
  transition: all .3s;
  overflow-y: hidden;
}
`;
function getTreeData() {
    // big-data: generateData(1000, 3, 2)
    return [
      {
        key: '0',
        title: 'node 0',
        children: [
          { key: '0-0', title: 'node 0-0' },
          { key: '0-1', title: 'node 0-1' },
          {
            key: '0-2',
            title: 'node 0-2',
            children: [
              { key: '0-2-0', title: 'node 0-2-0' },
              { key: '0-2-1', title: 'node 0-2-1' },
              { key: '0-2-2', title: 'node 0-2-2' },
            ],
          },
          { key: '0-3', title: 'node 0-3' },
          { key: '0-4', title: 'node 0-4' },
          { key: '0-5', title: 'node 0-5' },
          { key: '0-6', title: 'node 0-6' },
          { key: '0-7', title: 'node 0-7' },
          { key: '0-8', title: 'node 0-8' },
          {
            key: '0-9',
            title: 'node 0-9',
            children: [
              { key: '0-9-0', title: 'node 0-9-0' },
              {
                key: '0-9-1',
                title: 'node 0-9-1',
                children: [
                  { key: '0-9-1-0', title: 'node 0-9-1-0' },
                  { key: '0-9-1-1', title: 'node 0-9-1-1' },
                  { key: '0-9-1-2', title: 'node 0-9-1-2' },
                  { key: '0-9-1-3', title: 'node 0-9-1-3' },
                  { key: '0-9-1-4', title: 'node 0-9-1-4' },
                ],
              },
              {
                key: '0-9-2',
                title: 'node 0-9-2',
                children: [
                  { key: '0-9-2-0', title: 'node 0-9-2-0' },
                  { key: '0-9-2-1', title: 'node 0-9-2-1' },
                ],
              },
            ],
          },
        ],
      },
      {
        key: '1',
        title: 'node 1',
        // children: new Array(1000)
        //   .fill(null)
        //   .map((_, index) => ({ title: `auto ${index}`, key: `auto-${index}` })),
        children: [
          {
            key: '1-0',
            title: 'node 1-0',
            children: [
              { key: '1-0-0', title: 'node 1-0-0' },
              {
                key: '1-0-1',
                title: 'node 1-0-1',
                children: [
                  { key: '1-0-1-0', title: 'node 1-0-1-0' },
                  { key: '1-0-1-1', title: 'node 1-0-1-1' },
                ],
              },
              { key: '1-0-2', title: 'node 1-0-2' },
            ],
          },
        ],
      },
    ];
  }
const defaultExpandedKeys = ['0', '0-2', '0-9-2'];
const motion = {
    motionName: 'node-motion',
    motionAppear: false,
    onAppearStart: () => ({ height: 0 }),
    onLeaveActive: () => ({ height: 0 }),
    onAppearActive: (node:any) => ({ height: node.scrollHeight }),
    onLeaveStart: (node:any) => ({ height: node.offsetHeight }),
  };
const TreeList = (props: ITreeList) => {
    const { TreeDataList } = props
    const navigate = useNavigate()
    const [openStyle, setOpenStyle] = useState(true);
    const [StyleSelect, setStyleSelect] = useState<String>("");
    const [CategorySelect, setCategorySelect] = useState<String>("");
    const [styleId, setStyleId] = useState<String>("");
    const [selectTitle, setSelectTitle] = useState(false);
    const handleCatagory = (dataId: String) => {
        setStyleId(dataId);
        setOpenStyle(!openStyle)
    };
    const handleSelectCatagory = (categoryId: String) => {
        setCategorySelect(categoryId)
        setStyleSelect("")
        setSelectTitle(false)
        const url = `CategoryLists/${categoryId}`
        navigate(url)
        props.handleNavigate && props.handleNavigate({ categoryId: categoryId })
    };
    const handleSelectTitle = () => {
        setSelectTitle(true)
        setStyleSelect("")
        setCategorySelect("")
        const url = `CatagoryTitle`
        navigate(url)
    };
    const handleStyleSelect = (categoryId: any) => {
        setStyleSelect(categoryId)
        setCategorySelect("")
        setSelectTitle(false)
        const url = `StyleListView/${categoryId}`
        navigate(url)
        props.handleNavigate && props.handleNavigate({})
    };

    return (
        <Grid style={{ width: "200px", margin: "24px 0 0 24px" }} >
            <Paper>
                <ListItem button style={selectTitle ? { background: '#ccc' } : {}} onClick={() => handleSelectTitle()}>
                    <ListItemText primary={TreeDataList?.name} />
                </ListItem>
                {TreeDataList.children && TreeDataList?.children.map((item: any, i: number) => (
                    <Collapse in={true} timeout="auto" unmountOnExit>
                        <List component="div" >
                            <ListItem style={CategorySelect == item.id ? { background: '#ccc' } : {}} button onClick={() => handleSelectCatagory(item.id)}>
                                <ListItemText primary={item.category_name} />
                                {openStyle && styleId == item.id ? <ExpandLess onClick={() => handleCatagory(item.id)} /> : <ExpandMore onClick={() => handleCatagory(item.id)} />}
                            </ListItem>
                            {item.t_prod_style.map((detailItem: any, j: number) => (
                                <Collapse in={openStyle && styleId == item.id} timeout="auto" unmountOnExit>
                                    <List style={{ margin: "0px 0px 0 24px" }} component="div">
                                        <ListItem style={StyleSelect == detailItem.id ? { background: '#ccc' } : {}} button onClick={() => handleStyleSelect(detailItem.id)}>
                                            <ListItemText primary={detailItem.style_name} />
                                        </ListItem>
                                    </List>
                                </Collapse>
                            ))}
                        </List>
                    </Collapse>
                ))}
            </Paper>
            <div>
            <style dangerouslySetInnerHTML={{ __html: STYLE }} />
                <Tree
                    defaultExpandAll={true}
                    defaultExpandedKeys={defaultExpandedKeys}
                    motion={motion}
                    treeData={getTreeData()}
                />
            </div>
        </Grid>
    )
}
export default TreeList;