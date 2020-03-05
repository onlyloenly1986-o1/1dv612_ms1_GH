require('dotenv').config()
const github = require('octonode')

const client = github.client(`${process.env.GITHUB_ACCESS_TOKEN}`)
const ghme = client.me();

exports.getRepos = async (req, res, next) => {
    let repos = []
    try {
        ghme.repos(function (callback, body, header) {
            body.map(repo => {
                repos.push({
                    name: repo.name,
                    id: repo.id,
                    full_name: repo.full_name,
                    private: repo.private,
                    owner: {
                        login: repo.owner.login,
                        url: repo.owner.url,
                        organizations_url: repo.owner.organizations_url,
                        repos_url: repo.owner.repos_url,
                        type: repo.owner.type,
                        site_admin: repo.owner.site_admin
                    },
                    description: repo.description,
                    url: repo.url,
                    hooks_url: repo.hooks_url,
                    releases_url: repo.releases_url,
                    created_at: repo.created_at,
                    updated_at: repo.updated_at,
                    pushed_at: repo.pushed_at,
                    default_branch: repo.default_branch,
                    permissions: repo.permissions
                })
            })
            res.status(200).json({
                status: '200: OK',
                message: 'Here is all repos bounded to the use',
                _links: {
                    self: [
                        {
                            title: 'A collection of all repos on this user',
                            verb: 'GET',
                            href: 'http://localhost:3000/api/v1/orgs/repos',
                            type: 'application/json',
                            rel: 'self',
                            description: '',
                            auth: 'true'  
                        }
                    ],
                    to: [
                       
                    ]
                },
                countRepos: repos.length,
                repos: repos
            })
        })
    } catch (e) {
        console.log(e)
        res.statusCode(500).json({
            error: e
        })
      }
}

exports.getOneRepo =  async (req, res, next) => {
    const repoName = req.params.repo
    res.status(200).json({
        status: '200: OK',
        message: 'Here is everything about one repo',
        repo: repoName,
        _links: {
        }
    })
}