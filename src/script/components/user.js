class User {
    constructor() {
        this.mamethod()
    }

    mamethod(){
        console.log('Coucou toi ')
    }

    static saveToFavorite(e)
    {
        console.log('test'  + e)
    }
}

export default function()
{
    new User()
}