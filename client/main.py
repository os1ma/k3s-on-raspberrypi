#! /usr/bin/env python3

import RPi.GPIO as GPIO
import time
import datetime
import requests

URL = 'http://localhost:30000'

def request_gpios():
  response = requests.get(URL, timeout=(1, 1))
  body = response.json()
  now = datetime.datetime.now()
  print(str(now) + ' | body: ' + str(body))
  return body['gpios']

def setup_gpios(gpios):
  for gpio in gpios:
    pin = gpio['pin']
    GPIO.setup(pin, GPIO.OUT)

def output_gpios(gpios):
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
    output_gpios(gpios)
    time.sleep(0.5)

except KeyboardInterrupt:
  GPIO.cleanup()
