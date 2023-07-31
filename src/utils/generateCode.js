const generateCode = (normalizeString) => {
    const array = normalizeString.split(' ')
    let code = ""
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        code += element.charAt(1) + element.charAt(0)
    }

    return code + normalizeString.length
}

module.exports = generateCode


