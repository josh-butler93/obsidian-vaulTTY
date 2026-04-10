Open a terminal and run the below command
- hyprctl monitors
	- This will show the monitors that is recognizes
		- eDP-1 = laptop monitor
		- DP-1 = external monitor
Config file location
- nvim ~/.config/hypr/monitor.conf

Setup Formula
- monitor = name, resolution, XxY, scale
	- **X** → left/right
		- -left
		- +right
	- **Y** → up/down
	- You’re building a layout around `0x0`
- example
	- monitor=DP-1,1920x1080@60,-1920x0,1   # far left
	- monitor=HDMI-1,1920x1080@60,0x0,1     # main
	- monitor=DP-2,1920x1080@60,1920x0,1    # right
	- monitor=DP-3,1920x1080@60,3840x0,1    # far right
- example with 'y' included
	- monitor=DP-1,1920x1080@60,0x0,1        # top-left
	- monitor=DP-2,1920x1080@60,1920x0,1     # top-right
	- monitor=HDMI-1,1920x1080@60,0x1080,1   # bottom-left (main)
	- monitor=DP-3,1920x1080@60,1920x1080,1  # bottom-right

Laptop Monitor
- env = gdk_scale,1.25
- monitor=,preferred,auto,1.33

External Monitor Left Setup
- monitor=DP-1,1920x1080@60,-1920x0,1
	- -1920x0 = left location
		- this means windows can move to the left from main menu
			- XxY
			- X=horizontal position
			- Y=vertical position
		- Positive x moves right
		- Negative x moves left
			- -1920x0
				- go **1920 pixels to the LEFT** of `0`
				- stay aligned vertically (`y = 0`)

External Monitor Right Setup
- monitor=DP-1,1920x1080@60,1920x0,1




example contined
monitor=eDP-1,1920x1080@144,0x0,1.5     # main

monitor=DP-1,1920x1080@60,-1920x0,1     # left
monitor=DP-2,1920x1080@60,1920x0,1      # right
monitor=DP-3,1920x1080@60,0x-1080,1     # above