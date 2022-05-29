function useEvent(callback) {
    const callbackRef = useRef(null);

    callbackRef.current = callback;

    const event = useCallback((...args) => {
        if (callbackRef.current) {
        callbackRef.current.apply(null, args);
        }
    }, []);

    return event;
}