export interface FetchDataOptions extends RequestInit {
    query?: Record<string, string>;
}

export default async function fetchData(
    path: string,
    opts: FetchDataOptions = {}
): Promise<any> {
    const HOST = import.meta.env.VITE_HOST || "http://localhost";
    const PORT = import.meta.env.VITE_PORT || "3000";

    const prefix = `${HOST}:${PORT}`;
    let url = `${prefix}/api${path}`;

    if (opts.query) {
        url += `?${new URLSearchParams(opts.query).toString()}`;
    }

    const { query, ...fetchOpts } = opts;
    return await fetch(url, { ...fetchOpts, credentials: "include" }).then((res) => res.json());
}
