"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withProps = exports.component = exports.prop = void 0;
exports.prop = () => (options) => options;
;
exports.component = (name, inheritAttrs = true, props, events) => ({
    withProps: props => exports.component(name, inheritAttrs, props, events),
    emits: events => exports.component(name, inheritAttrs, props, events),
    setup: setup => (setup.inheritAttrs = inheritAttrs,
        setup.displayName = name,
        setup.emits = events,
        setup.props = props,
        setup)
});
exports.withProps = (props, setup) => (setup.props = props,
    setup);
//# sourceMappingURL=index.js.map