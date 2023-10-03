// export const fetchArts = async (setLoading:any, selectedTab:any, setArts:any) => {
//     setLoading(true);
//     const filter = selectedTab === 1 ? "rating" : null;
//     const response = await fetch(
//         `/api/arts${filter ? `?filter=${filter}` : ""}`
//     ).then((res) => res.json());
//     setArts(response);
//     setLoading(false);
// };

// test
export const fetchArts = async (
    setLoading: any,
    selectedTab: any,
    setArts: any,
    page: number, 
    size: number 
) => {
    setLoading(true);
    const filter = selectedTab === 1 ? "rating" : null;
    const response = await fetch(
        `/api/arts?page=${page}&size=${size}`
    ).then((res) => res.json());

    setArts((prevArts: any[]) => [...prevArts, ...response]); 
    setLoading(false);
};
