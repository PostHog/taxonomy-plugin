const transformations = [
    {
        name: "camelCase",
        matchPattern: /[A-Z]/g,
        transform: (str, matchPattern) => str[0].toLowerCase()  + str.slice(1).replace(matchPattern, (substr) => substr[substr.length-1].toUpperCase())
    },
    {
        name: "PascalCase",
        matchPattern: /[A-Z]/g,
        transform: (str, matchPattern) => str[0].toUpperCase() + str.slice(1).replace(matchPattern, (substr) => substr[substr.length-1].toUpperCase())
    },
    {
        name: "snake_case",
        matchPattern: /([_])([a-z])/g,
        transform: (str, matchPattern) => defaultTransformation(str, matchPattern, '_')
    },
    {
        name: "kebab_case",
        matchPattern: /([-])([a-z])/g,
        transform: (str, matchPattern) => defaultTransformation(str, matchPattern, '-')
    },
    {
        name: "spaces",
        matchPattern: /([\s])([a-z])/g,
        transform: (str, matchPattern) => defaultTransformation(str, matchPattern, ' ')
    },
] 


function setupPlugin({ config, global }) {
    const selectedTransformationIndex = Number(config.defaultNamingConventionIndex)
    if (Number.isNaN(selectedTransformationIndex) || selectedTransformationIndex > transformations.length) {
        throw new Error('Invalid naming convention selection.')
    }

    global.defaultTransformationIndex = selectedTransformationIndex - 1

}

async function processEventBatch(events, { global }) {
    for (let event of events) {
        event.event = standardizeName(event.event, transformations[global.defaultTransformationIndex])
    }
    return events
}


const defaultTransformation = (str, matchPattern, sep) => {
    const parsedStr = str.replace(
        matchPattern, 
        (substr) => sep + (substr.length === 1 ?  substr.toLowerCase() : substr[1].toLowerCase())
    )
    if (parsedStr[0] === sep) {
        return parsedStr.slice(1) // Handle PascalCase
    }
    return parsedStr
}


const standardizeName = (name, desiredPattern) => {
    for (const transformation of transformations) {
        if (transformation.name === desiredPattern.name || name.search(transformation.matchPattern) < 0) {
            continue
        }
        return desiredPattern.transform(name, transformation.matchPattern)
    }
    return name
}

module.exports = {
    setupPlugin,
    processEventBatch
}