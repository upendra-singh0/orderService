create DATABASE shop_db;

create table INVENTORY_TABLE (
	product_id BIGSERIAL PRIMARY KEY,
	product_name VARCHAR(50) NOT NULL,
	product_price INT NOT NULL,
	product_quantity INT NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

insert into INVENTORY_TABLE (product_name, product_price, product_quantity) values ('Bread - Raisin Walnut Pull', 55, 86);
insert into INVENTORY_TABLE (product_name, product_price, product_quantity) values ('Salt - Sea', 27, 54);
insert into INVENTORY_TABLE (product_name, product_price, product_quantity) values ('Oneshot Automatic Soap System', 71, 39);
insert into INVENTORY_TABLE (product_name, product_price, product_quantity) values ('Salmon - Whole, 4 - 6 Pounds', 5, 62);
insert into INVENTORY_TABLE (product_name, product_price, product_quantity) values ('Lettuce - Radicchio', 71, 15);
insert into INVENTORY_TABLE (product_name, product_price, product_quantity) values ('Wine - Prem Select Charddonany', 66, 50);
insert into INVENTORY_TABLE (product_name, product_price, product_quantity) values ('Table Cloth 81x81 White', 17, 100);
insert into INVENTORY_TABLE (product_name, product_price, product_quantity) values ('Wine - Red, Gamay Noir', 100, 33);
insert into INVENTORY_TABLE (product_name, product_price, product_quantity) values ('Lettuce Romaine Chopped', 22, 9);
insert into INVENTORY_TABLE (product_name, product_price, product_quantity) values ('Appetizer - Southwestern', 29, 13);
insert into INVENTORY_TABLE (product_name, product_price, product_quantity) values ('Cranberries - Fresh', 39, 19);
insert into INVENTORY_TABLE (product_name, product_price, product_quantity) values ('Wine - Red, Antinori Santa', 24, 9);

create table USER_TABLE (
	user_id BIGSERIAL PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	username VARCHAR (50) UNIQUE NOT NULL,
	password VARCHAR (50) NOT NULL,
	email VARCHAR (355) UNIQUE NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

insert into USER_TABLE (username, first_name, last_name, email, password) values ('dlevis0', 'Ddene', 'Levis', 'dlevis0@goo.ne.jp', '8RKc8V0b61M');
insert into USER_TABLE (username, first_name, last_name, email, password) values ('ddifrancesco1', 'Dagmar', 'Di Francesco', 'ddifrancesco1@comcast.net', 'vuyeiFmfaE');
insert into USER_TABLE (username, first_name, last_name, email, password) values ('pcicullo2', 'Phaidra', 'Cicullo', 'pcicullo2@naver.com', 'RM0qSZ');
insert into USER_TABLE (username, first_name, last_name, email, password) values ('cswadon3', 'Cullie', 'Swadon', 'cswadon3@dell.com', 'otwRbajW4dcO');
insert into USER_TABLE (username, first_name, last_name, email, password) values ('ogoly4', 'Opaline', 'Goly', 'ogoly4@wufoo.com', 'mCywA1');
insert into USER_TABLE (username, first_name, last_name, email, password) values ('agillease5', 'Aggy', 'Gillease', 'agillease5@gravatar.com', '12XRqQ');
insert into USER_TABLE (username, first_name, last_name, email, password) values ('jlavington6', 'Jody', 'Lavington', 'jlavington6@ucla.edu', 'jlSF94');
insert into USER_TABLE (username, first_name, last_name, email, password) values ('mserver7', 'Myrna', 'Server', 'mserver7@google.it', 'yBdnplwgXNPv');
insert into USER_TABLE (username, first_name, last_name, email, password) values ('tmacelane8', 'Travis', 'MacElane', 'tmacelane8@patch.com', 'BMclXbeD8');
insert into USER_TABLE (username, first_name, last_name, email, password) values ('mausten9', 'Milo', 'Austen', 'mausten9@ibm.com', 'C2iDKeXclsP');
insert into USER_TABLE (username, first_name, last_name, email, password) values ('sgoresa', 'Stillman', 'Gores', 'sgoresa@nasa.gov', 'nsyn2Jz0CKR2');
insert into USER_TABLE (username, first_name, last_name, email, password) values ('bdampb', 'Brnaba', 'Damp', 'bdampb@squidoo.com', 'KWb98bURh3Qw');
insert into USER_TABLE (username, first_name, last_name, email, password) values ('cjoirisc', 'Conny', 'Joiris', 'cjoirisc@samsung.com', 'ZtQSSN');
insert into USER_TABLE (username, first_name, last_name, email, password) values ('jaarond', 'Judd', 'Aaron', 'jaarond@state.tx.us', 'WnHI0KosqJ');
insert into USER_TABLE (username, first_name, last_name, email, password) values ('cseabrockee', 'Caye', 'Seabrocke', 'cseabrockee@reverbnation.com', 'jUEaNrk');
insert into USER_TABLE (username, first_name, last_name, email, password) values ('lkavef', 'Lindsay', 'Kave', 'lkavef@cafepress.com', 'iPe97RMIajC');


create table ORDER_TABLE (
	order_id BIGSERIAL PRIMARY KEY,
	user_id INT NOT NULL,
	order_detail json NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	FOREIGN KEY (user_id) REFERENCES USER_TABLE (user_id)
);
insert into ORDER_TABLE (user_id, order_detail) values (2, '[{
    "product_id": 10, "product_quantity": 7
},{
    "product_id": 9, "product_quantity": 6
},{
    "product_id": 4, "product_quantity": 10
}]');
insert into ORDER_TABLE (user_id, order_detail) values (7, '[{
    "product_id": 5, "product_quantity": 10
}]');
insert into ORDER_TABLE (user_id, order_detail) values (2, '[{
    "product_id": 10, "product_quantity": 9
},{
    "product_id": 5, "product_quantity": 3
},{
    "product_id": 5, "product_quantity": 8
},{
    "product_id": 7, "product_quantity": 6
},{
    "product_id": 3, "product_quantity": 5
}]');
insert into ORDER_TABLE (user_id, order_detail) values (9, '[{
    "product_id": 1, "product_quantity": 7
},{
    "product_id": 6, "product_quantity": 10
}]');
insert into ORDER_TABLE (user_id, order_detail) values (9, '[{
    "product_id": 9, "product_quantity": 10
}]');
insert into ORDER_TABLE (user_id, order_detail) values (9, '[{
    "product_id": 4, "product_quantity": 6
},{
    "product_id": 6, "product_quantity": 5
}]');
insert into ORDER_TABLE (user_id, order_detail) values (2, '[{
    "product_id": 2, "product_quantity": 5
},{
    "product_id": 8, "product_quantity": 5
},{
    "product_id": 10, "product_quantity": 7
}]');
insert into ORDER_TABLE (user_id, order_detail) values (8, '[{
    "product_id": 9, "product_quantity": 10
}]');
insert into ORDER_TABLE (user_id, order_detail) values (2, '[{
    "product_id": 7, "product_quantity": 5
},{
    "product_id": 8, "product_quantity": 5
},{
    "product_id": 10, "product_quantity": 6
},{
    "product_id": 6, "product_quantity": 8
}]');
insert into ORDER_TABLE (user_id, order_detail) values (8, '[{
    "product_id": 4, "product_quantity": 8
}]');