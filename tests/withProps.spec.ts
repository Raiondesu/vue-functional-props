import { withProps } from '../src';
import { props } from './common';
import { FunctionalComponent } from 'vue';

describe('withProps', () => {
  it('sets props correctly', () => {
    const propTestReq = 42;
    const propTestDef = 0;

    const eventName = 'test';

    const comp = withProps(props, (props, _) => {
      expect(props.testDef).toBe(propTestDef);
      expect(typeof props.testDef).toBe('number');
      expect(props.testReq).toBe(propTestReq);
      expect(typeof props.testReq).toBe('number');
      expect(props.testOpt).toBeUndefined();

      _.emit(eventName, props.testReq);
    });

    // Need a cast here since the inferred type of the mock function doesn't correspond with FunctionalComponent
    expect((comp as FunctionalComponent).props).toBe(props);

    const mockEmit = jest.fn();

    // Imitating internal Vue component call
    comp({
      testDef: propTestDef,
      testReq: propTestReq
    }, { emit: mockEmit, attrs: {}, slots: {} });

    expect(mockEmit).toHaveBeenCalledWith(eventName, propTestReq);
  });
});
