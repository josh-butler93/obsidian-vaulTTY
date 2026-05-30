resource "local_file" "things-to-test" {
  filename = "~/terraform/things-to-test.txt"
  content = "Testing this for work purposes\nComplete this lab this weekend"
}

resource "local_file" "more-things-v2" {
  filename = "~/terraform/more-things-v2"
  content = "Learning how to use terraform contd"
}