import 'node_modules/@testing-library/jest-dom';

import SearchWidget from '@components/search/search.component';
import { fireEvent, render } from 'node_modules/@testing-library/react';
import React from 'react';

describe('SearchWidget Component', () => {
  it('should render the SearchWidget component', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(<SearchWidget onChange={onChange} />);

    expect(getByPlaceholderText('Search Here')).toBeInTheDocument();
  });

  it('should debounce the input value before calling onChange', async () => {
    jest.useFakeTimers();

    const onChange = jest.fn();
    const { getByPlaceholderText } = render(<SearchWidget onChange={onChange} />);
    const input = getByPlaceholderText('Search Here');

    fireEvent.change(input, { target: { value: 'test' } });
    jest.advanceTimersByTime(500);
    expect(onChange).toHaveBeenCalledWith('test');
  });

  it('should not call onChange if input value is less than 3 characters', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(<SearchWidget onChange={onChange} />);
    const input = getByPlaceholderText('Search Here');

    fireEvent.change(input, { target: { value: 'te' } });
    expect(onChange).not.toHaveBeenCalled();
  });
});
