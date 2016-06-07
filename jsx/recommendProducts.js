import React from 'react';
import SFFindRecommendProducts from 'sf.b2c.mall.api.product.findRecommendProducts';

var recommendProducts = React.createClass({

  getDefaultProps: function() {
    return {detailUrl: 'http://www.fengqu.com/detail'}
  },

  getInitialState: function() {
    return {itemlist: []};
  },

  componentDidMount: function() {
    var self = this;

    var findRecommendProducts = new SFFindRecommendProducts({
      'itemId': -1,
      'size': 8
    });

    findRecommendProducts
      .sendRequest()
      .done(function(data) {
        data.hasData = true;

        if ((typeof data.value == "undefined") || (data.value && data.value.length == 0)) {
          data.hasData = false;
        }

        _.each(data.value, function(item) {
          item.linkUrl = self.props.detailUrl + "/" + item.itemId + ".html";
          item.imageName = item.imageName + "@102h_102w_80Q_1x.jpg";
          item.sellingPrice = item.sellingPrice/100;
        })

        self.setState({itemlist: data.value});
      })
  },

  render: function() {
    return (<div><h2>为您推荐</h2>
        <ul className="clearfix" id="recommendProdList">

        {
          this.state.itemlist.map(function(item, index) {
            return <li>
                        <div className="recommend-c2">
                          <a href={item.linkUrl}><img src={item.imageName} alt="" /></a>
                        </div>
                        <div className="recommend-c1">
                          <h3><a href={item.linkUrl}>{item.productName}</a></h3>
                          <div className="recommend-r1">¥{item.sellingPrice}</div>
                        </div>
                    </li>
          })
        }
        </ul></div>)
  }
});

export default recommendProducts;