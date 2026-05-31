terraform {
  required_providers {
    aws = {
        source = "hashicorp/aws"
        version = "5.91.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
  skip_credentials_validation = true
  skip_requesting_account_id = true
  s3_use_path_style = true
}

endpoints {
    ec2 = "http://aws:222"
    apigateway = "http://aws:333"
    cloudformation = "http://aws:222"
    cloudwatch = "http://aws:222"
    lambda = "http://aws:222"
    iam = "http://aws:222"
    s3 = "http://aws:222"
}