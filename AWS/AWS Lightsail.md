- Command:
  - When you create an instance on the page for the instance it includes a download default ssh key that is donwloaded to your machine
  - LightsailDefualtKey-us-east-1.pem
     - Change the permissions of the key with the below command
      - *chmod 400 your-key.pem
  to connect to the instance run the below command
    - *ssh -i /path/to/your-key.pem username@public-ip
    - yes to fingerprint 
  - For easy access daily add the below script to said location 
    - Location:
      - ~/.ssh/config #if the file is not there create one 
        - Script 

Host lightsail-lab <-name can be changed as needed 
    HostName YOUR_PUBLIC_IP
    User ec2-user
    IdentityFile ~/path/to/key.pem

- Command:
  - ssh lightsail-lab

- Command: 
  - sudo dnf update -y 
  - sudo dnf upgrade -y 
  - sudo dnf install -y util-linux-user -y 
  - sudo dnf install -y nginx 
  - sudo systemctl enable nginx 
  - sudo systemctl start nginx 
  - sudo firewall-cmd --permanent --add-service=http 
  - sudo firewall-cmd --permanent --add-service=https 
  - sudo firewall-cmd --reload
  - cd /usr/share/nginx/html 
  - sudo vim index.html 
<h1>My Cloud Lab</h1>
<p>Running on AWS Lightsail with Nginx</p>
  
  - sudo systemctl restart nginx 
- http://instance_ip 

- Lightsail Container
  - dnf install -y podman
  - podman --version 
    - mkdir portal <- on instance machine 
    - podman run -it --userns=keep-id -v ~/portal:/workspace devbox:latest 
    - podman run -it -v /home/ec2-user/portal:/container_portal ubuntu:latest 
      - We are using a container with BIND mounts

- Command: 
  - SCP 
    - scp /path/to/local/file ec2-user@Lightsail-public-IP:/path/to/remote/destination
    - scp -i ~/lightsail-key.pem /path/to/file.pem ec2-user@55.2.10.1:/home/ec2-user/portal
    - example:
      - scp -i LightsailDefualtKey-us-east-1 ~/Desktop/code.html ec2-user@10.0.0.1:/home/ec2-user/webpages

- Nginx Webpage Setup 
  - Command:
    - On the webpage go to the networking tab and make sure port 80 and 22 are open 
      - *mv ~/podman_webpage.html /var/www/html/index.html 
        - *sudo nginx -T | grep root #location of html file varies by distros
        - *ls /usr/share/nginx/html 
          - * mv ~/podoman_webpage.html /usr/share/nginx/html/.index.html
      - *sudo systemctl enable nginx
      - *sudo systemctl start nginx 
      - *curl localhost # you should see teh html content 
       - go to http://YOUR_PUBLIC_IP
    - *podman run -d -p 80:80 -v /var/www/html:/usr/share/nginx/html:Z nginx
     - Above command is for running an nginx container inside of lighsail 

- Command: Centos/Alma Config 
  - Nginx index.html location change 
    - *sudo mkdir -p /var/www/webpages 
    - *sudo mv ~/podman_webpage.html /var/www/webpages/index.html
    - *sudo chown -R nginx:nginx /var/www/webpages
    - #optional in case above step fails --sudo chown -R www-data:www-date /var/www/webpages 
    - *sudo restorcon -Rv /var/www/webpages
    - *sudo chcon -R -t httpd_sys_content_t /var/www/webpages 
    - *sudoedit /etc/nginx/nginx.conf 
    - *sudoedit /etc/nginx/conf.d/default.conf #only run if the above location doesnt exist 
    - *sudo systemctl reload nginx
    - *curl localhost #should see the html content from the code
