use misa;

INSERT INTO products (id, name, description, price, created_at, updated_at) VALUES
('1', 'Smartphone Galaxy S21', 'Smartphone de última geração com câmera de alta resolução, tela AMOLED e desempenho poderoso.', 4999.99, NOW(), NOW()),
('2', 'Notebook Dell XPS 13', 'Notebook ultrafino com processador Intel Core i7, 16GB de RAM e tela InfinityEdge 4K.', 8499.99, NOW(), NOW()),
('3', 'Cafeteira Nespresso Vertuo', 'Cafeteira automática que prepara cafés espresso e longos com um toque.', 799.99, NOW(), NOW()),
('4', 'Smart TV LG OLED 55"', 'Televisor 4K OLED com cores vibrantes, suporte a HDR e sistema operacional webOS.', 6499.99, NOW(), NOW()),
('5', 'Fone de Ouvido Bose QuietComfort 45', 'Fone de ouvido com cancelamento ativo de ruído, som premium e bateria de longa duração.', 1999.99, NOW(), NOW()),
('6', 'Relógio Smartwatch Apple Watch Series 8', 'Relógio inteligente com sensores de saúde avançados e integração total com dispositivos Apple.', 3999.99, NOW(), NOW()),
('7', 'Câmera Sony Alpha a6400', 'Câmera mirrorless com lente intercambiável, ideal para fotografia e vídeos em alta qualidade.', 5999.99, NOW(), NOW()),
('8', 'Aspirador Robô iRobot Roomba i7+', 'Aspirador robô com sistema de limpeza inteligente e esvaziamento automático.', 3999.99, NOW(), NOW()),
('9', 'Console PlayStation 5', 'Console de videogame de última geração com gráficos 4K e suporte a jogos exclusivos.', 4499.99, NOW(), NOW()),
('10', 'Geladeira Brastemp Inverse 573L', 'Geladeira frost free com design moderno, compartimento inverse e alta capacidade de armazenamento.', 7299.99, NOW(), NOW());

select * from products;