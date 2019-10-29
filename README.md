## Purpose

Simple SSR app build with next.js
- contains one static page
- contains one page that fetches data
- contains one API lambda


## Demo

[Deployed](https://next-kamikaze.andreipicustink.now.sh/) using now.sh.


## Local dev

```sh
yarn
yarn run dev
```


## Findings

- Using environment variables sucks on now.sh: I had to set them 3 times in 2 config files.
- next.js forces some tsconfig options that break tests:
  - `jsx: 'preserve'`: doesn't transpile JSX
  - `isolatedModules: true`: prevents some type errors to be picked up across files
  - fortunately I could override them in the Jest config
- Creating isomorphic API services is not trivial.
- Apart from env variables, now.sh is pretty nifty:
  - keeps a list of deploys in the dashboard
  - can view build and runtime logs
  - deploys automatically get a unique domain
  - any deploy can be promoted to production
  - 1 click rollback
