#!/usr/bin/python3

import bluetooth

host = '20:16:05:05:47:87'
port = 1

size = 1024

s = bluetooth.BluetoothSocket(bluetooth.RFCOMM)
s.connect((host, port))
data = client.recv(size)
