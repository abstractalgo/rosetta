# <img src="./public/logo.svg" height="20px"> rosetta

A directory of various software development techniques demonstrated in multiple technologies and languages that you can compare side by side. Can be used for learning or as a reference.

## Contributing

- make changes and test things locally (see [running locally](#running-locally))
- submit your changes as new PRs
- make sure to follow the [Guildelines](#contributor-guidelines)
- all PRs will have a preview build generated automatically
- get approving reviews for your PR
- merge changes (all pushes get automatically deployed to the live website)

Currently all snippets are placed within `/public/rosetta` folder, in the form of `<topic>/<tech>.md`.

> - `<topic>` corresponds to those found in `/utils/topics.ts`
> - `<tech>` correponds to those found in `/utils/techs.ts`

Add/modify snippets as Markdown (`.md`) files, exclusively. [Github flavored Markdown (GFM)](https://github.github.com/gfm/) formatting is supported.

### Adding a new tech

To add a new tech to an existing topic (i.e. add another column as an option), just create a file within `/public/rosetta/<topic>/<tech>.md` and populate it with content. Find the `<tech>` identifiers within `/utils/techs.ts` (filenames will be matched exactly with these expected identifiers).

If you don't see a technology listed, you can modify `/utils/techs.ts` to add a new tech and its details (this will "register" it), and then do the mentioned steps to add a file snippet.

### Adding a new topic

To add a new topic, modify `/utils/topics.ts` to "register" the topic, and then create corresponding folder within `/public/rosetta`, with appropriate `<tech>.md` files within.

## Running locally

This is a [Next.js](https://nextjs.org/) project ([React](https://reactjs.org) with [Typescript](https://www.typescriptlang.org)), hosted on [Vercel](https://vercel.com/). To learn more about it visit [Next.js documentation](https://nextjs.org/docs).

To run things locally, use [yarn](https://yarnpkg.com) and Next.js-provided scripts.

- install dependencies by running `yarn install`
- to start the development server use `yarn dev` (this will start listening on [http://localhost:3000](http://localhost:3000))

## Contributor guidelines

to be defined
