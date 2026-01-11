
export async function fetchUserProfile(username: string) {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) throw new Error("GitHub Profile API error");
    return await res.json();
  } catch (error) {
    return null;
  }
}

export async function fetchUserRepos(username: string) {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=100`);
    if (!res.ok) throw new Error("GitHub API error");
    const data = await res.json();
    
    const langColors: Record<string, string> = {
      'Python': '#3572A5', 'Rust': '#dea584', 'Go': '#00ADD8',
      'TypeScript': '#3178c6', 'JavaScript': '#f1e05a', 'C++': '#f34b7d', 'Shell': '#89e051'
    };
    
    return data
      .filter((repo: any) => !repo.fork && !repo.archived)
      .sort((a: any, b: any) => (b.stargazers_count * 2 + b.forks_count) - (a.stargazers_count * 2 + a.forks_count))
      .slice(0, 12)
      .map((repo: any) => ({
        name: repo.name,
        desc: repo.description || "Arquitectura de sistemas de alto rendimiento.",
        lang: repo.language || "Shell",
        langColor: langColors[repo.language] || '#666',
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        tags: repo.topics?.slice(0, 3) || ['Backend', 'Architecture'],
        status: repo.stargazers_count > 50 ? 'stable' : 'beta',
        url: repo.html_url,
        lastUpdate: new Date(repo.updated_at).toLocaleDateString()
      }));
  } catch (error) {
    return null;
  }
}

export async function fetchGlobalLanguages(username: string) {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    if (!res.ok) return null;
    const repos = await res.json();
    
    const langCounts: Record<string, number> = {};
    repos.forEach((repo: any) => {
      if (repo.language) {
        langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
      }
    });

    const total = Object.values(langCounts).reduce((a, b) => a + b, 0);
    return Object.entries(langCounts).map(([name, count]) => ({
      name,
      value: Math.round((count / total) * 100),
      count
    })).sort((a, b) => b.value - a.value);
  } catch (error) {
    return null;
  }
}

export async function fetchRepoStats(owner: string, repo: string) {
  try {
    const [langRes, commitsRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${owner}/${repo}/languages`),
      fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=50`)
    ]);
    if (!langRes.ok || !commitsRes.ok) return null;
    return { languages: await langRes.json(), commits: await commitsRes.json() };
  } catch (error) {
    return null;
  }
}
