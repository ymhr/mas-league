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
  uses = "webscopeio/firebase-deploy-github-action@master"
  args = "--only hosting"
  secrets = ["FIREBASE_AUTH_TOKEN"]
  needs = ["Install", "Build"]
}
