class User {
     constructor(name) {
        this.name = name;
    }


    static saveToFavorite(e)
    {
        console.log('test'  + e)
    }

    User.prototype.greet = function() {
        return `${this.name} says hello.`;
    }
}

export default function()
{
    new User()
}