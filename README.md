# rw-templater

[![Build Status](https://travis-ci.org/rw251/rw-templater.svg?branch=master)](https://travis-ci.org/rw251/rw-templater)
[![Coverage Status](https://coveralls.io/repos/github/rw251/rw-templater/badge.svg?branch=master)](https://coveralls.io/github/rw251/rw-templater?branch=master)

Minimalistic templating engine inspired (nicked) largely from https://github.com/premasagar/tim

## Usage

index.html
```html
<script type='text/rw' id='about'>
  <p>ABOUT: Hello, my name is {{name}}. I'm {{age}} years old.</p>
</script>

<script type='text/rw' id='boolTest'>
  <div>
    The following line only appears is isData is truthy
  </div>
  {{isData}}
    THERE IS DATA
  {{/isData}}
</script>

<script type="text/rw" id="loopTest">
  If fruit is an array then this iterates through them
  <ul>
  {{fruit}}
    <li>{{name}} are {{colour}}</li>
  {{/fruit}}
  </ul>
</script>
```

file.js
```js
import { Template } from 'rw-templater';
document.getElementById('main').innerHTML = Template.it('templateId', data);
```
