module.exports = async(Model,query,limit,page) => {
    const totalRows = await Model.find(query).countDocuments()
    const totalPage=Math.ceil(totalRows/limit)
    return {
        totalRows: totalRows,
        totalPages: totalPage,
        page: page,
        next: page+1,
        prev: page-1,
        hasNext: page<totalPage?true:false,
        hasPrev: page>1?true:false
    }
}