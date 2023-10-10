export const fetchArts = async (
    setLoading: any,
    filter: string,
    setArts: any,
    page: number,
    size: number
) => {
    setLoading(true);
    const response = await fetch(`/api/arts?filter=${filter}&page=${page}&size=${size}`);
    const data = await response.json();
    setArts((prevArts: any) => {
        const newArts = data.filter((art: any) => !prevArts.some((prevArt: any) => prevArt.art_array === art.art_array));
        return [...prevArts, ...newArts];
    });
    setLoading(false);
};