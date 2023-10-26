const helper = {
    formatName: (value1, value2, value3) => {
        if(value1 === `Male`) {
            return `Tuan ${value2} ${value3}`
        } else if (value1 === `Female`) {
            return `Nyonya ${value2} ${value3}`
        }
    }
}

module.exports = helper