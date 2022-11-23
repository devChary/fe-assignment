import { useQuery as useBaseQuery } from 'react-query';

  export const isEmpty = value => {
    return !value || (typeof value === 'object' && Object.keys(value).length === 0);
}

const defaultOptions = { 
    method: 'GET', 
    mode: 'cors',
    headers: {
        'X-Api-Key': 'ScD5dyAO849TRkaqj5Vc6559TSpokwdm3VeLEGSi',
        'Content-Type': 'application/json',
    }
};

const BASE_URL = `https://685rp9jkj1.execute-api.eu-west-1.amazonaws.com/prod`;

async function customFetch({ query, params, options = defaultOptions, }) {
  const searchParams = new URLSearchParams({});

  if (params && !isEmpty(params)) {
		Object.entries(params).forEach(([key, value]) => {
			if (key) {
				searchParams.set(key, value);
			}
		});
	}
	const searchParamsString = searchParams.toString();

  const resp = await fetch(`${BASE_URL}/${query}?${searchParamsString}`, options);
  return await resp.json();
}

export function useQuery({ query, params, enabled = true }) {
  return useBaseQuery({
    queryKey: [query],
    queryFn: async () => await customFetch({ query, params }),
    enabled,
  });
}