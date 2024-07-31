import { useState } from "react";

export const useLoading = (initialValue: boolean = false) => {
    const [isLoading, setIsLoading] = useState(initialValue);

    const start = () => setIsLoading(true);
    const stop = () => setIsLoading(false);

    return { isLoading, start, stop };
};
