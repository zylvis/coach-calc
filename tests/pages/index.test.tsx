import { render, screen } from '@testing-library/react'
import Home from '../../pages/index'

test('Renders Login with email button', () => {
    render(<Home />)

    const buttonelement = screen.getByText(/LOG IN WITH EMAIL/i)

    expect(buttonelement).toBeInTheDocument()

  })
