#!/bin/bash
# Set a default port if NGINX_PORT is not set
export NGINX_PORT=${NGINX_PORT:-9100}
# Replace the port in the nginx configuration
sed -i "s/listen[[:space:]]*80;/listen $NGINX_PORT;/g" /etc/nginx/conf.d/default.conf
echo "Starting Nginx on port $NGINX_PORT"
nginx -g 'daemon off;'

# This script sets a default port
# modifies the Nginx configuration at container startup
# prints a message showing which port Nginx will run on
# and then starts Nginx