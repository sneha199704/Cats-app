import axios from "axios";

export const getCats = async () => {
    const url = "https://api.thecatapi.com/v1/breeds?limit=10&page=0";
    
    const response = await axios.get(url, {
        headers: {
            'x-api-key': "live_HPvtNnVPu1A9xKut0K5qyf3W1PDYmtd0bF5cO9E4b91gexTeAIiryvgkuMhgSiqP"
        }
    });
    return response.data;
}