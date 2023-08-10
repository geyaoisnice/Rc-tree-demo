import { Typography } from '@material-ui/core';
import * as React from 'react';
import { Create, Datagrid, EditButton, ReferenceInput, SelectInput, SimpleForm, TextField, TextInput } from 'react-admin';
interface IMaterialTab{
}
export const MaterialTab = (props: IMaterialTab) => {
   
    return (
        <Datagrid>
            <TextField source='id' />
            <TextField source='style_id' />
            <TextField source='mat_id' />
            <TextField source='count' />
            <TextField source='description' />
            <EditButton></EditButton>
        </Datagrid>
    )
}