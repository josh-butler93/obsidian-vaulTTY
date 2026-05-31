variable "name" {
    type = string
    default = "Mark"
}
variable "number" {
    type = bool
    default = true
}
variable "distance" {
    type = number
    default = 5
}
variable "jedi" {
    type = map 
    default = {
        filename = "~/terraform/varibles-testing"
        content = "testing123"
    }
} 
variable "gender" {
  type = list(string)
  default = [ "Male", "Female" ]
}
variable "hard_drive" {
  type = map
  default = {
    slow = "HDD"
    fast = "SSD"
  }
}
variable "users" {
  type = set(string)
  default = [ "tom", "jerry", "pluto"]
}