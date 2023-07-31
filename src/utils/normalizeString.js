const normalizeString = (value) => {
    var from, to;
    from = "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ"
    to = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy"

    for (var i = 0, l = from.length; i < l; i++) {
        value = value.replace(RegExp(from[i], "gi"), to[i])
    }

    value = value.trim()
        .toLowerCase()  

    return value
}

module.exports = normalizeString


