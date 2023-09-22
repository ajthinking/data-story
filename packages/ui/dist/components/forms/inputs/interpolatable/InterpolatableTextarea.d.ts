import { UseFormReturn } from 'react-hook-form';
export declare const InterPolatableTextArea: ({ form, label, rows, id, inputSchema }: {
    label: string;
    id: string;
    rows: number;
    form: UseFormReturn<{
        [x: string]: any;
    }, any, undefined>;
    inputSchema: any;
}) => JSX.Element;
