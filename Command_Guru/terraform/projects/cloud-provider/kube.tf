resource "local_file" "data" {
  filename = "/terraform/k8s.txt"
  content = "kubernetes the hard way!"
}

resource "kubernetes_namespace_v1" "dev" {
  metadata {
    name = "developement"
  }
}