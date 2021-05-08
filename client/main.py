#! /usr/bin/env python3

import RPi.GPIO as GPIO
import time
import requests

URL = 'http://localhost:3000'

def request_gpios():
  body = requests.get(URL).json()
  print('body: ' + str(body))
  return body['gpios']

def setup_gpios(gpios):
  for gpio in gpios:
    pin = gpio['pin']
    GPIO.setup(pin, GPIO.OUT)

def set_gpios(gpios):
  for gpio in gpios:
    pin = gpio['pin']
    value = gpio['value']
    GPIO.output(pin, value)

GPIO.setmode(GPIO.BCM)

try:
  gpios = request_gpios()
  setup_gpios(gpios)

  while True:
    gpios = request_gpios()
    set_gpios(gpios)
    time.sleep(1)

except KeyboardInterrupt:
  GPIO.cleanup()
