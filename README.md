# `fruit-keg` infusion

> Hands-on starter kit for
  [fruit-keg](https://github.com/besenwagen/fruit-keg).

## Getting started

Run the following in your shell:

```shell
git clone --depth 1 git@github.com:besenwagen/fruit-keg-infusion.git e2e ; cd $_ ; ./oneoff
```

If you already have *Docker* and *Docker Compose* installed,
you can run the tests in the container right away:

```shell
./WCAG staging
```

This also produces an HTML report file for the *axe-core* result in `./reports/`.

## Installation fine print

Cloning into a directory that already is a git repository,
or a descendant of one, will integrate with it.
Caveat: there **must** be at least one commit.

Otherwise, a new git repository is initialized with an initial commit.

## Requirements

You should be comfortable with running basic commands in your terminal emulator.

If you don't have it already

- on Windows: [install WSL](https://docs.microsoft.com/en-us/windows/wsl/install)
- [install Docker for Desktop](https://www.docker.com/get-started)
    - available for Linux by now, never used that one myself yet;
      use your own good judgement :-)
- [download the Cypress app](https://docs.cypress.io/guides/getting-started/installing-cypress#Direct-download),
  unzip it and
    - on macOS: move it to `~/Applications`
    - on Linux: move it anywhere you like and export an alias
      or create an executable in your `$PATH` that opens it,
      with the name `cypress`

## Getting started

If you have docker installed, you can now run the demo site end-to-end tests in
the Cypress container:

```shell
./WCAG staging
```

If that completes with failing tests, it works. ;-) Go open the generated report at
`./reports/WCAG21AA.html/` with a browser.

To use the test runner GUI instead, manually open the `e2e` directory that you just created.

## Getting your feet wet

You should have the following directory strucuture after installation, files of
primary interest marked bold:

- **cypress**
  - **integration**
    - ***.js**
  - plugins
  - support
  - integration.js
- reports
- vendor
- **cypress.json**
- README.md
- WCAG

Exercise:

- change the `baseUrl` value in **cypress.json** to another site that you want
  to audit
- update the file(s) in **cypress/integration**

## API

`./vendor/cy-axe.js` exports two functions:

- `audit`: a function that runs *axe-core* on an array of URLs
- `auditor`: a higher order function that returns the
  `audit` function with predefined interceptors

The argument for `auditor` is an object initializer with the format:

```
{
  {string} mime-type: {string[]} glob-patterns
}
```

Intercepted URLs resolve an empty response body.
You'd want to use that for external resources that are not required for
the parts of your site that you want to test.
This improves the robustness and speed of your tests.

Example:

```js
const audit = auditor({
  'application/javascript': [
    'https://www.google-analytics.com/**',
  ],
});
```

Recommendation: for flexibility, create a doorway module that re-exports the
`audit` function or exports the return value of `auditor` and import from there
in your test suites. If you decide to fiddle with interceptors later, you don't
need to update your `./integration/*.js` test suites.
See `cypress/integration.js` as an example.

In its simplest form, the `audit` function takes an array of URLs that are
relative to `baseUrl`.

```js
audit([
  '/',
  '/foo/',
  '/bar/',
]);
```

The static page content of every URL is audited with *axe-core*.

Every URL can be followed by an optional object initializer that describes
interactive content for its preceding URL in the following format:

```
{
  {string} target: {string|function|Array} trigger,
}
```

- **target** is a _CSS selector_ for the interactive page fragment that you want
  to audit
- **trigger** is one of
  - a _CSS selector_ for an element that reveals **target** on activation
  - a function that runs a sequence of Cypress commands that reveal **target**,
    possibly asynchronously; that function **must** have a name
  - an array of values that match either of the two preceding forms

### Examples

One to one relation:

```js
audit([
  '/foo/', {
    '.dialog': 'button[aria-haspopup="dialog"]',
  },
]);
```

One to many relation:

```js
audit([
  '/foo/', {
    '.dialog': [
      'button.dialog1'
      'button.dialog2',
    ],
  },
]);
```

Advanced operations with a function:

```js
audit([
  '/foo/', {
    '.dialog': function foo() {
      // intercept an API request and give it an alias
      cy.intercept('/api/foo').as('foo');
      // trigger the request with a user interaction
      cy.get('button[name="foo"]').click();
      // use the alias to wait for the resolved request
      cy.wait('@foo');
      // after the request is resolved, the populated `.dialog` page fragment is audited
    },
  },
]);
```

## The `./WCAG` executable

No subcommand:

```shell
./WCAG
```

Run the tests in the container against a local development server.
The `baseUrl` value is overwritten with an environment variable.
Its value is currently hardcoded to `https://localhost:3443`,
adjust that as needed in the executable file.

```shell
./WCAG staging
```

Run the tests in the container against a remote staging server.

```shell
./WCAG auth
```

Run the tests in the container against a remote staging server
with Basic HTTP authentication.
You will be prompted for the credentials.

```shell
./WCAG mac
```

Run the tests in the macOS Test Runner GUI against a local development server.

```shell
./WCAG tux
```

Run the tests in the Linux Test Runner GUI against a local development server.

```shell
./WCAG update
```

Update the `./vendor` subtree.

### See also

- [WCAG command source code](https://github.com/besenwagen/e2e-wcag-template/blob/main/WCAG)
