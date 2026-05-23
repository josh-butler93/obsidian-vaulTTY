variable "kvm_defaults" {
  description = "Default values for KVM VMs"
  type = object({
    node              = string
    template_vm_id   = number
    storage          = string
    pool            = string
    network_bridge   = string
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
  description = "List of KVM VMs to create"
  type = list(object({
    vmid       = number
    name       = string
    on_boot    = bool
    cores      = number
    memory     = number
    disk_size  = number
    ipconfig   = optional(string)
    ssh_keys   = optional(list(string))
    ciuser     = optional(string)
    cipass     = optional(string)
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
    bridge = var.kkm_defaults.network_bridge
  }

  os_type = "cloud-init"

  lifecycle {
    create_before_destroy = true
  }
}

output "kvm_vm_ids" {
  description = "Map of VM names to their IDs"
  value = { for vm in proxmox_vm_qemu.kvm : vm.name => vm.vmid }
}