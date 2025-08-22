import { useMutation } from "@tanstack/react-query";
import { createShipment } from "../api/easypost";


export function useEasyPost() {
return useMutation({
mutationFn: createShipment,
});
}