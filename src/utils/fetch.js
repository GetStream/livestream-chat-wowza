import axios from "axios";

const fetch = (method, path, data, params, headers, cancelToken) => {
    if (!method) throw new Error("Method is a required field.");
    if (!path) throw new Error("Path is a required field.");

    const options = {
        cancelToken,
        method: method.toUpperCase(),
        url: path,
        data: data || {},
        params: params || {},
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
		credentials: 'same-origin',
		mode: 'cors',
		cache: 'no-cache',
    };

    return axios(options);
};

const cancelToken = () => axios.CancelToken.source();

export default fetch;
export { cancelToken };
