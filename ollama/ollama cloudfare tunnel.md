sudo dnf install cloudflared

cloudflared tunnel login

cloudflared tunnel create homelab-ai

sudo nano /etc/cloudflared/config.yml

tunnel: homelab-ai
credentials-file: /root/.cloudflared/<tunnel-id>.json

ingress:
  - hostname: ai.yourdomain.com
    service: http://localhost:8080
  - service: http_status:404

  cloudflared tunnel run homelab-ai
