export const fetchArts = async (setLoading:any, selectedTab:any, setArts:any) => {
    setLoading(true);
    const filter = selectedTab === 1 ? "rating" : null;
    const response = await fetch(
        `/api/arts${filter ? `?filter=${filter}` : ""}`
    ).then((res) => res.json());
    setArts(response);
    setLoading(false);
};