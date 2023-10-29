class UserInfoManager {
  constructor() {
    this.SP_searchBox = document.querySelector(".SP_searchBox");
    this.SP_input = document.querySelector(".SP_input");
    this.info_basic = document.querySelector(".info_basic");
    this.info_basic2 = document.querySelector(".info_basic2");
    this.info_basic3 = document.querySelector(".info_basic3");
    this.info_basic4 = document.querySelector(".info_basic4");

    this.SP_searchBox.addEventListener("submit", this.formSubmit.bind(this));
  }

  formSubmit(event) {
    event.preventDefault();
    const username = this.SP_input.value;
    if (username !== "") {
      if (this.info_basic.innerHTML !== "") {
        this.info_basic.innerHTML = "";
      }
      if (this.info_basic2.innerHTML !== "") {
        this.info_basic2.innerHTML = "";
      }
      if (this.info_basic3.innerHTML !== "") {
        this.info_basic3.innerHTML = "";
      }
      if (this.info_basic4.innerHTML !== "") {
        this.info_basic4.innerHTML = "";
      }
      this.getUser(username);
      this.getUserRepos(username);
      this.SP_input.value = ""; // 입력 필드를 비웁니다.
    } else {
      alert("Please enter a username");
    }
  }

  async getUser(username) {
    try {
      const response = await fetch("https://api.github.com/users/" + username);
      if (response.status === 404) {
        throw new Error("User not found");
      }
      const data = await response.json();
      this.createInfo_Basic(data);
      this.info_basic.className = "flex info_basic";
      this.info_basic2.className = "flex info_basic2";
    } catch (error) {
      console.error(error.message);
      alert("Couldn't find a profile with this Username");
    }
  }

  async getUserRepos(username) {
    try {
      const response2 = await fetch(
        "https://api.github.com/users/" + username + "/repos"
      );
      const data2 = await response2.json();
      this.createInfo_Basic2(username, data2);
      this.info_basic3.className = "flex info_basic3";
      this.info_basic4.className = "flex info_basic4";
    } catch (error) {
      console.error(error.message);
    }
  }

  createInfo_Basic(data) {
    //info_basic
    //왼쪽 섹션
    const info_basic_left = document.createElement("div");
    info_basic_left.classList.add("info_basic_left");

    const userPicture = document.createElement("div");
    userPicture.classList.add("userPicture");
    userPicture.style.backgroundImage = `url(${data.avatar_url})`;
    userPicture.style.backgroundSize = "cover";
    userPicture.style.backgroundPosition = "center";

    //오른쪽 섹션
    const info_basic_right = document.createElement("div");
    info_basic_right.classList.add("info_basic_right");

    const info_basic_right_inner = document.createElement("div");
    info_basic_right_inner.classList.add("info_basic_right_inner");

    const userName = document.createElement("div");
    userName.classList.add("userName");
    userName.innerText = `${data.name}`;

    const userLogin = document.createElement("div");
    userLogin.classList.add("userLogin");
    userLogin.innerText = `${data.login}`;

    const userBio = document.createElement("div");
    userBio.classList.add("userBio");
    userBio.innerText = `${data.bio}`;

    const uFollowAndRepos = document.createElement("div");
    uFollowAndRepos.classList.add("uFollow_Repos");

    const uFollower = document.createElement("div");
    uFollower.classList.add("uFollower");
    uFollower.innerText = `Followers : ${data.followers}`;

    const uFollowing = document.createElement("div");
    uFollowing.classList.add("uFollowing");
    uFollowing.innerText = `Following : ${data.following}`;

    const uPublicRepos = document.createElement("div");
    uPublicRepos.classList.add("uPublicRepos");
    uPublicRepos.innerText = `Repos : ${data.public_repos}`;

    this.info_basic.appendChild(info_basic_left);
    this.info_basic.appendChild(info_basic_right);

    info_basic_left.appendChild(userPicture);

    info_basic_right.appendChild(info_basic_right_inner);

    info_basic_right_inner.appendChild(userName);
    info_basic_right_inner.appendChild(userLogin);
    info_basic_right_inner.appendChild(userBio);

    info_basic_right_inner.appendChild(uFollowAndRepos);
    uFollowAndRepos.appendChild(uFollower);
    uFollowAndRepos.appendChild(uFollowing);
    uFollowAndRepos.appendChild(uPublicRepos);

    //info_basic2
    const lSpace = document.createElement("div");
    lSpace.classList.add("lSpace");

    const location_img = document.createElement("i");
    location_img.classList.add("material-icons");
    location_img.classList.add("material_logo");
    location_img.innerText = "location_on";

    const location = document.createElement("div");
    location.classList.add("location");
    location.innerText = `${data.location}`;

    const cSpace = document.createElement("div");
    cSpace.classList.add("cSpace");

    const c_image = document.createElement("i");
    c_image.classList.add("material-icons");
    c_image.classList.add("material_logo");
    c_image.innerText = "account_circle";

    const created_at = document.createElement("div");
    created_at.classList.add("created_at");
    created_at.innerText = `${data.created_at}`;

    const gSpace = document.createElement("div");
    gSpace.classList.add("gSpace");

    const github_img = document.createElement("a");
    github_img.classList.add("material-icons");
    github_img.classList.add("material_logo");
    github_img.href = `https://github.com/${data.login}`;
    github_img.innerText = "link";

    const github = document.createElement("a");
    github.classList.add("github");
    github.href = `https://github.com/${data.login}`;
    github.innerText = `https://github.com/${data.login}`;

    this.info_basic2.appendChild(lSpace);
    lSpace.appendChild(location_img);
    lSpace.appendChild(location);

    this.info_basic2.appendChild(cSpace);
    cSpace.appendChild(c_image);
    cSpace.appendChild(created_at);

    this.info_basic2.appendChild(gSpace);
    gSpace.appendChild(github_img);
    gSpace.appendChild(github);
  }

  createInfo_Basic2(username, data2) {
    //info_basic3

    data2.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    const info_basic3_inner = document.createElement("div");
    info_basic3_inner.classList.add("info_basic3_inner");

    const recentRepos = data2.slice(0, 20);

    recentRepos.forEach((item) => {
      const recent_repos1 = document.createElement("div");
      recent_repos1.className = "recent_repos1 repos";
      recent_repos1.innerText = `${item.name}`;

      this.info_basic3.appendChild(info_basic3_inner);
      info_basic3_inner.appendChild(recent_repos1);
    });

    //info_basic4
    const info_basic4_inner = document.createElement("div");
    info_basic4_inner.classList.add("info_basic4_inner");

    const git_chart = document.createElement("img");
    git_chart.classList.add("git_chart");
    git_chart.src = `https://ghchart.rshah.org/${username}`;
    git_chart.alt = "";

    this.info_basic4.appendChild(info_basic4_inner);
    info_basic4_inner.appendChild(git_chart);
  }
}

const userInfoManager = new UserInfoManager();
