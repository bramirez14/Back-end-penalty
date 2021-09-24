
exports.getcobranzas = async ( res,database) => {
    
    try {
        res.send(await database.findAll())
    } catch (e) {
        res.send(e)
    }


}