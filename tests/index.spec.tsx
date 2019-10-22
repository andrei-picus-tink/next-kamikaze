import { $render } from '@tdd-buffet/react';
import React from 'react';
import { expect } from 'tdd-buffet/expect/chai';
import { describe, it } from 'tdd-buffet/suite/node';
import Index from '../pages';

describe('Index page', () => {
  it('should hydrate data', async () => {
    const $container = $render(<Index initialState={{ loading: false, data: { title: 'foobar' } }} />);

    expect($container.text()).to.contain('foobar');
  });

  // TODO: how to test `getInitialProps`?
  it('should fetch data');
});
