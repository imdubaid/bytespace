import { CLIENT_URL } from '@/lib/env';

// Type definitions
type AnyObject = Record<string, any>;

export function isEmpty(value: any): boolean {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string') return value.trim() === '';
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
}

// * Function to get value from object using string path
export const getValueFromPath = <T = any>(obj: AnyObject, path: string): T | undefined =>
    !!path ? path.split('.').reduce((acc: any, key: string) => acc && acc[key], obj) : (obj as T);

// * Function to set value to object using string path
export function setValueFromPath<T = any>(obj: AnyObject, path: string, value: T): void {
    const keys = path.split('.');
    const lastKey = keys.pop(); // Get the last key
    const target = keys.reduce((acc: any, key: string) => acc && acc[key], obj); // Traverse the object
    if (target && lastKey) {
        target[lastKey] = value; // Set the value
    }
}

export function pixelsToInches(pixels: number): number {
    return parseFloat((pixels / 96).toFixed(4));
}

export function pixelsToEmus(pixels: number): number {
    return pixels * 9525;
}

export function inchesToEmus(inches: number): number {
    return inches * 914400;
}

export function getAllIndexes<T>(arr: T[], val: T): number[] {
    const indexes: number[] = [];
    let i = -1;
    while ((i = arr.indexOf(val, i + 1)) !== -1) {
        indexes.push(i);
    }
    return indexes;
}

export function parseCommaSeparatedString(str: string): string {
    if (typeof str !== 'string') return '';

    return str.replace(/(^,)|(,+$)|,{2,}/g, (match: string, p1: string, p2: string) => (p1 || p2 ? '' : ','));
}

export const isValidValue = (value: any): boolean => {
    // Handle special cases first
    if (value === null || value === undefined) return false;
    if (Number.isNaN(value)) return false;

    // Handle different types
    switch (typeof value) {
        case 'string':
            return value.replace(/['"]/g, '').trim().length > 0;
        case 'number':
            return true;
        case 'boolean':
            return value;
        case 'object':
            // Handle arrays
            if (Array.isArray(value)) {
                return value.length > 0;
            }

            // Handle objects (including Date)
            return Object.keys(value).length > 0;
        default:
            return false;
    }
};

export const isValidValues = (values: any[]): boolean => {
    return values.every(value => isValidValue(value));
};

export const filterObject = <T extends AnyObject>(obj: T): Partial<T> => {
    return Object.fromEntries(Object.entries(obj).filter(([, value]) => isValidValue(value))) as Partial<T>;
};

export const selectProps = <T extends AnyObject, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
    return keys.reduce(
        (acc, key) => {
            if (Object.hasOwn(obj, key)) {
                acc[key] = obj[key];
            }
            return acc;
        },
        {} as Pick<T, K>,
    );
};

export const omitProps = <T extends AnyObject, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
    return Object.keys(obj).reduce(
        (acc, key) => {
            if (!keys.includes(key as K)) {
                (acc as any)[key] = obj[key as keyof T];
            }
            return acc;
        },
        {} as Omit<T, K>,
    );
};

export const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const createMapEntries = <T extends AnyObject, K extends keyof T, V extends keyof T>(
    arrayOfObjects: T[],
    key: K,
    value: V,
): Map<T[K], T[V]> => {
    const mapping = arrayOfObjects.map(data => [data[key], data[value]] as [T[K], T[V]]);
    return new Map(mapping);
};

export function parseCase(text: string, textTransform: boolean = false) {
    // 1. Insert a space between lowercase and uppercase letters
    let result = text.replace(/([a-z])([A-Z])/g, '$1 $2');

    // 2. Replace all common delimiters with spaces
    result = result.replace(/[_\-\s]+/g, ' ');

    return textTransform ? capitalize(result) : result;
}

export const parseCamelCase = (str: string): string => str.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase());

export const generateUniqueId = (): string => {
    const randomPart = window.crypto.getRandomValues(new Uint32Array(1))[0];
    return `${Date.now()}-${randomPart.toString(36)}`;
};

export const removeCommas = (str: string | number): string | number => {
    if (typeof str !== 'string') {
        return str;
    }
    return str.replace(/,/g, '');
};

export function extractLinks(text: string): string[] {
    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;
    return text.match(urlRegex) || [];
}

export function slugifyPath(pathString: string): string {
    return pathString
        .trim() // Remove leading/trailing whitespace
        .replace(/[\/\\]+/g, '-') // Replace slashes / or \ with -
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove non-word characters except hyphen
        .replace(/\-\-+/g, '-'); // Replace multiple hyphens with single
}

export function calculatePercentage(value: number, total: number): number {
    return Math.abs(Math.round((value / (total ?? 100)) * 100));
}

export function getAbsolutePath(path?: string): string {
    const parsedPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';
    return `${CLIENT_URL}${parsedPath}`;
}

export function normalizePath(path?: string): string {
    if (!path) return '/';

    if (!path.startsWith('/') || path.startsWith('//')) return `/${path}`;
    return path;
}

export function now() {
    return Math.floor(Date.now() / 1000);
}
