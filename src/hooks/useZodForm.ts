import { debounce } from '@mui/material';
import { PickerValue } from '@mui/x-date-pickers/internals';
import dayjs from 'dayjs';
import { useCallback, useRef, useState } from 'react';
import { z } from 'zod';

type Errors = Record<string, string | undefined>;
type Values = Record<string, any>;
type Touched = Record<string, boolean>;
type Dirty = Record<string, boolean>;

type RegisterOptions = { isDateField?: boolean; defaultValue?: any; callbackDebounce?: number };

type Register = (name: string, options?: RegisterOptions, callback?: (value: any) => void) => any;

type UseZodFormOptions = {
    defaultValues?: Values;
};

export function useZodForm<T extends z.ZodObject<any>>(schema: T, options?: UseZodFormOptions) {
    // RHF-style mutable stores
    const valuesRef = useRef<Values>(options?.defaultValues ?? {});
    const errorsRef = useRef<Errors>({});
    const touchedRef = useRef<Touched>({});
    const dirtyRef = useRef<Dirty>({});

    // Used only to force subscribed re-renders
    const [, forceRender] = useState(0);

    const notify = () => forceRender(v => v + 1);

    // ---------- validation ----------
    const validateField = useCallback(
        (name: string) => {
            const fieldSchema = schema.pick({ [name]: true });
            const value = valuesRef.current[name];

            const result = fieldSchema.safeParse({ [name]: value });

            if (result.success) {
                delete errorsRef.current[name];
            } else {
                errorsRef.current[name] = result.error.issues[0]?.message ?? 'Invalid value';
            }
        },
        [schema]
    );

    const validateAll = useCallback(() => {
        const result = schema.safeParse(valuesRef.current);

        errorsRef.current = {};

        if (!result.success) {
            result.error.issues.forEach(issue => {
                errorsRef.current[issue.path.join('.')] = issue.message;
            });
            notify();
            return null;
        }

        notify();
        return result.data;
    }, [schema]);

    // ---------- handleSubmit ----------
    const handleSubmit = useCallback(
        (onValid: (data: z.infer<T>) => void | Promise<void>, onInvalid?: (errors: Errors) => void | Promise<void>) => {
            return async (e?: React.FormEvent<HTMLFormElement>) => {
                e?.preventDefault();

                // Mark all fields as touched
                Object.keys(valuesRef.current).forEach(key => {
                    touchedRef.current[key] = true;
                });

                const validatedData = validateAll();

                if (validatedData) {
                    // Valid - call success handler
                    await onValid(validatedData);
                } else {
                    // Invalid - call error handler if provided
                    if (onInvalid) {
                        await onInvalid(errorsRef.current);
                    }
                }
            };
        },
        [validateAll]
    );

    // ---------- register ----------
    const register: Register = useCallback(
        (name, options, callback) => {
            const { isDateField = false, callbackDebounce = 0 } = options ?? {};

            const updateValue = (name: string, value: any) => {
                if (!dirtyRef.current[name]) {
                    dirtyRef.current[name] = true;
                }

                valuesRef.current[name] = value;

                if (callback) {
                    debounce(callback, callbackDebounce)(value);
                }

                if (touchedRef.current[name]) {
                    validateField(name);
                    notify();
                }
            };

            const onBlur = () => {
                touchedRef.current[name] = true;
                validateField(name);
                notify();
            };

            if (isDateField) {
                return {
                    name,
                    value: valuesRef.current[name] ? dayjs(valuesRef.current[name]) : null,
                    onChange: (value: PickerValue) => {
                        updateValue(name, value ? dayjs(value).format('YYYY-MM-DDTHH:mm:ss.SSS') : '');
                    },
                    onClose: onBlur,
                };
            }

            return {
                name,
                defaultValue: valuesRef.current[name] ?? '',
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    updateValue(name, e.target.value);
                },
                onBlur,
            };
        },
        [validateField]
    );

    // ---------- helpers ----------
    const getFieldState = useCallback((name: string) => {
        return {
            value: valuesRef.current[name],
            error: errorsRef.current[name],
            touched: touchedRef.current[name],
            dirty: dirtyRef.current[name],
        };
    }, []);

    const reset = useCallback(
        (newValues?: Values) => {
            valuesRef.current = newValues ?? options?.defaultValues ?? {};
            errorsRef.current = {};
            touchedRef.current = {};
            dirtyRef.current = {};
            notify();
        },
        [options?.defaultValues]
    );

    const setValue = useCallback((name: string, value: any) => {
        valuesRef.current[name] = value;
        notify();
    }, []);
    const getValues = useCallback((name?: string) => {
        return name ? valuesRef.current[name] : valuesRef.current;
    }, []);

    const setError = useCallback((name: string, error: string) => {
        errorsRef.current[name] = error;
        notify();
    }, []);

    return {
        register,
        handleSubmit,
        validate: validateAll,
        reset,
        setValue,
        getValues,
        setError,

        // exposed for reading
        formState: {
            get errors() {
                return errorsRef.current;
            },
            get touched() {
                return touchedRef.current;
            },
            get dirty() {
                return dirtyRef.current;
            },
        },

        getFieldState,
    };
}
