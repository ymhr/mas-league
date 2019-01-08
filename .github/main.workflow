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
  uses = "ymhr/firebase-action@master"
  args = "deploy --only hosting"
  secrets = ["FIREBASE_TOKEN"]
  env = {
	  PROJECT_ID = "mas-league"
  }
  needs = ["Install", "Build"]
}
