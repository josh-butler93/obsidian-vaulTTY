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