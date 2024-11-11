async function getUserRepos(username) {
    const url = `https://api.github.com/users/${username}/repos`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const repos = await response.json();

        // Format the repo data
        return repos.map(repo => ({
            name: repo.name,
            url: repo.html_url,
            description: repo.description,
            language: repo.language,
            stars: repo.stargazers_count
        }));
    } catch (error) {
        console.error("Failed to fetch repositories:", error);
        return [];
    }
}

function goToPage(url) {
    window.open(url, '_blank'); // '_blank' opens the URL in a new tab
}

function createProjectDiv(nameTxt, descriptionTxt, imagePath, imageAlt, url) {
    // Create the outermost div with class "project"
    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project');

    projectDiv.onclick = function() {
        goToPage(url); // Call the handleClick function with nameTxt as an argument
    };

    // Create the top section div with id "project-top"
    const projectTopDiv = document.createElement('div');
    projectTopDiv.id = 'project-top';

    // Create the h3 element for the project name
    const projectName = document.createElement('h3');
    projectName.textContent = nameTxt;

    // Create the img element
    const projectImage = document.createElement('img');
    projectImage.src = imagePath;
    projectImage.alt = imageAlt;

    // Append h3 and img to "project-top" div
    projectTopDiv.appendChild(projectName);
    projectTopDiv.appendChild(projectImage);

    // Create the paragraph div with description text
    const projectDescriptionDiv = document.createElement('div');
    const projectDescription = document.createElement('p');
    projectDescription.textContent = descriptionTxt;
    projectDescriptionDiv.appendChild(projectDescription);

    // Append "project-top" and description divs to the main "project" div
    projectDiv.appendChild(projectTopDiv);
    projectDiv.appendChild(projectDescriptionDiv);

    // Append the whole "project" div to the body or a specific container
    // document.body.appendChild(projectDiv);
    document.getElementById("projects-section").appendChild(projectDiv);
}

document.addEventListener("DOMContentLoaded", function() {
    const reposList = getUserRepos("Noe-GT").then(reposList => {
        console.log(reposList)
        console.log(reposList[0].name);
        for (let repo of reposList) {
            createProjectDiv(repo.name.replace(/_/g, ' '), repo.description, "assets/" + repo.language + ".png", repo.language, repo.url);
        }
    });
});
