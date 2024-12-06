import network
from machine import Pin
import time
import socket
import urequests


ssid = "ssid"
password = "password"
url = "https://myapi.com/status"
mac_address = b"\xa8\xa1\x59\xe8\x45\xa1"

led = Pin("LED", Pin.OUT)


def connect_wifi():
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.connect(ssid, password)

    # Wait for connect or fail
    max_wait = 100

    while max_wait > 0:
        if wlan.status() < 0 or wlan.status() >= 3:
            break
        max_wait -= 1

        print("waiting for connection...")
        led.toggle()
        time.sleep(1)

    # Handle connection error
    if wlan.status() != 3:
        raise RuntimeError("network connection failed")
    else:
        print("connected")

        status = wlan.ifconfig()
        print("ip = " + status[0])


def wakePC():
    # MAC address of the target device
    # Create a magic packet
    magic_packet = b"\xff" * 6 + mac_address * 16

    led.off()

    # Send the magic packet
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.setsockopt(socket.SOL_SOCKET, 0x20, 1)
    sock.sendto(magic_packet, ("255.255.255.255", 9))
    sock.close()

    led.on()

    print("magic packet sent")


def check_api_status():
    try:
        response = urequests.get(url)
        response_text = response.text.strip()
        response.close()

        return response_text.lower() == "true"
    except Exception as e:
        return False


if __name__ == "__main__":
    led.off()

    connect_wifi()

    while True:
        try:
            if check_api_status():
                wakePC()

            time.sleep(2)
        except:
            pass
