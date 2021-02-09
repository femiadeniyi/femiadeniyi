terraform {
  backend "gcs" {
    bucket  = "terraform-state-877"
    prefix  = "state-tf"
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
  PROVIDERS.
*/

provider "github" {
  token = var.GH
  owner = "femiadeniyi"
}

provider "google-beta" {
  credentials = var.SERVICE_ACCOUNT
  project = var.PROJECT
}

/*
  RESOURCES
*/

resource "github_repository" "repo" {
  name        = "femiadeniyi"
  visibility  = "public"
}
