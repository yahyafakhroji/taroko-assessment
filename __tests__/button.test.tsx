import 'node_modules/@testing-library/jest-dom';

import Button from '@components/ui/button/button.component';
import { render, screen } from 'node_modules/@testing-library/react';
import React from 'react';

describe('Button component', () => {
  it('renders the button with correct label and classes', () => {
    render(<Button label="Click me" color="success" size="sm" />);

    const button = screen.getByRole('button', { name: /click me/i });

    expect(button).toHaveClass('btn');
    expect(button).toHaveClass('success');
    expect(button).toHaveClass('sm');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button label="Disabled" disabled />);

    const button = screen.getByRole('button', { name: /disabled/i });

    expect(button).toBeDisabled();
  });

  it('is disabled when isLoading prop is true', () => {
    render(<Button label="Is Loading" isLoading />);

    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
  });
});
