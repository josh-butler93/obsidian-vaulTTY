services:
  socket-proxy:
    image: lscr.io/linuxserver/socket-proxy:latest
    container_name: tugtainer-socket-proxy
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
    read_only: true
    networks:
      - tugtainer
    restart: unless-stopped

  app:
    image: ghcr.io/quenary/tugtainer:1
    container_name: tugtainer
    volumes:
      - tugtainer_data:/tugtainer
    environment:
      DOCKER_HOST: tcp://socket-proxy:2375
    ports:
      - "9412:80"
    networks:
      - tugtainer
    restart: unless-stopped

networks:
  tugtainer:

volumes:
  tugtainer_data:
