/* eslint-disable react/sort-comp */
import Head from 'next/head';
import Link from 'next/link';
import React, { Component } from 'react';
import connectToState from 'react-connect-state';
import { Home } from '../components/home';
import { TitleService, TitleState } from '../services/title';

interface Props {
  initialState?: TitleState;
}

export default class Index extends Component<Props> {
  static getInitialProps = async (): Promise<Props> => {
    const titleService = new TitleService(process.env.API_BASE!);

    // On the client side we will refresh the data.
    if (typeof window !== 'undefined') {
      return {
        initialState: undefined
      };
    }

    return new Promise(resolve => {
      titleService.subscribe(state => {
        if (!state.loading) {
          resolve({ initialState: state });
        }
      });
    });
  };

  // Always create a service. The instance lifecycle is tied to the page component's
  // lifecycle. If there is data from the server we will hydrate with that, otherwise
  // we'll fetch fresh data.
  private titleService = new TitleService(
    process.env.API_BASE!,
    this.props.initialState
  );

  private ConnectedHome = connectToState(
    Home,
    { title: this.titleService }
  );

  render() {
    const { ConnectedHome } = this;

    return <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ConnectedHome />

      <h3 style={{ textAlign: 'center' }}>
        <Link href="/about"><a>About</a></Link>
      </h3>
    </div>;
  }
}
