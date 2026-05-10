# Ansible Playbook — Linux Kernel Development Environment

This playbook installs a Linux kernel development environment for both:

* RHEL-based systems
* Debian-based systems

It installs:

* compiler/build tools
* kernel build dependencies
* git
* wget
* optional Linux kernel source clone

---

# Directory Structure

```text
kernel-dev-setup/
├── inventory.ini
├── playbook.yml
└── ansible.cfg
```

---

# inventory.ini

```ini
[kerneldev]
oraclevm ansible_host=192.168.1.100 ansible_user=youruser
ubuntuvm ansible_host=192.168.1.101 ansible_user=youruser
```

---

# ansible.cfg

```ini
[defaults]
inventory = inventory.ini
host_key_checking = False
```

---

# playbook.yml

```yaml
---
- name: Configure Linux kernel development environment
  hosts: kerneldev
  become: true

  vars:
    kernel_source_dir: /opt/linux
    clone_kernel_source: true

  tasks:

    - name: Install RHEL development tools group
      when: ansible_os_family == "RedHat"
      ansible.builtin.dnf:
        name: "@Development Tools"
        state: present

    - name: Install RHEL kernel build dependencies
      when: ansible_os_family == "RedHat"
      ansible.builtin.dnf:
        name:
          - ncurses-devel
          - bison
          - flex
          - openssl-devel
          - elfutils-libelf-devel
          - bc
          - perl
          - git
          - wget
        state: present

    - name: Install Debian build dependencies
      when: ansible_os_family == "Debian"
      ansible.builtin.apt:
        name:
          - build-essential
          - libncurses-dev
          - bison
          - flex
          - libssl-dev
          - libelf-dev
          - bc
          - perl
          - git
          - wget
        state: present
        update_cache: true

    - name: Create kernel source directory
      ansible.builtin.file:
        path: "{{ kernel_source_dir }}"
        state: directory
        mode: '0755'

    - name: Clone Linux kernel source
      when: clone_kernel_source
      ansible.builtin.git:
        repo: https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git
        dest: "{{ kernel_source_dir }}"
        version: master
        update: yes

    - name: Verify gcc installation
      ansible.builtin.command: gcc --version
      register: gcc_output
      changed_when: false

    - name: Show gcc version
      ansible.builtin.debug:
        var: gcc_output.stdout_lines

    - name: Verify make installation
      ansible.builtin.command: make --version
      register: make_output
      changed_when: false

    - name: Show make version
      ansible.builtin.debug:
        var: make_output.stdout_lines
```

---

# Run The Playbook

From the same directory:

```bash
ansible-playbook playbook.yml
```

---

# What This Playbook Does

## RHEL-Based Systems

Installs:

* Development Tools group
* kernel build libraries
* git/wget

Compatible with:

* AlmaLinux
* Rocky Linux
* Oracle Linux
* Fedora
* CentOS
* RHEL

---

## Debian-Based Systems

Installs:

* build-essential
* kernel development libraries
* git/wget

Compatible with:

* Debian
* Ubuntu
* Linux Mint
* Pop!_OS

---

# Optional Modifications

## Disable kernel source clone

Inside `playbook.yml`:

```yaml
clone_kernel_source: false
```

---

## Change kernel source location

```yaml
kernel_source_dir: /home/youruser/linux
```

---

# Future Expansion Ideas

This playbook can later be expanded to:

* install k9s
* install kubectl
* configure Kubernetes nodes
* install Docker/Podman
* install QEMU for kernel testing
* configure git send-email
* install clang/LLVM kernel toolchains
* build automated kernel CI pipelines
* configure kernel debugging tools

