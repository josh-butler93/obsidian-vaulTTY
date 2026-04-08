run the below command to locate the boot partition
 - command:
	 - blkid - this command will list out the the partitions
- if boot partition cant be found run the below command to get the system to show which partion is blocking it from booting properly
	- command:
		- exit
			- when you try to exit the terminal will say which partition cant be booted into

once the boot partion is found
- fsck -y <partitition_name> 
	- typically /dev/sda1 - /dev/nvme0n1p2
		- it will take you through the error blocks and you can respond with y 'yes' to have the system help you clean it up