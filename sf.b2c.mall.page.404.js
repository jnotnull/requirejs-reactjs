define(
  'sf.b2c.mall.page.404',
  [
    'can',
    'jquery',
    'sf.b2c.mall.framework.comm',
    'sf.util',
    'sf.b2c.mall.business.config',

    'sf.b2c.mall.api.product.findRecommendProducts',

    'es5-shim',
    'es5-sham',
    "react-dom",
    'react',
    'es6!recommendProducts'
  ],
  function(can, $, SFFrameworkComm, SFFn, SFBusiness,
    findRecommendProducts,
    SHIM, SHAM, ReactDOM, React, recommendProducts) {

    SFFrameworkComm.register(1);
    SFFn.monitor();

    ReactDOM.render(React.createElement(recommendProducts), $('.recommend')[0]);
  })
