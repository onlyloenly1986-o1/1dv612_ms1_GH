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
                        {
                            title: 'All information about specific org',
                            verb: 'GET',
                            href: 'http://localhost:3000/api/v1/orgs/:org',
                            type: 'application/json',
                            rel: 'next',
                            description: '',
                            auth: 'true'  
                        },
                        {
                            title: 'A collection of all repos on this user',
                            verb: 'GET',
                            href: 'http://localhost:3000/api/v1/orgs/repos',
                            type: 'application/json',
                            rel: 'next',
                            description: '',
                            auth: 'true'  
                        },
                        {
                            title: 'All information about specific repo',
                            verb: 'GET',
                            href: 'http://localhost:3000/api/v1/orgs/repos/:repo',
                            type: 'application/json',
                            rel: 'next',
                            description: '',
                            auth: 'true'  
                        },
                    ],
                    previous: [
                        {
                            title: 'This is the API root',
                            verb: 'GET',
                            href: 'http://localhost:3000/api/v1/',
                            type: 'application/json',
                            rel: 'self',
                            description: '',
                            auth: 'false'
                        }
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

exports.getOneOrg = async (req, res, next) => {
}
