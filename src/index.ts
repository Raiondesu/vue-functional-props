import { Prop, FunctionalComponent, ExtractPropTypes, PropType } from 'vue';

type DefaultFactory<T> = (props: Record<string, unknown>) => T | null | undefined;

interface FakePropOptions<T = any, D = T> {
  type?: () => any | (new () => any) | true | null;
  required?: boolean;
  default?: D | DefaultFactory<D> | null | undefined | object;
  validator?(value: unknown): boolean;
}

/**
 * Creates a TS-valid vue prop definition from a simple object
 *
 * @template T desired complex type for the prop
 * @template D if default type is something specific - provide it here
 * @param options simple vue property definition
 */
export const prop = <T, D = T>() => <O extends FakePropOptions<T, D>>(options: O) => options as O & {
  type: () => T;
};

export type ObjectPropsTemplate = Readonly<Record<string, Prop<any>>>;

export type ArrayPropsTemplate = Readonly<Array<string>>;

export type ExtractArrayPropTypes<P extends ArrayPropsTemplate> = {
  [idx in Extract<keyof P, number>]: Record<P[idx], any>;
}[number];

export type ObjectEmitsOptions = Record<string, ((...args: any[]) => any) | null>;

export type EmitsOptions = ObjectEmitsOptions | string[];

export type ExtractProps<Props extends ObjectPropsTemplate | ArrayPropsTemplate> = Props extends ArrayPropsTemplate
    ? ExtractArrayPropTypes<Props>
    : ExtractPropTypes<Props>;

export interface FunctionalHusk<
  Props extends ObjectPropsTemplate | ArrayPropsTemplate,
  Events extends EmitsOptions
> {
  withProps: <
    P extends ObjectPropsTemplate | ArrayPropsTemplate
  >(props: P) => FunctionalHusk<P, Events>;

  emits: <
    E extends EmitsOptions
  >(events: E) => FunctionalHusk<Props, E>;

  setup: (setup: FunctionalComponent<ExtractProps<Props>, Events>) => FunctionalComponent<ExtractProps<Props>, Events>;
};

/**
 * A simple function wrapper that accepts a component name and inheritAttrs flag, and adds them to the setup function definition
 * via calling the setup function on the resulting object
 *
 * @param name component's display name
 * @param inheritAttrs disables component's ability to forward attrs automatically to the root node
 * @returns setup builder
 */
export const component = <
  P extends ObjectPropsTemplate | ArrayPropsTemplate,
  E extends EmitsOptions
>(
  name: string,
  inheritAttrs: boolean = true,
  props?: P,
  events?: E
): FunctionalHusk<P, E> => ({
  withProps: props => component(name, inheritAttrs, props, events),
  emits: events => component(name, inheritAttrs, props, events),
  setup: setup => (
    setup.inheritAttrs = inheritAttrs,
    setup.displayName = name,
    setup.emits = events,
    setup.props = props as any,
    setup
  )
});

/**
 * A simple function wrapper that accepts a standard vue props object definition and a setup function and adds props to the setup function definition
 *
 * @param props a props object definition
 * @param setup vue composition api setup function
 * @returns the same setup function
 */
export const withProps: {
  /**
   * A simple function wrapper that accepts a standard vue props object definition and a setup function and adds props to the setup function definition
   *
   * @param props a props object definition
   * @param setup vue composition api setup function
   * @returns the same setup function
   */
  <
    P extends ObjectPropsTemplate,
    S extends FunctionalComponent<ExtractPropTypes<P, true>, any>
  >(props: P, setup: S): S;


  /**
   * A simple function wrapper that accepts a standard vue props array definition and a setup function and adds props to the setup function definition
   *
   * @param props a props array definition
   * @param setup vue composition api setup function
   * @returns the same setup function
   */
  <
    P extends ArrayPropsTemplate,
    S extends FunctionalComponent<ExtractArrayPropTypes<P>>
  >(props: P, setup: S): S
} = <P, S>(props: P, setup: S): S => (
  (setup as any).props = props,
  setup
);
