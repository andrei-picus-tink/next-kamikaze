import { $render, click } from '@tdd-buffet/react';
import React from 'react';
import Mock from 'strong-mock';
import { expect } from 'tdd-buffet/expect/chai';
import { describe, it } from 'tdd-buffet/suite/node';
import { Home } from '../components/home';
import { ITitleService } from '../pages';

describe('Home', () => {
  it('should have a loading state', () => {
    const $container = $render(<Home title={{ state: { loading: true }, refresh: () => {} }} />);

    expect($container.text()).to.include('...');
  });

  it('should render the title', () => {
    const $container = $render(<Home
      title={{ state: { loading: false, data: { title: 'foobar' } }, refresh: () => {} }}
    />);

    expect($container.text()).to.include('foobar');
  });

  it('should call to refresh', () => {
    const refresh = new Mock<ITitleService['refresh']>();
    refresh.when(r => r()).returns(undefined);

    $render(<Home
      title={{ state: { loading: true }, refresh: refresh.stub }}
    />);

    click('button');

    refresh.verifyAll();
  });
});
