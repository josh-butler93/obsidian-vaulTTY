FROM nginx
COPY index.html /usr/share/nginx/html/
COPY start.sh /start.sh
RUN chmod +x /start.sh
ENTRYPOINT ["/start.sh"]

# docker build -t my-nginx-entrypoint .

# This Dockerfile removes the environment variable and sed command
# Instead, we'll handle the configuration at runtime using an ENTRYPOINT script
# This makes our image more flexible