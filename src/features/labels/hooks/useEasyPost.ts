import { createShipment } from '@/app/api/easypost'
import { useMutation } from '@tanstack/react-query'

export function useEasyPost() {
  return useMutation({
    mutationFn: createShipment,
  })
}
