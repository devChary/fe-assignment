import { useQuery as useBaseQuery } from 'react-query';

const defaultOptions = { 
    method: 'GET', 
    mode: 'cors',
    headers: {
        'X-Api-Key': 'ScD5dyAO849TRkaqj5Vc6559TSpokwdm3VeLEGSi',
        'Content-Type': 'application/json',
    }
};

async function customFetch(url, options = defaultOptions) {
  const resp = await fetch(url, options);
  return await resp.json();
}

export function useQuery(query) {
  return useBaseQuery(query, async () => {
    return await customFetch(`https://685rp9jkj1.execute-api.eu-west-1.amazonaws.com/prod/${query}`);
  });
}