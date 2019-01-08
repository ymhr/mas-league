workflow "Deploy to Firebase" {
  on = "push"
  resolves = ["Deploy"]
}

action "Install" {
  uses = "borales/actions-yarn@master"
  args = "install"
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
