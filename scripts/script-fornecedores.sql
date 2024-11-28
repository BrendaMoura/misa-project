use misa;

INSERT INTO vendors (id, name, email, created_at, updated_at) VALUES
('1', 'Tech Store', 'contact@techstore.com', NOW(), NOW()),
('2', 'Gadget World', 'info@gadgetworld.com', NOW(), NOW()),
('3', 'Home Solutions', 'support@homesolutions.com', NOW(), NOW()),
('4', 'Smart Trends', 'hello@smarttrends.com', NOW(), NOW()),
('5', 'Style Electronics', 'sales@styleelectronics.com', NOW(), NOW()),
('6', 'Pro Gaming', 'team@progaming.com', NOW(), NOW()),
('7', 'Kitchen Plus', 'service@kitchenplus.com', NOW(), NOW()),
('8', 'Auto Gear', 'help@autogear.com', NOW(), NOW()),
('9', 'Eco Living', 'contact@ecoliving.com', NOW(), NOW()),
('10', 'Digital Hub', 'info@digitalhub.com', NOW(), NOW());

select * from vendors;
