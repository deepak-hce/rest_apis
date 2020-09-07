class Response {
    constructor(comments) {
       return {
            ResponseCode: 1,
            Comments: comments,
            Success: true
        }
    }
}


module.exports =  Response;