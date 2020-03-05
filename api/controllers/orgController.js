require('dotenv').config()
const github = require('octonode')

const client = github.client(`${process.env.GITHUB_ACCESS_TOKEN}`)
const ghme = client.me();

exports.getOrgs = async (req, res, next) => {
    try {        
        let orgs = []
        ghme.orgs(function (callback, body, header) {
            body.map(org => {
              orgs.push({
                login: org.login,
                id: org.id,
                url: org.url,
                repos_url: org.repos_url,
                events_url: org.events_url,
                hooks_url: org.hooks_url,
                issues_url: org.issues_url,
                members_url: org.members_url,
                public_members_url: org.public_members_url,
                avatar_url: org.avatar_url,
                description: org.description
              })
            })
            res.status(200).json({
                status: '200: OK',
                message: 'Here is all organisations on the given user',
                _links: {
                    self: [
                        {
                            title: 'A collection of all organisations',
                            verb: 'GET',
                            href: 'http://localhost:3000/api/v1/orgs',
                            type: 'application/json',
                            rel: 'self',
                            description: '',
                            auth: 'true'  
                        }
                    ],
                    to: [
                       
                    ]
                },
                countOrgs: orgs.length,
                organizations: orgs
            })
        })        
      } catch (e) {
        console.log(e)
        res.statusCode(500).json({
            error: e
        })
      }
}

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