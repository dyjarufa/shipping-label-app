import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const data = await req.json()

  const shipmentRes = await fetch('https://api.easypost.com/v2/shipments', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.EASYPOST_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ shipment: data }), 
  })

  const shipment = await shipmentRes.json()

  if (!shipment.id || !shipment.rates || shipment.rates.length === 0) {
    return NextResponse.json(
      { error: { message: 'No rates available for this shipment.' } },
      { status: 400 }
    )
  }

  const selectedRateId = shipment.rates[0].id

  const buyRes = await fetch(
    `https://api.easypost.com/v2/shipments/${shipment.id}/buy`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.EASYPOST_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rate: { id: selectedRateId } }),
    }
  )

  const bought = await buyRes.json()

  return NextResponse.json(bought, { status: buyRes.status })
}
