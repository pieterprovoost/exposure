# exposure

Statistical analysis of occupational exposure data

## Features

[Lognormal distribution](#lognormal)

<a name="lognormal"></a>
### Lognormal distribution

#### Approximation of Land's exact 95% LCL and UCL

```javascript
var v = new jerzy.Vector([0, 1, 2, 3]);
console.log(exposure.Lognormal.landExact95(v));
```
