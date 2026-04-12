import { useCallback, useState } from 'react';

const useLoader = (params: { initial?: boolean } = {}) => {
    const { initial = false } = params || {};
    const [loading, setLoading] = useState(initial ?? false);

    const start = useCallback(() => setLoading(true), []);
    const end = useCallback(() => setLoading(false), []);

    return { loading, start, end };
};

export default useLoader;
