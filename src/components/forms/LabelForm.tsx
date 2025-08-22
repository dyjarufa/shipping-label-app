'use client'
import { useEasyPost } from '@/features/labels/hooks/useEasyPost'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  to_address: z.object({
    street1: z.string().min(1),
    city: z.string(),
    state: z.string(),
    zip: z.string().length(5),
  }),
  from_address: z.object({
    street1: z.string().min(1),
    city: z.string(),
    state: z.string(),
    zip: z.string().length(5),
  }),
  parcel: z.object({
    length: z.number().positive(),
    width: z.number().positive(),
    height: z.number().positive(),
    weight: z.number().positive(),
  }),
})

export type LabelFormSchema = z.infer<typeof schema>

export default function LabelForm() {
  const { register, handleSubmit, formState } = useForm<LabelFormSchema>({
    resolver: zodResolver(schema),
  })

  const mutation = useEasyPost()

  const onSubmit = (data: LabelFormSchema) => {
    mutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Reutilize o mesmo grupo para to_address e from_address */}
      <fieldset>
        <legend>To Address</legend>
        <input placeholder="Street" {...register('to_address.street1')} />
        <input placeholder="City" {...register('to_address.city')} />
        <input placeholder="State" {...register('to_address.state')} />
        <input placeholder="ZIP" {...register('to_address.zip')} />
      </fieldset>

      <fieldset>
        <legend>From Address</legend>
        <input placeholder="Street" {...register('from_address.street1')} />
        <input placeholder="City" {...register('from_address.city')} />
        <input placeholder="State" {...register('from_address.state')} />
        <input placeholder="ZIP" {...register('from_address.zip')} />
      </fieldset>

      <fieldset>
        <legend>Package</legend>
        <input
          type="number"
          placeholder="Length"
          {...register('parcel.length', { valueAsNumber: true })}
        />
        <input
          type="number"
          placeholder="Width"
          {...register('parcel.width', { valueAsNumber: true })}
        />
        <input
          type="number"
          placeholder="Height"
          {...register('parcel.height', { valueAsNumber: true })}
        />
        <input
          type="number"
          placeholder="Weight (oz)"
          {...register('parcel.weight', { valueAsNumber: true })}
        />
      </fieldset>

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Generating...' : 'Generate Label'}
      </button>
    </form>
  )
}
