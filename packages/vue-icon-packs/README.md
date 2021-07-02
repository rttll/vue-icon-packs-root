# vue-icon-packs

Vue SVG icon components.

`Hero Icons`,
`Remix Icon`, `Octicons`, `Ionic Icons`, `Box Icons`, `Tabler Icons`

```js
// Import
import { Arrow } from 'vue-icon-packs/hi';

// and go
<Arrow />;
```

## Search icons: [search.com](https://search.com)

# Install

```bash
$ yarn add vue-icon-packs

# or with npm
$ npm i vue-icon-packs

```

# Usage

## Search icons: [search.com](https://search.com)

_Also includes import instructions._

### **Import**

Each icon pack is exported from its own subdir.  
Use named imports:

```javascript
import { Arrow } from 'vue-icon-packs/hi';
import { FooBar } from 'vue-icon-packs/bx';
```

### **Component tag**

Pascal and kebop style supported:

```html
<!-- pascal case -->
<Arrow />

<!-- kebob -->
<foo-bar />
```

## Style

Components inherit size from the parent, as well as stroke and fill colors where applicable.

Beyond that, you can style it like any other component.

```html
<!-- Red fill -->
<span style="color: red">
  <ArrowSolid />
</span>

<!-- Also red fill -->
<ArrowSolid style="color: red" />

<!-- Center-align component to siblings, and make it smaller -->
<h1 class="icon-heading">
  <span>Hello world!</span>
  <Arrow class="icon" />
</h1>

<style>
  .icon-heading {
    display: flex;
    align-items: center;
  }
  .icon-heading .icon {
    font-size: 80%;
  }
</style>
```

## Usage notes

**Name Collisions**

Icon names are equalized within each pack, but not between packs.
In the case of name collisions, just alias the component on import:

```javascript
import { Abacus } from 'vue-icon-packs/hi';
// Use `as` syntax to alias component name
import { Abacus as AbacusBX } from 'vue-icon-packs/bx';
```
