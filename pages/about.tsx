import Link from 'next/link';
import React, { Component } from 'react';

type Props = { title: string };

export default class About extends Component<Props> {
  render() {
    return <div>
      <h1 style={{ textAlign: 'center' }}>
        <img src="nacho-the-best.gif" />
      </h1>
      <h3 style={{ textAlign: 'center' }}>
        <Link href="/"><a>Home</a></Link>
      </h3>
    </div>;
  }
}
