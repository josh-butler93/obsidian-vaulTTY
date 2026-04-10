- Command:
    - tmux
        - Command:
            - tmux source-file ~/.tmux.conf
              - contrl + space + R (shift + r) -> restore session 
              - control + space + S (shift + s) -> save session

- Command:
    - ssh sysadmin@10.0.0.7

- Command: 
    - podman ps
        - list running contianers
    - podman ps -a 
        - list all running contianers

- Command:
    - podman run -d -it --name container_name <image_you want_to_pull>
        -example:
          - podman run -d -it myubntu ubuntu:latest

- Command: 
    - podman exec -it container_name session_type
      - example:
          - podman exec -it myubuntu bash
          - podman exec -it myubuntu sh 

- Command: 
    - podman stop container_name
      - example:
          - podman stop myubuntu
          - podman ps -> see if the container is still running
            - or 
          - podman ps -a 

- Command:
    - podman rm container_name
      - example:
          - podman rm myubuntu
