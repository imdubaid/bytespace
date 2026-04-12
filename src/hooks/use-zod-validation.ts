import { useState } from 'react';
import { z } from 'zod';

type ValidatedData<T> = T extends z.ZodObject<any> ? z.infer<T> : never;

export default function useZodValidation<T extends z.ZodObject<any>>(schema: T, values: Record<string, any>) {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const validateField = (fields: string[]): ValidatedData<T> | null => {
        // Pick only requested fields from schema
        const fieldSchema = schema.pick(Object.fromEntries(fields.map(f => [f, true])));

        // Build matching values object
        const fieldValues = Object.fromEntries(fields.map(f => [f, values[f]]));

        const result = fieldSchema.safeParse(fieldValues);

        if (result.success) {
            setErrors(prev => {
                const next = { ...prev };
                fields.forEach(f => delete next[f]);
                return next;
            });

            return result.data as ValidatedData<T>;
        }

        // Map errors back to fields
        const nextErrors: Record<string, string> = {};
        result.error.issues.forEach(issue => {
            const key = issue.path.join('.');
            nextErrors[key] = issue.message;
        });

        setErrors(prev => ({ ...prev, ...nextErrors }));
        return null;
    };

    function validate(field?: string | string[]): ValidatedData<T> | null {
        if (field) {
            return validateField(Array.isArray(field) ? field : [field]);
        }

        const result = schema.safeParse(values);

        if (result.success) {
            setErrors({});
            return result.data as ValidatedData<T>;
        }

        const fieldErrors: Record<string, string> = {};
        if (result.error) {
            result.error.issues.forEach(error => {
                fieldErrors[error.path.join('.')] = error.message;
            });
        }
        setErrors(fieldErrors);
        return null;
    }

    const handleBlur = (field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        validateField([field]);
    };

    const getFieldError = (field: string) => {
        return touched[field] || errors[field] ? errors[field] : undefined;
    };

    return { errors, validate, handleBlur, getFieldError };
}
