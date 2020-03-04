
exports.getRoot = (req, res, next) => {
    res.status(200).json(
        {
        status: '200: OK',
        message: 'REST API root for the microservice github-organisations-ms',
        _links: {
            self: [
                {
                    title: 'This is the API root',
                    verb: 'GET',
                    href: 'http://localhost:3000/api/v1/',
                    type: 'application/json',
                    rel: 'self',
                    description: '',
                    auth: 'false'
                }
            ],
            to: [
                
            ]
        }
    })
}