# Update the system
sudo dnf update -y

# Install Nginx
sudo dnf install nginx -y

# Enable and start Nginx
sudo systemctl enable nginx
sudo systemctl start nginx

# Check status
sudo systemctl status nginx

sudo firewall-cmd --add-service=http --permanent
sudo firewall-cmd --add-service=https --permanent
sudo firewall-cmd --reload

sudo ufw status 
sudo ufw allow 'Nginx Full'
http://<nginx_serverip>

Default web root for the start up pages location
- /var/www/html
- sudo rm /var/www/html/index.nginx-debian.html
- sudo nano /var/www/html/index.html
<!DOCTYPE html>
<html>
<head>
    <title>My Nginx Test</title>
</head>
<body>
    <h1>Welcome to my LXC Nginx server!</h1>
</body>
</html>
sudo systemctl reload nginx
syntax checks
- command: sudo nginx -t