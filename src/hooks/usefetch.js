import { useState, useCallback, useEffect } from "react";
let getData;
export function useFetch(url) {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  getData = useCallback(async () => {
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
  }, [url]);

  return { loading, countries, setCountries };
}

export const refresh = () => {
  getData();
};
