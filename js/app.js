const form = document.querySelector("#search-form");
const error = document.querySelector(".error");
const user = document.querySelector(".profile");

let userData = {};

// event handler
form.addEventListener("submit", handleSubmit);

// handle submit
async function handleSubmit(event) {
  event.preventDefault();
  const newForm = new FormData(event.target);
  const username = newForm.get("username");

  const data = await fetchGithubUser(username);

  if (data.message === "Not Found") {
    error.textContent = `User not found!`;
    error.classList.remove("hidden");
    userData = {};
    setTimeout(() => {
      error.classList.add("hidden");
    }, 3000);
  } else {
    userData = { ...data };
  }

  // show data
  if (userData.id) {
    showUserData(userData);
  } else {
    user.classList.add("hidden");
  }
}

// fetch data from github api
const fetchGithubUser = async (username) => {
  const res = await fetch(`https://api.github.com/users/${username}`);
  const data = await res.json();
  return data;
};

// user data show
function showUserData(userData) {
  user.classList.remove("hidden");
  user.innerHTML = `<div
            class="card border border-zinc-200 rounded-md p-5 flex gap-3 flex-wrap mx-auto justify-center px-4"
          >
            <div class="space-y-2">
              <figure>
                <img
                  src=${userData.avatar_url}
                  alt=""
                  class="sm:max-w-[360px] rounded-md"
                />
              </figure>
              <a href=${userData.html_url} target="_blank" 
                class="w-full bg-blue-500 text-white rounded-md py-2 px-4 block"
              >
                View Profile
              </a>
            </div>
            <div>
              <div class="flex gap-4 items-center flex-wrap justify-center">
                <button
                  class="bg-blue-400 text-white text-sm rounded-md py-2 px-3"
                >
                  Public Repo : ${userData.public_repos || 0}
                </button>
                <button
                  class="bg-zinc-400 text-white text-sm rounded-md py-2 px-3"
                >
                  Public Gits : ${userData.public_gists || 0}
                </button>
                <button
                  class="bg-green-400 text-white text-sm rounded-md py-2 px-3"
                >
                  Followers : ${userData.followers || 0}
                </button>
                <button
                  class="bg-sky-400 text-white text-sm rounded-md py-2 px-3"
                >
                  Following : ${userData.following || 0}
                </button>
              </div>
              <div class="mt-4">
                <ul class="">
                  <li class="border py-2 px-4 border-b-0">
                    <b>Company :</b> ${userData.company || "Not Available"}
                  </li>
                  <li class="border py-2 px-4 border-b-0">
                    <b>Website/Blog :</b> ${userData.blog || "Not Available"}
                  </li>
                  <li class="border py-2 px-4 border-b-0"><b>Location :</b> ${
                    userData.location
                  } </li>
                  <li class="border py-2 px-4"><b>Member Since :</b> ${
                    new Date(userData.created_at).getDate() +
                      "-" +
                      new Date(userData.created_at).getMonth() +
                      "-" +
                      new Date(userData.created_at).getFullYear() ||
                    "Not Available"
                  } </li>
                </ul>
              </div>
            </div>
          </div>`;
}
