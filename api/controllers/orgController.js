require('dotenv').config()
const github = require('octonode')

const client = github.client(`${process.env.GITHUB_ACCESS_TOKEN}`)
const ghme = client.me();

  
exports.getOrgs = async (req, res, next) => {
    try {        
        let orgs = []
        ghme.orgs(function (callback, body, header) {
            // console.log(body)
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
                },
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