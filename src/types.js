var types = {
  attribute: (name) => ({type: 'ATTR', name}),
  property: (name) => ({type: 'PROPERTY', name}),
  listener: (name) => ({type: 'LISTENER', name}),
  custom: (handler) => ({type: 'CUSTOM', handler}),
};

export default types;
