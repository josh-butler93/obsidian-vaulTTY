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
