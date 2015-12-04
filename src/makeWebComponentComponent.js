import React from 'react';
export default function makeWebComponentComponent(params) {

  var Component = class WebComponentComponent extends React.Component {
    constructor() {
      super();
      this.listeners = {};
      this.cleanupActions = [];
    }

    performUpdate(el, key, value) {
      var prop = params.props[key];
      if (!prop) prop = {type: 'ATTR', name: key};

      if (prop.type === 'ATTR') {
        el.setAttribute(prop.name, value);
      }
      else if (prop.type === 'PROPERTY') {
        el[prop.name] = value;
      }
      else if (prop.type === 'LISTENER') {
        if (!this.listeners[prop.name]) {
          const listener = (...args) => {
            if (this.listeners[prop.name]) {
              return this.listeners[prop.name](...args);
            }
          };
          el.addEventListener(props.name, listener, false);
          this.cleanupActions.push(() => {
            el.removeEventListener(props.name, listener, false);
          });
        }
        this.listeners[prop.name] = value;
      }
      else if (prop.type === 'CUSTOM') {
        prop.handler(el, key, value);
      }
    }

    update(previous, next) {
      var el = this.refs.el;
      var allKeys = Object.keys(previous).concat(Object.keys(next)).filter((key, index, xs) => xs.slice(index).indexOf(key) === -1);
      allKeys.forEach((key) => {
        if (previous[key] !== next[key]) this.performUpdate(el, key, next[value]);
      })
    }

    componentWillReceiveProps(nextProps) {
      this.preparedUpdate = [this.props, nextProps];
    }

    componentDidMount() {
      this.update({}, this.props);
    }

    componentDidUpdate() {
      if (!this.preparedUpdate) return;
      this.update(...this.preparedUpdate);
      this.preparedUpdate = null;
    }

    componentWillUnmount() {
      this.cleanupActions.forEach((fn) => fn());
    }

    render() {
      return React.createElement(params.tag, {children: this.props.children, ref: 'el'});
    }
  };
}

