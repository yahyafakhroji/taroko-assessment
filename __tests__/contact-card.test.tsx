import 'node_modules/@testing-library/jest-dom';

import ContactCard from '@components/contact-card/contact-card.component';
import type { ContactListModel } from '@interfaces/contact.interface';
import { render } from 'node_modules/@testing-library/react';
import React from 'react';

describe('Card component', () => {
  it('renders correctly with data', () => {
    const data: ContactListModel = {
      id: 1,
      full_name: 'John Doe',
      first_name: 'John',
      last_name: 'John',
      job: 'Software Engineer',
      description: 'Lorem ipsum dolor sit amet',
      is_favorite: true,
    };
    const wrapper = render(<ContactCard data={data} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly without data', () => {
    const wrapper = render(<ContactCard />);

    expect(wrapper).toMatchSnapshot();
  });
});
