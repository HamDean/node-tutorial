console.log("Before");

fetchUser(1, (user) => {
  fetchReposities(user.userName,displayRepos);
});

console.log("After");

function displayRepos(repos){
    console.log("Repositories:", repos);
}

function fetchUser(id, callback) {
  setTimeout(() => {
    console.log("Fetching user from the database...");
    callback({ id: id, userName: "hamDeen" });
  }, 2000);
}

function fetchReposities(username, callback) {
  setTimeout(() => {
    console.log('Fetching repos...')
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}
