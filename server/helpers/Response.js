class Response {
    constructor(comments, result = null) {
       return {
            ResponseCode: 1,
            Comments: comments,
            Success: true,
            Result: result
        }
    }
}


module.exports =  Response;