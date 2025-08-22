import axios from "axios";


const API_KEY = process.env.NEXT_PUBLIC_EASYPOST_API_KEY;
const headers = {
Authorization: `Bearer ${API_KEY}`,
"Content-Type": "application/json",
};


export async function createShipment(data: any) {
const shipment = await axios.post("https://api.easypost.com/v2/shipments", data, { headers });
return shipment.data;
}