const {
    createEvent
} = require('@posthog/plugin-scaffold/test/utils.js')
const { processEventBatch } = require('../index')

const eventNamingOptions = [
    'helloThereWorld',
    'HelloThereWorld',
    'hello_there_world',
    'hello-there-world',
    'hello there world'
]


test('converts all event names to camelCase', async () => {

    const events = eventNamingOptions.map(option => 
        createEvent({ event: option })
    )
    
    const eventsOutput = await processEventBatch([...events], { global: { defaultTransformationIndex: 0 } })
    for (const event of eventsOutput) {
        expect(event).toEqual( createEvent({ event: 'helloThereWorld' }))
    }

})


test('converts all event names to PascalCase', async () => {

    const events = eventNamingOptions.map(option => 
        createEvent({ event: option })
    )
    
    const eventsOutput = await processEventBatch([...events], { global: { defaultTransformationIndex: 1 } })
    for (const event of eventsOutput) {
        expect(event).toEqual( createEvent({ event: 'HelloThereWorld' }))
    }

})


test('converts all event names to snake_case', async () => {

    const events = eventNamingOptions.map(option => 
        createEvent({ event: option })
    )
    
    const eventsOutput = await processEventBatch([...events], { global: { defaultTransformationIndex: 2 } })
    for (const event of eventsOutput) {
        expect(event).toEqual( createEvent({ event: 'hello_there_world' }))
    }


})


test('converts all event names to kebab-case', async () => {

    const events = eventNamingOptions.map(option => 
        createEvent({ event: option })
    )
    
    const eventsOutput = await processEventBatch([...events], { global: { defaultTransformationIndex: 3 } })
    for (const event of eventsOutput) {
        expect(event).toEqual( createEvent({ event: 'hello-there-world' }))
    }


})


test('converts all event names to spaces in between', async () => {

    const events = eventNamingOptions.map(option => 
        createEvent({ event: option })
    )
    
    const eventsOutput = await processEventBatch([...events], { global: { defaultTransformationIndex: 4 } })
    for (const event of eventsOutput) {
        expect(event).toEqual( createEvent({ event: 'hello there world' }))
    }


})