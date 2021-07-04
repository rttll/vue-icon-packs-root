# vue-icon-packs

Vue SVG icon components.

Including icons from:  
`Hero Icons`,
`Remix Icon`, `Octicons`, `Ionic Icons`, `Box Icons`, `Tabler Icons`

Example usage:

```js
// Import
import { ArrowRight } from 'vue-icon-packs/oc';

// and go
<ArrowRight />;
```

# Install

```bash
$ yarn add vue-icon-packs

# or with npm
$ npm i vue-icon-packs

```

# Usage

Search all icons here:

## [search-vue-icon-packs.vercel.app](https://search-vue-icon-packs.vercel.app)

_Also includes useage instructions._

### **Import**

Each icon pack is exported from its own subdir.  
Use named imports:

```javascript
import { ArrowRight } from 'vue-icon-packs/oc';
import { LocationSharp, Add } from 'vue-icon-packs/io';
```

### **Component tag**

Pascal and kebop style supported:

```html
<!-- pascal case -->
<ArrowRight />

<!-- kebob -->
<arrow-right />
```

## Style

Components inherit size from the parent, as well as stroke and fill colors (where applicable).

So you can style directly, or have it inherit.

```html
<!-- Red fill (inherited)-->
<span style="color: red">
  <ArrowUpFill />
</span>

<!-- Red stroke (applied directly)-->
<ArrowRightLine style="color: red" />

<!-- A big icon -->
<h1 style="font-size:12rem">
  <LeftArrow />
</h1>
```

## Usage notes

**Name Collisions**

Icon names are equalized within each pack, but not between packs.
In the case of name collisions, just alias the component on import:

```javascript
import { Server } from 'vue-icon-packs/oc';

// Use `as` syntax to alias component name
import { Server as Server2 } from 'vue-icon-packs/ti';
```
