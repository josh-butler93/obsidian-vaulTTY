- Until you point a machines dns to this server pihole wont affect other devices on the network 
  - You can point a machines ip to this 
  - Advanced pointing the router to this server for its dns

- Command:
  - *mkdir -p ~/pihole/etc-pihole
  - *mkdir - ~/pihole/etc-dnsmasq.d 
  
you must ensure:

👉 NOTHING else on your machine is using port 53

Check with:

- Command:
  - ss -tulnp | grep :53

sudo podman run -d \
  --name pihole \
  -p 53:53/tcp \ #ommit if you just want the ui 
  -p 53:53/udp \ #ommit if you just want the ui 
  -p 80:80 \
  -e TZ="America/New_York" \
  -e WEBPASSWORD="yourpassword" \
  -v ~/pihole/etc-pihole:/etc/pihole:Z \
  -v ~/pihole/etc-dnsmasq.d:/etc/dnsmasq.d:Z \
  docker.io/pihole/pihole:latest

- Command: build with bind *Recommended* for vm setup 
sudo podman run -d \
  --name pihole-lab \
  -p YOUR_LAN_IP:53:53/tcp \
  -p YOUR_LAN_IP:53:53/udp \
  -p 8080:80 \
  -e TZ="America/New_York" \
  -e WEBPASSWORD="admin123" \
  -v ~/pihole/etc-pihole:/etc/pihole:Z \
  -v ~/pihole/etc-dnsmasq.d:/etc/dnsmasq.d:Z \
  docker.io/pihole/pihole:latest

Accessing it

After starting:

Web UI:
http://YOUR_MACHINE_IP/admin
*podman exec -it pihole-lab pihole setpassword
nslookup google.com YOUR_PIHOLE_IP

podman ps
podman logs pihole-lab
podman stop pihole-lab
podman start pihole-lab
podman rm -f pihole-lab

sudo nano /etc/resolv.conf
add to vm-- nameserver YOUR_PIHOLE_IP
OR (better if using systemd-resolved)
resolvectl dns eth0 YOUR_PIHOLE_IP
Step 5 — verify it’s working

Inside VM:

nslookup google.com

Then check Pi-hole dashboard:

http://YOUR_PIHOLE_IP:8080/admin

Common issues (you WILL hit one of these)
1. Port 53 already in use
systemd-resolved (common on Linux)

Fix:

sudo systemctl disable systemd-resolved
sudo systemctl stop systemd-resolved
2. Firewall blocking DNS

Allow:

sudo ufw allow 53
sudo ufw allow 80

Step 1 — Access the Pi-hole dashboard

Open a browser and go to:

http://YOUR_PIHOLE_IP/admin

What you’ll see

The dashboard shows:

Queries (DNS requests)
Blocked vs allowed
Top domains
Devices on your network

t’s already blocking (out of the box)

Pi-hole ships with default blocklists (like StevenBlack list).

So immediately after install:

It is already blocking a lot of ads

You don’t need to configure anything yet.

🌐 Step 3 — Make your network USE Pi-hole (this is the real switch)

This is the most important step.

Option A (best)

Go into your router settings and set:

DNS Server = YOUR_PIHOLE_IP

Pi-hole Server Setup 
sudo nano /etc/network/interfaces
or 
sudo nano /etc/systemd/network/20-wired.network
Example static config:
Address: 192.168.1.50
Gateway: 192.168.1.1
DNS: 1.1.1.1
Restart networking:
sudo systemctl restart networking

nstall Pi-hole (clean method)

Run:
curl -sSL https://install.pi-hole.net | bash




curl -sSL https://install.pi-hole.net | bash
