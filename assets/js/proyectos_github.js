function displayRepo(repo) {
  // console.log(repo);
  // console.log(repo.html_url, Object.keys(repo));
  console.log(repo);

  let div_proyecto = document.createElement('div');
  div_proyecto.setAttribute('class', 'galeria-proyecto');
  // div_proyecto.innerText = repo.html_url;

  let a_link = document.createElement('a');
  a_link.setAttribute("href", repo.html_url);

  const nombre = repo.name.charAt(0).toUpperCase() + repo.name.slice(1)

  a_link.innerText = nombre
    .replaceAll('-', ' ')
    .replaceAll('_', ' ');
  a_link.setAttribute('target', '_blank');
  a_link.setAttribute('class', 'galeria-proyecto__link');

  let a_link_2 = document.createElement('a');
  a_link_2.setAttribute("href", repo.html_url);
  a_link_2.setAttribute('target', '_blank');
  a_link_2.setAttribute('class', 'galeria-proyecto__link');
  a_link_2.innerText = "VER"

  let p_descripcion = document.createElement('p');
  p_descripcion.innerText = `Descripción: ${repo.description}`

  let p_date = document.createElement('p');
  p_date.innerText = `Fecha de creación: ${new Date(repo.created_at).toLocaleString()}`

  let p_forks = document.createElement('p');
  p_forks.innerText = `Forks: ${repo.forks} | Forks count: ${repo.forks_count}`;

  let p_estrellas = document.createElement('p');
  p_estrellas.innerText = `Estrellas: ${repo.stargazers ? repo.stargazers : '0'}`;

  let p_vigilas = document.createElement('p');
  p_vigilas.innerText = `Vigilas: ${repo.watchers} | Número de vigilas: ${repo.watchers_count}`;

  let a_homepage
  if (repo.homepage) {
    a_homepage = document.createElement('a');
    a_homepage.setAttribute("href", repo.homepage);
    a_homepage.setAttribute('target', '_blank');
    a_homepage.setAttribute('class', 'galeria-proyecto__link');
    a_homepage.innerText = `Página de inicio`;
  } else {
    a_homepage = document.createElement('p');
    a_homepage.innerText = `Página de inicio`;
  }

  let p_tamano = document.createElement('p');
  p_tamano.innerText = `Tamaño: ${repo.size}`;

  div_proyecto.appendChild(a_link);
  div_proyecto.appendChild(p_descripcion);
  div_proyecto.appendChild(p_date);
  div_proyecto.appendChild(p_forks);
  div_proyecto.appendChild(p_estrellas);
  div_proyecto.appendChild(p_vigilas);
  div_proyecto.appendChild(a_homepage);
  div_proyecto.appendChild(p_tamano);
  div_proyecto.appendChild(a_link_2);

  let galeria = document.getElementById('galeria-proyectos-github');
  galeria.appendChild(div_proyecto);
}

function filtrarRepos(repos) {
  repos = repos.filter(
    repo => !(repo.fork) && !(repo.archived) &&
    (repo.name != 'karlheitmann') &&
    (repo.name != 'KarlHeitmann.github.io')
  );
  repos.forEach(repo => {
    displayRepo(repo)
  });
}
async function getRepos(page) {
  const response = await axios.get(`https://api.github.com/users/KarlHeitmann/repos?type=owner&page=${page}&per_page=100`);
  const {data} = response;
  if (data.length == 0) {
    return 0;
  } else if (data.length < 100) {
    // console.log('FINAL REQUEST', data);
    console.log('FINAL REQUEST', data);
    filtrarRepos(data);
    return 0;
  } else {
    console.log('FALTAN REPOS', data);
    filtrarRepos(data);
    getRepos(page + 2);
    return 0;
  }
}
getRepos(1)

document.getElementById("btn-ver-proyectos").onclick = () => {
  console.log("click")
  const galeriaProyectosGithub = document.getElementById('galeria-proyectos-github');
  // const clases = galeriaProyectosGithub.getAttribute('class').split(' ');
  const clases = galeriaProyectosGithub.classList;
  let show = false
  clases.forEach(clase => {
    if (clase == 'galeria-proyectos--show') { show = true; }
  });
  if (show) {
    galeriaProyectosGithub.setAttribute('class', 'galeria-proyectos')
  } else {
    galeriaProyectosGithub.setAttribute('class', 'galeria-proyectos galeria-proyectos--show')
  }
  console.log(clases)
};

