import 'node_modules/@testing-library/jest-dom';

import Input from '@components/ui/input/input.component';
import { fireEvent, render, screen } from 'node_modules/@testing-library/react';
import React from 'react';

describe('Input component', () => {
  it('renders without crashing', () => {
    render(<Input name="test" placeholder="Test Input" />);

    const input = screen.getByPlaceholderText('Test Input');

    expect(input).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<Input name="testInput" label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('calls onChange handler when input value changes', () => {
    const handleChange = jest.fn();

    render(<Input name="test" placeholder="Test Input" onChange={handleChange} />);

    fireEvent.change(screen.getByPlaceholderText('Test Input'), { target: { value: 'Test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
