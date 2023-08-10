import * as React from 'react';
import { Create, ReferenceInput, SelectInput, SimpleForm, TextInput, Edit } from 'react-admin';
import { useNavigate } from "react-router-dom";
export const MaterialEdit = (props: any) => {
    const navigate = useNavigate()
    const onSuccess = (data: any) => {
        navigate(-1)
    };
    return (
        <Edit mutationOptions={{ onSuccess }} 
        >
            <SimpleForm>
                <TextInput source="id" />
                <TextInput source="code" />
                <TextInput source="name" />
                <TextInput source="description" />
            </SimpleForm>
        </Edit>
    )

}