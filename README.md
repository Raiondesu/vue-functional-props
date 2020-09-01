# vue-functional-props

> Handle functional component props properly

[![travis](https://img.shields.io/travis/raiondesu/vue-functional-props?style=flat-square)](https://travis-ci.org/raiondesu/vue-functional-props "Latest Travis CI build")
[![npm](https://img.shields.io/npm/dm/vue-functional-props.svg?style=flat-square)](https://www.npmjs.com/package/vue-functional-props "Downloads per month, but who cares?")
[![size](https://img.shields.io/bundlephobia/minzip/vue-functional-props@latest?style=flat-square)](https://bundlephobia.com/result?p=vue-functional-props@latest "minzipped size") <!-- [![coveralls](https://img.shields.io/coveralls/github/Raiondesu/vue-functional-props?style=flat-square)](https://coveralls.io/github/Raiondesu/vue-functional-props "Code coverage") -->
[![code quality](https://img.shields.io/codeclimate/maintainability/Raiondesu/vue-functional-props?style=flat-square)](https://codeclimate.com/github/Raiondesu/vue-functional-props/maintainability "Code quality")


It's a small library with a single purpose - provide Vue 3 with a simple way of **type-safe** handling props for functional components.

## Installation

`npm i -S vue-functional-props`\
or\
`yarn add vue-functional-props`

## Usage

**npm**:
```
npm i -S vue-functional-props
```

**browser**:
```html
<!-- ES2015 -->
<script type="module">
  import { withProps } from 'https://unpkg.com/vue-functional-props';

  // use it here
</script>

<!-- ES5 with IE11+ general syntax polyfills, global object - `vue-functional-props` -->
<!-- Polyfill `window.Promise` and `Object.assign` yourself! -->
<script src="https://unpkg.com/vue-functional-props/dist/umd.js"></script>
```

**Importing**:
```ts
// TS-module (pure typescript),
// allows compilation settings to be set from the project config
import { withProps } from 'vue-functional-props/src';

// ES-module (npm/node, typescript)
import { withProps } from 'vue-functional-props';

// ESNext (no polyfills for esnext)
import { withProps } from 'vue-functional-props/dist/esnext';

// ES-module (browser, node)
import { withProps } from 'https://unpkg.com/vue-functional-props';

// Classic node commonjs
const { withProps } = require('vue-functional-props/dist/js');
```

### Documenation example

Official Vue 3 docs state that functional component props can only be added in one way:
```ts
import { h } from 'vue';

// here, in TS, a user has to define props separately in two places, which produces code duplication
const DynamicHeading = (props: { level: number }, context) => {
  return h(`h${props.level}`, context.attrs, context.slots);
};

DynamicHeading.props = {
  level: Number;
};

export default DynamicHeading;
```

This is far from perfect for user experience, and is definitely in need of some sort of a wrapper (with type inference, preferably).

This tiny (~200B gzipped) library allows to achieve just that!

```ts
import { h } from 'vue';
import { withProps } from 'vue-functional-props'

// No code duplication whatsoever!
export default withProps({
  level: Number,
}, (props, context) => {
  // here props.level is already defined
  return h(`h${props.level}`, context.attrs, context.slots);
});
```

---

## API

### `function withProps<P, S>(props: P, setup: S): S`

A simple function wrapper that accepts a standard [vue props object definition](https://v3.vuejs.org/guide/component-props.html#prop-types) and a [setup function](https://v3.vuejs.org/api/composition-api.html#setup) and adds props to the setup function definition so they can be recognized by vue.

Usage with object prop notation:
```ts
withProps({
  level: Number,
  someProp: {
    type: String,
    required: true
  },
  otherProp: {
    type: String,
    default: ''
  }
}, (props, context) => {
  props.level // number | undefined
  props.someProp // string
  props.otherProp // string | undefined

  return h(`h${props.level}`, context.attrs, context.slots);
});
```

Usage with an array notation:
```ts
withProps(
  // `as const` cast is needed for array notation in order for TS to infer the type
  ['level', 'someProp', 'otherProp'] as const,
  (props, context) => {
    // No way around `any` if using array notation
    props.level // any
    props.someProp // any
    props.otherProp // any

    return h(`h${props.level}`, context.attrs, context.slots);
  }
);
```

---

### `function props<T>(options: PropOptions<T>): PropOptions<T>`

Enables type validaton for complex types in props without the need to pass constructors or runtime validators.\
Basically, a NOOP without TypeScript.

```ts
import { prop, withProps } from 'vue-functional-props';

// Some complex objects, for example
export declare interface TTableRow {}
export declare interface ITableColumn {}

export default withProps({
    /**
     * The collection of rows for the table
     */
    rows: prop<TTableRow[]>({
      type: Array,
      default: () => [],
    }),

    /**
     * Collection of columns to be displayed
     */
    columns: prop<ITableColumn[]>({
      type: Array,
      default: () => [],
    }),
}, (props) => {
  props.rows // TTableRow[]
  props.columns // ITableColumn[]

  return () => /* some render function */;
});
```

---

## TODO

- [ ] Tests
- [ ] Coverage

---

## Contribute

First, fork the repo and clone it:
```
git clone https://github.com/%your-github-username%/vue-functional-props.git
```

Then:
```
npm install
```

Then:
```
npm run dev
```

Then introduce changes and propose a PR!\
I'll be happy to review it!

---

Something's missing or found a bug?\
Feel free to [create an issue](https://github.com/Raiondesu/vue-functional-props/issues/new)!
