terraform {
  backend "gcs" {
    bucket = "terraform-state-292"
    prefix = "femiadeniyi"

  }
  required_providers {
    github = {
      source = "integrations/github"
    }
    google-beta = {
      version = "~> 3.61.0"
      source = "hashicorp/google-beta"
    }
    kubernetes = {
      source = "hashicorp/kubernetes"
      version = "~> 2.0.3"
    }
    helm = {
      source = "hashicorp/helm"
      version = "~> 2.0.3"
    }
  }
}

provider "google-beta" {
  credentials = var.SERVICE_ACCOUNT
  project = "femiadeniyi"
}

provider "github" {
  token = var.GH
  owner = "femiadeniyi"
}

provider "kubernetes" {
  config_path = var.KUBE
}

provider "helm" {
  kubernetes {
    config_path = var.KUBE
  }
}

resource "helm_release" "helmer" {
  name = "ingress-controller"
  chart = "ingress-nginx"
  repository = "https://kubernetes.github.io/ingress-nginx"
}

resource "kubernetes_namespace" "example" {
  metadata {
    name = "my-first-namespace"
  }
}

resource "github_actions_secret" "example_secret" {
  repository = "femiadeniyi"
  secret_name = "example_secret_name"
  plaintext_value = "hello"
}

resource "github_actions_secret" "google" {
  repository = "femiadeniyi"
  secret_name = "GOOGLE_APPLICATION_CREDENTIALS"
  plaintext_value = var.SERVICE_ACCOUNT
}

resource "github_actions_secret" "docker-username" {
  repository = "femiadeniyi"
  secret_name = "DOCKER_USERNAME"
  plaintext_value = var.DOCKER_USERNAME
}

resource "github_actions_secret" "docker-password" {
  repository = "femiadeniyi"
  secret_name = "DOCKER_PASSWORD"
  plaintext_value = var.DOCKER_PASSWORD
}


resource "null_resource" "docker-builder" {
  triggers = {
    always_run = timestamp()
  }
  provisioner "local-exec" {
    command = "value=`cat .version` && docker build -t femiruby/femiadeniyi:$value . && docker push femiruby/femiadeniyi:$value"
    interpreter = ["bash", "-c"]

  }
}

resource "kubernetes_service" "femiadeniyi" {
  metadata {
    name = "femiadeniyi"
  }
  spec {
    selector = {
      name = "femiadeniyi"
    }
    port {
      port = 80
    }
  }
}



resource "kubernetes_ingress" "femiadeniyi" {
  metadata {
    name      = "femiadeniyi"
    annotations = {
      "kubernetes.io/ingress.class" : "nginx"
    }
  }
  spec {
    rule {
      host = "femiadeniyi.com"
      http {
        path {
          backend {
            service_name = "femiadeniyi"
            service_port = 80
          }
        }
      }
    }
  }
}

resource "kubernetes_deployment" "femiadeniyi" {
  depends_on = [null_resource.docker-builder]
  metadata {
    name = "femiadeniyi"
    labels = {
      name = "femiadeniyi"
      "app.kubernetes.io/part-of" = "ds00"
    }
  }
  spec {
    replicas = 1
    selector {
      match_labels = {
        name = "femiadeniyi"
      }
    }
    template {
      metadata {
        name = "femiadeniyi"
        labels = {
          name = "femiadeniyi"
        }
      }
      spec {
        container {
          port {
            container_port = 80
          }
          name = "femiadeniyi"
          image = "femiruby/femiadeniyi:44" #IMAGE
          image_pull_policy = "Always"
        }
      }
    }
  }
}
