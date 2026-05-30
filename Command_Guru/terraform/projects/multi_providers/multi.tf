resource "local_file" "test_name" {
  filename = "~/Terraform/test_name.txt"
  content = "TEsting the multi provider setup"
}

resource "random_pet" "my-test" {
  prefix = "Mr"
  separator = "."
  length = "1"
}