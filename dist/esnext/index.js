export const prop = () => (options) => options;
;
export const component = (name, inheritAttrs = true, props, events) => ({
    withProps: props => component(name, inheritAttrs, props, events),
    emits: events => component(name, inheritAttrs, props, events),
    setup: setup => (setup.inheritAttrs = inheritAttrs,
        setup.displayName = name,
        setup.emits = events,
        setup.props = props,
        setup)
});
export const withProps = (props, setup) => (setup.props = props,
    setup);
//# sourceMappingURL=index.js.map