$(function () {

    var productListEle = $('.c-list-area');


    function getProductlist() {
        $.ajax({
            url: '/product/productList',
            method: 'post',
            success: function (data) {
                console.log(data);
                if (!data.err) {
                    appendProductList(data);
                }
            }
        });
    }

    function appendProductList(list) {
        for (var i = 0; i < list.length; i++) {
            appendProductItem(list[i]);
        }
    }

    function appendProductItem(product) {
        var ele = $('<div class="c-list-row-container">' +
            '<div class="c-list-row">' +
            '<div class="c-col-item">' +
            '<div class="item-photo">' +
            '<img class="item-photo" src=' + product.logo + '></img>' +
            '</div>' +
            '<div class="item-name">' + (product.name || '-') + '</div>' +
            '</div>' +
            '<div class="c-col-item c-origin">' + product.min_limit + '-' + product.max_limit + '元</div>' +
            '<div class="c-col-item width180">' + (product.description || '-') + '</div>' +
            '<div class="c-col-item width180">每日费用' + (product.refer_cost_per_day || '-') + '元</div>' +
            '<div class="c-col-item width80">' + (product.longest_time || '-') + '天</div>' +
            '<div class="c-col-item width60">' +
            '<a href="/page/product_detail/' + product._id + '" class="col-item-btn">查看详情</a>' +
            '</div>' +
            '</div>' +
            '</div > ');
        productListEle.append(ele);
    }
    getProductlist();
});