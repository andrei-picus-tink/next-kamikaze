/* eslint-disable react/sort-comp */
import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import Link from 'next/link';
import React, { Component } from 'react';
import connectToState, { IStateContainer, StateContainer } from 'react-connect-state';
import { Home } from '../components/home';

export type TitleState = {
  loading: true
  hydrated?: boolean;
} | {
  loading: false;
  data: {
    title: string;
  };
  hydrated?: boolean;
};

interface Props {
  initialState?: TitleState;
}

export interface ITitleService extends IStateContainer<TitleState> {
  refresh: () => void;
}

export class TitleService extends StateContainer<TitleState> implements ITitleService {
  constructor(private apiBase: string, initialState?: TitleState) {
    super();

    if (initialState) {
      this.state = { ...initialState, hydrated: true };
    } else {
      this.state = { loading: true, hydrated: false };
      this.getData();
    }
  }

  public refresh = () => {
    this.getData();
  };

  private async getData() {
    this.setState({ loading: true });

    const data: {title: string} = await fetch(`${this.apiBase}/api/demo`)
      .then(r => r.json());

    // Add a loading effect client side.
    if (typeof window !== 'undefined') {
      await new Promise(resolve => setTimeout(resolve, 250));
    }

    this.setState({
      loading: false,
      hydrated: false,
      data
    });
  }
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
