import { Prop, FunctionalComponent, ExtractPropTypes } from 'vue';

/**
 * Creates a TS-valid vue prop definition from a simple object
 *
 * @template T desired complex type for the prop
 * @template D if default type is something specific - provide it here
 * @param options simple vue property definition
 */
export const prop = <T, D = T>(options: Prop<T, D>) => options;

type ObjectPropsTemplate = Readonly<Record<string, Prop<any>>>;

type ArrayPropsTemplate = Readonly<Array<string>>;

type ExtractArrayPropTypes<P extends ArrayPropsTemplate> = {
  [idx in Extract<keyof P, number>]: Record<P[idx], any>;
}[number];

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
    S extends FunctionalComponent<ExtractPropTypes<P>>
  >(props: P, setup: S): S;


  /**
   * A simple function wrapper that accepts a standard vue props array definition and a setup function and adds props to the setup function definition
   *
   * @param props a props array definition
   * @param setup vue composition api setup function
   * @returns the same setup function
   */
  <
    P extends Readonly<Array<string>>,
    S extends FunctionalComponent<ExtractArrayPropTypes<P>>
  >(props: P, setup: S): S
} = <P, S>(props: P, setup: S): S => {
  (setup as any).props = props;

  return setup;
};
