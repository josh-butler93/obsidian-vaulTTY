resource "local_file" "xbox" {
  filename = "~/terraform/xbox.txt"
  content = "Adding one more file to the contents"
}