import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const LabelForm = dynamic(() => import('@/components/forms/LabelForm'), {
})

export default function LabelPage() {
  return (
    <section className="max-w-2xl mx-auto py-12">
      <Suspense fallback={<p>Loading form...</p>}>
        <LabelForm />
      </Suspense>
    </section>
  )
}
