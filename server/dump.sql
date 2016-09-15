--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.4
-- Dumped by pg_dump version 9.5.4

--
-- Data for Name: _user; Type: TABLE DATA; Schema: public; Owner: tapstaider
--

INSERT INTO _user (id, name, email, weight, tall, password, consumption_updated_at, "createdAt", "updatedAt") VALUES (1, 'Philipp', 'philipp@tapstaidtest.com', 59, 172, 'ilovejava', NULL, '2016-09-11 10:13:49.814+02', '2016-09-11 10:16:15.662+02');


--
-- Data for Name: bar; Type: TABLE DATA; Schema: public; Owner: tapstaider
--

INSERT INTO bar (id, name, "createdAt", "updatedAt") VALUES (1, 'BaraXav', '2016-09-11 10:51:02.962+02', '2016-09-11 10:51:02.962+02');


--
-- Data for Name: beer; Type: TABLE DATA; Schema: public; Owner: tapstaider
--

INSERT INTO beer (id, name, degrease, logo, ratio, "createdAt", "updatedAt") VALUES (1, 'Kwak', 8.09999999999999964, NULL, 1, '2016-09-11 10:30:44.232+02', '2016-09-11 10:30:44.232+02');
INSERT INTO beer (id, name, degrease, logo, ratio, "createdAt", "updatedAt") VALUES (2, '1664', 5.5, NULL, 1, '2016-09-11 10:31:06.129+02', '2016-09-11 10:31:06.129+02');
INSERT INTO beer (id, name, degrease, logo, ratio, "createdAt", "updatedAt") VALUES (3, 'Grimbergen blonde', 7.5, NULL, 1, '2016-09-11 10:31:34.19+02', '2016-09-11 10:31:34.19+02');
INSERT INTO beer (id, name, degrease, logo, ratio, "createdAt", "updatedAt") VALUES (4, 'Guiness', 7.5, NULL, 1, '2016-09-11 10:31:58.863+02', '2016-09-11 10:31:58.863+02');
INSERT INTO beer (id, name, degrease, logo, ratio, "createdAt", "updatedAt") VALUES (5, 'Heineken', 5, NULL, 1, '2016-09-11 10:32:16.76+02', '2016-09-11 10:32:16.76+02');
INSERT INTO beer (id, name, degrease, logo, ratio, "createdAt", "updatedAt") VALUES (6, 'Maredsous', 10, NULL, 1, '2016-09-11 10:32:43.434+02', '2016-09-11 10:32:43.434+02');
INSERT INTO beer (id, name, degrease, logo, ratio, "createdAt", "updatedAt") VALUES (7, 'Rince cochon', 8.5, NULL, 1, '2016-09-11 10:33:10.548+02', '2016-09-11 10:33:10.548+02');
INSERT INTO beer (id, name, degrease, logo, ratio, "createdAt", "updatedAt") VALUES (8, 'Hoegaarden', 4.5, NULL, 1, '2016-09-11 10:34:09.359+02', '2016-09-11 10:34:09.359+02');
INSERT INTO beer (id, name, degrease, logo, ratio, "createdAt", "updatedAt") VALUES (9, 'Tripel Karmeliet', 8, NULL, 1, '2016-09-11 10:34:41.654+02', '2016-09-11 10:34:41.654+02');
INSERT INTO beer (id, name, degrease, logo, ratio, "createdAt", "updatedAt") VALUES (10, 'Kasteel triple', 11, NULL, 1, '2016-09-11 10:37:04.71+02', '2016-09-11 10:37:04.71+02');
INSERT INTO beer (id, name, degrease, logo, ratio, "createdAt", "updatedAt") VALUES (11, 'Jupiler', 5.20000000000000018, NULL, 1, '2016-09-11 11:33:53.791+02', '2016-09-11 11:33:53.791+02');


--
-- Data for Name: drink_rfid; Type: TABLE DATA; Schema: public; Owner: tapstaider
--

INSERT INTO drink_rfid (id, rfid, id_beer, capacity, "createdAt", "updatedAt") VALUES (1, '171992796', 11, 50, '2016-09-11 11:51:44.858+02', '2016-09-11 11:51:44.858+02');
INSERT INTO drink_rfid (id, rfid, id_beer, capacity, "createdAt", "updatedAt") VALUES (2, '2225461534', 9, 50, '2016-09-11 11:52:24.207+02', '2016-09-11 11:52:24.207+02');
INSERT INTO drink_rfid (id, rfid, id_beer, capacity, "createdAt", "updatedAt") VALUES (3, '4192163217', 5, 50, '2016-09-11 11:53:54.196+02', '2016-09-11 11:53:54.196+02');


--
-- Data for Name: menu; Type: TABLE DATA; Schema: public; Owner: tapstaider
--

INSERT INTO menu (id, price, id_bar, id_beer, "createdAt", "updatedAt") VALUES (1, 5, 1, 1, '2016-09-11 11:29:31.821+02', '2016-09-11 11:29:31.821+02');
INSERT INTO menu (id, price, id_bar, id_beer, "createdAt", "updatedAt") VALUES (2, 4, 1, 2, '2016-09-11 11:29:57.071+02', '2016-09-11 11:29:57.071+02');
INSERT INTO menu (id, price, id_bar, id_beer, "createdAt", "updatedAt") VALUES (3, 5, 1, 3, '2016-09-11 11:30:28.91+02', '2016-09-11 11:30:28.91+02');
INSERT INTO menu (id, price, id_bar, id_beer, "createdAt", "updatedAt") VALUES (4, 7, 1, 4, '2016-09-11 11:30:39.019+02', '2016-09-11 11:30:39.019+02');
INSERT INTO menu (id, price, id_bar, id_beer, "createdAt", "updatedAt") VALUES (5, 5, 1, 5, '2016-09-11 11:30:54.774+02', '2016-09-11 11:30:54.774+02');
INSERT INTO menu (id, price, id_bar, id_beer, "createdAt", "updatedAt") VALUES (6, 6, 1, 6, '2016-09-11 11:31:10.803+02', '2016-09-11 11:31:10.803+02');
INSERT INTO menu (id, price, id_bar, id_beer, "createdAt", "updatedAt") VALUES (7, 5.5, 1, 7, '2016-09-11 11:31:23.684+02', '2016-09-11 11:31:23.684+02');
INSERT INTO menu (id, price, id_bar, id_beer, "createdAt", "updatedAt") VALUES (8, 5, 1, 8, '2016-09-11 11:31:37.794+02', '2016-09-11 11:31:37.794+02');
INSERT INTO menu (id, price, id_bar, id_beer, "createdAt", "updatedAt") VALUES (9, 6, 1, 9, '2016-09-11 11:31:56.731+02', '2016-09-11 11:31:56.731+02');
INSERT INTO menu (id, price, id_bar, id_beer, "createdAt", "updatedAt") VALUES (10, 6, 1, 10, '2016-09-11 11:32:02.737+02', '2016-09-11 11:32:02.737+02');
INSERT INTO menu (id, price, id_bar, id_beer, "createdAt", "updatedAt") VALUES (11, 4, 1, 11, '2016-09-11 11:34:41.501+02', '2016-09-11 11:34:41.501+02');

--
-- PostgreSQL database dump complete
--
