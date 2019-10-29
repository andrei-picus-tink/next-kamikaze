/* eslint-disable react/sort-comp */
import Head from 'next/head';
import Link from 'next/link';
import React, { Component } from 'react';
import connectToState from 'react-connect-state';
import { Home } from '../components/home';
import { TitleData, TitleService } from '../services/title';

interface Props {
  initialData?: TitleData;
}

let titleService: TitleService;

function getTitleService(initialData?: TitleData) {
  return new TitleService(process.env.API_BASE!, initialData);
}

export default class Index extends Component<Props> {
  static getInitialProps = async (): Promise<Props> => {
    // Always create a new service when the component is "mounted".
    // On the server next.js will call this method and wait for it to resolve.
    // On the client this will only be called if the user navigates to this
    // route.
    titleService = getTitleService();

    // On the client side we want to fetch fresh data, but we don't want
    // to block rendering the component until the data is ready - we want
    // to show a loading spinner in the mean time.
    if (typeof window !== 'undefined') {
      return {};
    }

    // On the server side we block the request until data is ready and
    // then we pass it to the client.
    return new Promise(resolve => {
      titleService.subscribe(state => {
        if (!state.loading) {
          resolve({ initialData: state.data });
        }
      });
    });
  };

  private ConnectedHome = connectToState(
    Home,
    {
      // When we SSR we'll have a service instance. When we hydrate
      // on the client we won't have an instance but we'll have initial
      // data for it.
      title: titleService || getTitleService(this.props.initialData)
    }
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
