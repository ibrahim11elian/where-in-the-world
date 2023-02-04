/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect } from "react";

export function useFetch(url) {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      setCountries(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [url]);

  useEffect(() => {
    getData();
    return () => new AbortController();
  }, [url]);

  return { loading, countries };
}
