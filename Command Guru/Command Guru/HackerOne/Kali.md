# Kali
### Nmap Breakdown

_nmap -sT -p 8000 localhost_

*   \-sT is an option that specifies a TCP connect scan. This tells Nmap to use the TCP connect method to check the status of the ports
*   \-p 8000 indicates that we want Nmap to scan only port 8000. You can change this number to scan other ports if needed
*   localhost is the target of our scan
*   It refers to the local machine where the service is running

_nmap -sV -p 8000 localhost_

*   \-sV option is used to tell Nmap to probe open ports to determine service/version information
*   This means Nmap will try to figure out what specific software and version is running on the open port

_nmap localhost_

*   This command, without any port specification, will scan the top 1000 most common ports

_nmap -p- localhost_

*   The -p- option tells Nmap to scan all ports from 1 to 65535
*   This scan will take longer to complete because it has to check every single port

_nmap -p 1-1000 localhost_

*   This command scans ports 1 through 1000

_nmap -oN normal\_output.txt localhost_

*   the -oN option is used to instruct Nmap to save the output in normal format

_nmap -oX xml\_output.xml localhost_

*   The -oX option tells Nmap to save the output in XML format. The xml\_output.xml is the file where the XML - formatted results will be saved

_nmap -oG grepable\_output.txt localhost_

*   The -oG option is used to save the output in grepable format, and the grepable\_output.txt is the file where the results will be stored

### NMAP Testing v1

_mkdir -p /home/labex/project/http-server_

_cd /home/labex/project/http-server_

*   _**echo "\<html\>\<body\>\<h1\>Welcome to the Nmap Lab\</h1\>\</body\>\</html\>" > index.html**_
*   This command uses the echo command to print the HTML code to the terminal and then redirects that output to a file named index.html

_python3 -m http.server 8000_

*   This command uses the python3 interpreter to run the http.server module as a script
*   The -m option tells Python to run the module as a script
*   We specify port 8000, which means our server will listen for incoming requests on this port
    *   _**curl**_ [_**http://localhost:8000**_](http://localhost:8000/)