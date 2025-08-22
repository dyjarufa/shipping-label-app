'use client'
import { useEasyPost } from '@/features/labels/hooks/useEasyPost'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
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
  const [labelUrl, setLabelUrl] = useState<string | null>(null)

  const onSubmit = (data: LabelFormSchema) => {
    mutation.mutate(data, {
      onSuccess: (res) => {
        toast.success('Label generated successfully!')
        setLabelUrl(res.postage_label.label_url)
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.error?.message ||
            'Failed to generate label. Please check your inputs.'
        )
      },
    })
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

      {labelUrl && (
        <div className="mt-8 space-y-4">
          <h2 className="text-lg font-semibold">Label Preview:</h2>
          <img
            src={labelUrl}
            alt="Shipping Label"
            className="border shadow-md max-w-full"
          />
          <a
            href={labelUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Download Label
          </a>
        </div>
      )}
    </div>
  )
}
