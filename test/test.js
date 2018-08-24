import Template from '../index';

const { expect } = require('chai');

// Mock the bit that pulls templates from the index.html
global.document = {
  querySelectorAll: () => [
    { id: 'test1', innerHTML: 'Name: {{name}}, Age: {{age}}' },
    { id: 'test2', innerHTML: 'Name: {{user.name}}, Age: {{age}}' },
    { id: 'test3', innerHTML: '{{show}}Show this{{/show}}{{hide}}Hide this{{/hide}}' },
    { id: 'test4', innerHTML: '{{fruit}}<li>{{name}} are {{colour}}</li>{{/fruit}}' },
    { id: 'test5', innerHTML: 'Name: {{name}}, Age: {{age}}, {{unclosed}}' },
    { id: 'test6', innerHTML: '{{items}}<p>{{name}}</p><p>{{global}}</p>{{/items}}' },
  ],
};

describe('#rw-templater', () => {
  it('throws for unknown id', () => {
    const html = Template.it('unknownId', { name: 'Richard', age: 36 });
    expect(html).to.equal('unknownId');
  });

  it('throws for unknown data property', () => {
    expect(() => Template.it('test2', { age: 3 })).to.throw(Error, "rw: 'user' not found");
  });

  it('processes simple objects', () => {
    const html = Template.it('test1', { name: 'Richard', age: 36 });
    expect(html).to.equal('Name: Richard, Age: 36');
  });

  it('processes deep objects', () => {
    const html = Template.it('test2', { user: { name: 'Richard' }, age: 36 });
    expect(html).to.equal('Name: Richard, Age: 36');
  });

  it('processes conditionals', () => {
    const html = Template.it('test3', { show: true });
    expect(html).to.equal('Show this');
  });

  it('processes loops', () => {
    const html = Template.it('test4', { fruit: [{ name: 'Apples', colour: 'green' }, { name: 'Raspberries', colour: 'red' }] });
    expect(html).to.equal('<li>Apples are green</li><li>Raspberries are red</li>');
  });

  it('allows globals within loops', () => {
    const html = Template.it('test6', { global: 'all', items: [{ name: 'green' }, { name: 'red' }] });
    expect(html).to.equal('<p>green</p><p>all</p><p>red</p><p>all</p>');
  });

  it('throws for unclosed tag', () => {
    expect(() => Template.it('test5', { name: 'Richard', age: 36 })).to.throw(Error, "rw: 'unclosed' not closed");
  });
});
