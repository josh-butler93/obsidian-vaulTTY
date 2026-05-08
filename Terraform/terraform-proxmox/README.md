# Proxmox Terraform Boilerplate

Terraform configurations for provisioning KVM VMs and LXC containers from templates in Proxmox VE.

## Prerequisites

- Terraform >= 1.0
- Proxmox VE 7.x or 8.x
- [telmate/proxmox](https://github.com/Telmate/terraform-provider-proxmox) provider

## Installation

```bash
cd terraform-proxmox
terraform init
```

## Configuration

1. Copy the example tfvars file:
```bash
cp terraform.tfvars.example terraform.tfvars
cp kvm/kvm.tfvars.example kvm/kvm.tfvars
cp lxc/lxc.tfvars.example lxc/lxc.tfvars
```

2. Edit `terraform.tfvars` with your Proxmox credentials:
```hcl
proxmox_api_url   = "https://your-proxmox-host:8006/api2/json"
proxmox_user     = "root@pam"
proxmox_password = "your-password"
```

3. Update the template IDs in your tfvars to match your existing templates.

## Usage

### KVM VMs Only
```bash
cd terraform-proxmox
terraform plan -var-file=kvm/kvm.tfvars
terraform apply -var-file=kvm/kvm.tfvars
```

### LXC Containers Only
```bash
cd terraform-proxmox
terraform plan -var-file=lxc/lxc.tfvars
terraform apply -var-file=lxc/lxc.tfvars
```

### Both KVM and LXC
```bash
cd terraform-proxmox
terraform plan -var-file=kvm/kvm.tfvars -var-file=lxc/lxc.tfvars
terraform apply -var-file=kvm/kvm.tfvars -var-file=lxc/lxc.tfvars
```

## Cloud-Init Configuration

Cloud-init can be configured via the `cloudinit` attribute on the KVM VM resource. 

To enable cloud-init for network configuration, add to the VM resource:

```hcl
cloudinit = "cloudinit"

ipconfig {
  ip = "192.168.1.x/24"
  gw = "192.168.1.1"
}
```

For SSH keys and user configuration, add:

```hcl
sshkeys = file("/path/to/authorized_keys")
ciuser  = "username"
cipass  = "password"  # or use randomized password
```

## Notes

- **Linked Clones**: Currently set to `full_clone = false` for linked clones. Linked clones are faster and use less disk space but depend on the source template.
- **VM IDs**: Ensure VM IDs don't conflict with existing VMs. Common ranges: 100-199 for VMs, 200-299 for LXC, 9000+ for templates.
- **Target Node**: Update `kvm_defaults.node` and `lxc_defaults.node` if running a cluster.