workflow "Deploy to Firebase" {
  on = "push"
  resolves = ["Deploy"]
}

action "Is master" {
  uses = "actions/bin/filter@b2bea0749eed6beb495a8fa194c071847af60ea1"
  args = "branch master"
}

action "Install" {
  uses = "borales/actions-yarn@master"
  args = "install"
  needs = ["Is master"]
}

action "Build" {
  uses = "borales/actions-yarn@master"
  args = "build"
  needs = ["Install"]
  env = {
    NODE_PATH = "src"
  }
}

action "Deploy" {
  uses = "w9jds/firebase-action@master"
  args = "deploy --project mas-league --only hosting"
  secrets = ["FIREBASE_TOKEN"]
  env = {
    PROJECT_ID = "mas-league"
  }
  needs = ["Install", "Build"]
}

action "Telegram Deployment" {
  uses = "appleboy/telegram-action@master"
  secrets = [
    "TELEGRAM_TOKEN",
    "TELEGRAM_TO",
  ]
  args = "A new version has been deployed",
  needs = ["Deploy"]
}
