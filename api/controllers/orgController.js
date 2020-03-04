
exports.getPage = (req, res, next) => {
    res.status(200).json(
        {
        status: '200: OK',
        message: 'Here is all public organisations on the given user',
        _links: {
        }
    })
}