FROM nginx
COPY index.html /usr/share/nginx/html/
COPY start.sh /start.sh
RUN chmod +x /start.sh
ENTRYPOINT ["/start.sh"]

# docker build -t my-nginx-entrypoint .
# docker run -d -p 9100:9100 -e NGINX_PORT=9100 --name entrypoint-container my-nginx-entrypoint
# docker logs entrypoint-container
# --You should see the message "Starting Nginx on port 9100" in the output

# This Dockerfile removes the environment variable and sed command
# Instead, we'll handle the configuration at runtime using an ENTRYPOINT script
# This makes our image more flexible