variable "proxmox_api_url" {
  description = "Proxmox API URL (e.g., https://proxmox.host.com:8006/api2/json)"
  type        = string
  sensitive   = true
}

variable "proxmox_user" {
  description = "Proxmox user (e.g., root@pam)"
  type        = string
  sensitive   = true
}

variable "proxmox_password" {
  description = "Proxmox password"
  type        = string
  sensitive   = true
}

variable "proxmox_parallel" {
  description = "Number of parallel operations"
  type        = number
  default     = 4
}

variable "proxmox_skip_tls_verify" {
  description = "Skip TLS certificate verification"
  type        = bool
  default     = true
}