'use strict';

//Table customers
exports.email_exist = (email) => {
    let sql = "select * from customers where email = ?";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [email]);
    });
}
exports.customer_INS = (customerName, customerPwd, email, photo) => {
    let sql = "insert into customers values(default,?,?,?,null,null,null,?,'0')";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [email, customerPwd, customerName, photo]);
    });
}
exports.customer_Login = (username, password) => {
    let sql = "select * from customers where email = ? and customerPwd = ?";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [username, password]);
    });
}

//Table orders
exports.orders_INS = (customerID, adminID, serviceID, amount, orderTime, orderDescription) => {
    let sql = "insert into orders values(default,?,?,?,?,?,'0',?)";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [customerID, adminID, serviceID, amount, orderTime, orderDescription]);
    });
}
exports.orders_SEL_Working = (adminID) => {
    let sql = "select * from orders where adminID = ? and orderStatus = '0'";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [adminID]);
    });
}
exports.orders_SEL_Cancel = (adminID) => {
    let sql = "select * from orders where adminID = ? and orderStatus = '-1'";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [adminID]);
    });
}
exports.orders_SEL_Finish = (adminID) => {
    let sql = "select * from orders where adminID = ? and orderStatus = '1'";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [adminID]);
    });
}
exports.orders_UPD_Status = (orderID, orderStatus) => {
    let sql = "update orders set orderStatus=? where orderID=?";
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [orderStatus, orderID]);
    });
}


//Table orders & service & customers
exports.orderDetail = (orderID) => {
    let sql = "select o.orderID,o.amount,o.orderTime,o.orderStatus,o.orderDescription," +
        "c.email,c.customerName,c.sex,c.tel,c.age,c.photo," +
        "s.serviceTitle,s.servicePrice,s.serviceDescription " +
        "from orders as o " +
        "join customers as c on(o.customerID=c.customerID) " +
        "join service as s on(o.serviceID=s.serviceID) " +
        "where orderID=?;"
    return Promise.using(util.getConn(), function(conn) {
        return conn.queryAsync(sql, [orderID]);
    });
}