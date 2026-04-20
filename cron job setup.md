mkdir -p ~/scripts

nano ~/scripts/docker-cleanup.sh

#!/bin/bash

LOGFILE="/var/log/docker-cleanup.log"

echo "==== $(date) ====" >> $LOGFILE

/usr/bin/docker system prune -af >> $LOGFILE 2>&1

echo "" >> $LOGFILE

chmod +x ~/scripts/docker-cleanup.sh

#Test 

~/scripts/docker-cleanup.sh

cat /var/log/docker-cleanup.log

#Important note about what this does
docker system prune -af

This removes:

stopped containers
unused images
unused networks

👉 It does NOT touch running containers or named volumes (your data is safe)

### Cron Job 
crontab -e
0 3 * * 0 /home/ec2-user/scripts/docker-cleanupsh

# veiwing job 
crontab -l

```
