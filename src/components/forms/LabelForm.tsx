'use client'
import { useEasyPost } from '@/features/labels/hooks/useEasyPost'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { FieldsetGroup } from '../ui/FieldsetGroup'
import { InputField } from '../ui/InputField'
import { PrimaryButton } from '../ui/PrimaryButton'

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
        <FieldsetGroup legend="To Address">
          <InputField label="Street" {...register('to_address.street1')} />
          <InputField label="City" {...register('to_address.city')} />
          <InputField label="State" {...register('to_address.state')} />
          <InputField label="ZIP" {...register('to_address.zip')} />
        </FieldsetGroup>

        <FieldsetGroup legend="From Address">
          <InputField label="Street" {...register('from_address.street1')} />
          <InputField label="City" {...register('from_address.city')} />
          <InputField label="State" {...register('from_address.state')} />
          <InputField label="ZIP" {...register('from_address.zip')} />
        </FieldsetGroup>

        <FieldsetGroup legend="Package">
          <InputField
            label="Length (in)"
            type="number"
            {...register('parcel.length', { valueAsNumber: true })}
          />
          <InputField
            label="Width (in)"
            type="number"
            {...register('parcel.width', { valueAsNumber: true })}
          />
          <InputField
            label="Height (in)"
            type="number"
            {...register('parcel.height', { valueAsNumber: true })}
          />
          <InputField
            label="Weight (oz)"
            type="number"
            {...register('parcel.weight', { valueAsNumber: true })}
          />
        </FieldsetGroup>

        <PrimaryButton type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Generating...' : 'Generate Label'}
        </PrimaryButton>
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
