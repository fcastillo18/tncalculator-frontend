## Intro

Based on this [stater](https://github.com/CodingGarden/react-ts-starter)

This setup includes:

- [vite](https://vitejs.dev/)
- [eslint](https://eslint.org/), [typescript-eslint](https://typescript-eslint.io/), [eslint-airbnb-config](https://github.com/airbnb/javascript), [prettier](https://prettier.io/)
- [vitest](https://vitest.dev/), [jsdom](https://github.com/jsdom/jsdom), [@testing-library](https://testing-library.com/)
- [react-router v6](https://reactrouter.com/en/main)
- [storybook](https://storybook.js.org/)
- [react-query](https://tanstack.com/query/v3/)

## Live version

- You can follow this [link](http://www.tncalculator.io.s3-website-us-east-1.amazonaws.com/) for the live version served from AWS.

To hosted this wep-app we used:

- AWS S3 buckets, storage and deploy the app to the web
- AWS Codepipeline, build and deploy resources to the S3
- AWS CloudFront, managing CDN invalidations
- AWS System Manager, storage env variables.
- Some others.

## Running the app

This app app depends of this [tncalculator-api](https://github.com/fcastillo18/tncalculator-api)

- Execute `npm run install` to install dependencies
- Execute `npm run dev` to start the app, usually it get up in `http://localhost:5173/`
- You can run `npm run storybook` to see the stories available
