// React hooks are esssentially functions that can be used in your components.
// Hooks (eg:useState, useFeefect) need to follow the following rules:
// 1. Hooks can only be used in function componens or in other hooks.
// 2. Hooks can only be called on the top level of your components.(no inside of the if statement so on)
// 3.Hooks should be called  in the same order they are defined on every render.
import {useEffect, useState} from "react";

// if there no dependencies, we assime that we fetch only on first render.
export const useFetch = (url: string) => {
    const [response, setResponse] = useState({});
    const [error, setError] = useState<unknown>(null);
// UseEffect is a hook that is called after the commponents is rendered
// to perform some kind of side effects. (data fetching, subscription to event, etc)
// UseEffect is a function that takes a function as an argument, return a cleanup function
// if dependency array is missing, use effect will be called on every render
// When we provides dependency, if dependencies changes, useaaeffect will be called again

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                setResponse(json);
            } catch (err) {
                setError(err);
            }
        };
        fetchData();
    }, [url]);
    return {response, error};
};