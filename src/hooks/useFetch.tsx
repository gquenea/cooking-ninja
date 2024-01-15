import { useEffect, useState } from "react";

export type useFetchProps = {
  url: string;
  method?: string;
};

const useFetch = ({ url, method = "GET" }: useFetchProps) => {
  const [data, setData] = useState<any | any[]>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const [options, setOptions] = useState<any>(null);

  const postData = (postData: any) => {
    setOptions({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (fetchOptions?: any) => {
      setIsPending(true);

      try {
        const res = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const json = await res.json();
        setIsPending(false);
        setData(json);
        setError("");
      } catch (error: any) {
        if (error.message === "AbortError") {
          console.log("the fetch was abort");
        }
        setIsPending(false);
        setError("Could not fetch the data");
        console.log(error.message);
      }
    };
    if (method === "GET") {
      fetchData();
    }
    if (method === "POST" && options) {
      fetchData(options);
    }
    return () => {
      controller.abort();
    };
  }, [url, options, method]);

  return { data, isPending, error, postData };
};
export default useFetch;
