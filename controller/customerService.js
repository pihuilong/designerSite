'use strict';


exports.index = (req, res, next) => {
    customerModel.customer_SEL(req.session.customer.customerID)
        .then((result) => {
            res.render('customer/customer.html', { customer: result[0] });
        }).catch((err) => {
            util.errorHandle(err);
        });
}


exports.infoChange = (req, res, next) => {
    customerModel.customer_SEL(req.session.customer.customerID)
        .then((result) => {
            res.render("customer/info_change.html", { customer: result[0] });
        }).catch((err) => { util.errorHandle(err) });
}
exports.infoDoChange = (req, res, next) => {
    if (typeof(req.file) == "undefined") {
        req.file = { filename: "default.png" };
    }
    customerModel.customer_UPD(req.body.email, req.body.customerName, req.body.sex, req.body.tel, req.body.age, req.file.filename, req.session.customer.customerID)
        .then((result) => {
            if (result.serverStatus == "2") {
                if (req.body.oldPhoto != "default.png") {
                    let wholePath = rootpath.concat("/public/uploads/customer/", req.body.oldPhoto);
                    util.fileDelete(wholePath);
                }
                res.json({ code: 1 }).end();
            } else {
                res.json({ code: 0 }).end();
            }
        }).catch((err) => { util.errorHandle(err); });
}


exports.orderShow = (req, res, next) => {
    let typeID = req.params.typeID;
    if (typeID == 0) {
        customerModel.orders_SEL = customerModel.orders_SEL_Working;
    } else {
        customerModel.orders_SEL = customerModel.orders_SEL_Not_Working;
    }
    customerModel.orders_SEL(req.session.islogin_admin.adminID)
        .then((results) => {
            let promises = [];
            for (let i = 0; i < results.length; i++) {
                results[i].orderTime = results[i].orderTime.Format("yyyy-MM-dd hh:mm:ss");
            }
            Promise.all(promises).then(() => {
                res.render("customer/order/order_show.html", { orders: results });
            });
        }).catch((err) => {
            util.errorHandle(err);
        });
}
exports.orderDetail = (req, res, next) => {
    let orderID = req.params.orderID;
    customerModel.orderDetail_Customer(orderID).then(result => {
        result[0].orderTime = result[0].orderTime.Format("yyyy-MM-dd hh:mm:ss");
        result[0].totalPrice = parseFloat(result[0].servicePrice) * result[0].amount;
        res.render("customer/order/orderDetail.html", { detail: result[0] });
    }).catch((err) => {
        util.errorHandle(err);
    });
}