export const setResponse = (username, repos, followers, following, bio, hireable) => {
    return `
    <h2><u>Data retrieved from GitHub API.</u></h2>

    <p>${username} has ${repos} public repositories on GitHub.</p>
    <p>${username} has ${followers} followers on GitHub.</p>
    <p>${username} is following ${following} users on GitHub.</p>
    <p>${username}'s bio: ${bio}</p>
    <p>${username} is ${hireable ? "hireable" : "not hireable"}.</p>

    `;
}