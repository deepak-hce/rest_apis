class Response {
    constructor(comments) {
       return {
            ResponseCode: 1,
            Comments: comments
        }
    }
}


module.exports =  Response;