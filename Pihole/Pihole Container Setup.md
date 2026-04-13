you must ensure:

👉 NOTHING else on your machine is using port 53

Check with:

ss -tulnp | grep :53

podman run -d \
  --name pihole \
  -p 53:53/tcp \
  -p 53:53/udp \
  -p 80:80 \
  -e TZ="America/New_York" \
  -e WEBPASSWORD="yourpassword" \
  -v ~/pihole/etc-pihole:/etc/pihole:Z \
  -v ~/pihole/etc-dnsmasq.d:/etc/dnsmasq.d:Z \
  docker.io/pihole/pihole:latest

Accessing it

After starting:

Web UI:
http://YOUR_MACHINE_IP/admin

nslookup google.com YOUR_PIHOLE_IP

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
