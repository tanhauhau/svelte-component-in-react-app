import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { writable } from 'svelte/store';
import { bind } from 'svelte/internal';
import SvelteComponent from './Component.svelte';
import { Context } from './context';

function Component(props, ref) {
  const divRef = useRef();
  const contextValue = useContext(Context);
  const storeRef = useRef();
  const componentRef = useRef();

  useEffect(() => {
    if (storeRef.current === undefined) {
      storeRef.current = writable(contextValue);
    } else {
      storeRef.current.set(contextValue);
    }
  }, [storeRef, contextValue]);

  useImperativeHandle(ref, () => {
    const names = Object.getOwnPropertyNames(SvelteComponent.prototype);
    const obj = {};
    for (const name of names) {
      if (name === 'constructor') continue;

      obj[name.slice(1).toLowerCase()] = function (...args) {
        componentRef.current[name](...args);
      };
    }
    return obj;
  }, [ref]);

  useEffect(() => {
    const component = new SvelteComponent({
      props: props,
      target: divRef.current,
      context: new Map([['context', storeRef.current]]),
    });

    for (const key of Object.keys(props)) {
      if (!key.startsWith('on') && `on${key.toUpperCase()}Change` in props) {
        bind(component, key, (value) =>
          props[`on${key.toUpperCase()}Change`](value)
        );
      }
    }

    componentRef.current = component;

    // bind(component, 'b', (value) => onBChange(value));

    // component.$on('change', (event) => {
    //   const { type, value } = event.detail;
    //   if (type === 'a') {
    //     onAChange(value);
    //   } else if (type === 'b') {
    //     onBChange(value);
    //   }
    // })

    return () => {
      component.$destroy();
    };
  }, [divRef]);

  useEffect(() => {
    componentRef.current.$set(props);
  }, [props])

  return <div ref={divRef} />;
}

export default React.forwardRef(Component);
