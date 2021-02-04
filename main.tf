terraform {
  backend "gcs" {
    bucket  = "webdevshop-terraform-state"
    prefix  = "webdevshop-lerna"
  }
  required_providers {
    github = {
      source  = "integrations/github"
      version = "~> 4.3.2"
    }
    google-beta = {
      version = "~> 3.45.0"
      source  = "hashicorp/google-beta"
    }
  }
}

/*
  PROVIDERS
*/

provider "github" {
  token = var.GH
  owner = "webdevshop"
}

provider "google-beta" {
  credentials = var.SERVICE_ACCOUNT
  project = var.PROJECT
}

/*
  RESOURCES
*/

resource "github_repository" "repo" {
  name        = "webdevshop-lerna"
  visibility  = "public"
}
