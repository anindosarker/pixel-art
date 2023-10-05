export const fetchArts = async (
    setLoading: any,
    selectedTab: any,
    setArts: any,
    page: number, 
    size: number 
) => {
    setLoading(true);
    let filter = ""
    console.log(selectedTab)
    if (selectedTab === "timeA") filter = "timeA"
    else if (selectedTab === "timeD") filter = "timeD"
    else if (selectedTab === "price") filter = "price"
    else filter = "timeA"

    console.log(filter)
    const response = await fetch(
        `/api/arts?page=${page}&size=${size}&filter=${filter}`
    ).then((res) => res.json());

    setArts((prevArts: any[]) => [...prevArts, ...response]); 
    setLoading(false);
};
