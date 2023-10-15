// code here

 


const form = document.getElementById("github-form");
const list = document.getElementById("user-list");
const repository = document.getElementById("repos-list");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(`https://api.github.com/search/users?q=${e.target.search.value}`)
        .then(response => response.json())
        .then(users => users.items.forEach(userInfo));
});

function userInfo(user) {
    const name = document.createElement("li");
    name.textContent = user.login;

    const avatar = document.createElement('img');
    avatar.src = user.avatar_url;

    avatar.addEventListener("click", (e) => {
        e.preventDefault();
        const userLogin = user.login; // Get the login from the user object
        fetch(`https://api.github.com/users/${userLogin}/repos`)
            .then(response => response.json())
            .then(userRepos => {
                repository.innerHTML = "";

                for (const repo of userRepos) {
                    const repoItem = document.createElement("li");
                    repoItem.innerHTML = `
                        <a href="${repo.html_url}">
                            ${repo.name}
                        </a>
                    `;
                    repository.appendChild(repoItem);
                }
            });
    });

    const profileLink = document.createElement("a");
    profileLink.href = user.html_url;
    profileLink.textContent = "Github Profile";

    list.append(name, avatar, profileLink);
}












