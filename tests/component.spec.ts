import { component } from '../src';
import { componentName, inheritAttrs, events, props } from './common';


describe('component', () => {
  it('builds functional component', () => {
    const comp = component(componentName)
      .setup(_ => {});

    expect(typeof comp).toBe('function');
  });

  it('sets name and attrs', () => {
    const comp = component(componentName, inheritAttrs)
      .setup(_ => {});

    expect(comp).toHaveProperty('displayName');
    expect(comp.displayName).toBe(componentName);
    expect(comp).toHaveProperty('inheritAttrs');
    expect(comp.inheritAttrs).toBe(inheritAttrs);
  });

  it('sets props and events correctly', () => {
    const propTestReq = 42;
    const propTestDef = 0;

    const eventName = 'test';

    const comp = component(componentName, inheritAttrs)
      .emits(events)
      .withProps(props)
      .setup((props, ctx) => {
        expect(props.testDef).toBe(propTestDef);
        expect(typeof props.testDef).toBe('number');
        expect(props.testReq).toBe(propTestReq);
        expect(typeof props.testReq).toBe('number');
        expect(props.testOpt).toBeUndefined();

        ctx.emit(eventName, props.testReq);
      });

    expect(comp.emits).toBe(events);
    expect(comp.props).toBe(props);

    const mockEmit = jest.fn();

    // Imitating internal Vue component call
    comp({
      testDef: propTestDef,
      testReq: propTestReq
    }, { emit: mockEmit, attrs: {}, slots: {} });

    expect(mockEmit).toHaveBeenCalledWith(eventName, propTestReq);
  });
});
