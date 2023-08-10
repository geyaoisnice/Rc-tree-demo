import * as React from "react";
import { Show, SimpleShowLayout, TextField, DateField, RichTextField } from 'react-admin';

export const StyleShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="code" />
            <TextField source="style_name" />
            <DateField label="create_date" source="create_date" />
        </SimpleShowLayout>
    </Show>
);