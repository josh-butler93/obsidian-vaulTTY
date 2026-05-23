variable "lxc_defaults" {
  description = "Default values for LXC containers"
  type = object({
    node            = string
    template_ct_id = number
    storage        = string
    pool          = string
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
  description = "List of LXC containers to create"
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
    osimage   = optional(string)
    netif     = optional(list(object({ name = string, bridge = string, hwaddr = string, tag = number })))
    ipconfig  = optional(list(object({ ip = string, gw = string })))
  }))
  default = []
}

resource "proxmox_lxc" "container" {
  count = length(var.lxc_containers)

  name      = var.lxc_containers[count.index].name
  vmid     = var.lxc_containers[count.index].vmid
  hostname = var.lxc_containers[count.index].hostname
  target_node = var.lxc_defaults.node

  clone     = var.lxc_defaults.template_ct_id
  full_clone = false

  cores  = var.lxc_containers[count.index].cores
  memory = var.lxc_containers[count.index].memory
  swap   = var.lxc_containers[count.index].swap
  onboot = var.lxc_containers[count.index].on_boot

  rootfs {
    size  = var.lxc_containers[count.index].rootfs
    storage = var.lxc_defaults.storage
  }

  ostype = var.lxc_containers[count.index].ostype

  network {
    name = "eth0"
    bridge = var.lxc_defaults.network_bridge
  }

  lifecycle {
    create_before_destroy = true
  }
}

output "lxc_container_ids" {
  description = "Map of container names to their IDs"
  value = { for ct in proxmox_lxc.container : ct.name => ct.vmid }
}