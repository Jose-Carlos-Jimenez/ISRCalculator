const { getISR, getIRA } = require('./utiles/taxes')

test("Getting ISR of Panfilo Reyes", async () => {
    expect(getISR(2233)).toBe("468.18")
})

test("Getting ISR of Panfilo Reyes expecting a number", async () => {
    expect(getISR(2233)).toBe(468.18)
})

test("Getting ISR of Panfilo Reyes sending id with left zeros", async () => {
    expect(getISR("000002233")).toBe("468.18")
})