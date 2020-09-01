# vue-functional-props

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
  level: Number;
}, (props, context) => {
  // here props.level is already defined
  return h(`h${props.level}`, context.attrs, context.slots);
});
```

### API

#### `function withProps<P extends Record<string, any>, S extends Function>(props: P, setup: S): S`

A simple function wrapper that accepts a standard [vue props object definition](https://v3.vuejs.org/guide/component-props.html#prop-types) and a [setup function](https://v3.vuejs.org/api/composition-api.html#setup) and adds props to the setup function definition so they can be recognized by vue.

For now only works with object prop definitions, not with arrays.

#### `function props<T>(options: PropOptions<T>): PropOptions<T>`

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
- [ ] Proper type inference for array props
- [ ] Proper type inference for optional props

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
