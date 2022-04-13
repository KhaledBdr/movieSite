const { MovieModel} =require('./movies.schema')
  

module.exports.getSavedMovies = async()=>{
    try{
        const movies = await MovieModel.find().sort({name:-1})
        return(movies)
    }catch(ex){
        return(`SomeThing Error Happened when getting Movies from DB + ${ex.message}`)
    }
}
module.exports.getMoviesByCategory = async(type)=>{

    try{
        let movies = await MovieModel.find({category : type})
                                     .sort({year:-1})
        if(movies.length !== 0){
        return(movies)}
        else{
        movies = await MovieModel.find().sort({year:-1})
        return (movies)
        }
    }catch(ex){
        return(`SomeThing Error Happened when getting Movies from DB + ${ex.message}`)
    }
}
module.exports.saveNewMovie =async (data)=>{
    try{      
        const newMovie = await new MovieModel({
                name : data.name,
                evaluation :data.evaluation,
                author : data.author,
                year : data.year,
                category :data.category,
                img : data.img
        })
        newMovie.save()
         
        return(newMovie)
    }catch(ex){
         
        return(`SomeThing Error Happened when getting Movies from DB`)
    }
}

module.exports.deleteMovie = async (id)=>{
    const deletedItem =await MovieModel.findByIdAndRemove(id)
    if(deletedItem) return(deletedItem)
    return("We didn't find it")
}

module.exports.updateMovie = async(id , data)=>{
    const Updated = await MovieModel.findByIdAndUpdate(id , {name : data.name , year : data.year , evaluation :data.evaluation , author :data.author , category : data.category} ,{new : true})

    if(Updated) return Updated
    return 'Not Founded'
}

module.exports.searchByName = async(name)=>{
    const result = await MovieModel.find({name : name})
    
    if(result) return result
    return 'Not Founded'
}