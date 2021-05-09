const fetcher = async (url: string, token: string) => {
  const res = await fetch(url, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json", token }),
  });

  return res.json();
};

export default fetcher;
