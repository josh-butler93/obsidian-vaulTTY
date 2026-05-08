terraform {
  required_providers {
    proxmox = {
      source  = "telmate/proxmox"
      version = ">= 3.0.0"
    }
  }
}

provider "proxmox" {
  pm_api_url          = var.proxmox_api_url
  pm_user            = var.proxmox_user
  pm_password        = var.proxmox_password
  pm_parallel        = var.proxmox_parallel
  pm_skip_tls_verify = var.proxmox_skip_tls_verify
}

variable "proxmox_api_url" {
  description = "Proxmox API URL"
  type        = string
}

variable "proxmox_user" {
  description = "Proxmox user"
  type        = string
}

variable "proxmox_password" {
  description = "Proxmox password"
  type        = string
}

variable "proxmox_parallel" {
  description = "Parallel operations"
  type        = number
  default    = 4
}

variable "proxmox_skip_tls_verify" {
  description = "Skip TLS verification"
  type        = bool
  default    = true
}

variable "kvm_defaults" {
  description = "KVM defaults"
  type = object({
    node            = string
    template_vm_id = number
    storage        = string
    pool           = string
    network_bridge = string
  })
  default = {
    node            = "pve"
    template_vm_id = 9000
    storage        = "local"
    pool           = "vms"
    network_bridge = "vmbr0"
  }
}

variable "kvm_vms" {
  description = "KVM VMs to provision"
  type = list(object({
    vmid      = number
    name      = string
    on_boot   = bool
    cores     = number
    memory    = number
    disk_size = number
  }))
  default = []
}

variable "lxc_defaults" {
  description = "LXC defaults"
  type = object({
    node            = string
    template_ct_id = number
    storage        = string
    pool           = string
    network_bridge = string
  })
  default = {
    node            = "pve"
    template_ct_id = 9000
    storage        = "local"
    pool           = "vms"
    network_bridge = "vmbr0"
  }
}

variable "lxc_containers" {
  description = "LXC containers to provision"
  type = list(object({
    vmid      = number
    name      = string
    hostname = string
    on_boot   = bool
    cores     = number
    memory    = number
    rootfs    = number
    swap      = number
    ostype    = string
  }))
  default = []
}

resource "proxmox_vm_qemu" "kvm" {
  count = length(var.kvm_vms)

  name         = var.kvm_vms[count.index].name
  vmid        = var.kvm_vms[count.index].vmid
  target_node = var.kvm_defaults.node
  clone       = var.kvm_defaults.template_vm_id
  full_clone  = false

  cores    = var.kvm_vms[count.index].cores
  memory   = var.kvm_vms[count.index].memory
  onboot   = var.kvm_vms[count.index].on_boot
  bootdisk = "scsi0"
  scsihw   = "virtio-scsi-single"

  disk {
    size    = var.kvm_vms[count.index].disk_size
    storage = var.kvm_defaults.storage
    type   = "scsi"
  }

  network {
    model  = "virtio"
    bridge = var.kvm_defaults.network_bridge
  }
}

resource "proxmox_lxc" "container" {
  count = length(var.lxc_containers)

  name        = var.lxc_containers[count.index].name
  vmid        = var.lxc_containers[count.index].vmid
  hostname   = var.lxc_containers[count.index].hostname
  target_node = var.lxc_defaults.node
  clone      = var.lxc_defaults.template_ct_id
  full_clone = false

  cores  = var.lxc_containers[count.index].cores
  memory = var.lxc_containers[count.index].memory
  swap   = var.lxc_containers[count.index].swap
  onboot = var.lxc_containers[count.index].on_boot

  rootfs {
    size   = var.lxc_containers[count.index].rootfs
    storage = var.lxc_defaults.storage
  }

  ostype = var.lxc_containers[count.index].ostype

  network {
    name   = "eth0"
    bridge = var.lxc_defaults.network_bridge
  }
}

output "kvm_vm_ids" {
  description = "KVM VM IDs"
  value = { for vm in proxmox_vm_qemu.kvm : vm.name => vm.vmid }
}

output "lxc_container_ids" {
  description = "LXC Container IDs"
  value = { for ct in proxmox_lxc.container : ct.name => ct.vmid }
}