import React, { Component } from 'react';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import { Demo } from './api/demo';
import { Home } from '../components/home';

interface Props {
  data: Demo;
}

export default class Index extends Component<Props> {
  static getInitialProps = async (): Promise<Props> => {
    const response = await fetch('http://localhost:3000/api/demo');

    return {
      data: await response.json()
    };
  };

  render() {
    return <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Home title={this.props.data.title} />
    </div>;
  }
}
