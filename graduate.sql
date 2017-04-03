/*创建数据库*/
/* create database designerSite;
use designerSite;

/*创建管理员表*/
/* create table admin(
	adminID int not null auto_increment,
    adminName varchar(30) not null,
    adminPwd varchar(50) not null,
    isSuper bit not null default 0,
    primary key(adminID)
); 
alter table admin add email varchar(100) not null;*/  /*添加email字段用于登录*/
/*insert into admin values(default,"hiram","hiram1994",1,"pihuilong@qq.com");*/
insert into admin values(default,"BonnieLee","bonnie1993",1,"1770232364@qq.com");


/*创建主页关于我*/
/* create table indexAboutMe(
	adminID int not null primary key,
    aboutMe longtext null,
    experience longtext null,
    willing longtext null
);
/*定义外键以及级联操作*/
/* alter table indexAboutMe add constraint fk_admin_ID
foreign key (adminID)
references admin(adminID)
on update cascade;   /*主表更新，字表们产生连锁更新动作*/

/*创建主页技能表*/
/* create table indexSkill(
	skillID int primary key,
	adminID int not null,
    skill longtext null
);
/*定义外键以及级联操作*/
/* alter table indexSkill add constraint fk_skill_admin_ID
foreign key (adminID)
references admin(adminID)
on update cascade;   /*主表更新，字表们产生连锁更新动作*/


/*创建作品分类表*/
/* create table worksType(
	typeID int primary key auto_increment,
    adminID int not null,
    typeName varchar(20) not null,
    typeDescription longtext null
);
/*定义外键以及级联操作*/
/* alter table worksType add constraint fk_work_admin_ID
foreign key (adminID)
references admin(adminID)
on update cascade;   /*主表更新，字表们产生连锁更新动作*/

/*创建作品表*/
/* create table works(
	worksID int primary key auto_increment,
    typeID int not null,
    worksName varchar(20) not null,
    worksIntro longtext null,
    workImg varchar(100) null,
    workHyperLink varchar(100) null,
    showIndex bit not null
);
/*定义外键以及级联操作*/
/* alter table works add constraint fk_work_type_ID
foreign key (typeID)
references workstype(typeID)
on update cascade;   /*主表更新，字表们产生连锁更新动作*/

/*创建简历表*/
/* create table resume(
	resumeID int primary key auto_increment,
    adminID int not null,
    resumeName varchar(30) not null,
    isShow bit not null
);
/*定义外键以及级联操作*/
/* alter table resume add constraint fk_resume_admin_ID
foreign key (adminID)
references admin(adminID)
on update cascade;   /*主表更新，字表们产生连锁更新动作*/

/*创建简历主信息表*/
/* create table resumeMain(
	resumeID int primary key,
    userName varchar(30) not null,
    sex bit not null,
    birth date not null,
    nativePlace varchar(20) not null,        //所在地
    highestQualification varchar(30) not null,   //最高学历
    specialty varchar(30) not null,          //专业
    workYear int null,
    tel varchar(20) not null,
    mailbox varchar(50) not null,
    jobspecification varchar(20) not null,   //工作性质
    willSpot varchar(30) not null,          //意向地址
    adsumDate date,                          //到岗时间
    promisingIndustry varchar(30),           //期望行业
    userImg varchar(100),					//用户头像
    workStatus varchar(20)                  //工作状态
);
/*定义外键以及级联操作*/
/* alter table resumemain add constraint fk_main_resume_ID
foreign key (resumeID)
references resume(resumeID)
on update cascade;   /*主表更新，字表们产生连锁更新动作*/

/*创建简历副信息表*/
/* create table resumeSub(
	resumeID int primary key,
    educationExperience longtext null,
    trainingExperience longtext null,
    workExperience longtext null,
    specializeSkill longtext not null
);
/*定义外键以及级联操作*/
/* alter table resumeSub add constraint fk_sub_resume_ID
foreign key (resumeID)
references resume(resumeID)
on update cascade;   /*主表更新，字表们产生连锁更新动作*/

/*创建服务类型表*/
/* create table serviceType(
	typeID int primary key auto_increment,
    adminID int not null,
    typeName varchar(30) not null,
    typeImg varchar(100) null,
    typeDescription longtext null
);
/*定义外键以及级联操作*/
/* alter table serviceType add constraint fk_service_admin_ID
foreign key (adminID)
references admin(adminID)
on update cascade;   /*主表更新，字表们产生连锁更新动作*/

/*创建服务表*/
/* create table service(
	serviceID int primary key auto_increment,
    typeID int not null,
    serviceTitle varchar(30) not null,
    serviceDescription longtext not null,
    servicePrice numeric(8,2) not null,
    showIndex bit not null,
    serviceLogo varchar(100) null
);
/*定义外键以及级联操作*/
/* alter table service add constraint fk_service_type_ID
foreign key (typeID)
references servicetype(typeID)
on update cascade;   /*主表更新，字表们产生连锁更新动作*/

/*创建管理员订单表*/
/* create table adminOrder(
	adminOrderID int primary key auto_increment,
    adminID int not null,
    orderID int not null
);
/*定义外键以及级联操作*/
/* alter table adminOrder add constraint fk_order_admin_ID
foreign key (adminID)
references admin(adminID)
on update cascade;   /*主表更新，字表们产生连锁更新动作*/
/* alter table adminOrder add constraint fk_customer_order_ID
foreign key (orderID)
references customerorder(orderID)
on update cascade;   /*主表更新，字表们产生连锁更新动作*/


/*创建客户表*/
/* create table customers(
	customerID int primary key auto_increment,
    email varchar(50) not null,
    customerPwd varchar(32) not null,
    customerName varchar(20) not null,
    sex bit null,
    tel varchar(20) null,
    age int null,
    photo varchar(100) null,
    vip bit not null
);

/*创建客户订单表*/
/* create table customerOrder(
	orderID int primary key auto_increment,
    customerID int not null,
    orderTime datetime not null,
    orderStatus tinyint not null,
    orderDescription longtext null
);
/*定义外键以及级联操作*/
/* alter table customerOrder add constraint fk_customer_ID
foreign key (customerID)
references customers(customerID)
on update cascade;   /*主表更新，字表们产生连锁更新动作*/

/*创建客户订单详情表*/
/* create table customerOrderItem(
	orderID int ,
    serviceID int ,
    amount int not null,
    primary key(orderID,serviceID)
);

/*定义外键以及级联操作*/
/* alter table customerOrderItem add constraint fk_order_ID
foreign key (orderID)
references customerorder(orderID)
on update cascade;   /*主表更新，字表们产生连锁更新动作*/
/* alter table customerOrderItem add constraint fk_service_ID
foreign key (serviceID)
references service(serviceID)
on update cascade;   /*主表更新，字表们产生连锁更新动作*/







