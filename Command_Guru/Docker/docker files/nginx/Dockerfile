FROM nginx
COPY index.html /usr/share/nginx/html/


# docker build -t my-nginx .
# docker build: This is the command to build a Docker image
# -t my-nginx: The -t flag tags our image with the name my-nginx
# .: This specifies the build context (the directory containing the Dockerfile) as the current directory.
# docker run -d -p 8080:80 --name my-nginx-container my-nginx
# curl http://localhost:8080

#-----------------------------#
# This Dockerfile defines a new image based on the official Nginx image and copies a file called index.html to the default document root directory of Nginx
# FROM nginx: This line specifies the base image we're building from
# In this case, we're using the official Nginx image
# COPY index.html /usr/share/nginx/html/: This line copies our index.html file into the container's web root directory
# Create a new file called index.html in the same directory
#<!doctype html>
#<html lang="en">
#  <head>
#    <meta charset="UTF-8" />
#    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
#    <title>Hello Docker!</title>
#  </head>
#  <body>
#    <h1>Hello Docker!</h1>
#    <p>This is a custom Docker image.</p>
#  </body>
#</html>