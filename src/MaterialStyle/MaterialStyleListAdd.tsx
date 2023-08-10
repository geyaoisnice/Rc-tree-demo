import * as React from 'react';
import { Create, ReferenceInput, SelectInput, SimpleForm, TextInput } from 'react-admin';
import { useNavigate } from "react-router-dom";
export const MaterialStyleListAdd = (props: any) => {
    const navigate = useNavigate()
    const onSuccess = (data: any) => {
        navigate(-1)
    };
    return (
        <Create mutationOptions={{ onSuccess }} 
        >
            <SimpleForm>
                <ReferenceInput source="style_id" reference="t_prod_style" />
                <TextInput source="count" />
                <TextInput source="description" />
                <ReferenceInput source="mat_id" reference="t_base_materiel_type" />
            </SimpleForm>
        </Create>
    )

}