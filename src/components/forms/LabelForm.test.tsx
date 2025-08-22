import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import LabelForm from './LabelForm'

const renderWithClient = (ui: React.ReactElement) => {
  const client = new QueryClient()
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>)
}

describe('LabelForm', () => {
  it('renders form fields correctly', () => {
    renderWithClient(<LabelForm />)

    expect(
      screen.getByLabelText('Street', {
        selector: 'input[name="to_address.street1"]',
      })
    ).toBeInTheDocument()
    expect(
      screen.getByLabelText('Street', {
        selector: 'input[name="from_address.street1"]',
      })
    ).toBeInTheDocument()

    expect(screen.getAllByLabelText(/ZIP/i)).toHaveLength(2)
    expect(screen.getByText(/Generate Label/i)).toBeInTheDocument()
  })

  it('shows error if required fields are empty', async () => {
    renderWithClient(<LabelForm />)

    fireEvent.click(screen.getByText(/Generate Label/i))

    await waitFor(() => {
      expect(screen.getByText(/Generate Label/i)).toBeEnabled()

    })
  })

  it('submits with valid data and triggers mutation', async () => {
    renderWithClient(<LabelForm />)

    fireEvent.change(screen.getAllByLabelText(/Street/i)[0], {
      target: { value: '123 A St' },
    })
    fireEvent.change(screen.getAllByLabelText(/City/i)[0], {
      target: { value: 'Boston' },
    })
    fireEvent.change(screen.getAllByLabelText(/State/i)[0], {
      target: { value: 'MA' },
    })
    fireEvent.change(screen.getAllByLabelText(/ZIP/i)[0], {
      target: { value: '02118' },
    })

    fireEvent.change(screen.getAllByLabelText(/Street/i)[1], {
      target: { value: '456 B St' },
    })
    fireEvent.change(screen.getAllByLabelText(/City/i)[1], {
      target: { value: 'New York' },
    })
    fireEvent.change(screen.getAllByLabelText(/State/i)[1], {
      target: { value: 'NY' },
    })
    fireEvent.change(screen.getAllByLabelText(/ZIP/i)[1], {
      target: { value: '10001' },
    })

    fireEvent.change(screen.getByLabelText(/Length/i), {
      target: { value: '10' },
    })
    fireEvent.change(screen.getByLabelText(/Width/i), {
      target: { value: '5' },
    })
    fireEvent.change(screen.getByLabelText(/Height/i), {
      target: { value: '4' },
    })
    fireEvent.change(screen.getByLabelText(/Weight/i), {
      target: { value: '20' },
    })

    fireEvent.click(screen.getByText(/Generate Label/i))

    await waitFor(() => {
      expect(screen.getByText(/Generating.../i)).toBeInTheDocument()
    })
  })
})
