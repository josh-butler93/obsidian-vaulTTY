testing 123
- testing
	- test
- test

#### Testing
- **==cd /home/labex/project/daemonset-workloads**
	- *kubectl get node labex-v135 -L practice-tier*
	- **kubectl label node labex-v135 practice-tier=operations**
	- kubectl get nodes --show-labels 

### Dockerfile v_1

```
FROM python:3.6

RUN pip install flask

COPY . /opt/

EXPOSE 8080

WORKDIR /opt

ENTRYPOINT ["python", "app.py"]
```

[Proxmox](https://10.0.0.151:8006)