/* name : String
   attributs : Objects { ['class': ['x','y','z'], 'id': 'test'] }
 */

export function isString(name)
{
    if (typeof name !== "string")
    throw "Parameter is not a String!";

}

export function createComponent(name, attributs)
{
    isString(name)

    document.createElement(name)
}