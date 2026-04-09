import React from 'react';

interface FormProps {
    children: React.ReactNode;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    [key: string]: any;
}

const Form = (props: FormProps) => {
    const { children, onSubmit, ...rest } = props;

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (onSubmit) onSubmit(e);
    };

    return (
        <form onSubmit={submit} {...rest}>
            {children}
        </form>
    );
};

export default Form;
