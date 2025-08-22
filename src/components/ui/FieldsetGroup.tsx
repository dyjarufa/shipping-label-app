import { ReactNode } from 'react'

export function FieldsetGroup({
  legend,
  children,
}: {
  legend: string
  children: ReactNode
}) {
  return (
    <fieldset className="border p-4 rounded space-y-2">
      <legend className="font-semibold text-base mb-2">{legend}</legend>
      {children}
    </fieldset>
  )
}
